import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Edit,
  Download,
  Printer,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  SortAsc,
  SortDesc,
  Clock,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  FileText,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock as ClockIcon,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Shield,
  Truck,
  Home,
  Building2,
  Globe,
  Users,
  Award,
  Star,
  MoreHorizontal,
  MessageCircle,
  FileCheck,
  Upload,
  Plus,
  X,
  AlertTriangle,
  Info,
  HelpCircle,
} from 'lucide-react';

// Sample orders data
const orders = [
  {
    id: 'APS-40218',
    customer: 'John Doe',
    service: 'Apostille Services',
    country: 'United Kingdom',
    processingType: 'Standard',
    documentStatus: 'verified',
    orderStatus: 'processing',
    priority: 'high',
    assignedDate: '2026-08-25',
    dueDate: '2026-09-01',
    documents: 3,
    assignedTo: 'Officer',
  },
  {
    id: 'APS-40217',
    customer: 'Sarah Johnson',
    service: 'Embassy Legalisation',
    country: 'United States',
    processingType: 'Express',
    documentStatus: 'under_review',
    orderStatus: 'under_review',
    priority: 'normal',
    assignedDate: '2026-08-24',
    dueDate: '2026-08-28',
    documents: 2,
    assignedTo: 'Officer',
  },
  {
    id: 'APS-40216',
    customer: 'Michael Chen',
    service: 'Notary Services',
    country: 'Canada',
    processingType: 'Standard',
    documentStatus: 'pending',
    orderStatus: 'awaiting_documents',
    priority: 'low',
    assignedDate: '2026-08-23',
    dueDate: '2026-08-30',
    documents: 1,
    assignedTo: 'Officer',
  },
  {
    id: 'APS-40215',
    customer: 'Emma Williams',
    service: 'Translation Services',
    country: 'Germany',
    processingType: 'Express',
    documentStatus: 'processing',
    orderStatus: 'processing',
    priority: 'high',
    assignedDate: '2026-08-22',
    dueDate: '2026-08-26',
    documents: 2,
    assignedTo: 'Officer',
  },
  {
    id: 'APS-40214',
    customer: 'James O\'Brien',
    service: 'Corporate Documents',
    country: 'France',
    processingType: 'Standard',
    documentStatus: 'approved',
    orderStatus: 'completed',
    priority: 'normal',
    assignedDate: '2026-08-20',
    dueDate: '2026-08-25',
    documents: 5,
    assignedTo: 'Officer',
  },
  {
    id: 'APS-40213',
    customer: 'Maria Garcia',
    service: 'Educational Documents',
    country: 'Australia',
    processingType: 'Standard',
    documentStatus: 'rejected',
    orderStatus: 'rejected',
    priority: 'low',
    assignedDate: '2026-08-18',
    dueDate: '2026-08-22',
    documents: 2,
    assignedTo: 'Officer',
  },
  {
    id: 'APS-40212',
    customer: 'David Okafor',
    service: 'Apostille Services',
    country: 'Spain',
    processingType: 'Express',
    documentStatus: 'verified',
    orderStatus: 'processing',
    priority: 'high',
    assignedDate: '2026-08-26',
    dueDate: '2026-08-29',
    documents: 1,
    assignedTo: 'Officer',
  },
  {
    id: 'APS-40211',
    customer: 'Aisha Patel',
    service: 'Embassy Legalisation',
    country: 'Italy',
    processingType: 'Standard',
    documentStatus: 'pending',
    orderStatus: 'new',
    priority: 'normal',
    assignedDate: '2026-08-27',
    dueDate: '2026-09-03',
    documents: 3,
    assignedTo: 'Officer',
  },
];

