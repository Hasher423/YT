const express = require('express');
const Router = express.Router();
const videoController = require('../Controllers/video.controller')
const { uploadFields } = require('../Config/multer.config');
const { auth } = require('../Middlewares/auth.middleware');



Router.post('/upload', uploadFields([
    { name: 'video_Url', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]), auth ,videoController.createVideo);


Router.get('/getVideos' , videoController.getVideos)
Router.get('/getVideo' , videoController.getVideo)
Router.post('/increase-view/:videoId', auth, videoController.increaseView);


module.exports = Router;