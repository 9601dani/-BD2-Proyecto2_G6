const express = require('express')
const ReviewsController = require('../controllers/reviews.controller');

const router = express.Router();
const api = '/api/v1/reviews';

router.get(`${api}/:id`, ReviewsController.getReviewsByBookId);
router.post(`${api}/add`, ReviewsController.addReview);

module.exports = router;
