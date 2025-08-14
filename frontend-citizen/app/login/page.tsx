'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    usernameOrNationalId: '',
    password: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    if (!formData.usernameOrNationalId.trim()) {
      newErrors.usernameOrNationalId = 'Username or National ID is required'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      try {
        console.log('Login submitted:', formData)
        // Handle login logic here
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      } catch (error) {
        console.error('Login error:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleCancel = () => {
    // Navigate back or clear form
    window.history.back()
  }

  const handleForgotPassword = () => {
    // Handle forgot password logic
    console.log('Forgot password clicked')
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
              <Link href="/register" className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:from-secondary-600 hover:to-secondary-700 hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-xs xl:text-sm">Register</Link>
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

      {/* Login Form */}
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
        
        {/* Login Content */}
        <div className="relative z-10 w-full max-w-md mx-auto my-4">
          <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-6">
            
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-xl sm:text-2xl font-heading font-bold bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent mb-2">
                Login to Your Account
              </h1>
              <p className="text-neutral-600 text-sm">
                Access LocalGov services
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Username or National ID */}
              <div>
                <label htmlFor="usernameOrNationalId" className="block text-sm font-medium text-neutral-700 mb-1">
                  Username or National ID
                </label>
                <input
                  type="text"
                  id="usernameOrNationalId"
                  name="usernameOrNationalId"
                  value={formData.usernameOrNationalId}
                  onChange={handleInputChange}
                  placeholder="Enter your username or National ID"
                  className={`w-full px-3 py-2 bg-primary-900/90 border ${errors.usernameOrNationalId ? 'border-red-500' : 'border-primary-700'} rounded-lg text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200 text-sm`}
                />
                {errors.usernameOrNationalId && <p className="text-red-500 text-xs mt-1">{errors.usernameOrNationalId}</p>}
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
                  placeholder="Enter your password"
                  className={`w-full px-3 py-2 bg-primary-900/90 border ${errors.password ? 'border-red-500' : 'border-primary-700'} rounded-lg text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200 text-sm`}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Forgot Password Link */}
              <div className="text-left">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold px-5 py-2.5 rounded-lg shadow-xl hover:from-primary-700 hover:to-primary-800 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:flex-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gradient-to-r from-neutral-500 to-neutral-600 text-white font-bold px-5 py-2.5 rounded-lg shadow-xl hover:from-neutral-600 hover:to-neutral-700 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:flex-1 text-sm"
                >
                  Cancel
                </button>
              </div>

              {/* Register Link */}
              <div className="text-center pt-3 border-t border-neutral-200">
                <p className="text-sm text-neutral-600">
                  Don't have an account?{' '}
                  <Link href="/register" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
                    Register here
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
