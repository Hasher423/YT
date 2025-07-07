const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }, 
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    likedByUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dislikedByUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    video_Url: {
        type: Object,
    },
    thumbnail_Url: {
        type: Object,
    },
    category: {
        type: String,
    },
    tags: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true });


videoSchema.index(
  { title: 'text', description: 'text' },
  { name: 'VideoSearchIndex' } // optional name
);


module.exports = mongoose.model('Video', videoSchema);

