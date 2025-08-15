'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the actual dashboard page, which is in the (citizen) route group
    router.replace('/dashboard');
  }, [router]);

  // Show loading spinner while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
