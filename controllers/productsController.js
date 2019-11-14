const path = require('path');
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
    return next(new ErrorResponse(`Product no found with id of ${req.params.id}`, 404));
  }

  res.status(200).json(product);
});
/**
 * @desc     Добавление товаров
 * @route    POST /api/v1/products
 * @access   Private
 */
exports.createProducts = asyncHandler(async (req, res, next) => {
  const products = await Products.create(req.body);
  res.status(201).json({ success: true, products });
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

  res.status(200).json({ success: true, product });
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

  res.status(200).json({ success: true, msg: 'Товар удален' });
});
/**
 * @desc     Обновление фотографии у товара
 * @route    PUT /api/v1/products/:id/photo
 * @access   Private
 * @param    {Number} id - id товара
 */
exports.uploadPhotoProduct = asyncHandler(async (req, res, next) => {
  const product = await Products.findById(req.params.id);
  if (!product) {
    return next(new ErrorResponse(`Product no found with id of ${req.params.id}`, 404));
  }

  if (!req.files) {
    return next(new ErrorResponse('Please, upload the image', 400));
  }

  const file = req.files.file;

  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse('Please, upload the image', 400));
  }
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponse(`Max size of image - ${process.env.MAX_FILE_UPLOAD}`, 400));
  }

  file.name = `photo_product_${product._id}${path.parse(file.name).ext}`;
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      return next(new ErrorResponse('Problem with file upload', 500));
    }

    await Products.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.status(200).json({ success: true, file: file.name });
  });
});