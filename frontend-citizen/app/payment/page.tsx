'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  CreditCardIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from '@/components/DashboardLayout'

export default function PaymentPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    bankUsername: '',
    bankPassword: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock fee breakdown
  const feeBreakdown = {
    appointmentFee: 25.00,
    serviceCharge: 2.50,
    total: 27.50
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      router.push('/payment/success')
    }, 3000)
  }

  const isFormValid = () => {
    if (paymentMethod === 'credit-card') {
      return formData.cardNumber && formData.expiryDate && formData.cvv && formData.cardholderName
    } else {
      return formData.bankUsername && formData.bankPassword
    }
  }

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back
            </button>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Appointment Fee Payment</h1>
            <p className="text-xl text-slate-700">
              Please review the fee breakdown and proceed with payment to confirm your appointment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Fee Breakdown */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
                  <h2 className="text-xl font-bold text-slate-900">Fee Breakdown</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-700 font-medium">Appointment Fee</span>
                    <span className="text-slate-900 font-semibold">Rs. {feeBreakdown.appointmentFee.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-700 font-medium">Service Charge</span>
                    <span className="text-slate-900 font-semibold">Rs. {feeBreakdown.serviceCharge.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-t-2 border-slate-300">
                    <span className="text-lg font-bold text-slate-900">Total Amount</span>
                    <span className="text-xl font-bold text-blue-600">Rs. {feeBreakdown.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border-2 border-emerald-100 overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-emerald-50">
                  <h2 className="text-2xl font-bold text-slate-900">Payment Method</h2>
                </div>
                
                <div className="p-8">
                  {/* Payment Method Selection */}
                  <div className="mb-8">
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setPaymentMethod('credit-card')}
                        className={`p-6 rounded-xl border-2 flex items-center justify-center space-x-3 transition-all duration-200 ${
                          paymentMethod === 'credit-card'
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-slate-300 bg-slate-50 text-slate-600 hover:border-emerald-300'
                        }`}
                      >
                        <CreditCardIcon className="h-8 w-8" />
                        <span className="font-semibold text-lg">Credit/Debit Card</span>
                      </button>
                      
                      <button
                        onClick={() => setPaymentMethod('online-banking')}
                        className={`p-6 rounded-xl border-2 flex items-center justify-center space-x-3 transition-all duration-200 ${
                          paymentMethod === 'online-banking'
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-slate-300 bg-slate-50 text-slate-600 hover:border-emerald-300'
                        }`}
                      >
                        <BanknotesIcon className="h-8 w-8" />
                        <span className="font-semibold text-lg">Online Banking</span>
                      </button>
                    </div>
                  </div>

                  {/* Credit Card Form */}
                  {paymentMethod === 'credit-card' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-lg font-semibold text-slate-900 mb-3">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="Enter card number"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          className="block w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-lg font-semibold text-slate-900 mb-3">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            className="block w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-lg font-semibold text-slate-900 mb-3">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="CVV"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            className="block w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-lg font-semibold text-slate-900 mb-3">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter cardholder name"
                          value={formData.cardholderName}
                          onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                          className="block w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm"
                        />
                      </div>
                    </div>
                  )}

                  {/* Online Banking Form */}
                  {paymentMethod === 'online-banking' && (
                    <div className="space-y-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start space-x-3">
                          <ExclamationCircleIcon className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-blue-800 mb-1">Secure Online Banking</h4>
                            <p className="text-blue-700 text-sm">
                              You will be redirected to your bank's secure login page to complete the payment.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-lg font-semibold text-slate-900 mb-3">
                          Bank Username
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your bank username"
                          value={formData.bankUsername}
                          onChange={(e) => handleInputChange('bankUsername', e.target.value)}
                          className="block w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-lg font-semibold text-slate-900 mb-3">
                          Password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter your bank password"
                          value={formData.bankPassword}
                          onChange={(e) => handleInputChange('bankPassword', e.target.value)}
                          className="block w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                        />
                      </div>
                    </div>
                  )}

                  {/* Security Notice */}
                  <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <ShieldCheckIcon className="h-6 w-6 text-green-600" />
                      <span className="text-green-700 font-medium">
                        Your payment is secure and encrypted.
                      </span>
                    </div>
                  </div>

                  {/* Pay Button */}
                  <div className="mt-8">
                    <button
                      onClick={handlePayment}
                      disabled={!isFormValid() || isProcessing}
                      className={`w-full py-4 text-xl font-bold rounded-xl transition-all duration-200 shadow-xl ${
                        isFormValid() && !isProcessing
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                          : 'bg-slate-400 text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center space-x-3">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                          <span>Processing Payment...</span>
                        </div>
                      ) : (
                        `Pay Now - Rs. ${feeBreakdown.total.toFixed(2)}`
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
