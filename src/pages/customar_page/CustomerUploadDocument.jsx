import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileText,
  X,
  Check,
  AlertCircle,
  CheckCircle2,
  Package,
  Clock,
  DollarSign,
  FileCheck,
  Shield,
  UploadCloud,
  File,
  FilePlus,
  Trash2,
  Eye,
  Download,
  RefreshCw,
  Image,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  AlertTriangle,
  Info,
  ChevronRight,
  Calendar,
  User,
  Building2,
  Globe,
  Plus,
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';

// Document type options
const documentTypes = [
  { id: 'birth_certificate', label: 'Birth Certificate' },
  { id: 'marriage_certificate', label: 'Marriage Certificate' },
  { id: 'death_certificate', label: 'Death Certificate' },
  { id: 'passport', label: 'Passport' },
  { id: 'educational_diploma', label: 'Educational Diploma' },
  { id: 'academic_transcript', label: 'Academic Transcript' },
  { id: 'police_clearance', label: 'Police Clearance' },
  { id: 'corporate_document', label: 'Corporate Document' },
  { id: 'power_of_attorney', label: 'Power of Attorney' },
  { id: 'court_order', label: 'Court Order' },
  { id: 'other', label: 'Other' },
];

// Service options
const services = [
  { id: 1, name: 'Apostille Services' },
  { id: 2, name: 'Embassy Legalisation' },
  { id: 3, name: 'Notary Services' },
  { id: 4, name: 'Translation Services' },
  { id: 5, name: 'Corporate Documents' },
  { id: 6, name: 'Educational Documents' },
];

// Country options
const countries = [
  'United Kingdom',
  'United States',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'United Arab Emirates',
  'India',
  'China',
  'Japan',
  'Brazil',
  'South Africa',
  'Nigeria',
];

