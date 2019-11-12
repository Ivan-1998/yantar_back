const express = require('express');
const { uploadImage, removeImage } = require('../controllers/imageController');

const router = express.Router();
const { protect } = require('../middleware/auth');

router.route('/').post(protect, uploadImage)
router.route('/:name').delete(protect, removeImage);

module.exports = router;