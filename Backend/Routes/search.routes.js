const express = require('express');
const Router = express.Router();
const searchController = require('../Controllers/search.controller');

Router.get('/searchVideo' ,searchController.searchVideo );
Router.get('/suggestions' , searchController.suggestions)



module.exports = Router;