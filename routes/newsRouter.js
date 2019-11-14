const express = require('express');
const { getNews, getNewsById, 
        createNews, uploadNewsById,
        removeNewsById
      } = require('../controllers/newsController');

const News = require('../models/NewsModel');
const advancedResults = require('../middleware/advancedResults');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.route('/')
  .get(advancedResults(News), getNews)
  .post(protect, createNews);
router.route('/:id')
  .get(getNewsById)  
  .put(protect, uploadNewsById)
  .delete(protect, removeNewsById);

module.exports = router;  