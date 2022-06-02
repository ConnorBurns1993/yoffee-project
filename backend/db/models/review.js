'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: {
     type: DataTypes.INTEGER,
     allowNull: false
    },
    businessId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [3, 500]
      }
    }
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.User, { foreignKey: 'userId' })
    Review.belongsTo(models.Business, { foreignKey: 'ownerId' })
  };
  return Review;
};
