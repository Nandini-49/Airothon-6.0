// src/pages/dashboard.js
'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/register'); // Redirect to register page if not authenticated
    }
  }, [isAuthenticated, router]);

  // Render nothing or a loading indicator while checking authentication
  if (!isAuthenticated) {
    return null; // Alternatively, you can return a loading spinner or a message
  }

  return (
    <div>dashboard</div>
  );
}
