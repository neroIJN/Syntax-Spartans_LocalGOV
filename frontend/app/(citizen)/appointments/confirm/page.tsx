'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  CheckCircleIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  HashtagIcon,
  DocumentTextIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CreditCardIcon,
  BanknotesIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from '../../../../components/DashboardLayout'
import { getServiceById } from '../../../../lib/services'

function AppointmentConfirmedContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showCalendarOptions, setShowCalendarOptions] = useState(false)
  const [serviceData, setServiceData] = useState<any>(null)

  // Get URL parameters
  const serviceId = searchParams.get('serviceId')
  const appointmentDate = searchParams.get('date')
  const appointmentTime = searchParams.get('time')
  const appointmentId = searchParams.get('appointmentId')
  const paymentStatus = searchParams.get('paymentStatus')
  const paidAmount = searchParams.get('amount')

  useEffect(() => {
    if (serviceId) {
      const service = getServiceById(serviceId)
      setServiceData(service)
    }
  }, [serviceId])

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Date not specified'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // Mock appointment data - will be replaced with actual data
  const appointmentData = {
    id: appointmentId || 'APT-' + Date.now(),
    service: serviceData?.name || 'Government Service',
    date: formatDate(appointmentDate || ''),
    time: appointmentTime || '10:00 AM',
    location: serviceData?.department || 'Government Office',
    reference: appointmentId || 'REF-' + Date.now().toString().slice(-6),
    isPaid: paymentStatus === 'success',
    amount: paidAmount ? parseFloat(paidAmount) : 0,
    isFree: serviceData?.fee === 0
  }

  const handleAddToCalendar = () => {
    // Create calendar event data
    const eventTitle = `Government Appointment - ${appointmentData.service}`
    const eventDate = new Date('2024-10-26T10:00:00').toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const eventEndDate = new Date('2024-10-26T11:00:00').toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    
    // Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${eventDate}/${eventEndDate}&details=${encodeURIComponent(`Appointment at ${appointmentData.location}. Reference: ${appointmentData.reference}`)}&location=${encodeURIComponent(appointmentData.location)}`
    
    window.open(googleCalendarUrl, '_blank')
  }

  const handleViewDetails = () => {
    router.push('/appointments')
  }

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 scroll-container fade-in">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12 slide-in-up">
            <div className="w-24 h-24 bg-green-500/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border border-green-400/30">
              <CheckCircleIcon className="h-16 w-16 text-green-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Appointment {appointmentData.isPaid ? 'Booked & Paid' : appointmentData.isFree ? 'Booked Successfully' : 'Confirmed'}!
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Your appointment has been successfully scheduled. 
              {appointmentData.isPaid && ` Payment of Rs. ${appointmentData.amount.toLocaleString()} has been processed.`}
              {appointmentData.isFree && ' No payment was required for this service.'}
            </p>
          </div>

          {/* Payment Status (if applicable) */}
          {(appointmentData.isPaid || appointmentData.isFree) && (
            <div className={`mb-8 slide-in-right bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 ${
              appointmentData.isPaid ? 'border-green-400/30 bg-green-500/10' : 'border-blue-400/30 bg-blue-500/10'
            }`}>
              <div className="flex items-center gap-4">
                {appointmentData.isPaid ? (
                  <CreditCardIcon className="h-8 w-8 text-green-400" />
                ) : (
                  <CheckCircleIcon className="h-8 w-8 text-blue-400" />
                )}
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {appointmentData.isPaid ? 'Payment Successful' : 'Free Service Booked'}
                  </h3>
                  <p className="text-blue-100">
                    {appointmentData.isPaid 
                      ? `Amount paid: Rs. ${appointmentData.amount.toLocaleString()} • Transaction completed` 
                      : 'No payment required for this government service'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Appointment Details Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden mb-8 slide-in-left hover-lift transition-smooth">
            <div className="px-8 py-6 border-b border-white/20 bg-white/5">
              <h2 className="text-2xl font-bold text-white drop-shadow-sm">Appointment Details</h2>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-blue-400/30">
                      <DocumentTextIcon className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <span className="block text-lg font-semibold text-blue-200 mb-1">Service</span>
                      <span className="text-xl text-white font-medium">{appointmentData.service}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-green-400/30">
                      <CalendarDaysIcon className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <span className="block text-lg font-semibold text-blue-200 mb-1">Date</span>
                      <span className="text-xl text-white font-medium">{appointmentData.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-purple-400/30">
                      <ClockIcon className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <span className="block text-lg font-semibold text-blue-200 mb-1">Time</span>
                      <span className="text-xl text-white font-medium">{appointmentData.time}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-red-400/30">
                      <MapPinIcon className="h-6 w-6 text-red-400" />
                    </div>
                    <div>
                      <span className="block text-lg font-semibold text-blue-200 mb-1">Location</span>
                      <span className="text-xl text-white font-medium">{appointmentData.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-indigo-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-indigo-400/30">
                      <HashtagIcon className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div>
                      <span className="block text-lg font-semibold text-blue-200 mb-1">Reference Number</span>
                      <span className="text-xl text-white font-mono bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/20">
                        {appointmentData.reference}
                      </span>
                    </div>
                  </div>
                  
                  {serviceData?.requiredDocuments && (
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-orange-400/30">
                        <DocumentTextIcon className="h-6 w-6 text-orange-400" />
                      </div>
                      <div>
                        <span className="block text-lg font-semibold text-blue-200 mb-1">Required Documents</span>
                        <div className="text-sm text-blue-100">
                          {serviceData.requiredDocuments.map((doc: string, index: number) => (
                            <div key={index} className="flex items-center gap-2 mt-1">
                              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                              {doc}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8 slide-in-up">
            <button
              onClick={handleAddToCalendar}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-lg font-semibold rounded-xl transition-smooth shadow-lg hover:shadow-xl hover-lift min-w-[200px]"
            >
              <CalendarDaysIcon className="h-6 w-6 mr-3" />
              Add to Calendar
            </button>
            
            <button
              onClick={handleViewDetails}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-semibold rounded-xl transition-smooth shadow-lg hover:shadow-xl hover-lift min-w-[200px]"
            >
              <ArrowRightIcon className="h-6 w-6 mr-3" />
              View All Appointments
            </button>
          </div>

          {/* Important Information */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8 slide-in-up">
            <div className="flex items-start gap-3">
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xl font-bold text-white mb-4 drop-shadow-sm">Important Information</h3>
                <div className="space-y-3 text-blue-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Please arrive 15 minutes before your scheduled appointment time</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Bring all required documents and your reference number</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>You will receive a reminder notification 24 hours before your appointment</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>If you need to reschedule, please do so at least 24 hours in advance</p>
                  </div>
                  {appointmentData.isPaid && (
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Keep your payment receipt for any refund requests</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Office Location */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden slide-in-up">
            <div className="px-8 py-6 border-b border-white/20 bg-white/5">
              <h3 className="text-2xl font-bold text-white drop-shadow-sm">Office Location</h3>
            </div>
            <div className="p-8">
              <div className="relative bg-gradient-to-b from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-8 min-h-64 flex items-center justify-center border border-white/10">
                <div className="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6 border border-white/20">
                  <div className="text-center">
                    <MapPinIcon className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-white mb-2">{appointmentData.location}</h4>
                    <p className="text-blue-200 mb-4">
                      Government Service Center
                    </p>
                    <div className="mt-4">
                      <button className="text-blue-400 hover:text-blue-300 font-semibold transition-smooth">
                        View on Map →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="text-center mt-8 slide-in-up">
            <p className="text-blue-200 mb-4">
              Need help with your appointment?
            </p>
            <button className="text-blue-400 hover:text-blue-300 font-semibold text-lg transition-smooth">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default function AppointmentConfirmedPage() {
  return (
    <Suspense fallback={
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading...</p>
          </div>
        </div>
      </DashboardLayout>
    }>
      <AppointmentConfirmedContent />
    </Suspense>
  )
}
