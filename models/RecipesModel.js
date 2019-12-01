const mongoose = require('mongoose');

const RecipesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required field'],
    maxlength: [150, 'Title can not be more then 50 symbols']
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

module.exports = mongoose.model('Reipes', RecipesSchema);