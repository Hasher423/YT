const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const videoModel = require('../models/video.model');
const userModel = require('../models/user.model');
const commentModel = require('../models/comment.model.js')
const Video = require('../models/video.model.js');
const videoView = require('../models/videoView.js');
const cloudinaryUploadChunkedBuffer = require('../Services/videoUpload.service.js');
const { ToDataBase } = require('../Services/video.service.js');


module.exports.createVideo = async (req, res) => {
  const { title, description, socketId } = req.body;

  const videoFile = req.files?.video_Url?.[0];
  const thumbnailFile = req.files?.thumbnail?.[0];

  if (!videoFile || !thumbnailFile) {
    return res.status(400).json({ message: "Video and thumbnail files are required" });
  }

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized - user not found" });
  }

  const io = req.app.get('io'); // get socket.io instance

  try {
    // Upload video
    const videoResponse = await cloudinaryUploadChunkedBuffer(
      videoFile.buffer,
      videoFile.mimetype,
      'video',
      io,
      socketId,
      'upload-progress-video' // custom event name
    );

    if (videoResponse?.status === 'Error') {
      return res.status(400).json({ message: videoResponse.message });
    }

    // Upload thumbnail
    const thumbnailResponse = await cloudinaryUploadChunkedBuffer(
      thumbnailFile.buffer,
      thumbnailFile.mimetype,
      'image',
      io,
      socketId,
      'upload-progress-thumbnail' // custom event name
    );

    if (thumbnailResponse?.status === 'Error') {
      return res.status(400).json({ message: thumbnailResponse.message });
    }

    // Extract URLs
    const videoData = {
      url: videoResponse?.response?.url || videoResponse?.url,
      secureUrl: videoResponse?.response?.secure_url || videoResponse?.secure_url,
      playback_url: videoResponse?.response?.playback_url || videoResponse?.playback_url,
    };

    const thumbnailData = {
      url: thumbnailResponse?.response?.url || thumbnailResponse?.url,
      secureUrl: thumbnailResponse?.response?.secure_url || thumbnailResponse?.secure_url,
    };

    // Save video info in DB
    const video = await ToDataBase(title, description, videoData, thumbnailData, req.user._id);
    return res.json({ success: true, video });

  } catch (err) {
    console.error("Upload Error:", err);
    const networkErrors = ['ENOTFOUND', 'ECONNREFUSED', 'ETIMEDOUT'];
    return res.status(500).json({
      message: networkErrors.includes(err.code) ? "Network Error" : "Internal Server Error"
    });
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


module.exports.increaseView = async (req, res) => {
  try {

    const { videoId } = req.params;
    const userId = req.user._id;

    // Check if already viewed
    const existing = await videoView.findOne({ videoId, userId });
    if (existing) return res.status(200).json({ message: 'Already viewed' });

    // Add to views collection
    await videoView.create({ videoId, userId });

    // Increment views on the video itself
    await Video.findByIdAndUpdate(videoId, { $inc: { views: 1 } });

    res.status(200).json({ message: 'View counted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to record view' });
  }
};



module.exports.increaseLike = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user._id;
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    if (video.likedByUsers.includes(userId)) {
      return res.status(400).json({ message: 'Video already liked' });
    }
    await Video.findByIdAndUpdate(videoId, {
      $inc: { likes: 1 },
      $push: { likedByUsers: userId }


    });



    return res.status(200).json({ message: "Video Liked Successfully" })
  } catch (err) {
    return res.status(401).json({ message: "Could not liked", err: err.message })
  }


}



module.exports.increaseDislike = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user._id;

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.dislikedByUsers.includes(userId)) {
      return res.status(400).json({ message: 'Video already disliked' });
    }

    await Video.findByIdAndUpdate(videoId, {
      $inc: { dislikes: 1 },
      $push: { dislikedByUsers: userId }
    });

    return res.status(200).json({ message: 'Video disliked successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Could not dislike', err: err.message });
  }
};


