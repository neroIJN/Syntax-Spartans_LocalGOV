'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  CalendarDaysIcon,
  ClockIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  UserIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from '@/components/DashboardLayout'

export default function BookAppointmentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preSelectedService = searchParams.get('service')
  
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState(preSelectedService || '')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  // Mock services
  const services = [
    {
      id: 'national-id',
      name: 'National Identity Card Application',
      department: 'Divisional Secretariat',
      duration: '1 hour',
      fee: 'Rs. 25.00'
    },
    {
      id: 'birth-certificate',
      name: 'Birth Certificate Application',
      department: 'Grama Niladhari Office',
      duration: '30 minutes',
      fee: 'Rs. 15.00'
    },
    {
      id: 'marriage-registration',
      name: 'Marriage Registration',
      department: 'Grama Niladhari Office',
      duration: '1 hour',
      fee: 'Rs. 50.00'
    },
    {
      id: 'land-registration',
      name: 'Land Registration Inquiry',
      department: 'Divisional Secretariat',
      duration: '1.5 hours',
      fee: 'Rs. 75.00'
    },
    {
      id: 'business-registration',
      name: 'Business Registration',
      department: 'Divisional Secretariat',
      duration: '1 hour',
      fee: 'Rs. 100.00'
    }
  ]

  // Mock available times with queue information
  const getAvailableTimesForDate = (date: string) => {
    const timeSlots = [
      { time: '9:00 AM', available: true, queue: 0, estimatedWait: '0 min' },
      { time: '9:30 AM', available: false, queue: 3, estimatedWait: '90 min', reason: 'Fully booked' },
      { time: '10:00 AM', available: true, queue: 1, estimatedWait: '30 min' },
      { time: '10:30 AM', available: true, queue: 0, estimatedWait: '0 min' },
      { time: '11:00 AM', available: false, queue: 4, estimatedWait: '120 min', reason: 'Officer unavailable' },
      { time: '11:30 AM', available: true, queue: 2, estimatedWait: '60 min' },
      { time: '1:00 PM', available: true, queue: 0, estimatedWait: '0 min' },
      { time: '1:30 PM', available: true, queue: 1, estimatedWait: '30 min' },
      { time: '2:00 PM', available: false, queue: 5, estimatedWait: '150 min', reason: 'Maintenance break' },
      { time: '2:30 PM', available: true, queue: 0, estimatedWait: '0 min' },
      { time: '3:00 PM', available: true, queue: 3, estimatedWait: '90 min' },
      { time: '3:30 PM', available: true, queue: 1, estimatedWait: '30 min' },
      { time: '4:00 PM', available: false, queue: 2, estimatedWait: '60 min', reason: 'Limited capacity' },
      { time: '4:30 PM', available: true, queue: 0, estimatedWait: '0 min' }
    ];

    // Add some randomization based on the date
    return timeSlots.map(slot => ({
      ...slot,
      queue: slot.available ? Math.floor(Math.random() * 4) : slot.queue,
      estimatedWait: slot.available ? 
        (Math.floor(Math.random() * 4) === 0 ? '0 min' : `${Math.floor(Math.random() * 3 + 1) * 30} min`) 
        : slot.estimatedWait
    }));
  };

  const availableTimes = selectedDate ? getAvailableTimesForDate(selectedDate) : [];

  // Generate calendar for next 30 days (excluding weekends)
  const generateCalendarDates = () => {
    const dates = []
    const today = new Date()
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December']
    
    let currentMonth = today.getMonth()
    let currentYear = today.getFullYear()
    
    for (let i = 1; i <= 60; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          date: date.toISOString().split('T')[0],
          day: date.getDate(),
          month: months[date.getMonth()],
          year: date.getFullYear(),
          weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
        })
      }
    }
    
    return dates
  }

  const calendarDates = generateCalendarDates()
  const currentMonth = calendarDates[0]?.month
  const nextMonth = calendarDates.find(d => d.month !== currentMonth)?.month

  // Get current and next month dates
  const currentMonthDates = calendarDates.filter(d => d.month === currentMonth)
  const nextMonthDates = calendarDates.filter(d => d.month === nextMonth)

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleConfirmAppointment = () => {
    // Here you would typically call an API to book the appointment
    router.push('/appointments/confirm')
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedService !== ''
      case 2:
        return selectedDate !== ''
      case 3:
        return selectedTime !== ''
      default:
        return false
    }
  }

  const getSelectedServiceDetails = () => {
    return services.find(s => s.id === selectedService)
  }

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Schedule Appointment</h1>
          <p className="text-xl text-blue-100">Select a service and then choose a date and time for your appointment.</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, title: 'Select a service', icon: DocumentTextIcon },
              { step: 2, title: 'Choose Date', icon: CalendarDaysIcon },
              { step: 3, title: 'Select Time', icon: ClockIcon }
            ].map((item) => (
              <div key={item.step} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                  currentStep >= item.step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/20 backdrop-blur-md text-blue-200 border border-white/30'
                }`}>
                  {currentStep > item.step ? (
                    <CheckCircleIcon className="h-6 w-6" />
                  ) : (
                    <item.icon className="h-6 w-6" />
                  )}
                </div>
                <span className={`ml-3 text-lg font-semibold ${
                  currentStep >= item.step ? 'text-white' : 'text-blue-200'
                }`}>
                  {item.title}
                </span>
                {item.step < 3 && (
                  <ArrowRightIcon className="h-6 w-6 text-blue-300 ml-8" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="px-8 py-6 border-b border-white/20 bg-white/5">
                <h2 className="text-2xl font-bold text-white">Select a Service</h2>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                        selectedService === service.id
                          ? 'border-blue-400 bg-blue-600/30 shadow-lg backdrop-blur-sm'
                          : 'border-white/30 bg-white/10 hover:border-blue-400/50 hover:bg-white/15 backdrop-blur-sm'
                      }`}
                    >
                      <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                      <div className="space-y-2 text-blue-100">
                        <p>Department: {service.department}</p>
                        <p>Duration: {service.duration}</p>
                        <p>Fee: {service.fee}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Date Selection */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current Month */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="px-8 py-6 border-b border-white/20 bg-white/5">
                  <h3 className="text-2xl font-bold text-white">{currentMonth} 2024</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-sm font-semibold text-blue-200 py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {currentMonthDates.slice(0, 21).map((dateObj) => (
                      <button
                        key={dateObj.date}
                        onClick={() => setSelectedDate(dateObj.date)}
                        className={`p-3 rounded-lg text-center transition-all duration-200 ${
                          selectedDate === dateObj.date
                            ? 'bg-emerald-600 text-white shadow-lg transform scale-105'
                            : 'bg-white/10 hover:bg-emerald-500/30 text-white hover:text-emerald-100 backdrop-blur-sm border border-white/20'
                        }`}
                      >
                        <div className="text-lg font-bold">{dateObj.day}</div>
                        <div className="text-xs">{dateObj.weekday}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Next Month */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="px-8 py-6 border-b border-white/20 bg-white/5">
                  <h3 className="text-2xl font-bold text-white">{nextMonth} 2024</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-sm font-semibold text-blue-200 py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {nextMonthDates.slice(0, 21).map((dateObj) => (
                      <button
                        key={dateObj.date}
                        onClick={() => setSelectedDate(dateObj.date)}
                        className={`p-3 rounded-lg text-center transition-all duration-200 ${
                          selectedDate === dateObj.date
                            ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                            : 'bg-white/10 hover:bg-purple-500/30 text-white hover:text-purple-100 backdrop-blur-sm border border-white/20'
                        }`}
                      >
                        <div className="text-lg font-bold">{dateObj.day}</div>
                        <div className="text-xs">{dateObj.weekday}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Time Selection */}
          {currentStep === 3 && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="px-8 py-6 border-b border-white/20 bg-white/5">
                <h2 className="text-2xl font-bold text-white">Available Times</h2>
                <p className="text-blue-100 mt-2">
                  Selected Date: {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : ''}
                </p>
              </div>
              <div className="p-8">
                {/* Time Slots Legend */}
                <div className="mb-6 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-emerald-500 rounded mr-2"></div>
                    <span className="text-blue-100">Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                    <span className="text-blue-100">Queue</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                    <span className="text-blue-100">Unavailable</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-purple-600 rounded mr-2"></div>
                    <span className="text-blue-100">Selected</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableTimes.map((timeSlot) => (
                    <div
                      key={timeSlot.time}
                      className={`relative rounded-xl border transition-all duration-200 backdrop-blur-md ${
                        !timeSlot.available
                          ? 'border-red-400/30 bg-red-600/20 cursor-not-allowed opacity-75'
                          : selectedTime === timeSlot.time
                          ? 'border-purple-400 bg-purple-600/30 text-white shadow-lg transform scale-105'
                          : timeSlot.queue > 0
                          ? 'border-yellow-400/30 bg-yellow-500/20 hover:bg-yellow-500/30 cursor-pointer'
                          : 'border-emerald-400/30 bg-emerald-500/20 hover:bg-emerald-500/30 cursor-pointer'
                      }`}
                    >
                      <button
                        onClick={() => timeSlot.available && setSelectedTime(timeSlot.time)}
                        disabled={!timeSlot.available}
                        className="w-full p-4 text-left disabled:cursor-not-allowed"
                      >
                        {/* Time */}
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-lg font-bold ${
                            selectedTime === timeSlot.time ? 'text-white' : 'text-white'
                          }`}>
                            {timeSlot.time}
                          </span>
                          
                          {/* Status Badge */}
                          {!timeSlot.available ? (
                            <span className="px-2 py-1 bg-red-500/30 text-red-100 text-xs rounded-full font-semibold border border-red-400/30">
                              Unavailable
                            </span>
                          ) : timeSlot.queue === 0 ? (
                            <span className="px-2 py-1 bg-emerald-500/30 text-emerald-100 text-xs rounded-full font-semibold border border-emerald-400/30">
                              Available
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-yellow-500/30 text-yellow-100 text-xs rounded-full font-semibold border border-yellow-400/30">
                              Queue: {timeSlot.queue}
                            </span>
                          )}
                        </div>

                        {/* Wait Time */}
                        <div className={`text-sm ${
                          selectedTime === timeSlot.time ? 'text-purple-100' : 'text-blue-100'
                        }`}>
                          {timeSlot.available ? (
                            <div className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              {timeSlot.queue === 0 ? 'Immediate' : `Wait: ${timeSlot.estimatedWait}`}
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <XMarkIcon className="h-4 w-4 mr-1" />
                              {timeSlot.reason}
                            </div>
                          )}
                        </div>

                        {/* Additional Info for Queue */}
                        {timeSlot.available && timeSlot.queue > 0 && (
                          <div className={`mt-2 text-xs ${
                            selectedTime === timeSlot.time ? 'text-purple-200' : 'text-blue-200'
                          }`}>
                            {timeSlot.queue} {timeSlot.queue === 1 ? 'person' : 'people'} ahead
                          </div>
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Next Available Slots Info */}
                {availableTimes.filter(slot => slot.available).length > 0 && (
                  <div className="mt-8 p-4 bg-blue-600/20 border border-blue-400/30 rounded-xl backdrop-blur-sm">
                    <h4 className="font-semibold text-blue-100 mb-2">Quick Tips:</h4>
                    <ul className="text-sm text-blue-200 space-y-1">
                      <li>• Green slots are immediately available</li>
                      <li>• Yellow slots have a queue but shorter wait times</li>
                      <li>• Queue times are estimates and may vary</li>
                      <li>• Arrive 15 minutes before your scheduled time</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`inline-flex items-center px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 ${
                currentStep === 1
                  ? 'bg-white/20 text-blue-200 cursor-not-allowed backdrop-blur-md border border-white/20'
                  : 'bg-white/20 hover:bg-white/30 text-white shadow-lg backdrop-blur-md border border-white/20'
              }`}
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`inline-flex items-center px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg transform hover:scale-105'
                    : 'bg-white/20 text-blue-200 cursor-not-allowed backdrop-blur-md border border-white/20'
                }`}
              >
                Next
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleConfirmAppointment}
                disabled={!canProceed()}
                className={`inline-flex items-center px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg transform hover:scale-105'
                    : 'bg-white/20 text-blue-200 cursor-not-allowed backdrop-blur-md border border-white/20'
                }`}
              >
                Confirm Appointment
                <CheckCircleIcon className="h-5 w-5 ml-2" />
              </button>
            )}
          </div>

          {/* Summary */}
          {(selectedService || selectedDate || selectedTime) && (
            <div className="mt-12 bg-blue-600/20 border border-blue-400/30 rounded-xl p-6 backdrop-blur-md">
              <h3 className="text-xl font-bold text-blue-100 mb-4">Appointment Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-200">
                {selectedService && (
                  <div>
                    <span className="font-semibold">Service:</span>
                    <div className="text-white">{getSelectedServiceDetails()?.name}</div>
                  </div>
                )}
                {selectedDate && (
                  <div>
                    <span className="font-semibold">Date:</span>
                    <div className="text-white">{new Date(selectedDate).toLocaleDateString()}</div>
                  </div>
                )}
                {selectedTime && (
                  <div>
                    <span className="font-semibold">Time:</span>
                    <div className="text-white">{selectedTime}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
