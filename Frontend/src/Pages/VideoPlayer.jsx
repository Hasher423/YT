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
            <SearchBar showSideBar={showSideBar} setshowSideBar={setshowSideBar} />
            <div className='sm:flex sm:gap-6  min-w-screen sm:p-5  p]t-16 sm:pt-20'>
                <SideBar showSideBar={showSideBar} />
                <Videoplay  />
                <SideVideos />
            </div>
        </div>
    )
}

export default VideoPlayer