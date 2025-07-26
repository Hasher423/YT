import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { calculateAgo } from '../../utils/Ago';

export const fetchVideo = createAsyncThunk(
  'video/fetchVideo',
  async (videoId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/video/getVideo?v=${videoId}`,
        { withCredentials: true }
      );


      const videoData = response.data;
      const videoOwner = await dispatch(fetchVideoOwner(videoData.video.userId)).unwrap(); // fetch uploader info
      const ans = await dispatch(isSubscriberfunc(videoData.video.userId)).unwrap();
      if (ans.isSubscribed === true) {
        dispatch(ToggleSubscribe(true))
      } else {
        dispatch(ToggleSubscribe(false))
      }
      return videoData;
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

      dispatch(setLikes(videoData?.likes))
      dispatch(setDislikes(videoData?.dislikes))

      if (like) dispatch(forceLike(true));
      if (dislike) dispatch(forceDislike(true));

      dispatch(setVideo(videoData));
      dispatch(setAgo(calculateAgo(videoData.createdAt)));

      const userFromStorage = JSON.parse(localStorage.getItem('user'));
      if (userFromStorage) dispatch(setUser(userFromStorage));

      dispatch(fetchVideoOwner(videoData.userId)); // fetch uploader info
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const fetchVideos = createAsyncThunk('video/fetchVideos', async (dispatch, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/video/getVideos/`, {
      headers: {
        'Cache-Control': 'no-cache',
      },
      withCredentials: true,
    })
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});


export const isSubscriberfunc = createAsyncThunk(
  'video/fetchVideoSubscriber',
  async (channelId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/user/isSubscribed/${channelId}`,
        {
          headers: { 'Cache-Control': 'no-cache' },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const increaseViewCount = createAsyncThunk('video/increaseView', async (videoId, { rejectWithValue }) => {
  try {
    await axios.post(`${import.meta.env.VITE_BACKEND_URI}/video/increase-view/${videoId}`, {}, { withCredentials: true });
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const fetchVideoOwner = createAsyncThunk(
  'video/fetchVideoOwner',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/getuserById/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);



export const handleLike = createAsyncThunk('videoSlice/increase-like', async (videoId, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URI}/video/handleLike/${videoId}`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const handleDislike = createAsyncThunk('videoSlice/increase-dislike', async (videoId, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URI}/video/handleDislike/${videoId}`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const handleSubscription = createAsyncThunk(
  'videoSlice/handleSubscription',
  async (channelId, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/user/subscription/${channelId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.subscribed === true) {
        dispatch(ToggleSubscribe(true))
      } else if (res.data.subscribed === false) {
        dispatch(ToggleSubscribe(false))
      }
      return res.data; // { subscribed: true/false }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Subscription failed');
    }
  }
);

// Slice
const videoSlice = createSlice({
  name: 'video',
  initialState: {
    video: null,
    videoOwner: null, // uploader info
    description: '',
    playing: false,
    ago: '',
    comments: [],
    user: null,
    loading: false,
    error: null,
    viewed: false,
    videoStarted: false,
    duration: 0,
    currentTime: 0,
    play: false,
    mute: false,
    showDescription: false,
    isLike: false,
    isDislike: false,
    likes: 0,
    dislikes: 0,
    subscribers: 0,
    isSubscribed: false,
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
    setLikes: (state, action) => {
      state.likes = action.payload;
    },
    setDislikes: (state, action) => {
      state.dislikes = action.payload;
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
    forceLike: (state, action) => {
      state.isLike = action.payload;
    },
    forceDislike: (state, action) => {
      state.isDislike = action.payload;
    },
    ToggleSubscribe: (state, action) => {
      state.isSubscribed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideo.fulfilled, (state, action) => {
        state.video = action.payload.video;
        state.description = action.payload.video.description;
        state.isLike = action.payload.userLiked;
        state.isDislike = action.payload.userDisliked;
        state.loading = false;
      })
      .addCase(fetchVideo.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchVideoOwner.fulfilled, (state, action) => {
        state.videoOwner = action.payload.user;
      })
      .addCase(increaseViewCount.fulfilled, (state) => {
        state.viewed = true;
      })
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
  setPlaying,
  ToggleSubscribe,
  setDisikes,
  setLikes,
  setDislikes,
} = videoSlice.actions;

export default videoSlice.reducer;
