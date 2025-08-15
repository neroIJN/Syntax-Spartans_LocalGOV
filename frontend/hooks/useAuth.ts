'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  nicNumber: string;
  phoneNumber: string;
  userType: string;
  profilePicture?: string;
  gender?: string;
  address?: string;
  dateOfBirth?: string;
  isEmailVerified?: boolean;
  isActive?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for stored token on component mount
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      // Verify token with backend and get user data
      verifyToken(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/mysql/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setToken(token);
        setUser(response.data.data);
      } else {
        // Invalid token, remove it
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      // Invalid token, remove it
      localStorage.removeItem('authToken');
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (authToken: string, userData: User) => {
    localStorage.setItem('authToken', authToken);
    setToken(authToken);
    setUser(userData);
  };

  const logout = async () => {
    try {
      // Call backend logout endpoint if token exists
      if (token) {
        await axios.post('http://localhost:5000/api/auth/mysql/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with client-side logout even if backend call fails
    } finally {
      // Always clear client-side data
      localStorage.removeItem('authToken');
      setToken(null);
      setUser(null);
      router.push('/auth/login');
    }
  };

  return {
    user,
    token,
    login,
    logout,
    isLoading
  };
};
