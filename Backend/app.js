require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const connection = require('./DBConnection/db');
connection();

const configOfCloudinary = require('./Config/cloudinary.config');
configOfCloudinary();

const fileUpload = require('express-fileupload');
const userRouter = require('./Routes/user.routes');
const videoRouter = require('./Routes/video.routes');



app.use(cors({ origin: '*' }));



app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Working');
});
app.use('/user', userRouter);
app.use('/video', videoRouter);

// Global error handler
app.use((err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error:`, err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

module.exports = app;
