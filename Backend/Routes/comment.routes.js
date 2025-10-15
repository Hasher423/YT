 
const express = require('express');
const Router = express.Router();
const { auth } = require('../Middlewares/auth.middleware.js');
const { comment, getComments } = require('../Controllers/comment.controller.js');


Router.post('/addComment/:videoId', auth, comment);
Router.post('/getComments', auth, getComments)


module.exports = Router
//it is 15 October 2025 (1st RRR)
