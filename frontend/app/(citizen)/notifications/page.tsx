'use client'

import { useState } from 'react'
import { 
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
  ClockIcon,
  EyeIcon,
  TrashIcon,
  FunnelIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from '../../../components/DashboardLayout'

interface Notification {
  id: string
  title: string
  message: string
  time: string
  type: 'reminder' | 'update' | 'system' | 'confirmation'
  read: boolean
  category: string
}

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Appointment Reminder',
      message: 'Your appointment with the Grama Niladhari for document verification is scheduled for tomorrow at 10:00 AM. Please bring original documents and photocopies.',
      time: '2 hours ago',
      type: 'reminder',
      read: false,
      category: 'Appointments'
    },
    {
      id: '2',
      title: 'Birth Certificate Ready',
      message: 'Your application for birth certificate (Application ID: BC2024-0156) has been processed and is ready for collection at the Divisional Secretariat. Fee: Rs. 100',
      time: '5 hours ago',
      type: 'update',
      read: false,
      category: 'Documents'
    },
    {
      id: '3',
      title: 'Payment Confirmation',
      message: 'Payment of Rs. 500 for Marriage Certificate application has been successfully processed. Transaction ID: PAY-2024-789456',
      time: '1 day ago',
      type: 'confirmation',
      read: false,
      category: 'Payments'
    },
    {
      id: '4',
      title: 'System Maintenance Notice',
      message: 'Scheduled maintenance will occur on January 20th from 11:00 PM to 1:00 AM. Online services may be temporarily unavailable during this period.',
      time: '2 days ago',
      type: 'system',
      read: true,
      category: 'System'
    },
    {
      id: '5',
      title: 'Police Clearance Certificate Approved',
      message: 'Your Police Clearance Certificate application has been approved by the Sri Lanka Police. You can collect it from the nearest police station within 30 days.',
      time: '3 days ago',
      type: 'update',
      read: true,
      category: 'Applications'
    },
    {
      id: '6',
      title: 'Appointment Confirmed',
      message: 'Your appointment for Grama Niladhari Certificate on January 25th at 2:00 PM has been confirmed. Reference: APP-2024-1234',
      time: '4 days ago',
      type: 'confirmation',
      read: true,
      category: 'Appointments'
    },
    {
      id: '7',
      title: 'Document Verification Required',
      message: 'Additional verification is required for your National ID application. Please visit the nearest Registration Office with supporting documents.',
      time: '1 week ago',
      type: 'reminder',
      read: true,
      category: 'Applications'
    },
    {
      id: '8',
      title: 'New Service Available',
      message: 'Online application for Character Certificate is now available. Apply conveniently from home and track your application status.',
      time: '1 week ago',
      type: 'system',
      read: true,
      category: 'System'
    }
  ])

  const getNotificationIcon = (type: string) => {
    const baseClasses = "h-6 w-6"
    switch (type) {
      case 'reminder':
        return <ClockIcon className={`${baseClasses} text-blue-400`} />
      case 'update':
        return <InformationCircleIcon className={`${baseClasses} text-emerald-400`} />
      case 'system':
        return <ExclamationTriangleIcon className={`${baseClasses} text-amber-400`} />
      case 'confirmation':
        return <CheckCircleIcon className={`${baseClasses} text-green-400`} />
      default:
        return <BellIcon className={`${baseClasses} text-blue-400`} />
    }
  }

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'reminder':
        return 'bg-blue-500/20 border border-blue-400/30 text-blue-300'
      case 'update':
        return 'bg-emerald-500/20 border border-emerald-400/30 text-emerald-300'
      case 'system':
        return 'bg-amber-500/20 border border-amber-400/30 text-amber-300'
      case 'confirmation':
        return 'bg-green-500/20 border border-green-400/30 text-green-300'
      default:
        return 'bg-blue-500/20 border border-blue-400/30 text-blue-300'
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'unread' && !notification.read) ||
                         (selectedFilter === 'read' && notification.read) ||
                         notification.type === selectedFilter

    return matchesSearch && matchesFilter
  })

  const unreadCount = notifications.filter(n => !n.read).length
  const filterOptions = [
    { value: 'all', label: 'All Notifications' },
    { value: 'unread', label: 'Unread' },
    { value: 'read', label: 'Read' },
    { value: 'reminder', label: 'Reminders' },
    { value: 'update', label: 'Updates' },
    { value: 'confirmation', label: 'Confirmations' },
    { value: 'system', label: 'System' }
  ]

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 scroll-container fade-in">
        {/* Header */}
        <div className="mb-8 slide-in-up">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Notifications</h1>
              <p className="text-xl text-blue-100">Stay updated with your government services and applications</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {unreadCount > 0 && (
                <div className="flex items-center gap-4">
                  <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-300 px-4 py-2 rounded-xl text-lg font-bold">
                    {unreadCount} unread
                  </div>
                  <button
                    onClick={markAllAsRead}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold transition-smooth hover-lift shadow-lg"
                  >
                    Mark All as Read
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 slide-in-right bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden hover-lift transition-smooth">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-6 w-6 text-blue-300" />
                </div>
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-smooth"
                />
              </div>

              {/* Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FunnelIcon className="h-6 w-6 text-blue-300" />
                </div>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="pl-12 pr-10 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-smooth appearance-none cursor-pointer min-w-[200px]"
                >
                  {filterOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-slate-800 text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Stats */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-blue-200">
              <span>Total: {notifications.length}</span>
              <span>•</span>
              <span>Showing: {filteredNotifications.length}</span>
              <span>•</span>
              <span>Unread: {unreadCount}</span>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-6">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`slide-in-left bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden hover-lift transition-smooth ${
                  !notification.read ? 'ring-2 ring-blue-400/30' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-6 flex-1">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className={`w-14 h-14 backdrop-blur-sm rounded-2xl flex items-center justify-center border ${getNotificationBadge(notification.type)}`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        {/* Title and Status */}
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className={`text-xl font-bold drop-shadow-sm ${!notification.read ? 'text-white' : 'text-blue-100'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-3 h-3 bg-blue-400 rounded-full shadow-lg animate-pulse"></div>
                          )}
                        </div>
                        
                        {/* Message */}
                        <p className="text-blue-200 mb-4 leading-relaxed text-lg">
                          {notification.message}
                        </p>
                        
                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-6 text-blue-300">
                          <div className="flex items-center gap-2">
                            <ClockIcon className="h-5 w-5" />
                            <span className="font-medium">{notification.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm px-3 py-1 rounded-full font-semibold backdrop-blur-sm ${getNotificationBadge(notification.type)}`}>
                              {notification.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm px-3 py-1 rounded-full font-semibold backdrop-blur-sm ${getNotificationBadge(notification.type)}`}>
                              {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 ml-6">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-smooth hover-lift shadow-lg"
                        >
                          <EyeIcon className="h-4 w-4 mr-2" />
                          Mark Read
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transition-smooth hover-lift shadow-lg"
                      >
                        <TrashIcon className="h-4 w-4 mr-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="slide-in-up text-center py-16 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">
              <div className="w-20 h-20 bg-blue-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-400/30">
                <BellIcon className="h-12 w-12 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-sm">
                {searchTerm || selectedFilter !== 'all' ? 'No matching notifications' : 'No notifications'}
              </h3>
              <p className="text-lg text-blue-200">
                {searchTerm || selectedFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : "You're all caught up! Check back later for updates."
                }
              </p>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        {notifications.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6 slide-in-up">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 text-center hover-lift transition-smooth">
              <div className="text-4xl font-bold text-white mb-2 drop-shadow-sm">{notifications.length}</div>
              <div className="text-blue-200 font-medium">Total Notifications</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 text-center hover-lift transition-smooth">
              <div className="text-4xl font-bold text-blue-400 mb-2 drop-shadow-sm">{unreadCount}</div>
              <div className="text-blue-200 font-medium">Unread</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 text-center hover-lift transition-smooth">
              <div className="text-4xl font-bold text-emerald-400 mb-2 drop-shadow-sm">
                {notifications.filter(n => n.type === 'confirmation').length}
              </div>
              <div className="text-blue-200 font-medium">Confirmations</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 text-center hover-lift transition-smooth">
              <div className="text-4xl font-bold text-amber-400 mb-2 drop-shadow-sm">
                {notifications.filter(n => n.type === 'reminder').length}
              </div>
              <div className="text-blue-200 font-medium">Reminders</div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
