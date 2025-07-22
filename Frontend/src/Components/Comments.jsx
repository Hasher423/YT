import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, selectComments } from '../redux/features/commentSlice';

const Comments = ({ videoId, setrefreshComments }) => {
    const [comment, setComment] = useState('');
    const [channel, setChannel] = useState('');
    const dispatch = useDispatch();
    const commentList = useSelector(selectComments);

    // Set channel only once when component mounts
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.channelName) {
            setChannel(user.channelName);
        }
    }, []);

    const handleSubmit = async () => {
        setComment('');
        if (!comment.trim() || !channel) return;

        console.log('Dispatching comment...');

        dispatch(addComment({ videoId, comment, channel }))
            .unwrap()
            .then(() => {
                console.log('Commented Successfully');

                setrefreshComments(prev => !prev);
            })
            .catch((err) => {
                console.error('Error submitting comment:', err);
            });
    };

    const handleCancel = () => {
        setComment('');
    };

    return (
        <div className='text-white w-full grid grid-cols-1 min-h-10 py-[1.3vw] px-2 lt-sm:hidden'>
            <h2 className='font-bold text-[1.2vw]'>79 Comments</h2>

            <div className='grid place-items-center grid-cols-[10%_90%]'>
                <div>
                    <img
                        className='w-10 h-10 rounded-full'
                        src='https://res.cloudinary.com/dmazphi1z/image/upload/v1751113598/my_thumbnail/my_thumbnail/thumbnail_1751113596025.jpg'
                        alt='User'
                    />
                </div>
                <div className='w-full'>
                    <input
                        type='text'
                        placeholder='Add a comment'
                        className='outline-none text-[1.2vw] w-full bg-transparent  border-b-[1px]'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    {comment && (
                        <div className='w-full flex justify-end gap-[.7vw] font-bold font-sans'>
                            <button
                                type='button'
                                onClick={handleCancel}
                                className='mt-[1vw] hover:bg-white hover:bg-opacity-20 p-[.3vw] px-[1.2vw] rounded-2xl'
                            >
                                Cancel
                            </button>
                            <button
                                type='button'
                                onClick={handleSubmit}
                                className='mt-[1vw] bg-blue-500 text-black p-[.3vw] px-[1.2vw] rounded-2xl'
                            >
                                Comment
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Comment List */}
            {commentList?.map((element, idx) => (
                <div
                    key={idx}
                    className='w-full grid grid-cols-[.3fr_3fr_.1fr] mt-4 px-2'
                >
                    <div className='flex items-center justify-center'>
                        <img
                            className='w-10 h-10 rounded-full object-cover'
                            src='https://res.cloudinary.com/dmazphi1z/image/upload/v1751113598/my_thumbnail/my_thumbnail/thumbnail_1751113596025.jpg'
                            alt='User'
                        />
                    </div>
                    <div className='flex flex-col text-white px-[.8vw] py-[.7vw]'>
                        <div>@{element?.channel}</div>
                        <div>{element.commentText || element.comment}</div>
                    </div>
                    <div className='flex items-center justify-end text-white'>
                        <i className='ri-more-2-line'></i>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comments;
