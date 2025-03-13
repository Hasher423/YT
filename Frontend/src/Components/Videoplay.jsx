import React, { useEffect, useRef, useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import Controls from './Controls';

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


  


  return (
    <div className="video-container flex-1 h-[70%]  p-5 ">
      <div className="relative w-full h-full">
        <div className="video w-full h-full obj">
          <video
            ref={video}
            className="rounded-xl w-full"
            src="https://res.cloudinary.com/dmazphi1z/video/upload/v1738863791/urvnu7pkmqyra4bytew6.mp4"
            height={'100%'}

            onLoadedMetadata={() => {
              if (video.current) {
                video.current.removeAttribute('controls'); // Disable default controls
                setDuration(video.current.duration);
              }
            }}
            onTimeUpdate={() => setCurrentTime(video.current.currentTime)}
            onDoubleClick={toggleFullScreen}
          />
        </div>








        <Controls
          video={video}
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
