import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home'
import 'remixicon/fonts/remixicon.css'
import VideoPlayer from './Pages/VideoPlayer'
import Videoplay from './Components/Videoplay'
import UploadVideo from './Pages/UploadVideo';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video" element={<Videoplay />} />
        <Route path="/:videoplayer" element={<VideoPlayer />} />
        <Route path="/UploadVideo" element={<UploadVideo />} />
      </Routes>
    </div>
  )
}

export default App