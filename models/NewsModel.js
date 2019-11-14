const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required field'],
    maxlength: [50, 'Title can no be more then 50 symbols']
  },
  content: {
    type: String,
    required: [true, 'Content is required field']
  },
  photo: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: String
});

module.exports = mongoose.model('News', NewsSchema);