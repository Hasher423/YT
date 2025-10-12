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
    const alreadyLiked = isLike;
    const alreadyDisliked = isDislike;

    // Optimistic UI update
    dispatch(forceLike(!alreadyLiked));
    dispatch(forceDislike(false));
    dispatch(setLikes(likes + (alreadyLiked ? -1 : 1)));
    if (alreadyDisliked) dispatch(setDislikes(dislikes - 1));

    try {
      const res = await dispatch(handleLike(video._id)).unwrap();

      // Optional: rollback if server fails or returns unexpected message
      if (res.message !== "Video Liked Successfully" && res.message !== "Like removed successfully") {
        // rollback
        dispatch(forceLike(alreadyLiked));
        dispatch(forceDislike(alreadyDisliked));
        dispatch(setLikes(likes));
        if (alreadyDisliked) dispatch(setDislikes(dislikes));
      }
    } catch (err) {
      // rollback on error
      dispatch(forceLike(alreadyLiked));
      dispatch(forceDislike(alreadyDisliked));
      dispatch(setLikes(likes));
      if (alreadyDisliked) dispatch(setDislikes(dislikes));
      console.error("Like failed:", err);
    }
  };



  const frontHandleDislike = async () => {
    const alreadyLiked = isLike;
    const alreadyDisliked = isDislike;

    // Optimistic UI update
    dispatch(forceDislike(!alreadyDisliked));
    dispatch(forceLike(false));
    dispatch(setDislikes(dislikes + (alreadyDisliked ? -1 : 1)));
    if (alreadyLiked) dispatch(setLikes(likes - 1));

    try {
      const res = await dispatch(handleDislike(video._id)).unwrap();

      // Optional: rollback if unexpected response
      if (
        res.message !== "Video disliked successfully" &&
        res.message !== "Dislike removed successfully"
      ) {
        dispatch(forceDislike(alreadyDisliked));
        dispatch(forceLike(alreadyLiked));
        dispatch(setDislikes(dislikes));
        if (alreadyLiked) dispatch(setLikes(likes));
      }
    } catch (err) {
      // rollback on error
      dispatch(forceDislike(alreadyDisliked));
      dispatch(forceLike(alreadyLiked));
      dispatch(setDislikes(dislikes));
      if (alreadyLiked) dispatch(setLikes(likes));
      console.error("Dislike failed:", err);
    }
  };


  return (
    <div className="text-custom-white 2xl:py-6 flex py-[3vw] md:py-1  items-center gap-[.6vw] flex-wrap">
      <div className="bg-zinc-800 2xl:text-[2rem] 2xl:py-5 px-[2vw] py-[.4vw] font-[600] text-sm rounded-3xl flex items-center gap-4">
        <i
          onClick={frontHandleLike}
          className={`ri-thumb-up-line cursor-pointer ${isLike ? 'text-blue-400' : ''}`}
        ></i>
        {likes}


        <i
          onClick={frontHandleDislike}
          className={`ri-thumb-down-line cursor-pointer 2xl:text-[2.5rem] text-rd-400 ${isDislike ? 'text-red-400' : ''}`}
        ></i>
        {dislikes}
      </div>

      <div className="bg-zinc-800 px-[2vw] py-[.4vw] 2xl:py-5 font-[700] 2xl:text-[2.5rem] text-sm rounded-3xl">
        <i className="ri-share-forward-line"></i> &nbsp; Share
      </div>

      <div className="bg-red-900 px-[2vw] py-[.4vw] 2xl:py-5 font-[400] 2xl:text-[2.5rem] text-sm rounded-3xl">
        <i className="ri-download-line "></i> &nbsp;
        <Link href={video?.video_Url?.url} download>
          Download
        </Link>
      </div>

      <div className=" bg-red-900 px-[.7vw] py-[.5vw] 2xl:p-5 2xl:text-[2.5rem] rounded-full flex items-center justify-center font-bold text-sm">
        <i className="ri-more-fill "></i>
      </div>
    </div>
  );
};

export default InteractionBar;
