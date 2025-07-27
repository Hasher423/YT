import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SideBar from './SideBar'
import 'remixicon/fonts/remixicon.css';
import { Link } from 'react-router-dom';
import { calculateAgo } from '../utils/Ago';


const category = [];

const MainVideos = () => {


    const [videos, setvideos] = useState(null)
    const [loading, setloading] = useState(true)
    const [logos, setlogos] = useState({})
    const [user, setuser] = useState(null)
    const [errMessage, setErrMessage] = useState('');

    const reArrangeArray = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return arr
    }

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/video/getVideos?page=1&limit=23`,
                    {
                        headers: {
                            'Cache-Control': 'no-cache',
                        },
                        withCredentials: true,
                    }
                );
                // setvideos(response.data.videos);
                setvideos(reArrangeArray(response?.data?.videos))

                setloading(false);
            } catch (err) {
                console.log(err.message);
                // setloading(false);
                setErrMessage(JSON.stringify(err))
            }
        };

        fetchVideos();
    }, []);


    useEffect(() => {

        setuser(JSON.parse(localStorage.getItem('user')));

    }, []);


    useEffect(() => {
        const fetchLogoImg = async () => {
            const userIdMap = {}; // Used to track unique userIds
            const uniqueUserIds = [];

            for (const video of videos) {
                if (!userIdMap[video.userId]) {
                    userIdMap[video.userId] = true;
                    uniqueUserIds.push(video.userId);
                }
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/getUsersForLogos`, {
                    params: { ids: uniqueUserIds.join(',') },
                    withCredentials: true
                });
                const logoMap = {};
                for (const userId in response.data) {
                    logoMap[userId] = {
                        userId: response.data[userId].logoId,
                        channelName: response.data[userId].channelName
                    };
                }

                setlogos(logoMap);
            } catch (err) {
                console.error('Error fetching logos in batch:', err);
            }
        };

        if (videos) {
            fetchLogoImg();
        }
    }, [videos]);







    return (
        <div className='w-[86vw] py-2'>
            {/* CATEGORY */}
            <div className=' inline-block mt-10'>
                {/* <div className=' bg-red- py-[1vw]  h-[10vh] w-[100vw] overflow-x-auto mt-4 SCROLLBAR_OF_CATEGORY' >
                    {category.map((category, key) => {
                        return (
                            <div key={key} className='cursor-pointer bg-zinc-800 px-3 py-2 text-white rounded inline mx-2 font-medium'>{category}</div>
                        )
                    })}
                </div> */}

                <div className='text-white bg-green- w-[100vw] flex justify-center py-2   '>
                    {errMessage ? <div classaName=' '>{errMessage}</div> : <div className='sm:flex flex-wrap justify-center'>
                        {
                            loading ? (
                                <div className="w-full flex justify-center items-center py-20">
                                    <div className="w-12 h-12 border-2 border-b-transparent border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : videos.map((video, index) => {
                                return (<Link key={index} to={`/video/videoPlayer?v=${video._id}`} className=' sm:m-4'>
                                    <div className='sm:w-[28vw]    '>
                                        <div>
                                            <img
                                                className='w-full sm:max-h-[16vmax] object-cover rounded object-center '
                                                src={video?.thumbnail_Url?.secureurl}
                                                alt=""
                                            />
                                        </div>

                                        <div className='flex  px-[.5vw] py-[.2vw] gap-[vw]  justify-between lt-sm:py-[4vw] lt-sm:px-[1.4vw] '>
                                            <div className='w-[ ] mt-[1.4vw] place-content-center '>
                                                <img className='w-[4vw] h-[4vw] lt-sm:w-[10vw]  lt-sm:h-[10vw] rounded-full' src={`${logos[video?.userId]?.userId}`} alt="" />
                                            </div>

                                            <div className='w-[75%]  h-[100%]'>
                                                {/* TITLE */}
                                                <div className='  '>
                                                    <div>
                                                        <h3 className=' text-custom-white text-[1.4vw] lt-sm:text-[5vw]'>
                                                            {video.title.length > 40 ? video.title.substring(0, 40) + '...' : video.title}
                                                        </h3>
                                                    </div>
                                                </div>

                                                {/* CHANNEL NAME */}
                                                <div >
                                                    <p className='text-zinc-500 lt-sm:text-[2vh]'>{logos[video?.userId]?.channelName}</p>
                                                    <div className='flex items-center leading-none lt-sm:text-[2vh]'>
                                                        <p className='text-zinc-500'>{video.views} views <span className='font-black'>.</span></p> &nbsp;
<p className='text-zinc-500'>{calculateAgo(video.createdAt)}</p>
                                                    </div>
                                                </div>

                                            </div>


                                            <div className='mt-[1vw] lt-sm:text-[3vh]'>
                                                <i className="ri-more-2-fill"></i>
                                            </div>
                                        </div>


                                    </div>
                                </Link>)
                            })
                        }</div>}

                </div>
            </div>
        </div>
    )
}

export default MainVideos