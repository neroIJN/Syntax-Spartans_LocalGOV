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
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BuildingOfficeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import DashboardLayout from '@/components/DashboardLayout';
import AuthGuard from '@/components/AuthGuard';
import { useAuth } from '@/hooks/useAuth';

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
  const { user } = useAuth();
  
  // Use authenticated user data instead of hardcoded data
  const [userProfile, setUserProfile] = useState({
    name: user ? `${user.firstName} ${user.lastName}` : 'Loading...',
    profileImage: user?.profilePicture ? `http://localhost:5000/uploads/profiles/${user.profilePicture}` : null,
    nationalId: user?.nicNumber || 'Loading...',
    email: user?.email || 'Loading...',
    phone: user?.phoneNumber || 'Loading...',
    title: ''
  });

  // Update profile when user data changes
  useEffect(() => {
    if (user) {
      // Determine title based on gender
      const getTitle = (gender: string, firstName: string) => {
        if (gender === 'female') {
          return 'Ms.';
        } else if (gender === 'male') {
          return 'Mr.';
        }
        return '';
      };

      const title = getTitle(user.gender || '', user.firstName || '');
      
      setUserProfile({
        name: `${user.firstName} ${user.lastName}`,
        profileImage: user.profilePicture ? `http://localhost:5000/uploads/profiles/${user.profilePicture}` : null,
        nationalId: user.nicNumber,
        email: user.email,
        phone: user.phoneNumber,
        title: title
      });
    }
  }, [user]);

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Government services carousel data
  const governmentServices = [
    {
      id: 1,
      title: "Department for Registration of Persons",
      subtitle: "Birth Certificates & National ID",
      description: "Get your birth certificate online through the official government portal. Fast, secure, and government-verified digital services available 24/7.",
      image: "/1614235811_7926395_hirunews.jpg",
      href: "/services/birth-certificate",
      buttonText: "Get Birth Certificate",
      services: ["Birth Certificate", "National ID", "Marriage Registration"],
      color: "from-blue-600 to-indigo-600",
      badge: "Online Available"
    },
    {
      id: 2,
      title: "Registrar of Companies",
      subtitle: "Business Registration Services", 
      description: "Register your business or company with the official government registry. Complete incorporation services with digital processing and verification.",
      image: "/download.jpeg",
      href: "/services",
      buttonText: "Register Business",
      services: ["Company Registration", "Business License", "Corporate Services"],
      color: "from-purple-600 to-pink-600",
      badge: "Appointment Required"
    },
    {
      id: 3,
      title: "District Secretariat Offices",
      subtitle: "Local Government Services",
      description: "Access various district-level services including land registration, local permits, and community services through our network of offices.",
      image: "/hq720.jpg",
      href: "/appointments/book",
      buttonText: "Book Appointment",
      services: ["Land Registration", "Local Permits", "Community Services"],
      color: "from-emerald-600 to-green-600",
      badge: "Multiple Locations"
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % governmentServices.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, governmentServices.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % governmentServices.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + governmentServices.length) % governmentServices.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

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
        return 'text-emerald-800 bg-emerald-200 border border-emerald-300';
      case 'pending':
        return 'text-amber-800 bg-amber-200 border border-amber-300';
      case 'completed':
        return 'text-blue-800 bg-blue-200 border border-blue-300';
      case 'cancelled':
      case 'rejected':
        return 'text-red-800 bg-red-200 border border-red-300';
      default:
        return 'text-gray-800 bg-gray-200 border border-gray-300';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-6 w-6 text-emerald-600" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-6 w-6 text-amber-600" />;
      default:
        return <BellIcon className="h-6 w-6 text-blue-600" />;
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AuthGuard>
      <DashboardLayout>
        <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600/20 via-blue-700/20 to-indigo-700/20 backdrop-blur-sm px-8 py-12">
              <div className="flex items-center space-x-6">
                <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-lg overflow-hidden">
                  {userProfile.profileImage ? (
                    <img 
                      src={userProfile.profileImage} 
                      alt={`${userProfile.name}'s profile`}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        // Fallback to icon if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <UserCircleIcon className={`h-12 w-12 text-white ${userProfile.profileImage ? 'hidden' : ''}`} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                    Welcome back, {userProfile.title} {userProfile.name}!
                  </h1>
                  <p className="text-blue-100 text-xl font-medium">
                    Manage your government services efficiently
                  </p>
                  <div className="mt-4 flex items-center space-x-6 text-blue-100">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">National ID:</span>
                      <span className="text-white font-semibold">{userProfile.nationalId}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Status:</span>
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Government Services Carousel */}
        <div className="mb-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="px-8 py-6 border-b border-white/20 bg-white/5">
            <h3 className="text-3xl font-bold text-white mb-2 text-center drop-shadow-lg">Sri Lankan Government Services</h3>
            <p className="text-lg text-blue-100 text-center">Access official government departments online</p>
          </div>
          
          {/* Animated Carousel */}
          <div className="relative bg-white/5 backdrop-blur-sm overflow-hidden">
            <div className="relative h-96 lg:h-80">
              {/* Carousel Content */}
              <div 
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {governmentServices.map((service, index) => (
                  <div key={service.id} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                      {/* Image Side */}
                      <div className="relative overflow-hidden">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                      </div>
                      
                      {/* Content Side */}
                      <div className="p-8 flex flex-col justify-center bg-white/10 backdrop-blur-sm">
                        <div className="max-w-md">
                          <h4 className="text-2xl lg:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                            {service.title}
                          </h4>
                          <h5 className="text-lg font-semibold text-blue-200 mb-4">
                            {service.subtitle}
                          </h5>
                          <p className="text-blue-100 mb-6 leading-relaxed">
                            {service.description}
                          </p>
                          
                          {/* Services List */}
                          <div className="mb-6">
                            <h6 className="font-semibold text-white mb-3">Available Services:</h6>
                            <div className="space-y-2">
                              {service.services.map((svc, idx) => (
                                <div key={idx} className="flex items-center text-blue-100">
                                  <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                                  <span className="text-sm">{svc}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Action Button */}
                          <Link
                            href={service.href}
                            className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${service.color} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
                          >
                            {service.buttonText}
                            <ArrowRightIcon className="ml-2 h-5 w-5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-10"
              onMouseEnter={() => setIsAutoPlaying(false)}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-10"
              onMouseEnter={() => setIsAutoPlaying(false)}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
            
            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
              {governmentServices.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white shadow-lg scale-125' 
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
            
            {/* Auto-play Indicator */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isAutoPlaying 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-white/90 text-slate-800'
                }`}
                title={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isAutoPlaying ? (
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-8 drop-shadow-lg">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${action.color} p-8 text-white shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 border border-white/20 backdrop-blur-sm`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <action.icon className="h-12 w-12 mb-6 text-white/90" />
                  <h3 className="text-xl font-bold mb-3 text-white">{action.title}</h3>
                  <p className="text-white/90 mb-6 text-base leading-relaxed">{action.description}</p>
                  <div className="flex items-center text-base font-semibold text-white">
                    Get Started
                    <ArrowRightIcon className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="px-8 py-6 border-b border-white/20 flex items-center justify-between bg-white/5">
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">Upcoming Appointments</h3>
                <Link 
                  href="/appointments" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-colors duration-200 shadow-lg backdrop-blur-sm"
                >
                  View All
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="divide-y divide-white/10">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-8 hover:bg-white/5 transition-all duration-200 border-l-4 border-transparent hover:border-blue-400">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-3 drop-shadow-sm">
                            {appointment.service}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-100">
                            <div className="flex items-center space-x-2">
                              <BuildingOfficeIcon className="h-5 w-5 text-blue-300" />
                              <span className="font-medium">{appointment.department}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CalendarDaysIcon className="h-5 w-5 text-blue-300" />
                              <span className="font-medium">{new Date(appointment.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <ClockIcon className="h-5 w-5 text-blue-300" />
                              <span className="font-medium">{appointment.time}</span>
                            </div>
                          </div>
                          <div className="mt-4 flex items-center space-x-2">
                            <MapPinIcon className="h-5 w-5 text-blue-300" />
                            <span className="text-blue-100 font-medium">{appointment.location}</span>
                          </div>
                        </div>
                        <span className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider ${getStatusColor(appointment.status)} shadow-lg`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <CalendarDaysIcon className="h-16 w-16 text-white/40 mx-auto mb-6" />
                    <p className="text-xl text-white/80 font-medium mb-4">No upcoming appointments</p>
                    <Link 
                      href="/appointments/book" 
                      className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
                    >
                      <PlusIcon className="h-5 w-5 mr-2" />
                      Book an appointment
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="px-8 py-6 border-b border-white/20 bg-white/5">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">Recent Notifications</h3>
                  <div className="flex items-center space-x-4">
                    {unreadCount > 0 && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        {unreadCount} new
                      </span>
                    )}
                    <Link 
                      href="/notifications" 
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-colors duration-200 shadow-lg backdrop-blur-sm"
                    >
                      View All
                      <BellIcon className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.slice(0, 5).map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-6 border-b border-white/10 last:border-b-0 cursor-pointer hover:bg-white/5 transition-all duration-200 ${!notification.read ? 'bg-white/10 border-l-4 border-purple-400' : ''}`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-base font-bold ${!notification.read ? 'text-white' : 'text-blue-100'} mb-2`}>
                          {notification.title}
                        </p>
                        <p className="text-sm text-blue-200 mb-3 leading-relaxed">
                          {notification.message}
                        </p>
                        <p className="text-xs text-blue-300 font-medium">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-3 h-3 bg-purple-400 rounded-full shadow-lg"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Documents */}
          <div className="mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="px-8 py-6 border-b border-white/20 flex items-center justify-between bg-white/5">
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">Recent Documents</h3>
                <Link 
                  href="/documents" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-colors duration-200 shadow-lg backdrop-blur-sm"
                >
                  View All
                  <DocumentTextIcon className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="divide-y divide-white/10">
                {recentDocuments.map((document) => (
                  <div key={document.id} className="p-6 hover:bg-white/5 transition-all duration-200 border-l-4 border-transparent hover:border-emerald-400">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                          <DocumentTextIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-white mb-1 drop-shadow-sm">
                            {document.name}
                          </p>
                          <p className="text-sm text-blue-200 font-medium">
                            {document.type} • {document.size} • {new Date(document.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider ${getStatusColor(document.status)} shadow-lg`}>
                        {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>
    </DashboardLayout>
    </AuthGuard>
  );
}
