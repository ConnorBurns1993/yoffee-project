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
    return res.json(businesses)
}))

router.get('/:id', asyncHandler(async (req, res) => {
    const business = await BusinessesRepository.getBusinessById(req.params.id)
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

router.post("/create", requireAuth, validateBusiness, asyncHandler(async (req, res) => {
    const newBusiness = await Business.create(req.body);
    return res.json(newBusiness);
  })
  );

  router.put('/:id', requireAuth, validateBusiness, asyncHandler(async (req, res) => {
    const { title, description, address, city, state, zipCode, businessImage } = req.body
    const business = await Business.findByPk(req.params.id);

    await business.update({
      title,
      description,
      address,
      city,
      state,
      zipCode,
      businessImage
          })

    return res.json(business)
  }))

router.delete('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleteBusiness = await Business.findByPk(id);
  console.log('Business:' , deleteBusiness)
  await deleteBusiness.destroy()
  return res.json({ id })
}))


  module.exports = router;
