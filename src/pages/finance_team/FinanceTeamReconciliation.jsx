import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Receipt,
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
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  X,
  ArrowUpRight,
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
  Scale,
  Banknote as BanknoteIcon,
  Layers,
  GitCompare,
  Equal,
  Upload,
} from 'lucide-react';

// Sample reconciliation data
const reconciliations = [
  {
    id: 'REC-001',
    reference: 'INV-2026-0845',
    customer: 'John Doe',
    orderId: 'APS-40218',
    expectedAmount: 149.00,
    receivedAmount: 149.00,
    difference: 0.00,
    currency: 'GBP',
    paymentDate: '2026-08-30T10:30:00',
    status: 'matched',
    bankReference: 'BNK-2026-08-30-001',
    systemReference: 'TX-2026-08-30-001',
    notes: 'Payment matched successfully',
  },
  {
    id: 'REC-002',
    reference: 'INV-2026-0844',
    customer: 'Sarah Johnson',
    orderId: 'APS-40217',
    expectedAmount: 299.00,
    receivedAmount: 299.00,
    difference: 0.00,
    currency: 'GBP',
    paymentDate: '2026-08-29T14:20:00',
    status: 'matched',
    bankReference: 'BNK-2026-08-29-002',
    systemReference: 'TX-2026-08-29-002',
    notes: 'Payment matched successfully',
  },
  {
    id: 'REC-003',
    reference: 'INV-2026-0843',
    customer: 'Michael Chen',
    orderId: 'APS-40216',
    expectedAmount: 89.00,
    receivedAmount: 85.00,
    difference: -4.00,
    currency: 'GBP',
    paymentDate: '2026-08-29T09:15:00',
    status: 'partially_matched',
    bankReference: 'BNK-2026-08-29-003',
    systemReference: 'TX-2026-08-29-003',
    notes: 'Partial payment received. Difference of £4.00',
  },
  {
    id: 'REC-004',
    reference: 'INV-2026-0842',
    customer: 'Emma Williams',
    orderId: 'APS-40215',
    expectedAmount: 129.00,
    receivedAmount: 0.00,
    difference: -129.00,
    currency: 'GBP',
    paymentDate: '2026-08-28T16:45:00',
    status: 'unmatched',
    bankReference: null,
    systemReference: 'TX-2026-08-28-004',
    notes: 'Awaiting bank transfer confirmation',
  },
  {
    id: 'REC-005',
    reference: 'INV-2026-0841',
    customer: 'James O\'Brien',
    orderId: 'APS-40214',
    expectedAmount: 399.00,
    receivedAmount: 399.50,
    difference: 0.50,
    currency: 'GBP',
    paymentDate: '2026-08-28T11:00:00',
    status: 'needs_review',
    bankReference: 'BNK-2026-08-28-005',
    systemReference: 'TX-2026-08-28-005',
    notes: 'Amount mismatch of £0.50. Investigate currency conversion.',
  },
  {
    id: 'REC-006',
    reference: 'INV-2026-0840',
    customer: 'Maria Garcia',
    orderId: 'APS-40213',
    expectedAmount: 159.00,
    receivedAmount: 159.00,
    difference: 0.00,
    currency: 'GBP',
    paymentDate: '2026-08-27T13:30:00',
    status: 'matched',
    bankReference: 'BNK-2026-08-27-006',
    systemReference: 'TX-2026-08-27-006',
    notes: 'Payment matched successfully',
  },
  {
    id: 'REC-007',
    reference: 'INV-2026-0839',
    customer: 'David Okafor',
    orderId: 'APS-40212',
    expectedAmount: 149.00,
    receivedAmount: 149.00,
    difference: 0.00,
    currency: 'GBP',
    paymentDate: '2026-08-26T15:00:00',
    status: 'matched',
    bankReference: 'BNK-2026-08-26-007',
    systemReference: 'TX-2026-08-26-007',
    notes: 'Payment matched successfully',
  },
  {
    id: 'REC-008',
    reference: 'INV-2026-0838',
    customer: 'Aisha Patel',
    orderId: 'APS-40211',
    expectedAmount: 279.00,
    receivedAmount: 0.00,
    difference: -279.00,
    currency: 'GBP',
    paymentDate: '2026-08-25T10:00:00',
    status: 'unmatched',
    bankReference: null,
    systemReference: 'TX-2026-08-25-008',
    notes: 'Payment pending - Bank transfer not yet received',
  },
];

