import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Calendar,
  Download,
  Printer,
  Eye,
  RefreshCw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  PieChart,
  BarChart,
  LineChart,
  Activity,
  Users,
  Package,
  FileText,
  Building2,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Shield,
  Award,
  Star,
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
  Plus,
  X,
  Settings,
  LogOut,
  Bell,
  User,
  UserCircle,
  LayoutDashboard,
  Receipt,
  Wallet,
  Banknote,
  Landmark,
  PiggyBank,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Percent,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
} from 'lucide-react';

// Revenue data
const revenueData = {
  daily: { amount: 4250, change: 12.5, trend: 'up' },
  weekly: { amount: 28450, change: 8.3, trend: 'up' },
  monthly: { amount: 124800, change: 15.7, trend: 'up' },
  yearly: { amount: 1456200, change: 22.4, trend: 'up' },
};

// Recent payments data
const recentPayments = [
  {
    id: 'PAY-001',
    transactionId: 'TX-2026-08-30-001',
    customer: 'John Doe',
    order: 'APS-40218',
    amount: 149.00,
    method: 'Credit Card',
    status: 'completed',
    date: '2026-08-30T10:30:00',
  },
  {
    id: 'PAY-002',
    transactionId: 'TX-2026-08-29-002',
    customer: 'Sarah Johnson',
    order: 'APS-40217',
    amount: 299.00,
    method: 'PayPal',
    status: 'completed',
    date: '2026-08-29T14:20:00',
  },
  {
    id: 'PAY-003',
    transactionId: 'TX-2026-08-29-003',
    customer: 'Michael Chen',
    order: 'APS-40216',
    amount: 89.00,
    method: 'Bank Transfer',
    status: 'pending',
    date: '2026-08-29T09:15:00',
  },
  {
    id: 'PAY-004',
    transactionId: 'TX-2026-08-28-004',
    customer: 'Emma Williams',
    order: 'APS-40215',
    amount: 129.00,
    method: 'Credit Card',
    status: 'failed',
    date: '2026-08-28T16:45:00',
  },
  {
    id: 'PAY-005',
    transactionId: 'TX-2026-08-28-005',
    customer: 'James O\'Brien',
    order: 'APS-40214',
    amount: 399.00,
    method: 'Debit Card',
    status: 'refunded',
    date: '2026-08-28T11:00:00',
  },
  {
    id: 'PAY-006',
    transactionId: 'TX-2026-08-27-006',
    customer: 'Maria Garcia',
    order: 'APS-40213',
    amount: 159.00,
    method: 'PayPal',
    status: 'partially_refunded',
    date: '2026-08-27T13:30:00',
  },
];

// Recent invoices data
const recentInvoices = [
  {
    id: 'INV-001',
    invoiceNumber: 'INV-2026-0845',
    customer: 'John Doe',
    amount: 149.00,
    status: 'paid',
    dueDate: '2026-09-15',
    date: '2026-08-30',
  },
  {
    id: 'INV-002',
    invoiceNumber: 'INV-2026-0844',
    customer: 'Sarah Johnson',
    amount: 299.00,
    status: 'paid',
    dueDate: '2026-09-14',
    date: '2026-08-29',
  },
  {
    id: 'INV-003',
    invoiceNumber: 'INV-2026-0843',
    customer: 'Michael Chen',
    amount: 89.00,
    status: 'pending',
    dueDate: '2026-09-13',
    date: '2026-08-29',
  },
  {
    id: 'INV-004',
    invoiceNumber: 'INV-2026-0842',
    customer: 'Emma Williams',
    amount: 129.00,
    status: 'overdue',
    dueDate: '2026-08-28',
    date: '2026-08-28',
  },
  {
    id: 'INV-005',
    invoiceNumber: 'INV-2026-0841',
    customer: 'James O\'Brien',
    amount: 399.00,
    status: 'refunded',
    dueDate: '2026-08-27',
    date: '2026-08-27',
  },
];

