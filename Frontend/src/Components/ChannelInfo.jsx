import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleSubscription } from '../redux/features/videoSlice';
import { useLocation } from 'react-router-dom';


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
  }, [videoId]);



  const handleSubscribeClick = async () => {
    if (channelId && currentUser?._id) {
      dispatch(ToggleSubscribe(!(videoData?.isSubscribed)))
      const res = await dispatch(handleSubscription(video?.userId)).unwrap();

    }

  };

  if (!currentUser) return null;

  return (
    <div className="flex items-center gap-[2vw] px-[1vw] my-[1vw]">
      <img
        className="w-[3vw] h-[3vw] rounded-full object-cover lt-sm:w-[6vh] lt-sm:h-[6vh]"
        src={`${currentUser.logoId}`} // fallback image
        alt="channel"
      />
      <div className="text-custom-white font-bold">{video.channelName}</div>
      {channelId !== currentUser._id && (
        <button
          onClick={handleSubscribeClick}
          className={` px-[1vw] py-[.5vw] rounded-3xl font-[500] text-sm ${videoData?.isSubscribed ? 'border-white border-[1px] text-white' : 'bg-custom-white'} `}
        >
          {videoData?.isSubscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}
        </button>
      )}
    </div>
  );
};

export default ChannelInfo;
