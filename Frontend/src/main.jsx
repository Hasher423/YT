import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import VideosContext from './Context/VideosContext.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <VideosContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </VideosContext>
      </Provider>
  </StrictMode>,
)
