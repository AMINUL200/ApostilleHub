import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  DollarSign,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  ChevronDown,
  ArrowUpDown,
  Download,
  Eye,
  Printer,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Banknote,
  Wallet,
  Landmark,
  Smartphone,
  Shield,
  Award,
  TrendingUp,
  FileText,
  Receipt,
  AlertCircle,
  Info,
  Copy,
  ExternalLink,
  Star,
  Users,
  Package,
  Headphones,
  MessageCircle,
  Plus,
  Trash2,
  Edit2,
  MoreHorizontal,
  Check,
  X,
  ArrowUpRight,
  ArrowDownRight,
  Building,
  Globe,
  Lock,
  Key,
  Fingerprint,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

// Payment history data
const payments = [
  {
    id: 'PAY-001',
    transactionId: 'TX-2026-08-15-001',
    orderId: 'APS-40218',
    amount: 149.00,
    method: 'credit_card',
    status: 'completed',
    date: '2026-08-15',
    description: 'Apostille Services - Standard Processing',
    receiptUrl: '#',
  },
  {
    id: 'PAY-002',
    transactionId: 'TX-2026-08-12-002',
    orderId: 'APS-40217',
    amount: 299.00,
    method: 'paypal',
    status: 'completed',
    date: '2026-08-12',
    description: 'Embassy Legalisation - Express Processing',
    receiptUrl: '#',
  },
  {
    id: 'PAY-003',
    transactionId: 'TX-2026-08-10-003',
    orderId: 'APS-40216',
    amount: 89.00,
    method: 'bank_transfer',
    status: 'pending',
    date: '2026-08-10',
    description: 'Notary Services - Standard Processing',
    receiptUrl: '#',
  },
  {
    id: 'PAY-004',
    transactionId: 'TX-2026-08-08-004',
    orderId: 'APS-40215',
    amount: 129.00,
    method: 'credit_card',
    status: 'completed',
    date: '2026-08-08',
    description: 'Translation Services - Express Processing',
    receiptUrl: '#',
  },
  {
    id: 'PAY-005',
    transactionId: 'TX-2026-08-05-005',
    orderId: 'APS-40214',
    amount: 399.00,
    method: 'debit_card',
    status: 'failed',
    date: '2026-08-05',
    description: 'Corporate Documents - Standard Processing',
    receiptUrl: '#',
  },
  {
    id: 'PAY-006',
    transactionId: 'TX-2026-08-02-006',
    orderId: 'APS-40213',
    amount: 159.00,
    method: 'paypal',
    status: 'refunded',
    date: '2026-08-02',
    description: 'Educational Documents - Standard Processing',
    receiptUrl: '#',
  },
  {
    id: 'PAY-007',
    transactionId: 'TX-2026-07-30-007',
    orderId: 'APS-40212',
    amount: 149.00,
    method: 'bank_transfer',
    status: 'completed',
    date: '2026-07-30',
    description: 'Apostille Services - Express Processing',
    receiptUrl: '#',
  },
  {
    id: 'PAY-008',
    transactionId: 'TX-2026-07-28-008',
    orderId: 'APS-40211',
    amount: 279.00,
    method: 'credit_card',
    status: 'pending',
    date: '2026-07-28',
    description: 'Embassy Legalisation - Standard Processing',
    receiptUrl: '#',
  },
];

// Payment methods
const paymentMethods = [
  {
    id: 'credit_card',
    name: 'Credit Card',
    icon: CreditCard,
    color: '#0F4C81',
    last4: '4242',
    expiry: '12/26',
    isDefault: true,
    brand: 'Visa',
  },
  {
    id: 'debit_card',
    name: 'Debit Card',
    icon: Wallet,
    color: '#10B981',
    last4: '5678',
    expiry: '08/25',
    isDefault: false,
    brand: 'Mastercard',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.5 8.5C19.5 8.5 19.1 10.5 17.5 11.5C16 12.5 14 12.5 14 12.5L13.5 15.5H10.5L11.5 10.5H14C14 10.5 15.5 10.5 16.5 9.5C17.5 8.5 17.5 7.5 17.5 7.5C17.5 7.5 17.5 6.5 16.5 5.5C15.5 4.5 14 4.5 14 4.5H8L7 10.5H9.5L10 8.5H13.5C13.5 8.5 14.5 8.5 15 9C15.5 9.5 15 10.5 15 10.5L19.5 8.5Z" fill="#0070BA"/>
        <path d="M14.5 14.5H11.5L10.5 20.5H8.5L9.5 14.5H6.5L5.5 20.5H3.5L4.5 14.5H2.5L3.5 8.5H9.5C9.5 8.5 11 8.5 12 9.5C13 10.5 12.5 12.5 12.5 12.5H13.5C15 12.5 16.5 11 16.5 11L15.5 14.5H14.5Z" fill="#003087"/>
      </svg>
    ),
    color: '#0070BA',
    last4: null,
    expiry: null,
    isDefault: false,
    brand: 'PayPal',
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    icon: Landmark,
    color: '#8B5CF6',
    last4: null,
    expiry: null,
    isDefault: false,
    brand: 'Bank',
  },
];

