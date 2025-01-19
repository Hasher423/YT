require('dotenv').config();
const express = require('express');
const app = express();
const connection  = require('./DBConnection/db');
connection()






app.use(express.json());
app.use(express.urlencoded({ extended : true }));







app.get('/', (req, res) => {
    res.send('Working')
})

module.exports = app;