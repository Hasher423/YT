import React, { useEffect, useRef, useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import Controls from './Components/Controls';

const Videoplay = () => {
  const [play, setPlay] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [mute, setMute] = useState(false);
  const video = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (video.current) {
        video.current.removeAttribute('controls'); // Ensure controls remain disabled in fullscreen
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);


  const toggleFullScreen = () => {
    if (video.current) {
      if (!document.fullscreenElement) {
        video.current.requestFullscreen()
      } else {
        document.exitFullscreen();
      }
    }
  };


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handlePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [play]);


  return (
    <div className="video-container w-[70%] h-[70%]  p-5 ">
      <div className="relative w-full h-full">
        <div className="video w-full h-full">
          <video
            ref={video}
            className="rounded-xl w-full h-full object-cover"
            src="/assets/videoplayback.mp4"
            height={'100%'}

            onLoadedMetadata={() => {
              if (video.current) {
                video.current.removeAttribute('controls'); // Disable default controls
                setDuration(video.current.duration);
              }
            }}
            onTimeUpdate={() => setCurrentTime(video.current.currentTime)}
            onClick={toggleFullScreen}
          />
        </div>








      <Controls video={video} duration={duration} currentTime={currentTime} play={play} mute={mute} />


      </div>


    </div>
  );
};

export default Videoplay;
