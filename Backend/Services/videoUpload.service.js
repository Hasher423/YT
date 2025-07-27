const { Readable } = require('stream');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

/**
 * Upload large video/image buffer using stream (avoids timeouts)
 * @param {Buffer} buffer - File buffer
 * @param {string} mimetype - MIME type
 * @param {string} resourceType - "video" or "image"
 * @returns {Promise<{ response: any, status: string }>}
 */
module.exports = async function cloudinaryUploadChunkedBuffer(
  buffer,
  mimetype,
  resourceType = 'video',
  eventName = 'upload-progress-video'
) {
  if (!buffer || !mimetype) {
    throw new Error('Buffer or mimetype is missing.');
  }

  try {
    const fileSize = buffer.length;
    let lastEmittedPercent = 0;

    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: resourceType,
            folder: resourceType === 'video' ? 'my_videos' : 'my_thumbnail',
            public_id: `${resourceType === 'video' ? 'video_' : 'thumb_'}${Date.now()}`,
            chunk_size: 6 * 1024 * 1024,
            timeout: 180000, // 3 minutes
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        const readStream = streamifier.createReadStream(buffer);
        let uploadedBytes = 0;

        readStream.on('data', (chunk) => {
          uploadedBytes += chunk.length;
          const percent = Math.round((uploadedBytes / fileSize) * 100);

          if (percent !== lastEmittedPercent) {
            lastEmittedPercent = percent;
            console.log(`📤 Upload progress: ${percent}%`);

          }
        });

        readStream.pipe(uploadStream);
      });

    const result = await streamUpload();
    return { status: 'Success', response: result };

  } catch (err) {
    console.error('❌ Cloudinary chunked upload error:', err.message);
    if (err.message === 'Request Timeout') {
      return {
        status: 'Error',
        message: 'Weak internet Connection Try Again',
      };
    }

    return {
      status: 'Error',
      message: err.message || 'Upload Failed'
    }
  }
};
