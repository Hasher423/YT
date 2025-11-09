require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
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
const commentRouter = require('./Routes/comment.routes')
const searchRouter = require('./Routes/search.routes')


const corsOptions = {
  origin: "https://yt-jpx7.vercel.app",  // frontend URL
  credentials: true,                     // allow cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"] ,
};

app.use(cors(corsOptions));

// Handle preflight OPTIONS requests for all routes
app.options("*", cors(corsOptions));
app.use('/uploads', express.static('uploads')) ;
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Working fine ');
});

app.get("/test-db", async (req, res) => {
  const state = mongoose.connection.readyState;
  res.send(state === 1 ? "DB Connected" : "DB Not Connected");
});
app.use('/user', userRouter);
app.use('/video', videoRouter);
app.use('/comment', commentRouter);
app.use('/search', searchRouter)

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
