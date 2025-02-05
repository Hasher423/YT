// FILEPATH: e:/things/YT/Backend/Controllers/video.controller.js

const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');
const videoModel = require('../models/video.model')
const userModel = require('../models/user.model')
// Assuming you've already configured Cloudinary in your project

module.exports.createVideo = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!req.files || !req.files.video_Url) {
            return res.status(400).json({ message: 'Video file is required' });
        }

        const videoFile = req.files.video_Url[0];
        const thumbnailFile = req.files.thumbnail ? req.files.thumbnail[0] : null;

        // Send initial response when upload starts
        res.write(JSON.stringify({ message: "Upload started..." }) + "\n");

        // Function to upload file to Cloudinary
        const uploadToCloudinary = async (file, resourceType) => {
            console.log('Uploading file:', file);
            
            const stream = cloudinary.uploader.upload_stream({ resource_type: resourceType });
        
            Readable.from(file.buffer).pipe(stream);
        
            return stream;
        };
        

        // Upload video
        const videoUpload = await uploadToCloudinary(videoFile, 'video');
        res.write(JSON.stringify({ message: "Video uploaded successfully..." }) + "\n");

        // Upload thumbnail if it exists
        let thumbnailUpload = null;
        if (thumbnailFile) {
            thumbnailUpload = await uploadToCloudinary(thumbnailFile, 'image');
            res.write(JSON.stringify({ message: "Thumbnail uploaded successfully..." }) + "\n");
        }

        // Save video data
        const videoBASE = await videoModel.create({
            title,
            description,
            video_Url: {
                url: videoUpload.secure_url,
                public_id: videoUpload.public_id,
                format: videoUpload.format,
                resource_type: videoUpload.resource_type
            },
            thumbnail_Url: thumbnailUpload ? {
                url: thumbnailUpload.secure_url,
                public_id: thumbnailUpload.public_id,
                format: thumbnailUpload.format,
                resource_type: thumbnailUpload.resource_type
            } : null
        });

        // Update user data
        const user = await userModel.findById(req.user);
        user.videoData.push({
            video_Url: videoBASE.video_Url,
            thumbnail_Url: videoBASE.thumbnail_Url
        });
        await user.save();

        console.log(user);

        // Final response
        res.end(JSON.stringify({ message: "Upload process completed successfully" }));
    } catch (error) {
        console.error('Detailed error:', JSON.stringify(error, null, 2));
        console.error('Stack trace:', error.stack);
        res.end(JSON.stringify({ message: "Error uploading video and thumbnail", error: error.message }));
    }
};



module.exports.getVideos = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const videos = await videoModel.find()
            .skip(skip)
            .limit(limit)

        const totalVideos = await videoModel.countDocuments();
        const totalPages = Math.ceil(totalVideos / limit);

        res.status(200).json({
            videos,
            currentPage: page,
            totalPages,
            totalVideos
        });
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({ message: 'Error fetching videos', error: error.message });
    }
};

