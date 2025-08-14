'use client'

import { useState, useRef } from 'react'
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
  CloudArrowUpIcon
} from '@heroicons/react/24/outline'
import DashboardLayout from '@/components/DashboardLayout'

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
      <div className="px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-100 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Upload Documents</h1>
          <p className="text-xl text-slate-700">Securely upload your documents for government services and applications.</p>
        </div>

        {/* Upload Guidelines */}
        <div className="mb-8 bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Upload Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
            <div>
              <h3 className="font-semibold mb-2">Supported Formats:</h3>
              <ul className="text-sm space-y-1">
                <li>• PDF documents</li>
                <li>• Images (JPEG, PNG, GIF)</li>
                <li>• Word documents (DOC, DOCX)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Requirements:</h3>
              <ul className="text-sm space-y-1">
                <li>• Maximum file size: 10MB</li>
                <li>• Clear, readable scans</li>
                <li>• Original documents preferred</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Category Selection */}
        <div className="mb-8 bg-white rounded-2xl shadow-xl border-2 border-emerald-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-emerald-50">
            <h2 className="text-2xl font-bold text-slate-900">Select Document Category</h2>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {documentCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                      : 'border-slate-300 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50'
                  }`}
                >
                  <h3 className="font-bold text-slate-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-slate-600">{category.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Upload Area */}
        {selectedCategory && (
          <div className="mb-8 bg-white rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
              <h2 className="text-2xl font-bold text-slate-900">
                Upload {getCategoryName(selectedCategory)}
              </h2>
            </div>
            <div className="p-8">
              <div
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50'
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
                
                <div className="space-y-4">
                  <CloudArrowUpIcon className="mx-auto h-16 w-16 text-blue-500" />
                  <div>
                    <p className="text-xl font-semibold text-slate-900">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="text-slate-600 mt-2">
                      Upload multiple files at once. Maximum 10MB per file.
                    </p>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Select Files
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-purple-50">
              <h2 className="text-2xl font-bold text-slate-900">
                Uploaded Files ({uploadedFiles.length})
              </h2>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-200"
                  >
                    {/* File Icon/Preview */}
                    <div className="flex-shrink-0 mr-4">
                      {file.preview ? (
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      ) : (
                        getFileIcon(file.type)
                      )}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-semibold text-slate-900 truncate">{file.name}</p>
                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        <span>{formatFileSize(file.size)}</span>
                        <span>{getCategoryName(file.category)}</span>
                        <span>{file.uploadDate.toLocaleDateString()}</span>
                      </div>
                      
                      {/* Progress Bar */}
                      {file.status === 'uploading' && (
                        <div className="mt-2">
                          <div className="bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${file.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{Math.round(file.progress)}% uploaded</p>
                        </div>
                      )}
                    </div>

                    {/* Status and Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      {getStatusIcon(file.status)}
                      
                      {file.status === 'completed' && (
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                          title="View file"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
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
                <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-6 w-6 text-emerald-600 mr-3" />
                    <div>
                      <p className="font-semibold text-emerald-900">
                        {uploadedFiles.filter(f => f.status === 'completed').length} files uploaded successfully
                      </p>
                      <p className="text-emerald-700 text-sm">
                        Your documents have been securely stored and will be processed for your applications.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
