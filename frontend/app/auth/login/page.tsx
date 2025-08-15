'use client'

import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import AuthGuard from '@/components/AuthGuard'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      console.log('Login submitted:', formData)
      
      // Call the backend API
      const response = await axios.post(
        'http://localhost:5000/api/auth/mysql/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000
        }
      )
      
      console.log('Login successful:', response.data)
      
      // Get the token and user data from the response
      const { token, user } = response.data;
      
      // Use the auth hook to login and store user data
      login(token, user);
      
      // Redirect to dashboard
      router.push('/dashboard')
      
    } catch (error: any) {
      console.error('Login error:', error)
      
      if (error.response?.data?.message) {
        setErrors({ submit: error.response.data.message })
      } else if (error.response?.status === 401) {
        setErrors({ submit: 'Invalid email or password' })
      } else if (error.response?.status === 404) {
        setErrors({ submit: 'Login service not available. Please check if the server is running.' })
      } else {
        setErrors({ submit: 'Login failed. Please try again.' })
      }
    } finally {
      setIsLoading(false)
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
    <AuthGuard requireAuth={false}>
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
                <Link href="/auth/register" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-4 py-1.5 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm">
                  Get Started
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

      {/* Login Form */}
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
        
        {/* Login Content */}
        <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8 py-20">
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
              
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 drop-shadow-lg">
                  Welcome Back
                </h1>
                <p className="text-blue-100 text-sm">
                  Sign in to access your LocalGov account
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
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
                    placeholder="Enter your email address"
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${errors.email ? 'border-red-400' : 'border-white/30'} rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm`}
                  />
                  {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
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
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border ${errors.password ? 'border-red-400' : 'border-white/30'} rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm`}
                  />
                  {errors.password && <p className="text-red-300 text-xs mt-1">{errors.password}</p>}
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-blue-300 hover:text-blue-200 text-sm font-medium transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="p-3 bg-red-500/20 border border-red-400 rounded-xl">
                    <p className="text-red-300 text-sm">{errors.submit}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-2xl hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 w-full sm:flex-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-3 rounded-xl border border-white/30 hover:bg-white/20 hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:flex-1 text-sm"
                  >
                    Cancel
                  </button>
                </div>

                {/* Register Link */}
                <div className="text-center pt-6 border-t border-white/20">
                  <p className="text-sm text-white/80">
                    Don't have an account?{' '}
                    <Link href="/auth/register" className="text-blue-300 hover:text-blue-200 font-medium transition-colors">
                      Create account here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      </>
    </AuthGuard>
  )
}
