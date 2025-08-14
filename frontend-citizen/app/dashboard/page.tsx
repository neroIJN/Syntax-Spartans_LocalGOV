'use client';

import { useState, useEffect } from 'react';
import { 
  CalendarDaysIcon, 
  DocumentTextIcon, 
  ClockIcon,
  BellIcon,
  UserCircleIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';

interface Appointment {
  id: string;
  service: string;
  department: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  location: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: 'verified' | 'pending' | 'rejected';
  size: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success';
  read: boolean;
}

export default function Dashboard() {
  const [user, setUser] = useState({
    name: 'Ms. Perera',
    profileImage: '/images/profile-placeholder.jpg',
    nationalId: '123456789V',
    email: 'perera@example.com',
    phone: '+94 70 123 4567'
  });

  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([
    {
      id: '1',
      service: 'National ID Renewal',
      department: 'Department of Registration of Persons',
      date: '2025-08-20',
      time: '10:30 AM',
      status: 'confirmed',
      location: 'Colombo District Office'
    },
    {
      id: '2',
      service: 'Birth Certificate Copy',
      department: 'Registrar General\'s Department',
      date: '2025-08-25',
      time: '2:00 PM',
      status: 'pending',
      location: 'Gampaha District Office'
    }
  ]);

  const [recentDocuments, setRecentDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'National ID Copy',
      type: 'PDF',
      uploadDate: '2025-08-10',
      status: 'verified',
      size: '2.4 MB'
    },
    {
      id: '2',
      name: 'Utility Bill',
      type: 'PDF',
      uploadDate: '2025-08-12',
      status: 'pending',
      size: '1.8 MB'
    },
    {
      id: '3',
      name: 'Passport Photo',
      type: 'JPG',
      uploadDate: '2025-08-14',
      status: 'verified',
      size: '856 KB'
    }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Appointment Confirmed',
      message: 'Your National ID renewal appointment has been confirmed for Aug 20, 2025',
      time: '2 hours ago',
      type: 'success',
      read: false
    },
    {
      id: '2',
      title: 'Document Verification',
      message: 'Your utility bill document is pending verification',
      time: '1 day ago',
      type: 'warning',
      read: false
    },
    {
      id: '3',
      title: 'New Service Available',
      message: 'Online Driving License Renewal is now available',
      time: '3 days ago',
      type: 'info',
      read: true
    }
  ]);

  const quickActions = [
    {
      title: 'Book an Appointment',
      description: 'Schedule a new appointment for government services',
      icon: CalendarDaysIcon,
      href: '/appointments/book',
      color: 'from-blue-600 to-blue-700',
      hoverColor: 'from-blue-700 to-blue-800'
    },
    {
      title: 'View Upcoming Appointments',
      description: 'Check your scheduled appointments and manage them',
      icon: ClockIcon,
      href: '/appointments',
      color: 'from-indigo-600 to-indigo-700',
      hoverColor: 'from-indigo-700 to-indigo-800'
    },
    {
      title: 'Upload Documents',
      description: 'Upload and manage your documents securely',
      icon: DocumentTextIcon,
      href: '/documents/upload',
      color: 'from-emerald-600 to-emerald-700',
      hoverColor: 'from-emerald-700 to-emerald-800'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'verified':
        return 'text-emerald-600 bg-emerald-100';
      case 'pending':
        return 'text-amber-600 bg-amber-100';
      case 'completed':
        return 'text-blue-600 bg-blue-100';
      case 'cancelled':
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-emerald-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-amber-500" />;
      default:
        return <BellIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                  <UserCircleIcon className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    Welcome back, {user.name}!
                  </h1>
                  <p className="text-blue-100 mt-1">
                    Manage your government services efficiently
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-r ${action.color} p-6 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${action.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <action.icon className="h-8 w-8 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm opacity-90 mb-4">{action.description}</p>
                  <div className="flex items-center text-sm font-medium">
                    Get Started
                    <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Upcoming Appointments</h3>
                <Link 
                  href="/appointments" 
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  View All
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="divide-y divide-slate-200">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-6 hover:bg-slate-50 transition-colors duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-base font-medium text-slate-900 mb-1">
                            {appointment.service}
                          </h4>
                          <p className="text-sm text-slate-600 mb-2">
                            {appointment.department}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-slate-500">
                            <span>📅 {new Date(appointment.date).toLocaleDateString()}</span>
                            <span>🕒 {appointment.time}</span>
                            <span>📍 {appointment.location}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <CalendarDaysIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">No upcoming appointments</p>
                    <Link 
                      href="/appointments/book" 
                      className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Book an appointment
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">Recent Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.slice(0, 5).map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border-b border-slate-200 last:border-b-0 cursor-pointer hover:bg-slate-50 transition-colors duration-200 ${!notification.read ? 'bg-blue-50' : ''}`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${!notification.read ? 'text-slate-900' : 'text-slate-700'}`}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Documents */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Recent Documents</h3>
                <Link 
                  href="/documents" 
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  View All
                  <EyeIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="divide-y divide-slate-200">
                {recentDocuments.map((document) => (
                  <div key={document.id} className="p-4 hover:bg-slate-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                          <DocumentTextIcon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {document.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {document.type} • {document.size}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                        {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Government Building Illustration */}
        <div className="mt-12 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Sri Lankan Government Services
              </h3>
              <p className="text-slate-600">
                Efficient, transparent, and citizen-friendly digital services
              </p>
            </div>
            <div className="relative bg-gradient-to-b from-sky-200 to-emerald-200 rounded-lg p-8 min-h-64 flex items-center justify-center">
              {/* Government Building SVG */}
              <svg
                viewBox="0 0 800 400"
                className="w-full max-w-2xl h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Building Base */}
                <rect x="100" y="250" width="600" height="120" fill="#f8fafc" stroke="#64748b" strokeWidth="2"/>
                
                {/* Columns */}
                {[150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650].map((x, i) => (
                  <rect key={i} x={x} y="200" width="20" height="70" fill="#e2e8f0" stroke="#64748b" strokeWidth="1"/>
                ))}
                
                {/* Main Building */}
                <rect x="150" y="200" width="500" height="50" fill="#f1f5f9" stroke="#64748b" strokeWidth="2"/>
                
                {/* Central Dome */}
                <ellipse cx="400" cy="180" rx="80" ry="40" fill="#059669" stroke="#064e3b" strokeWidth="2"/>
                <ellipse cx="400" cy="170" rx="60" ry="30" fill="#10b981" stroke="#064e3b" strokeWidth="1"/>
                
                {/* Central Tower */}
                <rect x="360" y="120" width="80" height="80" fill="#f8fafc" stroke="#64748b" strokeWidth="2"/>
                <rect x="370" y="130" width="60" height="60" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1"/>
                
                {/* Dome Top */}
                <ellipse cx="400" cy="120" rx="50" ry="20" fill="#047857" stroke="#064e3b" strokeWidth="2"/>
                
                {/* Flag */}
                <line x1="400" y1="120" x2="400" y2="80" stroke="#dc2626" strokeWidth="3"/>
                <rect x="400" y="80" width="30" height="20" fill="#dc2626"/>
                
                {/* Windows */}
                {[170, 220, 270, 320, 370, 420, 470, 520, 570, 620].map((x, i) => (
                  <rect key={i} x={x} y="220" width="15" height="20" fill="#3b82f6" stroke="#1e40af" strokeWidth="1"/>
                ))}
                
                {/* Trees */}
                <circle cx="80" cy="280" r="25" fill="#10b981"/>
                <rect x="75" y="280" width="10" height="30" fill="#92400e"/>
                
                <circle cx="720" cy="280" r="25" fill="#10b981"/>
                <rect x="715" y="280" width="10" height="30" fill="#92400e"/>
                
                {/* Steps */}
                <rect x="200" y="350" width="400" height="10" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1"/>
                <rect x="220" y="360" width="360" height="10" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1"/>
                
                {/* Clouds */}
                <ellipse cx="150" cy="80" rx="30" ry="15" fill="white" opacity="0.8"/>
                <ellipse cx="650" cy="60" rx="40" ry="20" fill="white" opacity="0.8"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
