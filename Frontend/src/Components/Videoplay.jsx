// Scalable & optimized VideoPlay component with useReducer

import React, { useEffect, useRef, useReducer, useCallback, useState, useContext } from 'react';
import 'remixicon/fonts/remixicon.css';
import Controls from './Controls';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Comments from './Comments';
import { UserContext } from '../Context/GetUserContext';

const initialState = {
  play: false,
  duration: 0,
  currentTime: 0,
  comments: [],
  volume: 1.0,
  mute: false,
  video: null,
  ago: '',
  description: '',
  user: null,
  loading: true,
  viewTimerStarted: false,
  showDescription: false,
};

function reducer(state, action) {

  switch (action.type) {
    case 'SET_VIDEO': return { ...state, video: action.payload, description: action.payload?.description };
    case 'SET_USER': return { ...state, user: action.payload };
    case 'SET_COMMENTS': return { ...state, comments: action.payload };
    case 'SET_AGO': return { ...state, ago: action.payload };
    case 'SET_LOADING': return { ...state, loading: action.payload };
    case 'SET_DURATION': return { ...state, duration: action.payload };
    case 'SET_CURRENT_TIME': return { ...state, currentTime: action.payload };
    case 'TOGGLE_PLAY': return { ...state, play: !state.play };
    case 'TOGGLE_MUTE': return { ...state, mute: !state.mute };
    case 'TOGGLE_DESCRIPTION': return { ...state, showDescription: !state.showDescription };
    case 'START_TIMER': return { ...state, viewTimerStarted: true };
    default: return state;
  }
}

