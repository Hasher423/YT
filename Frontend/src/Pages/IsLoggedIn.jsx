import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../Components/SearchBar';

const IsLoggedIn = ({ element }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      console.group('🔐 [IsLoggedIn] Token Check');
      console.time('checkToken duration');

      // ── 1. Cookie presence check (only works if NOT HttpOnly) ──
      const allCookies = document.cookie;
      console.log('[IsLoggedIn] All visible cookies:', allCookies || '(none)');

      const hasCookie = allCookies
        .split(';')
        .some(c => c.trim().startsWith('token=')); // 👈 replace 'token' with your cookie name

      console.log('[IsLoggedIn] Cookie found?', hasCookie);

      if (!hasCookie) {
        console.warn('[IsLoggedIn] No token cookie found — skipping API call, redirecting to /login');
        console.timeEnd('checkToken duration');
        console.groupEnd();
        setIsLoggedIn(false);
        navigate('/login');
        return;
      }

      // ── 2. Validate token with backend ──
      console.log('[IsLoggedIn] Firing validateToken request to:', `${import.meta.env.VITE_BACKEND_URI}/user/validateToken`);

      try {
        const response = await axios(`${import.meta.env.VITE_BACKEND_URI}/user/validateToken`, {
          withCredentials: true,
        });

        console.log('[IsLoggedIn] Response status:', response.status);
        console.log('[IsLoggedIn] Response data:', response.data);

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
      } finally {
        console.timeEnd('checkToken duration');
        console.groupEnd();
      }
    };

    checkToken();
  }, [navigate]);

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
