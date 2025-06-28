const mongoose = require('mongoose');

function connectToDb() {
    mongoose.connect(process.env.MONGODBATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('✅ Connected to MongoDB');
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1); // Exit the process if connection fails
    });
}

module.exports = connectToDb;