// Reconciliation status configurations
const statusConfig = {
  matched: { label: 'Matched', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', icon: CheckCircle2 },
  unmatched: { label: 'Unmatched', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', icon: XCircle },
  partially_matched: { label: 'Partially Matched', color: '#D4AF37', bg: 'rgba(212, 175, 55, 0.1)', icon: Percent },
  needs_review: { label: 'Needs Review', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', icon: AlertCircle },
};

const filterOptions = {
  status: ['All', 'Matched', 'Unmatched', 'Partially Matched', 'Needs Review'],
};

const FinanceTeamReconciliation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('paymentDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedReconciliation, setSelectedReconciliation] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionNote, setActionNote] = useState('');
  const [actionType, setActionType] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Filter and sort reconciliations
  const filteredReconciliations = React.useMemo(() => {
    let filtered = [...reconciliations];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(r =>
        r.reference.toLowerCase().includes(term) ||
        r.customer.toLowerCase().includes(term) ||
        r.orderId.toLowerCase().includes(term) ||
        r.bankReference?.toLowerCase().includes(term) ||
        r.systemReference?.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(r => r.status === statusFilter.toLowerCase());
    }

    if (dateRange.start) {
      filtered = filtered.filter(r => r.paymentDate >= dateRange.start);
    }
    if (dateRange.end) {
      filtered = filtered.filter(r => r.paymentDate <= dateRange.end);
    }

    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'paymentDate') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else if (sortField === 'expectedAmount' || sortField === 'receivedAmount' || sortField === 'difference') {
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
  }, [reconciliations, searchTerm, statusFilter, dateRange, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredReconciliations.length / perPage);
  const paginatedReconciliations = filteredReconciliations.slice(
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

  const handleView = (reconciliation) => {
    setSelectedReconciliation(reconciliation);
    setShowDetails(true);
  };

  const handleAction = (reconciliation, action) => {
    setSelectedReconciliation(reconciliation);
    setActionType(action);
    setActionNote('');
    setShowActionModal(true);
  };

  const handleActionSubmit = () => {
    console.log(`Reconciliation ${selectedReconciliation.reference} ${actionType} with note: ${actionNote}`);
    setShowActionModal(false);
    setSelectedReconciliation(null);
    setActionNote('');
    setActionType('');
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

  const formatCurrency = (amount, currency = 'GBP') => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency,
    }).format(Math.abs(amount));
  };

  const getReconciliationStats = () => {
    const stats = {
      total: reconciliations.length,
      totalExpected: reconciliations.reduce((sum, r) => sum + r.expectedAmount, 0),
      totalReceived: reconciliations.reduce((sum, r) => sum + r.receivedAmount, 0),
      totalDifference: reconciliations.reduce((sum, r) => sum + r.difference, 0),
      matched: reconciliations.filter(r => r.status === 'matched').length,
      unmatched: reconciliations.filter(r => r.status === 'unmatched').length,
      partiallyMatched: reconciliations.filter(r => r.status === 'partially_matched').length,
      needsReview: reconciliations.filter(r => r.status === 'needs_review').length,
    };
    return stats;
  };

  const stats = getReconciliationStats();

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
                <Scale className="w-6 h-6" style={{ color: '#D4AF37' }} />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-[#0B1220]">
                  Payment Reconciliation
                </h1>
                <p className="text-sm text-[#64748B]">
                  Compare system payments with bank records
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
              <Upload className="w-4 h-4" />
              Import Bank Statement
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
            <p className="text-2xl font-bold text-[#10B981]">{stats.matched}</p>
            <p className="text-xs text-[#64748B]">Matched</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#EF4444]">{stats.unmatched}</p>
            <p className="text-xs text-[#64748B]">Unmatched</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#D4AF37]">{stats.partiallyMatched}</p>
            <p className="text-xs text-[#64748B]">Partially Matched</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#F59E0B]">{stats.needsReview}</p>
            <p className="text-xs text-[#64748B]">Needs Review</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-xl font-bold text-[#10B981]">{formatCurrency(stats.totalReceived)}</p>
            <p className="text-xs text-[#64748B]">Received</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-xl font-bold text-[#EF4444]">{formatCurrency(Math.abs(stats.totalDifference))}</p>
            <p className="text-xs text-[#64748B]">Difference</p>
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
                placeholder="Search by reference, customer, order ID, or bank reference..."
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

        {/* Reconciliation Table */}
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
                    onClick={() => handleSort('reference')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Reference
                      {sortField === 'reference' && (
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
                    className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('orderId')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Order
                      {sortField === 'orderId' && (
                        sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th
                    className="text-right text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('expectedAmount')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Expected
                      {sortField === 'expectedAmount' && (
                        sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th
                    className="text-right text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('receivedAmount')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Received
                      {sortField === 'receivedAmount' && (
                        sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th
                    className="text-right text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('difference')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Difference
                      {sortField === 'difference' && (
                        sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th
                    className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('paymentDate')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Payment Date
                      {sortField === 'paymentDate' && (
                        sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Status
                  </th>
                  <th className="text-right text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {paginatedReconciliations.length > 0 ? (
                    paginatedReconciliations.map((reconciliation, index) => (
                      <motion.tr
                        key={reconciliation.id}
                        variants={fadeUp}
                        className="hover:bg-gray-50 transition-colors"
                        style={{ borderBottom: index < paginatedReconciliations.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                      >
                        <td className="py-3.5 px-4">
                          <span className="text-sm font-medium text-[#0F4C81]">
                            {reconciliation.reference}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-[#0B1220]">
                            {reconciliation.customer}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-[#64748B]">
                            {reconciliation.orderId}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="text-sm text-[#64748B]">
                            {formatCurrency(reconciliation.expectedAmount, reconciliation.currency)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className={`text-sm font-semibold ${reconciliation.receivedAmount === 0 ? 'text-[#EF4444]' : 'text-[#0B1220]'}`}>
                            {formatCurrency(reconciliation.receivedAmount, reconciliation.currency)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className={`text-sm font-semibold ${reconciliation.difference === 0 ? 'text-[#10B981]' : reconciliation.difference < 0 ? 'text-[#EF4444]' : 'text-[#F59E0B]'}`}>
                            {reconciliation.difference === 0 ? '£0.00' : formatCurrency(reconciliation.difference, reconciliation.currency)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-[#64748B]">
                            {new Date(reconciliation.paymentDate).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {getStatusBadge(reconciliation.status)}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleView(reconciliation)}
                              className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                              style={{ color: '#64748B' }}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {(reconciliation.status === 'unmatched' || reconciliation.status === 'partially_matched' || reconciliation.status === 'needs_review') && (
                              <button
                                onClick={() => handleAction(reconciliation, 'resolve')}
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
                      <td colSpan="9">
                        <div className="text-center py-12">
                          <Scale className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                          <h3 className="text-lg font-semibold mb-1 text-[#0B1220]">
                            No reconciliation records found
                          </h3>
                          <p className="text-sm text-[#64748B]">
                            {searchTerm || statusFilter !== 'All' || dateRange.start || dateRange.end
                              ? 'Try adjusting your filters'
                              : 'No payment records to reconcile'}
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
                {Math.min(currentPage * perPage, filteredReconciliations.length)} of {filteredReconciliations.length} records
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

      {/* Reconciliation Details Modal */}
      <AnimatePresence>
        {showDetails && selectedReconciliation && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDetails(false)}
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
                      Reconciliation Details
                    </h2>
                    <p className="text-sm text-[#64748B]">
                      {selectedReconciliation.reference}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Customer</p>
                    <p className="text-sm font-medium text-[#0B1220]">
                      {selectedReconciliation.customer}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Order ID</p>
                    <p className="text-sm font-medium text-[#0B1220]">
                      {selectedReconciliation.orderId}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl text-center" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Expected Amount</p>
                    <p className="text-lg font-bold text-[#0B1220]">
                      {formatCurrency(selectedReconciliation.expectedAmount, selectedReconciliation.currency)}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl text-center" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Received Amount</p>
                    <p className={`text-lg font-bold ${selectedReconciliation.receivedAmount === 0 ? 'text-[#EF4444]' : 'text-[#0B1220]'}`}>
                      {formatCurrency(selectedReconciliation.receivedAmount, selectedReconciliation.currency)}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl text-center" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Difference</p>
                    <p className={`text-lg font-bold ${selectedReconciliation.difference === 0 ? 'text-[#10B981]' : selectedReconciliation.difference < 0 ? 'text-[#EF4444]' : 'text-[#F59E0B]'}`}>
                      {selectedReconciliation.difference === 0 ? '£0.00' : formatCurrency(selectedReconciliation.difference, selectedReconciliation.currency)}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Status</p>
                    {getStatusBadge(selectedReconciliation.status)}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Bank Reference</p>
                      <p className="text-sm font-medium text-[#0B1220]">
                        {selectedReconciliation.bankReference || 'N/A'}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">System Reference</p>
                      <p className="text-sm font-medium text-[#0B1220]">
                        {selectedReconciliation.systemReference || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Payment Date</p>
                    <p className="text-sm font-medium text-[#0B1220]">
                      {new Date(selectedReconciliation.paymentDate).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Notes</p>
                    <p className="text-sm text-[#64748B]">
                      {selectedReconciliation.notes}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                  {(selectedReconciliation.status === 'unmatched' || selectedReconciliation.status === 'partially_matched' || selectedReconciliation.status === 'needs_review') && (
                    <button
                      onClick={() => {
                        setShowDetails(false);
                        handleAction(selectedReconciliation, 'resolve');
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #10B981, #059669)',
                        color: 'white',
                      }}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Resolve Reconciliation
                    </button>
                  )}
                  <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: '#64748B', border: '1px solid #E2E8F0' }}
                  >
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                  <button
                    onClick={() => setShowDetails(false)}
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
        {showActionModal && selectedReconciliation && (
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
                    Resolve Reconciliation
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
                    <p className="text-xs text-[#94A3B8]">Reference</p>
                    <p className="text-sm font-medium text-[#0B1220]">
                      {selectedReconciliation.reference}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Expected</p>
                      <p className="text-sm font-medium text-[#0B1220]">
                        {formatCurrency(selectedReconciliation.expectedAmount, selectedReconciliation.currency)}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Received</p>
                      <p className={`text-sm font-medium ${selectedReconciliation.receivedAmount === 0 ? 'text-[#EF4444]' : 'text-[#0B1220]'}`}>
                        {formatCurrency(selectedReconciliation.receivedAmount, selectedReconciliation.currency)}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Status</p>
                    {getStatusBadge(selectedReconciliation.status)}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                      Resolution Notes <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={actionNote}
                      onChange={(e) => setActionNote(e.target.value)}
                      placeholder="Explain how this was resolved..."
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
                      background: 'linear-gradient(135deg, #10B981, #059669)',
                      color: 'white',
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Mark as Resolved
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

export default FinanceTeamReconciliation;