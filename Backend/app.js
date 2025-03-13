require('dotenv').config();
const express = require('express');
const app = express();
const connection = require('./DBConnection/db');
connection()
const cors = require('cors');
const userRouter = require('./Routes/user.routes')
const videoRouter = require('./Routes/video.routes')
const fileUpload = require('express-fileupload');
const { auth } = require('./Middlewares/auth.middleware')
const cookieParser = require('cookie-parser')

const configOfCloudinary = require('./Config/cloudinary.config')
configOfCloudinary();






// MORGAN


// Add this near the top of your file, after other imports
const morgan = require('morgan');

// Add these middlewares
app.use(morgan('dev')); // For logging requests





const cloudinary = require('cloudinary').v2
const upload = require('./Config/multer.config')




const fs = require('fs')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enhanced request logging
app.use((req, res, next) => {
    const logData = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body
    };
    if (req.files) {
        logData.files = Object.keys(req.files).map(key => ({
            fieldname: key,
            files: req.files[key].map(f => f.originalname)
        }));
    }
    console.log('Request:', JSON.stringify(logData, null, 2));
    next();
});



app.use(cors());
app.use(cookieParser());



const streamifier = require('streamifier');



app.get('/', (req, res) => {
    res.send('Working')
})

// app.post('/upload', upload.fields([
//     { name: 'video_Url', maxCount: 1 },
//     { name: 'thumbnail', maxCount: 1 }
// ]), async (req, res) => {




//     const filePath = 'uploads\\1739901504702-bgvideo.webm'

//     const uploadToCloudinary = (filePath) => {
//         return new Promise((resolve, reject) => {
//             const stream = cloudinary.uploader.upload_large(filePath,
//                 {
//                     resource_type: "auto",
//                     chunk_size: 50 * 1024 * 1024, // 50MB chunks
//                     timeout: 300000 // 5 minutes
//                 }, // Change based on file type
//                 (error, result) => {
//                     fs.unlinkSync(filePath); // Remove temp file
//                     if (error) reject(error);
//                     else resolve(result);
//                 }
//             );
//         });
//     };


//     uploadToCloudinary(filePath)
//         .then(result => res.json(result))
//         .catch(err => res.status(500).json({ error: err.message }));

//     console.log(req.files)
//     // res.send('done')
// });




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
