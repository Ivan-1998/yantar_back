const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Products = require('../models/ProductsModel');

/**
 * @desc     Получение списка всех товаров
 * @route    GET /api/v1/products
 * @access   Public
 */
exports.getProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
/**
 * @desc     Получение товара по id
 * @route    GET /api/v1/products/:id
 * @access   Public
 * @param    {Number} id - id товара
 */
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Products.findById(req.params.id);
  
  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json(product);
});
/**
 * @desc     Добавление товаров
 * @route    POST /api/v1/products
 * @access   Private
 */
exports.createProducts = asyncHandler(async (req, res, next) => {
  const product = await Products.create(req.body);
  res.status(201).json(product);
});
/**
 * @desc     Обновление товара
 * @route    PUT /api/v1/products/:id
 * @access   Private
 * @param    {Number} id - id товара
 */
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!product) {
    return next(new ErrorResponse(`Product no found with id of ${req.params.id}`, 404));
  }

  res.status(200).json(product);
});
/**
 * @desc     Удаление товара
 * @route    DELETE /api/v1/products/:id
 * @access   Private
 * @param    {Number} id - id товара
 */
exports.removeProduct = asyncHandler(async (req, res, next) => {
  const product = await Products.findByIdAndRemove(req.params.id);
  if (!product) {
    return next(new ErrorResponse(`Product no found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ msg: 'Товар удален' });
});