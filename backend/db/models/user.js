'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://i.imgur.com/6bPHcxG.jpg"
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] }
      },
      loginUser: {
        attributes: {}
      }
    },
  });

  User.prototype.toSafeObject = function() {
    // remember, this cannot be an arrow function
    const { id, name, profilePicture, email } = this; // context will be the User instance
    return { id, name, profilePicture, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
   };

   User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
   };

   User.login = async function ({ email, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          email: email
        }
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ name, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      name,
      email,
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Business, {foreignKey: 'ownerId', onDelete: 'CASCADE', hooks: true})
    User.hasMany(models.Review, {foreignKey: 'userId', onDelete: 'CASCADE', hooks: true})
  };

  return User;
};
