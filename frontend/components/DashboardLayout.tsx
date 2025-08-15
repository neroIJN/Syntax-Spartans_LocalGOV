'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  UserCircleIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  BuildingOfficeIcon,
  PlusCircleIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';
import UserProfileHeader from './UserProfileHeader';
import { useAuth } from '@/hooks/useAuth';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Book Appointment', href: '/appointments/book', icon: PlusCircleIcon },
    { name: 'My Appointments', href: '/appointments', icon: ClipboardDocumentListIcon },
    { name: 'Documents', href: '/documents', icon: DocumentTextIcon },
    { name: 'Services', href: '/services', icon: BuildingOfficeIcon },
    { name: 'Profile', href: '/profile', icon: UserCircleIcon },
  ];

  // Function to check if a navigation item is current
  const isCurrentPath = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    if (href === '/appointments/book') {
      return pathname === '/appointments/book' || pathname.startsWith('/appointments/book/');
    }
    if (href === '/appointments') {
      return pathname === '/appointments' || (pathname.startsWith('/appointments/') && !pathname.startsWith('/appointments/book'));
    }
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden scroll-smooth">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-smooth"
        style={{
          backgroundImage: `url('/Manage.jpg')`
        }}
      />
      
      {/* Professional Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/85 to-slate-800/90 transition-smooth" />
      
      {/* Subtle Pattern Overlay */}
      <div className="fixed inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:20px_20px]" />

      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-smooth ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-smooth" onClick={() => setIsSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white/10 backdrop-blur-md shadow-2xl border-r border-white/20 transition-smooth">
          <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-white/30">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg hover-lift">
                <span className="text-white font-bold text-sm">🏛️</span>
              </div>
              <span className="text-lg font-bold text-white drop-shadow-lg">
                LocalGov
              </span>
            </div>
            <button
              type="button"
              className="text-white/70 hover:text-white transition-smooth hover-lift"
              onClick={() => setIsSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-2 px-4 py-6 scroll-smooth-fast">
            {navigation.map((item) => {
              const isCurrent = isCurrentPath(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-smooth hover-lift ${
                    isCurrent
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg fade-in'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className={`mr-3 h-5 w-5 transition-smooth ${isCurrent ? 'text-white' : 'text-white/70 group-hover:text-white'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-white/20 p-4">
            <button
              onClick={handleLogout}
              className="group flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-smooth hover-lift"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 transition-smooth" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col h-full bg-white/10 backdrop-blur-md border-r border-white/20 shadow-2xl transition-smooth">
          <div className="flex h-16 shrink-0 items-center px-6 border-b border-white/30">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg hover-lift">
                <span className="text-white font-bold text-sm">🏛️</span>
              </div>
              <span className="text-lg font-bold text-white drop-shadow-lg">
                LocalGov
              </span>
            </div>
          </div>
          <nav className="flex-1 space-y-2 px-4 py-6 scroll-smooth-fast">
            {navigation.map((item) => {
              const isCurrent = isCurrentPath(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-smooth hover-lift ${
                    isCurrent
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg fade-in'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 transition-smooth ${isCurrent ? 'text-white' : 'text-white/70 group-hover:text-white'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-white/20 p-4">
            <button
              onClick={handleLogout}
              className="group flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-smooth hover-lift"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 transition-smooth" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 relative z-10 scroll-smooth-fast">
        {/* Top navigation */}
        <div className="sticky top-0 z-30 bg-white/10 backdrop-blur-md shadow-lg border-b border-white/20 transition-smooth">
          <div className="flex h-16 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-white/90 hover:text-white lg:hidden transition-smooth hover-lift"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-white/30 lg:hidden" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">
                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-white/30" />
                
                {/* Notifications */}
                <button type="button" className="-m-2.5 p-2.5 text-white/90 hover:text-white transition-smooth hover-lift hover:bg-white/10 rounded-lg">
                  <BellIcon className="h-6 w-6" />
                </button>

                {/* Profile dropdown */}
                <UserProfileHeader className="relative hover-lift" />
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="min-h-screen relative scroll-smooth-fast fade-in">
          <div className="scroll-container">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
