const express = require('express');
const Router = express.Router();
const videoController = require('../Controllers/video.controller')
const { uploadFields } = require('../Config/multer.config');
const isLoggedIn = require('../Middlewares/auth.middleware');



Router.post('/upload', uploadFields([
    { name: 'video_Url', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]), isLoggedIn.auth ,videoController.createVideo);


Router.get('/getVideos' , isLoggedIn.auth,videoController.getVideos)
Router.get('/getVideo' , isLoggedIn.auth,videoController.getVideo)
Router.post('/increase-view/:videoId', isLoggedIn.auth, videoController.increaseView);
Router.post('/handleLike/:videoId',isLoggedIn.auth, videoController.handleLike);
Router.post('/handleDislike/:videoId',isLoggedIn.auth, videoController.handleDislike);


module.exports = Router;