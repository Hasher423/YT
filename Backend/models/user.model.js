const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters']
    },
    channelName: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long']
    },
    
    logoId: {
        type: String,
    },
    subscribers: {
        type: Number,
        default: 0
    },
    subscribedChannels: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ],
    videoData: [
        
    ],
}, { timestamps: true })







userSchema.statics.hashpassword = async (password) => {
    const hash = bcrypt.hash(password, 10);
    return hash;
}

userSchema.methods.generateToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}




userSchema.methods.checkPassword = async function (password) {
    const match = await bcrypt.compare(password, this.password);
    return match;
}

module.exports = mongoose.model('User', userSchema);
