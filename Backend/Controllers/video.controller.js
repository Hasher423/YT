const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const videoModel = require('../models/video.model');
const userModel = require('../models/user.model');
const { cloudinaryUploadChunked } = require('../Services/videoUpload.service.js');
const { ToDataBase } = require('../Services/video.service.js');

module.exports.createVideo = async (req, res) => {
    const { title, description } = req.body;

    // Check files exist
    if (!req.files?.video_Url || !req.files?.thumbnail) {
        return res.status(400).json({ message: "Video and thumbnail files are required" });
    }

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized - user not found" });
    }

    try {
        const videoFilePath = req.files.video_Url[0]?.path;
        const thumbnailFilePath = req.files.thumbnail[0]?.path;

        if (!videoFilePath || !thumbnailFilePath) {
            return res.status(400).json({ message: "File paths are missing" });
        }

        // Upload video
        const videoResponse = await cloudinaryUploadChunked(videoFilePath, 'video');
        console.log(videoResponse)
        if (videoResponse?.status === 'Error') {
            return res.status(400).json({ message: videoResponse.message });
        }
        fs.unlink(videoFilePath, err => {
            if (err) console.error('Failed to delete video file:', err);
        });

        // Upload thumbnail
        const thumbnailResponse = await cloudinaryUploadChunked(thumbnailFilePath, 'image');
        if (thumbnailResponse?.status === 'Error') {
            return res.status(400).json({ message: thumbnailResponse.message });
        }
        fs.unlink(thumbnailFilePath, err => {
            if (err) console.error('Failed to delete thumbnail file:', err);
        });

        // Prepare URLs
        const videoData = {
            url: videoResponse?.url || videoResponse?.secure_url || videoResponse?.response?.data?.url,
            secureUrl: videoResponse?.secure_url || videoResponse?.response?.data?.secure_url,
            playback_url: videoResponse?.playback_url || videoResponse?.response?.data?.playback_url
        };

        const thumbnailData = {
            url: thumbnailResponse?.url || thumbnailResponse?.secure_url || thumbnailResponse?.response?.data?.url,
            secureUrl: thumbnailResponse?.secure_url || thumbnailResponse?.response?.data?.secure_url
        };

        // Save to DB
        const video = await ToDataBase(title, description, videoData, thumbnailData, req.user);
        return res.json({ success: true, video });

    } catch (err) {
        console.error("Upload Error:", err);
        if (['ENOTFOUND', 'ECONNREFUSED', 'ETIMEDOUT'].includes(err.code)) {
            return res.status(500).json({ message: "Network Error" });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.getVideos = async (req, res) => {
    console.log(req.query.page)
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const videos = await videoModel.find().skip(skip).limit(limit);
        const totalVideos = await videoModel.countDocuments();
        const totalPages = Math.ceil(totalVideos / limit);

        return res.status(200).json({
            videos,
            currentPage: page,
            totalPages,
            totalVideos
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching videos',
            error: error.message
        });
    }
};

module.exports.getVideo = async (req, res) => {
    try {
        const video = await videoModel.findById(req.query.v);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        return res.json({ success: true, video });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching video', error: error.message });
    }
}
