import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Edit,
  Clock,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  SortAsc,
  SortDesc,
  User,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Zap,
  Truck,
  Home,
  Building2,
  Globe,
  Users,
  MoreHorizontal,
  Download,
  Printer,
  MessageCircle,
  Star,
  Award,
  Shield,
  FileCheck,
  FileText,
  Plus,
  X,
  ArrowUpRight,
  ArrowDownRight,
  HelpCircle,
  Info,
  Play,
  Pause,
  Check,
  Timer,
  ClipboardList,
  TrendingUp,
} from 'lucide-react';

// Sample processing queue data
const processingQueue = [
  {
    id: 'PQ-001',
    orderId: 'APS-40218',
    service: 'Apostille Services',
    country: 'United Kingdom',
    document: 'Birth Certificate',
    processingType: 'Standard',
    priority: 'normal',
    started: '2026-08-29T09:30:00',
    dueDate: '2026-09-01',
    status: 'in_processing',
    assignedOfficer: 'Officer Smith',
    estimatedCompletion: '2026-08-30T17:00:00',
  },
  {
    id: 'PQ-002',
    orderId: 'APS-40217',
    service: 'Embassy Legalisation',
    country: 'United States',
    document: 'Marriage Certificate',
    processingType: 'Express',
    priority: 'high',
    started: '2026-08-29T10:15:00',
    dueDate: '2026-08-28',
    status: 'quality_check',
    assignedOfficer: 'Officer Smith',
    estimatedCompletion: '2026-08-29T15:00:00',
  },
  {
    id: 'PQ-003',
    orderId: 'APS-40216',
    service: 'Notary Services',
    country: 'Canada',
    document: 'Power of Attorney',
    processingType: 'Standard',
    priority: 'normal',
    started: '2026-08-28T14:20:00',
    dueDate: '2026-08-31',
    status: 'ready_for_processing',
    assignedOfficer: 'Officer Smith',
    estimatedCompletion: '2026-08-31T17:00:00',
  },
  {
    id: 'PQ-004',
    orderId: 'APS-40215',
    service: 'Translation Services',
    country: 'Germany',
    document: 'Academic Transcript',
    processingType: 'Express',
    priority: 'high',
    started: '2026-08-28T11:00:00',
    dueDate: '2026-08-27',
    status: 'completed',
    assignedOfficer: 'Officer Smith',
    estimatedCompletion: '2026-08-28T16:00:00',
  },
  {
    id: 'PQ-005',
    orderId: 'APS-40214',
    service: 'Corporate Documents',
    country: 'France',
    document: 'Company Certificate',
    processingType: 'Standard',
    priority: 'low',
    started: '2026-08-27T09:45:00',
    dueDate: '2026-09-02',
    status: 'in_processing',
    assignedOfficer: 'Officer Smith',
    estimatedCompletion: '2026-09-01T17:00:00',
  },
  {
    id: 'PQ-006',
    orderId: 'APS-40213',
    service: 'Educational Documents',
    country: 'Australia',
    document: 'Degree Certificate',
    processingType: 'Standard',
    priority: 'normal',
    started: '2026-08-27T13:30:00',
    dueDate: '2026-09-03',
    status: 'ready_for_processing',
    assignedOfficer: 'Officer Smith',
    estimatedCompletion: '2026-09-03T17:00:00',
  },
  {
    id: 'PQ-007',
    orderId: 'APS-40212',
    service: 'Apostille Services',
    country: 'Spain',
    document: 'Police Clearance',
    processingType: 'Express',
    priority: 'urgent',
    started: '2026-08-29T08:00:00',
    dueDate: '2026-08-29',
    status: 'in_processing',
    assignedOfficer: 'Officer Smith',
    estimatedCompletion: '2026-08-29T14:00:00',
  },
];

