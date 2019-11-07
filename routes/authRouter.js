const express = require('express');
const { register, login, getMe } = require('../controllers/authController');

const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/login', login);
router.post('/register', register);
router.get('/me', protect, getMe);

module.exports = router;