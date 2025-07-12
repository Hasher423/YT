// Components/VideoHeader.jsx
import React from 'react';

const VideoHeader = ({ title, user }) => {
  return (
    <>
      <div className="w-full px-[1.5vw] py-[.7vw]">
        <p className="font-[700] text-white sm:text-[1.4vw] 2xl:text-[1.7vw]">{title}</p>
      </div>

      <div className="flex items-center gap-[2vw] px-[1vw]">
        <img
          className="w-[3vw] h-[3vw] rounded-full object-cover lt-sm:w-[6vh] lt-sm:h-[6vh]"
          src={user?.logoId}
          alt="user"
        />
        <div className="text-custom-white font-bold">{user?.channelName}</div>
        <button className="bg-custom-white px-[1vw] py-[.5vw] rounded-3xl font-[500] text-sm">
          SUBSCRIBE
        </button>
      </div>
    </>
  );
};

export default VideoHeader;
