const express = require('express');
const asyncHandler = require('express-async-handler');
const { User, Business, Review } = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { reviewsByBusinessId } = require('../../db/reviews-repository')

const router = express.Router();

router.get('/', asyncHandler(async(req, res)=>{

    const businessId = parseInt(req.params.id)
    const reviews = await Review.findAll({
        where:{ businessId },
        order: [['rating', 'ASC']]}
        )
        return res.json({reviews});

    }))

module.exports = router;
