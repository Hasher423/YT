// UploadVideo.jsx
import React, { useReducer, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';

const initialState = {
  video: null,
  thumbnail: null,
  title: '',
  description: '',
  isDragging: false,
  progress: 0,
  isUploaded: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_FILE':
      return { ...state, [action.field]: action.file };
    case 'SET_PROGRESS':
      return { ...state, progress: action.progress };
    case 'UPLOAD_SUCCESS':
      return { ...state, isUploaded: true, progress: 100 };
    case 'UPLOAD_ERROR':
      return { ...state, error: action.error, progress: 0 };
    case 'SET_DRAGGING':
      return { ...state, isDragging: action.isDragging };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function UploadVideo() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const abortController = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_DRAGGING', isDragging: false });
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      dispatch({ type: 'SET_FILE', field: 'video', file });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (!file) return;

    if (name === 'video' && file.type.startsWith('video/')) {
      dispatch({ type: 'SET_FILE', field: 'video', file });
    } else if (name === 'thumbnail' && file.type.startsWith('image/')) {
      dispatch({ type: 'SET_FILE', field: 'thumbnail', file });
    }
  };

  const handleText = (e) => {
    dispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.video || !state.thumbnail || !state.title || !state.description) {
      dispatch({ type: 'UPLOAD_ERROR', error: 'Please fill all fields' });
      return;
    }

    dispatch({ type: 'UPLOAD_ERROR', error: null });
    dispatch({ type: 'SET_PROGRESS', progress: 5 });

    try {
      // 1. Get signed upload data for video
      const videoSignRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/video/signUpload?type=video`
      );
      const videoSign = videoSignRes.data;

      // 2. Get signed upload data for thumbnail
      const thumbSignRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/video/signUpload?type=image`
      );
      const thumbSign = thumbSignRes.data;

      // 3. Upload Video directly to Cloudinary
      const videoFormData = new FormData();
      videoFormData.append('file', state.video);
      videoFormData.append('api_key', videoSign.apiKey);
      videoFormData.append('timestamp', videoSign.timestamp);
      videoFormData.append('signature', videoSign.signature);
      videoFormData.append('folder', videoSign.folder);
      videoFormData.append('public_id', videoSign.filename);

      const videoResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${videoSign.cloudName}/video/upload`,
        videoFormData,
        {
          withCredentials: false,
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            dispatch({ type: 'SET_PROGRESS', progress: 10 + percent * 0.7 }); // 10-80%
          },
          signal: (abortController.current = new AbortController()).signal,
        }
      );

      const videoUrl = videoResponse.data.secure_url;
      const publicId = videoResponse.data.public_id;
      const duration = videoResponse.data.duration || 0;

      dispatch({ type: 'SET_PROGRESS', progress: 85 });

      // 4. Upload Thumbnail
      const thumbFormData = new FormData();
      thumbFormData.append('file', state.thumbnail);
      thumbFormData.append('api_key', thumbSign.apiKey);
      thumbFormData.append('timestamp', thumbSign.timestamp);
      thumbFormData.append('signature', thumbSign.signature);
      thumbFormData.append('folder', thumbSign.folder);
      thumbFormData.append('public_id', thumbSign.filename);

      const thumbResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${thumbSign.cloudName}/image/upload`,
        thumbFormData,
        { withCredentials: false }
      );

      const thumbnailUrl = thumbResponse.data.secure_url;

      dispatch({ type: 'SET_PROGRESS', progress: 95 });

      

      // // 5. Save to your database
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/video/upload`,
        {
          title: state.title,
          description: state.description,
          videoResponse,
          thumbResponse,
          publicId,
          duration,
        },
        { withCredentials: true }
      );

      dispatch({ type: 'UPLOAD_SUCCESS' });
    } catch (err) {
      console.error('Upload failed:', err);
      let message = 'Upload failed. Please try again.';
      if (err.code === 'ERR_CANCELED') message = 'Upload cancelled';
      else if (err.response?.data?.error?.message)
        message = err.response.data.error.message;
      else if (err.message) message = err.message;

      dispatch({ type: 'UPLOAD_ERROR', error: message });
    }
  };

  // Cancel upload if user leaves
  useEffect(() => {
    return () => abortController.current?.abort();
  }, []);

  const showFinalising = state.progress >= 90 && state.progress < 100;

  return (
    <div className="min-h-screen bg-[#181818] flex items-center justify-center p-4 relative">
      {/* Finalising Loader */}
      {showFinalising && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
          <Loader size="lg" />
          <p className="mt-6 text-2xl text-white animate-pulse">Finalising your video...</p>
        </div>
      )}

      {/* Success Screen */}
      {state.isUploaded && (
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-bold text-white">Upload Complete!</h1>
          <p className="text-xl text-gray-300">Your video is now live</p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition"
          >
            Go Home
          </button>
        </div>
      )}

      {/* Upload Form */}
      {!state.isUploaded && (
        <form
          onSubmit={handleSubmit}
          onDragOver={(e) => {
            e.preventDefault();
            dispatch({ type: 'SET_DRAGGING', isDragging: true });
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            dispatch({ type: 'SET_DRAGGING', isDragging: false });
          }}
          onDrop={handleDrop}
          className={`max-w-2xl w-full bg-[#212121] p-10 rounded-2xl border-4 transition-all ${
            state.isDragging ? 'border-blue-500 bg-blue-500/5' : 'border-[#404040]'
          } space-y-8`}
        >
          <h2 className="text-3xl font-bold text-white text-center">Upload Video</h2>

          {/* Video Drop Zone */}
          {!state.video ? (
            <div className="border-4 border-dashed border-gray-600 rounded-xl p-16 text-center bg-[#2a2a2a]">
              <p className="text-2xl text-gray-400 mb-6">Drop your video here</p>
              <label className="cursor-pointer px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition">
                Choose Video File
                <input
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div className="text-green-400 text-center">
              Video Selected: {state.video.name} ({(state.video.size / 1024 / 1024).toFixed(1)} MB)
            </div>
          )}

          {/* Thumbnail */}
          {state.video && !state.thumbnail && (
            <div>
              <label className="block text-white text-lg mb-3">Choose Thumbnail</label>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-white file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                required
              />
            </div>
          )}

          {/* Title & Description */}
          {state.thumbnail && (
            <>
              <input
                required
                name="title"
                placeholder="Enter video title"
                value={state.title}
                onChange={handleText}
                className="w-full px-5 py-4 rounded-lg bg-white text-black text-lg"
              />
              <textarea
                required
                name="description"
                placeholder="Tell viewers about your video"
                value={state.description}
                onChange={handleText}
                rows={5}
                className="w-full px-5 py-4 rounded-lg bg-white text-black text-lg resize-none"
              />
            </>
          )}

          {/* Progress Bar */}
          {state.progress > 0 && state.progress < 100 && (
            <div className="space-y-2">
              <div className="flex justify-between text-white">
                <span>Uploading...</span>
                <span>{Math.round(state.progress)}%</span>
              </div>
              <div className="h-5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500"
                  style={{ width: `${state.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Error */}
          {state.error && (
            <div className="bg-red-900/50 border border-red-600 text-red-300 p-4 rounded-lg text-center">
              {state.error}
            </div>
          )}

          {/* Submit Button */}
          {state.video && state.thumbnail && state.title && state.description && (
            <div className="text-center pt-6">
              <button
                type="submit"
                disabled={state.progress > 0 && state.progress < 100}
                className="px-12 py-5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 text-white text-xl font-semibold rounded-xl transition shadow-lg"
              >
                {state.progress > 0 ? 'Uploading... Please Wait' : 'Upload Video'}
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}