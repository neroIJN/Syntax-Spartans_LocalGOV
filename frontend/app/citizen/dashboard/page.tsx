'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CitizenDashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the correct dashboard URL
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg">Redirecting to dashboard...</p>
        <p className="text-blue-300 text-sm mt-2">
          The dashboard URL has been updated to <span className="font-mono font-semibold">/dashboard</span>
        </p>
      </div>
    </div>
  );
}
