'use client';

import { useState, useEffect } from 'react';
import { 
  UserCircleIcon, 
  PencilIcon, 
  CameraIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/DashboardLayout';
import AuthGuard from '@/components/AuthGuard';
import { useAuth } from '@/hooks/useAuth';
import { profileAPI } from '@/lib/api';

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  nicNumber: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  profilePicture?: string;
  isEmailVerified: boolean;
  createdAt: string;
}

interface ProfileFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    gender: 'male'
  });

  const [passwordData, setPasswordData] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (user?.profilePicture) {
      setProfileImageUrl(`http://localhost:5000/uploads/profiles/${user.profilePicture}`);
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await profileAPI.getCurrentUser();
      if (response.success) {
        setProfile(response.data);
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phoneNumber: response.data.phoneNumber,
          address: response.data.address || '',
          dateOfBirth: response.data.dateOfBirth ? response.data.dateOfBirth.split('T')[0] : '',
          gender: response.data.gender
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      setError(null);
      
      const response = await profileAPI.updateDetails(formData);
      if (response.success) {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        await fetchProfile();
        await refreshUser?.();
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleSavePassword = async () => {
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setError('New passwords do not match');
        return;
      }

      if (passwordData.newPassword.length < 6) {
        setError('New password must be at least 6 characters long');
        return;
      }

      setSaving(true);
      setError(null);

      const response = await profileAPI.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      if (response.success) {
        setSuccess('Password updated successfully!');
        setIsChangingPassword(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, JPG, or PNG)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    try {
      setIsUploadingPhoto(true);
      setError(null);

      const formData = new FormData();
      formData.append('photo', file);

      const response = await profileAPI.updatePhoto(formData);
      if (response.success) {
        setSuccess('Profile photo updated successfully!');
        await fetchProfile();
        await refreshUser?.();
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to upload photo');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const getInitials = () => {
    if (!profile) return 'U';
    return (profile.firstName.charAt(0) + profile.lastName.charAt(0)).toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <AuthGuard>
        <DashboardLayout>
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-center items-center min-h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          </div>
        </DashboardLayout>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <DashboardLayout>
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">Profile Settings</h1>
            <p className="text-blue-100 text-lg mt-2">Manage your account information and settings</p>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="mb-6 bg-emerald-500/20 backdrop-blur-md rounded-2xl border border-emerald-300/20 p-6">
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="h-6 w-6 text-emerald-400" />
                <p className="text-emerald-100 font-medium">{success}</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-500/20 backdrop-blur-md rounded-2xl border border-red-300/20 p-6">
              <div className="flex items-center space-x-3">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />
                <p className="text-red-100 font-medium">{error}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Photo Section */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
                <h3 className="text-xl font-bold text-white mb-6 drop-shadow-sm">Profile Photo</h3>
                
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="h-32 w-32 rounded-full overflow-hidden shadow-lg border-4 border-white/20 mx-auto mb-6">
                      {profileImageUrl ? (
                        <img
                          src={profileImageUrl}
                          alt={`${profile?.firstName}'s profile`}
                          className="h-full w-full object-cover"
                          onError={() => setProfileImageUrl(null)}
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {getInitials()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <label className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-colors duration-200 shadow-lg">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        disabled={isUploadingPhoto}
                      />
                      {isUploadingPhoto ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <CameraIcon className="h-4 w-4" />
                      )}
                    </label>
                  </div>
                  
                  <p className="text-blue-100 text-sm">
                    Click the camera icon to upload a new photo
                  </p>
                  <p className="text-blue-200 text-xs mt-1">
                    Supports JPEG, JPG, PNG (max 5MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Information Section */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="px-8 py-6 border-b border-white/20 bg-white/5 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white drop-shadow-sm">Personal Information</h3>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center transition-colors duration-200 shadow-lg"
                    >
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Edit Profile
                    </button>
                  )}
                </div>

                <div className="p-8">
                  {isEditing ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-blue-100 mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-blue-100 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-blue-100 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-blue-100 mb-2">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-blue-100 mb-2">
                            Gender
                          </label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                          >
                            <option value="male" className="bg-gray-800">Male</option>
                            <option value="female" className="bg-gray-800">Female</option>
                            <option value="other" className="bg-gray-800">Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-blue-100 mb-2">
                          Address
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm resize-none"
                          placeholder="Enter your full address"
                        />
                      </div>

                      <div className="flex space-x-4 pt-4">
                        <button
                          onClick={handleSaveProfile}
                          disabled={saving}
                          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-colors duration-200 shadow-lg"
                        >
                          {saving ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <CheckIcon className="h-4 w-4 mr-2" />
                              Save Changes
                            </>
                          )}
                        </button>
                        
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setError(null);
                            // Reset form data
                            if (profile) {
                              setFormData({
                                firstName: profile.firstName,
                                lastName: profile.lastName,
                                phoneNumber: profile.phoneNumber,
                                address: profile.address || '',
                                dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '',
                                gender: profile.gender
                              });
                            }
                          }}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-colors duration-200 shadow-lg"
                        >
                          <XMarkIcon className="h-4 w-4 mr-2" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-blue-200 mb-1">First Name</label>
                          <p className="text-lg text-white font-medium">{profile?.firstName}</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-blue-200 mb-1">Last Name</label>
                          <p className="text-lg text-white font-medium">{profile?.lastName}</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-blue-200 mb-1">Email</label>
                          <p className="text-lg text-white font-medium flex items-center space-x-2">
                            <span>{profile?.email}</span>
                            {profile?.isEmailVerified && (
                              <CheckCircleIcon className="h-5 w-5 text-emerald-400" title="Email verified" />
                            )}
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-blue-200 mb-1">NIC Number</label>
                          <p className="text-lg text-white font-medium">{profile?.nicNumber}</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-blue-200 mb-1">Phone Number</label>
                          <p className="text-lg text-white font-medium">{profile?.phoneNumber}</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-blue-200 mb-1">Date of Birth</label>
                          <p className="text-lg text-white font-medium">
                            {profile?.dateOfBirth ? formatDate(profile.dateOfBirth) : 'Not provided'}
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-blue-200 mb-1">Gender</label>
                          <p className="text-lg text-white font-medium capitalize">{profile?.gender}</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-blue-200 mb-1">Member Since</label>
                          <p className="text-lg text-white font-medium">
                            {profile?.createdAt ? formatDate(profile.createdAt) : 'Unknown'}
                          </p>
                        </div>
                      </div>

                      {profile?.address && (
                        <div>
                          <label className="block text-sm font-medium text-blue-200 mb-1">Address</label>
                          <p className="text-lg text-white font-medium">{profile.address}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Change Password Section */}
          <div className="mt-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="px-8 py-6 border-b border-white/20 bg-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white drop-shadow-sm">Security Settings</h3>
                  <p className="text-blue-100 text-sm mt-1">Update your password to keep your account secure</p>
                </div>
                {!isChangingPassword && (
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center transition-colors duration-200 shadow-lg"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Change Password
                  </button>
                )}
              </div>

              {isChangingPassword && (
                <div className="p-8">
                  <div className="space-y-6 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-blue-100 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.current ? "text" : "password"}
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm pr-12"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white"
                        >
                          {showPasswords.current ? (
                            <EyeSlashIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-100 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.new ? "text" : "password"}
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm pr-12"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white"
                        >
                          {showPasswords.new ? (
                            <EyeSlashIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-100 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.confirm ? "text" : "password"}
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm pr-12"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white"
                        >
                          {showPasswords.confirm ? (
                            <EyeSlashIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex space-x-4 pt-4">
                      <button
                        onClick={handleSavePassword}
                        disabled={saving}
                        className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-colors duration-200 shadow-lg"
                      >
                        {saving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <CheckIcon className="h-4 w-4 mr-2" />
                            Update Password
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => {
                          setIsChangingPassword(false);
                          setError(null);
                          setPasswordData({
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                          });
                        }}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-colors duration-200 shadow-lg"
                      >
                        <XMarkIcon className="h-4 w-4 mr-2" />
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}
