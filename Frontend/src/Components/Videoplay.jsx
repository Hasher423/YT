import React, { useEffect, useRef, useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import Controls from './Controls';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Videoplay = () => {
  const [play, setPlay] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [mute, setMute] = useState(false);
  const [video, setVideo] = useState(null);
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 Loader state
  const videoRef = useRef(null);
  const location = useLocation();
  const videoId = new URLSearchParams(location.search).get('v');

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (videoRef.current) {
        videoRef.current.removeAttribute('controls');
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/video/getVideo?v=${videoId}`);
      setVideo(res);
    };
    fetchVideo();
  }, [videoId]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/getuser`, {
        withCredentials: true,
      });
      setuser(response.data.user);
    };
    fetchData();
  }, []);

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="video-container flex-1 bg-red-90 sm:h-[70%]">
      <div className="relative w-full h-full">
        {/* Loader */}
        {loading &&  (
          <div className="absolute top-0 left-0 w-[60vw] h-full flex items-center justify-center z-10 bg-black bg-opacity-60 rounded-xl">
            <div className="w-12 h-12 border-4 border-white border-t-transparent border-b-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="video w-[60vw] sm:h-full h-[50vh]">
          <video
            ref={videoRef}
            className="w-full h-full rounded-xl"
            src={`${video?.data?.video?.video_Url?.url}`}
            height="100%"
            onLoadedMetadata={() => {
              if (videoRef.current) {
                videoRef.current.removeAttribute('controls');
                setDuration(videoRef.current.duration);
              }
            }}
            onCanPlay={() => setLoading(false)} // 👈 Hide loader when ready
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

      {/* Video title and info */}
      <div className='w-full px-[1.5vw] py-[.7vw]'>
        <p className='font-[700] text-white sm:text-[1.4vw] 2xl:text-[1.7vw]'>
          {video?.data?.video?.title}
        </p>
      </div>

      {/* Channel info + buttons */}
      <div className='cursor-pointer flex items-center md:flex md:flex-col 2xl:flex-row 2xl:items-center md:items-start md:gap-[2vw] justify-between lt-sm:flex-col lt-sm:items-start lt-sm:gap-[4vw] lt-sm:mt-[2vh] lt-sm:px-[3vw]'>
        <div className='flex items-center gap-[2vw] px-[1vw] lt-sm:gap-[3vw] 2xl:text-[1.7vw]'>
          <img className='w-[3vw] h-[3vw] rounded-full object-cover lt-sm:w-[6vh] lt-sm:h-[6vh]' src={`${user?.logoId}`} alt="no" />
          <div className='text-custom-white font-bold'>{user?.channelName}</div>
          <button className='bg-custom-white px-[1vw] py-[.5vw] sm:rounded-3xl font-[500] text-sm lt-sm:rounded lt-sm:py-[.5vh] lt-sm:ml-[9vh] lt-sm:px-[3vw] 2xl:text-[1.7vw] 2xl:px-[1.2vw] 2xl:py-[1vw]'>SUBSCRIBE</button>
        </div>

        <div className='text-custom-white flex items-center gap-[.6vw] lt-sm:mt-[2vh] lt-sm:flex-wrap lt-sm:gap-[vw]'>
          <div className='rounded-3xl 2xl:px-[1.2vw] 2xl:py-[1vw] 2xl:text-[1.2vw] bg-zinc-800 px-[2vw] py-[.4vw] lt-sm:px-[2vh] md:px-[2.7vw] lt-sm:py-[1.2vh] font-[600] text-sm'>
            <i className="ri-thumb-up-line font-[100]"></i> &nbsp;
            781K | &nbsp;
            <i className="ri-thumb-down-line font-[100]"></i>
          </div>
          <div className='rounded-3xl 2xl:px-[1.2vw] 2xl:py-[1vw] 2xl:text-[1.2vw] bg-zinc-800 px-[2vw] py-[.4vw] lt-sm:px-[2vh] md:px-[2.7vw] lt-sm:py-[1.2vh] font-[700] text-sm'>
            <i className="ri-share-forward-line font-extralight text-[1.2vw] lt-sm:text-[3vh]"></i> &nbsp; Share
          </div>
          <div className='rounded-3xl 2xl:px-[1.2vw] 2xl:py-[1vw] 2xl:text-[1.2vw] bg-zinc-800 px-[2vw] py-[.4vw] lt-sm:px-[2vh] md:px-[2.7vw] lt-sm:py-[1.2vh] font-[400] text-sm'>
            <i className="ri-download-line text-[1vw] lt-sm:text-[3vh]"></i> &nbsp;
            <a href={`${video?.data?.video?.video_Url?.url}`} download>Download</a>
          </div>
          <div className='rounded-full 2xl:px-[1.2vw] 2xl:py-[1vw] 2xl:text-[1.2vw] bg-zinc-800 px-[.7vw] py-[.5vw] lt-sm:w-[6vh] lt-sm:h-[5.5vh] flex items-center justify-center font-bold text-sm lt-sm:text-md'>
            <i className="ri-more-fill"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videoplay;
