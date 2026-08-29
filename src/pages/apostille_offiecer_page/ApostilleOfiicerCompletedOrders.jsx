import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
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
  FileText,
  Package,
  MoreHorizontal,
  MessageCircle,
  Star,
  Award,
  Shield,
  Truck,
  Home,
  Building2,
  Globe,
  Users,
  Plus,
  X,
  ArrowUpRight,
  ArrowDownRight,
  HelpCircle,
  Info,
  Check,
  Timer,
  TrendingUp,
  FileCheck,
  ExternalLink,
  Copy,
  Share2,
} from 'lucide-react';

// Sample completed orders data
const completedOrders = [
  {
    id: 'CO-001',
    orderId: 'APS-40214',
    customer: 'James O\'Brien',
    service: 'Corporate Documents',
    completedDate: '2026-08-28T16:30:00',
    processingTime: '3 days 4 hours',
    finalDocument: 'Corporate_Certificate_Approved.pdf',
    status: 'completed',
    assignedOfficer: 'Officer Smith',
    documents: 5,
    rating: 5,
  },
  {
    id: 'CO-002',
    orderId: 'APS-40213',
    customer: 'Maria Garcia',
    service: 'Educational Documents',
    completedDate: '2026-08-27T14:20:00',
    processingTime: '2 days 6 hours',
    finalDocument: 'Degree_Apostille_Certified.pdf',
    status: 'completed',
    assignedOfficer: 'Officer Smith',
    documents: 3,
    rating: 4,
  },
  {
    id: 'CO-003',
    orderId: 'APS-40212',
    customer: 'David Okafor',
    service: 'Apostille Services',
    completedDate: '2026-08-26T11:45:00',
    processingTime: '1 day 8 hours',
    finalDocument: 'Police_Clearance_Apostille.pdf',
    status: 'completed',
    assignedOfficer: 'Officer Smith',
    documents: 2,
    rating: 5,
  },
  {
    id: 'CO-004',
    orderId: 'APS-40211',
    customer: 'Aisha Patel',
    service: 'Embassy Legalisation',
    completedDate: '2026-08-25T09:30:00',
    processingTime: '4 days 2 hours',
    finalDocument: 'Embassy_Legalisation_Complete.pdf',
    status: 'completed',
    assignedOfficer: 'Officer Smith',
    documents: 4,
    rating: 4,
  },
  {
    id: 'CO-005',
    orderId: 'APS-40210',
    customer: 'Thomas Mueller',
    service: 'Notary Services',
    completedDate: '2026-08-24T15:10:00',
    processingTime: '2 days 10 hours',
    finalDocument: 'Notary_Certificate_Signed.pdf',
    status: 'completed',
    assignedOfficer: 'Officer Smith',
    documents: 2,
    rating: 5,
  },
  {
    id: 'CO-006',
    orderId: 'APS-40209',
    customer: 'Sarah Johnson',
    service: 'Translation Services',
    completedDate: '2026-08-23T13:00:00',
    processingTime: '3 days 5 hours',
    finalDocument: 'Translated_Documents_Certified.pdf',
    status: 'completed',
    assignedOfficer: 'Officer Smith',
    documents: 3,
    rating: 4,
  },
  {
    id: 'CO-007',
    orderId: 'APS-40208',
    customer: 'John Doe',
    service: 'Apostille Services',
    completedDate: '2026-08-22T10:20:00',
    processingTime: '5 days 3 hours',
    finalDocument: 'Birth_Certificate_Apostille.pdf',
    status: 'completed',
    assignedOfficer: 'Officer Smith',
    documents: 2,
    rating: 5,
  },
];

