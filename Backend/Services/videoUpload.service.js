const { Readable } = require('stream');
const cloudinary = require('cloudinary').v2;
const { getSocket } = require('../Controllers/initSocket.controller');

const emiProgressToSocket = (socketId, eventName, progress) => {
  const io = getSocket();
  if (socketId && io) {
    io.to(socketId).emit(eventName, progress);
  }
}

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
  id
) {
  if (!buffer || !mimetype) {
    throw new Error('Buffer or mimetype is missing.');
  }

  try {
    const fileSize = buffer.length;
    let lastEmittedPercent = 0;
    let offset = 0; // Move offset outside read()

    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: resourceType,
            folder: resourceType === 'video' ? 'my_videos' : 'my_thumbnail',
            public_id: `${resourceType === 'video' ? 'video_' : 'thumb_'}${Date.now()}`,
            chunk_size: 6 * 1024 * 1024, // ~6MB
            timeout: 180000, // 3 minutes
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        // Create readable stream from buffer in fixed chunks
        const CHUNK_SIZE = 2 * 1024 * 1024; // 6 MB
        const readStream = new Readable({
          read() {
            if (offset >= buffer.length) {
              this.push(null);
              return;
            }
            const end = Math.min(offset + CHUNK_SIZE, buffer.length);
            const chunk = buffer.slice(offset, end);
            offset = end;
            this.push(chunk);
          }
        });

        let uploadedBytes = 0;

        readStream.on('data', (chunk) => {
          uploadedBytes += chunk.length;
          const percent = Math.min(
            100,
            Math.round((uploadedBytes / fileSize) * 100)
          );

          if (percent !== lastEmittedPercent) {
            lastEmittedPercent = percent;
            emiProgressToSocket(id, 'takePercentage', percent)
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
    };
  }
};