// Status configurations
const statusConfig = {
  completed: {
    label: 'Completed',
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
  failed: {
    label: 'Failed',
    icon: XCircle,
    color: '#EF4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
  },
  refunded: {
    label: 'Refunded',
    icon: DollarSign,
    color: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.1)',
  },
};

// Payment method icons mapping
const methodIcons = {
  credit_card: CreditCard,
  debit_card: Wallet,
  paypal: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.5 8.5C19.5 8.5 19.1 10.5 17.5 11.5C16 12.5 14 12.5 14 12.5L13.5 15.5H10.5L11.5 10.5H14C14 10.5 15.5 10.5 16.5 9.5C17.5 8.5 17.5 7.5 17.5 7.5C17.5 7.5 17.5 6.5 16.5 5.5C15.5 4.5 14 4.5 14 4.5H8L7 10.5H9.5L10 8.5H13.5C13.5 8.5 14.5 8.5 15 9C15.5 9.5 15 10.5 15 10.5L19.5 8.5Z" fill="#0070BA"/>
      <path d="M14.5 14.5H11.5L10.5 20.5H8.5L9.5 14.5H6.5L5.5 20.5H3.5L4.5 14.5H2.5L3.5 8.5H9.5C9.5 8.5 11 8.5 12 9.5C13 10.5 12.5 12.5 12.5 12.5H13.5C15 12.5 16.5 11 16.5 11L15.5 14.5H14.5Z" fill="#003087"/>
    </svg>
  ),
  bank_transfer: Landmark,
};

