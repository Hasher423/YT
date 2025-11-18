import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, selectComments, fetchComments } from '../redux/features/commentSlice';

const Comments = () => {
    const [comment, setComment] = useState('');
    const [refreshComments, setrefreshComments] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const dispatch = useDispatch();
    const commentList = useSelector(selectComments);
    const videoData = useSelector((state) => state.video);

    // 🔥 Mobile check based on lt-sm tailwind breakpoint (<640px)
    useEffect(() => {
        const mobileQuery = window.matchMedia("(max-width: 639px)");

        const checkMobile = () => setIsMobile(mobileQuery.matches);
        checkMobile();

        mobileQuery.addEventListener("change", checkMobile);

        return () => mobileQuery.removeEventListener("change", checkMobile);
    }, []);

    useEffect(() => {
        dispatch(fetchComments(videoData?.video?._id));
    }, [videoData?.video?._id, refreshComments]);

    const handleSubmit = async () => {
        if (!comment.trim() || !videoData?.user?.channelName) return;

        const commentText = comment;
        setComment('');

        dispatch(
            addComment({
                videoId: videoData?.video?._id,
                comment: commentText,
                channel: videoData?.user?.channelName,
            })
        )
            .unwrap()
            .then(() => {
                setrefreshComments((prev) => !prev);
            })
            .catch((err) => {
                console.error('Error submitting comment:', err);
            });
    };

    const handleCancel = () => setComment('');

    // 🔥 Only show first 2 comments on mobile (lt-sm)
    const visibleComments =
        isMobile && !showAll ? commentList.slice(0, 1) : commentList;

    return (
        <div className="text-white w-full grid grid-cols-1 min-h-10 py-[1.3vw] px-2 lt-sm:bg-zinc-900">
            <h2 className="text-[3vh] md:text-[1.2vw]">
                {commentList.length} Comments
            </h2>

            {/* Comment Input */}
            <div className="grid place-items-center md:grid-cols-[10%_90%] grid-cols-[20%_80%]">
                <div>
                    <img
                        className="w-10 md:h-10 2xl:h-20 2xl:w-20 aspect-square object-cover rounded-full"
                        src={`${JSON.parse(localStorage.user).logoId}`}
                        alt="User"
                    />
                </div>

                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Add a comment"
                        className="outline-none font-robotoCustom text-[3vh] md:text-[1.2vw] w-full bg-transparent border-b-[1px]"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    {comment && (
                        <div className="w-full flex justify-end gap-[.7vw] md:font-bold font-sans">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="mt-3 md:mt-[1vw] lt-sm:text-[3vh] font-bebasNeue lt-sm:bg-yellow-700 hover:bg-white hover:bg-opacity-20 p-[.3vw] px-4 md:px-[1.2vw] rounded-2xl"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="mt-3 lt-sm:text-[3vh] md:mt-[1vw] bg-blue-800 font-bebasNeue md:text-black md:p-[.3vw] px-[3vw] md:px-[1.2vw] rounded-2xl"
                            >
                                Comment
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Comment List */}
            {visibleComments.map((element, idx) => (
                <div
                    key={idx}
                    className="w-full grid grid-cols-[.3fr_3fr_.1fr] mt-4 px-2"
                >
                    <div className="flex items-center justify-center">
                        <img
                            className="w-10 h-10 2xl:h-20 2xl:w-20 rounded-full object-cover"
                            src={element.logo}
                            alt="User"
                        />
                    </div>

                    <div className="flex flex-col text-white px-[.8vw] py-[.7vw]">
                        <div>@{element.channel}</div>
                        <div>{element.commentText || element.comment}</div>
                    </div>

                    <div className="flex items-center justify-end text-white">
                        <i className="ri-more-2-line"></i>
                    </div>
                </div>
            ))}

            {/* "Show More" - ONLY mobile (lt-sm) */}
            {isMobile && commentList.length > 2 && (
                <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className="text-zinc-400 text-end mt-3 lt-sm:mr-4 lt-sm:text-[3vh]"
                >
                    {showAll ? "Show Less" : `more...`}
                </button>
            )}
        </div>
    );
};

export default Comments;
