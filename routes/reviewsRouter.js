const express = require('express');
const { getReviews, getReview, 
        createReview, uploadReview,
        removeReview
      } = require('../controllers/reviewsController');

const Reviews = require('../models/ReviewsModel');
const advancedResults = require('../middleware/advancedResults');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.route('/')
  .get(advancedResults(Reviews), getReviews)
  .post(protect, createReview);
router.route('/:id')
  .get(getReview)  
  .put(protect, uploadReview)
  .delete(protect, removeReview);

module.exports = router;