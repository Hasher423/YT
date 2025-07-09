const userService = require('../Services/user.service')
const userModel = require('../models/user.model')
const mongoose = require('mongoose')
const blackListTokensModel = require('../models/blackListTokens');
const cloudinaryUploadChunkedBuffer = require('../Services/videoUpload.service.js');
const fs = require('fs');

module.exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, channelName, socketId } = req.body;

        const logoFile = req.files?.logo?.[0];
        const bgBannerFile = req.files?.bgBanner?.[0];

        if (!logoFile || !bgBannerFile) {
            return res.status(400).json({ error: 'Logo or background banner missing' });
        }

        const io = req.app.get('io');

        // Upload logo (from buffer)
        const logoUploaded = await cloudinaryUploadChunkedBuffer(
            logoFile.buffer,
            logoFile.mimetype,
            'image',
            io,
            socketId
        );

        if (logoUploaded?.status === 'Error') {
            return res.status(400).json({ message: logoUploaded.message || 'Failed to upload logo' });
        }

        // Upload background banner (from buffer)
        const bannerUploaded = await cloudinaryUploadChunkedBuffer(
            bgBannerFile.buffer,
            bgBannerFile.mimetype,
            'image',
            io,
            socketId
        );

        if (bannerUploaded?.status === 'Error') {
            return res.status(400).json({ message: bannerUploaded.message || 'Failed to upload banner' });
        }

        // Validate fields
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if user already exists
        const alreadyExists = await userModel.findOne({ email });
        if (alreadyExists) {
            return res.status(409).json({ message: 'User already exists. Please login.' });
        }

        // Hash password
        const hashedPassword = await userModel.hashpassword(password);

        const logoUrl = logoUploaded?.response?.secure_url || logoUploaded?.secure_url;
        const bannerUrl = bannerUploaded?.response?.secure_url || bannerUploaded?.secure_url;

        // Create user
        const newUser = await userService.createUser(
            name,
            email,
            hashedPassword,
            channelName,
            logoUrl,
            bannerUrl
        );

        // Generate token
        const token = await newUser.generateToken();

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            path: '/',
        });

        return res.status(201).json({ user: newUser, token });

    } catch (error) {
        console.error('Error in registerUser:', error);
        return res.status(500).json({ error: error.message, stack: error.stack });
    }
};



module.exports.login = async (req, res) => {
    console.log(req.body);

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
            maxAge: 30 * 60 * 60 * 24 * 1000,// 30 days
            path: '/',
        });




        return res.json({ token, user });
    } catch (err) {
        console.error(err);
    }
}




module.exports.logout = async (req, res) => {
    try {
        // res.cookie = '';

        const token = req.cookies.token;

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
    res.set('Cache-Control', 'no-store');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');
    try {
        const user = await userModel.findOne({ _id: req.user._id });
        return res.status(200).json({ user })
    }
    catch (err) {
        console.error(err)
    }
}


module.exports.getUsersForLogos = async (req, res) => {
    res.set('Cache-Control', 'no-store');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');

    try {
        const idsParam = req.query.ids;
        if (!idsParam) {
            return res.status(400).json({ message: 'No user IDs provided' });
        }

        const userIds = idsParam.split(',').map(id => id.trim());

        const users = await userModel.find({ _id: { $in: userIds } }).select('logoId channelName _id');

        // Convert to an object for easy frontend usage
        const userMap = {};
        users.forEach(user => {
            userMap[user._id] = {
                logoId: user.logoId,
                channelName: user.channelName
            };
        });

        return res.status(200).json(userMap);
    } catch (err) {
        console.error('Error in getUsersForLogos:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports.validateToken = async (req, res) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');
    res.json({ valid: true })
}