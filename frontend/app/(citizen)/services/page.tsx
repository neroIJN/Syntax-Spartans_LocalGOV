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
  CameraIcon,
  StarIcon,
  FunnelIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MapPinIcon,
  TagIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from '../../../components/DashboardLayout'
import { services, getDepartments, getCategories, getPopularServices } from '../../../lib/services'

export default function ServicesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedFeeRange, setSelectedFeeRange] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>(['DS', 'GN'])

  // Get data from services configuration
  const allServices = services
  const departments = [
    {
      code: 'DS',
      name: 'Divisional Secretariat',
      description: 'Administrative services at divisional level',
      location: 'Divisional Secretariat Office',
      color: 'bg-gradient-to-br from-blue-600 to-blue-700',
      icon: BuildingOfficeIcon
    },
    {
      code: 'GN',
      name: 'Grama Niladhari',
      description: 'Village-level administrative services',
      location: 'Grama Niladhari Office',
      color: 'bg-gradient-to-br from-green-600 to-green-700',
      icon: UserGroupIcon
    },
    {
      code: 'ID',
      name: 'Immigration Department',
      description: 'Passport and immigration services',
      location: 'Immigration Office',
      color: 'bg-gradient-to-br from-purple-600 to-purple-700',
      icon: IdentificationIcon
    },
    {
      code: 'RC',
      name: 'Registrar of Companies',
      description: 'Business registration and corporate services',
      location: 'Registrar of Companies Office',
      color: 'bg-gradient-to-br from-orange-600 to-orange-700',
      icon: BriefcaseIcon
    },
    {
      code: 'LR',
      name: 'Land Registry',
      description: 'Land registration and property services',
      location: 'Land Registry Office',
      color: 'bg-gradient-to-br from-teal-600 to-teal-700',
      icon: HomeIcon
    },
    {
      code: 'PD',
      name: 'Police Department',
      description: 'Police clearance and security services',
      location: 'Police Station',
      color: 'bg-gradient-to-br from-red-600 to-red-700',
      icon: ShieldCheckIcon
    },
    {
      code: 'ED',
      name: 'Education Department',
      description: 'Educational certificates and verification',
      location: 'Education Department Office',
      color: 'bg-gradient-to-br from-indigo-600 to-indigo-700',
      icon: AcademicCapIcon
    }
  ]
  const categories = ['all', ...getCategories()]
  const popularServices = getPopularServices()

  // Department options for filter
  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    ...departments.map(dept => ({ value: dept.code, label: dept.name }))
  ]

  // Fee range options
  const feeRanges = [
    { value: 'all', label: 'All Fees' },
    { value: 'free', label: 'Free Services' },
    { value: '1-100', label: 'Rs. 1 - Rs. 100' },
    { value: '101-500', label: 'Rs. 101 - Rs. 500' },
    { value: '501-1000', label: 'Rs. 501 - Rs. 1,000' },
    { value: '1001-5000', label: 'Rs. 1,001 - Rs. 5,000' },
    { value: '5000+', label: 'Above Rs. 5,000' }
  ]

  // Icon mapping for departments
  const getDepartmentIcon = (code: string) => {
    const iconMap: { [key: string]: any } = {
      'DS': BuildingOfficeIcon,
      'GN': HomeIcon,
      'ID': CameraIcon,
      'RC': BriefcaseIcon,
      'LR': HomeIcon,
      'PD': ShieldCheckIcon,
      'ED': AcademicCapIcon
    }
    return iconMap[code] || BuildingOfficeIcon
  }

  // Color mapping for departments
  const getDepartmentColor = (code: string) => {
    const colorMap: { [key: string]: string } = {
      'DS': 'bg-blue-500',
      'GN': 'bg-emerald-500',
      'ID': 'bg-purple-500',
      'RC': 'bg-orange-500',
      'LR': 'bg-green-500',
      'PD': 'bg-red-500',
      'ED': 'bg-indigo-500'
    }
    return colorMap[code] || 'bg-blue-500'
  }

  // Icon mapping for services
  const getServiceIcon = (serviceId: string) => {
    const iconMap: { [key: string]: any } = {
      'national-id': IdentificationIcon,
      'grama-niladhari-certificate': DocumentTextIcon,
      'birth-certificate': DocumentTextIcon,
            'marriage-registration': DocumentTextIcon,
      'death-certificate': DocumentTextIcon,
      'passport-application': CameraIcon,
      'passport-renewal': CameraIcon,
      'business-registration': BriefcaseIcon,
      'company-name-search': MagnifyingGlassIcon,
      'land-registration': HomeIcon,
      'land-title-search': MagnifyingGlassIcon,
      'police-clearance': ShieldCheckIcon,
      'character-certificate': DocumentTextIcon,
      'school-certificate': AcademicCapIcon,
      'education-verification': DocumentTextIcon
    }
    const IconComponent = iconMap[serviceId] || DocumentTextIcon
    
    // Defensive check to ensure we have a valid component
    if (!IconComponent) {
      return <DocumentTextIcon className="h-6 w-6 text-white" />
    }
    
    return <IconComponent className="h-6 w-6 text-white" />
  }

  // Helper function to parse fee
  const parseFee = (feeAmount: number): number => {
    return feeAmount
  }

  // Filter and sort services
  const getFilteredServices = () => {
    let filtered = allServices.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.department.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesDepartment = selectedDepartment === 'all' || service.departmentCode === selectedDepartment
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory
      
      const fee = parseFee(service.fee)
      let matchesFeeRange = true
      if (selectedFeeRange !== 'all') {
        switch (selectedFeeRange) {
          case 'free':
            matchesFeeRange = fee === 0
            break
          case '1-100':
            matchesFeeRange = fee >= 1 && fee <= 100
            break
          case '101-500':
            matchesFeeRange = fee >= 101 && fee <= 500
            break
          case '501-1000':
            matchesFeeRange = fee >= 501 && fee <= 1000
            break
          case '1001-5000':
            matchesFeeRange = fee >= 1001 && fee <= 5000
            break
          case '5000+':
            matchesFeeRange = fee > 5000
            break
        }
      }

      return matchesSearch && matchesDepartment && matchesCategory && matchesFeeRange
    })

    // Sort services
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'department':
        filtered.sort((a, b) => a.department.localeCompare(b.department))
        break
      case 'fee':
        filtered.sort((a, b) => parseFee(a.fee) - parseFee(b.fee))
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'popular':
        filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
        break
    }

    return filtered
  }

  const filteredServices = getFilteredServices()

  const toggleDepartmentExpansion = (deptCode: string) => {
    setExpandedDepartments(prev => 
      prev.includes(deptCode) 
        ? prev.filter(code => code !== deptCode)
        : [...prev, deptCode]
    )
  }

  const handleServiceClick = (serviceId: string) => {
    // Always redirect to appointment booking page with the selected service
    router.push(`/appointments/book?service=${serviceId}`)
  }

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 scroll-container fade-in">
        {/* Header */}
        <div className="mb-8 slide-in-up">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Government Services</h1>
          <p className="text-xl text-blue-100">Discover and access various government services organized by departments.</p>
        </div>

        {/* Advanced Search and Filter */}
        <div className="mb-8 slide-in-right bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden hover-lift transition-smooth">
          <div className="px-8 py-6 border-b border-white/20 bg-white/5">
            <h2 className="text-2xl font-bold text-white drop-shadow-sm">Search & Filter Services</h2>
            <p className="text-blue-200 mt-2">Find services across all government departments</p>
          </div>
          <div className="p-8">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-blue-300" />
                <input
                  type="text"
                  placeholder="Search for services, departments, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-smooth"
                />
              </div>
            </div>

            {/* Filter Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Department Filter */}
              <div>
                <label className="block text-sm font-semibold text-blue-200 mb-2">Department</label>
                <div className="relative">
                  <BuildingOfficeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-smooth appearance-none cursor-pointer"
                  >
                    {departmentOptions.map(option => (
                      <option key={option.value} value={option.value} className="bg-slate-800 text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-blue-200 mb-2">Category</label>
                <div className="relative">
                  <TagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-smooth appearance-none cursor-pointer"
                  >
                    {categories.map(category => (
                      <option key={category} value={category} className="bg-slate-800 text-white">
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Fee Range Filter */}
              <div>
                <label className="block text-sm font-semibold text-blue-200 mb-2">Fee Range</label>
                <div className="relative">
                  <BanknotesIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                  <select
                    value={selectedFeeRange}
                    onChange={(e) => setSelectedFeeRange(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-smooth appearance-none cursor-pointer"
                  >
                    {feeRanges.map(range => (
                      <option key={range.value} value={range.value} className="bg-slate-800 text-white">
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-semibold text-blue-200 mb-2">Sort By</label>
                <div className="relative">
                  <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-smooth appearance-none cursor-pointer"
                  >
                    <option value="name" className="bg-slate-800 text-white">Name (A-Z)</option>
                    <option value="department" className="bg-slate-800 text-white">Department</option>
                    <option value="fee" className="bg-slate-800 text-white">Fee (Low to High)</option>
                    <option value="rating" className="bg-slate-800 text-white">Rating (High to Low)</option>
                    <option value="popular" className="bg-slate-800 text-white">Popularity</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Filter Summary */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200">
              <span>Showing {filteredServices.length} of {allServices.length} services</span>
              {searchTerm && <span>• Search: "{searchTerm}"</span>}
              {selectedDepartment !== 'all' && <span>• Department: {departmentOptions.find(d => d.value === selectedDepartment)?.label}</span>}
              {selectedCategory !== 'all' && <span>• Category: {selectedCategory}</span>}
              {selectedFeeRange !== 'all' && <span>• Fee: {feeRanges.find(f => f.value === selectedFeeRange)?.label}</span>}
            </div>
          </div>
        </div>

        {/* Popular Services */}
        {searchTerm === '' && selectedDepartment === 'all' && selectedCategory === 'all' && selectedFeeRange === 'all' && (
          <div className="mb-12 slide-in-left">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center drop-shadow-lg">
              <StarIcon className="h-8 w-8 text-yellow-400 mr-3" />
              Popular Services
              <span className="ml-3 text-lg text-blue-100">({popularServices.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {popularServices.map((service, index) => {
                const serviceIcon = getServiceIcon(service.id)
                const serviceColor = getDepartmentColor(service.departmentCode)
                return (
                  <div
                    key={service.id}
                    className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 hover-lift transition-smooth cursor-pointer"
                    onClick={() => handleServiceClick(service.id)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-16 h-16 ${serviceColor} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                      {serviceIcon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 drop-shadow-sm">{service.name}</h3>
                    <div className="flex items-center mb-3">
                      <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-blue-100 ml-1">{service.rating}</span>
                      <span className="ml-2 bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded-full font-semibold border border-yellow-400/30">
                        Popular
                      </span>
                    </div>
                    <p className="text-blue-200 text-sm mb-4 line-clamp-2">{service.description}</p>
                    <div className="space-y-2 text-sm text-blue-200">
                      <div className="flex items-center">
                        <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                        {getDepartments().find(dept => dept.code === service.departmentCode)?.name}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {service.duration}
                        </div>
                        <div className="flex items-center font-semibold text-blue-100">
                          <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                          {service.fee > 0 ? `Rs. ${service.fee.toLocaleString()}` : 'Free'}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Services by Department */}
        <div className="slide-in-up">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center drop-shadow-lg">
            <BuildingOfficeIcon className="h-8 w-8 text-blue-300 mr-3" />
            {filteredServices.length > 0 ? 'Services' : 'No Results Found'}
            {filteredServices.length > 0 && <span className="ml-3 text-lg text-blue-100">({filteredServices.length})</span>}
          </h2>

          {filteredServices.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-12 text-center">
              <MagnifyingGlassIcon className="mx-auto h-16 w-16 text-blue-200 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-sm">No services found</h3>
              <p className="text-blue-200 mb-6">Try adjusting your search terms or filters to find what you're looking for.</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedDepartment('all')
                  setSelectedCategory('all')
                  setSelectedFeeRange('all')
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-xl transition-smooth hover-lift shadow-lg"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Group filtered services by department */}
              {departments.map((department) => {
                const deptServices = filteredServices.filter(service => service.departmentCode === department.code)
                if (deptServices.length === 0) return null

                const isExpanded = expandedDepartments.includes(department.code)
                const DeptIcon = department.icon

                return (
                  <div key={department.code} className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden hover-lift transition-smooth">
                    {/* Department Header */}
                    <button
                      onClick={() => toggleDepartmentExpansion(department.code)}
                      className="w-full px-8 py-6 border-b border-white/20 bg-white/5 hover:bg-white/10 transition-smooth text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-12 h-12 ${department.color} rounded-xl flex items-center justify-center mr-4 shadow-lg`}>
                            <DeptIcon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white drop-shadow-sm">{department.name}</h3>
                            <p className="text-blue-200 mt-1">{department.description}</p>
                            <div className="flex items-center mt-2 text-sm text-blue-300">
                              <MapPinIcon className="h-4 w-4 mr-1" />
                              {department.location}
                              <span className="mx-3">•</span>
                              <span>{deptServices.length} services</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-blue-300">
                          {isExpanded ? <ChevronUpIcon className="h-6 w-6" /> : <ChevronDownIcon className="h-6 w-6" />}
                        </div>
                      </div>
                    </button>

                    {/* Services List */}
                    {isExpanded && (
                      <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {deptServices.map((service, index) => {
                            const serviceIcon = getServiceIcon(service.id)
                            const serviceColor = getDepartmentColor(service.departmentCode)
                            return (
                              <div
                                key={service.id}
                                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:bg-white/10 transition-smooth cursor-pointer"
                                onClick={() => handleServiceClick(service.id)}
                                style={{ animationDelay: `${index * 0.1}s` }}
                              >
                                <div className="flex items-start justify-between mb-4">
                                  <div className="flex items-center">
                                    <div className={`w-12 h-12 ${serviceColor} rounded-xl flex items-center justify-center mr-4 shadow-lg`}>
                                      {serviceIcon}
                                    </div>
                                    <div>
                                      <h4 className="text-xl font-bold text-white drop-shadow-sm">{service.name}</h4>
                                      <div className="flex items-center mt-1">
                                        <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                                        <span className="text-sm text-blue-100 ml-1">{service.rating}</span>
                                        {service.popular && (
                                          <span className="ml-2 bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded-full font-semibold border border-yellow-400/30">
                                            Popular
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <p className="text-blue-200 mb-4 text-lg">{service.description}</p>

                                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                  <div className="space-y-2">
                                    <div className="flex items-center text-blue-300">
                                      <ClockIcon className="h-4 w-4 mr-2" />
                                      <span className="font-semibold">Duration:</span>
                                    </div>
                                    <p className="text-blue-100 ml-6">{service.duration}</p>
                                  </div>

                                  <div className="space-y-2">
                                    <div className="flex items-center text-blue-300">
                                      <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                                      <span className="font-semibold">Fee:</span>
                                    </div>
                                    <p className="text-blue-100 ml-6 font-semibold">
                                      {service.fee > 0 ? `Rs. ${service.fee.toLocaleString()}` : 'Free'}
                                    </p>
                                  </div>

                                  <div className="space-y-2">
                                    <div className="flex items-center text-blue-300">
                                      <MapPinIcon className="h-4 w-4 mr-2" />
                                      <span className="font-semibold">Location:</span>
                                    </div>
                                    <p className="text-blue-100 ml-6">{service.location}</p>
                                  </div>

                                  <div className="space-y-2">
                                    <div className="flex items-center text-blue-300">
                                      <CalendarDaysIcon className="h-4 w-4 mr-2" />
                                      <span className="font-semibold">Hours:</span>
                                    </div>
                                    <p className="text-blue-100 ml-6">{service.availability}</p>
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <h5 className="font-semibold text-white mb-2 text-sm">Required Documents:</h5>
                                  <div className="flex flex-wrap gap-2">
                                    {service.requiredDocuments.map((req, reqIndex) => (
                                      <span key={reqIndex} className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-400/30">
                                        {req}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div className="flex gap-3">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleServiceClick(service.id)
                                    }}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl transition-smooth hover-lift shadow-lg flex items-center justify-center"
                                  >
                                    Book Appointment
                                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                                  </button>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Statistics */}
        {allServices.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6 slide-in-up">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 text-center hover-lift transition-smooth">
              <div className="text-4xl font-bold text-white mb-2 drop-shadow-sm">{departments.length}</div>
              <div className="text-blue-200 font-medium">Departments</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 text-center hover-lift transition-smooth">
              <div className="text-4xl font-bold text-blue-400 mb-2 drop-shadow-sm">{allServices.length}</div>
              <div className="text-blue-200 font-medium">Total Services</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 text-center hover-lift transition-smooth">
              <div className="text-4xl font-bold text-emerald-400 mb-2 drop-shadow-sm">{filteredServices.length}</div>
              <div className="text-blue-200 font-medium">Showing Services</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 text-center hover-lift transition-smooth">
              <div className="text-4xl font-bold text-yellow-400 mb-2 drop-shadow-sm">{popularServices.length}</div>
              <div className="text-blue-200 font-medium">Popular Services</div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
