import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SideBar from './SideBar'
import 'remixicon/fonts/remixicon.css';

import { Link } from 'react-router-dom';


const category = ['All', 'Music', 'Podcasts', 'Publications', 'Movies', 'Gaming', 'Live', 'Sports', 'News', 'Fashion', 'Beauty', 'Comedy', 'Education', 'Science', 'Travel', 'Gym', 'Food', 'Music', 'Podcasts', 'Publications', 'Movies', 'Gaming', 'Live', 'Sports', 'News', 'Fashion', 'Beauty',]


const MainVideos = () => {


    const [videos, setvideos] = useState(null)
    const [loading, setloading] = useState(true)
    const [logos, setlogos] = useState({})
    const [user, setuser] = useState(null)
    const [errMessage, setErrMessage] = useState('');

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/video/getVideos?page=1&limit=23`);
                setvideos(response.data.videos);

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
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3000/user/getuser', {
                withCredentials: true,
            });
            setuser(response.data.user);



        };
        fetchData();
    }, []);


    useEffect(() => {
        const fetchLogoImg = async () => {
            const logoMap = { ...logos };

            for (const video of videos) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/getuserForLogo/${video.userId}`, {
                        withCredentials: true,
                    });
                    logoMap[video.userId] = response.data.user.logoId;
                } catch (err) {
                    console.error('Error fetching logo for', video.userId, err);
                }
            }

            setlogos(logoMap);
        };

        if (videos) {
            fetchLogoImg();
        }
    }, [videos]);






    return (
        <div className='w-[86vw] py-2'>
            {/* CATEGORY */}
            <div className=' inline-block mt-10'>
                <div className=' bg-red- py-[1vw]  h-[10vh] w-[100vw] overflow-x-auto mt-4 SCROLLBAR_OF_CATEGORY' >
                    {category.map((category, key) => {
                        return (
                            <div key={key} className='cursor-pointer bg-zinc-800 px-3 py-2 text-white rounded inline mx-2 font-medium'>{category}</div>
                        )
                    })}






                </div>

                <div className='text-white bg-green- w-[100vw] flex justify-center py-2   '>
                    {errMessage ? <div classaName=' '>{errMessage}</div> : <div className='sm:flex flex-wrap justify-center'>
                        {
                            loading ? <div className='LoaderOfMainVidoes '> </div> : videos.map((video, index) => {
                                return (<Link key={index} to={`/videoPlayer?v=${video._id}`} className=' sm:m-4'>
                                    <div className='sm:w-[28vw]    '>
                                        <div>
                                            <img
                                                className='w-full sm:max-h-[16vmax]  object-cover rounded object-center'
                                                src={video.thumbnail_Url.secureurl}
                                                alt=""
                                            />
                                        </div>

                                        <div className='flex  px-[.5vw] py-[.2vw] gap-[1vw] justify-between'>
                                            <div className='w-[15%] mt-[1.4vw]'>
                                                <img className='w-[4vw] h-[4vw] rounded-full' src={`${logos[video?.userId]}`} alt="" />
                                            </div>

                                            <div className='w-[75%]  h-[100%]'>
                                                {/* TITLE */}
                                                <div className='  '>
                                                    <div>
                                                        <h3 className=' text-custom-white'>
                                                            {video.title.length > 20 ? video.title.slice(0, 60) + '...' : video.title}
                                                        </h3>
                                                    </div>
                                                </div>

                                                {/* CHANNEL NAME */}
                                                <div >
                                                    <p className='text-zinc-600'>{user?.channelName}</p>
                                                    <div className='flex items-center'>
                                                        <p className='text-zinc-600'>{video.views} views <span className='font-black'>.</span></p> &nbsp;
                                                        <p className='text-zinc-600'> ------ ago</p>
                                                    </div>
                                                </div>

                                            </div>


                                            <div className='mt-[1vw]'>
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