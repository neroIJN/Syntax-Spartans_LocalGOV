'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  BuildingOfficeIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ArrowRightIcon,
  UserGroupIcon,
  HomeIcon,
  BriefcaseIcon,
  IdentificationIcon,
  HeartIcon,
  CameraIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from '@/components/DashboardLayout'

export default function ServicesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Mock services data
  const services = [
    {
      id: 'national-id',
      name: 'National Identity Card',
      description: 'Apply for a new National Identity Card or replace an existing one.',
      category: 'Identity Services',
      department: 'Divisional Secretariat',
      duration: '45 minutes',
      fee: 'Rs. 25.00',
      requirements: ['Birth Certificate', 'Proof of Address', 'Two Passport Photos'],
      rating: 4.8,
      icon: IdentificationIcon,
      color: 'bg-blue-500',
      popular: true
    },
    {
      id: 'birth-certificate',
      name: 'Birth Certificate',
      description: 'Obtain an official birth certificate for various purposes.',
      category: 'Civil Registration',
      department: 'Grama Niladhari Office',
      duration: '30 minutes',
      fee: 'Rs. 15.00',
      requirements: ['Baptism Certificate', 'Hospital Birth Report'],
      rating: 4.7,
      icon: DocumentTextIcon,
      color: 'bg-emerald-500',
      popular: true
    },
    {
      id: 'marriage-registration',
      name: 'Marriage Registration',
      description: 'Register your marriage officially with government records.',
      category: 'Civil Registration',
      department: 'Grama Niladhari Office',
      duration: '1 hour',
      fee: 'Rs. 50.00',
      requirements: ['Birth Certificates', 'Witness Documents', 'Application Form'],
      rating: 4.9,
      icon: HeartIcon,
      color: 'bg-pink-500',
      popular: false
    },
    {
      id: 'passport-application',
      name: 'Passport Application',
      description: 'Apply for a new passport or renew your existing passport.',
      category: 'Identity Services',
      department: 'Immigration Department',
      duration: '2 hours',
      fee: 'Rs. 3,500.00',
      requirements: ['National ID', 'Birth Certificate', 'Passport Photos'],
      rating: 4.6,
      icon: CameraIcon,
      color: 'bg-purple-500',
      popular: true
    },
    {
      id: 'business-registration',
      name: 'Business Registration',
      description: 'Register a new business or company with the government.',
      category: 'Business Services',
      department: 'Registrar of Companies',
      duration: '1.5 hours',
      fee: 'Rs. 2,000.00',
      requirements: ['Business Plan', 'Address Proof', 'Director Details'],
      rating: 4.5,
      icon: BriefcaseIcon,
      color: 'bg-orange-500',
      popular: false
    },
    {
      id: 'land-registration',
      name: 'Land Registration',
      description: 'Register land ownership or check land ownership details.',
      category: 'Property Services',
      department: 'Land Registry',
      duration: '2 hours',
      fee: 'Rs. 1,500.00',
      requirements: ['Survey Plan', 'Previous Deed', 'Tax Receipts'],
      rating: 4.4,
      icon: HomeIcon,
      color: 'bg-green-500',
      popular: false
    },
    {
      id: 'police-clearance',
      name: 'Police Clearance Certificate',
      description: 'Obtain a police clearance certificate for various purposes.',
      category: 'Security Services',
      department: 'Police Department',
      duration: '1 hour',
      fee: 'Rs. 500.00',
      requirements: ['National ID', 'Application Form', 'Passport Photos'],
      rating: 4.6,
      icon: UserGroupIcon,
      color: 'bg-red-500',
      popular: true
    },
    {
      id: 'death-certificate',
      name: 'Death Certificate',
      description: 'Obtain an official death certificate for legal purposes.',
      category: 'Civil Registration',
      department: 'Grama Niladhari Office',
      duration: '30 minutes',
      fee: 'Rs. 20.00',
      requirements: ['Medical Certificate', 'Application Form', 'Identification'],
      rating: 4.8,
      icon: DocumentTextIcon,
      color: 'bg-slate-500',
      popular: false
    }
  ]

  const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))]

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const popularServices = services.filter(service => service.popular)

  const handleServiceClick = (serviceId: string) => {
    if (serviceId === 'birth-certificate') {
      router.push('/services/birth-certificate')
    } else {
      router.push(`/appointments/book?service=${serviceId}`)
    }
  }

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Government Services</h1>
          <p className="text-xl text-slate-700">Discover and access various government services online.</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-4 px-4 text-lg border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Popular Services */}
        {searchTerm === '' && selectedCategory === 'All' && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
              <StarIcon className="h-8 w-8 text-yellow-500 mr-3" />
              Popular Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularServices.map((service) => {
                const IconComponent = service.icon
                return (
                  <button
                    key={service.id}
                    onClick={() => handleServiceClick(service.id)}
                    className="bg-white rounded-2xl shadow-xl border-2 border-yellow-100 p-6 hover:shadow-2xl hover:border-yellow-300 transition-all duration-300 transform hover:scale-105 text-left"
                  >
                    <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mb-4`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{service.name}</h3>
                    <div className="flex items-center mb-2">
                      <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-slate-600 ml-1">{service.rating}</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-3">{service.description}</p>
                    <div className="text-sm text-slate-500">
                      <div className="flex items-center mb-1">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {service.duration}
                      </div>
                      <div className="flex items-center">
                        <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                        {service.fee}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* All Services */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
            <BuildingOfficeIcon className="h-8 w-8 text-blue-600 mr-3" />
            {searchTerm || selectedCategory !== 'All' ? 'Search Results' : 'All Services'}
            <span className="ml-3 text-lg text-slate-600">({filteredServices.length})</span>
          </h2>

          {filteredServices.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-100 p-12 text-center">
              <MagnifyingGlassIcon className="mx-auto h-16 w-16 text-slate-400 mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No services found</h3>
              <p className="text-slate-600">Try adjusting your search terms or category filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredServices.map((service) => {
                const IconComponent = service.icon
                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl shadow-xl border-2 border-slate-100 overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all duration-300"
                  >
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center">
                          <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mr-4`}>
                            <IconComponent className="h-7 w-7 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-slate-900">{service.name}</h3>
                            <div className="flex items-center mt-1">
                              <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-slate-600 ml-1">{service.rating}</span>
                              {service.popular && (
                                <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-semibold">
                                  Popular
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-slate-600 mb-6 text-lg">{service.description}</p>

                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="space-y-3">
                          <div className="flex items-center text-slate-700">
                            <BuildingOfficeIcon className="h-5 w-5 mr-2 text-blue-600" />
                            <span className="font-semibold">Department:</span>
                          </div>
                          <p className="text-slate-600 ml-7">{service.department}</p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center text-slate-700">
                            <ClockIcon className="h-5 w-5 mr-2 text-blue-600" />
                            <span className="font-semibold">Duration:</span>
                          </div>
                          <p className="text-slate-600 ml-7">{service.duration}</p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center text-slate-700">
                            <CurrencyDollarIcon className="h-5 w-5 mr-2 text-blue-600" />
                            <span className="font-semibold">Fee:</span>
                          </div>
                          <p className="text-slate-600 ml-7">{service.fee}</p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center text-slate-700">
                            <DocumentTextIcon className="h-5 w-5 mr-2 text-blue-600" />
                            <span className="font-semibold">Category:</span>
                          </div>
                          <p className="text-slate-600 ml-7">{service.category}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-slate-900 mb-3">Required Documents:</h4>
                        <ul className="space-y-2">
                          {service.requirements.map((req, index) => (
                            <li key={index} className="flex items-center text-slate-600">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => handleServiceClick(service.id)}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                      >
                        Apply for Service
                        <ArrowRightIcon className="h-5 w-5 ml-2" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
