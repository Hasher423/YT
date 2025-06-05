const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');
const videoModel = require('../models/video.model');
const fs = require('fs');
const userModel = require('../models/user.model');
const { cloudinaryUploadChunked } = require('../Services/videoUpload.service.js');
const { ToDataBase } = require('../Services/video.service.js')

module.exports.createVideo = async (req, res) => {
    const { title, description } = req.body;
    console.log(req.files, req.file)
    // Validate required fields
    if (!req.files.thumbnail || !req.files.video_Url) {
        return res.status(400).json({ message: "Video or thumbnail file is required" });
    }

    try {
        console.log(req.files)
        const response = await cloudinaryUploadChunked(req.files.video_Url[0].path, 'video');
        if (response.status == 'Error') {
            return res.status(400).send(response.message)
        }
        fs.unlink(req.files.video_Url[0].path, (err) => {
            if (err) throw err;
            console.log('video was deleted');
        });

        const thumbnail = await cloudinaryUploadChunked(req.files.thumbnail[0].path, 'image');
        fs.unlink(req.files.thumbnail[0].path, (err) => {
            if (err) throw err;
            console.log('thumbnail was deleted');
        });

        console.log(thumbnail);



        if (!thumbnail && !response) {
            return res.json({ error: 'video or thumnail could not be uploaded' });
        }


        const video = await ToDataBase(
            title,
            description,
            {
                url: response?.url || response?.response.data.url,
                secureUrl: response?.secure_url || response?.response.data.secureurl,
                playback_url: response?.playback_url || response?.response.data.playback_url,
            },
            {
                url: thumbnail?.url || thumbnail?.response.data.url,
                secureUrl: thumbnail?.secure_url || thumbnail?.response.data.secure_url,
            },
            req.user_id
        );


        res.json({ success: true, video });

    } catch (err) {
        if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
            console.error("Network Error:");
            res.status(500).json({ message: "net Error " });
        } else {
            console.error("Upload Error:", err);
        }
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" });
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
