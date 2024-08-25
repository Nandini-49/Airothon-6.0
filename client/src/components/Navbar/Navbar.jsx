// src/components/Navbar/Navbar.js
'use client'
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Navbarhead = () => {
  const { isAuthenticated, handleLogout, user } = useAuth();
  const router = useRouter();
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const closeNav = () => {
    setNav(false);
  };

  const navItems = [
    { id: 1, text: 'Algorithm' },
    { id: 2, text: 'Weather' },
    { id: 3, text: 'Api' },
    { id: 4, text: 'About' },
    { id: 5, text: 'Contact' },
  ];

  const handleDashboardClick = () => {
    if (!isAuthenticated) {
      router.push('/register');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className='bg-gray-900 flex justify-between items-center h-24 mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'> <Link href="/">AIRBUS</Link> </h1>

      <div className='hidden md:flex justify-between items-center gap-4'>
        <ul className='flex'>
          {navItems.map((item) => (
            <li
              key={item.id}
              className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
            >
              {item.text}
            </li>
          ))}
        </ul>
        <button onClick={handleDashboardClick} className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'>
          Dashboard
        </button>
       
        <div className='pl-3 ml-3'>
          {isAuthenticated ? (
            <button className='bg-[#00df9a] text-black px-4 py-2 rounded-lg' onClick={handleLogout}>
              <p>Welcome {user?.username}</p>Logout
            </button>
          ) : (
            <Link href={'/register'}>
              <button className='bg-[#00df9a] text-black px-4 py-2 rounded-lg'>Login</button>
            </Link>
          )}
        </div>
      </div>

      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <div className={`md:hidden fixed top-0 left-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 ${nav ? 'left-0' : 'left-[-100%]'}`}>
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>AIRBUS</h1>
        {navItems.map((item) => (
          <li
            key={item.id}
            onClick={closeNav}
            className='p-4 border-b border-gray-600 hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer'
          >
            {item.text}
          </li>
        ))}
        <button onClick={handleDashboardClick} className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'>
          Dashboard
        </button>
        <div className='p-4'>
          {isAuthenticated ? (
            <button className='bg-[#00df9a] text-black px-4 py-2 rounded-lg' onClick={handleLogout}>
              <p>Welcome {user?.username}</p>Logout
            </button>
          ) : (
            <Link href={'/register'}>
              <button className='bg-[#00df9a] text-black px-4 py-2 rounded-lg'>Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbarhead;
