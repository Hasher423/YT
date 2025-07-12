// Components/ChannelInfo.jsx
import React from 'react';

const ChannelInfo = ({ user }) => {
  if (!user) return null;

  return (
    <div className="flex items-center gap-[2vw] px-[1vw]">
      <img
        className="w-[3vw] h-[3vw] rounded-full object-cover lt-sm:w-[6vh] lt-sm:h-[6vh]"
        src={user.logoId}
        alt="user"
      />
      <div className="text-custom-white font-bold">{user.channelName}</div>
      <button className="bg-custom-white px-[1vw] py-[.5vw] rounded-3xl font-[500] text-sm">
        SUBSCRIBE
      </button>
    </div>
  );
};

export default ChannelInfo;
