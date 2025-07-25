import React, { useEffect, useRef,  } from 'react';
import { useLocation } from 'react-router-dom';
import Controls from './Controls';
import VideoPlayerElement from './VideoPlayerElement';
import VideoInfo from './VideoInfo';
import ChannelInfo from './ChannelInfo';
import InteractionBar from './InteractionBar';
import VideoDescription from './VideoDescription';
import CommentsSection from './CommentsSection';
import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';
import {
  increaseViewCount,
  fetchVideo,
} from '../redux/features/videoSlice';

import { fetchComments } from '../redux/features/commentSlice';


const Videoplay = () => {
  const videoRef = useRef(null);
  const location = useLocation();
  const videoId = new URLSearchParams(location.search).get('v');
  const { video, videoOwner, loading } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const videoData = useSelector((state) => state.video);
  const videoStarted = videoData.videoStarted;



  const getVideo = async () => {
     await dispatch(fetchVideo(videoId)).unwrap();
  };

  useEffect(() => {
    getVideo()
  }, [videoId]);


  useEffect(() => {
    if (!videoStarted) return;
    const timer = setTimeout(() => {
      if (!store.getState().video.viewed) {
        dispatch(increaseViewCount(videoId));
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [videoId, videoStarted, dispatch]);





  if (!video || !videoOwner) return <div>Loading...</div>;

  return (
    <div className="videoData-container flex-1 sm:h-[70%] lt-sm:py-10">

      <div className="relative w-full h-full">
        {videoData.loading && (
          <div className="absolute top-0 left-0 w-[60vw] h-full flex items-center justify-center z-10 bg-black bg-opacity-60 rounded-xl">
            <div className="w-12 h-12 border-[1.8px] border-white border-t-transparent border-b-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <VideoPlayerElement
          videoRef={videoRef}
        />

        <Controls
          video={videoRef}
        />
      </div>

      <VideoInfo />
      <ChannelInfo />
      <InteractionBar />
      <VideoDescription />
      <CommentsSection />
    </div>
  );
};

export default Videoplay;
