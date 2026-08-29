import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Send,
  Upload,
  Clock,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  SortAsc,
  SortDesc,
  User,
  Calendar,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileWarning,
  FileX,
  Download,
  Printer,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Info,
  HelpCircle,
  Clock as ClockIcon,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Package,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Shield,
  Truck,
  Home,
  Building2,
  Globe,
  Users,
  Award,
  Star,
  X,
} from 'lucide-react';

// Sample pending documents data
const pendingDocuments = [
  {
    id: 'PD-001',
    orderId: 'APS-40218',
    customer: 'John Doe',
    documentType: 'Birth Certificate',
    status: 'changes_required',
    reason: 'Original document is missing. Please upload the original birth certificate.',
    uploaded: '2026-08-25',
    dueDate: '2026-09-01',
    priority: 'high',
    documents: 2,
    requestCount: 1,
  },
  {
    id: 'PD-002',
    orderId: 'APS-40217',
    customer: 'Sarah Johnson',
    documentType: 'Marriage Certificate',
    status: 'document_unclear',
    reason: 'Document is blurry and unreadable. Please upload a clearer scan.',
    uploaded: '2026-08-24',
    dueDate: '2026-08-28',
    priority: 'normal',
    documents: 1,
    requestCount: 2,
  },
  {
    id: 'PD-003',
    orderId: 'APS-40216',
    customer: 'Michael Chen',
    documentType: 'Academic Transcript',
    status: 'additional_required',
    reason: 'Additional document required: Official translation of the transcript.',
    uploaded: '2026-08-23',
    dueDate: '2026-08-30',
    priority: 'low',
    documents: 0,
    requestCount: 1,
  },
  {
    id: 'PD-004',
    orderId: 'APS-40215',
    customer: 'Emma Williams',
    documentType: 'Passport',
    status: 'invalid_document',
    reason: 'Document is invalid. Please provide a valid passport copy.',
    uploaded: '2026-08-22',
    dueDate: '2026-08-26',
    priority: 'high',
    documents: 1,
    requestCount: 3,
  },
  {
    id: 'PD-005',
    orderId: 'APS-40214',
    customer: 'James O\'Brien',
    documentType: 'Corporate Document',
    status: 'not_uploaded',
    reason: 'Customer has not uploaded the required corporate documents.',
    uploaded: '2026-08-21',
    dueDate: '2026-08-25',
    priority: 'normal',
    documents: 0,
    requestCount: 0,
  },
  {
    id: 'PD-006',
    orderId: 'APS-40213',
    customer: 'Maria Garcia',
    documentType: 'Diploma',
    status: 'changes_required',
    reason: 'Signature missing on the document. Please sign and re-upload.',
    uploaded: '2026-08-20',
    dueDate: '2026-08-24',
    priority: 'high',
    documents: 1,
    requestCount: 2,
  },
  {
    id: 'PD-007',
    orderId: 'APS-40212',
    customer: 'David Okafor',
    documentType: 'Police Clearance',
    status: 'document_unclear',
    reason: 'Document is too dark to read. Please upload a brighter scan.',
    uploaded: '2026-08-19',
    dueDate: '2026-08-23',
    priority: 'normal',
    documents: 1,
    requestCount: 1,
  },
];

// Status configurations
const statusConfig = {
  changes_required: {
    label: 'Changes Required',
    color: '#D4AF37',
    bg: 'rgba(212, 175, 55, 0.1)',
    icon: FileWarning,
    description: 'Officer requested changes',
  },
  document_unclear: {
    label: 'Document Unclear',
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.1)',
    icon: AlertCircle,
    description: 'Document is unclear or blurry',
  },
  additional_required: {
    label: 'Additional Required',
    color: '#8B5CF6',
    bg: 'rgba(139, 92, 246, 0.1)',
    icon: Plus,
    description: 'Additional document required',
  },
  invalid_document: {
    label: 'Invalid Document',
    color: '#EF4444',
    bg: 'rgba(239, 68, 68, 0.1)',
    icon: FileX,
    description: 'Document is invalid',
  },
  not_uploaded: {
    label: 'Not Uploaded',
    color: '#94A3B8',
    bg: 'rgba(148, 163, 184, 0.1)',
    icon: Upload,
    description: 'Document not uploaded yet',
  },
};

