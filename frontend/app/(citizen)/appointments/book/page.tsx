'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  CalendarDaysIcon,
  ClockIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  UserIcon,
  XMarkIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from '../../../../components/DashboardLayout'
import { services, getServiceById, calculateTotalFee, getDepartments } from '../../../../lib/services'
import { appointmentAPI } from '../../../../lib/api'

function BookAppointmentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preSelectedService = searchParams.get('service')
  const preSelectedFilter = searchParams.get('filter')
  
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState(preSelectedService || '')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [serviceFilter, setServiceFilter] = useState(preSelectedFilter === 'free' ? 'free' : 'all')
  const [categoryFilter, setCategoryFilter] = useState('all')

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

  const handleConfirmAppointment = async () => {
    const service = getServiceById(selectedService)
    if (!service) return
    
    setIsSubmitting(true)
    setSubmitError('')

    try {
      // Create appointment data
      const appointmentData = {
        serviceName: service.name,
        department: service.department,
        appointmentDate: selectedDate,
        timeSlot: selectedTime,
        location: service.location || 'To be determined',
        description: `Appointment for ${service.name}`,
        priority: 'normal'
      }

      console.log('Submitting appointment data:', appointmentData)

      // Create appointment via API
      const response = await appointmentAPI.createAppointment(appointmentData)
      
      if (response.success) {
        const appointmentId = response.data.id
        const fees = calculateTotalFee(selectedService)
        
        // If service requires payment, go to payment page
        if (fees.total > 0) {
          const paymentUrl = `/payment?serviceId=${selectedService}&date=${selectedDate}&time=${selectedTime}&appointmentId=${appointmentId}`
          router.push(paymentUrl)
        } else {
          // If service is free, go directly to confirmation
          const confirmUrl = `/appointments/confirm?serviceId=${selectedService}&date=${selectedDate}&time=${selectedTime}&appointmentId=${appointmentId}`
          router.push(confirmUrl)
        }
      } else {
        setSubmitError(response.message || 'Failed to create appointment')
      }
    } catch (error: any) {
      console.error('Error creating appointment:', error)
      setSubmitError(error.response?.data?.message || 'Failed to create appointment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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

  // Filter services based on selected filters
  const filteredServices = services.filter(service => {
    const matchesFeeFilter = serviceFilter === 'all' || 
                            (serviceFilter === 'free' && service.fee === 0) ||
                            (serviceFilter === 'paid' && service.fee > 0)
    
    const matchesCategoryFilter = categoryFilter === 'all' || service.category === categoryFilter
    
    return matchesFeeFilter && matchesCategoryFilter
  })

  // Get unique categories for filter dropdown
  const availableCategories = Array.from(new Set(services.map(s => s.category))).sort()

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Schedule Appointment</h1>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <p className="text-xl text-blue-100">Select a service and then choose a date and time for your appointment.</p>
            <div className="mt-4 lg:mt-0 flex flex-wrap gap-4">
              <div className="bg-green-600/20 border border-green-400/30 rounded-xl px-4 py-2 backdrop-blur-sm">
                <span className="text-green-200 text-sm font-semibold">
                  🆓 {services.filter(s => s.fee === 0).length} Free Services Available
                </span>
              </div>
              <div className="bg-blue-600/20 border border-blue-400/30 rounded-xl px-4 py-2 backdrop-blur-sm">
                <span className="text-blue-200 text-sm font-semibold">
                  📋 {services.length} Total Services
                </span>
              </div>
            </div>
          </div>
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
                <p className="text-blue-100 mt-2">Choose from {filteredServices.length} available services</p>
              </div>
              
              {/* Service Filters */}
              <div className="px-8 py-6 border-b border-white/20 bg-white/5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Fee Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-blue-200 mb-2">Filter by Fee</label>
                    <select
                      value={serviceFilter}
                      onChange={(e) => setServiceFilter(e.target.value)}
                      className="w-full py-2 px-3 border border-white/30 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-300/50 focus:outline-none bg-white/10 backdrop-blur-sm text-white"
                    >
                      <option value="all">All Services</option>
                      <option value="free">Free Services Only</option>
                      <option value="paid">Paid Services Only</option>
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-blue-200 mb-2">Filter by Category</label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full py-2 px-3 border border-white/30 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-300/50 focus:outline-none bg-white/10 backdrop-blur-sm text-white"
                    >
                      <option value="all">All Categories</option>
                      {availableCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Quick Free Services Button */}
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setServiceFilter('free')
                        setCategoryFilter('all')
                      }}
                      className="w-full py-2 px-4 bg-green-600/30 hover:bg-green-500/40 text-green-100 font-semibold rounded-lg transition-all duration-200 border border-green-400/30"
                    >
                      🆓 Show Free Services
                    </button>
                  </div>
                </div>

                {/* Filter Summary */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {serviceFilter !== 'all' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/30 text-blue-100 border border-blue-400/30">
                      {serviceFilter === 'free' ? 'Free Services' : 'Paid Services'}
                      <button
                        onClick={() => setServiceFilter('all')}
                        className="ml-2 text-blue-200 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {categoryFilter !== 'all' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-600/30 text-purple-100 border border-purple-400/30">
                      {categoryFilter}
                      <button
                        onClick={() => setCategoryFilter('all')}
                        className="ml-2 text-purple-200 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              </div>

              <div className="p-8">
                {filteredServices.length === 0 ? (
                  <div className="text-center py-12">
                    <DocumentTextIcon className="mx-auto h-16 w-16 text-blue-200 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No services found</h3>
                    <p className="text-blue-100 mb-4">Try adjusting your filters to see more services.</p>
                    <button
                      onClick={() => {
                        setServiceFilter('all')
                        setCategoryFilter('all')
                      }}
                      className="inline-flex items-center px-4 py-2 bg-blue-600/30 hover:bg-blue-500/40 text-blue-100 font-semibold rounded-lg transition-all duration-200 border border-blue-400/30"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredServices.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`p-6 rounded-xl border-2 text-left transition-all duration-200 relative ${
                          selectedService === service.id
                            ? 'border-blue-400 bg-blue-600/30 shadow-lg backdrop-blur-sm'
                            : 'border-white/30 bg-white/10 hover:border-blue-400/50 hover:bg-white/15 backdrop-blur-sm'
                        }`}
                      >
                        {/* Free Service Badge */}
                        {service.fee === 0 && (
                          <div className="absolute top-3 right-3">
                            <span className="bg-green-500/20 text-green-200 px-2 py-1 rounded-full text-xs font-semibold border border-green-400/30 flex items-center">
                              🆓 FREE
                            </span>
                          </div>
                        )}
                        
                        <h3 className="text-xl font-bold text-white mb-2 pr-16">{service.name}</h3>
                        <div className="space-y-2 text-blue-100">
                          <p>Department: {service.department}</p>
                          <p>Duration: {service.duration}</p>
                          <p>Category: {service.category}</p>
                          <div className="flex items-center justify-between">
                            <p className={`font-semibold ${service.fee === 0 ? 'text-green-200' : 'text-blue-100'}`}>
                              Fee: {service.fee > 0 ? `Rs. ${service.fee.toLocaleString()}` : 'Free'}
                            </p>
                            {service.popular && (
                              <span className="bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded-full text-xs font-semibold border border-yellow-400/30">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-blue-200 mt-2">{service.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
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
                disabled={!canProceed() || isSubmitting}
                className={`inline-flex items-center px-8 py-4 rounded-xl text-lg font-semibold transition-smooth hover-lift ${
                  canProceed() && !isSubmitting
                    ? (() => {
                        const service = getServiceById(selectedService)
                        const fees = calculateTotalFee(selectedService)
                        return fees.total > 0
                          ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg'
                          : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg'
                      })()
                    : 'bg-white/20 text-blue-200 cursor-not-allowed backdrop-blur-md border border-white/20'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Appointment...
                  </>
                ) : (
                  (() => {
                    if (!canProceed()) return (
                      <>
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        Complete Selection
                      </>
                    )
                    
                    const service = getServiceById(selectedService)
                    const fees = calculateTotalFee(selectedService)
                    
                    if (fees.total > 0) {
                      return (
                        <>
                          <CreditCardIcon className="h-5 w-5 mr-2" />
                          Proceed to Payment (Rs. {fees.total.toLocaleString()})
                        </>
                      )
                    } else {
                      return (
                        <>
                          <CheckCircleIcon className="h-5 w-5 mr-2" />
                          Confirm Appointment (Free)
                        </>
                      )
                    }
                  })()
                )}
              </button>
            )}
          </div>

          {/* Error Message */}
          {submitError && (
            <div className="mt-6 bg-red-600/20 border border-red-400/30 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center">
                <XMarkIcon className="h-5 w-5 text-red-400 mr-2" />
                <p className="text-red-100 font-semibold">Error creating appointment</p>
              </div>
              <p className="text-red-200 text-sm mt-1">{submitError}</p>
            </div>
          )}

          {/* Summary */}
          {(selectedService || selectedDate || selectedTime) && (
            <div className="mt-12 bg-blue-600/20 border border-blue-400/30 rounded-xl p-6 backdrop-blur-md">
              <h3 className="text-xl font-bold text-blue-100 mb-4">Appointment Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-blue-200">
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
                {selectedService && (
                  <div>
                    <span className="font-semibold">Fee:</span>
                    <div className="text-white">
                      {(() => {
                        const fees = calculateTotalFee(selectedService)
                        return fees.total > 0 ? (
                          <span className="text-yellow-300">Rs. {fees.total.toLocaleString()}</span>
                        ) : (
                          <span className="text-green-300">Free</span>
                        )
                      })()}
                    </div>
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

export default function BookAppointmentPage() {
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
      <BookAppointmentContent />
    </Suspense>
  )
}
