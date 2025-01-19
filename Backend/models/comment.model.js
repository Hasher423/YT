const mongoose = require('mongoose');


const commentSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    videoId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    },
    commentText: {
        type: String,
        required: true
    },

},{timestamps});


module.exports = mongoose.model('Comment', commentSchema);
