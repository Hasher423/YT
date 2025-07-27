
import React, { useReducer } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
      return { ...state, isUploaded: true };
    case 'UPLOAD_ERROR':
      return { ...state, error: action.error };
    case 'SET_DRAGGING':
      return { ...state, isDragging: action.isDragging };
    default:
      return state;
  }
}

const UploadVideo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_DRAGGING', isDragging: false });
    const file = e.dataTransfer.files[0];
    if (file) {
      dispatch({ type: 'SET_FILE', field: 'video', file });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (file) {
      dispatch({ type: 'SET_FILE', field: name, file });
    }
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPLOAD_ERROR', error: null });

    const data = new FormData();
    data.append('video_Url', state.video);
    data.append('thumbnail', state.thumbnail);
    data.append('title', state.title);
    data.append('description', state.description);
    // Removed socketId from form data

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/video/upload`,
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      if (res.data.success) dispatch({ type: 'UPLOAD_SUCCESS' });
    } catch (err) {
      dispatch({
        type: 'UPLOAD_ERROR',
        error: err.response?.data || 'Upload failed.',
      });
    }
  };

  return (
    <div className="w-screen h-screen bg-[#181818] flex items-center justify-center p-6">
      {state.isUploaded ? (
        <div className="relative w-full max-w-2xl h-full flex items-center justify-center">
          <h1 className="text-white text-2xl text-center">✅ Video uploaded successfully!</h1>
          <button
            onClick={() => navigate('/')}
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
            dispatch({ type: 'SET_DRAGGING', isDragging: true });
          }}
          onDragLeave={() => dispatch({ type: 'SET_DRAGGING', isDragging: false })}
          onDrop={handleDrop}
          className={`w-full max-w-2xl bg-[#212121] p-6 rounded-xl border-2 transition-colors ${
            state.isDragging ? 'border-blue-500' : 'border-[#303030]'
          } flex flex-col gap-4`}
        >
          {!state.video && (
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

          {state.video && !state.thumbnail && (
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

          {state.video && state.thumbnail && (
            <>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={state.title}
                onChange={handleTextChange}
                className="px-4 py-2 rounded bg-white text-black"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={state.description}
                onChange={handleTextChange}
                className="px-4 py-2 rounded bg-white text-black h-24 resize-none"
                required
              />
            </>
          )}

          {state.progress > 0 && (
            <div className="w-full h-2 bg-gray-700 rounded">
              <div
                className="h-full bg-green-500 rounded"
                style={{ width: `${state.progress}%` }}
              ></div>
            </div>
          )}

          {state.error && (
            <p className="text-red-500 text-sm text-center">
              {typeof state.error === 'object' ? JSON.stringify(state.error) : state.error}
            </p>
          )}

          {state.video &&
            state.thumbnail &&
            state.title &&
            state.description && (
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
