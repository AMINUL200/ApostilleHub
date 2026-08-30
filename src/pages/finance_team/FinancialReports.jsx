import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
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
  FileText as FileTextIcon,
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
  Receipt,
  FileSpreadsheet,
  File,
  Printer as PrinterIcon,
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Activity as ActivityIcon,
  CalendarDays,
  Filter as FilterIcon,
  Download as DownloadIcon,
  FileJson,
  FileCode,
  FileSpreadsheet as FileSpreadsheetIcon,
  FileIcon,
} from 'lucide-react';

// Chart data - Revenue
const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  values: [12500, 14800, 13200, 16200, 18900, 21500, 23400, 25600, 28900, 31200, 34800, 39200],
};

// Chart data - Payment status
const paymentStatusData = {
  labels: ['Completed', 'Pending', 'Failed', 'Refunded', 'Partially Refunded'],
  values: [68, 15, 5, 8, 4],
  colors: ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#D4AF37'],
};

// Chart data - Payment methods
const paymentMethodData = {
  labels: ['Stripe', 'PayPal', 'WorldPay', 'Bank Transfer'],
  values: [45, 25, 15, 15],
  colors: ['#635BFF', '#0070BA', '#F68B1F', '#0F4C81'],
};

// Chart data - Revenue by service
const serviceRevenueData = {
  labels: ['Apostille', 'Embassy Legalisation', 'Notary', 'Translation', 'Corporate', 'Educational'],
  values: [28500, 22100, 14300, 9800, 17600, 8200],
  colors: ['#0F4C81', '#D4AF37', '#10B981', '#8B5CF6', '#EF4444', '#F59E0B'],
};

// Chart data - Revenue by country
const countryRevenueData = {
  labels: ['UK', 'USA', 'Canada', 'Australia', 'Germany', 'France', 'Spain', 'Other'],
  values: [32400, 21800, 15600, 12400, 9800, 8200, 6400, 5200],
  colors: ['#0F4C81', '#D4AF37', '#10B981', '#8B5CF6', '#EF4444', '#F59E0B', '#635BFF', '#0070BA'],
};

// Sample report data
const reportData = {
  revenue: [
    { id: 1, date: '2026-08-30', orderId: 'APS-40218', customer: 'John Doe', amount: 149.00, status: 'completed', method: 'Stripe' },
    { id: 2, date: '2026-08-29', orderId: 'APS-40217', customer: 'Sarah Johnson', amount: 299.00, status: 'completed', method: 'PayPal' },
    { id: 3, date: '2026-08-29', orderId: 'APS-40216', customer: 'Michael Chen', amount: 89.00, status: 'pending', method: 'Bank Transfer' },
    { id: 4, date: '2026-08-28', orderId: 'APS-40215', customer: 'Emma Williams', amount: 129.00, status: 'failed', method: 'Stripe' },
    { id: 5, date: '2026-08-28', orderId: 'APS-40214', customer: 'James O\'Brien', amount: 399.00, status: 'refunded', method: 'WorldPay' },
    { id: 6, date: '2026-08-27', orderId: 'APS-40213', customer: 'Maria Garcia', amount: 159.00, status: 'completed', method: 'PayPal' },
    { id: 7, date: '2026-08-26', orderId: 'APS-40212', customer: 'David Okafor', amount: 149.00, status: 'completed', method: 'Bank Transfer' },
    { id: 8, date: '2026-08-25', orderId: 'APS-40211', customer: 'Aisha Patel', amount: 279.00, status: 'pending', method: 'Stripe' },
  ],
};

const reportTypes = [
  { id: 'revenue', label: 'Revenue Report', icon: TrendingUpIcon },
  { id: 'payment', label: 'Payment Report', icon: CreditCard },
  { id: 'invoice', label: 'Invoice Report', icon: FileTextIcon },
  { id: 'refund', label: 'Refund Report', icon: ArrowUpRight },
  { id: 'outstanding', label: 'Outstanding Payments', icon: AlertCircle },
  { id: 'tax', label: 'Tax / VAT Report', icon: Percent },
];

const filterOptions = {
  paymentMethod: ['All', 'Stripe', 'PayPal', 'WorldPay', 'Bank Transfer'],
  currency: ['All', 'GBP', 'USD', 'EUR'],
  service: ['All', 'Apostille', 'Embassy Legalisation', 'Notary', 'Translation', 'Corporate', 'Educational'],
  country: ['All', 'UK', 'USA', 'Canada', 'Australia', 'Germany', 'France', 'Spain'],
  status: ['All', 'Completed', 'Pending', 'Failed', 'Refunded', 'Partially Refunded'],
};

