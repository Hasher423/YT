const mongoose = require('mongoose');

async function connectToDb() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODBATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 20000,
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}

module.exports = connectToDb;