const priorityConfig = {
  high: { label: 'High', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
  normal: { label: 'Normal', color: '#0F4C81', bg: 'rgba(15, 76, 129, 0.1)' },
  low: { label: 'Low', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
};

const filterOptions = {
  status: ['All', 'Changes Required', 'Document Unclear', 'Additional Required', 'Invalid Document', 'Not Uploaded'],
  priority: ['All', 'High', 'Normal', 'Low'],
};

const ApostilleOfficerPendingDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortField, setSortField] = useState('dueDate');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);

  // Filter and sort documents
  const filteredDocuments = React.useMemo(() => {
    let filtered = [...pendingDocuments];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(doc =>
        doc.orderId.toLowerCase().includes(term) ||
        doc.customer.toLowerCase().includes(term) ||
        doc.documentType.toLowerCase().includes(term) ||
        doc.reason.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'All') {
      const statusMap = {
        'Changes Required': 'changes_required',
        'Document Unclear': 'document_unclear',
        'Additional Required': 'additional_required',
        'Invalid Document': 'invalid_document',
        'Not Uploaded': 'not_uploaded',
      };
      filtered = filtered.filter(doc => doc.status === statusMap[statusFilter]);
    }

    if (priorityFilter !== 'All') {
      filtered = filtered.filter(doc => doc.priority === priorityFilter.toLowerCase());
    }

    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'dueDate' || sortField === 'uploaded') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [pendingDocuments, searchTerm, statusFilter, priorityFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredDocuments.length / perPage);
  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleRequestDocument = (doc) => {
    setSelectedDocument(doc);
    setRequestMessage('');
    setShowRequestModal(true);
  };

  const handleViewOrder = (doc) => {
    setSelectedDocument(doc);
    setShowViewModal(true);
  };

  const handleSendRequest = () => {
    console.log(`Request sent for ${selectedDocument.orderId}: ${requestMessage}`);
    setShowRequestModal(false);
    setSelectedDocument(null);
    setRequestMessage('');
  };

  const getStatusBadge = (status) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
        style={{
          background: config.bg,
          color: config.color,
        }}
      >
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const config = priorityConfig[priority] || priorityConfig.normal;
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
        style={{
          background: config.bg,
          color: config.color,
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: config.color }} />
        {config.label}
      </span>
    );
  };

  const getStatusStats = () => {
    const stats = {
      total: pendingDocuments.length,
      changesRequired: pendingDocuments.filter(d => d.status === 'changes_required').length,
      documentUnclear: pendingDocuments.filter(d => d.status === 'document_unclear').length,
      additionalRequired: pendingDocuments.filter(d => d.status === 'additional_required').length,
      invalidDocument: pendingDocuments.filter(d => d.status === 'invalid_document').length,
      notUploaded: pendingDocuments.filter(d => d.status === 'not_uploaded').length,
    };
    return stats;
  };

  const stats = getStatusStats();

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
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                <FileWarning className="w-6 h-6" style={{ color: '#EF4444' }} />
              </div>
              <div>
                <h1
                  className="text-2xl lg:text-3xl font-bold"
                  style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                >
                  Pending Documents
                </h1>
                <p className="text-sm" style={{ color: '#64748B' }}>
                  Documents requiring action from customers
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
              style={{ color: '#64748B', border: '1px solid #E2E8F0' }}
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                color: '#0B1220',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
              }}
            >
              <Send className="w-4 h-4" />
              Send Reminders
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8"
        >
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}>
              {stats.total}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>Total Pending</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#D4AF37' }}>
              {stats.changesRequired}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>Changes Required</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#F59E0B' }}>
              {stats.documentUnclear}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>Document Unclear</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#8B5CF6' }}>
              {stats.additionalRequired}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>Additional Required</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#EF4444' }}>
              {stats.invalidDocument}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>Invalid Document</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#94A3B8' }}>
              {stats.notUploaded}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>Not Uploaded</p>
          </div>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-4 mb-6"
          style={{ border: '1px solid #E2E8F0' }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
              <input
                type="text"
                placeholder="Search by order ID, customer, or document type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              >
                {filterOptions.status.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              >
                {filterOptions.priority.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>

              <select
                value={perPage}
                onChange={(e) => setPerPage(parseInt(e.target.value))}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              >
                <option value="10">10 per page</option>
                <option value="20">20 per page</option>
                <option value="50">50 per page</option>
                <option value="100">100 per page</option>
              </select>

              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('All');
                  setPriorityFilter('All');
                  setPerPage(10);
                  setCurrentPage(1);
                }}
                className="px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                style={{ color: '#64748B', border: '1px solid #E2E8F0' }}
              >
                Reset
              </button>
            </div>
          </div>
        </motion.div>

        {/* Documents Table */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-white rounded-2xl overflow-hidden"
          style={{ border: '1px solid #E2E8F0' }}
        >
          <div className="max-w-[400px] md:max-w-[700px] lg:max-w-[1140px] overflow-x-auto">
              <table className="w-full min-w-[700px]">
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <th
                    className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('orderId')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Order ID
                      {sortField === 'orderId' && (
                        sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th
                    className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('customer')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Customer
                      {sortField === 'customer' && (
                        sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Document Type
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Status
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Reason
                  </th>
                  <th
                    className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('dueDate')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Due Date
                      {sortField === 'dueDate' && (
                        sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Priority
                  </th>
                  <th className="text-right text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {paginatedDocuments.length > 0 ? (
                    paginatedDocuments.map((doc, index) => (
                      <motion.tr
                        key={doc.id}
                        variants={fadeUp}
                        className="hover:bg-gray-50 transition-colors"
                        style={{ borderBottom: index < paginatedDocuments.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                      >
                        <td className="py-3.5 px-4">
                          <span className="text-sm font-medium" style={{ color: '#0F4C81' }}>
                            {doc.orderId}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm" style={{ color: '#0B1220' }}>
                            {doc.customer}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm" style={{ color: '#64748B' }}>
                            {doc.documentType}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {getStatusBadge(doc.status)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm truncate max-w-[200px] block" style={{ color: '#64748B' }}>
                            {doc.reason}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm" style={{ color: '#64748B' }}>
                            {new Date(doc.dueDate).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {getPriorityBadge(doc.priority)}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleViewOrder(doc)}
                              className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                              style={{ color: '#64748B' }}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRequestDocument(doc)}
                              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105"
                              style={{
                                background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                                color: '#0B1220',
                              }}
                            >
                              Request
                            </button>
                            <button
                              className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                              style={{ color: '#64748B' }}
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">
                        <div className="text-center py-12">
                          <FileWarning className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                          <h3 className="text-lg font-semibold mb-1" style={{ color: '#0B1220' }}>
                            No pending documents
                          </h3>
                          <p className="text-sm" style={{ color: '#64748B' }}>
                            {searchTerm || statusFilter !== 'All' || priorityFilter !== 'All'
                              ? 'Try adjusting your filters'
                              : 'All documents are up to date'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: '#E2E8F0' }}>
              <span className="text-sm" style={{ color: '#64748B' }}>
                Showing {((currentPage - 1) * perPage) + 1} to{' '}
                {Math.min(currentPage * perPage, filteredDocuments.length)} of {filteredDocuments.length} documents
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
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                        pageNum === currentPage
                          ? 'text-white'
                          : 'hover:bg-gray-100'
                      }`}
                      style={{
                        background: pageNum === currentPage
                          ? 'linear-gradient(135deg, #0B1220, #1A2A4A)'
                          : 'transparent',
                        color: pageNum === currentPage ? 'white' : '#64748B',
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}
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

      {/* Request Document Modal */}
      <AnimatePresence>
        {showRequestModal && selectedDocument && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowRequestModal(false)}
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
                    style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                  >
                    Request Document
                  </h2>
                  <button
                    onClick={() => setShowRequestModal(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Order ID</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedDocument.orderId}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Customer</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedDocument.customer}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Document Type</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedDocument.documentType}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Current Status</p>
                    {getStatusBadge(selectedDocument.status)}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                      Request Message
                    </label>
                    <textarea
                      value={requestMessage}
                      onChange={(e) => setRequestMessage(e.target.value)}
                      placeholder="Explain what document is needed and why..."
                      rows="4"
                      className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none"
                      style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <button
                    onClick={() => setShowRequestModal(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: '#64748B' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendRequest}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                      color: '#0B1220',
                    }}
                  >
                    <Send className="w-4 h-4" />
                    Send Request
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View Order Modal */}
      <AnimatePresence>
        {showViewModal && selectedDocument && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowViewModal(false)}
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
                  <h2                    className="text-xl font-bold"
                    style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                  >
                    Order Details
                  </h2>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>Order ID</p>
                      <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                        {selectedDocument.orderId}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>Customer</p>
                      <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                        {selectedDocument.customer}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>Document Type</p>
                      <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                        {selectedDocument.documentType}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>Priority</p>
                      {getPriorityBadge(selectedDocument.priority)}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Status</p>
                    {getStatusBadge(selectedDocument.status)}
                  </div>

                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Reason</p>
                    <p className="text-sm" style={{ color: '#0B1220' }}>
                      {selectedDocument.reason}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Request Count</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedDocument.requestCount} reminder{selectedDocument.requestCount > 1 ? 's' : ''} sent
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: '#64748B' }}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      handleRequestDocument(selectedDocument);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                      color: '#0B1220',
                    }}
                  >
                    <Send className="w-4 h-4" />
                    Request Document
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

export default ApostilleOfficerPendingDocuments;