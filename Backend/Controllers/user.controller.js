const userService = require('../Services/user.service')
const userModel = require('../models/user.model')
const mongoose = require('mongoose')
const blackListTokensModel = require('../models/blackListTokens');
const { cloudinaryUploadChunked } = require('../Services/videoUpload.service.js');
const fs = require('fs');

module.exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, channelName } = req.body;

        const logoFile = req.files?.logo?.[0];
        const bgBannerFile = req.files?.bgBanner?.[0];

        if (!logoFile || !bgBannerFile) {
            return res.status(400).json({ error: 'Logo or background banner missing' });
        }

        // Upload logo to cloudinary
        const logoUploaded = await cloudinaryUploadChunked(logoFile.path, 'image');
        if (!logoUploaded) {
            return res.status(400).json({ message: "Failed to upload logo" });
        }

        // Clean local logo file
        fs.unlink(logoFile.path, (err) => {
            if (err) throw err;
            console.log('logo in local folder has been deleted');
        });

        // upload Banner to cloudinary 
        const bannerUploaded = await cloudinaryUploadChunked(bgBannerFile.path , 'image');
        if(!bannerUploaded)
        {
            return res.status(400).json({ message: "Failed to upload logo" });
        }

        // Clean local logo file
        fs.unlink(bgBannerFile.path, (err) => {
            if (err) throw err;
            console.log('Banner in local folder has been deleted');
        });

        // Validate fields
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Hash password and check user
        const hashedPassword = await userModel.hashpassword(password);
        const alreadyExists = await userModel.findOne({ email });
        if (alreadyExists) {
            return res.status(409).send("User Already exists. LOGIN");
        }

        const logoId = logoUploaded?.status === 'Success' ? logoUploaded?.response?.url : null;        
        const bgBanner = bannerUploaded?.status === 'Success' ? bannerUploaded?.response?.url : null;

        // Create user
        const newUser = await userService.createUser(
            name,
            email,
            hashedPassword,
            channelName,
            logoId,
            bgBanner, 
        );

        // Generate token and set cookie
        const token = await newUser.generateToken();
        res.cookie('token', token, {
            httpOnly: false,
            secure: false,
            sameSite: 'Lax',
            maxAge: 30 * 60 * 60 * 24 * 1000,
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
        const user = await userModel.findOne({ _id: req.user });
        return res.status(200).json({ user })
    }
    catch (err) {
        console.error(err)
    }
}



module.exports.getuserForLogo = async (req, res) => {
    res.set('Cache-Control', 'no-store');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');
    try {
        const user = await userModel.findOne({ _id: req.params.userId });
        return res.status(200).json({ user })
    }
    catch (err) {
        console.error(err)
    }
}


module.exports.validateToken = async (req, res) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');
    res.json({ valid: true })
}