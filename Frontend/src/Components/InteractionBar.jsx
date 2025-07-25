import React, { useEffect } from 'react';
import {
  forceDislike,
  forceLike,
  handleDislike,
  fetchVideoData,
  setLikes,
  setDislikes,
  handleLike,
} from '../redux/features/videoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';




const InteractionBar = () => {
  let { video, isLike, isDislike, likes, dislikes } = useSelector((state) => state.video)
  let Data = useSelector((state) => state.video)








  const dispatch = useDispatch()
  useEffect(() => {
    if (video?._id) {
      dispatch(fetchVideoData(video._id)).unwrap();
    }
  }, [video?._id, dispatch]);

  const frontHandleLike = async () => {

    const res = await dispatch(handleLike(video._id)).unwrap();

    if (res.message === "Video Liked Successfully") {
      dispatch(forceLike(true))
      dispatch(forceDislike(false))
      dispatch(setLikes((likes + 1)))
      if (isDislike) dispatch(setDislikes(dislikes - 1))

    } else if (res.message === "Like removed successfully") {
      dispatch(forceLike(false))
      dispatch(setLikes((likes - 1)));
    }


  }



  const frontHandleDislike = async () => {

    const res = await dispatch(handleDislike(video._id)).unwrap();

    if (res.message === "Video disliked successfully") {
      dispatch(forceDislike(true))
      dispatch(forceLike(false))
      dispatch(setDislikes(dislikes + 1));
      if (isLike) dispatch(setLikes(likes - 1))

    } else if (res.message === "Dislike removed successfully") {
      dispatch(forceDislike(false))
      dispatch(setDislikes(dislikes - 1));
    }


  }

  return (
    <div className="text-custom-white flex pb-[1vw] items-center gap-[.6vw] flex-wrap">
      <div className="bg-zinc-800 px-[2vw] py-[.4vw] font-[600] text-sm rounded-3xl flex items-center gap-4">
        <i
          onClick={frontHandleLike}
          className={`ri-thumb-up-line cursor-pointer ${isLike ? 'text-blue-400' : ''}`}
        ></i>
        {likes}


        <i
          onClick={frontHandleDislike}
          className={`ri-thumb-down-line cursor-pointer text-rd-400 ${isDislike ? 'text-red-400' : ''}`}
        ></i>
        {dislikes}
      </div>

      <div className="bg-zinc-800 px-[2vw] py-[.4vw] font-[700] text-sm rounded-3xl">
        <i className="ri-share-forward-line"></i> &nbsp; Share
      </div>

      <div className="bg-zinc-800 px-[2vw] py-[.4vw] font-[400] text-sm rounded-3xl">
        <i className="ri-download-line"></i> &nbsp;
        <Link href={video?.video_Url?.url} download>
          Download
        </Link>
      </div>

      <div className="bg-zinc-800 px-[.7vw] py-[.5vw] rounded-full flex items-center justify-center font-bold text-sm">
        <i className="ri-more-fill"></i>
      </div>
    </div>
  );
};

export default InteractionBar;
