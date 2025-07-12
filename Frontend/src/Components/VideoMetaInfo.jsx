// Components/VideoMetaInfo.jsx
import React from 'react';

const VideoMetaInfo = ({
  video,
  user,
  ago,
  like,
  dislike,
  onLike,
  onDislike,
  showDescription,
  toggleDescription,
}) => {
  return (
    <div className="cursor-pointer flex flex-col gap-[2vh] lt-sm:gap-[4vw] lt-sm:mt-[2vh] lt-sm:px-[3vw]">
      <div className="w-full px-[1.5vw] py-[.7vw]">
        <p className="font-[700] text-white sm:text-[1.4vw] 2xl:text-[1.7vw]">
          {video?.title}
        </p>
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

      <div className="text-custom-white flex items-center gap-[.6vw] flex-wrap">
        <div className="bg-zinc-800 px-[2vw] py-[.4vw] font-[600] text-sm rounded-3xl flex items-center gap-4">
          <i
            onClick={onLike}
            className={`ri-thumb-up-line cursor-pointer ${like ? 'text-blue-400' : ''}`}
          ></i>
          {video?.likes}
          <i
            onClick={onDislike}
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

      <div className="text-white bg-custom-black rounded p-2 w-full">
        <div className="font-[700] flex items-center gap-[.6vw]">
          <p>{video?.views} views</p>
          <p>{ago} ago</p>
        </div>
        <div className="whitespace-normal break-words">
          {showDescription ? video?.description : `${video?.description?.slice(0, 80)}...`}
        </div>
        <p onClick={toggleDescription}>
          {showDescription ? 'less...' : 'more...'}
        </p>
      </div>
    </div>
  );
};

export default VideoMetaInfo;
