const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    comments:[],
    likedByUsers:[],
    dislikedByUsers:[],
    video_Url:{
        type:Object,
    },
    commentby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    thumbnail_Url:{
        type:Object,
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

},{timestamps: true});


module.exports = mongoose.model('Video', videoSchema);

