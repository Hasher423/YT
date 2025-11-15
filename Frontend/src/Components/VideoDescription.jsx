// Components/VideoDescription.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDescription } from '../redux/features/videoSlice';

const VideoDescription = () => {
  const { video, ago, description, showDescription } = useSelector((state) => state.video);

  const dispatch = useDispatch()
  return (
    <div className="text-white bg-custom-black rounded p-2 w-[fu]">
      <div className="font-[400] flex items-center gap-[.6vw]">
        <p>{video.views} views</p>
        <p>{ago} ago</p>
      </div>
      <div className="whitespace-normal break-words">
        {(description.length > 55) && (showDescription ? description : `${description?.slice(0, 50)}...`)}
        {(description.length  <= 55) &&  description }
      </div>


      {description?.length > 55 && (
        <p className='cursor-pointer' onClick={() => dispatch(toggleDescription())}>
          {showDescription ? 'less' : 'more...'}
        </p>
      )}
    </div>
  );
};

export default VideoDescription;
