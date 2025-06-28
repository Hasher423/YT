const express = require('express');
const Router = express.Router();
const userController = require('../Controllers/user.controller')
const { uploadFields } = require('../Config/multer.config')
const isLoggedIn = require('../Middlewares/auth.middleware')

Router.post('/signup', uploadFields([ { name: 'logo', maxCount: 1 }, { name: 'bgBanner', maxCount: 1 } ]), userController.registerUser);
Router.post('/login', userController.login);
Router.get('/logout', userController.logout);
Router.get('/getuser', isLoggedIn.auth, userController.getuser);
Router.get('/getuserForLogo/:userId', isLoggedIn.auth, userController.getuserForLogo);
Router.get('/validateToken', isLoggedIn.auth, userController.validateToken)

module.exports = Router;