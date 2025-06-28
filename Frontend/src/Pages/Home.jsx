import React, { useContext } from 'react'
import SearchBar from '../Components/SearchBar'
import SideBar from '../Components/SideBar'
import MainVideos from '../Components/MainVideos'
import { Context } from '../Context/VideosContext'





const Home = () => {

  const showSideBar = useContext(Context)[0];

  return (
    <div className='bg-custom-black w-full min-h-screen overflow-x-hidden'>
      <SearchBar />
      <div className='flex items w-screen'>
        <SideBar showSideBar={showSideBar}/>

        <MainVideos />
      </div>
    </div>
  )
}

export default Home