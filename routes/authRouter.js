const express = require('express');
const { register, login, logout, getMe, updateDetails, updatePassword } = require('../controllers/authController');

const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/login', login);
router.post('/register', register);
router.get('/me', protect, getMe);
router.get('/logout', logout);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

module.exports = router;