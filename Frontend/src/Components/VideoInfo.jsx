// src/Components/VideoInfo.jsx

import React from 'react';

const VideoInfo = ({ title }) => {
  return (
    <div className="w-full px-[1.5vw] py-[.7vw]">
      <p className="font-[700] text-white sm:text-[1.4vw] 2xl:text-[1.7vw]">
        {title}
      </p>
    </div>
  );
};

export default VideoInfo;
