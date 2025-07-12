// Components/VideoDescription.jsx
import React from 'react';

const VideoDescription = ({ views, ago, description, showDescription, toggleDescription }) => {
  return (
    <div className="text-white bg-custom-black rounded p-2 w-full">
      <div className="font-[700] flex items-center gap-[.6vw]">
        <p>{views} views</p>
        <p>{ago} ago</p>
      </div>
      <div className="whitespace-normal break-words">
        {showDescription ? description : `${description?.slice(0, 80)}...`}
      </div>
      <p onClick={toggleDescription}>
        {showDescription ? 'less...' : 'more...'}
      </p>
    </div>
  );
};

export default VideoDescription;
