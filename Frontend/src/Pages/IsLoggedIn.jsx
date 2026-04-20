import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../Components/SearchBar';

const IsLoggedIn = ({ element }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
     console.log('TRYING!')
      try {
        const response = await axios(`${import.meta.env.VITE_BACKEND_URI}/user/validateToken`, {
          withCredentials: true,
        });


        if (response.data.valid) {
          console.log('[IsLoggedIn] ✅ Token is valid — user is logged in');
          setIsLoggedIn(true);
        } else {
          console.warn('[IsLoggedIn] ❌ Token invalid (valid=false) — redirecting to /login');
          setIsLoggedIn(false);
          navigate('/login');
        }
      } catch (error) {
        console.error('[IsLoggedIn] 🔴 Request failed');
        console.error('[IsLoggedIn] Error message:', error.message);
        console.error('[IsLoggedIn] Error status:', error.response?.status);
        console.error('[IsLoggedIn] Error response data:', error.response?.data);
        console.error('[IsLoggedIn] Full error object:', error);
        setIsLoggedIn(false);
        navigate('/login');
      } 
    };

    checkToken();
  }, []);

  if (isLoggedIn === null) {
    console.log('[IsLoggedIn] ⏳ Still checking token...');
    return <div>Checking...</div>;
  }

  return isLoggedIn ? (
    <div>
      <SearchBar />
      {element}
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default IsLoggedIn;
