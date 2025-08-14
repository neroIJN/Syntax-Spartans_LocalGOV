import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Navigation Header */}
      <nav className="bg-primary-600 text-white shadow-lg">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <div className="text-white text-xl">🏛️</div>
              <span className="font-bold text-lg">Appointment Scheduling System</span>
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-secondary-200 transition-colors">
                Home
              </Link>
              <Link href="/services" className="text-white hover:text-secondary-200 transition-colors">
                Services
              </Link>
              <Link href="/about" className="text-white hover:text-secondary-200 transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-white hover:text-secondary-200 transition-colors">
                Contact
              </Link>
              <Link href="/register" className="btn btn-secondary btn-sm">
                Register
              </Link>
              <Link href="/login" className="btn btn-outline btn-sm border-white text-white hover:bg-white hover:text-primary-600">
                Login
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-white hover:text-secondary-200">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative min-h-screen">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 51, 102, 0.7), rgba(0, 51, 102, 0.7)), url('/government-building.svg')`
          }}
        />
        
        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center text-white px-6 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to the Appointment Scheduling System
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Efficiently manage your appointments with Grama Niladhari and Divisional Secretariat services across Sri Lanka. Register or log in to get started.
            </p>
            
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/register" 
                className="btn btn-secondary btn-lg px-8 py-3 text-base font-semibold"
              >
                Register
              </Link>
              <Link 
                href="/login" 
                className="btn btn-outline btn-lg px-8 py-3 text-base font-semibold border-white text-white hover:bg-white hover:text-primary-600"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary-800 text-white py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-8">
              <Link href="/privacy" className="text-neutral-300 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-neutral-300 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link href="/help" className="text-neutral-300 hover:text-white text-sm">
                Help
              </Link>
            </div>
            <div className="text-sm text-neutral-300">
              © 2024 Appointment Scheduling System. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}