import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Check,
  X,
  AlertCircle,
  Clock,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  SortAsc,
  SortDesc,
  User,
  Calendar,
  FileCheck,
  FileWarning,
  FileX,
  Download,
  Printer,
  Share2,
  MessageCircle,
  Star,
  Award,
  Shield,
  Truck,
  Home,
  Building2,
  Globe,
  Users,
  MoreHorizontal,
  Upload,
  Plus,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Info,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Clock as ClockIcon,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Package,
  Mail,
  Phone,
  MapPin,
  DollarSign,
} from 'lucide-react';

// Sample documents data
const documents = [
  {
    id: 'DOC-001',
    name: 'Birth Certificate_John_Doe.pdf',
    orderId: 'APS-40218',
    customer: 'John Doe',
    documentType: 'Birth Certificate',
    uploaded: '2026-08-25T10:30:00',
    version: 1,
    status: 'pending_review',
    assignedOfficer: 'Officer Smith',
    pageCount: 2,
    size: '2.4 MB',
  },
  {
    id: 'DOC-002',
    name: 'Marriage_Certificate_Smith.pdf',
    orderId: 'APS-40217',
    customer: 'Sarah Johnson',
    documentType: 'Marriage Certificate',
    uploaded: '2026-08-24T14:20:00',
    version: 2,
    status: 'under_review',
    assignedOfficer: 'Officer Smith',
    pageCount: 3,
    size: '1.8 MB',
  },
  {
    id: 'DOC-003',
    name: 'Bachelor_Degree_Transcript.pdf',
    orderId: 'APS-40216',
    customer: 'Michael Chen',
    documentType: 'Academic Transcript',
    uploaded: '2026-08-23T09:15:00',
    version: 1,
    status: 'approved',
    assignedOfficer: 'Officer Smith',
    pageCount: 4,
    size: '3.2 MB',
  },
  {
    id: 'DOC-004',
    name: 'Passport_John_Doe.pdf',
    orderId: 'APS-40215',
    customer: 'Emma Williams',
    documentType: 'Passport',
    uploaded: '2026-08-22T16:45:00',
    version: 1,
    status: 'rejected',
    assignedOfficer: 'Officer Smith',
    pageCount: 2,
    size: '1.2 MB',
  },
  {
    id: 'DOC-005',
    name: 'Company_Incorporation.pdf',
    orderId: 'APS-40214',
    customer: 'James O\'Brien',
    documentType: 'Corporate Document',
    uploaded: '2026-08-21T11:00:00',
    version: 1,
    status: 'changes_required',
    assignedOfficer: 'Officer Smith',
    pageCount: 6,
    size: '4.6 MB',
  },
  {
    id: 'DOC-006',
    name: 'Masters_Diploma.pdf',
    orderId: 'APS-40213',
    customer: 'Maria Garcia',
    documentType: 'Diploma',
    uploaded: '2026-08-20T13:30:00',
    version: 2,
    status: 'pending_review',
    assignedOfficer: 'Officer Smith',
    pageCount: 3,
    size: '2.1 MB',
  },
];

// Review status configurations
const reviewStatusConfig = {
  pending_review: { 
    label: 'Pending Review', 
    color: '#94A3B8', 
    bg: 'rgba(148, 163, 184, 0.1)',
    icon: Clock,
  },
  under_review: { 
    label: 'Under Review', 
    color: '#0F4C81', 
    bg: 'rgba(15, 76, 129, 0.1)',
    icon: RefreshCw,
  },
  approved: { 
    label: 'Approved', 
    color: '#10B981', 
    bg: 'rgba(16, 185, 129, 0.1)',
    icon: CheckCircle2,
  },
  rejected: { 
    label: 'Rejected', 
    color: '#EF4444', 
    bg: 'rgba(239, 68, 68, 0.1)',
    icon: XCircle,
  },
  changes_required: { 
    label: 'Changes Required', 
    color: '#D4AF37', 
    bg: 'rgba(212, 175, 55, 0.1)',
    icon: AlertCircle,
  },
};

const filterOptions = {
  status: ['All', 'Pending Review', 'Under Review', 'Approved', 'Rejected', 'Changes Required'],
};

const DocumentReviewPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('uploaded');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewAction, setReviewAction] = useState(null);

  // Filter and sort documents
  const filteredDocuments = React.useMemo(() => {
    let filtered = [...documents];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(term) ||
        doc.orderId.toLowerCase().includes(term) ||
        doc.customer.toLowerCase().includes(term) ||
        doc.documentType.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'All') {
      const statusMap = {
        'Pending Review': 'pending_review',
        'Under Review': 'under_review',
        'Approved': 'approved',
        'Rejected': 'rejected',
        'Changes Required': 'changes_required',
      };
      filtered = filtered.filter(doc => doc.status === statusMap[statusFilter]);
    }

    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'uploaded') {
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
  }, [documents, searchTerm, statusFilter, sortField, sortDirection]);

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

  const handleReview = (doc) => {
    setSelectedDocument(doc);
    setReviewNotes('');
    setReviewAction(null);
    setShowReviewModal(true);
  };

  const handleReviewAction = (action) => {
    setReviewAction(action);
    // In real app, this would send the review to the API
    console.log(`Document ${selectedDocument.id} reviewed with action: ${action}`);
    console.log(`Notes: ${reviewNotes}`);
    
    // Close modal after a delay
    setTimeout(() => {
      setShowReviewModal(false);
      setSelectedDocument(null);
      setReviewNotes('');
      setReviewAction(null);
    }, 1000);
  };

  const getStatusBadge = (status) => {
    const config = reviewStatusConfig[status];
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

  const getStatusStats = () => {
    const stats = {
      total: documents.length,
      pending: documents.filter(d => d.status === 'pending_review').length,
      underReview: documents.filter(d => d.status === 'under_review').length,
      approved: documents.filter(d => d.status === 'approved').length,
      rejected: documents.filter(d => d.status === 'rejected').length,
      changesRequired: documents.filter(d => d.status === 'changes_required').length,
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
              <div className="p-2.5 rounded-xl" style={{ background: 'rgba(15, 76, 129, 0.1)' }}>
                <FileText className="w-6 h-6" style={{ color: '#0F4C81' }} />
              </div>
              <div>
                <h1
                  className="text-2xl lg:text-3xl font-bold"
                  style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                >
                  Document Review
                </h1>
                <p className="text-sm" style={{ color: '#64748B' }}>
                  Review and verify submitted documents
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
            <p className="text-xs" style={{ color: '#64748B' }}>Total</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#94A3B8' }}>
              {stats.pending}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>Pending</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#0F4C81' }}>
              {stats.underReview}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>Under Review</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#10B981' }}>
              {stats.approved}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>Approved</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#EF4444' }}>
              {stats.rejected}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>Rejected</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#D4AF37' }}>
              {stats.changesRequired}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>Changes Required</p>
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
                placeholder="Search by document name, order ID, or customer..."
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
                    onClick={() => handleSort('name')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Document
                      {sortField === 'name' && (
                        sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      )}
                    </div>
                  </th>
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
                  <th
                    className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('uploaded')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Uploaded
                      {sortField === 'uploaded' && (
                        sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Version
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Status
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Assigned Officer
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
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(15, 76, 129, 0.08)' }}>
                              <FileText className="w-5 h-5" style={{ color: '#0F4C81' }} />
                            </div>
                            <span className="text-sm font-medium truncate max-w-[200px]" style={{ color: '#0B1220' }}>
                              {doc.name}
                            </span>
                          </div>
                        </td>
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
                          <span className="text-sm" style={{ color: '#64748B' }}>
                            {new Date(doc.uploaded).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold" style={{ background: 'rgba(15, 76, 129, 0.08)', color: '#0F4C81' }}>
                            {doc.version}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {getStatusBadge(doc.status)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm" style={{ color: '#64748B' }}>
                            {doc.assignedOfficer}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleReview(doc)}
                              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105"
                              style={{
                                background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                                color: '#0B1220',
                              }}
                            >
                              Review
                            </button>
                            <button
                              className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                              style={{ color: '#64748B' }}
                            >
                              <Download className="w-4 h-4" />
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
                      <td colSpan="9">
                        <div className="text-center py-12">
                          <FileText className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                          <h3 className="text-lg font-semibold mb-1" style={{ color: '#0B1220' }}>
                            No documents found
                          </h3>
                          <p className="text-sm" style={{ color: '#64748B' }}>
                            {searchTerm || statusFilter !== 'All'
                              ? 'Try adjusting your filters'
                              : 'No documents available for review'}
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

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && selectedDocument && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowReviewModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#E2E8F0' }}>
                <div>
                  <h2
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                  >
                    Document Review
                  </h2>
                  <p className="text-sm" style={{ color: '#64748B' }}>
                    {selectedDocument.orderId} - {selectedDocument.name}
                  </p>
                </div>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  style={{ color: '#64748B' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content - Split View */}
              <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                {/* Document Preview - Left */}
                <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg" style={{ background: 'rgba(15, 76, 129, 0.08)' }}>
                      <FileText className="w-5 h-5" style={{ color: '#0F4C81' }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                        {selectedDocument.name}
                      </p>
                      <p className="text-xs" style={{ color: '#64748B' }}>
                        {selectedDocument.pageCount} pages • {selectedDocument.size}
                      </p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors" style={{ color: '#64748B' }}>
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors" style={{ color: '#64748B' }}>
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Document Preview Area */}
                  <div className="bg-white rounded-2xl p-8 text-center min-h-[400px] flex flex-col items-center justify-center" style={{ border: '1px solid #E2E8F0' }}>
                    <FileText className="w-24 h-24 mb-4" style={{ color: '#94A3B8' }} />
                    <p className="text-sm" style={{ color: '#64748B' }}>
                      Document preview will be displayed here
                    </p>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>
                      {selectedDocument.name} • {selectedDocument.pageCount} pages
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(15, 76, 129, 0.08)' }}>
                        <span className="text-xs font-bold" style={{ color: '#0F4C81' }}>1</span>
                      </div>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(15, 76, 129, 0.05)' }}>
                        <span className="text-xs" style={{ color: '#94A3B8' }}>2</span>
                      </div>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(15, 76, 129, 0.05)' }}>
                        <span className="text-xs" style={{ color: '#94A3B8' }}>3</span>
                      </div>
                      <span className="text-xs" style={{ color: '#94A3B8' }}>...</span>
                    </div>
                  </div>
                </div>

                {/* Review Panel - Right */}
                <div className="w-full md:w-96 p-6 overflow-y-auto bg-white border-t md:border-t-0 md:border-l" style={{ borderColor: '#E2E8F0' }}>
                  <h3 className="text-sm font-semibold mb-4" style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}>
                    Document Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-medium" style={{ color: '#94A3B8' }}>Document Type</p>
                      <p className="text-sm" style={{ color: '#0B1220' }}>{selectedDocument.documentType}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium" style={{ color: '#94A3B8' }}>Document Name</p>
                      <p className="text-sm" style={{ color: '#0B1220' }}>{selectedDocument.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium" style={{ color: '#94A3B8' }}>Validity</p>
                      <div className="flex items-center gap-2 mt-1">
                        <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                        <span className="text-sm" style={{ color: '#10B981' }}>Valid Document</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium" style={{ color: '#94A3B8' }}>Requirements</p>
                      <div className="space-y-1 mt-1">
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#10B981]" />
                          <span className="text-xs" style={{ color: '#64748B' }}>Clear scan</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#10B981]" />
                          <span className="text-xs" style={{ color: '#64748B' }}>All pages included</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#10B981]" />
                          <span className="text-xs" style={{ color: '#64748B' }}>Correct format</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span className="text-xs" style={{ color: '#D4AF37' }}>Signature verification pending</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium" style={{ color: '#94A3B8' }}>Current Status</p>
                      <div className="mt-1">
                        {getStatusBadge(selectedDocument.status)}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium" style={{ color: '#94A3B8' }}>Review Notes</p>
                      <textarea
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                        placeholder="Add review notes here..."
                        rows="3"
                        className="w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none text-sm"
                        style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 pt-6 border-t space-y-3" style={{ borderColor: '#E2E8F0' }}>
                    <button
                      onClick={() => handleReviewAction('approve')}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #10B981, #059669)',
                        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                      }}
                    >
                      <Check className="w-4 h-4" />
                      Approve Document
                    </button>
                    <button
                      onClick={() => handleReviewAction('changes')}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                        color: '#0B1220',
                        boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
                      }}
                    >
                      <FileWarning className="w-4 h-4" />
                      Request Changes
                    </button>
                    <button
                      onClick={() => handleReviewAction('reject')}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                        boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
                      }}
                    >
                      <X className="w-4 h-4" />
                      Reject Document
                    </button>
                    <button
                      onClick={() => setShowReviewModal(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                      style={{ color: '#64748B', border: '1px solid #E2E8F0' }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocumentReviewPage;