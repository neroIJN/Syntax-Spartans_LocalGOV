'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';

export default function Services() {
  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">Services</h3>
          <p className="mt-1 text-sm text-gray-500">This page is under development.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
