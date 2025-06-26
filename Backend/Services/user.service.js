const userModel = require('../models/user.model')
const cloudinary  = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET, // Click 'View API Keys' above to copy your API secret
});



module.exports.createUser = async (name, email, hashedPassword, channelName, logoId, bgBanner) => {
    try {
      const user = await userModel.create({
        name,
        email,
        password:hashedPassword,
        channelName,
        logoId,
        bgBanner,
      });
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
  