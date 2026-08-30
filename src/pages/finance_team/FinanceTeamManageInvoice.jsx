import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
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
} from 'lucide-react';

// Sample invoices data
const invoices = [
  {
    id: 'INV-001',
    invoiceNumber: 'INV-2026-0845',
    orderId: 'APS-40218',
    customer: 'John Doe',
    invoiceDate: '2026-08-30',
    dueDate: '2026-09-15',
    subtotal: 124.17,
    vat: 24.83,
    total: 149.00,
    currency: 'GBP',
    status: 'paid',
    paymentMethod: 'Credit Card',
    paymentDate: '2026-08-30',
    items: [
      { description: 'Apostille Services - Standard', quantity: 1, unitPrice: 124.17, vat: 24.83, total: 149.00 }
    ]
  },
  {
    id: 'INV-002',
    invoiceNumber: 'INV-2026-0844',
    orderId: 'APS-40217',
    customer: 'Sarah Johnson',
    invoiceDate: '2026-08-29',
    dueDate: '2026-09-14',
    subtotal: 249.17,
    vat: 49.83,
    total: 299.00,
    currency: 'GBP',
    status: 'paid',
    paymentMethod: 'PayPal',
    paymentDate: '2026-08-29',
    items: [
      { description: 'Embassy Legalisation - Express', quantity: 1, unitPrice: 249.17, vat: 49.83, total: 299.00 }
    ]
  },
  {
    id: 'INV-003',
    invoiceNumber: 'INV-2026-0843',
    orderId: 'APS-40216',
    customer: 'Michael Chen',
    invoiceDate: '2026-08-29',
    dueDate: '2026-09-13',
    subtotal: 74.17,
    vat: 14.83,
    total: 89.00,
    currency: 'GBP',
    status: 'unpaid',
    paymentMethod: null,
    paymentDate: null,
    items: [
      { description: 'Notary Services - Standard', quantity: 1, unitPrice: 74.17, vat: 14.83, total: 89.00 }
    ]
  },
  {
    id: 'INV-004',
    invoiceNumber: 'INV-2026-0842',
    orderId: 'APS-40215',
    customer: 'Emma Williams',
    invoiceDate: '2026-08-28',
    dueDate: '2026-08-28',
    subtotal: 107.50,
    vat: 21.50,
    total: 129.00,
    currency: 'GBP',
    status: 'overdue',
    paymentMethod: null,
    paymentDate: null,
    items: [
      { description: 'Translation Services - Express', quantity: 1, unitPrice: 107.50, vat: 21.50, total: 129.00 }
    ]
  },
  {
    id: 'INV-005',
    invoiceNumber: 'INV-2026-0841',
    orderId: 'APS-40214',
    customer: 'James O\'Brien',
    invoiceDate: '2026-08-27',
    dueDate: '2026-08-27',
    subtotal: 332.50,
    vat: 66.50,
    total: 399.00,
    currency: 'GBP',
    status: 'cancelled',
    paymentMethod: 'Debit Card',
    paymentDate: '2026-08-27',
    items: [
      { description: 'Corporate Documents - Standard', quantity: 1, unitPrice: 332.50, vat: 66.50, total: 399.00 }
    ]
  },
  {
    id: 'INV-006',
    invoiceNumber: 'INV-2026-0840',
    orderId: 'APS-40213',
    customer: 'Maria Garcia',
    invoiceDate: '2026-08-26',
    dueDate: '2026-09-10',
    subtotal: 132.50,
    vat: 26.50,
    total: 159.00,
    currency: 'GBP',
    status: 'unpaid',
    paymentMethod: null,
    paymentDate: null,
    items: [
      { description: 'Educational Documents - Standard', quantity: 1, unitPrice: 132.50, vat: 26.50, total: 159.00 }
    ]
  },
  {
    id: 'INV-007',
    invoiceNumber: 'INV-2026-0839',
    orderId: 'APS-40212',
    customer: 'David Okafor',
    invoiceDate: '2026-08-25',
    dueDate: '2026-09-09',
    subtotal: 124.17,
    vat: 24.83,
    total: 149.00,
    currency: 'GBP',
    status: 'paid',
    paymentMethod: 'Bank Transfer',
    paymentDate: '2026-08-26',
    items: [
      { description: 'Apostille Services - Express', quantity: 1, unitPrice: 124.17, vat: 24.83, total: 149.00 }
    ]
  },
];

