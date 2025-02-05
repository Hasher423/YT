import React from 'react'
import Videoplay from '../Videoplay'
import SearchBar from '../Components/SearchBar'
import SideVideos from '../Components/SideVideos'

const VideoPlayer = () => {
    return (
        <div className='min-h-screen min-w-screen bg-zinc-900'>
            <SearchBar />
            <div className='flex  min-w-screen p-5 '>
                <Videoplay />
                <SideVideos />
            </div>
        </div>
    )
}

export default VideoPlayer