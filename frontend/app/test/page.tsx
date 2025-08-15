'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

interface ApiResponse {
  success?: boolean;
  token?: string;
  user?: any;
  data?: any;
  message?: string;
  error?: string;
}

export default function TestPage() {
  const { user, token, login, logout, isLoading } = useAuth();
  const [credentials, setCredentials] = useState({
    email: 'test@example.com',
    password: 'password123'
  });
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [verifyResponse, setVerifyResponse] = useState<ApiResponse | null>(null);

  const handleTestLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/mysql/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      setResponse(data);

      if (data.token && data.user) {
        login(data.token, data.user);
      }
    } catch (error) {
      console.error('Test login failed:', error);
      setResponse({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  const handleTestVerify = async () => {
    if (!token) {
      setVerifyResponse({ error: 'No token available' });
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/mysql/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setVerifyResponse(data);
    } catch (error) {
      console.error('Test verify failed:', error);
      setVerifyResponse({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  return (
    <div className="min-h-screen p-8 bg-slate-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Authentication Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Current Auth State</h2>
          
          <div className="mb-4">
            <p className="mb-1"><span className="font-semibold">Loading:</span> {isLoading ? 'Yes' : 'No'}</p>
            <p className="mb-1"><span className="font-semibold">Authenticated:</span> {token ? 'Yes' : 'No'}</p>
            <p className="mb-1"><span className="font-semibold">Token:</span> {token ? `${token.substring(0, 20)}...` : 'None'}</p>
          </div>
          
          {user && (
            <div className="mt-4 p-4 bg-slate-700 rounded-lg">
              <h3 className="font-semibold mb-2">User Info:</h3>
              <pre className="text-sm overflow-auto p-2 bg-slate-600 rounded">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          )}
          
          <div className="mt-6">
            {token ? (
              <button 
                onClick={logout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Logout
              </button>
            ) : (
              <p className="text-amber-400">Not logged in</p>
            )}
          </div>
        </div>
        
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Test Login</h2>
          
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input 
              type="text" 
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 text-white"
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input 
              type="password" 
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 text-white"
            />
          </div>
          
          <div className="flex space-x-4 mb-6">
            <button 
              onClick={handleTestLogin}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Test Login
            </button>
            
            <button 
              onClick={handleTestVerify}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              disabled={!token}
            >
              Test Verify
            </button>
          </div>
          
          {response && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Login Response:</h3>
              <pre className="text-sm overflow-auto p-2 bg-slate-700 rounded">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}
          
          {verifyResponse && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Verify Response:</h3>
              <pre className="text-sm overflow-auto p-2 bg-slate-700 rounded">
                {JSON.stringify(verifyResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Navigation Tests</h2>
        <div className="flex flex-wrap gap-4">
          <a href="/dashboard" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
            Go to Dashboard
          </a>
          <a href="/citizen/dashboard" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
            Go to /citizen/dashboard (Redirect)
          </a>
          <a href="/auth/login" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors">
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
}
