const db = require('./models')

async function getBusinessById(id) {
    return await db.Business.findByPk(id)
  }

  module.exports = {
      getBusinessById
  }
