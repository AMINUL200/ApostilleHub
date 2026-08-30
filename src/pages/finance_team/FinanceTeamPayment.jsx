import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
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
} from 'lucide-react';

// Sample payments data
const payments = [
  {
    id: 'PAY-001',
    transactionId: 'TX-2026-08-30-001',
    orderId: 'APS-40218',
    customer: 'John Doe',
    invoice: 'INV-2026-0845',
    paymentMethod: 'stripe',
    amount: 149.00,
    currency: 'GBP',
    status: 'completed',
    paymentDate: '2026-08-30T10:30:00',
    gatewayResponse: 'Success',
    paymentIntent: 'pi_1234567890',
  },
  {
    id: 'PAY-002',
    transactionId: 'TX-2026-08-29-002',
    orderId: 'APS-40217',
    customer: 'Sarah Johnson',
    invoice: 'INV-2026-0844',
    paymentMethod: 'paypal',
    amount: 299.00,
    currency: 'GBP',
    status: 'completed',
    paymentDate: '2026-08-29T14:20:00',
    gatewayResponse: 'Success',
    paymentIntent: 'PAY-1234567890',
  },
  {
    id: 'PAY-003',
    transactionId: 'TX-2026-08-29-003',
    orderId: 'APS-40216',
    customer: 'Michael Chen',
    invoice: 'INV-2026-0843',
    paymentMethod: 'bank_transfer',
    amount: 89.00,
    currency: 'GBP',
    status: 'pending',
    paymentDate: '2026-08-29T09:15:00',
    gatewayResponse: 'Pending',
    paymentIntent: null,
  },
  {
    id: 'PAY-004',
    transactionId: 'TX-2026-08-28-004',
    orderId: 'APS-40215',
    customer: 'Emma Williams',
    invoice: 'INV-2026-0842',
    paymentMethod: 'stripe',
    amount: 129.00,
    currency: 'GBP',
    status: 'failed',
    paymentDate: '2026-08-28T16:45:00',
    gatewayResponse: 'Declined',
    paymentIntent: 'pi_0987654321',
  },
  {
    id: 'PAY-005',
    transactionId: 'TX-2026-08-28-005',
    orderId: 'APS-40214',
    customer: 'James O\'Brien',
    invoice: 'INV-2026-0841',
    paymentMethod: 'worldpay',
    amount: 399.00,
    currency: 'GBP',
    status: 'refunded',
    paymentDate: '2026-08-28T11:00:00',
    gatewayResponse: 'Refunded',
    paymentIntent: 'wp_1234567890',
  },
  {
    id: 'PAY-006',
    transactionId: 'TX-2026-08-27-006',
    orderId: 'APS-40213',
    customer: 'Maria Garcia',
    invoice: 'INV-2026-0840',
    paymentMethod: 'paypal',
    amount: 159.00,
    currency: 'GBP',
    status: 'partially_refunded',
    paymentDate: '2026-08-27T13:30:00',
    gatewayResponse: 'Partially Refunded',
    paymentIntent: 'PAY-0987654321',
  },
  {
    id: 'PAY-007',
    transactionId: 'TX-2026-08-26-007',
    orderId: 'APS-40212',
    customer: 'David Okafor',
    invoice: 'INV-2026-0839',
    paymentMethod: 'bank_transfer',
    amount: 149.00,
    currency: 'GBP',
    status: 'completed',
    paymentDate: '2026-08-26T15:00:00',
    gatewayResponse: 'Success',
    paymentIntent: null,
  },
  {
    id: 'PAY-008',
    transactionId: 'TX-2026-08-25-008',
    orderId: 'APS-40211',
    customer: 'Aisha Patel',
    invoice: 'INV-2026-0838',
    paymentMethod: 'stripe',
    amount: 279.00,
    currency: 'GBP',
    status: 'pending',
    paymentDate: '2026-08-25T10:00:00',
    gatewayResponse: 'Processing',
    paymentIntent: 'pi_5678901234',
  },
];

