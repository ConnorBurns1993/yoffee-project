const express = require('express');
const asyncHandler = require('express-async-handler');
const { Business } = require('../../db/models/business.js');

const router = express.Router();

router.get('/', asyncHandler(async function(req, res) {
    const businesses = await Business.findAll({})
    console.log('hello from routes/api/businesses')
    console.log(businesses)

    return res.json(businesses)
}))

module.exports = router;
