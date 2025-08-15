// Service configuration with fee information
export interface ServiceConfig {
  id: string
  name: string
  department: string
  departmentCode: string
  duration: string
  fee: number // 0 means free
  description: string
  requiredDocuments: string[]
  category: string
  rating: number
  popular: boolean
  location: string
  availability: string
}

export const services: ServiceConfig[] = [
  // Divisional Secretariat Services
  {
    id: 'national-id',
    name: 'National Identity Card',
    department: 'Divisional Secretariat',
    departmentCode: 'DS',
    duration: '45 minutes',
    fee: 500,
    description: 'Apply for a new National Identity Card or replace an existing one.',
    requiredDocuments: ['Birth Certificate', 'Proof of Address', 'Two Passport Photos'],
    category: 'Identity Services',
    rating: 4.8,
    popular: true,
    location: 'Counter 1-3',
    availability: 'Mon-Fri 9:00-15:00'
  },
  {
    id: 'grama-niladhari-certificate',
    name: 'Grama Niladhari Certificate',
    department: 'Divisional Secretariat',
    departmentCode: 'DS',
    duration: '30 minutes',
    fee: 100,
    description: 'Official certificate from Grama Niladhari for various purposes.',
    requiredDocuments: ['National ID', 'Application Form'],
    category: 'Certificates',
    rating: 4.7,
    popular: true,
    location: 'Counter 4-5',
    availability: 'Mon-Fri 9:00-16:00'
  },
  
  // Grama Niladhari Office Services
  {
    id: 'birth-certificate',
    name: 'Birth Certificate',
    department: 'Grama Niladhari Office',
    departmentCode: 'GN',
    duration: '30 minutes',
    fee: 100,
    description: 'Obtain an official birth certificate for various purposes.',
    requiredDocuments: ['Baptism Certificate', 'Hospital Birth Report'],
    category: 'Civil Registration',
    rating: 4.7,
    popular: true,
    location: 'Registration Counter',
    availability: 'Mon-Fri 8:30-16:00'
  },
  {
    id: 'marriage-registration',
    name: 'Marriage Registration',
    department: 'Grama Niladhari Office',
    departmentCode: 'GN',
    duration: '1 hour',
    fee: 200,
    description: 'Register your marriage officially with government records.',
    requiredDocuments: ['Birth Certificates', 'Witness Documents', 'Application Form'],
    category: 'Civil Registration',
    rating: 4.9,
    popular: false,
    location: 'Registration Counter',
    availability: 'Mon-Fri 9:00-15:00'
  },
  {
    id: 'death-certificate',
    name: 'Death Certificate',
    department: 'Grama Niladhari Office',
    departmentCode: 'GN',
    duration: '30 minutes',
    fee: 150,
    description: 'Obtain an official death certificate for legal purposes.',
    requiredDocuments: ['Medical Certificate', 'Application Form', 'Identification'],
    category: 'Civil Registration',
    rating: 4.8,
    popular: false,
    location: 'Registration Counter',
    availability: 'Mon-Fri 8:30-16:00'
  },
  
  // Immigration Department Services
  {
    id: 'passport-application',
    name: 'Passport Application',
    department: 'Immigration Department',
    departmentCode: 'ID',
    duration: '2 hours',
    fee: 3500,
    description: 'Apply for a new passport or renew your existing passport.',
    requiredDocuments: ['National ID', 'Birth Certificate', 'Passport Photos'],
    category: 'Identity Services',
    rating: 4.6,
    popular: true,
    location: 'Passport Office',
    availability: 'Mon-Fri 8:00-14:00'
  },
  {
    id: 'passport-renewal',
    name: 'Passport Renewal',
    department: 'Immigration Department',
    departmentCode: 'ID',
    duration: '1.5 hours',
    fee: 3000,
    description: 'Renew your existing passport with updated information.',
    requiredDocuments: ['Current Passport', 'National ID', 'Passport Photos'],
    category: 'Identity Services',
    rating: 4.5,
    popular: false,
    location: 'Passport Office',
    availability: 'Mon-Fri 8:00-14:00'
  },
  
  // Registrar of Companies Services
  {
    id: 'business-registration',
    name: 'Business Registration',
    department: 'Registrar of Companies',
    departmentCode: 'RC',
    duration: '1.5 hours',
    fee: 2000,
    description: 'Register a new business or company with the government.',
    requiredDocuments: ['Business Plan', 'Address Proof', 'Director Details'],
    category: 'Business Services',
    rating: 4.5,
    popular: false,
    location: 'Registration Desk',
    availability: 'Mon-Fri 9:00-15:00'
  },
  {
    id: 'company-name-search',
    name: 'Company Name Search',
    department: 'Registrar of Companies',
    departmentCode: 'RC',
    duration: '15 minutes',
    fee: 100,
    description: 'Search and reserve company names for registration.',
    requiredDocuments: ['Proposed Names List', 'Application Form'],
    category: 'Business Services',
    rating: 4.3,
    popular: false,
    location: 'Information Desk',
    availability: 'Mon-Fri 9:00-16:00'
  },
  
  // Land Registry Services
  {
    id: 'land-registration',
    name: 'Land Registration',
    department: 'Land Registry',
    departmentCode: 'LR',
    duration: '2 hours',
    fee: 1500,
    description: 'Register land ownership or check land ownership details.',
    requiredDocuments: ['Survey Plan', 'Previous Deed', 'Tax Receipts'],
    category: 'Property Services',
    rating: 4.4,
    popular: false,
    location: 'Registry Counter',
    availability: 'Mon-Fri 9:00-15:00'
  },
  {
    id: 'land-title-search',
    name: 'Land Title Search',
    department: 'Land Registry',
    departmentCode: 'LR',
    duration: '1 hour',
    fee: 500,
    description: 'Search and verify land title and ownership information.',
    requiredDocuments: ['Plot Number', 'Survey Number', 'Application Form'],
    category: 'Property Services',
    rating: 4.2,
    popular: false,
    location: 'Search Counter',
    availability: 'Mon-Fri 9:00-16:00'
  },
  
  // Police Department Services
  {
    id: 'police-clearance',
    name: 'Police Clearance Certificate',
    department: 'Police Department',
    departmentCode: 'PD',
    duration: '1 hour',
    fee: 500,
    description: 'Obtain a police clearance certificate for various purposes.',
    requiredDocuments: ['National ID', 'Application Form', 'Passport Photos'],
    category: 'Security Services',
    rating: 4.6,
    popular: true,
    location: 'CID Office',
    availability: 'Mon-Fri 9:00-15:00'
  },
  {
    id: 'character-certificate',
    name: 'Character Certificate',
    department: 'Police Department',
    departmentCode: 'PD',
    duration: '45 minutes',
    fee: 300,
    description: 'Official character certificate from local police.',
    requiredDocuments: ['National ID', 'Application Form', 'Grama Niladhari Certificate'],
    category: 'Security Services',
    rating: 4.4,
    popular: false,
    location: 'Local Police Station',
    availability: 'Mon-Fri 9:00-16:00'
  },
  
  // Education Department Services
  {
    id: 'school-certificate',
    name: 'School Leaving Certificate',
    department: 'Education Department',
    departmentCode: 'ED',
    duration: '30 minutes',
    fee: 50,
    description: 'Official school leaving certificate for students.',
    requiredDocuments: ['Student Records', 'Application Form', 'School ID'],
    category: 'Educational Services',
    rating: 4.5,
    popular: false,
    location: 'Certificate Counter',
    availability: 'Mon-Fri 9:00-16:00'
  },
  {
    id: 'education-verification',
    name: 'Education Verification',
    department: 'Education Department',
    departmentCode: 'ED',
    duration: '1 hour',
    fee: 200,
    description: 'Verify educational qualifications and certificates.',
    requiredDocuments: ['Original Certificates', 'Application Form', 'National ID'],
    category: 'Educational Services',
    rating: 4.3,
    popular: false,
    location: 'Verification Office',
    availability: 'Mon-Fri 9:00-15:00'
  }
]

