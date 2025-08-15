'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  CalendarDaysIcon,
  ClockIcon,
  BuildingOfficeIcon,
  UserIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from '@/components/DashboardLayout'
import { appointmentAPI } from '@/lib/api'

interface Appointment {
  id: string;
  serviceName: string;
  department: string;
  appointmentDate: string;
  timeSlot: string;
  status: string;
  location?: string;
  description?: string;
  priority?: string;
  queueNumber?: number;
  estimatedWaitTime?: number;
  createdAt: string;
  updatedAt: string;
}

export default function AppointmentsPage() {
  const router = useRouter()
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [totalAppointments, setTotalAppointments] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  // Fetch appointments from backend
  useEffect(() => {
    // Check auth state on mount
    const token = localStorage.getItem('authToken');
    console.log('Appointments page mounted - auth token present:', !!token);
    if (token) {
      console.log('Auth token preview:', token.substring(0, 20) + '...');
    }
    
    fetchAppointments()
  }, [filterStatus, currentPage])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      setError('')
      
      console.log('Fetching appointments with filters:', { filterStatus, currentPage })
      
      const filters: any = {
        page: currentPage,
        limit: 10
      }
      
      if (filterStatus !== 'All') {
        filters.status = filterStatus
      }

      console.log('Making API call to appointmentAPI.getAllAppointments with filters:', filters)
      const response = await appointmentAPI.getAllAppointments(filters)
      console.log('API response received:', response)
      
      if (response.success) {
        setAppointments(response.data || [])
        setTotalAppointments(response.total || 0)
        console.log('Successfully set appointments:', response.data)
      } else {
        console.error('API response not successful:', response)
        setError('Failed to load appointments')
      }
    } catch (error: any) {
      console.error('Error fetching appointments:', error)
      console.error('Error response:', error.response)
      setError(error.response?.data?.message || 'Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }

  const statusOptions = ['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled']

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-600" />
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-blue-600" />
      case 'cancelled':
        return <XMarkIcon className="h-5 w-5 text-red-600" />
      default:
        return <ClockIcon className="h-5 w-5 text-slate-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  const handleViewAppointment = (appointmentId: string) => {
    // Navigate to appointment details view
    console.log('View appointment:', appointmentId)
  }

  const handleRescheduleAppointment = (appointmentId: string) => {
    router.push(`/appointments/${appointmentId}/reschedule`)
  }

  const handleCancelAppointment = async (appointmentId: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        const response = await appointmentAPI.cancelAppointment(appointmentId, 'Cancelled by citizen')
        if (response.success) {
          // Refresh appointments list
          fetchAppointments()
        } else {
          alert('Failed to cancel appointment: ' + response.message)
        }
      } catch (error: any) {
        console.error('Error cancelling appointment:', error)
        alert('Failed to cancel appointment: ' + (error.response?.data?.message || error.message))
      }
    }
  }

  const upcomingAppointments = appointments.filter(apt => 
    ['confirmed', 'pending'].includes(apt.status.toLowerCase()) && 
    new Date(apt.appointmentDate) >= new Date()
  )

  const getAppointmentStats = () => {
    return {
      total: totalAppointments,
      upcoming: upcomingAppointments.length,
      completed: appointments.filter(a => a.status.toLowerCase() === 'completed').length,
      cancelled: appointments.filter(a => a.status.toLowerCase() === 'cancelled').length
    }
  }

  const stats = getAppointmentStats()

  if (loading && appointments.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading appointments...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 scroll-container fade-in">
        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between slide-in-up">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">My Appointments</h1>
            <p className="text-xl text-blue-100">Manage your scheduled appointments and view appointment history.</p>
          </div>
          <button
            onClick={() => router.push('/appointments/book')}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-smooth hover-lift"
          >
            <PlusIcon className="h-5 w-5 mr-2 transition-smooth" />
            Book New Appointment
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 slide-in-right">
          {[
            { label: 'Total Appointments', value: appointments.length, color: 'bg-blue-500', icon: CalendarDaysIcon },
            { label: 'Upcoming', value: upcomingAppointments.length, color: 'bg-emerald-500', icon: ClockIcon },
            { label: 'Completed', value: appointments.filter(a => a.status === 'Completed').length, color: 'bg-purple-500', icon: CheckCircleIcon },
            { label: 'Cancelled', value: appointments.filter(a => a.status === 'Cancelled').length, color: 'bg-red-500', icon: XMarkIcon }
          ].map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 hover-lift transition-smooth">
              <div className="flex items-center">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mr-4 shadow-lg hover-lift`}>
                  <stat.icon className="h-6 w-6 text-white transition-smooth" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-100">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-200" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-white/30 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-300/50 focus:outline-none bg-white/10 backdrop-blur-sm text-white placeholder-blue-200"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full py-3 px-4 border border-white/30 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-300/50 focus:outline-none bg-white/10 backdrop-blur-sm text-white"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status === 'All' ? 'All Statuses' : status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        {error && (
          <div className="bg-red-600/20 border border-red-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
            <div className="flex items-center">
              <XMarkIcon className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-red-100 font-semibold">Error loading appointments</p>
            </div>
            <p className="text-red-200 text-sm mt-1">{error}</p>
            <button
              onClick={fetchAppointments}
              className="mt-3 inline-flex items-center px-4 py-2 bg-red-600/30 hover:bg-red-500/40 text-red-100 font-semibold rounded-lg transition-all duration-200 border border-red-400/30"
            >
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Try Again
            </button>
          </div>
        )}

        {filteredAppointments.length === 0 && !loading && !error ? (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-12 text-center">
            <CalendarDaysIcon className="mx-auto h-16 w-16 text-blue-200 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No appointments found</h3>
            <p className="text-blue-100 mb-6">
              {searchTerm || filterStatus !== 'All' 
                ? 'Try adjusting your search terms or filter.' 
                : 'You haven\'t scheduled any appointments yet.'
              }
            </p>
            <button
              onClick={() => router.push('/appointments/book')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Schedule Your First Appointment
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className={`bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:bg-white/15`}
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div className="flex items-center mb-4 lg:mb-0">
                      <div className="mr-4">
                        <h3 className="text-2xl font-bold text-white">{appointment.serviceName}</h3>
                        <p className="text-blue-100">{appointment.department}</p>
                      </div>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(appointment.status)}`}>
                        {getStatusIcon(appointment.status)}
                        <span className="ml-1 capitalize">{appointment.status}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-blue-200">Appointment ID</p>
                      <p className="font-mono text-lg font-bold text-white">{appointment.id}</p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="flex items-center space-x-3">
                      <CalendarDaysIcon className="h-5 w-5 text-blue-300" />
                      <div>
                        <p className="text-sm font-semibold text-blue-200">Date</p>
                        <p className="text-white">{new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <ClockIcon className="h-5 w-5 text-blue-300" />
                      <div>
                        <p className="text-sm font-semibold text-blue-200">Time</p>
                        <p className="text-white">{appointment.timeSlot}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <UserIcon className="h-5 w-5 text-blue-300" />
                      <div>
                        <p className="text-sm font-semibold text-blue-200">Queue Number</p>
                        <p className="text-white">{appointment.queueNumber || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <BuildingOfficeIcon className="h-5 w-5 text-blue-300" />
                      <div>
                        <p className="text-sm font-semibold text-blue-200">Location</p>
                        <p className="text-white">{appointment.location || 'To be determined'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Priority and Description */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-sm font-semibold text-blue-200 mb-2">Priority</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                        appointment.priority === 'high' ? 'bg-red-100 text-red-800 border border-red-200' :
                        appointment.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                        'bg-green-100 text-green-800 border border-green-200'
                      }`}>
                        {appointment.priority ? appointment.priority.charAt(0).toUpperCase() + appointment.priority.slice(1) : 'Normal'}
                      </span>
                    </div>

                    {appointment.description && (
                      <div>
                        <p className="text-sm font-semibold text-blue-200 mb-2">Description</p>
                        <p className="text-white text-sm">{appointment.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Wait Time Info */}
                  {appointment.estimatedWaitTime && appointment.estimatedWaitTime > 0 && (
                    <div className="mb-6 p-3 bg-blue-600/20 border border-blue-400/30 rounded-lg">
                      <p className="text-sm font-semibold text-blue-200">Estimated Wait Time</p>
                      <p className="text-white">{appointment.estimatedWaitTime} minutes</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-white/20">
                    <button
                      onClick={() => handleViewAppointment(appointment.id)}
                      className="inline-flex items-center px-4 py-2 bg-blue-600/30 hover:bg-blue-500/40 text-blue-100 font-semibold rounded-lg transition-all duration-200 border border-blue-400/30"
                    >
                      <EyeIcon className="h-4 w-4 mr-2" />
                      View Details
                    </button>

                    {['confirmed', 'pending'].includes(appointment.status.toLowerCase()) && (
                      <>
                        <button
                          onClick={() => handleRescheduleAppointment(appointment.id)}
                          className="inline-flex items-center px-4 py-2 bg-emerald-600/30 hover:bg-emerald-500/40 text-emerald-100 font-semibold rounded-lg transition-all duration-200 border border-emerald-400/30"
                        >
                          <ArrowPathIcon className="h-4 w-4 mr-2" />
                          Reschedule
                        </button>

                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="inline-flex items-center px-4 py-2 bg-red-600/30 hover:bg-red-500/40 text-red-100 font-semibold rounded-lg transition-all duration-200 border border-red-400/30"
                        >
                          <XMarkIcon className="h-4 w-4 mr-2" />
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
