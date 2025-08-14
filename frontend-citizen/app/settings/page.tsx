'use client'

import { useState } from 'react'
import { 
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  LanguageIcon,
  BellIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  PencilIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from '@/components/DashboardLayout'

export default function AccountSettingsPage() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Ms. Kumari Perera',
    email: 'kumari.perera@email.com',
    phoneNumber: '+94 77 123 4567',
    address: '123 Galle Road, Colombo 03, Sri Lanka'
  })

  const [preferences, setPreferences] = useState({
    language: 'english',
    emailNotifications: true,
    smsNotifications: true
  })

  const [isEditing, setIsEditing] = useState(false)
  const [tempPersonalInfo, setTempPersonalInfo] = useState(personalInfo)

  const handleSaveChanges = () => {
    setPersonalInfo(tempPersonalInfo)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setTempPersonalInfo(personalInfo)
    setIsEditing(false)
  }

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Account Settings</h1>
          <p className="text-xl text-slate-700">Manage your personal information and preferences</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Personal Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg"
                >
                  <PencilIcon className="h-5 w-5 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-lg font-semibold text-slate-900 mb-3">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempPersonalInfo.fullName}
                    onChange={(e) => setTempPersonalInfo(prev => ({ ...prev, fullName: e.target.value }))}
                    className="block w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                  />
                ) : (
                  <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-300">
                    <div className="flex items-center space-x-3">
                      <UserCircleIcon className="h-6 w-6 text-slate-600" />
                      <span className="text-lg text-slate-900 font-medium">{personalInfo.fullName}</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-lg font-semibold text-slate-900 mb-3">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={tempPersonalInfo.email}
                    onChange={(e) => setTempPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="block w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                  />
                ) : (
                  <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-300">
                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="h-6 w-6 text-slate-600" />
                      <span className="text-lg text-slate-900 font-medium">{personalInfo.email}</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-lg font-semibold text-slate-900 mb-3">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={tempPersonalInfo.phoneNumber}
                    onChange={(e) => setTempPersonalInfo(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    className="block w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                  />
                ) : (
                  <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-300">
                    <div className="flex items-center space-x-3">
                      <PhoneIcon className="h-6 w-6 text-slate-600" />
                      <span className="text-lg text-slate-900 font-medium">{personalInfo.phoneNumber}</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-lg font-semibold text-slate-900 mb-3">
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    value={tempPersonalInfo.address}
                    onChange={(e) => setTempPersonalInfo(prev => ({ ...prev, address: e.target.value }))}
                    rows={3}
                    className="block w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                  />
                ) : (
                  <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-300">
                    <div className="flex items-start space-x-3">
                      <MapPinIcon className="h-6 w-6 text-slate-600 mt-1" />
                      <span className="text-lg text-slate-900 font-medium">{personalInfo.address}</span>
                    </div>
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="flex space-x-4 pt-6 border-t border-slate-200">
                  <button
                    onClick={handleSaveChanges}
                    className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-emerald-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-emerald-50">
              <h2 className="text-2xl font-bold text-slate-900">Preferences</h2>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-lg font-semibold text-slate-900 mb-3">
                  Language
                </label>
                <select
                  value={preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="block w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm"
                >
                  <option value="english">English</option>
                  <option value="sinhala">සිංහල</option>
                  <option value="tamil">தமிழ்</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-300">
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="h-6 w-6 text-slate-600" />
                  <div>
                    <div className="text-lg font-semibold text-slate-900">Email Notifications</div>
                    <div className="text-sm text-slate-600">Receive notifications via email</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.emailNotifications}
                    onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-300">
                <div className="flex items-center space-x-3">
                  <DevicePhoneMobileIcon className="h-6 w-6 text-slate-600" />
                  <div>
                    <div className="text-lg font-semibold text-slate-900">SMS Notifications</div>
                    <div className="text-sm text-slate-600">Receive notifications via SMS</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.smsNotifications}
                    onChange={(e) => handlePreferenceChange('smsNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-red-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-red-50">
              <h2 className="text-2xl font-bold text-slate-900">Security</h2>
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ShieldCheckIcon className="h-8 w-8 text-red-600" />
                  <div>
                    <div className="text-lg font-semibold text-slate-900">Change Password</div>
                    <div className="text-sm text-slate-600">Update your account password</div>
                  </div>
                </div>
                <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg">
                  Change
                </button>
              </div>
            </div>
          </div>

          {/* Save All Changes Button */}
          <div className="text-center">
            <button className="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-xl transition-colors duration-200 shadow-xl">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