// Payment status configuration
const paymentStatusConfig = {
  completed: { label: 'Completed', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', icon: CheckCircle2 },
  pending: { label: 'Pending', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', icon: Clock },
  failed: { label: 'Failed', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', icon: XCircle },
  refunded: { label: 'Refunded', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)', icon: ArrowUpRight },
  partially_refunded: { label: 'Partially Refunded', color: '#D4AF37', bg: 'rgba(212, 175, 55, 0.1)', icon: Percent },
};

const invoiceStatusConfig = {
  paid: { label: 'Paid', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
  pending: { label: 'Pending', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  overdue: { label: 'Overdue', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
  refunded: { label: 'Refunded', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
};

const FinanceTeamDashboard = () => {
  const [timeRange, setTimeRange] = useState('weekly');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);

  // Summary stats
  const summaryStats = {
    totalRevenue: 1456200,
    pendingPayments: 28450,
    paidAmount: 1248000,
    outstandingAmount: 34500,
    refundedAmount: 12450,
  };

  const paymentStats = {
    paid: 1248000,
    pending: 28450,
    failed: 5600,
    refunded: 12450,
    partiallyRefunded: 8900,
  };

  const getPaymentStatusBadge = (status) => {
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

  const getInvoiceStatusBadge = (status) => {
    const config = invoiceStatusConfig[status];
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
    }).format(amount);
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
              <div className="p-2.5 rounded-xl" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                <DollarSign className="w-6 h-6" style={{ color: '#10B981' }} />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-[#0B1220]">
                  Finance Dashboard
                </h1>
                <p className="text-sm text-[#64748B]">
                  Real-time financial overview and analytics
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
                background: 'linear-gradient(135deg, #10B981, #059669)',
                color: 'white',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
              }}
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
        >
          <motion.div
            variants={fadeUp}
            className="p-5 rounded-2xl transition-all duration-300 hover:shadow-lg"
            style={{ background: 'white', border: '1px solid #E2E8F0' }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                <DollarSign className="w-5 h-5" style={{ color: '#10B981' }} />
              </div>
              <span className="text-xs font-medium text-[#10B981] flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" />
                +22.4%
              </span>
            </div>
            <p className="text-2xl font-bold text-[#0B1220]">
              {formatCurrency(summaryStats.totalRevenue)}
            </p>
            <p className="text-xs font-medium text-[#64748B]">Total Revenue</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="p-5 rounded-2xl transition-all duration-300 hover:shadow-lg"
            style={{ background: 'white', border: '1px solid #E2E8F0' }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                <Clock className="w-5 h-5" style={{ color: '#F59E0B' }} />
              </div>
              <span className="text-xs font-medium text-[#F59E0B] flex items-center gap-0.5">
                <ArrowDownRight className="w-3 h-3" />
                -5.2%
              </span>
            </div>
            <p className="text-2xl font-bold text-[#0B1220]">
              {formatCurrency(summaryStats.pendingPayments)}
            </p>
            <p className="text-xs font-medium text-[#64748B]">Pending Payments</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="p-5 rounded-2xl transition-all duration-300 hover:shadow-lg"
            style={{ background: 'white', border: '1px solid #E2E8F0' }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                <CheckCircle2 className="w-5 h-5" style={{ color: '#10B981' }} />
              </div>
              <span className="text-xs font-medium text-[#10B981] flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" />
                +18.6%
              </span>
            </div>
            <p className="text-2xl font-bold text-[#0B1220]">
              {formatCurrency(summaryStats.paidAmount)}
            </p>
            <p className="text-xs font-medium text-[#64748B]">Paid Amount</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="p-5 rounded-2xl transition-all duration-300 hover:shadow-lg"
            style={{ background: 'white', border: '1px solid #E2E8F0' }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                <AlertCircle className="w-5 h-5" style={{ color: '#EF4444' }} />
              </div>
              <span className="text-xs font-medium text-[#EF4444] flex items-center gap-0.5">
                <ArrowDownRight className="w-3 h-3" />
                -2.1%
              </span>
            </div>
            <p className="text-2xl font-bold text-[#0B1220]">
              {formatCurrency(summaryStats.outstandingAmount)}
            </p>
            <p className="text-xs font-medium text-[#64748B]">Outstanding Amount</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="p-5 rounded-2xl transition-all duration-300 hover:shadow-lg"
            style={{ background: 'white', border: '1px solid #E2E8F0' }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                <ArrowUpRight className="w-5 h-5" style={{ color: '#8B5CF6' }} />
              </div>
              <span className="text-xs font-medium text-[#8B5CF6] flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" />
                +4.8%
              </span>
            </div>
            <p className="text-2xl font-bold text-[#0B1220]">
              {formatCurrency(summaryStats.refundedAmount)}
            </p>
            <p className="text-xs font-medium text-[#64748B]">Refunded Amount</p>
          </motion.div>
        </motion.div>

        {/* Revenue Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl p-6 mb-8"
          style={{ border: '1px solid #E2E8F0' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[#0B1220]">
              Revenue Overview
            </h2>
            <div className="flex items-center gap-2">
              {['daily', 'weekly', 'monthly', 'yearly'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    timeRange === range
                      ? 'text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{
                    background: timeRange === range
                      ? 'linear-gradient(135deg, #0B1220, #1A2A4A)'
                      : 'transparent',
                  }}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
              <p className="text-sm font-medium text-[#64748B]">Revenue</p>
              <p className="text-3xl font-bold text-[#0B1220]">
                {formatCurrency(revenueData[timeRange].amount)}
              </p>
              <div className="flex items-center gap-1 mt-1">
                {revenueData[timeRange].trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 text-[#10B981]" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-[#EF4444]" />
                )}
                <span
                  className={`text-sm font-medium ${
                    revenueData[timeRange].trend === 'up' ? 'text-[#10B981]' : 'text-[#EF4444]'
                  }`}
                >
                  {revenueData[timeRange].change}%
                </span>
                <span className="text-sm text-[#64748B]">vs previous period</span>
              </div>
            </div>

            <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
              <p className="text-sm font-medium text-[#64748B]">Transactions</p>
              <p className="text-3xl font-bold text-[#0B1220]">
                142
              </p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-[#10B981]" />
                <span className="text-sm font-medium text-[#10B981]">+12.3%</span>
                <span className="text-sm text-[#64748B]">vs previous period</span>
              </div>
            </div>

            <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
              <p className="text-sm font-medium text-[#64748B]">Average Transaction</p>
              <p className="text-3xl font-bold text-[#0B1220]">
                {formatCurrency(revenueData[timeRange].amount / 142)}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-[#10B981]" />
                <span className="text-sm font-medium text-[#10B981]">+5.7%</span>
                <span className="text-sm text-[#64748B]">vs previous period</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 mb-8"
          style={{ border: '1px solid #E2E8F0' }}
        >
          <h2 className="text-lg font-bold mb-4 text-[#0B1220]">
            Payment Status
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(paymentStatusConfig).map(([key, config]) => {
              const Icon = config.icon;
              const amount = paymentStats[key] || 0;
              const total = Object.values(paymentStats).reduce((a, b) => a + b, 0);
              const percentage = total > 0 ? (amount / total) * 100 : 0;

              return (
                <div
                  key={key}
                  className="p-4 rounded-xl text-center"
                  style={{ background: '#F8FAFC' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                    style={{ background: config.bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: config.color }} />
                  </div>
                  <p className="text-lg font-bold text-[#0B1220]">
                    {formatCurrency(amount)}
                  </p>
                  <p className="text-xs text-[#64748B]">{config.label}</p>
                  <div className="mt-2 w-full h-1.5 rounded-full" style={{ background: '#E2E8F0' }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${percentage}%`,
                        background: config.color,
                      }}
                    />
                  </div>
                  <p className="text-xs mt-1 text-[#94A3B8]">
                    {percentage.toFixed(1)}%
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Payments & Invoices */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Payments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl p-6"
            style={{ border: '1px solid #E2E8F0' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#0B1220]">
                Recent Payments
              </h2>
              <button className="text-sm font-medium transition-colors hover:text-[#D4AF37]" style={{ color: '#0F4C81' }}>
                View All
              </button>
            </div>

            <div className="space-y-3">
              {recentPayments.slice(0, 5).map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedPayment(payment);
                    setShowPaymentDetails(true);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(16, 185, 129, 0.1)' }}
                    >
                      <CreditCard className="w-5 h-5" style={{ color: '#10B981' }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0B1220]">
                        {payment.transactionId}
                      </p>
                      <p className="text-xs text-[#64748B]">
                        {payment.customer} • {payment.order}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#0B1220]">
                      {formatCurrency(payment.amount)}
                    </p>
                    {getPaymentStatusBadge(payment.status)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Invoices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl p-6"
            style={{ border: '1px solid #E2E8F0' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#0B1220]">
                Recent Invoices
              </h2>
              <button className="text-sm font-medium transition-colors hover:text-[#D4AF37]" style={{ color: '#0F4C81' }}>
                View All
              </button>
            </div>

            <div className="space-y-3">
              {recentInvoices.slice(0, 5).map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedInvoice(invoice);
                    setShowInvoiceDetails(true);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(139, 92, 246, 0.1)' }}
                    >
                      <Users className="w-5 h-5" style={{ color: '#8B5CF6' }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0B1220]">
                        {invoice.invoiceNumber}
                      </p>
                      <p className="text-xs text-[#64748B]">
                        {invoice.customer} • Due {new Date(invoice.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#0B1220]">
                      {formatCurrency(invoice.amount)}
                    </p>
                    {getInvoiceStatusBadge(invoice.status)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Stats Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <div className="flex items-center justify-center gap-1">
              <Users className="w-4 h-4 text-[#D4AF37]" />
              <p className="text-sm font-medium text-[#0B1220]">Active Customers</p>
            </div>
            <p className="text-2xl font-bold text-[#0B1220]">
              1,247
            </p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <div className="flex items-center justify-center gap-1">
              <Package className="w-4 h-4 text-[#D4AF37]" />
              <p className="text-sm font-medium text-[#0B1220]">Total Orders</p>
            </div>
            <p className="text-2xl font-bold text-[#0B1220]">
              3,842
            </p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <div className="flex items-center justify-center gap-1">
              <Activity className="w-4 h-4 text-[#D4AF37]" />
              <p className="text-sm font-medium text-[#0B1220]">Success Rate</p>
            </div>
            <p className="text-2xl font-bold text-[#0B1220]">
              98.5%
            </p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
              <p className="text-sm font-medium text-[#0B1220]">Growth Rate</p>
            </div>
            <p className="text-2xl font-bold text-[#0B1220]">
              +22.4%
            </p>
          </div>
        </motion.div>
      </div>

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
                    <p className="text-sm font-medium text-[#0B1220]">
                      {selectedPayment.transactionId}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Customer</p>
                      <p className="text-sm font-medium text-[#0B1220]">
                        {selectedPayment.customer}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Order</p>
                      <p className="text-sm font-medium text-[#0B1220]">
                        {selectedPayment.order}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Amount</p>
                      <p className="text-lg font-bold text-[#0B1220]">
                        {formatCurrency(selectedPayment.amount)}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Payment Method</p>
                      <p className="text-sm font-medium text-[#0B1220]">
                        {selectedPayment.method}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Status</p>
                      {getPaymentStatusBadge(selectedPayment.status)}
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Date</p>
                      <p className="text-sm font-medium text-[#0B1220]">
                        {new Date(selectedPayment.date).toLocaleString()}
                      </p>
                    </div>
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
                    <Eye className="w-4 h-4" />
                    View Order
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

      {/* Invoice Details Modal */}
      <AnimatePresence>
        {showInvoiceDetails && selectedInvoice && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowInvoiceDetails(false)}
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
                    Invoice Details
                  </h2>
                  <button
                    onClick={() => setShowInvoiceDetails(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Invoice Number</p>
                    <p className="text-sm font-medium text-[#0B1220]">
                      {selectedInvoice.invoiceNumber}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Customer</p>
                      <p className="text-sm font-medium text-[#0B1220]">
                        {selectedInvoice.customer}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Amount</p>
                      <p className="text-lg font-bold text-[#0B1220]">
                        {formatCurrency(selectedInvoice.amount)}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Status</p>
                      {getInvoiceStatusBadge(selectedInvoice.status)}
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs text-[#94A3B8]">Due Date</p>
                      <p className="text-sm font-medium text-[#0B1220]">
                        {new Date(selectedInvoice.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Issue Date</p>
                    <p className="text-sm font-medium text-[#0B1220]">
                      {new Date(selectedInvoice.date).toLocaleDateString()}
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
                    Download
                  </button>
                  <button
                    onClick={() => setShowInvoiceDetails(false)}
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

export default FinanceTeamDashboard;