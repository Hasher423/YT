import React, { useContext, useState } from 'react';
import { UserContext } from '../Context/GetUserContext';


const Comments = ({ videoId, comments, channel }) => {
    const [comment, setComment] = useState('');
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim() || !channel ) return; // ensures user is loaded



        try {
            const response = await fetch(`http://localhost:3000/comment/addComment/${videoId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // correct place
                body: JSON.stringify({ comment, channel}),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Comment submitted:', data.message);
                setComment('');
            } else {
                console.error('Error submitting comment:', data.message || data.error);
            }
        } catch (err) {
            console.error('Request failed:', err);
        }
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
                    { <form onSubmit={handleSubmit} className='border-b-[1px]'>
                        <input
                            type='text'
                            placeholder='Add a comment'
                            className='outline-none text-[1.2vw] w-full bg-transparent'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </form>
                    }
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
                                type='submit'
                                onClick={handleSubmit}
                                className='mt-[1vw] bg-blue-500 text-black p-[.3vw] px-[1.2vw] rounded-2xl'
                            >
                                Comment
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Additional Grid Example */}
            {comments?.map((element, idx) => {
                return (<div key={idx} className='w-full grid grid-cols-[.3fr_3fr_.1fr] mt-4 px-2'>
                    <div className='flex items-center justify-center'>
                        <img
                            className='w-10 h-10 rounded-full object-cover'
                            src='https://res.cloudinary.com/dmazphi1z/image/upload/v1751113598/my_thumbnail/my_thumbnail/thumbnail_1751113596025.jpg'
                            alt='User'
                        />
                    </div>
                    <div className='flex flex-col text-white px-[.8vw] py-[.7vw]'>

                        <div>@{element?.channel}</div>
                        <div>{element.commentText}</div>
                    </div>
                    <div className='flex items-center justify-end text-white'><i class="ri-more-2-line"></i></div>
                </div>)
            })}

        </div>
    );
};

export default Comments;