const filterOptions = {
  status: ['All', 'Completed', 'Pending', 'Failed', 'Refunded'],
  method: ['All', 'Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer'],
  dateRange: ['All Time', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Year'],
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

const CustomerPayments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [methodFilter, setMethodFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All Time');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showAddMethod, setShowAddMethod] = useState(false);

  const itemsPerPage = 5;

  // Filter and sort payments
  const filteredPayments = useMemo(() => {
    let filtered = [...payments];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.transactionId.toLowerCase().includes(term) ||
        p.orderId.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.id.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(p => p.status === statusFilter.toLowerCase());
    }

    // Method filter
    if (methodFilter !== 'All') {
      const methodMap = {
        'Credit Card': 'credit_card',
        'Debit Card': 'debit_card',
        'PayPal': 'paypal',
        'Bank Transfer': 'bank_transfer',
      };
      filtered = filtered.filter(p => p.method === methodMap[methodFilter]);
    }

    // Date filter
    if (dateFilter !== 'All Time') {
      const now = new Date();
      const days = {
        'Last 7 Days': 7,
        'Last 30 Days': 30,
        'Last 90 Days': 90,
      };
      const cutoff = new Date(now.setDate(now.getDate() - (days[dateFilter] || 0)));
      filtered = filtered.filter(p => new Date(p.date) >= cutoff);
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'date') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else if (sortField === 'amount') {
        aVal = Number(aVal);
        bVal = Number(bVal);
      } else {
        aVal = aVal.toString().toLowerCase();
        bVal = bVal.toString().toLowerCase();
      }
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [payments, searchTerm, statusFilter, methodFilter, dateFilter, sortField, sortDirection]);

  // Stats
  const stats = [
    { label: 'Total Spent', value: '£1,652.00', icon: DollarSign, color: '#0F4C81' },
    { label: 'Completed', value: payments.filter(p => p.status === 'completed').length, icon: CheckCircle2, color: '#10B981' },
    { label: 'Pending', value: payments.filter(p => p.status === 'pending').length, icon: Clock, color: '#F59E0B' },
    { label: 'Refunded', value: payments.filter(p => p.status === 'refunded').length, icon: DollarSign, color: '#8B5CF6' },
  ];

  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleViewReceipt = (payment) => {
    setSelectedPayment(payment);
    setShowReceiptModal(true);
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

  const getMethodIcon = (method) => {
    const icon = methodIcons[method] || CreditCard;
    if (typeof icon === 'function') {
      return icon();
    }
    const Icon = icon;
    return <Icon className="w-4 h-4" style={{ color: '#64748B' }} />;
  };

  const getMethodName = (method) => {
    const names = {
      credit_card: 'Credit Card',
      debit_card: 'Debit Card',
      paypal: 'PayPal',
      bank_transfer: 'Bank Transfer',
    };
    return names[method] || method;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
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
            <h1
              className="text-2xl lg:text-3xl font-bold"
              style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
            >
              Payments
            </h1>
            <p className="text-sm" style={{ color: '#64748B' }}>
              View your payment history and manage payment methods
            </p>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
              color: '#0B1220',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
            }}
          >
            <Plus className="w-4 h-4" />
            Add Payment Method
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
                placeholder="Search by transaction ID, order ID, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
              />
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
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Export */}
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors hover:bg-gray-100"
              style={{ color: '#64748B', border: '1px solid #E2E8F0' }}
            >
              <Download className="w-4 h-4" />
              Export
            </button>
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
                      Payment Method
                    </label>
                    <select
                      value={methodFilter}
                      onChange={(e) => setMethodFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
                    >
                      {filterOptions.method.map((opt) => (
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

        {/* Payment History Table */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-white rounded-2xl overflow-hidden mb-8"
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
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('amount')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Amount
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('method')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Method
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
                  <th
                    className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('date')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Date
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
                  {paginatedPayments.map((payment, index) => (
                    <motion.tr
                      key={payment.id}
                      variants={fadeUp}
                      className="hover:bg-gray-50 transition-colors"
                      style={{ borderBottom: index < paginatedPayments.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                    >
                      <td className="py-3.5 px-4">
                        <div>
                          <p className="text-sm font-medium" style={{ color: '#0F172A' }}>
                            {payment.transactionId}
                          </p>
                          <p className="text-xs" style={{ color: '#94A3B8' }}>
                            {payment.orderId}
                          </p>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-sm font-semibold" style={{ color: '#0F172A' }}>
                          {formatCurrency(payment.amount)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          {getMethodIcon(payment.method)}
                          <span className="text-sm" style={{ color: '#64748B' }}>
                            {getMethodName(payment.method)}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {getStatusBadge(payment.status)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-sm" style={{ color: '#64748B' }}>
                          {new Date(payment.date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleViewReceipt(payment)}
                            className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                            style={{ color: '#64748B' }}
                          >
                            <Receipt className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                            style={{ color: '#64748B' }}
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                            style={{ color: '#64748B' }}
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {paginatedPayments.length === 0 && (
            <div className="text-center py-12">
              <DollarSign className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
              <h3 className="text-lg font-semibold mb-1" style={{ color: '#0F172A' }}>
                No payments found
              </h3>
              <p className="text-sm" style={{ color: '#64748B' }}>
                Try adjusting your filters
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: '#E2E8F0' }}>
              <span className="text-sm" style={{ color: '#64748B' }}>
                Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredPayments.length)} of{' '}
                {filteredPayments.length} transactions
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

        {/* Payment Methods Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl p-6"
          style={{ border: '1px solid #E2E8F0' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-lg font-bold"
              style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
            >
              Payment Methods
            </h2>
            <button
              onClick={() => setShowAddMethod(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                color: '#0B1220',
              }}
            >
              <Plus className="w-4 h-4" />
              Add Method
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isIconFunction = typeof Icon === 'function' && !Icon.prototype?.render;
              
              return (
                <div
                  key={method.id}
                  className={`p-4 rounded-2xl transition-all duration-300 hover:shadow-md ${
                    method.isDefault ? 'border-2 border-[#D4AF37]' : 'border'
                  }`}
                  style={{
                    borderColor: method.isDefault ? '#D4AF37' : '#E2E8F0',
                    background: method.isDefault ? 'rgba(212, 175, 55, 0.05)' : 'white',
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${method.color}15` }}
                    >
                      {isIconFunction ? (
                        <Icon />
                      ) : (
                        <Icon className="w-5 h-5" style={{ color: method.color }} />
                      )}
                    </div>
                    {method.isDefault && (
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{
                          background: 'rgba(212, 175, 55, 0.15)',
                          color: '#D4AF37',
                        }}
                      >
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>
                    {method.name}
                  </p>
                  {method.last4 && (
                    <p className="text-xs" style={{ color: '#64748B' }}>
                      •••• {method.last4}
                    </p>
                  )}
                  {method.expiry && (
                    <p className="text-xs" style={{ color: '#94A3B8' }}>
                      Expires {method.expiry}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t" style={{ borderColor: '#E2E8F0' }}>
                    {!method.isDefault && (
                      <button className="text-xs font-medium hover:text-[#D4AF37] transition-colors" style={{ color: '#64748B' }}>
                        Set Default
                      </button>
                    )}
                    <button className="text-xs font-medium hover:text-red-500 transition-colors" style={{ color: '#64748B' }}>
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Receipt Modal */}
      <AnimatePresence>
        {showReceiptModal && selectedPayment && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowReceiptModal(false)}
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
                    Payment Receipt
                  </h2>
                  <button
                    onClick={() => setShowReceiptModal(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Receipt Content */}
                <div className="rounded-2xl p-6" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <div className="text-center mb-6">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
                      style={{
                        background: selectedPayment.status === 'completed'
                          ? 'rgba(16, 185, 129, 0.15)'
                          : 'rgba(245, 158, 11, 0.15)',
                      }}
                    >
                      {selectedPayment.status === 'completed' ? (
                        <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
                      ) : (
                        <Clock className="w-8 h-8 text-[#F59E0B]" />
                      )}
                    </div>
                    <h3 className="text-lg font-bold" style={{ color: '#0F172A' }}>
                      Payment {selectedPayment.status === 'completed' ? 'Successful' : 'Pending'}
                    </h3>
                    <p className="text-sm" style={{ color: '#64748B' }}>
                      {selectedPayment.transactionId}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b" style={{ borderColor: '#E2E8F0' }}>
                      <span className="text-sm" style={{ color: '#64748B' }}>Amount</span>
                      <span className="text-sm font-semibold" style={{ color: '#0F172A' }}>
                        {formatCurrency(selectedPayment.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b" style={{ borderColor: '#E2E8F0' }}>
                      <span className="text-sm" style={{ color: '#64748B' }}>Payment Method</span>
                      <span className="text-sm font-medium" style={{ color: '#0F172A' }}>
                        {getMethodName(selectedPayment.method)}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b" style={{ borderColor: '#E2E8F0' }}>
                      <span className="text-sm" style={{ color: '#64748B' }}>Order ID</span>
                      <span className="text-sm font-medium" style={{ color: '#0F172A' }}>
                        {selectedPayment.orderId}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b" style={{ borderColor: '#E2E8F0' }}>
                      <span className="text-sm" style={{ color: '#64748B' }}>Date</span>
                      <span className="text-sm font-medium" style={{ color: '#0F172A' }}>
                        {new Date(selectedPayment.date).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm" style={{ color: '#64748B' }}>Status</span>
                      {getStatusBadge(selectedPayment.status)}
                    </div>
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
                    Download Receipt
                  </button>
                  <button
                    onClick={() => setShowReceiptModal(false)}
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

      {/* Add Payment Method Modal */}
      <AnimatePresence>
        {showAddMethod && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddMethod(false)}
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
                    style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
                  >
                    Add Payment Method
                  </h2>
                  <button
                    onClick={() => setShowAddMethod(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F172A' }}>
                      Payment Method Type
                    </label>
                    <select className="w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm" style={{ borderColor: '#E2E8F0', color: '#0F172A' }}>
                      <option>Credit Card</option>
                      <option>Debit Card</option>
                      <option>PayPal</option>
                      <option>Bank Transfer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F172A' }}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F172A' }}>
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                        style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F172A' }}>
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                        style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F172A' }}>
                      Name on Card
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="default-method"
                      className="w-4 h-4 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <label htmlFor="default-method" className="text-sm" style={{ color: '#64748B' }}>
                      Set as default payment method
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <button
                    onClick={() => setShowAddMethod(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: '#64748B' }}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                      color: '#0B1220',
                    }}
                  >
                    Add Method
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

export default CustomerPayments;