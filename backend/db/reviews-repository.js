const { Review } = require("./models");

async function reviewsByBusinessId(businessId) {
  return await Review.findAll({
    where: {
      businessId,
    },
  });
}

module.exports = {
    reviewsByBusinessId
}
