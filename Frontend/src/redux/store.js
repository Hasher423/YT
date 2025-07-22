import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './features/videoSlice';
import commentSlice from './features/commentSlice'

const store = configureStore({
  reducer: {
    video: videoReducer,
    comments: commentSlice,
  },
});

export default store;
