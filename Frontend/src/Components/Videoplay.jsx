import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Controls from './Controls';
import VideoPlayerElement from './VideoPlayerElement';
import VideoInfo from './VideoInfo';
import ChannelInfo from './ChannelInfo';
import InteractionBar from './InteractionBar';
import VideoDescription from './VideoDescription';
import CommentsSection from './CommentsSection';
import { calculateAgo } from '../utils/Ago'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';
import {
  setVideoStarted,
  setVideo,
  setAgo,
  setUser,
  setComments,
  setDuration,
  setCurrentTime,
  toggleMute,
  togglePlay,
  toggleDescription,
  setLoading,
  setPlaying,
  increaseViewCount,
  fetchVideoData,
  fetchVideo,
  forceLike,
  forceDislike
} from '../redux/features/videoSlice';

import { fetchComments } from '../redux/features/commentSlice';


const Videoplay = () => {
  const [refreshComments, setrefreshComments] = useState(false);
  const videoRef = useRef(null);
  const location = useLocation();
  const videoId = new URLSearchParams(location.search).get('v');
  const dispatch = useDispatch();

  const video = useSelector((state) => state.video);
  const videoStarted = video.videoStarted;



  const getVideo = async () => {
    // dispatch(setLoading(true)); // ✅ Show loader before fetch
    const response = await dispatch(fetchVideo(videoId)).unwrap();
    if (response.like) dispatch(forceLike());
    else if (response.dislike) dispatch(forceDislike());
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



  useEffect(() => {
    dispatch(fetchComments(videoId));
  }, [videoId, refreshComments]);



  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="video-container flex-1 sm:h-[70%] lt-sm:py-10">

      <div className="relative w-full h-full">
        {video.loading && (
          <div className="absolute top-0 left-0 w-[60vw] h-full flex items-center justify-center z-10 bg-black bg-opacity-60 rounded-xl">
            <div className="w-12 h-12 border-[1.8px] border-white border-t-transparent border-b-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <VideoPlayerElement
          videoRef={videoRef}
          videoUrl={video?.video?.video_Url?.url}
          onPlay={() => dispatch(setVideoStarted(true))}
          onLoadedMetadata={() => {
            videoRef.current?.removeAttribute('controls');
            dispatch(setDuration(videoRef.current?.duration));
          }}
          onCanPlay={() => {
            dispatch(setLoading(false));
            videoRef.current?.play();
          }}
          onTimeUpdate={() => dispatch(setCurrentTime(videoRef.current.currentTime))}
          toggleFullScreen={toggleFullScreen}
          onWaiting={() => {
            console.log('🔥 onWaiting (buffering)');
            dispatch(setLoading(true));
          }}
        onPause={() => {
          dispatch(setPlaying(false));
        }}
        />

        <Controls
          video={videoRef}
          duration={video.duration}
          currentTime={video.currentTime}
          play={video.play}
          mute={video.mute}
          setMute={() => dispatch(toggleMute())}
          setCurrentTime={(t) => dispatch(setCurrentTime(t))}
          setPlay={() => dispatch(togglePlay())}
          playing={video.playing}
          setPlaying={setPlaying}
        />
      </div>

      <VideoInfo title={video?.video?.title} />
      <ChannelInfo user={video.user} />
      <InteractionBar
        videoId={videoId}
        dispatch={dispatch}
        like={video.like}
        dislike={video.dislike}
        user={video.user}
      />
      <VideoDescription
        views={video?.video?.views}
        ago={video.ago}
        description={video.description}
        showDescription={video.showDescription}
        toggleDescription={() => dispatch(toggleDescription())}
      />
      <CommentsSection
        videoId={videoId}
        comments={video.comments}
        setrefreshComments={setrefreshComments}
        channel={video?.user?.channelName}
      />
    </div>
  );
};

export default Videoplay;
