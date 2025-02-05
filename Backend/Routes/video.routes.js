const express = require('express');
const Router = express.Router();
const videoController = require('../Controllers/video.controller')
const upload = require('../Config/multer.config');
const { auth } = require('../Middlewares/auth.middleware');



Router.post('/upload',auth,upload.fields([
    { name: 'video_Url', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]), videoController.createVideo);


Router.get('/getVideos' , videoController.getVideos)



module.exports = Router;