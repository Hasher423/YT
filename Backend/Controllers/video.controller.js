// FILEPATH: e:/things/YT/Backend/Controllers/video.controller.js

const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');
const videoModel = require('../models/video.model')
const userModel = require('../models/user.model')
// Assuming you've already configured Cloudinary in your project

exports.createVideo = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!req.files || !req.files.video_Url) {
            return res.status(400).json({ message: 'Video file is required' });
        }

        const videoFile = req.files.video_Url[0];
        const thumbnailFile = req.files.thumbnail[0];

        // Function to upload file to Cloudinary
        const uploadToCloudinary = (file, resourceType) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: resourceType },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                Readable.from(file.buffer).pipe(stream);
            });
        };

        // Upload video
        const videoUpload = await uploadToCloudinary(videoFile, 'video');

        // Upload thumbnail if it exists
        let thumbnailUpload = null;
        if (thumbnailFile) {
            thumbnailUpload = await uploadToCloudinary(thumbnailFile, 'image');
        }




        const videoBASE = await videoModel.create({

            title,
            description,
            video_Url: {
                url: videoUpload.secure_url,
                public_id: videoUpload.public_id,
                format: videoUpload.format,
                resource_type: videoUpload.resource_type
            },
            thumbnail_Url: {
                url: thumbnailUpload.secure_url,
                public_id: thumbnailUpload.public_id,
                format: thumbnailUpload.format,
                resource_type: thumbnailUpload.resource_type
            },
        })

        const user = await userModel.findById(req.user);
        user.videoData.push({
            video_Url:videoBASE.video_Url,
            thumbnail_Url:videoBASE.thumbnail_Url
        });
        await user.save();
        console.log(user);
        
        res.status(200).json({
            message: 'Video and thumbnail uploaded successfully',

        });
    } catch (error) {
        console.error('Detailed error:', JSON.stringify(error, null, 2));
        console.error('Stack trace:', error.stack);
        res.status(500).json({ message: 'Error uploading video and thumbnail', error: error.message });
    }
};
