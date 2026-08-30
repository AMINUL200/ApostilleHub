import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Download,
  Printer,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  SortAsc,
  SortDesc,
  User,
  Calendar,
  Clock,
  DollarSign,
  Package,
  MoreHorizontal,
  Send,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  X,
  ArrowUpRight as ArrowUpRightIcon,
  ArrowDownRight,
  HelpCircle,
  Info,
  ExternalLink,
  Copy,
  Share2,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Truck,
  Home,
  Building2,
  Globe,
  Users,
  Award,
  Star,
  Shield,
  FileText,
  CreditCard,
  Wallet,
  Banknote,
  Landmark,
  PiggyBank,
  Percent,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Zap,
  TrendingUp,
  TrendingDown,
  Activity,
  PieChart,
  BarChart,
  LineChart,
  RefreshCcw,
  ArrowUp,
  ArrowDown,
  Minus,
  Circle,
  CircleCheck,
  CircleDot,
  CircleAlert,
  CircleSlash,
  BadgeCheck,
  AlarmClock,
  AlarmClockCheck,
  AlarmClockPlus,
  AlarmClockOff,
  FileCheck,
  FileX,
  PenSquare,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Check,
  X as XIcon,
} from 'lucide-react';

// Sample refunds data
const refunds = [
  {
    id: 'REF-001',
    refundId: 'REF-2026-08-30-001',
    transactionId: 'TX-2026-08-28-005',
    orderId: 'APS-40214',
    customer: 'James O\'Brien',
    originalAmount: 399.00,
    refundAmount: 399.00,
    currency: 'GBP',
    reason: 'Customer requested cancellation - Full refund',
    status: 'completed',
    requestedDate: '2026-08-28T09:00:00',
    processedDate: '2026-08-28T11:00:00',
    notes: 'Full refund processed for cancelled order. Customer was satisfied with the process.',
    reviewNotes: 'Approved by Finance Manager',
    processedBy: 'Finance Team',
    paymentMethod: 'WorldPay',
  },
  {
    id: 'REF-002',
    refundId: 'REF-2026-08-29-002',
    transactionId: 'TX-2026-08-27-006',
    orderId: 'APS-40213',
    customer: 'Maria Garcia',
    originalAmount: 159.00,
    refundAmount: 50.00,
    currency: 'GBP',
    reason: 'Partial refund - Service fee dispute',
    status: 'approved',
    requestedDate: '2026-08-29T10:30:00',
    processedDate: null,
    notes: 'Customer requested partial refund for processing fee. Awaiting final approval.',
    reviewNotes: 'Partial refund approved - 50 GBP to be refunded',
    processedBy: null,
    paymentMethod: 'PayPal',
  },
  {
    id: 'REF-003',
    refundId: 'REF-2026-08-29-003',
    transactionId: 'TX-2026-08-26-007',
    orderId: 'APS-40212',
    customer: 'David Okafor',
    originalAmount: 149.00,
    refundAmount: 149.00,
    currency: 'GBP',
    reason: 'Duplicate payment - Customer paid twice',
    status: 'processing',
    requestedDate: '2026-08-29T14:15:00',
    processedDate: null,
    notes: 'Processing refund for duplicate payment. Waiting for bank confirmation.',
    reviewNotes: 'Refund approved - Processing initiated',
    processedBy: 'Finance Team',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'REF-004',
    refundId: 'REF-2026-08-28-004',
    transactionId: 'TX-2026-08-25-008',
    orderId: 'APS-40211',
    customer: 'Aisha Patel',
    originalAmount: 279.00,
    refundAmount: 279.00,
    currency: 'GBP',
    reason: 'Service not provided - Order cancelled',
    status: 'under_review',
    requestedDate: '2026-08-28T16:45:00',
    processedDate: null,
    notes: 'Customer claims service was not delivered. Investigating with service team.',
    reviewNotes: 'Under review - Awaiting service team confirmation',
    processedBy: null,
    paymentMethod: 'Stripe',
  },
  {
    id: 'REF-005',
    refundId: 'REF-2026-08-27-005',
    transactionId: 'TX-2026-08-24-009',
    orderId: 'APS-40210',
    customer: 'Thomas Mueller',
    originalAmount: 299.00,
    refundAmount: 299.00,
    currency: 'GBP',
    reason: 'Customer changed mind - Cancellation',
    status: 'requested',
    requestedDate: '2026-08-27T11:20:00',
    processedDate: null,
    notes: 'Customer submitted refund request. Awaiting review.',
    reviewNotes: 'Pending review by Finance team',
    processedBy: null,
    paymentMethod: 'PayPal',
  },
  {
    id: 'REF-006',
    refundId: 'REF-2026-08-26-006',
    transactionId: 'TX-2026-08-23-010',
    orderId: 'APS-40209',
    customer: 'Sarah Johnson',
    originalAmount: 299.00,
    refundAmount: 299.00,
    currency: 'GBP',
    reason: 'Product not as described',
    status: 'rejected',
    requestedDate: '2026-08-26T13:00:00',
    processedDate: '2026-08-26T15:30:00',
    notes: 'Refund rejected - Service was provided as per agreement.',
    reviewNotes: 'Rejected - Service delivered successfully',
    processedBy: 'Finance Team',
    paymentMethod: 'Stripe',
  },
];

