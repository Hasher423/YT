import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './features/videoSlice';

const store = configureStore({
  reducer: {
    video: videoReducer,
  },
});

export default store;
