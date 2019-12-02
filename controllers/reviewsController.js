const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Reviews = require('../models/ReviewsModel');

/**
 * @desc Получение всех отзывов
 * @route GET /api/v1/reviews
 * @access Public
 */
exports.getReviews = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
/**
 * @desc Получение отзыва по id
 * @route GET /api/v1/reviews/:id
 * @access Public
 * @param {Number} id - id отзыва
 */
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Reviews.findById(req.params.id);

  if (!review) {
    return next(new ErrorResponse(`Review not found with id of ${req.params.id}`));
  }

  res.status(200).json(review);
});
/**
 * @desc Добавление отзыва
 * @route POST /api/v1/reviews
 * @access Private
 */
exports.createReview = asyncHandler(async (req, res, next) => {
  const review = await Reviews.create(req.body);
  res.status(201).json(review);
});
/**
 * @desc Обновление отзыва
 * @route PUT /api/v1/reviews/:id
 * @access Private
 * @param {Number} id - id рецепта
 */
exports.uploadReview = asyncHandler(async (req, res, next) => {
  const review = await Reviews.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!review) {
    return next(new ErrorResponse(`Review not found with id of ${req.params.id}`));
  }

  res.status(200).json(review);
});
/**
 * @desc Удаление отзыва
 * @route DELETE /api/v1/reviews/:id
 * @access Private
 * @param {Number} id - id отзыва
 */
exports.removeReview = asyncHandler(async (req, res, next) => {
  const review = await Reviews.findByIdAndRemove(req.params.id);

  if (!review) {
    return next(new ErrorResponse(`Review not found with id of ${req.params.id}`));
  }

  res.status(200).json({ msg: 'Отзыв удален' })
}); 