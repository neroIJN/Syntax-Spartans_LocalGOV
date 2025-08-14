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
  TrashIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from '@/components/DashboardLayout'

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
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Appointment Reminder',
      message: 'Your appointment with the Grama Niladhari for document verification is scheduled for tomorrow',
      time: '2024-01-15 10:00 AM',
      type: 'reminder',
      read: false,
      category: 'Appointments'
    },
    {
      id: '2',
      title: 'Update',
      message: 'Your application for the National Identity Card is now in progress. You will receive further updates within 5',
      time: '2024-01-14 03:30 PM',
      type: 'update',
      read: false,
      category: 'Applications'
    },
    {
      id: '3',
      title: 'System Message',
      message: 'Scheduled maintenance will occur on January 16th from 10:00 PM to 12:00 AM. The system may be',
      time: '2024-01-12 11:15 AM',
      type: 'system',
      read: true,
      category: 'System'
    },
    {
      id: '4',
      title: 'Appointment Confirmation',
      message: 'Your appointment with the Divisional Secretariat for land registration is confirmed for January',
      time: '2024-01-10 09:45 AM',
      type: 'confirmation',
      read: true,
      category: 'Appointments'
    },
    {
      id: '5',
      title: 'Update',
      message: 'Your request for a marriage certificate has been processed and is ready for collection at the Divisional',
      time: '2024-01-08 02:00 PM',
      type: 'update',
      read: true,
      category: 'Documents'
    }
  ])

  const getNotificationIcon = (type: string) => {
    const baseClasses = "h-8 w-8"
    switch (type) {
      case 'reminder':
        return <ClockIcon className={`${baseClasses} text-blue-600`} />
      case 'update':
        return <InformationCircleIcon className={`${baseClasses} text-emerald-600`} />
      case 'system':
        return <ExclamationTriangleIcon className={`${baseClasses} text-amber-600`} />
      case 'confirmation':
        return <CheckCircleIcon className={`${baseClasses} text-green-600`} />
      default:
        return <BellIcon className={`${baseClasses} text-slate-600`} />
    }
  }

  const getNotificationBorder = (type: string) => {
    switch (type) {
      case 'reminder':
        return 'border-l-blue-500'
      case 'update':
        return 'border-l-emerald-500'
      case 'system':
        return 'border-l-amber-500'
      case 'confirmation':
        return 'border-l-green-500'
      default:
        return 'border-l-slate-500'
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

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Notifications</h1>
              <p className="text-xl text-slate-700">Stay updated with your government services</p>
            </div>
            
            {unreadCount > 0 && (
              <div className="flex items-center space-x-4">
                <span className="bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold">
                  {unreadCount} unread
                </span>
                <button
                  onClick={markAllAsRead}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
                >
                  Mark All as Read
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-6">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-2xl shadow-xl border-2 ${!notification.read ? 'border-blue-200 bg-gradient-to-r from-blue-50 to-white' : 'border-slate-200'} overflow-hidden hover:shadow-2xl transition-all duration-300 border-l-8 ${getNotificationBorder(notification.type)}`}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-6 flex-1">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-r from-slate-100 to-blue-100 rounded-xl flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h3 className={`text-2xl font-bold ${!notification.read ? 'text-slate-900' : 'text-slate-700'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg"></div>
                          )}
                        </div>
                        
                        <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center space-x-6 text-slate-500">
                          <div className="flex items-center space-x-2">
                            <ClockIcon className="h-5 w-5" />
                            <span className="font-medium">{notification.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm bg-slate-200 text-slate-700 px-3 py-1 rounded-full font-semibold">
                              {notification.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-3 ml-6">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md"
                        >
                          <EyeIcon className="h-4 w-4 mr-2" />
                          Mark Read
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md"
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
            <div className="text-center py-16 bg-white rounded-2xl shadow-xl border-2 border-slate-200">
              <BellIcon className="h-20 w-20 text-slate-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-900 mb-3">No notifications</h3>
              <p className="text-lg text-slate-600">You're all caught up! Check back later for updates.</p>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        {notifications.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">{notifications.length}</div>
              <div className="text-slate-600 font-medium">Total Notifications</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-blue-200 p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{unreadCount}</div>
              <div className="text-slate-600 font-medium">Unread</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-emerald-200 p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {notifications.filter(n => n.type === 'confirmation').length}
              </div>
              <div className="text-slate-600 font-medium">Confirmations</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-amber-200 p-6 text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">
                {notifications.filter(n => n.type === 'reminder').length}
              </div>
              <div className="text-slate-600 font-medium">Reminders</div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
