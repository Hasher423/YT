// Components/VideoActions.jsx
import React from 'react';

const VideoActions = ({ video, like, dislike, handleLike, handleDislike }) => {
  return (
    <div className="text-custom-white flex items-center gap-[.6vw] flex-wrap">
      <div className="bg-zinc-800 px-[2vw] py-[.4vw] font-[600] text-sm rounded-3xl flex items-center gap-4">
        <i
          onClick={handleLike}
          className={`ri-thumb-up-line cursor-pointer ${like ? 'text-blue-400' : ''}`}
        ></i>
        {video?.likes}
        <i
          onClick={handleDislike}
          className={`ri-thumb-down-line cursor-pointer ${dislike ? 'text-red-400' : ''}`}
        ></i>
        {video?.dislikes}
      </div>

      <div className="bg-zinc-800 px-[2vw] py-[.4vw] font-[700] text-sm rounded-3xl">
        <i className="ri-share-forward-line"></i> &nbsp; Share
      </div>

      <div className="bg-zinc-800 px-[2vw] py-[.4vw] font-[400] text-sm rounded-3xl">
        <i className="ri-download-line"></i> &nbsp;
        <a href={video?.video_Url?.url} download>
          Download
        </a>
      </div>

      <div className="bg-zinc-800 px-[.7vw] py-[.5vw] rounded-full flex items-center justify-center font-bold text-sm">
        <i className="ri-more-fill"></i>
      </div>
    </div>
  );
};

export default VideoActions;