const FinancialReports = () => {
  const [activeReport, setActiveReport] = useState('revenue');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('All');
  const [currencyFilter, setCurrencyFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [exportFormat, setExportFormat] = useState('');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const config = {
      completed: { label: 'Completed', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
      pending: { label: 'Pending', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
      failed: { label: 'Failed', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
      refunded: { label: 'Refunded', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
      partially_refunded: { label: 'Partially Refunded', color: '#D4AF37', bg: 'rgba(212, 175, 55, 0.1)' },
    };
    const configStatus = config[status] || config.completed;
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
        style={{
          background: configStatus.bg,
          color: configStatus.color,
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: configStatus.color }} />
        {configStatus.label}
      </span>
    );
  };

  // Filter report data
  const filteredData = React.useMemo(() => {
    let data = reportData.revenue || [];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      data = data.filter(item =>
        item.orderId.toLowerCase().includes(term) ||
        item.customer.toLowerCase().includes(term)
      );
    }

    if (dateRange.start) {
      data = data.filter(item => item.date >= dateRange.start);
    }
    if (dateRange.end) {
      data = data.filter(item => item.date <= dateRange.end);
    }

    if (paymentMethodFilter !== 'All') {
      data = data.filter(item => item.method === paymentMethodFilter);
    }

    if (statusFilter !== 'All') {
      data = data.filter(item => item.status === statusFilter.toLowerCase());
    }

    return data;
  }, [reportData, searchTerm, dateRange, paymentMethodFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / perPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleExport = (format) => {
    setExportFormat(format);
    console.log(`Exporting ${activeReport} as ${format}...`);
    setTimeout(() => setExportFormat(''), 2000);
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

  // Get total revenue
  const totalRevenue = filteredData.reduce((sum, item) => sum + item.amount, 0);
  const completedRevenue = filteredData.filter(item => item.status === 'completed').reduce((sum, item) => sum + item.amount, 0);
  const pendingRevenue = filteredData.filter(item => item.status === 'pending').reduce((sum, item) => sum + item.amount, 0);

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
                <BarChart3 className="w-6 h-6" style={{ color: '#8B5CF6' }} />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-[#0B1220]">
                  Financial Reports
                </h1>
                <p className="text-sm text-[#64748B]">
                  View and export financial reports
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
              style={{ color: '#64748B', border: '1px solid #E2E8F0' }}
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleExport('csv')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #10B981, #059669)',
                  color: 'white',
                }}
              >
                <FileSpreadsheet className="w-4 h-4" />
                CSV
              </button>
              <button
                onClick={() => handleExport('excel')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #0F4C81, #1E6BB8)',
                  color: 'white',
                }}
              >
                <FileSpreadsheetIcon className="w-4 h-4" />
                Excel
              </button>
              <button
                onClick={() => handleExport('pdf')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                  color: 'white',
                }}
              >
                <FileIcon className="w-4 h-4" />
                PDF
              </button>
            </div>
          </div>
        </motion.div>

        {/* Report Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {reportTypes.map((type) => {
            const Icon = type.icon;
            const isActive = activeReport === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setActiveReport(type.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, #0B1220, #1A2A4A)'
                    : 'white',
                  border: isActive ? 'none' : '1px solid #E2E8F0',
                }}
              >
                <Icon className="w-4 h-4" />
                {type.label}
              </button>
            );
          })}
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {/* Revenue Chart */}
          <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #E2E8F0' }}>
            <h3 className="text-sm font-semibold mb-4 text-[#0B1220]">
              Revenue Overview
            </h3>
            <div className="h-48 flex items-end gap-1">
              {revenueData.values.map((value, index) => {
                const maxValue = Math.max(...revenueData.values);
                const height = (value / maxValue) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full rounded-t transition-all duration-500 hover:opacity-80"
                      style={{
                        height: `${height}%`,
                        minHeight: height > 0 ? '8px' : '0',
                        background: 'linear-gradient(180deg, #0F4C81, #1E6BB8)',
                        opacity: 0.7 + (value / maxValue) * 0.3,
                      }}
                    />
                    <span className="text-[8px] text-[#94A3B8] mt-1">
                      {revenueData.labels[index]}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
              <span className="text-xs text-[#64748B]">Total Revenue</span>
              <span className="text-sm font-bold text-[#0B1220]">
                {formatCurrency(revenueData.values.reduce((a, b) => a + b, 0))}
              </span>
            </div>
          </div>

          {/* Payment Status Chart */}
          <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #E2E8F0' }}>
            <h3 className="text-sm font-semibold mb-4 text-[#0B1220]">
              Payment Status Distribution
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                {paymentStatusData.labels.map((label, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2 last:mb-0">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ background: paymentStatusData.colors[index] }}
                    />
                    <span className="text-xs flex-1 text-[#64748B]">{label}</span>
                    <span className="text-xs font-medium text-[#0B1220]">
                      {paymentStatusData.values[index]}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {paymentStatusData.values.map((value, index) => {
                    const previous = paymentStatusData.values.slice(0, index).reduce((a, b) => a + b, 0);
                    const circumference = 2 * Math.PI * 40;
                    const offset = (previous / 100) * circumference;
                    const length = (value / 100) * circumference;
                    return (
                      <circle
                        key={index}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={paymentStatusData.colors[index]}
                        strokeWidth="20"
                        strokeDasharray={`${length} ${circumference}`}
                        strokeDashoffset={-offset}
                        className="transition-all duration-500"
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {/* Payment Methods Chart */}
          <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #E2E8F0' }}>
            <h3 className="text-sm font-semibold mb-4 text-[#0B1220]">
              Payment Methods
            </h3>
            <div className="space-y-3">
              {paymentMethodData.labels.map((label, index) => {
                const maxValue = Math.max(...paymentMethodData.values);
                const width = (paymentMethodData.values[index] / maxValue) * 100;
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[#64748B]">{label}</span>
                      <span className="text-xs font-medium text-[#0B1220]">
                        {paymentMethodData.values[index]}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full" style={{ background: '#E2E8F0' }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${width}%`,
                          background: paymentMethodData.colors[index],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Revenue by Service */}
          <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #E2E8F0' }}>
            <h3 className="text-sm font-semibold mb-4 text-[#0B1220]">
              Revenue by Service
            </h3>
            <div className="space-y-3">
              {serviceRevenueData.labels.map((label, index) => {
                const maxValue = Math.max(...serviceRevenueData.values);
                const width = (serviceRevenueData.values[index] / maxValue) * 100;
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[#64748B]">{label}</span>
                      <span className="text-xs font-medium text-[#0B1220]">
                        {formatCurrency(serviceRevenueData.values[index])}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full" style={{ background: '#E2E8F0' }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${width}%`,
                          background: serviceRevenueData.colors[index],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-xs text-[#64748B]">Total Revenue</p>
            <p className="text-2xl font-bold text-[#0B1220]">{formatCurrency(totalRevenue)}</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-xs text-[#64748B]">Completed</p>
            <p className="text-2xl font-bold text-[#10B981]">{formatCurrency(completedRevenue)}</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-xs text-[#64748B]">Pending</p>
            <p className="text-2xl font-bold text-[#F59E0B]">{formatCurrency(pendingRevenue)}</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-xs text-[#64748B]">Transactions</p>
            <p className="text-2xl font-bold text-[#0B1220]">{filteredData.length}</p>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl p-4 mb-6"
          style={{ border: '1px solid #E2E8F0' }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
              <input
                type="text"
                placeholder="Search by order ID or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
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
                value={paymentMethodFilter}
                onChange={(e) => setPaymentMethodFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              >
                {filterOptions.paymentMethod.map((opt) => (
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
                  setDateRange({ start: '', end: '' });
                  setPaymentMethodFilter('All');
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

        {/* Report Table */}
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
                  <th className="text-left text-xs font-medium py-3.5 px-4 text-[#64748B]">Date</th>
                  <th className="text-left text-xs font-medium py-3.5 px-4 text-[#64748B]">Order ID</th>
                  <th className="text-left text-xs font-medium py-3.5 px-4 text-[#64748B]">Customer</th>
                  <th className="text-right text-xs font-medium py-3.5 px-4 text-[#64748B]">Amount</th>
                  <th className="text-left text-xs font-medium py-3.5 px-4 text-[#64748B]">Method</th>
                  <th className="text-left text-xs font-medium py-3.5 px-4 text-[#64748B]">Status</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        variants={fadeUp}
                        className="hover:bg-gray-50 transition-colors"
                        style={{ borderBottom: index < paginatedData.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                      >
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-[#64748B]">
                            {new Date(item.date).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm font-medium text-[#0F4C81]">
                            {item.orderId}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-[#0B1220]">
                            {item.customer}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="text-sm font-semibold text-[#0B1220]">
                            {formatCurrency(item.amount)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-[#64748B]">
                            {item.method}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {getStatusBadge(item.status)}
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">
                        <div className="text-center py-12">
                          <BarChart3 className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                          <h3 className="text-lg font-semibold mb-1 text-[#0B1220]">
                            No data found
                          </h3>
                          <p className="text-sm text-[#64748B]">
                            {searchTerm || dateRange.start || dateRange.end || paymentMethodFilter !== 'All' || statusFilter !== 'All'
                              ? 'Try adjusting your filters'
                              : 'No report data available'}
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
                {Math.min(currentPage * perPage, filteredData.length)} of {filteredData.length} records
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
    </div>
  );
};

export default FinancialReports;