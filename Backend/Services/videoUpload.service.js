const cloudinary = require("cloudinary").v2;
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

module.exports.cloudinaryUploadChunked = async (filepath, resourceType = "video") => {
  if (!filepath) throw new Error("FILE URL IS NOT PROVIDED (ARGUMENT OF VIDEOSERVICE.JS)");

  // Check if file exists
  if (!fs.existsSync(filepath)) {
    return {
      message: `File not found at path: ${filepath}`,
      status: "Error",
    };
  }

  const fileSize = fs.statSync(filepath).size;
  const fileInMB = Math.floor(fileSize / 1024 / 1024);

  if (fileInMB > 101) {
    return {
      message: `File size ${fileInMB}MB exceeded the limit of Cloudinary`,
      status: "Error",
    };
  }

  const chunkSize = Math.ceil(fileSize / (1024 * 1024)) * (1024 * 1024);
  const totalChunks = Math.ceil(fileSize / chunkSize);
  console.log(`Total Chunks: ${totalChunks}`);

  try {
    const stream = fs.createReadStream(filepath);
    const formData = new FormData();

    formData.append("file", stream);
    formData.append("upload_preset", "HYOUTUBE");
    formData.append("resource_type", resourceType);
    formData.append("folder", resourceType === "video" ? "my_videos" : "my_thumbnail");
    formData.append("chunk_size", chunkSize);
    formData.append("total_chunks", totalChunks);

    const publicId = resourceType === "video"
      ? `my_videos/video_${Date.now()}`
      : `my_thumbnail/thumbnail_${Date.now()}`;
    formData.append("public_id", publicId);

    formData.append("upload_id", `upload_${Date.now()}`);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/${resourceType}/upload`;

    const response = await axios.post(cloudinaryUrl, formData, {
      headers: formData.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      onUploadProgress: (progress) => {
        const chunkProgress = Math.round((progress.loaded * 100) / progress.total);
        console.log(`Chunk Progress: ${chunkProgress}%`);
      },
    });

    return { response: response.data, status: "Success" };
  } catch (err) {
    console.error("Cloudinary upload failed:", err?.message || err);
    return {
      message: err.code === "ENOTFOUND" ? "Internet not available" : err.message,
      status: "Error",
    };
  }
};
