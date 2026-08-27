import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Upload,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  ChevronDown,
  RefreshCw,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  File,
  FileCheck,
  FileX,
  FileWarning,
  MoreHorizontal,
  Plus,
  Calendar,
  User,
  Tag,
  Folder,
  Image,
  FileArchive,
  FileCode,
  FileSpreadsheet,
  FileImage,
  FileAudio,
  FileVideo,
  FileJson,
  FileType,
  Copy,
  ExternalLink,
  Share2,
  Star,
  StarOff,
  FolderOpen,
  FolderPlus,
  Grid,
  List,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  UploadCloud,
  FileUp,
  AlertTriangle,
  Info,
  Loader,
  Check,
} from 'lucide-react';

// Document data
const documents = [
  {
    id: 'DOC-001',
    name: 'Birth_Certificate_John_Doe.pdf',
    type: 'Birth Certificate',
    category: 'Personal',
    uploadDate: '2026-08-15',
    size: '2.4 MB',
    status: 'verified',
    pages: 1,
    orderId: 'APS-40218',
    description: 'Birth certificate for John Doe',
  },
  {
    id: 'DOC-002',
    name: 'Marriage_Certificate_Smith.pdf',
    type: 'Marriage Certificate',
    category: 'Personal',
    uploadDate: '2026-08-12',
    size: '1.8 MB',
    status: 'pending',
    pages: 2,
    orderId: 'APS-40217',
    description: 'Marriage certificate for Smith family',
  },
  {
    id: 'DOC-003',
    name: 'Bachelor_Degree_Transcript.pdf',
    type: 'Academic Transcript',
    category: 'Education',
    uploadDate: '2026-08-10',
    size: '3.2 MB',
    status: 'verified',
    pages: 4,
    orderId: 'APS-40216',
    description: 'Bachelor degree transcript',
  },
  {
    id: 'DOC-004',
    name: 'Passport_John_Doe.pdf',
    type: 'Passport',
    category: 'Personal',
    uploadDate: '2026-08-08',
    size: '1.2 MB',
    status: 'rejected',
    pages: 2,
    orderId: 'APS-40215',
    description: 'Passport copy - needs clearer scan',
  },
  {
    id: 'DOC-005',
    name: 'Company_Incorporation_Certificate.pdf',
    type: 'Corporate Document',
    category: 'Business',
    uploadDate: '2026-08-05',
    size: '4.6 MB',
    status: 'verified',
    pages: 6,
    orderId: 'APS-40214',
    description: 'Company incorporation certificate',
  },
  {
    id: 'DOC-006',
    name: 'Academic_Diploma_Masters.pdf',
    type: 'Diploma',
    category: 'Education',
    uploadDate: '2026-08-02',
    size: '2.1 MB',
    status: 'pending',
    pages: 3,
    orderId: 'APS-40213',
    description: 'Masters diploma from Cambridge',
  },
  {
    id: 'DOC-007',
    name: 'Police_Clearance_Certificate.pdf',
    type: 'Police Clearance',
    category: 'Legal',
    uploadDate: '2026-07-30',
    size: '1.6 MB',
    status: 'verified',
    pages: 1,
    orderId: 'APS-40212',
    description: 'Police clearance certificate',
  },
  {
    id: 'DOC-008',
    name: 'Power_of_Attorney.pdf',
    type: 'Power of Attorney',
    category: 'Legal',
    uploadDate: '2026-07-28',
    size: '3.8 MB',
    status: 'pending',
    pages: 5,
    orderId: 'APS-40211',
    description: 'Power of attorney document',
  },
];

// Status configurations
const statusConfig = {
  verified: {
    label: 'Verified',
    icon: CheckCircle2,
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
  },
  pending: {
    label: 'Pending',
    icon: Clock,
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.1)',
  },
  rejected: {
    label: 'Rejected',
    icon: XCircle,
    color: '#EF4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
  },
  processing: {
    label: 'Processing',
    icon: Loader,
    color: '#0F4C81',
    bgColor: 'rgba(15, 76, 129, 0.1)',
  },
};

// Category icons
const categoryIcons = {
  Personal: User,
  Education: FileCheck,
  Business: Folder,
  Legal: File,
};

