import React, { useEffect } from 'react'
import Home from './Home'
import { useNavigate } from 'react-router-dom'


const IsLoggedIn = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const token = document.cookie
  
  
  useEffect(() => {

    token ? setIsLoggedIn(true) : navigate('/Signup')
    

  }, [])

  return (
    <div>
      {isLoggedIn ? <Home /> : <div>LoginFirst</div>}
    </div>
  )
}

export default IsLoggedIn