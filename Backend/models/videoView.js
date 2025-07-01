const mongoose = require('mongoose');

const videoViewSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  viewedAt: {
    type: Date,
    default: Date.now,
  },
});

videoViewSchema.index({ videoId: 1, userId: 1 }, { unique: true }); // prevent duplicate views

module.exports = mongoose.model('VideoView', videoViewSchema);
