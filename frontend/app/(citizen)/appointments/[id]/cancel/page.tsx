'use client'

import { useParams, useRouter } from 'next/navigation'
import { 
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from '@/components/DashboardLayout'

export default function CancelAppointmentPage() {
  const params = useParams()
  const router = useRouter()

  // Mock appointment data
  const appointment = {
    id: params.id,
    service: 'National Identity Card Application',
    date: 'July 20, 2024',
    time: '10:00 AM',
    location: 'Divisional Secretariat, Colombo',
    reference: 'NIC001234567'
  }

  const handleKeepAppointment = () => {
    router.push('/appointments')
  }

  const handleCancelAppointment = () => {
    // Here you would typically call an API to cancel the appointment
    alert('Appointment cancelled successfully!')
    router.push('/appointments')
  }

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-8"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Appointments
          </button>

          {/* Warning Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ExclamationTriangleIcon className="h-12 w-12 text-red-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Are you sure you want to cancel your appointment?
            </h1>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto">
              Cancelling your appointment will free up the slot for others. Please confirm your decision.
            </p>
          </div>

          {/* Appointment Details */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-red-100 overflow-hidden mb-8">
            <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-red-50 to-slate-50">
              <h2 className="text-2xl font-bold text-slate-900">Appointment Details</h2>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="space-y-6">
                    <div>
                      <span className="block text-lg font-semibold text-slate-700 mb-2">Service</span>
                      <span className="text-xl text-slate-900">{appointment.service}</span>
                    </div>
                    
                    <div>
                      <span className="block text-lg font-semibold text-slate-700 mb-2">Date</span>
                      <div className="flex items-center space-x-3">
                        <CalendarDaysIcon className="h-6 w-6 text-blue-500" />
                        <span className="text-xl text-slate-900">{appointment.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="space-y-6">
                    <div>
                      <span className="block text-lg font-semibold text-slate-700 mb-2">Time</span>
                      <div className="flex items-center space-x-3">
                        <ClockIcon className="h-6 w-6 text-emerald-500" />
                        <span className="text-xl text-slate-900">{appointment.time}</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="block text-lg font-semibold text-slate-700 mb-2">Location</span>
                      <div className="flex items-center space-x-3">
                        <MapPinIcon className="h-6 w-6 text-red-500" />
                        <span className="text-xl text-slate-900">{appointment.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-200">
                <span className="block text-lg font-semibold text-slate-700 mb-2">Reference Number</span>
                <span className="text-xl text-slate-900 font-mono bg-slate-100 px-4 py-2 rounded-lg">
                  {appointment.reference}
                </span>
              </div>
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <ExclamationTriangleIcon className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-amber-800 mb-2">Important Notice</h3>
                <ul className="text-amber-700 space-y-1">
                  <li>• Cancelling this appointment will make the slot available for other citizens</li>
                  <li>• You will need to book a new appointment if you change your mind</li>
                  <li>• Please cancel only if you are certain you cannot attend</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleKeepAppointment}
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition-colors duration-200 shadow-lg min-w-[200px]"
            >
              Keep Appointment
            </button>
            
            <button
              onClick={handleCancelAppointment}
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-xl transition-colors duration-200 shadow-lg min-w-[200px]"
            >
              Cancel Appointment
            </button>
          </div>

          {/* Help Text */}
          <div className="text-center mt-8">
            <p className="text-slate-600">
              Need help? <a href="/contact" className="text-blue-600 hover:text-blue-700 font-semibold">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
