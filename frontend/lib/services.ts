// Service configuration with fee information
export interface ServiceConfig {
  id: string
  name: string
  department: string
  duration: string
  fee: number // 0 means free
  description: string
  requiredDocuments: string[]
  category: 'identity' | 'civil' | 'business' | 'land' | 'other'
}

export const services: ServiceConfig[] = [
  {
    id: 'national-id',
    name: 'National Identity Card Application',
    department: 'Divisional Secretariat',
    duration: '1 hour',
    fee: 500.00,
    description: 'Apply for a new National Identity Card or renewal',
    requiredDocuments: ['Birth Certificate', 'Proof of Address', 'Photos'],
    category: 'identity'
  },
  {
    id: 'birth-certificate',
    name: 'Birth Certificate Application',
    department: 'Grama Niladhari Office',
    duration: '30 minutes',
    fee: 200.00,
    description: 'Obtain an official birth certificate',
    requiredDocuments: ['Hospital Birth Record', 'Parents ID Cards'],
    category: 'civil'
  },
  {
    id: 'marriage-registration',
    name: 'Marriage Registration',
    department: 'Grama Niladhari Office',
    duration: '1 hour',
    fee: 0, // Free service
    description: 'Register your marriage officially',
    requiredDocuments: ['Birth Certificates', 'Witness IDs', 'Photos'],
    category: 'civil'
  },
  {
    id: 'land-registration',
    name: 'Land Registration Inquiry',
    department: 'Divisional Secretariat',
    duration: '1.5 hours',
    fee: 1500.00,
    description: 'Inquire about land ownership and registration',
    requiredDocuments: ['Land Deed', 'Survey Plan', 'ID Card'],
    category: 'land'
  },
  {
    id: 'business-registration',
    name: 'Business Registration',
    department: 'Divisional Secretariat',
    duration: '1 hour',
    fee: 2500.00,
    description: 'Register a new business entity',
    requiredDocuments: ['Business Plan', 'ID Card', 'Address Proof'],
    category: 'business'
  },
  {
    id: 'income-certificate',
    name: 'Income Certificate',
    department: 'Grama Niladhari Office',
    duration: '45 minutes',
    fee: 0, // Free service
    description: 'Obtain an official income certificate',
    requiredDocuments: ['Salary Slips', 'ID Card', 'Bank Statements'],
    category: 'civil'
  },
  {
    id: 'residence-certificate',
    name: 'Residence Certificate',
    department: 'Grama Niladhari Office',
    duration: '30 minutes',
    fee: 0, // Free service
    description: 'Prove your residence for official purposes',
    requiredDocuments: ['Utility Bills', 'ID Card', 'Rental Agreement'],
    category: 'civil'
  }
]

export const getServiceById = (id: string): ServiceConfig | undefined => {
  return services.find(service => service.id === id)
}

export const getServicesByCategory = (category: string): ServiceConfig[] => {
  return services.filter(service => service.category === category)
}

export const getServicesWithFees = (): ServiceConfig[] => {
  return services.filter(service => service.fee > 0)
}

export const getFreeServices = (): ServiceConfig[] => {
  return services.filter(service => service.fee === 0)
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
