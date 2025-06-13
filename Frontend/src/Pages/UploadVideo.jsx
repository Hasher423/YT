import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const UploadVideo = () => {
  const [formData, setFormData] = useState({
    video: null,
    thumbnail: null,
    title: '',
    description: '',
  });

  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [error, setError] = useState(null);
  const Navigate = useNavigate()

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, video: file }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (file) {
      setFormData((prev) => ({ ...prev, [name]: file }));
    }
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const data = new FormData();
    data.append('video_Url', formData.video);
    data.append('thumbnail', formData.thumbnail);
    data.append('title', formData.title);
    data.append('description', formData.description);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/video/upload`,
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded / e.total) * 100);
            setProgress(percent);
          },
        }
      );
      if (res.data.success) setIsUploaded(true);
    } catch (err) {
      setError(err.response?.data || 'Upload failed.');
    }
  };

  return (
    <div className="w-screen h-screen bg-[#181818] flex items-center justify-center p-6">
      {isUploaded ? (
        <div className="relative w-full max-w-2xl h-full flex items-center justify-center">
          <h1 className="text-white text-2xl text-center">✅ Video uploaded successfully!</h1>
          <button
            onClick={() => Navigate('/')}
            className="absolute bottom-4 right-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Go Home
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`w-full max-w-2xl bg-[#212121] p-6 rounded-xl border-2 transition-colors ${isDragging ? 'border-blue-500' : 'border-[#303030]'
            } flex flex-col gap-4`}
        >
          {/* Video input */}
          {!formData.video && (
            <div className="flex flex-col items-center justify-center border-2 border-dashed p-10 rounded bg-[#2a2a2a] text-white">
              <p>📽️ Drag and drop a video here or</p>
              <input
                type="file"
                name="video"
                accept="video/*"
                onChange={handleFileChange}
                className="mt-2 text-white"
              />
            </div>
          )}

          {/* Thumbnail input */}
          {formData.video && !formData.thumbnail && (
            <div className="flex flex-col gap-2">
              <label className="text-white">Select a thumbnail:</label>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleFileChange}
                className="text-white"
              />
            </div>
          )}

          {/* Title & Description */}
          {formData.video && formData.thumbnail && (
            <>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleTextChange}
                className="px-4 py-2 rounded bg-white text-black"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleTextChange}
                className="px-4 py-2 rounded bg-white text-black h-24 resize-none"
                required
              />
            </>
          )}

          {/* Progress bar */}
          {progress > 0 && (
            <div className="w-full h-2 bg-gray-700 rounded">
              <div
                className="h-full bg-green-500 rounded"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              {typeof error === 'object' ? JSON.stringify(error) : error}
            </p>
          )}

          {/* Upload Button */}
          {formData.video &&
            formData.thumbnail &&
            formData.title &&
            formData.description && (
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
              >
                Upload Video
              </button>
            )}
        </form>
      )}
    </div>
  );
};

export default UploadVideo;
