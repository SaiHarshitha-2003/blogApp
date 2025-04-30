const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  author: String,
  date: {
    type: Date,
    default: Date.now
  }
});
const Blog = mongoose.model('Blog', blogSchema)

module.exports = mongoose.model('Blog', blogSchema);
