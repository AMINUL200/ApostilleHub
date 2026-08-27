import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Download,
  FileText,
  RefreshCw,
  ArrowUpDown,
  Calendar,
  MapPin,
  DollarSign,
  Shield,
  Truck,
  Check,
  AlertCircle,
  MoreHorizontal,
  Printer,
  Share2,
  MessageCircle,
  Star,
  TrendingUp,
  Users,
  Award,
  ChevronLeft,
  ChevronRight,
  Info,
  Copy,
  ExternalLink,
  CreditCard,
  FileCheck,
  Globe,
  Clock as ClockIcon,
  Flag,
  User,
  Building2,
  Mail,
  Phone,
  Calendar as CalendarIcon,
} from 'lucide-react';

const orders = [
  {
    id: 'APS-40218',
    date: '2026-08-15',
    service: 'Apostille Services',
    country: 'United Kingdom',
    status: 'processing',
    amount: 149.00,
    documents: 3,
    customer: 'John Doe',
    type: 'Standard',
    priority: 'Normal',
  },
  {
    id: 'APS-40217',
    date: '2026-08-12',
    service: 'Embassy Legalisation',
    country: 'United States',
    status: 'completed',
    amount: 299.00,
    documents: 2,
    customer: 'Sarah Johnson',
    type: 'Express',
    priority: 'High',
  },
  {
    id: 'APS-40216',
    date: '2026-08-10',
    service: 'Notary Services',
    country: 'Canada',
    status: 'pending',
    amount: 89.00,
    documents: 1,
    customer: 'Michael Chen',
    type: 'Standard',
    priority: 'Normal',
  },
  {
    id: 'APS-40215',
    date: '2026-08-08',
    service: 'Translation Services',
    country: 'Germany',
    status: 'processing',
    amount: 129.00,
    documents: 2,
    customer: 'Emma Williams',
    type: 'Express',
    priority: 'High',
  },
  {
    id: 'APS-40214',
    date: '2026-08-05',
    service: 'Corporate Documents',
    country: 'France',
    status: 'completed',
    amount: 399.00,
    documents: 5,
    customer: 'James O\'Brien',
    type: 'Standard',
    priority: 'Normal',
  },
  {
    id: 'APS-40213',
    date: '2026-08-02',
    service: 'Educational Documents',
    country: 'Australia',
    status: 'cancelled',
    amount: 159.00,
    documents: 2,
    customer: 'Maria Garcia',
    type: 'Standard',
    priority: 'Low',
  },
  {
    id: 'APS-40212',
    date: '2026-07-30',
    service: 'Apostille Services',
    country: 'Spain',
    status: 'completed',
    amount: 149.00,
    documents: 1,
    customer: 'David Okafor',
    type: 'Express',
    priority: 'High',
  },
  {
    id: 'APS-40211',
    date: '2026-07-28',
    service: 'Embassy Legalisation',
    country: 'Italy',
    status: 'pending',
    amount: 279.00,
    documents: 3,
    customer: 'Aisha Patel',
    type: 'Standard',
    priority: 'Normal',
  },
];

const statusConfig = {
  pending: {
    label: 'Pending',
    icon: Clock,
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.1)',
  },
  processing: {
    label: 'Processing',
    icon: RefreshCw,
    color: '#0F4C81',
    bgColor: 'rgba(15, 76, 129, 0.1)',
  },
  completed: {
    label: 'Completed',
    icon: CheckCircle2,
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
  },
  cancelled: {
    label: 'Cancelled',
    icon: XCircle,
    color: '#EF4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
  },
};

const stats = [
  { label: 'Total Orders', value: '24', icon: Package, color: '#0F4C81' },
  { label: 'Pending', value: '3', icon: Clock, color: '#F59E0B' },
  { label: 'Processing', value: '2', icon: RefreshCw, color: '#0F4C81' },
  { label: 'Completed', value: '18', icon: CheckCircle2, color: '#10B981' },
  { label: 'Cancelled', value: '1', icon: XCircle, color: '#EF4444' },
];

