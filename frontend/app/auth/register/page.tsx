'use client'

import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    nicNumber: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    password: '',
    confirmPassword: ''
  })

  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          photo: 'Please select a valid image file (JPEG, PNG, or GIF)'
        }))
        return
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB in bytes
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          photo: 'File size must be less than 5MB'
        }))
        return
      }

      // Clear any previous errors
      setErrors(prev => ({
        ...prev,
        photo: ''
      }))

      // Update photo file
      setPhotoFile(file)

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

    // Required fields validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.nicNumber.trim()) {
      newErrors.nicNumber = 'NIC number is required'
    } else if (!/^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(formData.nicNumber.trim())) {
      newErrors.nicNumber = 'Invalid NIC format (e.g., 123456789V or 123456789012)'
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    } else if (!/^(\+94|0)[0-9]{9}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Invalid phone format (e.g., +94771234567 or 0771234567)'
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required'
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required'
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setErrors({})

    try {
      // Create FormData for multipart form submission
      const submitData = new FormData()
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'confirmPassword' && value) {
          submitData.append(key, value)
        }
      })
      
      // Append photo if selected
      if (photoFile) {
        submitData.append('photo', photoFile)
      }
      
      // Submit to backend
      const response = await axios.post(
        'http://localhost:5000/api/auth/mysql/register',
        submitData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 30000 // 30 second timeout for file upload
        }
      )
      
      console.log('Registration successful:', response.data)
      setSuccess(true)
      
      // Store the authentication token
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token)
      }
      
    } catch (error: any) {
      console.error('Registration error:', error)
      
      if (error.response?.data?.message) {
        setErrors({ submit: error.response.data.message })
      } else if (error.response?.data?.errors) {
        setErrors({ submit: Array.isArray(error.response.data.errors) ? error.response.data.errors.join(', ') : error.response.data.errors })
      } else {
        setErrors({ submit: 'Registration failed. Please try again.' })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    // Navigate back or clear form
    window.history.back()
  }

  // Success screen
  if (success) {
    return (
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
        
        <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 text-center">
              <div className="text-green-400 text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-white mb-4">Registration Successful!</h2>
              <p className="text-blue-100 mb-6">
                Your account has been created successfully. Please check your email for verification instructions.
              </p>
              <Link
                href="/auth/login"
                className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
              >
                Continue to Login
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
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
                
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-white/90 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                      className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${errors.firstName ? 'border-red-400' : 'border-white/30'} rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm`}
                    />
                    {errors.firstName && <p className="text-red-300 text-xs mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-white/90 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                      className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${errors.lastName ? 'border-red-400' : 'border-white/30'} rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm`}
                    />
                    {errors.lastName && <p className="text-red-300 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${errors.email ? 'border-red-400' : 'border-white/30'} rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm`}
                  />
                  {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* NIC Number */}
                <div>
                  <label htmlFor="nicNumber" className="block text-sm font-medium text-white/90 mb-2">
                    NIC Number
                  </label>
                  <input
                    type="text"
                    id="nicNumber"
                    name="nicNumber"
                    value={formData.nicNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., 123456789V or 123456789012"
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${errors.nicNumber ? 'border-red-400' : 'border-white/30'} rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm`}
                  />
                  {errors.nicNumber && <p className="text-red-300 text-xs mt-1">{errors.nicNumber}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-white/90 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., +94771234567"
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${errors.phoneNumber ? 'border-red-400' : 'border-white/30'} rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm`}
                  />
                  {errors.phoneNumber && <p className="text-red-300 text-xs mt-1">{errors.phoneNumber}</p>}
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-white/90 mb-2">
                    Address (Optional)
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

                {/* Date of Birth and Gender */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-white/90 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${errors.dateOfBirth ? 'border-red-400' : 'border-white/30'} rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm`}
                    />
                    {errors.dateOfBirth && <p className="text-red-300 text-xs mt-1">{errors.dateOfBirth}</p>}
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-white/90 mb-2">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${errors.gender ? 'border-red-400' : 'border-white/30'} rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm`}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-300 text-xs mt-1">{errors.gender}</p>}
                  </div>
                </div>

                {/* Profile Photo */}
                <div>
                  <label htmlFor="photo" className="block text-sm font-medium text-white/90 mb-2">
                    Profile Photo (Optional)
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
                        id="photo"
                        name="photo"
                        accept="image/jpeg,image/jpg,image/png,image/gif"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                      <label 
                        htmlFor="photo"
                        className={`block w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${errors.photo ? 'border-red-400' : 'border-white/30'} rounded-xl text-white text-center cursor-pointer hover:bg-white/20 transition-all duration-200 text-sm`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          {photoFile ? photoFile.name : 'Choose profile photo (JPEG, PNG, GIF - Max 5MB)'}
                        </div>
                      </label>
                    </div>
                  </div>
                  {errors.photo && <p className="text-red-300 text-xs mt-1">{errors.photo}</p>}
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

                {/* Submit Error */}
                {errors.submit && (
                  <div className="p-3 bg-red-500/20 border border-red-400 rounded-xl">
                    <p className="text-red-300 text-sm">{errors.submit}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`${
                      loading
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-500/25 transform hover:scale-105'
                    } text-white font-semibold px-8 py-3 rounded-xl shadow-2xl transition-all duration-300 w-full sm:flex-1 text-sm`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </span>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-3 rounded-xl border border-white/30 hover:bg-white/20 hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:flex-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
