import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleSubscription } from '../redux/features/videoSlice';
import { Link, useLocation } from 'react-router-dom';


import {
  ToggleSubscribe
} from '../redux/features/videoSlice'
import { current } from '@reduxjs/toolkit';

const ChannelInfo = () => {
  const location = useLocation();
  const videoId = new URLSearchParams(location.search).get('v');
  const [currentUser, setCurrentUser] = useState(null);
  const [channelId, setChannelId] = useState(null);
  const dispatch = useDispatch();
  const { video } = useSelector((state) => state.video);
  const videoData = useSelector((state) => state.video);

  useEffect(() => {
    if (video && video?.userId) {
      setChannelId(video?.userId);
      setCurrentUser(JSON.parse(localStorage.getItem('user')));
    }
  }, [video]);



  const handleSubscribeClick = async () => {
    if (channelId && currentUser?._id) {
      dispatch(ToggleSubscribe(!(videoData?.isSubscribed)))
      const res = await dispatch(handleSubscription(video?.userId)).unwrap();

    }

  };

  if (!currentUser) return null;

  return (
    <div className="flex items-center gap-[2vw] lt-sm:justify-between  md:px-[1vw]  my-[1vw]">
      <Link to={`${import.meta.env.VITE_FRONTEND_URI}/channel/@${videoData?.videoOwner?.channelName}/${videoData?.videoOwner._id}`} className='flex items-center gap-2'>
        <img
          className="w-[3vw] h-[3vw] rounded-full object-cover lt-sm:w-[6vh] lt-sm:h-[6vh]"
          src={`${videoData?.videoOwner?.logoId}`} // fallback image
          alt="channel"
        />
        <div className="text-custom-white">{videoData?.videoOwner?.channelName}</div>
      </Link>
      {channelId !== currentUser?._id && (
        <button
          onClick={handleSubscribeClick}
          className={` px-[3.3vw] md:px-[1vw] py-[1vw] md:py-[.5vw] 2xl:py-4 2xl:text-[1.5rem] mr-3 md:rounded-3xl rounded-xl font-semibold md:font-[500] text-sm ${videoData?.isSubscribed ? 'border-white border-[1px] text-white' : 'bg-custom-white'} `}
        >
          {videoData?.isSubscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}
        </button>
      )}
    </div>
  );
};

export default ChannelInfo;
