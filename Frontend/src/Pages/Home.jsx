import React from 'react'
import SearchBar from '../Components/SearchBar'
import SideBar from '../Components/SideBar'
import MainVideos from '../Components/MainVideos'

const Home = () => {
  return (
    <div className='bg-custom-black w-full min-h-screen overflow-x-hidden'>
      <SearchBar />
      <div className='flex items w-screen'>
        <SideBar />
        <MainVideos />
      </div>
    </div>
  )
}

export default Home