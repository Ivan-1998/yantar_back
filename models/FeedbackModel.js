const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, 'Email is required field'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add valid email'
    ]
  },
  phone: String,
  message: String
});

module.exports = mongoose.model('Feedback', FeedbackSchema);