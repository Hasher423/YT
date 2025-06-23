import React, { useEffect, useState } from 'react';
import Home from './Home';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const IsLoggedIn = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios('http://localhost:3000/user/validateToken', {
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

  return isLoggedIn ? <Home /> : <Navigate to="/login" />;
};

export default IsLoggedIn;
