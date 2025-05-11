const cloudinary = require("cloudinary").v2;
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");


module.exports.cloudinaryUploadChunked = async (filepath, resourceType) => {

    if (!filepath) throw new Error("FILE URL IS NOT PROVIDED (ARGUMENT OF VIDEOSERVICE.JS )");

    const fileSize = fs.statSync(filepath).size;
    const fileInMB = Math.floor((((fileSize) / 1024) / 1024))
    if (fileInMB > 101) {
        return {
            message: `File size ${fileInMB} exceeded the limit of Cloudinary `,
            status:"Error"
        }
    }
    console.log('filesize' + fileSize.toString());

    const chunkSize = Math.ceil(fileSize / (1024 * 1024)) * (1024 * 1024);

    const totalChunks = Math.ceil(fileSize / chunkSize);

    try {
        const stream = fs.createReadStream(filepath);

        const formData = new FormData();
        formData.append("file", stream);
        formData.append("upload_preset", "HYOUTUBE");
        formData.append("resource_type", resourceType);
        formData.append("folder", "my_videos");
        formData.append("chunk_size", chunkSize);
        formData.append("total_chunks", totalChunks);
        {
            resourceType === 'video' ?
                formData.append("public_id", `my_videos/video_${Date.now()}`)
                : formData.append("public_id", `my_thumbnail/thumbnail${Date.now()}`)
        }
        formData.append("Upload_id", `upload_${Date.now()}`);


        const response = await axios.post(
            resourceType === 'video'
                ? `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/video/upload`
                : `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
            formData,
            {
                headers: formData.getHeaders(),
                onUploadProgress: (progress) => {
                    const chunkProgress = Math.round((progress.loaded / chunkSize) * 100);
                    console.log(`Chunk Progress: ${chunkProgress}%`);
                },
            }
        );

        return { response }
    } catch (err) {
        console.error(err);
    }




}