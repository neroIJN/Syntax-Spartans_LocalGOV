'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  CreditCardIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from '@/components/DashboardLayout'

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('appointmentId')
  
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock appointment and fee data matching the screenshot
  const appointmentData = {
    id: appointmentId || 'APT-001',
    service: 'National Identity Card Renewal',
    date: '2025-08-20',
    time: '10:00 AM',
    location: 'Colombo Divisional Secretariat'
  }

  const feeBreakdown = {
    appointmentFee: 25.00,
    serviceCharge: 2.50,
    total: 27.50
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
      if (formattedValue.length <= 19) {
        setFormData(prev => ({ ...prev, [name]: formattedValue }))
      }
      return
    }
    
    if (name === 'expiryDate') {
      const formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2')
      if (formattedValue.length <= 5) {
        setFormData(prev => ({ ...prev, [name]: formattedValue }))
      }
      return
    }
    
    if (name === 'cvv') {
      const formattedValue = value.replace(/\D/g, '')
      if (formattedValue.length <= 3) {
        setFormData(prev => ({ ...prev, [name]: formattedValue }))
      }
      return
    }
    
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      router.push('/payment/success?appointmentId=' + appointmentData.id)
    }, 3000)
  }

  const isFormValid = () => {
    if (paymentMethod === 'credit-card') {
      return formData.cardNumber.replace(/\s/g, '').length >= 13 &&
             formData.expiryDate.length === 5 &&
             formData.cvv.length === 3 &&
             formData.cardholderName.trim().length > 0
    }
    return true
  }

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 scroll-container fade-in">
        {/* Header */}
        <div className="mb-8 slide-in-up">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.back()}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-smooth hover-lift"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                Appointment Fee Payment
              </h1>
              <p className="text-xl text-blue-100">
                Please review the fee breakdown and proceed with payment to confirm your appointment.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Fee Breakdown Section */}
            <div className="lg:col-span-1 slide-in-right">
              {/* Appointment Details */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 mb-6 hover-lift transition-smooth">
                <h3 className="text-xl font-bold text-white mb-4 drop-shadow-sm">
                  Appointment Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Service:</span>
                    <span className="text-white font-medium text-right max-w-[150px]">{appointmentData.service}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Date:</span>
                    <span className="text-white font-medium">{appointmentData.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Time:</span>
                    <span className="text-white font-medium">{appointmentData.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Location:</span>
                    <span className="text-white font-medium text-right max-w-[150px]">{appointmentData.location}</span>
                  </div>
                </div>
              </div>

              {/* Fee Breakdown */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 hover-lift transition-smooth">
                <h3 className="text-xl font-bold text-white mb-6 drop-shadow-sm">
                  Fee Breakdown
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-blue-200">Appointment Fee</span>
                    <span className="text-white font-medium">${feeBreakdown.appointmentFee.toFixed(2)}</span>
                  </div>
                  
                  <div className="w-full h-px bg-white/20"></div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-blue-200">Service Charge</span>
                    <span className="text-white font-medium">${feeBreakdown.serviceCharge.toFixed(2)}</span>
                  </div>
                  
                  <div className="w-full h-px bg-white/20"></div>
                  
                  <div className="flex justify-between items-center py-3 mt-4">
                    <span className="text-lg font-bold text-white">Total Amount</span>
                    <span className="text-lg font-bold text-white">${feeBreakdown.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form Section */}
            <div className="lg:col-span-2 slide-in-left">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 hover-lift transition-smooth">
                <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-sm">
                  Payment Method
                </h3>

                {/* Payment Method Selection */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <button
                    onClick={() => setPaymentMethod('credit-card')}
                    className={`p-4 rounded-xl border-2 transition-smooth hover-lift flex flex-col items-center gap-2 ${
                      paymentMethod === 'credit-card'
                        ? 'border-blue-400 bg-blue-500/20 text-white'
                        : 'border-white/30 hover:border-white/50 text-white/70 hover:text-white'
                    }`}
                  >
                    <CreditCardIcon className="h-6 w-6" />
                    <span className="font-medium text-sm">Credit/Debit Card</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('online-banking')}
                    className={`p-4 rounded-xl border-2 transition-smooth hover-lift flex flex-col items-center gap-2 ${
                      paymentMethod === 'online-banking'
                        ? 'border-blue-400 bg-blue-500/20 text-white'
                        : 'border-white/30 hover:border-white/50 text-white/70 hover:text-white'
                    }`}
                  >
                    <BanknotesIcon className="h-6 w-6" />
                    <span className="font-medium text-sm">Online Banking</span>
                  </button>
                </div>

                {/* Credit Card Form */}
                {paymentMethod === 'credit-card' && (
                  <div className="space-y-6 fade-in">
                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="Enter card number"
                        className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-smooth"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-200 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-smooth"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-200 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="CVV"
                          className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-smooth"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-200 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        name="cardholderName"
                        value={formData.cardholderName}
                        onChange={handleInputChange}
                        placeholder="Enter cardholder name"
                        className="w-full px-4 py-3 bg-white/5 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-smooth"
                      />
                    </div>
                  </div>
                )}

                {/* Online Banking Info */}
                {paymentMethod === 'online-banking' && (
                  <div className="text-center py-8 fade-in">
                    <BanknotesIcon className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <p className="text-blue-200 mb-4">
                      You will be redirected to your bank's secure payment portal
                    </p>
                    <p className="text-sm text-blue-300">
                      Supported banks: Commercial Bank, People's Bank, Bank of Ceylon, HNB
                    </p>
                  </div>
                )}

                {/* Security Notice */}
                <div className="flex items-center gap-3 mt-6 p-4 bg-green-500/20 border border-green-400/30 rounded-xl">
                  <ShieldCheckIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <p className="text-sm text-green-100">
                    Your payment is secure and encrypted.
                  </p>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handlePayment}
                  disabled={!isFormValid() || isProcessing}
                  className={`w-full mt-6 py-4 px-6 rounded-xl font-semibold text-lg transition-smooth hover-lift ${
                    isFormValid() && !isProcessing
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircleIcon className="h-5 w-5" />
                      Pay Now
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 slide-in-up">
            <div className="flex items-start gap-3">
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white font-semibold mb-2">Important Information</h4>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• Payment must be completed to confirm your appointment</li>
                  <li>• Refunds are available up to 24 hours before the appointment</li>
                  <li>• You will receive a confirmation email after successful payment</li>
                  <li>• For technical issues, contact our support team at support@localgov.lk</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