// Status configurations
const statusConfig = {
  ready_for_processing: {
    label: 'Ready for Processing',
    color: '#0F4C81',
    bg: 'rgba(15, 76, 129, 0.1)',
    icon: ClipboardList,
  },
  in_processing: {
    label: 'In Processing',
    color: '#D4AF37',
    bg: 'rgba(212, 175, 55, 0.1)',
    icon: Clock,
  },
  quality_check: {
    label: 'Quality Check',
    color: '#8B5CF6',
    bg: 'rgba(139, 92, 246, 0.1)',
    icon: CheckCircle2,
  },
  completed: {
    label: 'Completed',
    color: '#10B981',
    bg: 'rgba(16, 185, 129, 0.1)',
    icon: FileCheck,
  },
};

const priorityConfig = {
  urgent: { label: 'Urgent', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.15)', icon: Zap },
  high: { label: 'High', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', icon: AlertCircle },
  normal: { label: 'Normal', color: '#0F4C81', bg: 'rgba(15, 76, 129, 0.1)', icon: Package },
  low: { label: 'Low', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', icon: Timer },
};

const processingTypeConfig = {
  Express: { label: 'Express', color: '#D4AF37', bg: 'rgba(212, 175, 55, 0.1)' },
  Standard: { label: 'Standard', color: '#0F4C81', bg: 'rgba(15, 76, 129, 0.1)' },
  SameDay: { label: 'Same Day', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
};

const filterOptions = {
  status: ['All', 'Ready for Processing', 'In Processing', 'Quality Check', 'Completed'],
  priority: ['All', 'Urgent', 'High', 'Normal', 'Low'],
  processingType: ['All', 'Express', 'Standard', 'Same Day'],
};

const ApostilleOfficerProcessingQueue = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [processingTypeFilter, setProcessingTypeFilter] = useState('All');
  const [sortField, setSortField] = useState('started');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  // Filter and sort orders
  const filteredOrders = React.useMemo(() => {
    let filtered = [...processingQueue];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(order =>
        order.orderId.toLowerCase().includes(term) ||
        order.document.toLowerCase().includes(term) ||
        order.service.toLowerCase().includes(term) ||
        order.country.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'All') {
      const statusMap = {
        'Ready for Processing': 'ready_for_processing',
        'In Processing': 'in_processing',
        'Quality Check': 'quality_check',
        'Completed': 'completed',
      };
      filtered = filtered.filter(order => order.status === statusMap[statusFilter]);
    }

    if (priorityFilter !== 'All') {
      filtered = filtered.filter(order => order.priority === priorityFilter.toLowerCase());
    }

    if (processingTypeFilter !== 'All') {
      filtered = filtered.filter(order => order.processingType === processingTypeFilter);
    }

    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'started' || sortField === 'dueDate') {
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
  }, [processingQueue, searchTerm, statusFilter, priorityFilter, processingTypeFilter, sortField, sortDirection]);

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

  const handleUpdateStatus = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setShowStatusModal(true);
  };

  const handleStatusUpdate = () => {
    console.log(`Order ${selectedOrder.orderId} status updated to: ${newStatus}`);
    setShowStatusModal(false);
    setSelectedOrder(null);
    setNewStatus('');
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

  const getProcessingTypeBadge = (type) => {
    const config = processingTypeConfig[type] || processingTypeConfig.Standard;
    return (
      <span
        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
        style={{
          background: config.bg,
          color: config.color,
        }}
      >
        {config.label}
      </span>
    );
  };

  const getStatusStats = () => {
    const stats = {
      total: processingQueue.length,
      ready: processingQueue.filter(o => o.status === 'ready_for_processing').length,
      inProcessing: processingQueue.filter(o => o.status === 'in_processing').length,
      qualityCheck: processingQueue.filter(o => o.status === 'quality_check').length,
      completed: processingQueue.filter(o => o.status === 'completed').length,
      urgent: processingQueue.filter(o => o.priority === 'urgent').length,
      express: processingQueue.filter(o => o.processingType === 'Express').length,
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
              <div className="p-2.5 rounded-xl" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
                <ClipboardList className="w-6 h-6" style={{ color: '#D4AF37' }} />
              </div>
              <div>
                <h1
                  className="text-2xl lg:text-3xl font-bold"
                  style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                >
                  Processing Queue
                </h1>
                <p className="text-sm" style={{ color: '#64748B' }}>
                  Manage document processing workflow
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
              <Plus className="w-4 h-4" />
              Add to Queue
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-8"
        >
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}>
              {stats.total}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>Total</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#0F4C81' }}>
              {stats.ready}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>Ready</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#D4AF37' }}>
              {stats.inProcessing}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>Processing</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#8B5CF6' }}>
              {stats.qualityCheck}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>Quality Check</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#10B981' }}>
              {stats.completed}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>Completed</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#EF4444' }}>
              {stats.urgent}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>Urgent</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#D4AF37' }}>
              {stats.express}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>Express</p>
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
                placeholder="Search by order ID, document, or service..."
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

        {/* Processing Queue Table */}
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
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Service
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Country
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Document
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Processing
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Priority
                  </th>
                  <th
                    className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('started')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Started
                      {sortField === 'started' && (
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
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Status
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
                            {order.orderId}
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
                          <span className="text-sm" style={{ color: '#64748B' }}>
                            {order.document}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {getProcessingTypeBadge(order.processingType)}
                        </td>
                        <td className="py-3.5 px-4">
                          {getPriorityBadge(order.priority)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm" style={{ color: '#64748B' }}>
                            {new Date(order.started).toLocaleDateString('en-GB', {
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
                        <td className="py-3.5 px-4">
                          {getStatusBadge(order.status)}
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
                              onClick={() => handleUpdateStatus(order)}
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
                      <td colSpan="10">
                        <div className="text-center py-12">
                          <ClipboardList className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                          <h3 className="text-lg font-semibold mb-1" style={{ color: '#0B1220' }}>
                            No orders in processing queue
                          </h3>
                          <p className="text-sm" style={{ color: '#64748B' }}>
                            {searchTerm || statusFilter !== 'All' || priorityFilter !== 'All' || processingTypeFilter !== 'All'
                              ? 'Try adjusting your filters'
                              : 'All orders have been processed'}
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
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                  >
                    Processing Order Details
                  </h2>
                  <button
                    onClick={() => setShowOrderDetails(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Order ID</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedOrder.orderId}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Service</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedOrder.service}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Document</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedOrder.document}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Country</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedOrder.country}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Processing Type</p>
                    {getProcessingTypeBadge(selectedOrder.processingType)}
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Priority</p>
                    {getPriorityBadge(selectedOrder.priority)}
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Status</p>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Assigned Officer</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedOrder.assignedOfficer}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Started</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {new Date(selectedOrder.started).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Due Date</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {new Date(selectedOrder.dueDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <button
                    onClick={() => setShowOrderDetails(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: '#64748B' }}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowOrderDetails(false);
                      handleUpdateStatus(selectedOrder);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                      color: '#0B1220',
                    }}
                  >
                    <Edit className="w-4 h-4" />
                    Update Status
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Update Status Modal */}
      <AnimatePresence>
        {showStatusModal && selectedOrder && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowStatusModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                  >
                    Update Status
                  </h2>
                  <button
                    onClick={() => setShowStatusModal(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Order</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedOrder.orderId} - {selectedOrder.document}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                      Current Status
                    </label>
                    <div className="p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                      {getStatusBadge(selectedOrder.status)}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                      New Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all appearance-none"
                      style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                    >
                      <option value="ready_for_processing">Ready for Processing</option>
                      <option value="in_processing">In Processing</option>
                      <option value="quality_check">Quality Check</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                      Notes (Optional)
                    </label>
                    <textarea
                      placeholder="Add any notes about this status update..."
                      rows="3"
                      className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none"
                      style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <button
                    onClick={() => setShowStatusModal(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: '#64748B' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleStatusUpdate}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                      color: '#0B1220',
                    }}
                  >
                    <Check className="w-4 h-4" />
                    Update Status
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

export default ApostilleOfficerProcessingQueue;