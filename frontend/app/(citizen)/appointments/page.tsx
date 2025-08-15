'use client'

import { useState } from 'react'
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

export default function AppointmentsPage() {
  const router = useRouter()
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock appointments data
  const appointments = [
    {
      id: 'APT-001',
      service: 'National Identity Card Application',
      department: 'Divisional Secretariat',
      date: '2024-01-25',
      time: '10:00 AM',
      status: 'Confirmed',
      officer: 'Ms. Priya Sharma',
      location: 'Colombo District Secretariat',
      reference: 'NIC-2024-001234',
      estimatedDuration: '45 minutes',
      documents: ['Birth Certificate', 'Proof of Address', 'Two Passport Photos']
    },
    {
      id: 'APT-002',
      service: 'Birth Certificate Application',
      department: 'Grama Niladhari Office',
      date: '2024-01-28',
      time: '2:00 PM',
      status: 'Pending',
      officer: 'Mr. Rajesh Kumar',
      location: 'Mount Lavinia GN Office',
      reference: 'BC-2024-005678',
      estimatedDuration: '30 minutes',
      documents: ['Baptism Certificate', 'Hospital Birth Report']
    },
    {
      id: 'APT-003',
      service: 'Marriage Registration',
      department: 'Grama Niladhari Office',
      date: '2024-01-30',
      time: '11:00 AM',
      status: 'Confirmed',
      officer: 'Mrs. Anjali Perera',
      location: 'Dehiwala GN Office',
      reference: 'MR-2024-009876',
      estimatedDuration: '1 hour',
      documents: ['Birth Certificates', 'Witness Documents', 'Application Form']
    },
    {
      id: 'APT-004',
      service: 'Police Clearance Certificate',
      department: 'Police Department',
      date: '2024-01-20',
      time: '9:00 AM',
      status: 'Completed',
      officer: 'Inspector Silva',
      location: 'Colombo Central Police Station',
      reference: 'PCC-2024-112233',
      estimatedDuration: '1 hour',
      documents: ['National ID', 'Application Form', 'Passport Photos']
    },
    {
      id: 'APT-005',
      service: 'Business Registration',
      department: 'Registrar of Companies',
      date: '2024-01-22',
      time: '3:00 PM',
      status: 'Cancelled',
      officer: 'Mr. Fernando',
      location: 'Department of Registrar of Companies',
      reference: 'BR-2024-445566',
      estimatedDuration: '1.5 hours',
      documents: ['Business Plan', 'Address Proof', 'Director Details']
    }
  ]

  const statusOptions = ['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled']

  const filteredAppointments = appointments.filter(appointment => {
    const matchesStatus = filterStatus === 'All' || appointment.status === filterStatus
    const matchesSearch = appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.officer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
      case 'Pending':
        return <ClockIcon className="h-5 w-5 text-yellow-600" />
      case 'Completed':
        return <CheckCircleIcon className="h-5 w-5 text-blue-600" />
      case 'Cancelled':
        return <XMarkIcon className="h-5 w-5 text-red-600" />
      default:
        return <ClockIcon className="h-5 w-5 text-slate-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Completed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  const getCardBorderColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'border-emerald-200 hover:border-emerald-300'
      case 'Pending':
        return 'border-yellow-200 hover:border-yellow-300'
      case 'Completed':
        return 'border-blue-200 hover:border-blue-300'
      case 'Cancelled':
        return 'border-red-200 hover:border-red-300'
      default:
        return 'border-slate-200 hover:border-slate-300'
    }
  }

  const handleViewAppointment = (appointmentId: string) => {
    // Navigate to appointment details view
    console.log('View appointment:', appointmentId)
  }

  const handleRescheduleAppointment = (appointmentId: string) => {
    router.push(`/appointments/${appointmentId}/reschedule`)
  }

  const handleCancelAppointment = (appointmentId: string) => {
    router.push(`/appointments/${appointmentId}/cancel`)
  }

  const upcomingAppointments = appointments.filter(apt => 
    ['Confirmed', 'Pending'].includes(apt.status) && 
    new Date(apt.date) >= new Date()
  )

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
        {filteredAppointments.length === 0 ? (
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
                        <h3 className="text-2xl font-bold text-white">{appointment.service}</h3>
                        <p className="text-blue-100">{appointment.department}</p>
                      </div>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(appointment.status)}`}>
                        {getStatusIcon(appointment.status)}
                        <span className="ml-1">{appointment.status}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-blue-200">Reference</p>
                      <p className="font-mono text-lg font-bold text-white">{appointment.reference}</p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="flex items-center space-x-3">
                      <CalendarDaysIcon className="h-5 w-5 text-blue-300" />
                      <div>
                        <p className="text-sm font-semibold text-blue-200">Date</p>
                        <p className="text-white">{new Date(appointment.date).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <ClockIcon className="h-5 w-5 text-blue-300" />
                      <div>
                        <p className="text-sm font-semibold text-blue-200">Time</p>
                        <p className="text-white">{appointment.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <UserIcon className="h-5 w-5 text-blue-300" />
                      <div>
                        <p className="text-sm font-semibold text-blue-200">Officer</p>
                        <p className="text-white">{appointment.officer}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <BuildingOfficeIcon className="h-5 w-5 text-blue-300" />
                      <div>
                        <p className="text-sm font-semibold text-blue-200">Location</p>
                        <p className="text-white">{appointment.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Duration and Documents */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-sm font-semibold text-blue-200 mb-2">Estimated Duration</p>
                      <p className="text-white">{appointment.estimatedDuration}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-blue-200 mb-2">Required Documents</p>
                      <div className="flex flex-wrap gap-2">
                        {appointment.documents.map((doc, index) => (
                          <span key={index} className="bg-blue-600/30 text-blue-100 text-xs px-2 py-1 rounded-full border border-blue-400/30">
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-white/20">
                    <button
                      onClick={() => handleViewAppointment(appointment.id)}
                      className="inline-flex items-center px-4 py-2 bg-blue-600/30 hover:bg-blue-500/40 text-blue-100 font-semibold rounded-lg transition-all duration-200 border border-blue-400/30"
                    >
                      <EyeIcon className="h-4 w-4 mr-2" />
                      View Details
                    </button>

                    {['Confirmed', 'Pending'].includes(appointment.status) && (
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