const filterOptions = {
  status: ['All', 'Pending', 'Processing', 'Completed', 'Cancelled'],
  service: ['All', 'Apostille Services', 'Embassy Legalisation', 'Notary Services', 'Translation Services', 'Corporate Documents', 'Educational Documents'],
  country: ['All', 'United Kingdom', 'United States', 'Canada', 'Germany', 'France', 'Australia', 'Spain', 'Italy'],
  priority: ['All', 'High', 'Normal', 'Low'],
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

const CustomerOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const itemsPerPage = 5;

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
      filtered = filtered.filter(order => order.status === statusFilter.toLowerCase());
    }

    // Service filter
    if (serviceFilter !== 'All') {
      filtered = filtered.filter(order => order.service === serviceFilter);
    }

    // Country filter
    if (countryFilter !== 'All') {
      filtered = filtered.filter(order => order.country === countryFilter);
    }

    // Priority filter
    if (priorityFilter !== 'All') {
      filtered = filtered.filter(order => order.priority === priorityFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'amount') {
        aVal = a.amount;
        bVal = b.amount;
      } else if (sortField === 'date') {
        aVal = new Date(a.date);
        bVal = new Date(b.date);
      } else {
        aVal = aVal.toString().toLowerCase();
        bVal = bVal.toString().toLowerCase();
      }
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [orders, searchTerm, statusFilter, serviceFilter, countryFilter, priorityFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
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

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const getStatusBadge = (status) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium"
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

  const getPriorityBadge = (priority) => {
    const colors = {
      High: { bg: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' },
      Normal: { bg: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' },
      Low: { bg: 'rgba(107, 114, 128, 0.1)', color: '#6B7280' },
    };
    const config = colors[priority] || colors.Normal;
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
        style={{
          background: config.bg,
          color: config.color,
        }}
      >
        {priority}
      </span>
    );
  };

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
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
              My Orders
            </h1>
            <p className="text-sm" style={{ color: '#64748B' }}>
              Track and manage all your apostille requests
            </p>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #0F4C81, #1E6BB8)',
              boxShadow: '0 4px 15px rgba(15, 76, 129, 0.3)',
            }}
          >
            <Package className="w-4 h-4" />
            New Order
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
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
                placeholder="Search by order ID, customer, or service..."
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

            {/* Reset Filters */}
            <button
              onClick={() => {
                setStatusFilter('All');
                setServiceFilter('All');
                setCountryFilter('All');
                setPriorityFilter('All');
                setSearchTerm('');
              }}
              className="px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
              style={{ color: '#64748B' }}
            >
              Reset
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 mt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
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
                      Service
                    </label>
                    <select
                      value={serviceFilter}
                      onChange={(e) => setServiceFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
                    >
                      {filterOptions.service.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#64748B' }}>
                      Country
                    </label>
                    <select
                      value={countryFilter}
                      onChange={(e) => setCountryFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
                    >
                      {filterOptions.country.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#64748B' }}>
                      Priority
                    </label>
                    <select
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
                    >
                      {filterOptions.priority.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Orders Table */}
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
                    onClick={() => handleSort('id')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Order ID
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
                  <th
                    className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('service')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Service
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('country')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Country
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
                    className="text-right text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('amount')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Amount
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
                  {paginatedOrders.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      variants={fadeUp}
                      className="hover:bg-gray-50 transition-colors"
                      style={{ borderBottom: index < paginatedOrders.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                    >
                      <td className="py-3.5 px-4">
                        <span className="text-sm font-medium" style={{ color: '#0F172A' }}>
                          {order.id}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-sm" style={{ color: '#64748B' }}>
                          {new Date(order.date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
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
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="text-sm font-semibold" style={{ color: '#0F172A' }}>
                          £{order.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
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
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {paginatedOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
              <h3 className="text-lg font-semibold mb-1" style={{ color: '#0F172A' }}>
                No orders found
              </h3>
              <p className="text-sm" style={{ color: '#64748B' }}>
                Try adjusting your filters or search terms
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: '#E2E8F0' }}>
              <span className="text-sm" style={{ color: '#64748B' }}>
                Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of{' '}
                {filteredOrders.length} orders
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
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2
                      className="text-xl font-bold"
                      style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
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
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                {/* Order Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs font-medium" style={{ color: '#64748B' }}>Service</p>
                    <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>
                      {selectedOrder.service}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs font-medium" style={{ color: '#64748B' }}>Amount</p>
                    <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>
                      £{selectedOrder.amount.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs font-medium" style={{ color: '#64748B' }}>Status</p>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs font-medium" style={{ color: '#64748B' }}>Priority</p>
                    {getPriorityBadge(selectedOrder.priority)}
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-3" style={{ color: '#0F172A' }}>
                    Order Timeline
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                      <div className="flex-1">
                        <p className="text-sm font-medium" style={{ color: '#0F172A' }}>Order Placed</p>
                        <p className="text-xs" style={{ color: '#64748B' }}>
                          {new Date(selectedOrder.date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })} at 14:30
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
                      <div className="flex-1">
                        <p className="text-sm font-medium" style={{ color: '#0F172A' }}>Document Verification</p>
                        <p className="text-xs" style={{ color: '#64748B' }}>In progress</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-gray-300" />
                      <div className="flex-1">
                        <p className="text-sm font-medium" style={{ color: '#94A3B8' }}>Apostille Issued</p>
                        <p className="text-xs" style={{ color: '#94A3B8' }}>Pending</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-gray-300" />
                      <div className="flex-1">
                        <p className="text-sm font-medium" style={{ color: '#94A3B8' }}>Delivery</p>
                        <p className="text-xs" style={{ color: '#94A3B8' }}>Pending</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <button
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #0F4C81, #1E6BB8)',
                    }}
                  >
                    Track Order
                  </button>
                  <button
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-gray-100"
                    style={{
                      background: '#F8FAFC',
                      color: '#64748B',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    Contact Support
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

export default CustomerOrders;