'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Businesses', [
      {
        ownerId: 1,
        title: 'Starbucks',
        description: 'Summer drinks now available. Order at Starbucks today.',
        address: '120 S Los Angeles St Ste 110 Los Angeles, CA 90012',
        city: 'Los Angeles',
        state: 'California',
        zipCode: '90012',
      },
      {
        ownerId: 2,
        title: 'Sunny Day Coffee',
        description: 'Everyone needs a little light in their life. Come on down to Sunny Day Coffee.',
        address: '100 B Sunny St Los Angeles, CA 90012',
        city: 'Los Angeles',
        state: 'California',
        zipCode: '90012',
      },
      {
        ownerId: 3,
        title: 'Test Drive Coffee',
        description: "We aren't actually a coffee shop, simply a test. What a sad day.",
        address: '1482 Test Dr. Test City, UA 12345',
        city: 'Bug City',
        state: 'useState',
        zipCode: '12345',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Businesses', {
    }, {});
  }
};