// Status configurations
const documentStatusConfig = {
  pending: { label: 'Pending', color: '#94A3B8', bg: 'rgba(148, 163, 184, 0.1)' },
  under_review: { label: 'Under Review', color: '#0F4C81', bg: 'rgba(15, 76, 129, 0.1)' },
  processing: { label: 'Processing', color: '#D4AF37', bg: 'rgba(212, 175, 55, 0.1)' },
  verified: { label: 'Verified', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
  approved: { label: 'Approved', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
  rejected: { label: 'Rejected', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
};

const orderStatusConfig = {
  new: { label: 'New', color: '#0F4C81', bg: 'rgba(15, 76, 129, 0.1)' },
  awaiting_documents: { label: 'Awaiting Documents', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  under_review: { label: 'Under Review', color: '#0F4C81', bg: 'rgba(15, 76, 129, 0.1)' },
  processing: { label: 'Processing', color: '#D4AF37', bg: 'rgba(212, 175, 55, 0.1)' },
  completed: { label: 'Completed', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
  rejected: { label: 'Rejected', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
};

const priorityConfig = {
  high: { label: 'High', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
  normal: { label: 'Normal', color: '#0F4C81', bg: 'rgba(15, 76, 129, 0.1)' },
  low: { label: 'Low', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
};

const filterOptions = {
  status: ['All', 'New', 'Assigned to Me', 'Awaiting Documents', 'Under Review', 'Processing', 'Completed', 'Rejected'],
  priority: ['All', 'High', 'Normal', 'Low'],
  processingType: ['All', 'Standard', 'Express'],
};

const ApostillerOfficerMyOrderPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [processingTypeFilter, setProcessingTypeFilter] = useState('All');
  const [sortField, setSortField] = useState('assignedDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(term) ||
        order.customer.toLowerCase().includes(term) ||
        order.service.toLowerCase().includes(term) ||
        order.country.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (statusFilter !== 'All') {
      const statusMap = {
        'New': 'new',
        'Assigned to Me': 'assigned',
        'Awaiting Documents': 'awaiting_documents',
        'Under Review': 'under_review',
        'Processing': 'processing',
        'Completed': 'completed',
        'Rejected': 'rejected',
      };
      const filterValue = statusMap[statusFilter];
      if (filterValue === 'assigned') {
        // Show all orders (they are all assigned to the officer)
        filtered = filtered;
      } else {
        filtered = filtered.filter(order => order.orderStatus === filterValue);
      }
    }

    // Priority filter
    if (priorityFilter !== 'All') {
      filtered = filtered.filter(order => order.priority === priorityFilter.toLowerCase());
    }

    // Processing type filter
    if (processingTypeFilter !== 'All') {
      filtered = filtered.filter(order => order.processingType === processingTypeFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'assignedDate' || sortField === 'dueDate') {
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
  }, [orders, searchTerm, statusFilter, priorityFilter, processingTypeFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / perPage);
  const paginatedOrders = filteredOrders.slice(
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

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const getStatusBadge = (status, config) => {
    const statusConfig = config[status] || config.pending;
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
        style={{
          background: statusConfig.bg,
          color: statusConfig.color,
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusConfig.color }} />
        {statusConfig.label}
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

  // Stats for filter chips
  const stats = {
    total: orders.length,
    new: orders.filter(o => o.orderStatus === 'new').length,
    assigned: orders.length,
    awaiting: orders.filter(o => o.orderStatus === 'awaiting_documents').length,
    underReview: orders.filter(o => o.orderStatus === 'under_review').length,
    processing: orders.filter(o => o.orderStatus === 'processing').length,
    completed: orders.filter(o => o.orderStatus === 'completed').length,
    rejected: orders.filter(o => o.orderStatus === 'rejected').length,
    urgent: orders.filter(o => o.priority === 'high').length,
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
                <Package className="w-6 h-6" style={{ color: '#0F4C81' }} />
              </div>
              <div>
                <h1
                  className="text-2xl lg:text-3xl font-bold"
                  style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                >
                  My Orders
                </h1>
                <p className="text-sm" style={{ color: '#64748B' }}>
                  Manage your assigned apostille and legalisation orders
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.location.reload()}
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
              <Plus className="w-4 h-4" />
              New Order
            </button>
          </div>
        </motion.div>

        {/* Stats Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          <button
            onClick={() => setStatusFilter('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              statusFilter === 'All'
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              background: statusFilter === 'All'
                ? 'linear-gradient(135deg, #0B1220, #1A2A4A)'
                : 'white',
              border: statusFilter === 'All' ? 'none' : '1px solid #E2E8F0',
            }}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setStatusFilter('New')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              statusFilter === 'New'
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              background: statusFilter === 'New'
                ? 'linear-gradient(135deg, #0F4C81, #1E6BB8)'
                : 'white',
              border: statusFilter === 'New' ? 'none' : '1px solid #E2E8F0',
            }}
          >
            New ({stats.new})
          </button>
          <button
            onClick={() => setStatusFilter('Assigned to Me')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              statusFilter === 'Assigned to Me'
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              background: statusFilter === 'Assigned to Me'
                ? 'linear-gradient(135deg, #D4AF37, #F4D03F)'
                : 'white',
              border: statusFilter === 'Assigned to Me' ? 'none' : '1px solid #E2E8F0',
              color: statusFilter === 'Assigned to Me' ? '#0B1220' : '#64748B',
            }}
          >
            Assigned to Me ({stats.assigned})
          </button>
          <button
            onClick={() => setStatusFilter('Awaiting Documents')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              statusFilter === 'Awaiting Documents'
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              background: statusFilter === 'Awaiting Documents'
                ? 'linear-gradient(135deg, #F59E0B, #D97706)'
                : 'white',
              border: statusFilter === 'Awaiting Documents' ? 'none' : '1px solid #E2E8F0',
            }}
          >
            Awaiting Documents ({stats.awaiting})
          </button>
          <button
            onClick={() => setStatusFilter('Under Review')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              statusFilter === 'Under Review'
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              background: statusFilter === 'Under Review'
                ? 'linear-gradient(135deg, #0F4C81, #1E6BB8)'
                : 'white',
              border: statusFilter === 'Under Review' ? 'none' : '1px solid #E2E8F0',
            }}
          >
            Under Review ({stats.underReview})
          </button>
          <button
            onClick={() => setStatusFilter('Processing')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              statusFilter === 'Processing'
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              background: statusFilter === 'Processing'
                ? 'linear-gradient(135deg, #D4AF37, #F4D03F)'
                : 'white',
              border: statusFilter === 'Processing' ? 'none' : '1px solid #E2E8F0',
              color: statusFilter === 'Processing' ? '#0B1220' : '#64748B',
            }}
          >
            Processing ({stats.processing})
          </button>
          <button
            onClick={() => setStatusFilter('Completed')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              statusFilter === 'Completed'
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              background: statusFilter === 'Completed'
                ? 'linear-gradient(135deg, #10B981, #059669)'
                : 'white',
              border: statusFilter === 'Completed' ? 'none' : '1px solid #E2E8F0',
            }}
          >
            Completed ({stats.completed})
          </button>
          <button
            onClick={() => setStatusFilter('Rejected')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              statusFilter === 'Rejected'
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              background: statusFilter === 'Rejected'
                ? 'linear-gradient(135deg, #EF4444, #DC2626)'
                : 'white',
              border: statusFilter === 'Rejected' ? 'none' : '1px solid #E2E8F0',
            }}
          >
            Rejected ({stats.rejected})
          </button>
          <button
            onClick={() => setStatusFilter('Urgent')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              statusFilter === 'Urgent'
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              background: statusFilter === 'Urgent'
                ? 'linear-gradient(135deg, #EF4444, #DC2626)'
                : 'white',
              border: statusFilter === 'Urgent' ? 'none' : '1px solid #E2E8F0',
            }}
          >
            Urgent ({stats.urgent})
          </button>
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
                placeholder="Search by order ID, customer, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
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
                value={processingTypeFilter}
                onChange={(e) => setProcessingTypeFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              >
                {filterOptions.processingType.map((opt) => (
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
                  setProcessingTypeFilter('All');
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

        {/* Orders Table */}
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
                    onClick={() => handleSort('id')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Order ID
                      {sortField === 'id' && (
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
                    Service
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Country
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Processing
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Document Status
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Order Status
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Priority
                  </th>
                  <th
                    className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('assignedDate')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Assigned
                      {sortField === 'assignedDate' && (
                        sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      )}
                    </div>
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
                  <th className="text-right text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {paginatedOrders.length > 0 ? (
                    paginatedOrders.map((order, index) => (
                      <motion.tr
                        key={order.id}
                        variants={fadeUp}
                        className="hover:bg-gray-50 transition-colors"
                        style={{ borderBottom: index < paginatedOrders.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                      >
                        <td className="py-3.5 px-4">
                          <span className="text-sm font-medium" style={{ color: '#0F4C81' }}>
                            {order.id}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm" style={{ color: '#0B1220' }}>
                            {order.customer}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm" style={{ color: '#64748B' }}>
                            {order.service}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm" style={{ color: '#64748B' }}>
                            {order.country}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                              order.processingType === 'Express'
                                ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {order.processingType}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {getStatusBadge(order.documentStatus, documentStatusConfig)}
                        </td>
                        <td className="py-3.5 px-4">
                          {getStatusBadge(order.orderStatus, orderStatusConfig)}
                        </td>
                        <td className="py-3.5 px-4">
                          {getPriorityBadge(order.priority)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm" style={{ color: '#64748B' }}>
                            {new Date(order.assignedDate).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm" style={{ color: '#64748B' }}>
                            {new Date(order.dueDate).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleViewOrder(order)}
                              className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                              style={{ color: '#64748B' }}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                              style={{ color: '#64748B' }}
                            >
                              <Edit className="w-4 h-4" />
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
                      <td colSpan="11">
                        <div className="text-center py-12">
                          <Package className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                          <h3 className="text-lg font-semibold mb-1" style={{ color: '#0B1220' }}>
                            No orders found
                          </h3>
                          <p className="text-sm" style={{ color: '#64748B' }}>
                            {searchTerm || statusFilter !== 'All' || priorityFilter !== 'All' || processingTypeFilter !== 'All'
                              ? 'Try adjusting your filters'
                              : 'No orders assigned to you yet'}
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
                {Math.min(currentPage * perPage, filteredOrders.length)} of {filteredOrders.length} orders
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

      {/* Order Details Modal */}
      <AnimatePresence>
        {showOrderDetails && selectedOrder && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowOrderDetails(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2
                      className="text-xl font-bold"
                      style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                    >
                      Order Details
                    </h2>
                    <p className="text-sm" style={{ color: '#64748B' }}>
                      {selectedOrder.id}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowOrderDetails(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Order Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Customer</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedOrder.customer}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Service</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedOrder.service}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Country</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedOrder.country}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Processing Type</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedOrder.processingType}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Documents</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedOrder.documents} files
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Priority</p>
                    {getPriorityBadge(selectedOrder.priority)}
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Document Status</p>
                    {getStatusBadge(selectedOrder.documentStatus, documentStatusConfig)}
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Order Status</p>
                    {getStatusBadge(selectedOrder.orderStatus, orderStatusConfig)}
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Assigned Date</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {new Date(selectedOrder.assignedDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #0F4C81, #1E6BB8)',
                      color: 'white',
                    }}
                  >
                    <FileCheck className="w-4 h-4" />
                    Review Documents
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                      color: '#0B1220',
                    }}
                  >
                    <Edit className="w-4 h-4" />
                    Update Status
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: '#64748B', border: '1px solid #E2E8F0' }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Contact Customer
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: '#64748B', border: '1px solid #E2E8F0' }}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-red-50 hover:text-red-500"
                    style={{ color: '#64748B', border: '1px solid #E2E8F0' }}
                  >
                    <AlertCircle className="w-4 h-4" />
                    Reject
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

export default ApostillerOfficerMyOrderPage;