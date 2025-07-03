import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const UserContext = createContext();

const GetUserContext = ({ children }) => {
  const [user, setuser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/getuser`, {
        withCredentials: true,
      });
      setuser(response?.data?.user);
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setuser }}>
      {children}
    </UserContext.Provider>
  );
};

export default GetUserContext;
