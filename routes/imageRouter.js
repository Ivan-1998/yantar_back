const express = require('express');
const { uploadImage, removeImage } = require('../controllers/imageController');

const router = express.Router();
const { protect } = require('../middleware/auth');

router.route('/').post(protect, uploadImage)

module.exports = router;