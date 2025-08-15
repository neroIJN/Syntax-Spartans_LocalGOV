'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  CalendarDaysIcon,
  ClockIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from '@/components/DashboardLayout'

export default function RescheduleAppointmentPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedService, setSelectedService] = useState('National Identity Card Application')

  // Mock current appointment data
  const currentAppointment = {
    id: params.id,
    service: 'National Identity Card Application',
    date: '2024-08-15',
    time: '10:00 AM',
    location: 'Divisional Secretariat, Colombo'
  }

  // Mock available times
  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '1:00 PM', '2:00 PM', '3:00 PM'
  ]

  // Mock services
  const services = [
    'National Identity Card Application',
    'Birth Certificate Application',
    'Marriage Registration',
    'Land Registration',
    'Business Registration'
  ]

  // Generate calendar dates for next 30 days
  const generateCalendarDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      // Skip weekends for this example
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          date: date.toISOString().split('T')[0],
          day: date.getDate(),
          month: date.toLocaleDateString('en-US', { month: 'short' }),
          weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
        })
      }
    }
    
    return dates
  }

  const calendarDates = generateCalendarDates()

  const handleUpdateAppointment = () => {
    if (selectedDate && selectedTime) {
      // Here you would typically call an API to update the appointment
      alert('Appointment updated successfully!')
      router.push('/appointments')
    } else {
      alert('Please select both date and time')
    }
  }

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Appointments
          </button>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Reschedule Appointment</h1>
          <p className="text-xl text-slate-700">Update your appointment date and time</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Current Appointment Info */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Current Appointment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-slate-700">Service:</span>
                <span className="text-slate-900">{currentAppointment.service}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-slate-700">Date:</span>
                <span className="text-slate-900">{new Date(currentAppointment.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-slate-700">Time:</span>
                <span className="text-slate-900">{currentAppointment.time}</span>
              </div>
            </div>
          </div>

          {/* New Appointment Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Date Selection */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-emerald-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-emerald-50">
                <h3 className="text-2xl font-bold text-slate-900">Select New Date</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-semibold text-slate-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {calendarDates.slice(0, 21).map((dateObj) => (
                    <button
                      key={dateObj.date}
                      onClick={() => setSelectedDate(dateObj.date)}
                      className={`p-3 rounded-lg text-center transition-all duration-200 ${
                        selectedDate === dateObj.date
                          ? 'bg-emerald-600 text-white shadow-lg transform scale-105'
                          : 'bg-slate-100 hover:bg-emerald-100 text-slate-900 hover:text-emerald-700'
                      }`}
                    >
                      <div className="text-lg font-bold">{dateObj.day}</div>
                      <div className="text-xs">{dateObj.month}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Time and Service Selection */}
            <div className="space-y-8">
              {/* Service Selection */}
              <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
                  <h3 className="text-2xl font-bold text-slate-900">Service</h3>
                </div>
                <div className="p-6">
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                  >
                    {services.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Selection */}
              <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-100 overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-purple-50">
                  <h3 className="text-2xl font-bold text-slate-900">Available Times</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-4 rounded-lg text-center font-semibold transition-all duration-200 ${
                          selectedTime === time
                            ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                            : 'bg-slate-100 hover:bg-purple-100 text-slate-900 hover:text-purple-700'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Update Button */}
          <div className="text-center mt-12">
            <button
              onClick={handleUpdateAppointment}
              disabled={!selectedDate || !selectedTime}
              className={`inline-flex items-center px-12 py-4 text-xl font-bold rounded-xl transition-all duration-200 shadow-xl ${
                selectedDate && selectedTime
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer transform hover:scale-105'
                  : 'bg-slate-400 text-slate-600 cursor-not-allowed'
              }`}
            >
              Update Appointment
              <ArrowRightIcon className="ml-3 h-6 w-6" />
            </button>
            
            {selectedDate && selectedTime && (
              <div className="mt-6 p-6 bg-emerald-50 border-2 border-emerald-200 rounded-xl">
                <p className="text-lg text-emerald-800">
                  <strong>New Appointment:</strong> {selectedService} on {new Date(selectedDate).toLocaleDateString()} at {selectedTime}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
