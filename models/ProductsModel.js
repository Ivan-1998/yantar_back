const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required field'],
    maxlength: [50, 'Name can not be more then 50 symbols']
  },
  description: {
    type: String,
    required: [true, 'Description is required field']
  },
  size: {
    type: String,
    required: [true, 'Size is required filed']
  },
  type: {
    type: String,
    required: [true, 'Type is required field'],
    enum: { values: ['butter', 'halva', 'seeds', 'kernel'], message: 'Not valid type' }
  },
  price: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  photo: {
    type: String,
    // required: [true, 'Please a select photo of good'],
  },
  slug: String
});

module.exports = mongoose.model('Products', ProductsSchema);