const filterOptions = {
  timeRange: ['All Time', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Month'],
  service: ['All', 'Apostille Services', 'Embassy Legalisation', 'Notary Services', 'Translation Services', 'Corporate Documents', 'Educational Documents'],
};

const ApostilleOfficerCompletedOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('All Time');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [sortField, setSortField] = useState('completedDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Filter and sort orders
  const filteredOrders = React.useMemo(() => {
    let filtered = [...completedOrders];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(order =>
        order.orderId.toLowerCase().includes(term) ||
        order.customer.toLowerCase().includes(term) ||
        order.service.toLowerCase().includes(term) ||
        order.finalDocument.toLowerCase().includes(term)
      );
    }

    if (timeFilter !== 'All Time') {
      const now = new Date();
      const days = {
        'Last 7 Days': 7,
        'Last 30 Days': 30,
        'Last 90 Days': 90,
        'This Month': 30,
      };
      const cutoff = new Date(now.setDate(now.getDate() - (days[timeFilter] || 0)));
      filtered = filtered.filter(order => new Date(order.completedDate) >= cutoff);
    }

    if (serviceFilter !== 'All') {
      filtered = filtered.filter(order => order.service === serviceFilter);
    }

    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'completedDate') {
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
  }, [completedOrders, searchTerm, timeFilter, serviceFilter, sortField, sortDirection]);

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

  const getRatingStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${i < rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-300'}`}
            fill={i < rating ? '#D4AF37' : 'none'}
          />
        ))}
      </div>
    );
  };

  const getStatusStats = () => {
    const stats = {
      total: completedOrders.length,
      thisWeek: completedOrders.filter(o => {
        const now = new Date();
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        return new Date(o.completedDate) >= weekAgo;
      }).length,
      thisMonth: completedOrders.filter(o => {
        const now = new Date();
        const monthAgo = new Date(now.setDate(now.getDate() - 30));
        return new Date(o.completedDate) >= monthAgo;
      }).length,
      averageRating: (completedOrders.reduce((acc, o) => acc + (o.rating || 0), 0) / completedOrders.length).toFixed(1),
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
              <div className="p-2.5 rounded-xl" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                <CheckCircle2 className="w-6 h-6" style={{ color: '#10B981' }} />
              </div>
              <div>
                <h1
                  className="text-2xl lg:text-3xl font-bold"
                  style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                >
                  Completed Orders
                </h1>
                <p className="text-sm" style={{ color: '#64748B' }}>
                  View all orders completed by you
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
              <FileCheck className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}>
              {stats.total}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>Total Completed</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#0F4C81' }}>
              {stats.thisWeek}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>This Week</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#D4AF37' }}>
              {stats.thisMonth}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>This Month</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#D4AF37' }}>
              {stats.averageRating}
            </p>
            <p className="text-xs" style={{ color: '#64748B' }}>Average Rating</p>
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
                placeholder="Search by order ID, customer, or document..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              >
                {filterOptions.timeRange.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>

              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              >
                {filterOptions.service.map((opt) => (
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
                  setTimeFilter('All Time');
                  setServiceFilter('All');
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

        {/* Completed Orders Table */}
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
                    Service
                  </th>
                  <th
                    className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('completedDate')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Completed Date
                      {sortField === 'completedDate' && (
                        sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Processing Time
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Final Document
                  </th>
                  <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                    Rating
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
                            {new Date(order.completedDate).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm" style={{ color: '#64748B' }}>
                            {order.processingTime}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" style={{ color: '#94A3B8' }} />
                            <span className="text-sm truncate max-w-[150px]" style={{ color: '#64748B' }}>
                              {order.finalDocument}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          {getRatingStars(order.rating)}
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
                          <CheckCircle2 className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                          <h3 className="text-lg font-semibold mb-1" style={{ color: '#0B1220' }}>
                            No completed orders found
                          </h3>
                          <p className="text-sm" style={{ color: '#64748B' }}>
                            {searchTerm || timeFilter !== 'All Time' || serviceFilter !== 'All'
                              ? 'Try adjusting your filters'
                              : 'Start completing orders to see them here'}
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
                  <div>
                    <h2
                      className="text-xl font-bold"
                      style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                    >
                      Completed Order Details
                    </h2>
                    <p className="text-sm" style={{ color: '#64748B' }}>
                      {selectedOrder.orderId}
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

                <div className="grid grid-cols-2 gap-4 mb-6">
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
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Completed Date</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {new Date(selectedOrder.completedDate).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Processing Time</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedOrder.processingTime}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Assigned Officer</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedOrder.assignedOfficer}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Rating</p>
                    <div className="mt-1">
                      {getRatingStars(selectedOrder.rating)}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl mb-6" style={{ background: '#F8FAFC' }}>
                  <p className="text-xs" style={{ color: '#94A3B8' }}>Final Document</p>
                  <div className="flex items-center gap-2 mt-1">
                    <FileText className="w-4 h-4" style={{ color: '#0F4C81' }} />
                    <span className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedOrder.finalDocument}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #0F4C81, #1E6BB8)',
                      color: 'white',
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    View Document
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                      color: '#0B1220',
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: '#64748B', border: '1px solid #E2E8F0' }}
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    onClick={() => setShowOrderDetails(false)}
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
    </div>
  );
};

export default ApostilleOfficerCompletedOrders;