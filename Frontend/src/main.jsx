import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import VideosContext from './Context/VideosContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VideosContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </VideosContext>
  </StrictMode>,
)
