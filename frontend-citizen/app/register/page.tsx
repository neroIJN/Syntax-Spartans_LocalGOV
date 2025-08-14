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
    confirmPassword: ''
  })

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
      <nav className="bg-gradient-to-r from-primary-800 to-primary-700 shadow-xl border-b border-primary-900">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
              <span className="text-xl sm:text-2xl text-secondary-400 font-bold">🏛️</span>
              <span className="font-heading text-sm sm:text-lg lg:text-xl font-bold tracking-wide text-white drop-shadow-md">
                <span className="hidden sm:inline">LocalGov</span>
                <span className="sm:hidden">LocalGov</span>
              </span>
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              <Link href="/" className="text-white hover:text-secondary-300 font-medium transition-colors text-sm xl:text-base px-3 py-2 rounded-lg hover:bg-primary-600">Home</Link>
              <Link href="/services" className="text-white hover:text-secondary-300 font-medium transition-colors text-sm xl:text-base px-3 py-2 rounded-lg hover:bg-primary-600">Services</Link>
              <Link href="/contact" className="text-white hover:text-secondary-300 font-medium transition-colors text-sm xl:text-base px-3 py-2 rounded-lg hover:bg-primary-600">Contact</Link>
              <Link href="/about" className="text-white hover:text-secondary-300 font-medium transition-colors text-sm xl:text-base px-3 py-2 rounded-lg hover:bg-primary-600">About</Link>
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">?</span>
              </div>
              <Link href="/login" className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:from-secondary-600 hover:to-secondary-700 hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-xs xl:text-sm">Login</Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button className="text-white hover:text-secondary-300 p-2 rounded-lg focus:ring-2 focus:ring-secondary-500 hover:bg-primary-600 transition-all duration-200">
                <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Registration Form */}
      <main className="relative min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-4">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url('/government-building.svg')`
          }}
        />
        
        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-primary-800/30" />
        
        {/* Registration Content */}
        <div className="relative z-10 w-full max-w-md mx-auto my-4">
          <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-6">
            
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-xl sm:text-2xl font-heading font-bold bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent mb-2">
                Create Your Account
              </h1>
              <p className="text-neutral-600 text-sm">
                Join LocalGov to book government appointments
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={`w-full px-3 py-2 bg-primary-900/90 border ${errors.fullName ? 'border-red-500' : 'border-primary-700'} rounded-lg text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200 text-sm`}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              {/* Name with Initials */}
              <div>
                <label htmlFor="nameWithInitials" className="block text-sm font-medium text-neutral-700 mb-1">
                  Name with Initials
                </label>
                <input
                  type="text"
                  id="nameWithInitials"
                  name="nameWithInitials"
                  value={formData.nameWithInitials}
                  onChange={handleInputChange}
                  placeholder="e.g., S.M.K. Silva"
                  className={`w-full px-3 py-2 bg-primary-900/90 border ${errors.nameWithInitials ? 'border-red-500' : 'border-primary-700'} rounded-lg text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200 text-sm`}
                />
                {errors.nameWithInitials && <p className="text-red-500 text-xs mt-1">{errors.nameWithInitials}</p>}
              </div>

              {/* National ID */}
              <div>
                <label htmlFor="nationalId" className="block text-sm font-medium text-neutral-700 mb-1">
                  National ID
                </label>
                <input
                  type="text"
                  id="nationalId"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleInputChange}
                  placeholder="Enter your National ID"
                  className={`w-full px-3 py-2 bg-primary-900/90 border ${errors.nationalId ? 'border-red-500' : 'border-primary-700'} rounded-lg text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200 text-sm`}
                />
                {errors.nationalId && <p className="text-red-500 text-xs mt-1">{errors.nationalId}</p>}
              </div>

              {/* Contact Number */}
              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-neutral-700 mb-1">
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your contact number"
                  className={`w-full px-3 py-2 bg-primary-900/90 border ${errors.contactNumber ? 'border-red-500' : 'border-primary-700'} rounded-lg text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200 text-sm`}
                />
                {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  rows={2}
                  className={`w-full px-3 py-2 bg-primary-900/90 border ${errors.address ? 'border-red-500' : 'border-primary-700'} rounded-lg text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200 resize-none text-sm`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  className={`w-full px-3 py-2 bg-primary-900/90 border ${errors.password ? 'border-red-500' : 'border-primary-700'} rounded-lg text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200 text-sm`}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className={`w-full px-3 py-2 bg-primary-900/90 border ${errors.confirmPassword ? 'border-red-500' : 'border-primary-700'} rounded-lg text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200 text-sm`}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-bold px-5 py-2.5 rounded-lg shadow-xl hover:from-secondary-600 hover:to-secondary-700 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:flex-1 text-sm"
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gradient-to-r from-neutral-500 to-neutral-600 text-white font-bold px-5 py-2.5 rounded-lg shadow-xl hover:from-neutral-600 hover:to-neutral-700 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:flex-1 text-sm"
                >
                  Cancel
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center pt-3 border-t border-neutral-200">
                <p className="text-sm text-neutral-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
