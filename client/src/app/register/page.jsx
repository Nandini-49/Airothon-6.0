// src/pages/register.js
'use client'
import React, { useState } from 'react';
import Login from '../../components/controllers/login';
import Register from '../../components/controllers/register';
import { useAuth } from '@/context/AuthContext';

const Controller = () => {
  const { handleLogin } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  const handleToggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      <div className="flex justify-center my-4">
        <button
          className={`px-4 py-2 rounded-l ${showLogin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setShowLogin(false)}
        >
          Register
        </button>
        <button
          className={`px-4 py-2 rounded-r ${showLogin ? 'bg-gray-200 text-gray-800' : 'bg-blue-500 text-white'}`}
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>
      </div>
      <div className="container mx-auto">
        <div className="w-full max-w-2xl mx-auto">
          {showLogin ? (
            <Login handleLogin={handleLogin} />
          ) : (
            <Register />
          )}
        </div>
      </div>
    </div>
  );
};

export default Controller;
