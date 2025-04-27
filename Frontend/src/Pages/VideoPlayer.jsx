import React, { useState } from 'react'
import Videoplay from '../Components/Videoplay'
import SearchBar from '../Components/SearchBar'
import SideVideos from '../Components/SideVideos'
import SideBar from '../Components/SideBar'

const VideoPlayer = () => {

    const [showSideBar, setshowSideBar] = useState(false)
    return (
        <div className='min-h-screen min-w-screen bg-[#0F0F0F] '>
            <SearchBar showSideBar={showSideBar} setshowSideBar={setshowSideBar} />
            <div className='flex  min-w-screen p-5 pt-20'>
                <SideBar showSideBar={showSideBar} />
                <Videoplay  />
                <SideVideos />
            </div>
        </div>
    )
}

export default VideoPlayer