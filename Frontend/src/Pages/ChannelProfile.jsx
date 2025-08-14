import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../Components/SearchBar'
import ChannelVideos from '../Components/ChannelVideos'
import ChannelHome from '../Components/ChannelHome'
import { Context } from '../Context/VideosContext'

const Home = () => {
    const [home, setHome] = useState(true)
    const [videos, setVideos] = useState(false)
    const [user, setUser] = useState(null)
    const showSideBar = useContext(Context)[0];

    const { id } = useParams(); // extract id from /channel/@id

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/user/getuserById/${id}`, {
                    withCredentials: true
                });
                setUser(res.data.user);
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        }

        fetchUser();
    }, [id])

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <div className='bg-custom-black w-full min-h-'>
                <SearchBar />
                <div className='pt-[15vw] md:pt-[6vw] 530-780:pt-[10vw] px-[3vw] md:px-[6vmax]'>

                    <div className='bg-red-900 h-[15vh] md:h-[25vh] 530-780:h-[20vh] rounded-lg md:rounded-2xl w-[95vw] md:w-[90vw] overflow-hidden'>
                        <img className='w-full h-full object-cover object-center' src={user.bgBanner} alt="" />
                    </div>

                    <div className='w-[95vw] md:w-[90vw] mt-[3vw] grid grid-cols-[20%_80%] gap-[3vw] md:gap-0'>
                        <div className='h-full flex items-center justify-center'>
                            <img
                                className='w-[20vw] md:w-[12vw] aspect-[30/30] rounded-full object-cover'
                                src={user.logoId}
                                alt=""
                            />
                        </div>

                        <div className='text-white h-full'>
                            <div className='text-[7vw] md:text-[3vw] font-[700] lg:text-[3.5vw]'>
                                <p className='sm:text-[3.6vw]'>{user.channelName}</p>
                            </div>
                            <div className='md:text-[2vw] font-[400]'>
                                <span>@{user.channelName}</span>
                            </div>
                            <div className='flex items-start justify-start text-gray-200 text-opacity-85 md:text-[2vw]'>
                                <div className='sm:text-[1.5vw]'>{user.subscribers} Subscribers</div>
                                <span className='mx-[1.2vw] font-[900] sm:text-[1.2vw]'>.</span>
                                <div className='sm:text-[1.5vw]'> videos</div>
                            </div>
                                {/* FIX SUBSCRIBING FROM THE PROFILE ! */}
                            {/* <div className='hidden sm:block'>
                                <button className='bg-red-900 text-black text-[2vw] mt-[1vw] px-[2vw] py-[.7vw] sm:py-[.4vw] rounded-3xl font-[500] sm:text-[1.3vw]'>
                                    Subscribe
                                </button>
                            </div> */}
                        </div>
                    </div>

                    <div className='mt-[1vh] md:mt-[8vw] sm:mt-0 sm:hidden'>
                        <button className='bg-white font-[500] w-full md:w-[14vw] sm:py-[.4vw] py-[1vw] md:text-[2.3vw] rounded-2xl text-custom-black'>Subscribe</button>
                    </div>

                    <div className='cursor-pointer text-custom-white md:py-[.1vw] xl:text-[1.5vw] py-[4vw] text-opacity-30 border-b-[1px] border-zinc-700'>
                        <div>
                            <span className={`px-[3vw] md:px-[1.2vw] font-[500] inline-block ${home && 'text-white'}`}
                                onClick={() => { setHome(true); setVideos(false) }}>Home</span>
                            <span className={`px-[3vw] md:px-[1.2vw] font-[500] inline-block ${videos && 'text-white'}`}
                                onClick={() => { setHome(false); setVideos(true) }}>Videos</span>
                            <span className='px-[3vw] md:px-[1.2vw] font-[500] inline-block text-red-900'>Shorts</span>
                            <span className='px-[3vw] md:px-[1.2vw] font-[500] inline-block text-red-900'>Playlists</span>
                            <span><i className='ri-search-line text-[5vw] md:text-[1.2vw] xl:text-[2vw]' /></span>
                        </div>
                    </div>

                    {home && <ChannelHome user={user} />}
                    {videos && <ChannelVideos user={user} />}

                </div>
            </div>
        </div>
    )
}

export default Home;
