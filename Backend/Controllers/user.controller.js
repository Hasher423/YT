const userService = require('../Services/user.service')
const userModel = require('../models/user.model')
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2;



module.exports.registerUser = async (req, res) => {
        try {
            const { name, email, password, channelName } = req.body;
    
            if (!name || !email || !password) {
                return res.status(400).json({ error: 'Missing required fields' });
            }
    
            const hashedPassword = await userModel.hashpassword(password);
    
            let uploadLogo = null;
            if (req.file) {
                uploadLogo = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { resource_type: 'auto' },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    ).end(req.file.buffer);
                });
            }
    
            const newUser = await userService.createUser(
                name,
                email,
                hashedPassword,
                channelName,
                uploadLogo ? uploadLogo.secure_url : null,
                uploadLogo ? uploadLogo.public_id : null
            );
    
            console.log('Created user:', newUser);
            return res.status(201).json(newUser);
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

