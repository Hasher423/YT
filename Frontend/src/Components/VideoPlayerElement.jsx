import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDuration, setVideoStarted, setCurrentTime, setLoading, setPlaying } from '../redux/features/videoSlice';

const VideoPlayerElement = ({
  videoRef
}) => {
  const dispatch = useDispatch();
  const videoData = useSelector((state) => state.video)
  useEffect(() => {
    const handleFullscreenChange = () => {
      videoRef.current?.removeAttribute('controls');
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [videoRef]);


  useEffect(() => {
    dispatch(setLoading(true));
  }, []);



  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };


  return (
    <div className="relative   w-full md:mt-[3vh] mt-2    ">
      <video
        ref={videoRef}
        onPlay={() => {
          dispatch(setPlaying(true))
          dispatch(setVideoStarted(true))
        }}
        onLoadedMetadata={() => dispatch(setDuration(videoRef.current?.duration))}
        onCanPlay={() => {
          videoRef.current.play();
        }}
        onTimeUpdate={() => dispatch(setCurrentTime(videoRef.current.currentTime))}
        onDoubleClick={toggleFullScreen}
        onWaiting={() => {
          console.log('Bufferring ')
          dispatch(setLoading(true))
        }}
        onPlaying={() => {
          dispatch(setLoading(false));
        }}
        onPause={() => {
          dispatch(setPlaying(false));
        }}
        className="w-full  rounded-xl "
        src={videoData?.video?.video_Url?.secureUrl}
        controls={false}
        height="100%"
      />
    </div>
  );
};

export default VideoPlayerElement;
