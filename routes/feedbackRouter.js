const express = require('express');
const { feedback, getFeedbackList, removeFeedback } = require('../controllers/feedbackController');

const Feedback = require('../models/FeedbackModel');
const advancedResults = require('../middleware/advancedResults');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, advancedResults(Feedback), getFeedbackList)
  .post(feedback);
router.route('/:id')
  .delete(protect, removeFeedback)  

module.exports = router;