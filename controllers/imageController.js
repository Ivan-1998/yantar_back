const path = require('path');
const fs = require('fs');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

/**
 * @desc Загрузка изображения
 * @route POST /api/v1/images
 * @access Private
 */
exports.uploadImage = asyncHandler(async (req, res, next) => {
  const file = req.files.file;

  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse('Please, upload the image', 400));
  }
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponse(`Max size of image - ${process.env.MAX_FILE_UPLOAD}`, 400));
  }

  
  const pathParse = path.parse(file.name);
  // add hash
  const hash = `${(new Date()).valueOf().toString()}-${(Math.floor(Math.random() * 100)).toString()}`;


  file.name = `image_${pathParse.name + hash + pathParse.ext}`;
  const url = `${process.env.FILE_UPLOAD_PATH}/${file.name}`;

  file.mv(url, async err => {
    if (err) {
      return next(new ErrorResponse('Problem with file upload', 500));
    }
    res.status(200).json({ name: file.name });
  });
});