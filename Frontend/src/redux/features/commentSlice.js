import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/comment/getComments`,
        {},
        { withCredentials: true }
      );
      const filtered = response?.data?.allComments.filter(
        comment => comment.videoId === videoId
      );
      return filtered;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default commentSlice.reducer;
