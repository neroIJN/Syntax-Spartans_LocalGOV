import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Navigation Header */}
      <nav className="bg-gradient-to-r from-primary-800 to-primary-700 shadow-xl border-b border-primary-900">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo and Brand */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl text-secondary-400 font-bold">🏛️</span>
              <span className="font-heading text-sm sm:text-lg lg:text-xl font-bold tracking-wide text-white drop-shadow-md">
                <span className="hidden sm:inline">Appointment Scheduling System</span>
                <span className="sm:hidden">Appointments</span>
              </span>
            </div>
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              <Link href="/" className="text-white hover:text-secondary-300 font-medium transition-colors text-sm xl:text-base px-3 py-2 rounded-lg hover:bg-primary-600">Home</Link>
              <Link href="/services" className="text-white hover:text-secondary-300 font-medium transition-colors text-sm xl:text-base px-3 py-2 rounded-lg hover:bg-primary-600">Services</Link>
              <Link href="/about" className="text-white hover:text-secondary-300 font-medium transition-colors text-sm xl:text-base px-3 py-2 rounded-lg hover:bg-primary-600">About Us</Link>
              <Link href="/contact" className="text-white hover:text-secondary-300 font-medium transition-colors text-sm xl:text-base px-3 py-2 rounded-lg hover:bg-primary-600">Contact</Link>
              <Link href="/register" className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:from-secondary-600 hover:to-secondary-700 hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-xs xl:text-sm">Register</Link>
              <Link href="/login" className="border-2 border-secondary-500 text-secondary-400 bg-transparent font-semibold px-4 py-2 rounded-lg hover:bg-secondary-500 hover:text-white hover:border-secondary-600 transition-all duration-200 text-xs xl:text-sm shadow-lg">Login</Link>
            </div>
            {/* Mobile/Tablet menu button */}
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

      {/* Hero Section */}
      <main className="relative min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('/government-building.svg')`
          }}
        />
        
        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-primary-800/30" />
        
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] w-full max-w-7xl mx-auto">
          <div className="mx-auto w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-extrabold bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-8 text-center tracking-tight leading-tight">
              Welcome to the Appointment Scheduling System
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-700 mb-6 sm:mb-8 md:mb-10 text-center max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl leading-relaxed">
              Efficiently manage your appointments with Grama Niladhari and Divisional Secretariat services across Sri Lanka.
              <br className="hidden sm:inline" /> 
              <span className="block sm:inline mt-2 sm:mt-0"> Register or log in to get started.</span>
            </p>
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-4 w-full sm:w-auto">
              <Link 
                href="/register" 
                className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-bold px-8 sm:px-10 py-3 sm:py-4 rounded-xl text-sm sm:text-base shadow-xl hover:from-secondary-600 hover:to-secondary-700 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                Register Now
              </Link>
              <Link 
                href="/login" 
                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold px-8 sm:px-10 py-3 sm:py-4 rounded-xl text-sm sm:text-base shadow-xl hover:from-primary-700 hover:to-primary-800 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary-900 to-primary-800 text-neutral-100 py-6 sm:py-8 border-t border-primary-700">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8">
              <Link href="/privacy" className="hover:text-secondary-400 text-xs sm:text-sm transition-colors font-medium">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-secondary-400 text-xs sm:text-sm transition-colors font-medium">Terms of Service</Link>
              <Link href="/help" className="hover:text-secondary-400 text-xs sm:text-sm transition-colors font-medium">Help</Link>
            </div>
            <div className="text-xs sm:text-sm text-neutral-300">
              © 2024 Appointment Scheduling System. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}