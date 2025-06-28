import React, { useContext } from 'react'
import SearchBar from '../Components/SearchBar'
import SideBar from '../Components/SideBar'
import MainVideos from '../Components/MainVideos'
import { Context } from '../Context/VideosContext'
import ChannelVideos from '../Components/ChannelVideos'

import { UserContext } from '../Context/GetUserContext'



const Home = () => {

    const showSideBar = useContext(Context)[0];
    const user = useContext(UserContext)
    

    return (
        <div>
            <div className='bg-custom-black w-full min-h-    '>
                <SearchBar />

                <div className='pt-[15vw] md:pt-[6vw] 530-780:pt-[10vw]  px-[3vw] md:px-[6vmax]'>

                    <div className='bg-red-900 h-[15vh] md:h-[25vh] 530-780:h-[20vh] rounded-lg md:rounded-2xl w-[95vw] md:w-[90vw] overflow-hidden '>
                        <img className='w-full h-full object-cover object-center' src={user?.user?.bgBanner} alt="" />
                    </div>



                    {/* LOGO AND DETAILS */}

                    <div className='w-[95vw] md:w-[90vw] mt-[3vw] grid grid-cols-[20%_80%] gap-[3vw] md:gap-0'>
                        {/* IMAGE */}
                        <div className='h-full flex items-center justify-center'>
                            <img
                                className='w-[20vw] md:w-[12vw] aspect-square rounded-full object-cover object-center'
                                src={user?.user?.logoId}
                                alt=""
                            />
                        </div>

                        {/* TEXT */}
                        <div className='text-white h-full'>
                            <div className='text-[7vw] md:text-[3vw] font-[700] lg:text-[3.5vw]'>
                                <p className='sm:text-[3.6vw]'>Sheryians Coding School</p>
                            </div>
                            <div className='md:text-[2vw] font-[400]'>
                                <span>@{user?.user?.channelName}{((Number(Date().length))*(Math.random())).toFixed(0)}</span>
                            </div>
                            <div className='flex items-start justify-start text-gray-200 text-opacity-85 md:text-[2vw]'>
                                <div className='sm:text-[1.5vw]'>15.5k Subscribers</div>
                                <span className='mx-[1.2vw] font-[900] sm:text-[1.2vw]'>.</span>
                                <div className='sm:text-[1.5vw]'>270 videos</div>
                            </div>

                            <div className='hidden sm:block'>
                                <button className='bg-custom-white text-black text-[2vw] mt-[1vw] px-[2vw] py-[.7vw] sm:py-[.4vw] rounded-3xl font-[500] sm:text-[1.3vw]'>
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>



                    <div className='mt-[1vh] md:mt-[8vw] sm:mt-0 sm:hidden'>
                        <button className='bg-white font-[500] w-full md:w-[14vw] sm:py-[.4vw] py-[1vw] md:text-[2.3vw] rounded-2xl text-custom-black'>Subscribe</button>
                    </div>






                    <ChannelVideos />

                </div>
            </div>
        </div>
    )
}

export default Home