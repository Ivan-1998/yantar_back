const mongoose = require('mongoose');

const ReviewsSchema = new mongoose.Schema({
  owner: {
    fio: {
      type: String,
      required: [true, 'Owner fio is required field'],
      maxlength: [100, 'Title can not be more then 100 symbols']
    },
    position: {
      type: String
    }
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

module.exports = mongoose.model('Reviews', ReviewsSchema);