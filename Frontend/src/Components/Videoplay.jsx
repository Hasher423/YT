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
  const [video, setVideo] = useState(null)
  const [user, setuser] = useState(null);
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
      const res = await axios.get(`http://localhost:3000/video/getVideo?v=${videoId}`);
      setVideo(res);

    };
    fetchVideo();
  }, [videoId]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/user/getuser', {
        withCredentials: true,
      });
      setuser(response.data.user);


    };
    fetchData();
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
            src={`${video?.data?.video?.video_Url?.url}`}
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

      <div className=' w-full px-[1.5vw] py-[.7vw]'>
        <div><p className='font-bold text-white text-[1.6vw]'>{video?.data?.video?.title}</p></div></div>

      <div className='flex items-center justify-between'>
        {/* CHANNEL PIC NAME AND SUBSCRIBE */}
        <div className='flex items-center gap-[2vw] px-[1vw] '>
          <div><img className='w-[3.5vw] h-[3.5vw] rounded-full object-cover' src={`${user?.logoId}`} alt="no" /></div>
          <div className='text-custom-white font-bold'>{user?.channelName}</div>
          <div className='bg-custom-white px-[1vw] py-[.5vw] rounded-3xl text-sm'><button>SUBSCRIBE</button></div>
        </div>
        {/* LIKE AND OTHER BUTTONS */}
        <div className='text-custom-white flex items-center gap-[1vw] '>
            <div className='rounded-3xl bg-zinc-800 px-[2vw] py-[.4vw] font-bold text-sm'>781K</div>
            <div className='rounded-3xl bg-zinc-800 px-[2vw] py-[.4vw] font-bold text-sm' >Share</div>
            <div className='rounded-3xl bg-zinc-800 px-[2vw] py-[.4vw] font-bold text-sm' >Download</div>
            <div className='rounded-3xl bg-zinc-800 px-[2vw] py-[.4vw] font-bold text-sm' >....</div>
        </div>
      </div>
    </div>
  );
};

export default Videoplay;
