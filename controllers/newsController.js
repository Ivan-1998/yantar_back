const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const News = require('../models/NewsModel');

/**
 * @desc Получение списка всех новостей
 * @route GET /api/v1/news
 * @access Public
 */
exports.getNews = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
/**
 * @desc Получение новости по id
 * @route GET /api/v1/news/:id
 * @access Public
 * @param {Number} id - id новости
 */
exports.getNewsById = asyncHandler(async (req, res, next) => {
  const news = await News.findById(req.params.id);

  if (!news) {
    return next(new ErrorResponse(`News not found with id of ${req.params.id}`));
  }

  res.status(200).json(news);
});
/**
 * @desc Добавление новости
 * @route POST /api/v1/news
 * @access Private
 */
exports.createNews = asyncHandler(async (req, res, next) => {
  const news = await News.create(req.body)
  res.status(201).json(news);
});
/**
 * @desc Обновление новости
 * @route PUT /api/v1/news/:id
 * @access Private
 * @param {Number} id - id новости
 */
exports.uploadNewsById = asyncHandler(async (req, res, next) => {
  const news = await News.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!news) {
    return next(new ErrorResponse(`News not found with id of ${req.params.id}`));
  }

  res.status(200).json(news);
});
/**
 * @desc Удаление новости
 * @route PUT /api/v1/news/:id
 * @access Private
 * @param {Number} id - id новости
 */
exports.removeNewsById = asyncHandler(async (req, res, next) => {
  const news = await News.findByIdAndRemove(req.params.id);

  if (!news) {
    return next(new ErrorResponse(`News not found with id of ${req.params.id}`));
  }

  res.status(200).json({ msg: 'Новость удалена!' })
}); 