const CustomerUploadDocument = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    documentType: '',
    serviceId: '',
    country: '',
    description: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Document requirements
  const requirements = [
    { icon: FileCheck, label: 'PDF, JPG, PNG, DOC, DOCX formats accepted' },
    { icon: Shield, label: 'Maximum file size: 10MB per document' },
    { icon: Shield, label: 'Clear, legible scans required' },
    { icon: Shield, label: 'Colour scans preferred for official documents' },
  ];

  // Handle file drop
  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      preview: URL.createObjectURL(file),
    }));
    setFiles(prev => [...prev, ...newFiles]);
    setUploadError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 10485760, // 10MB
    multiple: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const removeFile = (id) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.documentType) errors.documentType = 'Please select a document type';
    if (!formData.serviceId) errors.serviceId = 'Please select a service';
    if (!formData.country) errors.country = 'Please select a country';
    if (files.length === 0) errors.files = 'Please upload at least one document';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      clearInterval(interval);
      setUploadProgress(100);
      setUploadComplete(true);
      setIsUploading(false);
      
      // Reset form after success
      setTimeout(() => {
        setFiles([]);
        setFormData({
          documentType: '',
          serviceId: '',
          country: '',
          description: '',
        });
        setUploadComplete(false);
        setUploadProgress(0);
      }, 3000);
    } catch (error) {
      clearInterval(interval);
      setUploadError('Failed to upload documents. Please try again.');
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const iconMap = {
      pdf: FileImage,
      jpg: FileImage,
      jpeg: FileImage,
      png: FileImage,
      doc: FileText,
      docx: FileText,
    };
    const Icon = iconMap[ext] || File;
    return Icon;
  };

  const getFileColor = (filename) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const colorMap = {
      pdf: '#EF4444',
      jpg: '#8B5CF6',
      jpeg: '#8B5CF6',
      png: '#8B5CF6',
      doc: '#3B82F6',
      docx: '#3B82F6',
    };
    return colorMap[ext] || '#64748B';
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl" style={{ background: 'rgba(11, 18, 32, 0.1)' }}>
              <Upload className="w-6 h-6" style={{ color: '#0B1220' }} />
            </div>
            <div>
              <h1
                className="text-2xl lg:text-3xl font-bold"
                style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
              >
                Upload Documents
              </h1>
              <p className="text-sm" style={{ color: '#64748B' }}>
                Upload your documents for apostille and legalisation
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Document Upload Area */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="rounded-2xl p-6"
              style={{
                background: 'white',
                border: '1px solid #E2E8F0',
              }}
            >
              <h2
                className="text-lg font-bold mb-4"
                style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
              >
                Upload Documents
              </h2>

              {/* Dropzone */}
              <div
                {...getRootProps()}
                className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 cursor-pointer ${
                  isDragActive || dragActive
                    ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                    : 'border-gray-300 hover:border-[#D4AF37] hover:bg-gray-50'
                } ${files.length > 0 ? 'pb-4' : 'py-12'}`}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
              >
                <input {...getInputProps()} />
                
                {files.length === 0 ? (
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(11, 18, 32, 0.05)' }}>
                      <UploadCloud className="w-8 h-8" style={{ color: '#94A3B8' }} />
                    </div>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      Drag & drop your documents here
                    </p>
                    <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>
                      or click to browse files
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-3">
                      {['PDF', 'JPG', 'PNG', 'DOC', 'DOCX'].map((format) => (
                        <span
                          key={format}
                          className="px-2 py-0.5 rounded text-[10px] font-medium"
                          style={{
                            background: 'rgba(11, 18, 32, 0.05)',
                            color: '#64748B',
                          }}
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs mt-2" style={{ color: '#94A3B8' }}>
                      Max file size: 10MB per document
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium mb-3" style={{ color: '#0B1220' }}>
                      {files.length} file{files.length > 1 ? 's' : ''} selected
                    </p>
                    <button
                      type="button"
                      className="text-xs font-medium transition-colors hover:underline"
                      style={{ color: '#D4AF37' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      <Plus className="w-3 h-3 inline mr-1" />
                      Add more files
                    </button>
                  </div>
                )}
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file) => {
                    const FileIcon = getFileIcon(file.name);
                    const color = getFileColor(file.name);
                    return (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 rounded-xl"
                        style={{
                          background: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                        }}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: `${color}15` }}
                          >
                            <FileIcon className="w-5 h-5" style={{ color }} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate" style={{ color: '#0B1220' }}>
                              {file.name}
                            </p>
                            <p className="text-xs" style={{ color: '#94A3B8' }}>
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          style={{ color: '#94A3B8' }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {formErrors.files && (
                <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {formErrors.files}
                </p>
              )}
            </motion.div>

            {/* Document Details Form */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="rounded-2xl p-6"
              style={{
                background: 'white',
                border: '1px solid #E2E8F0',
              }}
            >
              <h2
                className="text-lg font-bold mb-4"
                style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
              >
                Document Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                    Document Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all appearance-none ${
                      formErrors.documentType ? 'border-red-500' : 'border-[#E2E8F0]'
                    }`}
                    style={{ color: '#0B1220' }}
                  >
                    <option value="">Select document type</option>
                    {documentTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {formErrors.documentType && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.documentType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                    Service <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="serviceId"
                    value={formData.serviceId}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all appearance-none ${
                      formErrors.serviceId ? 'border-red-500' : 'border-[#E2E8F0]'
                    }`}
                    style={{ color: '#0B1220' }}
                  >
                    <option value="">Select service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.serviceId && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.serviceId}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                    Destination Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all appearance-none ${
                      formErrors.country ? 'border-red-500' : 'border-[#E2E8F0]'
                    }`}
                    style={{ color: '#0B1220' }}
                  >
                    <option value="">Select country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {formErrors.country && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.country}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Add any additional notes or special instructions..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none"
                    style={{ color: '#0B1220' }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
            >
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isUploading}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                  color: '#0B1220',
                  boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)',
                }}
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Uploading... {uploadProgress}%</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>Upload Documents</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Upload Progress */}
            {isUploading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl p-4"
                style={{ background: 'white', border: '1px solid #E2E8F0' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color: '#0B1220' }}>
                    Uploading documents...
                  </span>
                  <span className="text-sm" style={{ color: '#64748B' }}>
                    {uploadProgress}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: '#E2E8F0' }}>
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${uploadProgress}%`,
                      background: 'linear-gradient(90deg, #D4AF37, #F4D03F)',
                    }}
                  />
                </div>
                <p className="text-xs mt-2" style={{ color: '#94A3B8' }}>
                  Please don't close this page while uploading
                </p>
              </motion.div>
            )}

            {/* Success Message */}
            {uploadComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-4 flex items-start gap-3"
                style={{
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                }}
              >
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                <div>
                  <p className="text-sm font-medium" style={{ color: '#10B981' }}>
                    Documents uploaded successfully!
                  </p>
                  <p className="text-xs" style={{ color: '#64748B' }}>
                    Your documents have been submitted for review. You will receive a confirmation email shortly.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {uploadError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-4 flex items-start gap-3"
                style={{
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                }}
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#EF4444' }} />
                <div>
                  <p className="text-sm font-medium" style={{ color: '#EF4444' }}>
                    {uploadError}
                  </p>
                  <p className="text-xs" style={{ color: '#64748B' }}>
                    Please check your files and try again.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Requirements */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="rounded-2xl p-6"
              style={{
                background: 'white',
                border: '1px solid #E2E8F0',
              }}
            >
              <h3
                className="text-sm font-semibold mb-4 flex items-center gap-2"
                style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
              >
                <FileCheck className="w-4 h-4" style={{ color: '#D4AF37' }} />
                Document Requirements
              </h3>
              <div className="space-y-3">
                {requirements.map((req, index) => {
                  const Icon = req.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
                      <p className="text-xs" style={{ color: '#64748B' }}>
                        {req.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Tips */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="rounded-2xl p-6"
              style={{
                background: 'white',
                border: '1px solid #E2E8F0',
              }}
            >
              <h3
                className="text-sm font-semibold mb-4 flex items-center gap-2"
                style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
              >
                <Info className="w-4 h-4" style={{ color: '#D4AF37' }} />
                Upload Tips
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                  <p className="text-xs font-medium" style={{ color: '#0B1220' }}>
                    📄 Clear Scans
                  </p>
                  <p className="text-xs" style={{ color: '#64748B' }}>
                    Ensure all scans are clear and legible
                  </p>
                </div>
                <div className="p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                  <p className="text-xs font-medium" style={{ color: '#0B1220' }}>
                    📏 Correct Orientation
                  </p>
                  <p className="text-xs" style={{ color: '#64748B' }}>
                    Upload documents in the correct orientation
                  </p>
                </div>
                <div className="p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                  <p className="text-xs font-medium" style={{ color: '#0B1220' }}>
                    🏷️ File Names
                  </p>
                  <p className="text-xs" style={{ color: '#64748B' }}>
                    Use descriptive file names for easy identification
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="rounded-2xl p-6 text-white"
              style={{
                background: 'linear-gradient(135deg, #0B1220, #1A2A4A)',
              }}
            >
              <h3
                className="text-sm font-semibold mb-3"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Need Help?
              </h3>
              <p className="text-xs text-white/70 mb-4">
                Our support team is here to assist you with any questions.
              </p>
              <button
                className="w-full px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                  color: '#0B1220',
                }}
              >
                Contact Support
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerUploadDocument;