import React, { useEffect, useState } from 'react';
import Home from './Home';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import App from '../App'
import SearchBar from '../Components/SearchBar';
const IsLoggedIn = ({ element }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios(`${import.meta.env.VITE_BACKEND_URI}/user/validateToken`, {
          withCredentials: true,
        });
        if (response.data.valid) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          navigate('/login');
        }
      } catch (error) {
        setIsLoggedIn(false);
        navigate('/login');
      }
    };

    checkToken();
  }, [navigate]);

  if (isLoggedIn === null) return <div>Checking...</div>;

  return isLoggedIn ? (<div>
    <SearchBar />

    {element}
  </div>) : <Navigate to="/login" />;
};

export default IsLoggedIn;
