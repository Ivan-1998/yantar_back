const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const handlebars = require('handlebars');
const fs = require('fs');
const Feedback = require('../models/FeedbackModel');
const transporter = require('../config/nodemailer');

/**
 * @desc Получение списка всех лидов
 * @route GET /api/v1/feedback
 * @access Private
 */
exports.getFeedbackList = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
/**
 * @desc Удаление лида по id
 * @route DELETE /api/v1/feedback/:id
 * @access Private
 * @param {Number} id - id лида
 */
exports.removeFeedback = asyncHandler(async (req, res, next) => {
  const feedback = await Feedback.findByIdAndRemove(req.params.id);

  if (!feedback) {
    return next(new ErrorResponse(`Feedback not found with id of ${req.params.id}`));
  }

  res.status(200).json({ msg: 'Лид удалён' });
});
/**
 * @desc Отправление письма при лиде и запись его в БД
 * @route POST /api/v1/feedback
 * @access Public
 */
exports.feedback = asyncHandler(async (req, res, next) => {
  const feedback = await Feedback.create(req.body);
  const { name, email, phone, message } = req.body;

  readHTMLFile(`${__dirname}/../public/emails/feedback.html`, (err, html) => {
    const template = handlebars.compile(html);
    const replacements = {
      name: name || ' - ',
      email,
      phone: phone || ' - ',
      message: message || ' - '
    };
    
    const htmlToSend = template(replacements);
    const mailOptions = {
      from: 'sibtiger.nsk@gmail.com',
      to: 'tigfamon@gmail.com',
      subject: 'Новая заявка с сайта yantar.in',
      html: htmlToSend
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return next(new ErrorResponse('Problem with email sending', 500));
      } else {
        res.status(201).json(feedback);
      }
    })
  });
});

readHTMLFile = (path, callback) => {
  fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
    if (err) {
      throw err;
      callback(err);
    }
    else {
        callback(null, html);
    }
  });
};