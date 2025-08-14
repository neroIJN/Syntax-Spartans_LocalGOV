'use client'

import Link from 'next/link'
import { useState } from 'react'
import { 
  DocumentTextIcon,
  IdentificationIcon,
  UsersIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from '@/components/DashboardLayout'

export default function BirthCertificatePage() {
  const [checkedDocuments, setCheckedDocuments] = useState<string[]>([])
  const [isEligible, setIsEligible] = useState(false)

  const requiredDocuments = [
    {
      id: 'nic',
      title: 'National Identity Card (NIC)',
      description: 'Your valid National Identity Card',
      icon: IdentificationIcon
    },
    {
      id: 'birth-form',
      title: 'Birth Registration Form',
      description: 'Completed birth registration form',
      icon: DocumentTextIcon
    },
    {
      id: 'parents-nic',
      title: "Parents' NICs",
      description: 'National Identity Cards of both parents',
      icon: UsersIcon
    },
    {
      id: 'affidavit',
      title: 'Affidavit (if applicable)',
      description: 'Sworn affidavit if required',
      icon: DocumentCheckIcon
    }
  ]

  const handleDocumentCheck = (docId: string) => {
    setCheckedDocuments(prev => {
      const newChecked = prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
      
      // Check if all required documents are checked
      const requiredDocs = ['nic', 'birth-form', 'parents-nic']
      const hasAllRequired = requiredDocs.every(id => newChecked.includes(id))
      setIsEligible(hasAllRequired)
      
      return newChecked
    })
  }

  const checkEligibility = () => {
    if (isEligible) {
      // Redirect to appointment booking
      window.location.href = '/appointments/book?service=birth-certificate'
    }
  }

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-lg text-slate-600">
            <Link href="/services" className="hover:text-blue-600 font-medium">Services</Link>
            <span>/</span>
            <span className="font-semibold text-slate-900">Birth Certificate</span>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <DocumentTextIcon className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Birth Certificate Application</h1>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto">
              Apply for a birth certificate online. This service is available for citizens of Sri Lanka.
            </p>
          </div>

          {/* Eligibility Section */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden mb-8">
            <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
              <h2 className="text-2xl font-bold text-slate-900">Eligibility</h2>
            </div>
            <div className="p-8">
              <p className="text-lg text-slate-700 leading-relaxed">
                To be eligible for a birth certificate, you must be a citizen of Sri Lanka and have been born in the country. You must also 
                provide the necessary documentation to verify your identity and birth details.
              </p>
            </div>
          </div>

          {/* Required Documents */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-emerald-100 overflow-hidden mb-8">
            <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-emerald-50">
              <h2 className="text-2xl font-bold text-slate-900">Required Documents</h2>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                {requiredDocuments.map((document) => (
                  <div 
                    key={document.id}
                    className={`flex items-center p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      checkedDocuments.includes(document.id)
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-slate-300 bg-slate-50 hover:border-emerald-300'
                    }`}
                    onClick={() => handleDocumentCheck(document.id)}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        checkedDocuments.includes(document.id)
                          ? 'bg-emerald-600'
                          : 'bg-slate-400'
                      }`}>
                        <document.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{document.title}</h3>
                        <p className="text-slate-600">{document.description}</p>
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      checkedDocuments.includes(document.id)
                        ? 'border-emerald-500 bg-emerald-500'
                        : 'border-slate-400'
                    }`}>
                      {checkedDocuments.includes(document.id) && (
                        <CheckCircleIcon className="h-5 w-5 text-white" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Eligibility Check */}
          <div className="text-center">
            <div className={`inline-flex items-center px-8 py-4 rounded-xl text-lg font-semibold mb-6 ${
              isEligible
                ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300'
                : 'bg-amber-100 text-amber-800 border-2 border-amber-300'
            }`}>
              {isEligible ? (
                <>
                  <CheckCircleIcon className="h-6 w-6 mr-3" />
                  You are eligible to apply for a birth certificate
                </>
              ) : (
                <>
                  <ExclamationTriangleIcon className="h-6 w-6 mr-3" />
                  Please check all required documents to verify eligibility
                </>
              )}
            </div>

            <button
              onClick={checkEligibility}
              disabled={!isEligible}
              className={`inline-flex items-center px-12 py-4 text-xl font-bold rounded-xl transition-all duration-200 shadow-xl ${
                isEligible
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer transform hover:scale-105'
                  : 'bg-slate-400 text-slate-600 cursor-not-allowed'
              }`}
            >
              {isEligible ? (
                <>
                  Check Eligibility
                  <ArrowRightIcon className="ml-3 h-6 w-6" />
                </>
              ) : (
                'Complete Document Check First'
              )}
            </button>
          </div>

          {/* Additional Information */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Processing Time</h3>
              <p className="text-slate-700">
                Birth certificate applications are typically processed within 5-7 business days after submission of all required documents.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-emerald-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Collection</h3>
              <p className="text-slate-700">
                Once processed, you will be notified to collect your birth certificate from the designated Grama Niladhari office.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
