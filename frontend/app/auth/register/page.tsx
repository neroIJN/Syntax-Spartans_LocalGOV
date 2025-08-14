'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    nameWithInitials: '',
    nationalId: '',
    contactNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
    profilePhoto: null as File | null
  })

  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          profilePhoto: 'Please select a valid image file (JPEG, JPG, or PNG)'
        }))
        return
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB in bytes
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          profilePhoto: 'File size must be less than 5MB'
        }))
        return
      }

      // Clear any previous errors
      setErrors(prev => ({
        ...prev,
        profilePhoto: ''
      }))

      // Update form data
      setFormData(prev => ({
        ...prev,
        profilePhoto: file
      }))

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.nameWithInitials.trim()) {
      newErrors.nameWithInitials = 'Name with initials is required'
    }

    if (!formData.nationalId.trim()) {
      newErrors.nationalId = 'National ID is required'
    } else if (!/^\d{9}[vVxX]$/.test(formData.nationalId.trim())) {
      newErrors.nationalId = 'Invalid National ID format (e.g., 123456789V)'
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required'
    } else if (!/^0\d{9}$/.test(formData.contactNumber.trim())) {
      newErrors.contactNumber = 'Invalid contact number format (e.g., 0771234567)'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (!formData.profilePhoto) {
      newErrors.profilePhoto = 'Profile photo is required'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Form submitted:', formData)
      // Handle registration logic here
    }
  }

  const handleCancel = () => {
    // Navigate back or clear form
    window.history.back()
  }

  return (
    <>
      {/* Navigation Header */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs sm:text-sm">🏛️</span>
              </div>
              <span className="font-heading text-base sm:text-lg lg:text-xl font-bold tracking-wide text-white drop-shadow-lg">
                LocalGov
              </span>
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/" className="text-white/90 hover:text-white font-medium transition-colors text-sm px-3 py-1.5 rounded-lg hover:bg-white/10 backdrop-blur-sm">Home</Link>
              <Link href="/services" className="text-white/90 hover:text-white font-medium transition-colors text-sm px-3 py-1.5 rounded-lg hover:bg-white/10 backdrop-blur-sm">Services</Link>
              <Link href="/about" className="text-white/90 hover:text-white font-medium transition-colors text-sm px-3 py-1.5 rounded-lg hover:bg-white/10 backdrop-blur-sm">About</Link>
              <Link href="/contact" className="text-white/90 hover:text-white font-medium transition-colors text-sm px-3 py-1.5 rounded-lg hover:bg-white/10 backdrop-blur-sm">Contact</Link>
              <div className="flex items-center gap-2 ml-2">
                <Link href="/auth/login" className="text-white/90 hover:text-white font-medium transition-all duration-300 text-sm px-3 py-1.5 rounded-lg border border-white/30 hover:bg-white/10 backdrop-blur-sm">
                  Sign In
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button className="text-white/90 hover:text-white p-1.5 rounded-lg focus:ring-2 focus:ring-white/30 hover:bg-white/10 transition-all duration-200">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Registration Form */}
      <main className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/Manage.jpg')`
          }}
        />
        
        {/* Professional Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-900/75 to-slate-800/90" />
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:20px_20px]" />
        
        {/* Registration Content */}
        <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8 py-20">
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
              
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 drop-shadow-lg">
                  Create Your Account
                </h1>
                <p className="text-blue-100 text-sm">
                  Join LocalGov to access government services
                </p>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-white/90 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${errors.fullName ? 'border-red-400' : 'border-white/30'} rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm`}
                  />
                  {errors.fullName && <p className="text-red-300 text-xs mt-1">{errors.fullName}</p>}
                </div>

                {/* Name with Initials */}
                <div>
                  <label htmlFor="nameWithInitials" className="block text-sm font-medium text-white/90 mb-2">
                    Name with Initials
                  </label>
                  <input
                    type="text"
                    id="nameWithInitials"
                    name="nameWithInitials"
                    value={formData.nameWithInitials}
                    onChange={handleInputChange}
                    placeholder="e.g., S.M.K. Silva"
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${errors.nameWithInitials ? 'border-red-400' : 'border-white/30'} rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm`}
                  />
                  {errors.nameWithInitials && <p className="text-red-300 text-xs mt-1">{errors.nameWithInitials}</p>}
                </div>

                {/* National ID */}
                <div>
                  <label htmlFor="nationalId" className="block text-sm font-medium text-white/90 mb-2">
                    National ID
                  </label>
                  <input
                    type="text"
                    id="nationalId"
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleInputChange}
                    placeholder="Enter your National ID"
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${errors.nationalId ? 'border-red-400' : 'border-white/30'} rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm`}
                  />
                  {errors.nationalId && <p className="text-red-300 text-xs mt-1">{errors.nationalId}</p>}
                </div>

                {/* Contact Number */}
                <div>
                  <label htmlFor="contactNumber" className="block text-sm font-medium text-white/90 mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your contact number"
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${errors.contactNumber ? 'border-red-400' : 'border-white/30'} rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm`}
                  />
                  {errors.contactNumber && <p className="text-red-300 text-xs mt-1">{errors.contactNumber}</p>}
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-white/90 mb-2">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    rows={2}
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${errors.address ? 'border-red-400' : 'border-white/30'} rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none text-sm`}
                  />
                  {errors.address && <p className="text-red-300 text-xs mt-1">{errors.address}</p>}
                </div>

                {/* Profile Photo */}
                <div>
                  <label htmlFor="profilePhoto" className="block text-sm font-medium text-white/90 mb-2">
                    Profile Photo
                  </label>
                  <div className="flex flex-col space-y-3">
                    {/* Photo Preview */}
                    {photoPreview && (
                      <div className="flex justify-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-400 shadow-lg">
                          <img 
                            src={photoPreview} 
                            alt="Profile preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* File Input */}
                    <div className="relative">
                      <input
                        type="file"
                        id="profilePhoto"
                        name="profilePhoto"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                      <label 
                        htmlFor="profilePhoto"
                        className={`block w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${errors.profilePhoto ? 'border-red-400' : 'border-white/30'} rounded-xl text-white text-center cursor-pointer hover:bg-white/20 transition-all duration-200 text-sm`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          {formData.profilePhoto ? formData.profilePhoto.name : 'Choose profile photo (JPEG, PNG - Max 5MB)'}
                        </div>
                      </label>
                    </div>
                  </div>
                  {errors.profilePhoto && <p className="text-red-300 text-xs mt-1">{errors.profilePhoto}</p>}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password"
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${errors.password ? 'border-red-400' : 'border-white/30'} rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm`}
                  />
                  {errors.password && <p className="text-red-300 text-xs mt-1">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/90 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${errors.confirmPassword ? 'border-red-400' : 'border-white/30'} rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm`}
                  />
                  {errors.confirmPassword && <p className="text-red-300 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-2xl hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 w-full sm:flex-1 text-sm"
                  >
                    Create Account
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-3 rounded-xl border border-white/30 hover:bg-white/20 hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:flex-1 text-sm"
                  >
                    Cancel
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center pt-6 border-t border-white/20">
                  <p className="text-sm text-white/80">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="text-blue-300 hover:text-blue-200 font-medium transition-colors">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
