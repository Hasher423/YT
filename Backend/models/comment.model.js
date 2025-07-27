const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    videoId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    },
    channel:{
        type:String,
        required:true,
    },
    commentText: {
        type: String,
        required: true
    },
    logo:{
        type:String,
    }

},{timestamps: true});


module.exports = mongoose.model('Comment', commentSchema);