const Videoplay = () => {
  const [comments, setcomments] = useState(null)
  const [user, setuser] = useState(null)
  const [state, dispatch] = useReducer(reducer, initialState);
  const videoRef = useRef(null);
  const location = useLocation();
  const videoId = new URLSearchParams(location.search).get('v');

  const calculateAgo = (createdAt) => {
    const diff = Date.now() - new Date(createdAt).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} days`;
    if (hours > 0) return `${hours} hours`;
    if (minutes > 0) return `${minutes} minutes`;
    return `${seconds} seconds`;
  };

  const fetchVideoAndUser = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const [resVideo, resUser] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_URI}/video/getVideo?v=${videoId}`),
        axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/getuser`, { withCredentials: true }),
      ]);
      dispatch({ type: 'SET_VIDEO', payload: resVideo?.data?.video });
      dispatch({ type: 'SET_AGO', payload: calculateAgo(resVideo?.data?.video?.createdAt) });
      dispatch({ type: 'SET_USER', payload: resUser.data.user });
      setuser(resUser?.data?.user)
    } catch (err) {
      console.error('Error fetching video or user:', err);
    }
  }, [videoId]);

  useEffect(() => {
    fetchVideoAndUser();
  }, [fetchVideoAndUser]);

  useEffect(() => {
    let timer;
    if (state.viewTimerStarted) {
      timer = setTimeout(() => {
        axios.post(`${import.meta.env.VITE_BACKEND_URI}/video/increase-view/${videoId}`, {}, { withCredentials: true })
          .catch(err => console.error('View increment failed:', err));
      }, 30000);
    }
    return () => clearTimeout(timer);
  }, [state.viewTimerStarted, videoId]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      videoRef.current?.removeAttribute('controls');
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);


  const getComments = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/comment/getComments`, {

    },
      {
        withCredentials: true
      }
    );




    const filteredComments = response?.data?.allComments.filter(
      (comment) => comment.videoId === videoId
    )

    dispatch({ type: 'SET_COMMENTS', payload: filteredComments });

  }


  

    useEffect(() => {
      getComments()
    }, [videoId])



  const handlePlay = () => {
    if (!state.viewTimerStarted) dispatch({ type: 'START_TIMER' });
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="video-container flex-1 bg-red-90 sm:h-[70%] lt-sm:py-10">
      <div className="relative w-full h-full">
        {state.loading && (
          <div className="absolute top-0 left-0 w-[60vw] h-full flex items-center justify-center z-10 bg-black bg-opacity-60 rounded-xl">
            <div className="w-12 h-12 border-[1.8px] border-white border-t-transparent border-b-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="video w-full sm:h-full">
          <video
            ref={videoRef}
            onPlay={handlePlay}
            onLoadedMetadata={() => {
              videoRef.current?.removeAttribute('controls');
              dispatch({ type: 'SET_DURATION', payload: videoRef.current?.duration });
            }}
            onCanPlay={() => dispatch({ type: 'SET_LOADING', payload: false })}
            onTimeUpdate={() => dispatch({ type: 'SET_CURRENT_TIME', payload: videoRef.current.currentTime })}
            onDoubleClick={toggleFullScreen}
            className="w-full h-full rounded-xl"
            src={state.video?.video_Url?.url}
            height="100%"
          />
        </div>

        <Controls
          video={videoRef}
          duration={state.duration}
          currentTime={state.currentTime}
          play={state.play}
          mute={state.mute}
          setMute={() => dispatch({ type: 'TOGGLE_MUTE' })}
          setCurrentTime={(t) => dispatch({ type: 'SET_CURRENT_TIME', payload: t })}
          setPlay={() => dispatch({ type: 'TOGGLE_PLAY' })}
        />
      </div>

      <div className='w-full px-[1.5vw] py-[.7vw]'>
        <p className='font-[700] text-white sm:text-[1.4vw] 2xl:text-[1.7vw]'>
          {state.video?.title}
        </p>
      </div>

      <div className='cursor-pointer flex flex-col gap-[2vh] lt-sm:gap-[4vw] lt-sm:mt-[2vh] lt-sm:px-[3vw]'>
        <div className='flex items-center gap-[2vw] px-[1vw]'>
          <img className='w-[3vw] h-[3vw] rounded-full object-cover lt-sm:w-[6vh] lt-sm:h-[6vh]' src={state.user?.logoId} alt="user" />
          <div className='text-custom-white font-bold'>{state.user?.channelName}</div>
          <button className='bg-custom-white px-[1vw] py-[.5vw] rounded-3xl font-[500] text-sm'>SUBSCRIBE</button>
        </div>

        <div className='text-custom-white flex items-center gap-[.6vw] flex-wrap'>
          <div className='bg-zinc-800 px-[2vw] py-[.4vw] font-[600] text-sm rounded-3xl'>
            <i className="ri-thumb-up-line"></i> &nbsp; 781K &nbsp;
            <i className="ri-thumb-down-line"></i>
          </div>
          <div className='bg-zinc-800 px-[2vw] py-[.4vw] font-[700] text-sm rounded-3xl'>
            <i className="ri-share-forward-line"></i> &nbsp; Share
          </div>
          <div className='bg-zinc-800 px-[2vw] py-[.4vw] font-[400] text-sm rounded-3xl'>
            <i className="ri-download-line"></i> &nbsp;
            <a href={state.video?.video_Url?.url} download>Download</a>
          </div>
          <div className='bg-zinc-800 px-[.7vw] py-[.5vw] rounded-full flex items-center justify-center font-bold text-sm'>
            <i className="ri-more-fill"></i>
          </div>
        </div>

        <div className='text-white bg-custom-black rounded p-2 w-full'>
          <div className='font-[700] flex items-center gap-[.6vw]'>
            <p>{state.video?.views} views</p>
            <p>{state.ago} ago</p>
          </div>
          <div className='text-wrap'>
            {state.showDescription ? state.description : `${state.description?.slice(0, 80)}...`}
          </div>
          <p onClick={() => dispatch({ type: 'TOGGLE_DESCRIPTION' })}>
            {state.showDescription ? 'less...' : 'more...'}
          </p>
        </div>
      </div>


      <Comments videoId={videoId} comments={state?.comments} channel={user?.channelName}/>
    </div>
  );
};

export default Videoplay;
