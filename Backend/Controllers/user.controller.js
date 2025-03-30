const userService = require('../Services/user.service')
const userModel = require('../models/user.model')
const mongoose = require('mongoose')
const blackListTokensModel = require('../models/blackListTokens')


module.exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, channelName } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const hashedPassword = await userModel.hashpassword(password);



        const newUser = await userService.createUser(
            name,
            email,
            hashedPassword,
            channelName,
        );
        const token = await newUser.generateToken();
        res.cookie('token', token)

        return res.status(201).json({user: newUser, token});
    } catch (err) {
        console.error('Error in registerUser:', err);
        return res.status(500).json({ error: err.message, stack: err.stack });
    }
}



module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ error: 'Email and password are required' });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ error: 'User not found' });

        }


        const isMatch = user.checkPassword(password);

        if (!isMatch) {
            return res.json({ error: 'Invalid email or password' });
        }

        const token = await user.generateToken();
        res.cookie('token', token)
        return res.json({ token, user });
    } catch (err) {
        console.error(err);
    }
}




module.exports.logout = async (req, res) => {
    try {
        // res.cookie = '';

        const token =   req.headers.authorization?.split(' ')[1] ||  req.cookies.token;

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