const filterOptions = {
  status: ['All', 'Verified', 'Pending', 'Processing', 'Rejected'],
  category: ['All', 'Personal', 'Education', 'Business', 'Legal'],
  dateRange: ['All Time', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days'],
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

const CustomerDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All Time');
  const [sortField, setSortField] = useState('uploadDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const dragRef = useRef(null);

  const itemsPerPage = 6;

  // Filter and sort documents
  const filteredDocuments = useMemo(() => {
    let filtered = [...documents];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(term) ||
        doc.type.toLowerCase().includes(term) ||
        doc.id.toLowerCase().includes(term) ||
        doc.category.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(doc => doc.status === statusFilter.toLowerCase());
    }

    // Category filter
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(doc => doc.category === categoryFilter);
    }

    // Date filter
    if (dateFilter !== 'All Time') {
      const now = new Date();
      const days = {
        'Last 7 Days': 7,
        'Last 30 Days': 30,
        'Last 90 Days': 90,
      };
      const cutoff = new Date(now.setDate(now.getDate() - days[dateFilter]));
      filtered = filtered.filter(doc => new Date(doc.uploadDate) >= cutoff);
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'uploadDate') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else {
        aVal = aVal.toString().toLowerCase();
        bVal = bVal.toString().toLowerCase();
      }
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [documents, searchTerm, statusFilter, categoryFilter, dateFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const stats = [
    { label: 'Total Documents', value: documents.length, icon: FileText, color: '#0F4C81' },
    { label: 'Verified', value: documents.filter(d => d.status === 'verified').length, icon: CheckCircle2, color: '#10B981' },
    { label: 'Pending', value: documents.filter(d => d.status === 'pending').length, icon: Clock, color: '#F59E0B' },
    { label: 'Rejected', value: documents.filter(d => d.status === 'rejected').length, icon: XCircle, color: '#EF4444' },
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelect = (docId) => {
    setSelectedDocuments(prev =>
      prev.includes(docId)
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDocuments.length === paginatedDocuments.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(paginatedDocuments.map(d => d.id));
    }
  };

  const handlePreview = (doc) => {
    setSelectedDoc(doc);
    setShowPreviewModal(true);
  };

  const handleDelete = (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      console.log('Deleting document:', docId);
    }
  };

  const handleUpload = (e) => {
    const files = e.target.files;
    console.log('Uploading files:', files);
    setShowUploadModal(false);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    console.log('Dropped files:', files);
    setShowUploadModal(false);
  };

  const getStatusBadge = (status) => {
    const config = statusConfig[status];
    if (!config) return null;
    const Icon = config.icon;
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
        style={{
          background: config.bgColor,
          color: config.color,
        }}
      >
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </span>
    );
  };

  const getCategoryIcon = (category) => {
    const Icon = categoryIcons[category] || File;
    return <Icon className="w-4 h-4" style={{ color: '#64748B' }} />;
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
      pdf: FileText,
      doc: FileText,
      docx: FileText,
      xls: FileSpreadsheet,
      xlsx: FileSpreadsheet,
      csv: FileSpreadsheet,
      jpg: FileImage,
      jpeg: FileImage,
      png: FileImage,
      gif: FileImage,
      svg: FileImage,
      zip: FileArchive,
      rar: FileArchive,
      '7z': FileArchive,
      js: FileCode,
      ts: FileCode,
      html: FileCode,
      css: FileCode,
      json: FileJson,
      mp3: FileAudio,
      wav: FileAudio,
      mp4: FileVideo,
      avi: FileVideo,
    };
    const Icon = iconMap[ext] || FileType;
    return <Icon className="w-6 h-6" style={{ color: '#0F4C81' }} />;
  };

  const getFileColor = (filename) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const colorMap = {
      pdf: '#EF4444',
      doc: '#3B82F6',
      docx: '#3B82F6',
      xls: '#10B981',
      xlsx: '#10B981',
      jpg: '#8B5CF6',
      jpeg: '#8B5CF6',
      png: '#8B5CF6',
      zip: '#F59E0B',
      rar: '#F59E0B',
    };
    return colorMap[ext] || '#64748B';
  };

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1
              className="text-2xl lg:text-3xl font-bold"
              style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
            >
              My Documents
            </h1>
            <p className="text-sm" style={{ color: '#64748B' }}>
              Manage and track all your uploaded documents
            </p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
              color: '#0B1220',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
            }}
          >
            <Upload className="w-4 h-4" />
            Upload Document
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-2xl"
                style={{
                  background: 'white',
                  border: '1px solid #E2E8F0',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${stat.color}15` }}
                  >
                    <Icon className="w-4.5 h-4.5" style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p
                      className="text-xl font-bold"
                      style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs" style={{ color: '#64748B' }}>{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-4 mb-6"
          style={{ border: '1px solid #E2E8F0' }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
              <input
                type="text"
                placeholder="Search documents by name, type, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                style={{ color: viewMode === 'list' ? '#0F4C81' : '#94A3B8' }}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                style={{ color: viewMode === 'grid' ? '#0F4C81' : '#94A3B8' }}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300"
              style={{
                background: showFilters ? '#0F4C81' : '#F8FAFC',
                color: showFilters ? 'white' : '#64748B',
                border: showFilters ? 'none' : '1px solid #E2E8F0',
              }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Bulk Actions */}
            {selectedDocuments.length > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: '#0F4C8110' }}>
                <span className="text-xs font-medium" style={{ color: '#0F4C81' }}>
                  {selectedDocuments.length} selected
                </span>
                <button className="p-1 rounded hover:bg-white/50 transition-colors" style={{ color: '#EF4444' }}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 mt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#64748B' }}>
                      Status
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
                    >
                      {filterOptions.status.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#64748B' }}>
                      Category
                    </label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
                    >
                      {filterOptions.category.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#64748B' }}>
                      Date Range
                    </label>
                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
                    >
                      {filterOptions.dateRange.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Documents Grid/List */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-white rounded-2xl overflow-hidden"
          style={{ border: '1px solid #E2E8F0' }}
        >
          {viewMode === 'list' ? (
            // List View
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    <th className="py-3.5 px-4">
                      <input
                        type="checkbox"
                        checked={selectedDocuments.length === paginatedDocuments.length && paginatedDocuments.length > 0}
                        onChange={handleSelectAll}
                        className="w-4 h-4 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                    </th>
                    <th
                      className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                      onClick={() => handleSort('name')}
                      style={{ color: '#64748B' }}
                    >
                      <div className="flex items-center gap-1">
                        Document Name
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th
                      className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                      onClick={() => handleSort('type')}
                      style={{ color: '#64748B' }}
                    >
                      <div className="flex items-center gap-1">
                        Type
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th
                      className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                      onClick={() => handleSort('uploadDate')}
                      style={{ color: '#64748B' }}
                    >
                      <div className="flex items-center gap-1">
                        Upload Date
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th
                      className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                      onClick={() => handleSort('status')}
                      style={{ color: '#64748B' }}
                    >
                      <div className="flex items-center gap-1">
                        Status
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="text-right text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {paginatedDocuments.map((doc, index) => (
                      <motion.tr
                        key={doc.id}
                        variants={fadeUp}
                        className="hover:bg-gray-50 transition-colors"
                        style={{ borderBottom: index < paginatedDocuments.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                      >
                        <td className="py-3.5 px-4">
                          <input
                            type="checkbox"
                            checked={selectedDocuments.includes(doc.id)}
                            onChange={() => handleSelect(doc.id)}
                            className="w-4 h-4 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                          />
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(15, 76, 129, 0.08)' }}>
                              {getFileIcon(doc.name)}
                            </div>
                            <div>
                              <p className="text-sm font-medium" style={{ color: '#0F172A' }}>
                                {doc.name}
                              </p>
                              <p className="text-xs" style={{ color: '#94A3B8' }}>
                                {doc.size} • {doc.pages} pages • {doc.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm" style={{ color: '#64748B' }}>
                            {doc.type}
                          </span>
                          <span className="block text-xs" style={{ color: '#94A3B8' }}>
                            {doc.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm" style={{ color: '#64748B' }}>
                            {new Date(doc.uploadDate).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {getStatusBadge(doc.status)}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handlePreview(doc)}
                              className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                              style={{ color: '#64748B' }}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                              style={{ color: '#64748B' }}
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(doc.id)}
                              className="p-1.5 rounded-lg transition-colors hover:bg-red-50 hover:text-red-500"
                              style={{ color: '#64748B' }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          ) : (
            // Grid View
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              <AnimatePresence>
                {paginatedDocuments.map((doc) => (
                  <motion.div
                    key={doc.id}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    className="group rounded-2xl p-4 transition-all duration-300 hover:shadow-lg cursor-pointer"
                    style={{
                      background: 'white',
                      border: '1px solid #E2E8F0',
                    }}
                    onClick={() => handlePreview(doc)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(15, 76, 129, 0.08)' }}>
                          {getFileIcon(doc.name)}
                        </div>
                        <div>
                          <p className="text-sm font-medium line-clamp-1" style={{ color: '#0F172A' }}>
                            {doc.name}
                          </p>
                          <p className="text-xs" style={{ color: '#94A3B8' }}>
                            {doc.size} • {doc.pages} pages
                          </p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedDocuments.includes(doc.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleSelect(doc.id);
                        }}
                        className="w-4 h-4 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      {getStatusBadge(doc.status)}
                      <span className="text-xs" style={{ color: '#94A3B8' }}>
                        {doc.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: '#E2E8F0' }}>
                      <span className="text-xs" style={{ color: '#94A3B8' }}>
                        {new Date(doc.uploadDate).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 rounded hover:bg-gray-100" style={{ color: '#64748B' }}>
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1 rounded hover:bg-red-50 hover:text-red-500" style={{ color: '#64748B' }}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Empty State */}
          {paginatedDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
              <h3 className="text-lg font-semibold mb-1" style={{ color: '#0F172A' }}>
                No documents found
              </h3>
              <p className="text-sm" style={{ color: '#64748B' }}>
                Try adjusting your filters or upload a new document
              </p>
              <button
                onClick={() => setShowUploadModal(true)}
                className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white mx-auto transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                  color: '#0B1220',
                }}
              >
                <Upload className="w-4 h-4" />
                Upload Document
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: '#E2E8F0' }}>
              <span className="text-sm" style={{ color: '#64748B' }}>
                Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredDocuments.length)} of{' '}
                {filteredDocuments.length} documents
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  style={{ color: '#64748B' }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      page === currentPage
                        ? 'text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    style={{
                      background: page === currentPage
                        ? 'linear-gradient(135deg, #0F4C81, #1E6BB8)'
                        : 'transparent',
                      color: page === currentPage ? 'white' : '#64748B',
                    }}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  style={{ color: '#64748B' }}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
                  >
                    Upload Document
                  </h2>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drag and Drop Area */}
                <div
                  ref={dragRef}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                    isDragging
                      ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                      : 'border-gray-300 hover:border-[#D4AF37] hover:bg-gray-50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleUpload}
                    className="hidden"
                  />
                  <UploadCloud className="w-12 h-12 mx-auto mb-3" style={{ color: '#94A3B8' }} />
                  <p className="text-sm font-medium" style={{ color: '#0F172A' }}>
                    Drop your files here, or{' '}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[#D4AF37] hover:underline font-semibold"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>
                    Supports PDF, JPG, PNG, DOC, DOCX (Max 10MB)
                  </p>
                </div>

                {/* Upload Options */}
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F172A' }}>
                      Document Category
                    </label>
                    <select className="w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm" style={{ borderColor: '#E2E8F0', color: '#0F172A' }}>
                      <option>Personal</option>
                      <option>Education</option>
                      <option>Business</option>
                      <option>Legal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F172A' }}>
                      Document Type
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Birth Certificate"
                      className="w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: '#64748B' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                      color: '#0B1220',
                    }}
                  >
                    Upload Files
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreviewModal && selectedDoc && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPreviewModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
                  >
                    Document Preview
                  </h2>
                  <button
                    onClick={() => setShowPreviewModal(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Document Preview */}
                <div className="rounded-2xl p-8 text-center" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(15, 76, 129, 0.08)' }}>
                    {getFileIcon(selectedDoc.name)}
                  </div>
                  <h3 className="text-lg font-semibold" style={{ color: '#0F172A' }}>
                    {selectedDoc.name}
                  </h3>
                  <p className="text-sm" style={{ color: '#64748B' }}>
                    {selectedDoc.type} • {selectedDoc.size}
                  </p>
                  <div className="mt-2">
                    {getStatusBadge(selectedDoc.status)}
                  </div>
                </div>

                {/* Document Info */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs font-medium" style={{ color: '#64748B' }}>Document ID</p>
                    <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>{selectedDoc.id}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs font-medium" style={{ color: '#64748B' }}>Category</p>
                    <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>{selectedDoc.category}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs font-medium" style={{ color: '#64748B' }}>Upload Date</p>
                    <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>
                      {new Date(selectedDoc.uploadDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs font-medium" style={{ color: '#64748B' }}>Pages</p>
                    <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>{selectedDoc.pages}</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <button
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #0F4C81, #1E6BB8)',
                    }}
                  >
                    <Download className="w-4 h-4 inline mr-2" />
                    Download
                  </button>
                  <button
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: '#64748B' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerDocuments;