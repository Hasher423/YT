import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import VideosContext from './Context/VideosContext.jsx'
import GetUserContext from './Context/GetUserContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GetUserContext>
      <VideosContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </VideosContext>
    </GetUserContext>
  </StrictMode>,
)
