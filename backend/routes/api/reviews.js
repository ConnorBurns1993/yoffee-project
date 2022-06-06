const express = require("express");
const asyncHandler = require("express-async-handler");
const { User, Business, Review } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { reviewsByBusinessId } = require("../../db/reviews-repository");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const reviews = await Review.findAll({
      include: [{ model: User, required: true }],
      order: [["updatedAt", "ASC"]],
      limit: 3,
    });

    return res.json(reviews);
  })
);

router.get(
  "/:businessId",
  asyncHandler(async (req, res) => {
    const reviews = await Review.findAll({
      where: { businessId: req.params.businessId },
      include: [{ model: User, required: true }],
    });

    return res.json(reviews);
  })
);

const validateReview = [
  check("rating")
    .exists({ checkFalsy: true })
    .withMessage("Please give a rating."),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a review. We cannot accept an empty review.")
    .isLength({ max: 500 })
    .withMessage("Reviews cannot be longer than 500 characters.")
    .isLength({ min: 25 })
    .withMessage("Please provide a review that is atleast 25 characters."),

  handleValidationErrors,
];

router.post(
  "/new",
  validateReview,
  asyncHandler(async (req, res) => {
    const newReview = await Review.create(req.body);
    return res.json(newReview);
  })
);

router.delete(
  "/:reviewId",
  asyncHandler(async (req, res) => {
    const id = req.params.reviewId;
    const deleteReview = await Review.findByPk(id);
    await deleteReview.destroy();
    return res.json({ status: 200 });
  })
);

module.exports = router;
