// src/context/AuthContext.js
'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { NextResponse } from 'next/server';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {

  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token && token!=undefined) {
        fetch('/api/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              // console.log(data.error);
              setIsAuthenticated(false);
            } else {
              // console.log(data.profileData);
              setUser(data.profileData);
              setIsAuthenticated(true);
            }
          })
          .catch((error) => {
            console.log("error fetching profile data " + error);
            NextResponse.json({
              message: 'Internal server error',
              error: error.toString(),
            }, {
              status: 500,
            });
          });
      }
      else{
        setIsAuthenticated(false);

        

      }
    } catch (error) {
      console.log("error fetching profile data " + error);
      NextResponse.json({
        message: 'Internal server error',
        error: error.toString(),
      }, {
        status: 500,
      });
    }
  }, [isAuthenticated]);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/register')
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
