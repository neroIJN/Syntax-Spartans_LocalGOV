'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowUpTrayIcon,
  DocumentTextIcon,
  PhotoIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  TrashIcon,
  PlusIcon,
  CloudArrowUpIcon,
  ArrowLeftIcon,
  TagIcon,
  FolderIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from '../../../../components/DashboardLayout'

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  category: string
  uploadDate: Date
  status: 'uploading' | 'completed' | 'error'
  progress: number
  preview?: string
}

export default function UploadDocumentsPage() {
  const router = useRouter()
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const documentCategories = [
    { id: 'identity', name: 'Identity Documents', description: 'National ID, Passport, Driving License' },
    { id: 'birth', name: 'Birth Certificates', description: 'Birth certificates and related documents' },
    { id: 'marriage', name: 'Marriage Documents', description: 'Marriage certificates and related papers' },
    { id: 'education', name: 'Educational Certificates', description: 'Academic qualifications and transcripts' },
    { id: 'employment', name: 'Employment Documents', description: 'Employment letters, contracts, pay slips' },
    { id: 'property', name: 'Property Documents', description: 'Land deeds, property ownership papers' },
    { id: 'financial', name: 'Financial Documents', description: 'Bank statements, tax returns' },
    { id: 'medical', name: 'Medical Records', description: 'Medical certificates and health records' },
    { id: 'other', name: 'Other Documents', description: 'Miscellaneous supporting documents' }
  ]

  const maxFileSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (files: File[]) => {
    if (!selectedCategory) {
      alert('Please select a document category first.')
      return
    }

    files.forEach(file => {
      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        alert(`File type ${file.type} is not supported. Please upload PDF, Word documents, or images.`)
        return
      }

      // Validate file size
      if (file.size > maxFileSize) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`)
        return
      }

      const fileId = Math.random().toString(36).substr(2, 9)
      const newFile: UploadedFile = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        category: selectedCategory,
        uploadDate: new Date(),
        status: 'uploading',
        progress: 0
      }

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setUploadedFiles(prev => 
            prev.map(f => f.id === fileId ? { ...f, preview: e.target?.result as string } : f)
          )
        }
        reader.readAsDataURL(file)
      }

      setUploadedFiles(prev => [...prev, newFile])

      // Simulate upload progress
      simulateUpload(fileId)
    })
  }

  const simulateUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        setUploadedFiles(prev =>
          prev.map(f => f.id === fileId ? { ...f, status: 'completed', progress: 100 } : f)
        )
        clearInterval(interval)
      } else {
        setUploadedFiles(prev =>
          prev.map(f => f.id === fileId ? { ...f, progress } : f)
        )
      }
    }, 500)
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <PhotoIcon className="h-8 w-8 text-emerald-600" />
    }
    return <DocumentTextIcon className="h-8 w-8 text-blue-600" />
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
      case 'error':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
      default:
        return <CloudArrowUpIcon className="h-5 w-5 text-blue-600 animate-pulse" />
    }
  }

  const getCategoryName = (categoryId: string) => {
    return documentCategories.find(cat => cat.id === categoryId)?.name || categoryId
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
              <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Upload Documents</h1>
              <p className="text-xl text-blue-100">Securely upload your documents for government services and applications.</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Upload Guidelines */}
          <div className="mb-8 slide-in-right bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 drop-shadow-sm">Upload Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-200">
              <div>
                <h3 className="font-semibold mb-3 text-blue-100">Supported Formats:</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    PDF documents (.pdf)
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Images (JPEG, PNG, GIF)
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Word documents (DOC, DOCX)
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-blue-100">Requirements:</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Maximum file size: 10MB
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Clear, readable scans
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Original documents preferred
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Category Selection */}
          <div className="mb-8 slide-in-left bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden hover-lift transition-smooth">
            <div className="px-8 py-6 border-b border-white/20 bg-white/5">
              <h2 className="text-2xl font-bold text-white drop-shadow-sm">Select Document Category</h2>
              <p className="text-blue-200 mt-2">Choose the appropriate category for your documents</p>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {documentCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-6 rounded-xl border-2 text-left transition-smooth hover-lift ${
                      selectedCategory === category.id
                        ? 'border-blue-400 bg-blue-600/30 shadow-lg backdrop-blur-sm text-white'
                        : 'border-white/30 bg-white/5 hover:border-blue-400/50 hover:bg-white/10 backdrop-blur-sm text-blue-100 hover:text-white'
                    }`}
                  >
                    <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                    <p className="text-sm opacity-80">{category.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Upload Area */}
          {selectedCategory && (
            <div className="mb-8 slide-in-up bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden hover-lift transition-smooth">
              <div className="px-8 py-6 border-b border-white/20 bg-white/5">
                <h2 className="text-2xl font-bold text-white drop-shadow-sm">
                  Upload {getCategoryName(selectedCategory)}
                </h2>
                <p className="text-blue-200 mt-2">Drag and drop files or click to browse</p>
              </div>
              <div className="p-8">
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-smooth ${
                    dragActive
                      ? 'border-blue-400 bg-blue-500/20 backdrop-blur-sm'
                      : 'border-white/30 hover:border-blue-400/50 hover:bg-white/5 backdrop-blur-sm'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  <div className="space-y-6">
                    <div className="w-20 h-20 bg-blue-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto border border-blue-400/30">
                      <CloudArrowUpIcon className="h-12 w-12 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white mb-2 drop-shadow-sm">
                        Drag and drop files here
                      </p>
                      <p className="text-blue-200 mb-6">
                        or click the button below to browse files
                      </p>
                      <p className="text-sm text-blue-300">
                        Upload multiple files at once • Maximum 10MB per file
                      </p>
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-smooth hover-lift"
                    >
                      <PlusIcon className="h-6 w-6 mr-3" />
                      Select Files
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="slide-in-up bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden hover-lift transition-smooth">
              <div className="px-8 py-6 border-b border-white/20 bg-white/5">
                <h2 className="text-2xl font-bold text-white drop-shadow-sm">
                  Uploaded Files ({uploadedFiles.length})
                </h2>
                <p className="text-blue-200 mt-2">Review and manage your uploaded documents</p>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/10 transition-smooth"
                    >
                      {/* File Icon/Preview */}
                      <div className="flex-shrink-0 mr-6">
                        {file.preview ? (
                          <div className="relative">
                            <img
                              src={file.preview}
                              alt={file.name}
                              className="w-16 h-16 object-cover rounded-xl border border-white/20"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-blue-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-blue-400/30">
                            {getFileIcon(file.type)}
                          </div>
                        )}
                      </div>

                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-semibold text-white truncate drop-shadow-sm">{file.name}</p>
                        <div className="flex items-center space-x-6 text-sm text-blue-200 mt-2">
                          <span className="flex items-center">
                            <TagIcon className="h-4 w-4 mr-1" />
                            {formatFileSize(file.size)}
                          </span>
                          <span className="flex items-center">
                            <FolderIcon className="h-4 w-4 mr-1" />
                            {getCategoryName(file.category)}
                          </span>
                          <span className="flex items-center">
                            <CalendarDaysIcon className="h-4 w-4 mr-1" />
                            {file.uploadDate.toLocaleDateString()}
                          </span>
                        </div>
                        
                        {/* Progress Bar */}
                        {file.status === 'uploading' && (
                          <div className="mt-4">
                            <div className="flex justify-between text-sm text-blue-200 mb-2">
                              <span>Uploading...</span>
                              <span>{Math.round(file.progress)}%</span>
                            </div>
                            <div className="bg-white/20 rounded-full h-2 backdrop-blur-sm">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300 shadow-sm"
                                style={{ width: `${file.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Status and Actions */}
                      <div className="flex items-center space-x-4 ml-6">
                        <div className="flex items-center">
                          {getStatusIcon(file.status)}
                          <span className="ml-2 text-sm text-blue-200">
                            {file.status === 'uploading' ? 'Uploading' : 
                             file.status === 'completed' ? 'Completed' : 'Error'}
                          </span>
                        </div>
                        
                        {file.status === 'completed' && (
                          <button
                            className="p-2 text-blue-300 hover:text-white hover:bg-white/10 rounded-lg transition-smooth"
                            title="View file"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                        )}
                        
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-2 text-red-300 hover:text-white hover:bg-red-500/20 rounded-lg transition-smooth"
                          title="Remove file"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upload Summary */}
                {uploadedFiles.some(f => f.status === 'completed') && (
                  <div className="mt-8 p-6 bg-green-500/20 border border-green-400/30 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-green-400/30 mr-4">
                        <CheckCircleIcon className="h-6 w-6 text-green-400" />
                      </div>
                      <div>
                        <p className="font-bold text-green-100 text-lg">
                          {uploadedFiles.filter(f => f.status === 'completed').length} files uploaded successfully
                        </p>
                        <p className="text-green-200 text-sm mt-1">
                          Your documents have been securely stored and will be processed for your applications.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => router.push('/documents')}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-smooth hover-lift"
                  >
                    <FolderIcon className="h-6 w-6 mr-3" />
                    View All Documents
                  </button>
                  <button
                    onClick={() => {
                      setUploadedFiles([])
                      setSelectedCategory('')
                    }}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-smooth hover-lift"
                  >
                    <PlusIcon className="h-6 w-6 mr-3" />
                    Upload More Documents
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
