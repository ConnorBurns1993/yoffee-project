const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models')
const BusinessesRepository = require('../../db/businesses-repository')
const { check } = require("express-validator"); // check will be used with handleValidationErrors to validate req bodies
const { handleValidationErrors } = require("../../utils/validation");
const { User, Business } = require("../../db/models");
const { setTokenCookie, requireAuth } = require("../../utils/auth");


const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const businesses = await db.Business.findAll({})
    console.log('You are hitting the home route, homie')
    return res.json(businesses)
}))

router.get('/:id', asyncHandler(async function(req, res) {
    const business = await BusinessesRepository.getBusinessById(req.params.id)
    console.log('We Hit This Route')
    return res.json(business)
}))

const validateBusiness = [
    check("title")
      .exists({ checkFalsy: true })
      .withMessage("Business must have a name.")
      .isLength({ max: 255 })
      .withMessage("Business name cannot be longer than 255 characters."),
    check("description")
      .exists({ checkFalsy: true })
      .withMessage("Please provide a description of your business.")
      .isLength({ max: 500 })
      .withMessage("Business description cannot be longer than 500 characters."),
    check("address")
      .exists({ checkFalsy: true })
      .withMessage("Please provide the address of your business."),
    check("city")
      .exists({ checkFalsy: true })
      .withMessage("Please provide the city where your business is located."),
    check("state")
      .exists({ checkFalsy: true })
      .withMessage("Please provide the state where your business is located."),
    check("zipCode")
      .exists({ checkFalsy: true })
      .withMessage("Please provide the zip code of your business location."),
    check("businessImage")
      .exists({ checkFalsy: true })
      .withMessage("Please upload an image of your business"),

    handleValidationErrors,
  ];

  router.post(
    "/create",
    requireAuth,
    validateBusiness,
    asyncHandler(async (req, res) => {
      const newBusiness = await Business.create(req.body);
      return res.json(newBusiness);
    })
  );

module.exports = router;
