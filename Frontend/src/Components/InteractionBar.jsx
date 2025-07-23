import React, { useEffect } from 'react';
import { forceDislike, forceLike, increase_like, increase_dislike, video } from '../redux/features/videoSlice';
import { useDispatch, useSelector } from 'react-redux';




const InteractionBar = ({ videoId }) => {
  const { video } = useSelector((state) => state.video)
  const like = useSelector((state) => state.video.like)
  const dislike = useSelector((state) => state.video.dislike)




  const dispatch = useDispatch()

  const handleLike = async () => {

    const res = await dispatch(increase_like(videoId)).unwrap();


    if (res.message === "Video Liked Successfully") {
      dispatch(forceLike())

    }


  }



  const handleDislike = async () => {

    const res = await dispatch(increase_dislike(videoId)).unwrap();

    useEffect(() => {
      if (res.message === "Video Liked Successfully") {
        dispatch(forceDislike())

      }
    }, [dispatch])


  }

  return (
    <div className="text-custom-white flex pb-[1vw] items-center gap-[.6vw] flex-wrap">
      <div className="bg-zinc-800 px-[2vw] py-[.4vw] font-[600] text-sm rounded-3xl flex items-center gap-4">
        <i
          onClick={handleLike}
          className={`ri-thumb-up-line cursor-pointer ${like ? 'text-blue-400' : ''}`}
        ></i>
        {/* {console.log(video)} */}
        {video?.likes}
        <i
          onClick={handleDislike}
          className={`ri-thumb-down-line cursor-pointer 'text-red-400' ${dislike ? 'text-red-400' : ''}`}
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

export default InteractionBar;
