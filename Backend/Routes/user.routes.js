const express = require('express');
const Router = express.Router();
const userController = require('../Controllers/user.controller')
const upload = require('../Config/multer.config')

Router.post('/signup', upload.single('logo'), userController.registerUser);
Router.post('/login', userController.login);
Router.get('/logout', userController.logout);

module.exports = Router;