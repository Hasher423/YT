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
  const { video, videoOwner, loading } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const videoData = useSelector((state) => state.video);
  const videoStarted = videoData.videoStarted;



  const getVideo = async () => {
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
        dispatch((videoId));
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

  if ( !video || !videoOwner) return <div>Loading...</div>;

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
          videoUrl={videoData?.video?.video_Url?.url}
          onPlay={() => dispatch(setVideoStarted(true))}
          onLoadedMetadata={() => {
            videoRef.current?.removeAttribute('controls');
            dispatch(setDuration(videoRef.current?.duration));
          }}
          onCanPlay={() => {
            dispatch(setLoading(false));
            dispatch(setPlaying(true))
            videoRef.current?.play();
          }}
          onTimeUpdate={() => dispatch(setCurrentTime(videoRef.current.currentTime))}
          toggleFullScreen={toggleFullScreen}
          onWaiting={() => {
            dispatch(setLoading(true))
          }}
          onPause={() => {
            dispatch(setPlaying(false));
          }}
        />

        <Controls
          video={videoRef}
          duration={video.duration}
          currentTime={videoData.currentTime}
          play={videoData.play}
          mute={videoData.mute}
          setMute={() => dispatch(toggleMute())}
          setCurrentTime={(t) => dispatch(setCurrentTime(t))}
          setPlay={() => dispatch(togglePlay())}
          playing={videoData.playing}
          setPlaying={setPlaying}
        />
      </div>

      <VideoInfo title={videoData?.videoData?.title} />
      <ChannelInfo user={videoData.user} />
      <InteractionBar
        videoId={videoId}
        dispatch={dispatch}
        like={videoData.like}
        dislike={videoData.dislike}
        user={videoData.user}
      />
      <VideoDescription
        views={videoData?.videoData?.views}
        ago={videoData.ago}
        description={videoData.description}
        showDescription={videoData.showDescription}
        toggleDescription={() => dispatch(toggleDescription())}
      />
      <CommentsSection
        videoId={videoId}
        comments={videoData.comments}
        setrefreshComments={setrefreshComments}
        channel={videoData?.user?.channelName}
      />
    </div>
  );
};

export default Videoplay;
