'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        businessId: 1,
        rating: 3,
        description: 'test',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        businessId: 2,
        rating: 4,
        description: 'test',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        businessId: 3,
        rating: 5,
        description: 'test',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', {
    }, {});
  }
};
