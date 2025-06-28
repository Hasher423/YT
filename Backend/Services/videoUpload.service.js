const { Readable } = require('stream');
const cloudinary = require('cloudinary').v2;

/**
 * Upload large video/image buffer using stream (avoids timeouts)
 * @param {Buffer} buffer - File buffer
 * @param {string} mimetype - MIME type
 * @param {string} resourceType - "video" or "image"
 * @returns {Promise<{ response: any, status: string }>}
 */
module.exports.cloudinaryUploadChunkedBuffer = async (buffer, mimetype, resourceType = 'video') => {
  if (!buffer || !mimetype) {
    throw new Error('Buffer or mimetype is missing.');
  }

  const fileSize = buffer.length;
  const fileInMB = Math.floor(fileSize / 1024 / 1024);
  if (fileInMB > 101) {
    return {
      message: `File size ${fileInMB}MB exceeded the limit of Cloudinary`,
      status: 'Error',
    };
  }

  const streamUpload = () =>
    new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType,
          folder: resourceType === 'video' ? 'my_videos' : 'my_thumbnail',
          public_id: `${resourceType === 'video' ? 'my_videos' : 'my_thumbnail'}/video_${Date.now()}`,
          chunk_size: 6 * 1024 * 1024,
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      );

      Readable.from(buffer).pipe(uploadStream);
    });

  try {
    const result = await streamUpload();
    return { response: result, status: 'Success' };
  } catch (err) {
    console.error('Cloudinary upload failed:', err.message || err);
    return {
      message: err.code === 'ENOTFOUND' ? 'Internet not available' : err.message,
      status: 'Error',
    };
  }
};
