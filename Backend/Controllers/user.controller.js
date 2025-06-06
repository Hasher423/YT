const userService = require('../Services/user.service')
const userModel = require('../models/user.model')
const mongoose = require('mongoose')
const blackListTokensModel = require('../models/blackListTokens');
const { cloudinaryUploadChunked } = require('../Services/videoUpload.service.js');
const fs = require('fs');

module.exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, channelName } = req.body;


        const logoUploaded = await cloudinaryUploadChunked(req.file.path, 'image');
        if (!logoUploaded) {
            return res.status(400).json({ message: "Failed to upload logo" });
        }
        console.log(logoUploaded)
        fs.unlink(req.file.path, (err) => {
            if (err) throw err;
            console.log('logo in local folder has been  deleted');
        });


        if (!logoUploaded) {
            console.log('logo could not be uploaded');
        }

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const hashedPassword = await userModel.hashpassword(password);

        const alreadyExists = await userModel.findOne({ email });
        if (alreadyExists) {
            return res.status(409).send("User Already exists LOGIN")
        }

        const logoId = logoUploaded.response.status === 200 ? logoUploaded.response.data.url : null;

        const newUser = await userService.createUser(
            name,
            email,
            hashedPassword,
            channelName,
            logoId,
        );
        const token = await newUser.generateToken();
        console.log('token on generating ' + token);
        res.cookie('token', token, {
            httpOnly: false,
            secure: false,          // local dev = HTTP → must be false
            sameSite: 'Lax',        // Lax is a bit more flexible than Strict for local testing
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });




        return res.status(201).json({ user: newUser, token });
    } catch (err) {
        console.error('Error in registerUser:', err);
        return res.status(500).json({ error: err.message, stack: err.stack });
    }
}



module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(455).json({ error: 'Email and password are required' });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(455).json({ error: 'User not found' });

        }


        const isMatch = user.checkPassword(password);

        if (!isMatch) {
            return res.json({ error: 'Invalid email or password' });
        }

        const token = await user.generateToken();
        res.cookie('token', token, {
            httpOnly: false,
            secure: false,          // local dev = HTTP → must be false
            sameSite: 'Lax',        // Lax is a bit more flexible than Strict for local testing
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });




        return res.json({ token, user });
    } catch (err) {
        console.error(err);
    }
}




module.exports.logout = async (req, res) => {
    try {
        // res.cookie = '';

        const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;

        if (!token) {
            return res.status(400).json({ message: 'No token found' });
        }

        await blackListTokensModel.create({ token });
        res.clearCookie('token')
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({ message: 'Server error during logout' });
    }
};


module.exports.getuser = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.user });
        return res.status(200).json({ user })
    }
    catch (err) {
        console.error(err)
    }
}