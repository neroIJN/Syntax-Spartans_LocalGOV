'use client'

import Link from 'next/link'
import { 
  CheckCircleIcon,
  PrinterIcon,
  EyeIcon,
  CreditCardIcon,
  CalendarDaysIcon,
  ClockIcon,
  HashtagIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from '@/components/DashboardLayout'

export default function PaymentSuccessPage() {
  // Mock payment data
  const paymentData = {
    amountPaid: 'Rs. 500.00',
    paymentMethod: 'Credit Card',
    service: 'Grama Niladhari Service',
    date: '2024-07-20',
    time: '10:00 AM',
    transactionId: 'TXN123456790',
    appointmentReference: 'APP976543210'
  }

  const handlePrintReceipt = () => {
    window.print()
  }

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <CheckCircleIcon className="h-16 w-16 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Payment Successful</h1>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto">
              Your payment has been successfully processed. You will receive a confirmation email shortly.
            </p>
          </div>

          {/* Payment Details */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-emerald-200 overflow-hidden mb-8">
            <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-green-50">
              <h2 className="text-2xl font-bold text-slate-900">Payment Details</h2>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <span className="block text-lg font-semibold text-slate-700 mb-2">Amount Paid</span>
                    <div className="flex items-center space-x-3">
                      <BanknotesIcon className="h-6 w-6 text-emerald-500" />
                      <span className="text-2xl font-bold text-emerald-600">{paymentData.amountPaid}</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="block text-lg font-semibold text-slate-700 mb-2">Payment Method</span>
                    <div className="flex items-center space-x-3">
                      <CreditCardIcon className="h-6 w-6 text-blue-500" />
                      <span className="text-xl text-slate-900">{paymentData.paymentMethod}</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="block text-lg font-semibold text-slate-700 mb-2">Service</span>
                    <span className="text-xl text-slate-900">{paymentData.service}</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <span className="block text-lg font-semibold text-slate-700 mb-2">Date</span>
                    <div className="flex items-center space-x-3">
                      <CalendarDaysIcon className="h-6 w-6 text-purple-500" />
                      <span className="text-xl text-slate-900">{paymentData.date}</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="block text-lg font-semibold text-slate-700 mb-2">Time</span>
                    <div className="flex items-center space-x-3">
                      <ClockIcon className="h-6 w-6 text-orange-500" />
                      <span className="text-xl text-slate-900">{paymentData.time}</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="block text-lg font-semibold text-slate-700 mb-2">Transaction ID</span>
                    <div className="flex items-center space-x-3">
                      <HashtagIcon className="h-6 w-6 text-indigo-500" />
                      <span className="text-xl text-slate-900 font-mono bg-slate-100 px-3 py-1 rounded-lg">
                        {paymentData.transactionId}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-200">
                <span className="block text-lg font-semibold text-slate-700 mb-2">Appointment Reference Number</span>
                <div className="flex items-center space-x-3">
                  <span className="text-xl text-slate-900 font-mono bg-emerald-100 px-4 py-2 rounded-lg border border-emerald-300">
                    {paymentData.appointmentReference}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Link
              href="/appointments"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition-colors duration-200 shadow-lg min-w-[250px]"
            >
              <EyeIcon className="h-6 w-6 mr-3" />
              View Appointment Details
            </Link>
            
            <button
              onClick={handlePrintReceipt}
              className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold rounded-xl transition-colors duration-200 shadow-lg min-w-[250px]"
            >
              <PrinterIcon className="h-6 w-6 mr-3" />
              Print Receipt
            </button>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">What's Next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold text-xl">1</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Confirmation Email</h4>
                <p className="text-slate-600">You'll receive a confirmation email with all appointment details within a few minutes.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-emerald-600 font-bold text-xl">2</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Prepare Documents</h4>
                <p className="text-slate-600">Gather all required documents as specified in your service requirements.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-purple-600 font-bold text-xl">3</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Attend Appointment</h4>
                <p className="text-slate-600">Visit the office on your scheduled date and time with all required documents.</p>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="text-center mt-8">
            <p className="text-slate-600 mb-4">
              Need help with your appointment?
            </p>
            <Link
              href="/contact"
              className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
