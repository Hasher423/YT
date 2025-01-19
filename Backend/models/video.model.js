const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    likedByUsers:[],
    dislikedByUsers:[],
    video_Url:{
        type:String,
    },
    commentby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    thumbnail_Url:{
        type:String,
    },
    category:{
        type:String,
    },
    tags:{
        type:String
    },
    views:{
        type:Number,
        default:0
    },

},{timestamps});


module.exports = mongoose.model('Video', videoSchema);

