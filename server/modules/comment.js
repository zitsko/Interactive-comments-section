const db = require('./connection.js');
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    upvotes: {
      type: Number,
      default: 0
    }
  });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;