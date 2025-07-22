  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
  import axios from 'axios';
  import { calculateAgo } from '../../utils/Ago';




  // Thunks
  export const fetchVideo = createAsyncThunk('video/fetchVideo', async (videoId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/video/getVideo?v=${videoId}`,{
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  });

  export const increaseViewCount = createAsyncThunk(
    'video/increaseView',
    async (videoId, { rejectWithValue }) => {
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URI}/video/increase-view/${videoId}`, {}, { withCredentials: true });
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );





  export const fetchVideoData = createAsyncThunk(
    'video/fetchVideoData',
    async (videoId, { dispatch, rejectWithValue }) => {
      try {
        dispatch(setVideoStarted(false));
        dispatch(setLoading(true));

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/video/getVideo?v=${videoId}`,
          {
            headers: { 'Cache-Control': 'no-cache' },
            withCredentials: true,
          }
        );

        const { video: videoData, like, dislike } = res.data;
        

        if (like) dispatch(forceLike());
        if (dislike) dispatch(forceDislike());

        dispatch(setVideo(videoData));
        dispatch(setAgo(calculateAgo(videoData.createdAt)));

        const userFromStorage = JSON.parse(localStorage.getItem('user'));
        if (userFromStorage) dispatch(setUser(userFromStorage));

      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );



  export const increase_like = createAsyncThunk(
    'videoSlice/increase-like',
    async (videoId, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URI}/video/increase-like/${videoId}`,
          {}, // empty body
          { withCredentials: true } // correct placement
        );
        return response.data;
      } catch (err) {
        console.log(err);
        return rejectWithValue(err.response?.data);
      }
    }
  );


  const videoSlice = createSlice({
    name: 'video',
    initialState: {
      video: null,
      description: '',
      playing: false,
      ago: '',
      comments: [],
      user: null,
      loading: true,
      error: null,
      viewed: false,
      videoStarted: false,
      duration: 0,
      currentTime: 0,
      play: false,
      mute: false,
      viewTimerStarted: false,
      showDescription: false,
      like: false,
      dislike: false,
    },
    reducers: {
      setVideoStarted: (state, action) => {
        state.videoStarted = action.payload;
      },
      setPlaying: (state, action) => {
        state.playing = action.payload;
      },
  
      setVideo: (state, action) => {
        state.video = action.payload;
        state.description = action.payload.description;
      },
      setUser: (state, action) => {
        state.user = action.payload;
      },
      setAgo: (state, action) => {
        state.ago = action.payload;
      },
      setComments: (state, action) => {
        state.comments = action.payload;
      },
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
      setDuration: (state, action) => {
        state.duration = action.payload;
      },
      setCurrentTime: (state, action) => {
        state.currentTime = action.payload;
      },
      togglePlay: (state) => {
        state.play = !state.play;
      },
      toggleMute: (state) => {
        state.mute = !state.mute;
      },
      toggleDescription: (state) => {
        state.showDescription = !state.showDescription;
      },
      startViewTimer: (state) => {
        state.viewTimerStarted = true;
      },
      forceLike: (state) => {
        state.like = true;
        state.dislike = false;
      },
      forceDislike: (state) => {
        state.dislike = true;
        state.like = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchVideo.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchVideo.fulfilled, (state, action) => {
          state.loading = false;
          state.video = action.payload.video;
          state.description = action.payload.video.description;
          state.like = action.payload.userLiked;
          state.dislike = action.payload.userDisliked;
        })
        .addCase(fetchVideo.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        })
        .addCase(increaseViewCount.fulfilled, (state) => {
          state.viewed = true;
        });
    },
  });

  export const {
    setVideoStarted,
    setVideo,
    video,
    setUser,
    setAgo,
    setComments,
    setLoading,
    setDuration,
    setCurrentTime,
    togglePlay,
    toggleMute,
    toggleDescription,
    startViewTimer,
    forceLike,
    forceDislike,
    setPlaying
  } = videoSlice.actions;

  export default videoSlice.reducer;
