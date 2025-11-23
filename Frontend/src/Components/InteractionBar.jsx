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

const InteractionBar = () => {
  let { video, isLike, isDislike, likes, dislikes } = useSelector(
    (state) => state.video
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (video?._id) {
      dispatch(fetchVideoData(video._id)).unwrap();
    }
  }, [video?._id, dispatch]);

  /* ----------------- LIKE HANDLER ----------------- */
  const frontHandleLike = async () => {
    const alreadyLiked = isLike;
    const alreadyDisliked = isDislike;

    dispatch(forceLike(!alreadyLiked));
    dispatch(forceDislike(false));
    dispatch(setLikes(likes + (alreadyLiked ? -1 : 1)));
    if (alreadyDisliked) dispatch(setDislikes(dislikes - 1));

    try {
      const res = await dispatch(handleLike(video._id)).unwrap();
      if (
        res.message !== "Video Liked Successfully" &&
        res.message !== "Like removed successfully"
      ) {
        dispatch(forceLike(alreadyLiked));
        dispatch(forceDislike(alreadyDisliked));
        dispatch(setLikes(likes));
        if (alreadyDisliked) dispatch(setDislikes(dislikes));
      }
    } catch (err) {
      dispatch(forceLike(alreadyLiked));
      dispatch(forceDislike(alreadyDisliked));
      dispatch(setLikes(likes));
      if (alreadyDisliked) dispatch(setDislikes(dislikes));
    }
  };

  /* ----------------- DISLIKE HANDLER ----------------- */
  const frontHandleDislike = async () => {
    const alreadyLiked = isLike;
    const alreadyDisliked = isDislike;

    dispatch(forceDislike(!alreadyDisliked));
    dispatch(forceLike(false));
    dispatch(setDislikes(dislikes + (alreadyDisliked ? -1 : 1)));
    if (alreadyLiked) dispatch(setLikes(likes - 1));

    try {
      const res = await dispatch(handleDislike(video._id)).unwrap();
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
      dispatch(forceDislike(alreadyDisliked));
      dispatch(forceLike(alreadyLiked));
      dispatch(setDislikes(dislikes));
      if (alreadyLiked) dispatch(setLikes(likes));
    }
  };

  /* ----------------- SHARE HANDLER ----------------- */
  const handleShare = async () => {
    const shareUrl = window.location.href; // or video.shareUrl

    if (navigator.share) {
      try {
        await navigator.share({
          title: video?.title || "Video",
          text: "Check out this video!",
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share cancelled", err);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  const handleDownload = async () => {
    const fileUrl = video?.video_Url?.url;
    if (!fileUrl) return alert("Download not available");

    const fileName = video?.title?.replace(/\s+/g, "_") + ".mp4";

    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = fileName;
    a.click();

    window.URL.revokeObjectURL(blobUrl);
  };

  return (
    <div className="text-custom-white flex items-center flex-wrap gap-1 md:gap-4 2xl:py-6 py-[3vw] md:py-1">

      {/* LIKE / DISLIKE */}
      <div className="flex items-center bg-zinc-800 rounded-full overflow-hidden">
        <button
          onClick={frontHandleLike}
          className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 md:py-1 transition hover:bg-zinc-700
            ${isLike ? "text-blue-400" : "text-custom-white"}`}
        >
          <i className="ri-thumb-up-line"></i>
          <span>{likes}</span>
        </button>

        <div className="h-6 w-[1px] bg-zinc-600"></div>

        <button
          onClick={frontHandleDislike}
          className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 md:py-1 transition hover:bg-zinc-700
            ${isDislike ? "text-red-400" : "text-custom-white"}`}
        >
          <i className="ri-thumb-down-line"></i>
          <span>{dislikes}</span>
        </button>
      </div>

      {/* SHARE */}
      <button
        onClick={handleShare}
        className="flex items-center gap-1 md:gap-2 bg-zinc-800 rounded-full  px-3 md:px-4 py-2 md:py-1 transition hover:bg-zinc-700"
      >
        <i className="ri-share-forward-line"></i>
        Share
      </button>

      {/* DOWNLOAD */}
      <button
        onClick={handleDownload}
        className="flex items-center gap-1 md:gap-2 bg-zinc-800 rounded-full px-3 md:px-4 py-2 md:py-1 transition hover:bg-zinc-700"
      >
        <i className="ri-download-line"></i>
        Download
      </button>
    </div>
  );
};

export default InteractionBar;
