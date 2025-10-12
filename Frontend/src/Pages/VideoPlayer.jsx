import React, { useContext, useState } from 'react'
import Videoplay from '../Components/Videoplay'
import SearchBar from '../Components/SearchBar'
import SideVideos from '../Components/SideVideos'
import SideBar from '../Components/SideBar'
import { Context } from '../Context/VideosContext'




const VideoPlayer = () => {
    const showSideBar = useContext(Context)[0]
    const setshowSideBar = useContext(Context)[1]
    return (
        <div className='min-h-screen min-w-screen bg-[#0F0F0F] '>
            <div className='sm:flex sm:gap-6 b  min-w-screen sm:p5  pt-10 md:pt-[9vh]'>
                <SideBar showSideBar={showSideBar} />
                <Videoplay  />
                <SideVideos />
            </div>
        </div>
    )
}

export default VideoPlayer