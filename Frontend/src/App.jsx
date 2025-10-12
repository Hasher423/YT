import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home'
import 'remixicon/fonts/remixicon.css'
import VideoPlayer from './Pages/VideoPlayer'
import Videoplay from './Components/Videoplay'
import UploadVideo from './Pages/UploadVideo';
import Signup from './Pages/Signup';
import IsLoggedIn from './Pages/IsLoggedIn';
import Login from './Pages/Login';
import ChannelProfile from './Pages/ChannelProfile';
import SearchResults from './Components/SearchResults';
import SearchBar from './Components/SearchBar';



const App = () => {
  return (
    <div className='font-bebasNeue 2xl:text-[2.5rem]'>
    
      <Routes>
        <Route path="/" element={<IsLoggedIn element={<Home />} />} />
        <Route path="/channel/:channel_Profile/:id" element={<IsLoggedIn element={<ChannelProfile />} />} />
        <Route path='/signup' element={<Signup />}  ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path="/video" element={<IsLoggedIn element={<Videoplay />} />} />
        <Route path="/video/:videoPlayer" element={<IsLoggedIn element={<VideoPlayer />} />} />
        <Route path="/UploadVideo" element={<IsLoggedIn element={<UploadVideo />} />} />
        <Route path="/results" element={<IsLoggedIn element={<SearchResults />} />} />
      </Routes>
    </div>
  )
}

export default App