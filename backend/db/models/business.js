'use strict';

module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [3, 500]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 255]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 100]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50]
      }
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 10]
      }
    },
    ratingsTotal: DataTypes.INTEGER,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    businessImage: {
      type: DataTypes.STRING,
    },
  }, {});

  Business.associate = function(models) {
    // associations can be defined here
   Business.belongsTo(models.User, { foreignKey: 'userId' }),
   Business.hasMany(models.Review, { foreignKey: 'ownerId', onDelete:'CASCADE', hooks: true})
  };
  return Business;
};