// Status configurations
const invoiceStatusConfig = {
  paid: { label: 'Paid', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', icon: CheckCircle2 },
  unpaid: { label: 'Unpaid', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', icon: Clock },
  overdue: { label: 'Overdue', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', icon: AlertCircle },
  cancelled: { label: 'Cancelled', color: '#64748B', bg: 'rgba(100, 116, 139, 0.1)', icon: XCircle },
};

const filterOptions = {
  status: ['All', 'Paid', 'Unpaid', 'Overdue', 'Cancelled'],
};

const FinanceTeamManageInvoice = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('invoiceDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showSendModal, setShowSendModal] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Filter and sort invoices
  const filteredInvoices = React.useMemo(() => {
    let filtered = [...invoices];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(inv =>
        inv.invoiceNumber.toLowerCase().includes(term) ||
        inv.orderId.toLowerCase().includes(term) ||
        inv.customer.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(inv => inv.status === statusFilter.toLowerCase());
    }

    if (dateRange.start) {
      filtered = filtered.filter(inv => inv.invoiceDate >= dateRange.start);
    }
    if (dateRange.end) {
      filtered = filtered.filter(inv => inv.invoiceDate <= dateRange.end);
    }

    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'invoiceDate' || sortField === 'dueDate') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else if (sortField === 'total' || sortField === 'subtotal' || sortField === 'vat') {
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
  }, [invoices, searchTerm, statusFilter, dateRange, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredInvoices.length / perPage);
  const paginatedInvoices = filteredInvoices.slice(
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

  const handleViewInvoice = (invoice) => {
    // Navigate to invoice details page with the invoice data
    navigate(`/finance-team/invoices/${invoice.id}`, { state: { invoice } });
  };

  const handleSendInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowSendModal(true);
  };

  const handleMarkAsPaid = (invoice) => {
    console.log(`Invoice ${invoice.invoiceNumber} marked as paid`);
  };

  const getStatusBadge = (status) => {
    const config = invoiceStatusConfig[status];
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  };

  const getInvoiceStats = () => {
    const stats = {
      total: invoices.length,
      paid: invoices.filter(i => i.status === 'paid').length,
      unpaid: invoices.filter(i => i.status === 'unpaid').length,
      overdue: invoices.filter(i => i.status === 'overdue').length,
      cancelled: invoices.filter(i => i.status === 'cancelled').length,
      totalAmount: invoices.reduce((sum, i) => sum + i.total, 0),
      paidAmount: invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0),
      unpaidAmount: invoices.filter(i => i.status === 'unpaid' || i.status === 'overdue').reduce((sum, i) => sum + i.total, 0),
    };
    return stats;
  };

  const stats = getInvoiceStats();

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
                <FileText className="w-6 h-6" style={{ color: '#8B5CF6' }} />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-[#0B1220]">
                  Manage Invoices
                </h1>
                <p className="text-sm text-[#64748B]">
                  View and manage all invoices
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
              <Plus className="w-4 h-4" />
              New Invoice
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
            <p className="text-2xl font-bold text-[#10B981]">{stats.paid}</p>
            <p className="text-xs text-[#64748B]">Paid</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#F59E0B]">{stats.unpaid}</p>
            <p className="text-xs text-[#64748B]">Unpaid</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#EF4444]">{stats.overdue}</p>
            <p className="text-xs text-[#64748B]">Overdue</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-bold text-[#64748B]">{stats.cancelled}</p>
            <p className="text-xs text-[#64748B]">Cancelled</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-xl font-bold text-[#0B1220]">{formatCurrency(stats.totalAmount)}</p>
            <p className="text-xs text-[#64748B]">Total Amount</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <p className="text-xl font-bold text-[#EF4444]">{formatCurrency(stats.unpaidAmount)}</p>
            <p className="text-xs text-[#64748B]">Unpaid Amount</p>
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
                placeholder="Search by invoice number, order ID, or customer..."
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

        {/* Invoices Table */}
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
                    onClick={() => handleSort('invoiceNumber')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Invoice #
                      {sortField === 'invoiceNumber' && (
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
                    className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('invoiceDate')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center gap-1">
                      Invoice Date
                      {sortField === 'invoiceDate' && (
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
                  <th
                    className="text-right text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0F4C81] transition-colors"
                    onClick={() => handleSort('total')}
                    style={{ color: '#64748B' }}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Total
                      {sortField === 'total' && (
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
                  {paginatedInvoices.length > 0 ? (
                    paginatedInvoices.map((invoice, index) => (
                      <motion.tr
                        key={invoice.id}
                        variants={fadeUp}
                        className="hover:bg-gray-50 transition-colors"
                        style={{ borderBottom: index < paginatedInvoices.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                      >
                        <td className="py-3.5 px-4">
                          <span className="text-sm font-medium text-[#0F4C81]">
                            {invoice.invoiceNumber}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-[#64748B]">
                            {invoice.orderId}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-[#0B1220]">
                            {invoice.customer}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-[#64748B]">
                            {new Date(invoice.invoiceDate).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`text-sm ${new Date(invoice.dueDate) < new Date() && invoice.status !== 'paid' ? 'text-[#EF4444]' : 'text-[#64748B]'}`}>
                            {new Date(invoice.dueDate).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                          {new Date(invoice.dueDate) < new Date() && invoice.status !== 'paid' && (
                            <span className="ml-1 text-[10px] font-medium text-[#EF4444]">(Overdue)</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="text-sm font-semibold text-[#0B1220]">
                            {formatCurrency(invoice.total)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {getStatusBadge(invoice.status)}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleViewInvoice(invoice)}
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
                            {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
                              <button
                                onClick={() => handleSendInvoice(invoice)}
                                className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                                style={{ color: '#64748B' }}
                              >
                                <Send className="w-4 h-4" />
                              </button>
                            )}
                            {invoice.status === 'unpaid' && (
                              <button
                                onClick={() => handleMarkAsPaid(invoice)}
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
                          <FileText className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                          <h3 className="text-lg font-semibold mb-1 text-[#0B1220]">
                            No invoices found
                          </h3>
                          <p className="text-sm text-[#64748B]">
                            {searchTerm || statusFilter !== 'All' || dateRange.start || dateRange.end
                              ? 'Try adjusting your filters'
                              : 'No invoices available'}
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
                {Math.min(currentPage * perPage, filteredInvoices.length)} of {filteredInvoices.length} invoices
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

      {/* Send Invoice Modal */}
      <AnimatePresence>
        {showSendModal && selectedInvoice && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowSendModal(false)}
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
                    Send Invoice
                  </h2>
                  <button
                    onClick={() => setShowSendModal(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Invoice</p>
                    <p className="text-sm font-medium text-[#0B1220]">
                      {selectedInvoice.invoiceNumber}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Customer</p>
                    <p className="text-sm font-medium text-[#0B1220]">
                      {selectedInvoice.customer}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Amount</p>
                    <p className="text-lg font-bold text-[#0B1220]">
                      {formatCurrency(selectedInvoice.total)}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="customer@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                      style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                      Message (Optional)
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Add a message to the email..."
                      className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none"
                      style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <button
                    onClick={() => setShowSendModal(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: '#64748B' }}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                      color: '#0B1220',
                    }}
                  >
                    <Send className="w-4 h-4" />
                    Send Invoice
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

export default FinanceTeamManageInvoice;