'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  CheckCircleIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  HashtagIcon,
  DocumentTextIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from '@/components/DashboardLayout'

export default function AppointmentConfirmedPage() {
  const router = useRouter()
  const [showCalendarOptions, setShowCalendarOptions] = useState(false)

  // Mock appointment data
  const appointmentData = {
    service: 'Grama Niladhari Office',
    date: 'October 26, 2024',
    time: '10:00 AM',
    location: 'Colombo 07',
    reference: 'AB123456789'
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
      <div className="px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <CheckCircleIcon className="h-16 w-16 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Appointment Confirmed!</h1>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto">
              Your appointment has been successfully scheduled. Please find the details below.
            </p>
          </div>

          {/* Appointment Details Card */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-emerald-200 overflow-hidden mb-8">
            <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-green-50">
              <h2 className="text-2xl font-bold text-slate-900">Appointment Details</h2>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-lg font-semibold text-slate-700 mb-1">Service</span>
                      <span className="text-xl text-slate-900 font-medium">{appointmentData.service}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <CalendarDaysIcon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <span className="block text-lg font-semibold text-slate-700 mb-1">Date</span>
                      <span className="text-xl text-slate-900 font-medium">{appointmentData.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <ClockIcon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <span className="block text-lg font-semibold text-slate-700 mb-1">Time</span>
                      <span className="text-xl text-slate-900 font-medium">{appointmentData.time}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <MapPinIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <span className="block text-lg font-semibold text-slate-700 mb-1">Location</span>
                      <span className="text-xl text-slate-900 font-medium">{appointmentData.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <HashtagIcon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <span className="block text-lg font-semibold text-slate-700 mb-1">Reference Number</span>
                      <span className="text-xl text-slate-900 font-mono bg-slate-100 px-3 py-1 rounded-lg">
                        {appointmentData.reference}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <button
              onClick={handleAddToCalendar}
              className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold rounded-xl transition-colors duration-200 shadow-lg min-w-[200px]"
            >
              <CalendarDaysIcon className="h-6 w-6 mr-3" />
              Add to Calendar
            </button>
            
            <button
              onClick={handleViewDetails}
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition-colors duration-200 shadow-lg min-w-[200px]"
            >
              <ArrowRightIcon className="h-6 w-6 mr-3" />
              View Appointment Details
            </button>
          </div>

          {/* Important Information */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-amber-900 mb-6">Important Information</h3>
            <div className="space-y-4 text-amber-800">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                <p>Please arrive 15 minutes before your scheduled appointment time</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                <p>Bring all required documents and your reference number</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                <p>You will receive a reminder notification 24 hours before your appointment</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                <p>If you need to reschedule, please do so at least 24 hours in advance</p>
              </div>
            </div>
          </div>

          {/* Government Building Image */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
              <h3 className="text-2xl font-bold text-slate-900">Office Location</h3>
            </div>
            <div className="p-8">
              <div className="relative bg-gradient-to-b from-sky-100 to-blue-200 rounded-xl p-8 min-h-64 flex items-center justify-center">
                {/* Placeholder for government building image */}
                <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
                  <div className="text-center">
                    <MapPinIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Government Office</h4>
                    <p className="text-slate-600">
                      Located in {appointmentData.location}
                    </p>
                    <div className="mt-4">
                      <button className="text-blue-600 hover:text-blue-700 font-semibold">
                        View on Map →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="text-center mt-8">
            <p className="text-slate-600 mb-4">
              Need help with your appointment?
            </p>
            <button className="text-blue-600 hover:text-blue-700 font-semibold text-lg">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
