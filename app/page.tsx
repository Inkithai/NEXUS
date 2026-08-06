'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user has a session cookie
    const hasSession = document.cookie.includes('session=');
    if (hasSession) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
}