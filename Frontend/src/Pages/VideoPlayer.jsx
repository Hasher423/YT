import React, { useContext, useEffect, useState } from 'react'
import Videoplay from '../Components/Videoplay'
import SearchBar from '../Components/SearchBar'
import SideVideos from '../Components/SideVideos'
import SideBar from '../Components/SideBar'
import { Context } from '../Context/VideosContext'
import { useLocation } from "react-router-dom";



const VideoPlayer = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const videoId = searchParams.get("v");

    useEffect(() => {
        // scroll to top on video change
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [videoId]);

    return (
        <div className='min-h-screen min-w-screen bg-[#0F0F0F] '>
            <div className='sm:flex sm:gap6   min-w-screen   pt-10 md:pt-[9v]'>
                {/* <SideBar showSideBar={showSideBar} /> */}
                <Videoplay />
                <SideVideos />
            </div>
        </div>
    )
}

export default VideoPlayer