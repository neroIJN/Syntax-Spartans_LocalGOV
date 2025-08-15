'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  DocumentTextIcon,
  ArrowUpTrayIcon,
  FolderIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  TagIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from '../../../components/DashboardLayout'

interface Document {
  id: string
  name: string
  category: string
  size: number
  uploadDate: Date
  status: 'verified' | 'pending' | 'rejected'
  type: string
  description?: string
}

export default function DocumentsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Mock documents data
  const documents: Document[] = [
    {
      id: '1',
      name: 'National ID Card.pdf',
      category: 'identity',
      size: 2.5 * 1024 * 1024,
      uploadDate: new Date('2025-08-10'),
      status: 'verified',
      type: 'application/pdf',
      description: 'National Identity Card for government services'
    },
    {
      id: '2',
      name: 'Birth Certificate.jpg',
      category: 'birth',
      size: 1.8 * 1024 * 1024,
      uploadDate: new Date('2025-08-08'),
      status: 'verified',
      type: 'image/jpeg',
      description: 'Official birth certificate'
    },
    {
      id: '3',
      name: 'Bank Statement.pdf',
      category: 'financial',
      size: 0.9 * 1024 * 1024,
      uploadDate: new Date('2025-08-05'),
      status: 'pending',
      type: 'application/pdf',
      description: 'Bank statement for last 3 months'
    },
    {
      id: '4',
      name: 'Educational Certificate.pdf',
      category: 'education',
      size: 3.2 * 1024 * 1024,
      uploadDate: new Date('2025-08-03'),
      status: 'rejected',
      type: 'application/pdf',
      description: 'University degree certificate'
    },
    {
      id: '5',
      name: 'Employment Letter.docx',
      category: 'employment',
      size: 0.5 * 1024 * 1024,
      uploadDate: new Date('2025-08-01'),
      status: 'verified',
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      description: 'Current employment verification letter'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Categories', count: documents.length },
    { id: 'identity', name: 'Identity Documents', count: documents.filter(d => d.category === 'identity').length },
    { id: 'birth', name: 'Birth Certificates', count: documents.filter(d => d.category === 'birth').length },
    { id: 'financial', name: 'Financial Documents', count: documents.filter(d => d.category === 'financial').length },
    { id: 'education', name: 'Educational Certificates', count: documents.filter(d => d.category === 'education').length },
    { id: 'employment', name: 'Employment Documents', count: documents.filter(d => d.category === 'employment').length },
    { id: 'property', name: 'Property Documents', count: documents.filter(d => d.category === 'property').length }
  ]

  const statusOptions = [
    { id: 'all', name: 'All Status', count: documents.length },
    { id: 'verified', name: 'Verified', count: documents.filter(d => d.status === 'verified').length },
    { id: 'pending', name: 'Pending Review', count: documents.filter(d => d.status === 'pending').length },
    { id: 'rejected', name: 'Rejected', count: documents.filter(d => d.status === 'rejected').length }
  ]

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.includes('image')) {
      return <div className="w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-green-400/30">
        <DocumentTextIcon className="h-6 w-6 text-green-400" />
      </div>
    }
    return <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-blue-400/30">
      <DocumentTextIcon className="h-6 w-6 text-blue-400" />
    </div>
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-200 border border-green-400/30">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Verified
          </span>
        )
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-200 border border-yellow-400/30">
            <ClockIcon className="h-3 w-3 mr-1" />
            Pending
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-200 border border-red-400/30">
            <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
            Rejected
          </span>
        )
      default:
        return null
    }
  }

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || categoryId
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 scroll-container fade-in">
        {/* Header */}
        <div className="mb-8 slide-in-up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">My Documents</h1>
              <p className="text-xl text-blue-100">Manage and view your uploaded documents for government services.</p>
            </div>
            <button
              onClick={() => router.push('/documents/upload')}
              className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-smooth hover-lift"
            >
              <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
              Upload Documents
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1 space-y-6 slide-in-right">
              {/* Search */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 hover-lift transition-smooth">
                <h3 className="text-lg font-bold text-white mb-4 drop-shadow-sm">Search Documents</h3>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-smooth"
                  />
                </div>
              </div>

              {/* Categories Filter */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 hover-lift transition-smooth">
                <h3 className="text-lg font-bold text-white mb-4 drop-shadow-sm">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-smooth text-sm ${
                        selectedCategory === category.id
                          ? 'bg-blue-600/30 text-white border border-blue-400/50'
                          : 'text-blue-200 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{category.count}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 hover-lift transition-smooth">
                <h3 className="text-lg font-bold text-white mb-4 drop-shadow-sm">Status</h3>
                <div className="space-y-2">
                  {statusOptions.map((status) => (
                    <button
                      key={status.id}
                      onClick={() => setSelectedStatus(status.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-smooth text-sm ${
                        selectedStatus === status.id
                          ? 'bg-blue-600/30 text-white border border-blue-400/50'
                          : 'text-blue-200 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{status.name}</span>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{status.count}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Documents Grid */}
            <div className="lg:col-span-3 slide-in-left">
              {filteredDocuments.length === 0 ? (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-12 text-center">
                  <FolderIcon className="h-16 w-16 text-blue-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No Documents Found</h3>
                  <p className="text-blue-200 mb-6">
                    {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' 
                      ? 'Try adjusting your search or filters.'
                      : 'Upload your first document to get started.'
                    }
                  </p>
                  <button
                    onClick={() => router.push('/documents/upload')}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-smooth hover-lift"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Upload Documents
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Results Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">
                      {filteredDocuments.length} Document{filteredDocuments.length !== 1 ? 's' : ''} Found
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-blue-200">
                      <span>Sort by:</span>
                      <select className="bg-white/10 border border-white/30 rounded-lg px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="date">Upload Date</option>
                        <option value="name">Name</option>
                        <option value="size">Size</option>
                        <option value="status">Status</option>
                      </select>
                    </div>
                  </div>

                  {/* Documents List */}
                  <div className="space-y-4">
                    {filteredDocuments.map((document) => (
                      <div key={document.id} className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 hover-lift transition-smooth">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {getFileIcon(document.type)}
                            <div>
                              <h4 className="text-lg font-semibold text-white">{document.name}</h4>
                              <div className="flex items-center space-x-4 text-sm text-blue-200 mt-1">
                                <span className="flex items-center">
                                  <TagIcon className="h-4 w-4 mr-1" />
                                  {getCategoryName(document.category)}
                                </span>
                                <span className="flex items-center">
                                  <CalendarDaysIcon className="h-4 w-4 mr-1" />
                                  {document.uploadDate.toLocaleDateString()}
                                </span>
                                <span>{formatFileSize(document.size)}</span>
                              </div>
                              {document.description && (
                                <p className="text-sm text-blue-300 mt-2">{document.description}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            {getStatusBadge(document.status)}
                            
                            <div className="flex items-center space-x-2">
                              <button
                                title="View document"
                                className="p-2 text-blue-300 hover:text-white hover:bg-white/10 rounded-lg transition-smooth"
                              >
                                <EyeIcon className="h-5 w-5" />
                              </button>
                              <button
                                title="Download document"
                                className="p-2 text-green-300 hover:text-white hover:bg-white/10 rounded-lg transition-smooth"
                              >
                                <ArrowDownTrayIcon className="h-5 w-5" />
                              </button>
                              <button
                                title="Delete document"
                                className="p-2 text-red-300 hover:text-white hover:bg-white/10 rounded-lg transition-smooth"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
