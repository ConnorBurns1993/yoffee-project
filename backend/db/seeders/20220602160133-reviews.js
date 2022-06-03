'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        businessId: 1,
        rating: 3,
        description: 'This is a Test Review for BUSINESSID 1 made by USERID 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        businessId: 2,
        rating: 4,
        description: 'This is a Test Review for BUSINESSID 2 made by USERID 2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        businessId: 3,
        rating: 5,
        description: 'This is a Test Review for BUSINESSID 3 made by USERID 3',
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