// Refund status configurations
const refundStatusConfig = {
  requested: { label: 'Requested', color: '#94A3B8', bg: 'rgba(148, 163, 184, 0.1)', icon: Clock },
  under_review: { label: 'Under Review', color: '#0F4C81', bg: 'rgba(15, 76, 129, 0.1)', icon: RefreshCw },
  approved: { label: 'Approved', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', icon: CheckCircle2 },
  processing: { label: 'Processing', color: '#D4AF37', bg: 'rgba(212, 175, 55, 0.1)', icon: RefreshCcw },
  completed: { label: 'Completed', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', icon: CheckCircle2 },
  rejected: { label: 'Rejected', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', icon: XCircle },
};

const filterOptions = {
  status: ['All', 'Requested', 'Under Review', 'Approved', 'Processing', 'Completed', 'Rejected'],
};

const FinanceTeamRefunds = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('requestedDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [showRefundDetails, setShowRefundDetails] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [actionNote, setActionNote] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Filter and sort refunds
  const filteredRefunds = React.useMemo(() => {
    let filtered = [...refunds];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(r =>
        r.refundId.toLowerCase().includes(term) ||
        r.transactionId.toLowerCase().includes(term) ||
        r.orderId.toLowerCase().includes(term) ||
        r.customer.toLowerCase().includes(term) ||
        r.reason.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(r => r.status === statusFilter.toLowerCase());
    }

    if (dateRange.start) {
      filtered = filtered.filter(r => r.requestedDate >= dateRange.start);
    }
    if (dateRange.end) {
      filtered = filtered.filter(r => r.requestedDate <= dateRange.end);
    }

    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'requestedDate' || sortField === 'processedDate') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else if (sortField === 'originalAmount' || sortField === 'refundAmount') {
        aVal = Number(aVal);
        bVal = Number(bVal);
      } else if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [refunds, searchTerm, statusFilter, dateRange, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredRefunds.length / perPage);
  const paginatedRefunds = filteredRefunds.slice(
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

  const handleViewRefund = (refund) => {
    setSelectedRefund(refund);
    setShowRefundDetails(true);
  };

  const handleAction = (refund, action) => {
    setSelectedRefund(refund);
    setActionType(action);
    setActionNote('');
    setShowActionModal(true);
  };

  const handleActionSubmit = () => {
    console.log(`Refund ${selectedRefund.refundId} ${actionType} with note: ${actionNote}`);
    setShowActionModal(false);
    setSelectedRefund(null);
    setActionNote('');
    setActionType('');
  };

  const getStatusBadge = (status) => {
    const config = refundStatusConfig[status];
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

  const formatCurrency = (amount, currency = 'GBP') => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const getRefundStats = () => {
    const stats = {
      total: refunds.length,
      totalAmount: refunds.reduce((sum, r) => sum + r.refundAmount, 0),
      requested: refunds.filter(r => r.status === 'requested').length,
      underReview: refunds.filter(r => r.status === 'under_review').length,
      approved: refunds.filter(r => r.status === 'approved').length,
      processing: refunds.filter(r => r.status === 'processing').length,
      completed: refunds.filter(r => r.status === 'completed').length,
      rejected: refunds.filter(r => r.status === 'rejected').length,
    };
    return stats;
  };

  const stats = getRefundStats();

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
                <ArrowUpRight className="w-6 h-6" style={{ color: '#EF4444' }} />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-[#0B1220]">
                  Refund Management
                </h1>
                <p className="text-sm text-[#64748B]">
                  Manage all customer refund requests
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
                background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                color: 'white',
                boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
              }}
            >
              <Plus className="w-4 h-4" />
              New Refund
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
            <p className="text-2xl font-bold text-[#0B1220]">{stats.total}</p>
            <p className="text-xs text-[#64748B]">Total</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#94A3B8]">{stats.requested}</p>
            <p className="text-xs text-[#64748B]">Requested</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#0F4C81]">{stats.underReview}</p>
            <p className="text-xs text-[#64748B]">Under Review</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#10B981]">{stats.approved}</p>
            <p className="text-xs text-[#64748B]">Approved</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#D4AF37]">{stats.processing}</p>
            <p className="text-xs text-[#64748B]">Processing</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#10B981]">{stats.completed}</p>
            <p className="text-xs text-[#64748B]">Completed</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#EF4444]">{stats.rejected}</p>
            <p className="text-xs text-[#64748B]">Rejected</p>
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
                placeholder="Search by refund ID, transaction ID, order ID, or customer..."
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

              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                  style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                />
                <span className="text-sm text-[#64748B]">to</span>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                  style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                />
              </div>

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
                  setDateRange({ start: '', end: '' });
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

        {/* Refunds Table */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-white rounded-2xl overflow-hidden"
          style={{ border: '1px solid #E2E8F0' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <th
                    className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('refundId')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Refund ID
                      {sortField === 'refundId' && (
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
                  <th
                    className="text-right text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('refundAmount')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Refund Amount
                      {sortField === 'refundAmount' && (
                        sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Reason
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Status
                  </th>
                  <th
                    className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('requestedDate')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Requested Date
                      {sortField === 'requestedDate' && (
                        sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th className="text-right text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {paginatedRefunds.length > 0 ? (
                    paginatedRefunds.map((refund, index) => (
                      <motion.tr
                        key={refund.id}
                        variants={fadeUp}
                        className="hover:bg-gray-50 transition-colors"
                        style={{ borderBottom: index < paginatedRefunds.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                      >
                        <td className="py-3.5 px-4">
                          <span className="text-sm font-medium text-[#0F4C81]">
                            {refund.refundId}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-[#64748B]">
                            {refund.orderId}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-[#0B1220]">
                            {refund.customer}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="text-sm font-semibold text-[#EF4444]">
                            {formatCurrency(refund.refundAmount, refund.currency)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm truncate max-w-[150px] block" style={{ color: '#64748B' }}>
                            {refund.reason}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {getStatusBadge(refund.status)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-[#64748B]">
                            {new Date(refund.requestedDate).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleViewRefund(refund)}
                              className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                              style={{ color: '#64748B' }}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {refund.status === 'requested' && (
                              <button
                                onClick={() => handleAction(refund, 'review')}
                                className="p-1.5 rounded-lg transition-colors hover:bg-blue-50"
                                style={{ color: '#0F4C81' }}
                              >
                                <RefreshCw className="w-4 h-4" />
                              </button>
                            )}
                            {(refund.status === 'under_review' || refund.status === 'approved') && (
                              <button
                                onClick={() => handleAction(refund, 'process')}
                                className="p-1.5 rounded-lg transition-colors hover:bg-green-50"
                                style={{ color: '#10B981' }}
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                            )}
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
                          <ArrowUpRight className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                          <h3 className="text-lg font-semibold mb-1 text-[#0B1220]">
                            No refunds found
                          </h3>
                          <p className="text-sm text-[#64748B]">
                            {searchTerm || statusFilter !== 'All' || dateRange.start || dateRange.end
                              ? 'Try adjusting your filters'
                              : 'No refund requests available'}
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
              <span className="text-sm text-[#64748B]">
                Showing {((currentPage - 1) * perPage) + 1} to{' '}
                {Math.min(currentPage * perPage, filteredRefunds.length)} of {filteredRefunds.length} refunds
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

      {/* Refund Details Modal */}
      <AnimatePresence>
        {showRefundDetails && selectedRefund && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowRefundDetails(false)}
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
                  <div>
                    <h2 className="text-xl font-bold text-[#0B1220]">
                      Refund Details
                    </h2>
                    <p className="text-sm text-[#64748B]">
                      {selectedRefund.refundId}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowRefundDetails(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Transaction ID</p>
                    <p className="text-sm font-medium text-[#0F4C81]">
                      {selectedRefund.transactionId}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Order ID</p>
                    <p className="text-sm font-medium text-[#0B1220]">
                      {selectedRefund.orderId}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Customer</p>
                    <p className="text-sm font-medium text-[#0B1220]">
                      {selectedRefund.customer}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Payment Method</p>
                    <p className="text-sm font-medium text-[#0B1220]">
                      {selectedRefund.paymentMethod}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Original Amount</p>
                    <p className="text-sm font-medium text-[#0B1220]">
                      {formatCurrency(selectedRefund.originalAmount, selectedRefund.currency)}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Refund Amount</p>
                    <p className="text-lg font-bold text-[#EF4444]">
                      {formatCurrency(selectedRefund.refundAmount, selectedRefund.currency)}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Status</p>
                    {getStatusBadge(selectedRefund.status)}
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Reason</p>
                    <p className="text-sm font-medium text-[#0B1220]">
                      {selectedRefund.reason}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Notes</p>
                    <p className="text-sm text-[#64748B]">
                      {selectedRefund.notes}
                    </p>
                  </div>
                  {selectedRefund.reviewNotes && (
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Review Notes</p>
                      <p className="text-sm text-[#64748B]">
                        {selectedRefund.reviewNotes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Requested Date</p>
                    <p className="text-sm font-medium text-[#0B1220]">
                      {new Date(selectedRefund.requestedDate).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Processed Date</p>
                    <p className="text-sm font-medium text-[#0B1220]">
                      {selectedRefund.processedDate ? new Date(selectedRefund.processedDate).toLocaleString() : 'Not processed yet'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                  {selectedRefund.status === 'requested' && (
                    <button
                      onClick={() => {
                        setShowRefundDetails(false);
                        handleAction(selectedRefund, 'review');
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #0F4C81, #1E6BB8)',
                        color: 'white',
                      }}
                    >
                      <RefreshCw className="w-4 h-4" />
                      Review Refund
                    </button>
                  )}
                  {(selectedRefund.status === 'under_review' || selectedRefund.status === 'approved') && (
                    <button
                      onClick={() => {
                        setShowRefundDetails(false);
                        handleAction(selectedRefund, 'process');
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #10B981, #059669)',
                        color: 'white',
                      }}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Process Refund
                    </button>
                  )}
                  <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: '#64748B', border: '1px solid #E2E8F0' }}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => setShowRefundDetails(false)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: '#64748B', border: '1px solid #E2E8F0' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Action Modal */}
      <AnimatePresence>
        {showActionModal && selectedRefund && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowActionModal(false)}
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
                  <h2 className="text-xl font-bold text-[#0B1220]">
                    {actionType === 'review' ? 'Review Refund' : 
                     actionType === 'process' ? 'Process Refund' : 
                     actionType === 'approve' ? 'Approve Refund' :
                     actionType === 'reject' ? 'Reject Refund' : 'Action'}
                  </h2>
                  <button
                    onClick={() => setShowActionModal(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Refund</p>
                    <p className="text-sm font-medium text-[#0B1220]">
                      {selectedRefund.refundId} - {formatCurrency(selectedRefund.refundAmount, selectedRefund.currency)}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Customer</p>
                    <p className="text-sm font-medium text-[#0B1220]">
                      {selectedRefund.customer}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Reason</p>
                    <p className="text-sm font-medium text-[#0B1220]">
                      {selectedRefund.reason}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                      {actionType === 'review' ? 'Review Notes' : 
                       actionType === 'process' ? 'Processing Notes' :
                       actionType === 'approve' ? 'Approval Notes' :
                       actionType === 'reject' ? 'Rejection Reason' : 'Notes'}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={actionNote}
                      onChange={(e) => setActionNote(e.target.value)}
                      placeholder={actionType === 'review' ? 'Add your review notes...' : 
                                 actionType === 'process' ? 'Add processing notes...' :
                                 actionType === 'reject' ? 'Provide reason for rejection...' : 
                                 'Add notes...'}
                      rows="3"
                      className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none"
                      style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <button
                    onClick={() => setShowActionModal(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: '#64748B' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleActionSubmit}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: actionType === 'reject' 
                        ? 'linear-gradient(135deg, #EF4444, #DC2626)' 
                        : 'linear-gradient(135deg, #10B981, #059669)',
                      color: 'white',
                    }}
                  >
                    {actionType === 'review' && <RefreshCw className="w-4 h-4" />}
                    {actionType === 'process' && <CheckCircle2 className="w-4 h-4" />}
                    {actionType === 'approve' && <CheckCircle2 className="w-4 h-4" />}
                    {actionType === 'reject' && <XCircle className="w-4 h-4" />}
                    {actionType === 'review' ? 'Submit Review' : 
                     actionType === 'process' ? 'Process Refund' :
                     actionType === 'approve' ? 'Approve' :
                     actionType === 'reject' ? 'Reject' : 'Submit'}
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

export default FinanceTeamRefunds;