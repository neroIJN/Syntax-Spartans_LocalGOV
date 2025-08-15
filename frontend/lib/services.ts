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
  },

  // FREE SERVICES - Community Services
  {
    id: 'community-health-consultation',
    name: 'Community Health Consultation',
    department: 'Public Health Department',
    departmentCode: 'PHD',
    duration: '30 minutes',
    fee: 0,
    description: 'Free health consultation and basic medical advice from community health officers.',
    requiredDocuments: ['National ID', 'Medical History (if available)'],
    category: 'Health Services',
    rating: 4.7,
    popular: true,
    location: 'Health Center',
    availability: 'Mon-Fri 8:00-16:00'
  },
  {
    id: 'vaccination-consultation',
    name: 'Vaccination Information & Scheduling',
    department: 'Public Health Department',
    departmentCode: 'PHD',
    duration: '20 minutes',
    fee: 0,
    description: 'Free consultation about vaccination schedules and immunization programs.',
    requiredDocuments: ['National ID', 'Vaccination Card (if available)'],
    category: 'Health Services',
    rating: 4.8,
    popular: true,
    location: 'Immunization Counter',
    availability: 'Mon-Fri 8:00-16:00'
  },
  {
    id: 'maternal-health-guidance',
    name: 'Maternal Health Guidance',
    department: 'Public Health Department',
    departmentCode: 'PHD',
    duration: '45 minutes',
    fee: 0,
    description: 'Free guidance and consultation for expectant mothers and new parents.',
    requiredDocuments: ['National ID', 'Medical Records (if available)'],
    category: 'Health Services',
    rating: 4.9,
    popular: true,
    location: 'Maternal Health Unit',
    availability: 'Mon-Fri 9:00-15:00'
  },

  // FREE SERVICES - Information & Guidance
  {
    id: 'citizen-information-service',
    name: 'Citizen Information Service',
    department: 'Divisional Secretariat',
    departmentCode: 'DS',
    duration: '20 minutes',
    fee: 0,
    description: 'Free information and guidance about government services and procedures.',
    requiredDocuments: ['National ID'],
    category: 'Information Services',
    rating: 4.6,
    popular: true,
    location: 'Information Desk',
    availability: 'Mon-Fri 8:30-16:30'
  },
  {
    id: 'legal-aid-consultation',
    name: 'Legal Aid Consultation',
    department: 'Legal Aid Commission',
    departmentCode: 'LAC',
    duration: '30 minutes',
    fee: 0,
    description: 'Free legal advice and consultation for citizens who cannot afford legal services.',
    requiredDocuments: ['National ID', 'Income Certificate (if applicable)'],
    category: 'Legal Services',
    rating: 4.5,
    popular: true,
    location: 'Legal Aid Office',
    availability: 'Mon-Fri 9:00-15:00'
  },
  {
    id: 'document-guidance',
    name: 'Document Application Guidance',
    department: 'Divisional Secretariat',
    departmentCode: 'DS',
    duration: '15 minutes',
    fee: 0,
    description: 'Free guidance on how to apply for various government documents and certificates.',
    requiredDocuments: ['National ID'],
    category: 'Information Services',
    rating: 4.4,
    popular: true,
    location: 'Help Desk',
    availability: 'Mon-Fri 8:30-16:30'
  },

  // FREE SERVICES - Social Welfare
  {
    id: 'social-welfare-consultation',
    name: 'Social Welfare Benefits Consultation',
    department: 'Social Welfare Department',
    departmentCode: 'SWD',
    duration: '30 minutes',
    fee: 0,
    description: 'Free consultation about available social welfare programs and benefits.',
    requiredDocuments: ['National ID', 'Income Documents'],
    category: 'Social Services',
    rating: 4.6,
    popular: true,
    location: 'Welfare Office',
    availability: 'Mon-Fri 9:00-16:00'
  },
  {
    id: 'elderly-support-consultation',
    name: 'Elderly Support Services Consultation',
    department: 'Social Welfare Department',
    departmentCode: 'SWD',
    duration: '25 minutes',
    fee: 0,
    description: 'Free consultation about support services available for elderly citizens.',
    requiredDocuments: ['National ID', 'Age Verification'],
    category: 'Social Services',
    rating: 4.7,
    popular: false,
    location: 'Elderly Services Counter',
    availability: 'Mon-Fri 9:00-15:00'
  },
  {
    id: 'disability-support-consultation',
    name: 'Disability Support Services Consultation',
    department: 'Social Welfare Department',
    departmentCode: 'SWD',
    duration: '35 minutes',
    fee: 0,
    description: 'Free consultation about support services and benefits for persons with disabilities.',
    requiredDocuments: ['National ID', 'Medical Certificate (if available)'],
    category: 'Social Services',
    rating: 4.8,
    popular: false,
    location: 'Disability Services Office',
    availability: 'Mon-Fri 9:00-16:00'
  },

  // FREE SERVICES - Agricultural & Rural Development
  {
    id: 'agricultural-extension-service',
    name: 'Agricultural Extension Service',
    department: 'Agriculture Department',
    departmentCode: 'AD',
    duration: '40 minutes',
    fee: 0,
    description: 'Free consultation and guidance for farmers on modern agricultural practices.',
    requiredDocuments: ['National ID', 'Land Documents (if applicable)'],
    category: 'Agricultural Services',
    rating: 4.5,
    popular: false,
    location: 'Extension Office',
    availability: 'Mon-Fri 8:00-16:00'
  },
  {
    id: 'crop-advisory-service',
    name: 'Crop Advisory Service',
    department: 'Agriculture Department',
    departmentCode: 'AD',
    duration: '30 minutes',
    fee: 0,
    description: 'Free advice on crop selection, pest control, and farming techniques.',
    requiredDocuments: ['National ID', 'Farm Details'],
    category: 'Agricultural Services',
    rating: 4.4,
    popular: false,
    location: 'Agricultural Office',
    availability: 'Mon-Fri 8:00-16:00'
  },
  {
    id: 'livestock-advisory-service',
    name: 'Livestock Advisory Service',
    department: 'Animal Husbandry Department',
    departmentCode: 'AHD',
    duration: '35 minutes',
    fee: 0,
    description: 'Free consultation on livestock management, animal health, and breeding.',
    requiredDocuments: ['National ID', 'Livestock Details (if applicable)'],
    category: 'Agricultural Services',
    rating: 4.3,
    popular: false,
    location: 'Veterinary Office',
    availability: 'Mon-Fri 8:00-15:00'
  },

  // FREE SERVICES - Environmental Services
  {
    id: 'environmental-complaint',
    name: 'Environmental Complaint Registration',
    department: 'Environmental Authority',
    departmentCode: 'EA',
    duration: '25 minutes',
    fee: 0,
    description: 'Free registration of environmental complaints and pollution reports.',
    requiredDocuments: ['National ID', 'Evidence/Photos (if available)'],
    category: 'Environmental Services',
    rating: 4.2,
    popular: false,
    location: 'Environmental Office',
    availability: 'Mon-Fri 9:00-16:00'
  },
  {
    id: 'waste-management-guidance',
    name: 'Waste Management Guidance',
    department: 'Municipal Council',
    departmentCode: 'MC',
    duration: '20 minutes',
    fee: 0,
    description: 'Free guidance on proper waste disposal and recycling practices.',
    requiredDocuments: ['National ID'],
    category: 'Environmental Services',
    rating: 4.1,
    popular: false,
    location: 'Municipal Office',
    availability: 'Mon-Fri 8:30-16:00'
  },

  // FREE SERVICES - Employment & Training
  {
    id: 'job-placement-consultation',
    name: 'Job Placement Consultation',
    department: 'Employment Services',
    departmentCode: 'ES',
    duration: '30 minutes',
    fee: 0,
    description: 'Free consultation and assistance with job placement and career guidance.',
    requiredDocuments: ['National ID', 'Educational Certificates', 'CV'],
    category: 'Employment Services',
    rating: 4.3,
    popular: true,
    location: 'Employment Center',
    availability: 'Mon-Fri 9:00-16:00'
  },
  {
    id: 'skills-training-information',
    name: 'Skills Training Program Information',
    department: 'Vocational Training Authority',
    departmentCode: 'VTA',
    duration: '25 minutes',
    fee: 0,
    description: 'Free information about available skills training and vocational programs.',
    requiredDocuments: ['National ID', 'Educational Certificates'],
    category: 'Employment Services',
    rating: 4.4,
    popular: true,
    location: 'Training Center',
    availability: 'Mon-Fri 9:00-15:00'
  },

  // FREE SERVICES - Public Utilities
  {
    id: 'water-connection-inquiry',
    name: 'Water Connection Inquiry',
    department: 'Water Supply Board',
    departmentCode: 'WSB',
    duration: '20 minutes',
    fee: 0,
    description: 'Free inquiry and information about water connection procedures and requirements.',
    requiredDocuments: ['National ID', 'Property Documents'],
    category: 'Utility Services',
    rating: 4.0,
    popular: false,
    location: 'Water Board Office',
    availability: 'Mon-Fri 8:30-16:00'
  },
  {
    id: 'electricity-connection-inquiry',
    name: 'Electricity Connection Inquiry',
    department: 'Ceylon Electricity Board',
    departmentCode: 'CEB',
    duration: '20 minutes',
    fee: 0,
    description: 'Free inquiry about electricity connection procedures and requirements.',
    requiredDocuments: ['National ID', 'Property Documents'],
    category: 'Utility Services',
    rating: 4.1,
    popular: false,
    location: 'CEB Office',
    availability: 'Mon-Fri 8:30-16:00'
  },

  // FREE SERVICES - Women & Children
  {
    id: 'women-empowerment-consultation',
    name: 'Women Empowerment Consultation',
    department: 'Women Affairs Department',
    departmentCode: 'WAD',
    duration: '30 minutes',
    fee: 0,
    description: 'Free consultation about women empowerment programs and support services.',
    requiredDocuments: ['National ID'],
    category: 'Social Services',
    rating: 4.6,
    popular: true,
    location: 'Women Affairs Office',
    availability: 'Mon-Fri 9:00-16:00'
  },
  {
    id: 'child-welfare-consultation',
    name: 'Child Welfare Consultation',
    department: 'Department of Probation',
    departmentCode: 'DP',
    duration: '35 minutes',
    fee: 0,
    description: 'Free consultation about child welfare services and protection programs.',
    requiredDocuments: ['National ID', 'Child Birth Certificate'],
    category: 'Social Services',
    rating: 4.7,
    popular: false,
    location: 'Probation Office',
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
