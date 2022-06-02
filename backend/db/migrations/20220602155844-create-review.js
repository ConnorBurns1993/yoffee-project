'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      businessId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Businesses',
          key: 'id'
        }
      },
      rating: {
        allowNull: false,
        type: Sequelize.INTEGER(5)
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT(500)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reviews');
  }
};