// Payment status configurations
const paymentStatusConfig = {
  completed: { label: 'Completed', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', icon: CheckCircle2 },
  pending: { label: 'Pending', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', icon: Clock },
  failed: { label: 'Failed', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', icon: XCircle },
  refunded: { label: 'Refunded', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)', icon: ArrowUpRight },
  partially_refunded: { label: 'Partially Refunded', color: '#D4AF37', bg: 'rgba(212, 175, 55, 0.1)', icon: Percent },
};

// Payment method configurations
const paymentMethodConfig = {
  stripe: { label: 'Stripe', color: '#635BFF', bg: 'rgba(99, 91, 255, 0.1)', icon: CreditCard },
  paypal: { label: 'PayPal', color: '#0070BA', bg: 'rgba(0, 112, 186, 0.1)', icon: Wallet },
  worldpay: { label: 'WorldPay', color: '#F68B1F', bg: 'rgba(246, 139, 31, 0.1)', icon: Globe },
  bank_transfer: { label: 'Bank Transfer', color: '#0F4C81', bg: 'rgba(15, 76, 129, 0.1)', icon: Landmark },
};

const filterOptions = {
  status: ['All', 'Completed', 'Pending', 'Failed', 'Refunded', 'Partially Refunded'],
  method: ['All', 'Stripe', 'PayPal', 'WorldPay', 'Bank Transfer'],
};

const FinanceTeamPayment = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [methodFilter, setMethodFilter] = useState('All');
  const [sortField, setSortField] = useState('paymentDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Filter and sort payments
  const filteredPayments = React.useMemo(() => {
    let filtered = [...payments];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.transactionId.toLowerCase().includes(term) ||
        p.orderId.toLowerCase().includes(term) ||
        p.customer.toLowerCase().includes(term) ||
        p.invoice.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(p => p.status === statusFilter.toLowerCase());
    }

    if (methodFilter !== 'All') {
      const methodMap = {
        'Stripe': 'stripe',
        'PayPal': 'paypal',
        'WorldPay': 'worldpay',
        'Bank Transfer': 'bank_transfer',
      };
      filtered = filtered.filter(p => p.paymentMethod === methodMap[methodFilter]);
    }

    if (dateRange.start) {
      filtered = filtered.filter(p => p.paymentDate >= dateRange.start);
    }
    if (dateRange.end) {
      filtered = filtered.filter(p => p.paymentDate <= dateRange.end);
    }

    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'paymentDate') {
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
  }, [payments, searchTerm, statusFilter, methodFilter, dateRange, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / perPage);
  const paginatedPayments = filteredPayments.slice(
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

  const handleViewPayment = (payment) => {
    setSelectedPayment(payment);
    setShowPaymentDetails(true);
  };

  const getStatusBadge = (status) => {
    const config = paymentStatusConfig[status];
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

  const getPaymentStats = () => {
    const stats = {
      total: payments.length,
      totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
      completed: payments.filter(p => p.status === 'completed').length,
      pending: payments.filter(p => p.status === 'pending').length,
      failed: payments.filter(p => p.status === 'failed').length,
      refunded: payments.filter(p => p.status === 'refunded').length,
      partiallyRefunded: payments.filter(p => p.status === 'partially_refunded').length,
      completedAmount: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
      pendingAmount: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    };
    return stats;
  };

  const stats = getPaymentStats();

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
              <div className="p-2.5 rounded-xl" style={{ background: 'rgba(99, 91, 255, 0.1)' }}>
                <CreditCard className="w-6 h-6" style={{ color: '#635BFF' }} />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-[#0B1220]">
                  Payments
                </h1>
                <p className="text-sm text-[#64748B]">
                  Manage all customer payments
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
                background: 'linear-gradient(135deg, #635BFF, #4F46E5)',
                color: 'white',
                boxShadow: '0 4px 15px rgba(99, 91, 255, 0.3)',
              }}
            >
              <Plus className="w-4 h-4" />
              New Payment
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-8 gap-4 mb-8"
        >
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#0B1220]">{stats.total}</p>
            <p className="text-xs text-[#64748B]">Total</p>
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
            <p className="text-2xl font-bold text-[#8B5CF6]">{stats.refunded}</p>
            <p className="text-xs text-[#64748B]">Refunded</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#D4AF37]">{stats.partiallyRefunded}</p>
            <p className="text-xs text-[#64748B]">Partially Refunded</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-xl font-bold text-[#10B981]">{formatCurrency(stats.completedAmount)}</p>
            <p className="text-xs text-[#64748B]">Completed Amount</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-xl font-bold text-[#F59E0B]">{formatCurrency(stats.pendingAmount)}</p>
            <p className="text-xs text-[#64748B]">Pending Amount</p>
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
                placeholder="Search by transaction ID, order ID, customer, or invoice..."
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

        {/* Payments Table */}
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
                    Method
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
                    Status
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
                  <th className="text-right text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {paginatedPayments.length > 0 ? (
                    paginatedPayments.map((payment, index) => (
                      <motion.tr
                        key={payment.id}
                        variants={fadeUp}
                        className="hover:bg-gray-50 transition-colors"
                        style={{ borderBottom: index < paginatedPayments.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                      >
                        <td className="py-3.5 px-4">
                          <span className="text-sm font-medium text-[#0F4C81]">
                            {payment.transactionId}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-[#64748B]">
                            {payment.orderId}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-[#0B1220]">
                            {payment.customer}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {getPaymentMethodBadge(payment.paymentMethod)}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="text-sm font-semibold text-[#0B1220]">
                            {formatCurrency(payment.amount, payment.currency)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {getStatusBadge(payment.status)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-[#64748B]">
                            {new Date(payment.paymentDate).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleViewPayment(payment)}
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
                      <td colSpan="8">
                        <div className="text-center py-12">
                          <CreditCard className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                          <h3 className="text-lg font-semibold mb-1 text-[#0B1220]">
                            No payments found
                          </h3>
                          <p className="text-sm text-[#64748B]">
                            {searchTerm || statusFilter !== 'All' || methodFilter !== 'All' || dateRange.start || dateRange.end
                              ? 'Try adjusting your filters'
                              : 'No payments available'}
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
                {Math.min(currentPage * perPage, filteredPayments.length)} of {filteredPayments.length} payments
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

        {/* Payment Details Modal */}
        <AnimatePresence>
          {showPaymentDetails && selectedPayment && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowPaymentDetails(false)}
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
                      Payment Details
                    </h2>
                    <button
                      onClick={() => setShowPaymentDetails(false)}
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
                        {selectedPayment.transactionId}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                        <p className="text-xs text-[#94A3B8]">Order ID</p>
                        <p className="text-sm font-medium text-[#0B1220]">
                          {selectedPayment.orderId}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                        <p className="text-xs text-[#94A3B8]">Invoice</p>
                        <p className="text-sm font-medium text-[#0B1220]">
                          {selectedPayment.invoice}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                        <p className="text-xs text-[#94A3B8]">Customer</p>
                        <p className="text-sm font-medium text-[#0B1220]">
                          {selectedPayment.customer}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                        <p className="text-xs text-[#94A3B8]">Payment Method</p>
                        {getPaymentMethodBadge(selectedPayment.paymentMethod)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                        <p className="text-xs text-[#94A3B8]">Amount</p>
                        <p className="text-lg font-bold text-[#0B1220]">
                          {formatCurrency(selectedPayment.amount, selectedPayment.currency)}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                        <p className="text-xs text-[#94A3B8]">Status</p>
                        {getStatusBadge(selectedPayment.status)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                        <p className="text-xs text-[#94A3B8]">Payment Date</p>
                        <p className="text-sm font-medium text-[#0B1220]">
                          {new Date(selectedPayment.paymentDate).toLocaleString()}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                        <p className="text-xs text-[#94A3B8]">Gateway Response</p>
                        <p className="text-sm font-medium text-[#0B1220]">
                          {selectedPayment.gatewayResponse}
                        </p>
                      </div>
                    </div>
                    {selectedPayment.paymentIntent && (
                      <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                        <p className="text-xs text-[#94A3B8]">Payment Intent ID</p>
                        <p className="text-sm font-medium text-[#0B1220]">
                          {selectedPayment.paymentIntent}
                        </p>
                      </div>
                    )}
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
                      onClick={() => setShowPaymentDetails(false)}
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
    </div>
  );
};

export default FinanceTeamPayment;