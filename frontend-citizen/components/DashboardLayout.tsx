'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  UserCircleIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
    { name: 'Book Appointment', href: '/appointments/book', icon: CalendarDaysIcon, current: false },
    { name: 'My Appointments', href: '/appointments', icon: CalendarDaysIcon, current: false },
    { name: 'Documents', href: '/documents', icon: DocumentTextIcon, current: false },
    { name: 'Services', href: '/services', icon: BuildingOfficeIcon, current: false },
    { name: 'Profile', href: '/profile', icon: UserCircleIcon, current: false },
  ];

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login page
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
          <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LG</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LocalGov
              </span>
            </div>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setIsSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-4 py-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  item.current
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className={`mr-3 h-5 w-5 ${item.current ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'}`} />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="group flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-red-500" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col border-r border-gray-200 bg-white shadow-sm">
          <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LG</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LocalGov
              </span>
            </div>
          </div>
          <nav className="flex-1 space-y-1 px-4 py-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  item.current
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${item.current ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'}`} />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="group flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-red-500" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
          <div className="flex h-16 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-200 lg:hidden" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
                
                {/* Notifications */}
                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                  <BellIcon className="h-6 w-6" />
                </button>

                {/* Profile dropdown */}
                <div className="relative">
                  <button type="button" className="-m-1.5 flex items-center p-1.5">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                      <UserCircleIcon className="h-6 w-6 text-white" />
                    </div>
                    <span className="hidden lg:flex lg:items-center">
                      <span className="ml-4 text-sm font-semibold leading-6 text-gray-900">Ms. Perera</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}
