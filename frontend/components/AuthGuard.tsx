'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export default function AuthGuard({ 
  children, 
  requireAuth = true, 
  redirectTo = '/auth/login' 
}: AuthGuardProps) {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && (!token || !user)) {
        // User is not authenticated, redirect to login
        router.push(redirectTo);
      } else if (!requireAuth && token && user) {
        // User is authenticated but accessing a non-auth page (like login/register)
        // Redirect to dashboard
        router.push('/dashboard');
      }
    }
  }, [user, token, isLoading, requireAuth, redirectTo, router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated, show nothing (will redirect)
  if (requireAuth && (!token || !user)) {
    return null;
  }

  // If authentication is not required but user is authenticated, show nothing (will redirect)
  if (!requireAuth && token && user) {
    return null;
  }

  return <>{children}</>;
}
