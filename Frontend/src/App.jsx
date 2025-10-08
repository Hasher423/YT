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



const App = () => {
  return (
    <div className='font-bebasNeue'>
      <Routes>
        <Route path="/" element={<IsLoggedIn />} />
        <Route path="/channel/:channel_Profile/:id" element={<ChannelProfile />} />
        <Route path='/signup' element={<Signup />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path="/video" element={<Videoplay />} />
        <Route path="/video/:videoPlayer" element={<VideoPlayer />} />
        <Route path="/UploadVideo" element={<UploadVideo />} />
        <Route path="/results" element={<SearchResults />} />
      </Routes>
    </div>
  )
}

export default App