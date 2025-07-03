
const express = require('express');
const Router = express.Router();
const {auth}  = require('../Middlewares/auth.middleware.js');
const commentController = require('../Controllers/comment.controller.js');


Router.post('/addComment/:videoId', auth, commentController.comment);
Router.post('/getComments', auth, commentController.getComments)


module.exports = Router