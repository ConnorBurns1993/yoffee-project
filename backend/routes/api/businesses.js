const express = require('express');
const asyncHandler = require('express-async-handler');
const { Business } = require('../../db/models/business');

const router = express.Router();

router.get('/', asyncHandler(async function(req, res) {
    const businesses = await Business.findAll({})

    return res.json(businesses)
}))

module.exports = router;
