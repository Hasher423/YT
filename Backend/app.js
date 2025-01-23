require('dotenv').config();
const express = require('express');
const app = express();
const connection = require('./DBConnection/db');
connection()
const userRouter = require('./Routes/user.routes')
const fileUpload = require('express-fileupload');


const configOfCloudinary = require('./Config/cloudinary.config')
configOfCloudinary();











app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.get('/', (req, res) => {
    res.send('Working')
})


app.use('/user', userRouter);

module.exports = app;