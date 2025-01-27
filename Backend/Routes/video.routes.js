const express = require('express');
const Router = express.Router();
const videoController = require('../Controllers/video.controller')
const upload = require('../Config/multer.config')



Router.post('/upload',upload.fields([
    { name: 'video_Url', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]), videoController.createVideo);



module.exports = Router;