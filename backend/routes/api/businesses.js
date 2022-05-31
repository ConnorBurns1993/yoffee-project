const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models')

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const businesses = await db.Business.findAll({})
    console.log(req.body)
    return res.json(businesses)
}))


module.exports = router;
