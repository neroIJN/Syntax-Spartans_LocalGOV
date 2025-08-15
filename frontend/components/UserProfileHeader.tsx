'use client';

import { useState, useEffect } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';

interface UserProfileHeaderProps {
  className?: string;
}

export default function UserProfileHeader({ className = '' }: UserProfileHeaderProps) {
  const { user, token } = useAuth();
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (user?.profilePicture && token) {
      fetchUserPhoto();
    }
  }, [user, token]);

  const fetchUserPhoto = async () => {
    if (!token) return;

    setImageLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/mysql/photo', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data.url) {
          // Construct the full URL for the image
          setProfileImageUrl(`http://localhost:5000${data.data.url}`);
        }
      } else {
        console.log('No profile photo found or error fetching photo');
        setProfileImageUrl(null);
      }
    } catch (error) {
      console.error('Error fetching user photo:', error);
      setProfileImageUrl(null);
    } finally {
      setImageLoading(false);
    }
  };

  const getDisplayName = () => {
    if (!user) return 'Guest User';
    return user.firstName || 'User';
  };

  const getInitials = () => {
    if (!user) return 'G';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || 'U';
  };

  return (
    <div className={`flex items-center ${className}`}>
      <button type="button" className="-m-1.5 flex items-center p-1.5 hover:bg-white/10 rounded-lg transition-smooth hover-lift">
        <div className="h-8 w-8 rounded-full overflow-hidden shadow-lg hover-lift flex items-center justify-center">
          {profileImageUrl && !imageLoading ? (
            <img
              src={profileImageUrl}
              alt={`${getDisplayName()}'s profile`}
              className="h-full w-full object-cover rounded-full"
              onError={() => {
                console.log('Image failed to load, falling back to default');
                setProfileImageUrl(null);
              }}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center rounded-full">
              {imageLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : user?.profilePicture ? (
                <span className="text-white text-xs font-semibold">
                  {getInitials()}
                </span>
              ) : (
                <UserCircleIcon className="h-5 w-5 text-white" />
              )}
            </div>
          )}
        </div>
        <span className="hidden lg:flex lg:items-center">
          <span className="ml-3 text-sm font-semibold text-white">
            {getDisplayName()}
          </span>
        </span>
      </button>
    </div>
  );
}
