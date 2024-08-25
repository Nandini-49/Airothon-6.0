// src/components/controllers/login.js
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Page = () => {

  const { handleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = { email, password };

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {

        toast.success('Login successful');

        const res = await response.json();
        localStorage.setItem('token', res.token);
        handleLogin(res.token);
        setEmail('');
        setPassword('');
        router.push('/');
        setLoading(false)
      } else {
        toast.error('Login failed Invalid Credentials');
        setLoading(false);
        setEmail('');
        setPassword('');
        
        const res = await response.json();
        throw new Error(res.message || 'Invalid credentials');
      }
    } catch (error) {
      // alert('Login failed: ' + error.message);
    }
  };

  return (
   
    <div className="max-w-md mx-auto bg-gray-900 rounded p-8 shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center text-[#00df9a]">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-[#00df9a]">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-[#00df9a]">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-[#00df9a] text-gray-900 py-2 rounded hover:bg-[#00c17d]">
          {
            loading ? 'Loading...' : 'Log in'
          }
         
        </button>
        <ToastContainer/>
      </form>
    </div>
  );
};

export default Page;
