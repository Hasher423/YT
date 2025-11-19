const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

const connection = require('./DBConnection/db');
const configOfCloudinary = require('./Config/cloudinary.config');

const userRouter = require('./Routes/user.routes');
const videoRouter = require('./Routes/video.routes');
const commentRouter = require('./Routes/comment.routes');
const searchRouter = require('./Routes/search.routes');

const app = express();

const corsOptions = {
  origin:[ "https://yt-jpx7.vercel.app", "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Pragma"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

const allowedOrigins = [
  "https://yt-jpx7.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Cache-Control, Pragma");
  next();
});

connection();
configOfCloudinary();

app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
// app.use(fileUpload());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => res.send('Working fine'));

app.get("/test-db", async (req, res) => {
  const state = mongoose.connection.readyState;
  res.send(state === 1 ? "DB Connected" : "DB Not Connected");
});

app.use('/user', userRouter);
app.use('/video', videoRouter);
app.use('/comment', commentRouter);
app.use('/search', searchRouter);

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

module.exports = app;
