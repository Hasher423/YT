const cloudinary = require("cloudinary").v2;
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const videoModel = require("../models/video.model.js");

// module.exports.cloudinaryUploadChunked = async (filePath) => {
//     if (!fs.existsSync(filePath)) {
//         console.error("❌ Error: File not found at path:", filePath);
//         return { error: "File not found" };
//     }

//     const fileSize = fs.statSync(filePath).size;
//     const CHUNK_SIZE = Math.ceil(fileSize / (1024 * 1024)) * 1024 * 1024; // file as a single chunk
//     const totalChunks = Math.ceil(fileSize / CHUNK_SIZE);
//     const MAX_RETRIES = 3;

//     console.log(` File Size: ${Math.ceil(fileSize / (1024 * 1024))} MB`);
//     console.log(` Total Chunks: ${totalChunks}`);

//     let publicId = `my_videos/video_${Date.now()}`; // Set a consistent public_id for all chunks
//     let uploadId = `upload_${Date.now()}`; // Explicitly set a unique upload_id

//     for (let i = 0; i < totalChunks; i++) {
//         const start = i * CHUNK_SIZE;
//         const end = Math.min(start + CHUNK_SIZE, fileSize);
//         let attempt = 0;
//         let success = false;

//         while (attempt < MAX_RETRIES && !success) {
//             let stream = fs.createReadStream(filePath, { start, end });

//             try {
//                 const formData = new FormData();
//                 formData.append("file", stream);
//                 formData.append("upload_preset", "HYOUTUBE");
//                 formData.append("resource_type", "video");
//                 formData.append("folder", "my_videos");
//                 formData.append("chunk_number", i + 1);
//                 formData.append("total_chunks", totalChunks);
//                 formData.append("public_id", publicId); // Ensure same public_id for all chunks
//                 formData.append("upload_id", uploadId); // Use the explicitly set upload_id

//                 // Add 'final=true' for the last chunk
//                 if (i === totalChunks - 1) {
//                     formData.append("final", "true");
//                 }

//                 console.log(`🚀 Uploading Chunk ${i + 1}/${totalChunks}, Attempt ${attempt + 1}`);

//                 const response = await axios.post(
//                     `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/video/upload`,
//                     formData,
//                     {
//                         headers: formData.getHeaders(),
//                         onUploadProgress: (progress) => {
//                             const chunkProgress = Math.round((progress.loaded / CHUNK_SIZE) * 100);
//                             console.log(`Chunk ${i + 1} Progress: ${chunkProgress}%`);
//                         },
//                     }
//                 );

//                 console.log("✅ Cloudinary Response:", response.data);
//                 console.log(`✔️ Chunk ${i + 1} uploaded successfully.`);

//                 success = true;
//                 stream.on("error", (err) => {
//                     console.error("❌ Stream Error:", err.message);
//                 });
//             } catch (error) {
//                 stream.on("error", (err) => {
//                     console.error("❌ Stream Error:", err.message);
//                 });
//                 attempt++;
//                 console.error(`❌ Chunk ${i + 1} failed (Attempt ${attempt}):`, error.response?.data || error.message);

//                 if (attempt < MAX_RETRIES) {
//                     console.log(`🔁 Retrying Chunk ${i + 1} in 2 seconds...`);
//                     await new Promise((resolve) => setTimeout(resolve, 2000));
//                 } else {
//                     console.error(`❌ Chunk ${i + 1} failed after ${MAX_RETRIES} attempts.`);
//                     return { error: "Upload failed, please retry" };
//                 }
//             } finally {
//                 stream.close();
//             }
//         }
//     }

//     return { message: "✅ Upload Complete", public_id: publicId, upload_id: uploadId };
// };




module.exports.ToDataBase = async (
    title,
    description, {
        url,
        secureUrl,
        playback_url,
    },
    thumbnailObject,
    userId,
) => {
    const video = await videoModel.create({
        title,
        description,
        video_Url: {
            url,
            secureUrl,
            playback_url,
        },
        thumbnail_Url: {
            url: thumbnailObject.url,
            secureurl: thumbnailObject.secureUrl,
        },
        user: userId,

    })

    return  video ;

}