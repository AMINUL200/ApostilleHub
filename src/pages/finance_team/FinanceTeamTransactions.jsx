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
  Send,
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
} from 'lucide-react';

// Sample transactions data
const transactions = [
  {
    id: 'TXN-001',
    transactionId: 'TX-2026-08-30-001',
    type: 'payment',
    orderId: 'APS-40218',
    customer: 'John Doe',
    amount: 149.00,
    currency: 'GBP',
    paymentMethod: 'stripe',
    reference: 'INV-2026-0845',
    status: 'completed',
    date: '2026-08-30T10:30:00',
    description: 'Payment for Apostille Services',
  },
  {
    id: 'TXN-002',
    transactionId: 'TX-2026-08-29-002',
    type: 'payment',
    orderId: 'APS-40217',
    customer: 'Sarah Johnson',
    amount: 299.00,
    currency: 'GBP',
    paymentMethod: 'paypal',
    reference: 'INV-2026-0844',
    status: 'completed',
    date: '2026-08-29T14:20:00',
    description: 'Payment for Embassy Legalisation',
  },
  {
    id: 'TXN-003',
    transactionId: 'TX-2026-08-29-003',
    type: 'refund',
    orderId: 'APS-40216',
    customer: 'Michael Chen',
    amount: -89.00,
    currency: 'GBP',
    paymentMethod: 'bank_transfer',
    reference: 'REF-2026-0843',
    status: 'completed',
    date: '2026-08-29T09:15:00',
    description: 'Refund for Notary Services - Cancelled order',
  },
  {
    id: 'TXN-004',
    transactionId: 'TX-2026-08-28-004',
    type: 'payment',
    orderId: 'APS-40215',
    customer: 'Emma Williams',
    amount: 129.00,
    currency: 'GBP',
    paymentMethod: 'stripe',
    reference: 'INV-2026-0842',
    status: 'failed',
    date: '2026-08-28T16:45:00',
    description: 'Payment for Translation Services - Declined',
  },
  {
    id: 'TXN-005',
    transactionId: 'TX-2026-08-28-005',
    type: 'refund',
    orderId: 'APS-40214',
    customer: 'James O\'Brien',
    amount: -399.00,
    currency: 'GBP',
    paymentMethod: 'worldpay',
    reference: 'REF-2026-0841',
    status: 'completed',
    date: '2026-08-28T11:00:00',
    description: 'Full refund - Customer request',
  },
  {
    id: 'TXN-006',
    transactionId: 'TX-2026-08-27-006',
    type: 'adjustment',
    orderId: 'APS-40213',
    customer: 'Maria Garcia',
    amount: 30.00,
    currency: 'GBP',
    paymentMethod: 'paypal',
    reference: 'ADJ-2026-0840',
    status: 'completed',
    date: '2026-08-27T13:30:00',
    description: 'Processing fee adjustment - Express service',
  },
  {
    id: 'TXN-007',
    transactionId: 'TX-2026-08-26-007',
    type: 'credit',
    orderId: 'APS-40212',
    customer: 'David Okafor',
    amount: 50.00,
    currency: 'GBP',
    paymentMethod: 'bank_transfer',
    reference: 'CRD-2026-0839',
    status: 'completed',
    date: '2026-08-26T15:00:00',
    description: 'Loyalty credit for repeat customer',
  },
  {
    id: 'TXN-008',
    transactionId: 'TX-2026-08-25-008',
    type: 'payment',
    orderId: 'APS-40211',
    customer: 'Aisha Patel',
    amount: 279.00,
    currency: 'GBP',
    paymentMethod: 'stripe',
    reference: 'INV-2026-0838',
    status: 'pending',
    date: '2026-08-25T10:00:00',
    description: 'Payment for Embassy Legalisation - Processing',
  },
  {
    id: 'TXN-009',
    transactionId: 'TX-2026-08-24-009',
    type: 'adjustment',
    orderId: 'APS-40210',
    customer: 'Thomas Mueller',
    amount: -25.00,
    currency: 'GBP',
    paymentMethod: 'paypal',
    reference: 'ADJ-2026-0837',
    status: 'completed',
    date: '2026-08-24T09:30:00',
    description: 'Discount adjustment - Promotional code',
  },
  {
    id: 'TXN-010',
    transactionId: 'TX-2026-08-23-010',
    type: 'credit',
    orderId: 'APS-40209',
    customer: 'Sarah Johnson',
    amount: 100.00,
    currency: 'GBP',
    paymentMethod: 'stripe',
    reference: 'CRD-2026-0836',
    status: 'pending',
    date: '2026-08-23T14:00:00',
    description: 'Store credit for future order',
  },
];

