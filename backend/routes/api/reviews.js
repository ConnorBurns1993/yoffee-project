const express = require("express");
const asyncHandler = require("express-async-handler");
const { User, Business, Review } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { reviewsByBusinessId } = require("../../db/reviews-repository");

const router = express.Router();

router.get(
  "/:businessId",
  asyncHandler(async (req, res) => {
    const reviews = await Review.findAll({
      where: { businessId: req.params.businessId },
    });

    console.log(reviews);
    return res.json(reviews);
  })
);

router.post(
  "/new",
  asyncHandler(async (req, res) => {
    const newReview = await Review.create(req.body);
    return res.json(newReview);
  })
);

module.exports = router;
