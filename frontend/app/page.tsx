import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Navigation Header */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo and Brand */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs sm:text-sm">🏛️</span>
              </div>
              <span className="font-heading text-base sm:text-lg lg:text-xl font-bold tracking-wide text-white drop-shadow-lg">
                LocalGov
              </span>
            </div>
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

      {/* Hero Section */}
      <main className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/Manage.jpg')`
          }}
        />
        
        {/* Professional Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-slate-800/85" />
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:20px_20px]" />
        
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            {/* Main Heading */}
            <div className="mb-8">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight leading-none">
                <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent drop-shadow-2xl">
                  LocalGov
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-8"></div>
            </div>
            
            {/* Subtitle */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-blue-100 mb-8 leading-relaxed max-w-4xl mx-auto">
              Streamline Your Government Services
              <span className="block text-lg sm:text-xl md:text-2xl text-white/80 mt-2 font-normal">
                Professional appointment management for Sri Lankan citizens
              </span>
            </h2>
            
            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
              Experience seamless appointment booking with Grama Niladhari and Divisional Secretariat services. 
              Our modern platform ensures efficient, transparent, and accessible government service delivery.
            </p>
            
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/auth/register" 
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-10 py-4 rounded-xl text-lg shadow-2xl hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto min-w-[200px] border border-blue-500/30"
              >
                <span className="flex items-center justify-center gap-2">
                  Start Your Journey
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link 
                href="/auth/login" 
                className="group bg-white/10 backdrop-blur-sm text-white font-semibold px-10 py-4 rounded-xl text-lg shadow-xl border border-white/30 hover:bg-white/20 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto min-w-[200px]"
              >
                <span className="flex items-center justify-center gap-2">
                  Sign In
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                  </svg>
                </span>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-16 pt-8 border-t border-white/20">
              <p className="text-white/70 text-sm mb-4">Trusted by thousands of Sri Lankan citizens</p>
              <div className="flex flex-wrap justify-center items-center gap-8 text-white/60">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Secure & Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Government Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Why Choose LocalGov?
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Experience the future of government service delivery with our cutting-edge platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-slate-800 mb-3">Fast & Efficient</h4>
              <p className="text-slate-600">Book appointments in minutes with our streamlined process</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-slate-800 mb-3">Secure & Reliable</h4>
              <p className="text-slate-600">Government-grade security for all your personal information</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-slate-800 mb-3">Always Available</h4>
              <p className="text-slate-600">Access services 24/7 from anywhere in Sri Lanka</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 border-t border-slate-700">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">🏛️</span>
                </div>
                <span className="text-2xl font-bold">LocalGov</span>
              </div>
              <p className="text-slate-300 mb-4 max-w-md leading-relaxed">
                Transforming government service delivery through innovative technology solutions for the people of Sri Lanka.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
              <div className="space-y-2">
                <Link href="/services" className="block text-slate-300 hover:text-white transition-colors duration-300">Services</Link>
                <Link href="/about" className="block text-slate-300 hover:text-white transition-colors duration-300">About Us</Link>
                <Link href="/help" className="block text-slate-300 hover:text-white transition-colors duration-300">Help Center</Link>
                <Link href="/contact" className="block text-slate-300 hover:text-white transition-colors duration-300">Contact</Link>
              </div>
            </div>
            
            {/* Legal */}
            <div>
              <h5 className="text-lg font-semibold mb-4">Legal</h5>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-slate-300 hover:text-white transition-colors duration-300">Privacy Policy</Link>
                <Link href="/terms" className="block text-slate-300 hover:text-white transition-colors duration-300">Terms of Service</Link>
                <Link href="/cookies" className="block text-slate-300 hover:text-white transition-colors duration-300">Cookie Policy</Link>
                <Link href="/accessibility" className="block text-slate-300 hover:text-white transition-colors duration-300">Accessibility</Link>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
            <div>
              © 2024 LocalGov. All rights reserved. Government of Sri Lanka.
            </div>
            <div className="mt-4 md:mt-0">
              Built with ❤️ for the people of Sri Lanka
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}