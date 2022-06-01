const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models')
const BusinessesRepository = require('../../db/businesses-repository')

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

module.exports = router;
