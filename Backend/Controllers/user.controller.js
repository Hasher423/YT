const userService = require('../Services/user.service')
const userModel = require('../models/user.model')
const mongoose = require('mongoose')



const cloudinary = require('cloudinary').v2


cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_KEY,
        api_secret: process.env.CLOUD_SECRET, // Click 'View API Keys' above to copy your API secret
});


module.exports.registerUser = async (req, res) => {
        try {


                const { name, email, password, channelName } = req.body;
                console.log(req.files)


                if (!name || !email || !password) {
                        return res.status(400).json({ error: 'Missing required fields' + email, password, name });
                }



                const hashedPassword = await userModel.hashpassword(password);


                const uploadLogo = await cloudinary.uploader.upload(req.files.logo.tempFilePath)

                const newUser = await userService.createUser(
                        name,
                        email,
                        hashedPassword,
                        channelName,
                        uploadLogo.secure_url,
                        uploadLogo.public_id,
                )


                return res.json(newUser);

                console.log('Created user:', user);
                return res.status(201).json(user);
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
                return res.json({ token, user });
        } catch (err) {
                console.error(err);
        }
}

