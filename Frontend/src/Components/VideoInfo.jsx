// src/Components/VideoInfo.jsx

import React from 'react';
import { useSelector } from 'react-redux';

const VideoInfo = () => {
  const { video } = useSelector((state) => state.video)
  return (
    <div className="w-full px-[1.5vw] py-[.7vw]">
      <p className="font-[700] text-white sm:text-[1.4vw] 2xl:text-[1.7vw]">
        {video.title}
      </p>
    </div>
  );
};

export default VideoInfo;