export const getServiceById = (id: string): ServiceConfig | undefined => {
  return services.find(service => service.id === id)
}

export const getServicesByCategory = (category: string): ServiceConfig[] => {
  return services.filter(service => service.category === category)
}

export const getServicesByDepartment = (departmentCode: string): ServiceConfig[] => {
  return services.filter(service => service.departmentCode === departmentCode)
}

export const getServicesWithFees = (): ServiceConfig[] => {
  return services.filter(service => service.fee > 0)
}

export const getFreeServices = (): ServiceConfig[] => {
  return services.filter(service => service.fee === 0)
}

export const getPopularServices = (): ServiceConfig[] => {
  return services.filter(service => service.popular)
}

export const calculateTotalFee = (serviceId: string): { appointmentFee: number, serviceCharge: number, total: number } => {
  const service = getServiceById(serviceId)
  if (!service || service.fee === 0) {
    return { appointmentFee: 0, serviceCharge: 0, total: 0 }
  }
  
  const appointmentFee = service.fee
  const serviceCharge = Math.round(appointmentFee * 0.1) // 10% service charge, rounded to nearest rupee
  const total = appointmentFee + serviceCharge
  
  return { appointmentFee, serviceCharge, total }
}

// Get all unique departments
export const getDepartments = () => {
  const departmentMap = new Map()
  
  services.forEach(service => {
    if (!departmentMap.has(service.departmentCode)) {
      departmentMap.set(service.departmentCode, {
        code: service.departmentCode,
        name: service.department,
        services: []
      })
    }
    departmentMap.get(service.departmentCode).services.push(service)
  })
  
  return Array.from(departmentMap.values())
}

// Get all unique categories
export const getCategories = (): string[] => {
  return Array.from(new Set(services.map(service => service.category)))
}