// Transaction type configurations
const transactionTypeConfig = {
  payment: { label: 'Payment', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', icon: ArrowUp },
  refund: { label: 'Refund', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', icon: ArrowDown },
  adjustment: { label: 'Adjustment', color: '#D4AF37', bg: 'rgba(212, 175, 55, 0.1)', icon: Minus },
  credit: { label: 'Credit', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)', icon: Plus },
};

// Transaction status configurations
const transactionStatusConfig = {
  completed: { label: 'Completed', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', icon: CheckCircle2 },
  pending: { label: 'Pending', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', icon: Clock },
  failed: { label: 'Failed', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', icon: XCircle },
  processing: { label: 'Processing', color: '#0F4C81', bg: 'rgba(15, 76, 129, 0.1)', icon: RefreshCw },
};

// Payment method configurations
const paymentMethodConfig = {
  stripe: { label: 'Stripe', color: '#635BFF', bg: 'rgba(99, 91, 255, 0.1)' },
  paypal: { label: 'PayPal', color: '#0070BA', bg: 'rgba(0, 112, 186, 0.1)' },
  worldpay: { label: 'WorldPay', color: '#F68B1F', bg: 'rgba(246, 139, 31, 0.1)' },
  bank_transfer: { label: 'Bank Transfer', color: '#0F4C81', bg: 'rgba(15, 76, 129, 0.1)' },
};

const filterOptions = {
  type: ['All', 'Payment', 'Refund', 'Adjustment', 'Credit'],
  status: ['All', 'Completed', 'Pending', 'Failed', 'Processing'],
  method: ['All', 'Stripe', 'PayPal', 'WorldPay', 'Bank Transfer'],
};

const FinanceTeamTransactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [methodFilter, setMethodFilter] = useState('All');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Filter and sort transactions
  const filteredTransactions = React.useMemo(() => {
    let filtered = [...transactions];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(t =>
        t.transactionId.toLowerCase().includes(term) ||
        t.orderId.toLowerCase().includes(term) ||
        t.customer.toLowerCase().includes(term) ||
        t.reference.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term)
      );
    }

    if (typeFilter !== 'All') {
      filtered = filtered.filter(t => t.type === typeFilter.toLowerCase());
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(t => t.status === statusFilter.toLowerCase());
    }

    if (methodFilter !== 'All') {
      const methodMap = {
        'Stripe': 'stripe',
        'PayPal': 'paypal',
        'WorldPay': 'worldpay',
        'Bank Transfer': 'bank_transfer',
      };
      filtered = filtered.filter(t => t.paymentMethod === methodMap[methodFilter]);
    }

    if (dateRange.start) {
      filtered = filtered.filter(t => t.date >= dateRange.start);
    }
    if (dateRange.end) {
      filtered = filtered.filter(t => t.date <= dateRange.end);
    }

    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'date') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else if (sortField === 'amount') {
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
  }, [transactions, searchTerm, typeFilter, statusFilter, methodFilter, dateRange, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / perPage);
  const paginatedTransactions = filteredTransactions.slice(
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

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionDetails(true);
  };

  const getTypeBadge = (type) => {
    const config = transactionTypeConfig[type];
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

  const getStatusBadge = (status) => {
    const config = transactionStatusConfig[status];
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

  const getPaymentMethodBadge = (method) => {
    const config = paymentMethodConfig[method];
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

  const formatCurrency = (amount, currency = 'GBP') => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency,
    }).format(Math.abs(amount));
  };

  const getTransactionStats = () => {
    const stats = {
      total: transactions.length,
      totalAmount: transactions.reduce((sum, t) => sum + t.amount, 0),
      payments: transactions.filter(t => t.type === 'payment').length,
      refunds: transactions.filter(t => t.type === 'refund').length,
      adjustments: transactions.filter(t => t.type === 'adjustment').length,
      credits: transactions.filter(t => t.type === 'credit').length,
      completed: transactions.filter(t => t.status === 'completed').length,
      pending: transactions.filter(t => t.status === 'pending').length,
      failed: transactions.filter(t => t.status === 'failed').length,
    };
    return stats;
  };

  const stats = getTransactionStats();

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
              <div className="p-2.5 rounded-xl" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                <Receipt className="w-6 h-6" style={{ color: '#8B5CF6' }} />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-[#0B1220]">
                  Transaction Ledger
                </h1>
                <p className="text-sm text-[#64748B]">
                  Complete financial record of all transactions
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
                background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                color: 'white',
                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
              }}
            >
              <Download className="w-4 h-4" />
              Export Ledger
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-9 gap-4 mb-8"
        >
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#0B1220]">{stats.total}</p>
            <p className="text-xs text-[#64748B]">Total</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#10B981]">{stats.payments}</p>
            <p className="text-xs text-[#64748B]">Payments</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#EF4444]">{stats.refunds}</p>
            <p className="text-xs text-[#64748B]">Refunds</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#D4AF37]">{stats.adjustments}</p>
            <p className="text-xs text-[#64748B]">Adjustments</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#8B5CF6]">{stats.credits}</p>
            <p className="text-xs text-[#64748B]">Credits</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#10B981]">{stats.completed}</p>
            <p className="text-xs text-[#64748B]">Completed</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#F59E0B]">{stats.pending}</p>
            <p className="text-xs text-[#64748B]">Pending</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#EF4444]">{stats.failed}</p>
            <p className="text-xs text-[#64748B]">Failed</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-xl font-bold text-[#0B1220]">{formatCurrency(stats.totalAmount)}</p>
            <p className="text-xs text-[#64748B]">Total Amount</p>
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
                placeholder="Search by transaction ID, order ID, customer, or reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              >
                {filterOptions.type.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>

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
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              >
                {filterOptions.method.map((opt) => (
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
                  setTypeFilter('All');
                  setStatusFilter('All');
                  setMethodFilter('All');
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

        {/* Transactions Table */}
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
                    onClick={() => handleSort('transactionId')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Transaction ID
                      {sortField === 'transactionId' && (
                        sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th
                    className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('type')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Type
                      {sortField === 'type' && (
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
                    onClick={() => handleSort('amount')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Amount
                      {sortField === 'amount' && (
                        sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Payment Method
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Reference
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Status
                  </th>
                  <th
                    className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('date')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Date
                      {sortField === 'date' && (
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
                  {paginatedTransactions.length > 0 ? (
                    paginatedTransactions.map((transaction, index) => (
                      <motion.tr
                        key={transaction.id}
                        variants={fadeUp}
                        className="hover:bg-gray-50 transition-colors"
                        style={{ borderBottom: index < paginatedTransactions.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                      >
                        <td className="py-3.5 px-4">
                          <span className="text-sm font-medium text-[#0F4C81]">
                            {transaction.transactionId}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {getTypeBadge(transaction.type)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-[#64748B]">
                            {transaction.orderId}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-[#0B1220]">
                            {transaction.customer}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className={`text-sm font-semibold ${transaction.amount < 0 ? 'text-[#EF4444]' : 'text-[#0B1220]'}`}>
                            {transaction.amount < 0 ? '-' : ''}{formatCurrency(transaction.amount, transaction.currency)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {getPaymentMethodBadge(transaction.paymentMethod)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-[#64748B]">
                            {transaction.reference}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {getStatusBadge(transaction.status)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-[#64748B]">
                            {new Date(transaction.date).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleViewTransaction(transaction)}
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
                          <Receipt className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                          <h3 className="text-lg font-semibold mb-1 text-[#0B1220]">
                            No transactions found
                          </h3>
                          <p className="text-sm text-[#64748B]">
                            {searchTerm || typeFilter !== 'All' || statusFilter !== 'All' || methodFilter !== 'All' || dateRange.start || dateRange.end
                              ? 'Try adjusting your filters'
                              : 'No transactions available'}
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
                {Math.min(currentPage * perPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
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

      {/* Transaction Details Modal */}
      <AnimatePresence>
        {showTransactionDetails && selectedTransaction && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowTransactionDetails(false)}
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
                    Transaction Details
                  </h2>
                  <button
                    onClick={() => setShowTransactionDetails(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Transaction ID</p>
                    <p className="text-sm font-medium text-[#0F4C81]">
                      {selectedTransaction.transactionId}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Type</p>
                      {getTypeBadge(selectedTransaction.type)}
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Status</p>
                      {getStatusBadge(selectedTransaction.status)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Order ID</p>
                      <p className="text-sm font-medium text-[#0B1220]">
                        {selectedTransaction.orderId}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Customer</p>
                      <p className="text-sm font-medium text-[#0B1220]">
                        {selectedTransaction.customer}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Amount</p>
                      <p className={`text-lg font-bold ${selectedTransaction.amount < 0 ? 'text-[#EF4444]' : 'text-[#0B1220]'}`}>
                        {selectedTransaction.amount < 0 ? '-' : ''}{formatCurrency(selectedTransaction.amount, selectedTransaction.currency)}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Payment Method</p>
                      {getPaymentMethodBadge(selectedTransaction.paymentMethod)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Reference</p>
                      <p className="text-sm font-medium text-[#0B1220]">
                        {selectedTransaction.reference}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Date</p>
                      <p className="text-sm font-medium text-[#0B1220]">
                        {new Date(selectedTransaction.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Description</p>
                    <p className="text-sm font-medium text-[#0B1220]">
                      {selectedTransaction.description}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #0B1220, #1A2A4A)',
                      color: 'white',
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Download Receipt
                  </button>
                  <button
                    onClick={() => setShowTransactionDetails(false)}
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

export default FinanceTeamTransactions;