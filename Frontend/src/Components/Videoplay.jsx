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
import Loader from './Loader';
import store from '../redux/store';
import {
  increaseViewCount,
  fetchVideo,
} from '../redux/features/videoSlice';


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





  if (!video || !videoOwner) return <div><Loader /></div>;

  return (
    <div className="videoData-container b flex-1 sm:h-[70%] lt-sm:pb-10">

      <div className="relative w-full  h-full">
        {videoData.loading && <Loader />}
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
