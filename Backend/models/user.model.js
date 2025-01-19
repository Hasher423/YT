const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5, 'Email must be at least 5 characters']
    },
    channelName:{
        type:String,
        required:true,
    },
    passsword:{
        type:String,
        required:true,
        minlength:[8, 'Password must be at least 8 characters long']
    },
    logoUrl:{
        type:String,
    },
    subscribers:{
        type:Number,
        default:0
    },
    subscribedChannels:{
        type:[],
    },
    videos:{
        type:[],
    },
    
},{timestamps})


module.exports = mongoose.model('User' , newSchema);
