const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/UserModel');

/**
 * @desc     Регистрация пользователя
 * @route    POST /api/v1/auth/register
 * @access   Public
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { email, password, role } = req.body;

  const accessAdminEmails = ['tigfamon@gmail.com'];
  if (!accessAdminEmails.includes(email) && role === 'admin') {
    res.status(405).send();
    return next();
  }

  const user = await User.create({
    email,
    password,
    role
  });

  sendTokenResponse(user, 200, res);
});
/**
 * @desc     Вход пользователя
 * @route    POST /api/v1/auth/login
 * @access   Public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Неверное имя пользователя или пароль!', 400));
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('Неверное имя пользователя или пароль!', 400));
  }

  sendTokenResponse(user, 200, res);
});
/**
 * @desc     Получение текущего пользователя
 * @route    GET /api/v1/auth/login
 * @access   Private
 */
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, user });
});

// Get Token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 3600 * 1000
    ),
    httpOnly: true
  };
  
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token });
};