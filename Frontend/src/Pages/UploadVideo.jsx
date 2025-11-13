import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import socket from '../Components/Socket';
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
      return { ...state, isUploaded: true, progress: 100, error: null };
    case 'UPLOAD_ERROR':
      return { ...state, error: action.error };
    case 'SET_DRAGGING':
      return { ...state, isDragging: action.isDragging };
    default:
      return state;
  }
}

export default function UploadVideo() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [socketId, setSocketId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const navigate = useNavigate();

  /* -----------------------------------------------------------------
   *  SOCKET – single instance, connection handling + PROGRESS
   * ----------------------------------------------------------------- */
  useEffect(() => {
    // Connect if not already
    if (!socket.connected) socket.connect();

    const onConnect = () => {
      console.log('Frontend socket connected:', socket.id);
      setSocketId(socket.id);
      setIsConnecting(false);
    };
    

    const onError = (err) => {
      console.error('socket error', err);
      setIsConnecting(false);
    };

    const onProgress = (pct) => {
      console.log('Progress event received:', pct); // <-- MUST appear in browser console
      // dispatch({ type: 'SET_PROGRESS', progress: pct });
    };

    socket.on('connect', onConnect);
    socket.on('connect_error', onError);
    socket.on('takePercentage', onProgress);

    // If already connected (HMR, page reload)
    if (socket.connected) {
      setSocketId(socket.id);
      setIsConnecting(false);
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('connect_error', onError);
      socket.off('takePercentage', onProgress);
    };
  }, [dispatch]); // <-- dispatch is now a dependency

  /* -----------------------------------------------------------------
   *  FILE HANDLERS
   * ----------------------------------------------------------------- */
  const handleDrop = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_DRAGGING', isDragging: false });
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      dispatch({ type: 'SET_FILE', field: 'video', file });
    } else {
      alert('Please drop a **video** file.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (!file) return;

    if (name === 'video' && !file.type.startsWith('video/')) {
      alert('Select a valid video file.');
      return;
    }
    if (name === 'thumbnail' && !file.type.startsWith('image/')) {
      alert('Select a valid image file.');
      return;
    }
    dispatch({ type: 'SET_FILE', field: name, file });
  };

  const handleText = (e) => {
    dispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });
  };

  /* -----------------------------------------------------------------
   *  SUBMIT – shows loader after 100%
   * ----------------------------------------------------------------- */
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (isConnecting || !socketId) {
  //     alert('Still connecting…');
  //     return;
  //   }

  //   dispatch({ type: 'UPLOAD_ERROR', error: null });
  //   dispatch({ type: 'SET_PROGRESS', progress: 0 });

  //   const form = new FormData();
  //   form.append('video_Url', state.video);
  //   form.append('thumbnail', state.thumbnail);
  //   form.append('title', state.title);
  //   form.append('description', state.description);
  //   form.append('socketid', socketId);

  //   try {
  //     await axios.post(`${import.meta.env.VITE_BACKEND_URI}/video/upload`, form, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //       withCredentials: true,
  //       timeout: 0,
  //     });

  //     dispatch({ type: 'UPLOAD_SUCCESS' });
  //   } catch (err) {
  //     const msg =
  //       err.response?.data?.message || err.message || 'Upload failed – please try again.';
  //     dispatch({ type: 'UPLOAD_ERROR', error: msg });
  //   }
  // };






  const handleSubmit = async (e) => {
  e.preventDefault();

  if (isConnecting || !socketId) {
    alert('Still connecting…');
    return;
  }

  dispatch({ type: 'UPLOAD_ERROR', error: null });
  dispatch({ type: 'SET_PROGRESS', progress: 0 });

  const form = new FormData();
  form.append('video_Url', state.video);
  form.append('thumbnail', state.thumbnail);
  form.append('title', state.title);
  form.append('description', state.description);
  form.append('socketid', socketId);

  try {
    await axios.post(`${import.meta.env.VITE_BACKEND_URI}/video/upload`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
      timeout: 0,
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log('Upload progress:', percent + '%'); // This works!
        dispatch({ type: 'SET_PROGRESS', progress: percent });
      },
    });

    dispatch({ type: 'UPLOAD_SUCCESS' });
  } catch (err) {
    const msg = err.response?.data?.message || err.message || 'Upload failed';
    dispatch({ type: 'UPLOAD_ERROR', error: msg });
  }
};









  /* -----------------------------------------------------------------
   *  UI – Loader after 100%
   * ----------------------------------------------------------------- */
  const showFinalisingLoader = state.progress === 100 && !state.isUploaded && !state.error;

  return (
    <div className="min-h-screen bg-[#181818] flex items-center justify-center p-4 relative">
      {/* ---------- FINALISING LOADER (after 100%) ---------- */}
      {showFinalisingLoader && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-50">
          <Loader size="lg" />
          <p className="mt-4 text-xl text-white animate-pulse">
            Finalising upload… please wait
          </p>
        </div>
      )}

      {/* ---------- SUCCESS SCREEN ---------- */}
      {state.isUploaded && (
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-white">
            Video uploaded successfully!
          </h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Home
          </button>
        </div>
      )}

      {/* ---------- UPLOAD FORM ---------- */}
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
          className={`max-w-2xl w-full bg-[#212121] p-8 rounded-xl border-2 transition-colors ${
            state.isDragging ? 'border-blue-500' : 'border-[#303030]'
          } space-y-6`}
        >
          {/* VIDEO */}
          {!state.video && (
            <div className="border-2 border-dashed border-gray-500 rounded-lg p-12 text-center bg-[#2a2a2a]">
              <p className="text-white mb-4">Drop a video or click below</p>
              <label className="cursor-pointer inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Choose Video
                <input
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {/* THUMBNAIL */}
          {state.video && !state.thumbnail && (
            <div>
              <label className="block text-white mb-2">Thumbnail</label>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white"
              />
            </div>
          )}

          {/* TITLE & DESC */}
          {state.video && state.thumbnail && (
            <>
              <input
                required
                name="title"
                placeholder="Title"
                value={state.title}
                onChange={handleText}
                className="w-full px-4 py-2 rounded bg-white text-black"
              />
              <textarea
                required
                name="description"
                placeholder="Description"
                value={state.description}
                onChange={handleText}
                rows={4}
                className="w-full px-4 py-2 rounded bg-white text-black resize-none"
              />
            </>
          )}

          {/* PROGRESS BAR – show as soon as upload starts */}
          {state.progress > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm text-white">
                <span>Uploading…</span>
                <span>{state.progress}%</span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-300 ease-out"
                  style={{ width: `${state.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* CONNECTION / ERROR */}
          {isConnecting && (
            <p className="text-yellow-400 text-center animate-pulse">
              Connecting to server…
            </p>
          )}
          {state.error && (
            <p className="text-red-500 bg-red-900/30 p-3 rounded text-center">
              {state.error}
            </p>
          )}

          {/* UPLOAD BUTTON */}
          {state.video && state.thumbnail && state.title && state.description && (
            <div className="text-center">
              <button
                type="submit"
                disabled={isConnecting || !socketId}
                className={`px-8 py-3 rounded font-medium transition ${
                  socketId && !isConnecting
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isConnecting
                  ? 'Connecting…'
                  : !socketId
                  ? 'Server Offline'
                  : 'Upload Video'}
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}