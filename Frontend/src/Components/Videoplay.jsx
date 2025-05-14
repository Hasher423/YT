import React, { useEffect, useRef, useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import Controls from './Controls';
import axios from 'axios';
import { useLocation } from 'react-router-dom'
const Videoplay = () => {
  const [play, setPlay] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [mute, setMute] = useState(false);
  const [video, setVideo] = useState(null);
  const videoRef = useRef(null);
  const location = useLocation()
  const videoId = new URLSearchParams(location.search).get('v');

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (videoRef.current) {
        videoRef.current.removeAttribute('controls'); // Ensure controls remain disabled in fullscreen
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);


  useEffect(() => {
    const fetchVideo = async () => {
      const res = await axios.get(`http://192.168.0.12:3000/video/getVideo?v=${videoId}`);
      
      setVideo(res.data.video.video_Url.url);
    };
    fetchVideo();
  }, []);
  


  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen()
      } else {
        document.exitFullscreen();
      }
    }
  };





  return (
    <div className="video-container flex-1 bg-red-90 sm:h-[70%]  ">
      <div className="relative w-full h-full">
        <div className="video w-full sm:h-full h-[50vh] ">
          <video
            ref={videoRef}
            className=" w-[100%] h-[100vh%] "
            src={`http://res.cloudinary.com/dmazphi1z/video/upload/v1746622564/my_videos/my_videos/video_1746622418584.mp4`}
            height={'100%'}

            onLoadedMetadata={() => {
              if (videoRef.current) {
                videoRef.current.removeAttribute('controls'); // Disable default controls
                setDuration(videoRef.current.duration);
              }
            }}
            onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)}
            onDoubleClick={toggleFullScreen}
          />
        </div>








        <Controls
          video={videoRef}
          duration={duration}
          currentTime={currentTime}
          play={play}
          mute={mute}
          setMute={setMute}
          setCurrentTime={setCurrentTime}
          setPlay={setPlay}

        />


      </div>


    </div>
  );
};

export default Videoplay;
