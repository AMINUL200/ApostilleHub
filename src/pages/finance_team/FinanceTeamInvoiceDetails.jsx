import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Printer,
  Send,
  CreditCard,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Globe,
  DollarSign,
  FileText,
  Building2,
  Calendar,
  Percent,
  Banknote,
  Wallet,
  Landmark,
  PiggyBank,
  ExternalLink,
  Copy,
  Share2,
  MoreHorizontal,
  Edit,
  Trash2,
  Plus,
  X,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Info,
  Award,
  Star,
  Shield,
  Truck,
  Home,
  Users,
  MessageCircle,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

const FinanceTeamInvoiceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false);
  const [refundAmount, setRefundAmount] = useState('');
  const [refundReason, setRefundReason] = useState('');

  // Get invoice data from location state or use default
  const invoice = location.state?.invoice || {
    id: 'INV-001',
    invoiceNumber: 'INV-2026-0845',
    orderId: 'APS-40218',
    customer: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+44 20 1234 5678',
    billingAddress: '123 Legal Street, London, UK, SW1A 1AA',
    invoiceDate: '2026-08-30',
    dueDate: '2026-09-15',
    subtotal: 100.00,
    vat: 20.00,
    total: 120.00,
    currency: 'GBP',
    status: 'paid',
    paymentMethod: 'Credit Card',
    paymentDate: '2026-08-30',
    transactionId: 'TX-2026-08-30-001',
    service: 'Apostille Services',
    country: 'United Kingdom',
    processingType: 'Standard',
    items: [
      { description: 'Apostille Service', quantity: 1, unitPrice: 50.00, total: 50.00 },
      { description: 'Express Processing', quantity: 1, unitPrice: 30.00, total: 30.00 },
      { description: 'Courier Service', quantity: 1, unitPrice: 20.00, total: 20.00 },
    ],
  };

  const getStatusBadge = (status) => {
    const config = {
      paid: { label: 'Paid', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', icon: CheckCircle2 },
      unpaid: { label: 'Unpaid', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', icon: Clock },
      overdue: { label: 'Overdue', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', icon: AlertCircle },
      cancelled: { label: 'Cancelled', color: '#64748B', bg: 'rgba(100, 116, 139, 0.1)', icon: XCircle },
      partially_paid: { label: 'Partially Paid', color: '#D4AF37', bg: 'rgba(212, 175, 55, 0.1)', icon: Clock },
      refunded: { label: 'Refunded', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)', icon: ArrowUpRight },
    };
    const configStatus = config[status] || config.unpaid;
    const Icon = configStatus.icon;
    return (
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
        style={{
          background: configStatus.bg,
          color: configStatus.color,
        }}
      >
        <Icon className="w-4 h-4" />
        {configStatus.label}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: invoice.currency || 'GBP',
    }).format(amount);
  };

  const handleBack = () => {
    navigate('/finance/invoices');
  };

  const handleDownloadPDF = () => {
    console.log('Downloading PDF...');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendToCustomer = () => {
    console.log('Sending to customer...');
  };

  const handleRecordPayment = () => {
    setShowRecordPaymentModal(true);
  };

  const handleRefund = () => {
    setShowRefundModal(true);
  };

  const handleRefundSubmit = () => {
    console.log('Processing refund...', { refundAmount, refundReason });
    setShowRefundModal(false);
    setRefundAmount('');
    setRefundReason('');
  };

  const handlePaymentRecord = () => {
    console.log('Recording payment...');
    setShowRecordPaymentModal(false);
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
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              style={{ color: '#64748B' }}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl lg:text-3xl font-bold text-[#0B1220]">
                  Invoice Details
                </h1>
                {getStatusBadge(invoice.status)}
              </div>
              <p className="text-sm text-[#64748B]">
                {invoice.invoiceNumber}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #0B1220, #1A2A4A)',
                color: 'white',
              }}
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: 'white',
                color: '#0B1220',
                border: '1px solid #E2E8F0',
              }}
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={handleSendToCustomer}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                color: '#0B1220',
              }}
            >
              <Send className="w-4 h-4" />
              Send to Customer
            </button>
            {invoice.status === 'unpaid' && (
              <button
                onClick={handleRecordPayment}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #10B981, #059669)',
                  color: 'white',
                }}
              >
                <CreditCard className="w-4 h-4" />
                Record Payment
              </button>
            )}
            {invoice.status === 'paid' && (
              <button
                onClick={handleRefund}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                  color: 'white',
                }}
              >
                <ArrowUpRight className="w-4 h-4" />
                Refund
              </button>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="bg-white rounded-2xl p-6"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <h2 className="text-lg font-bold mb-4 text-[#0B1220]">
                Customer Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(15, 76, 129, 0.1)' }}>
                    <User className="w-5 h-5" style={{ color: '#0F4C81' }} />
                  </div>
                  <div>
                    <p className="text-xs text-[#94A3B8]">Customer Name</p>
                    <p className="text-sm font-medium text-[#0B1220]">{invoice.customer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                    <Mail className="w-5 h-5" style={{ color: '#8B5CF6' }} />
                  </div>
                  <div>
                    <p className="text-xs text-[#94A3B8]">Email</p>
                    <p className="text-sm font-medium text-[#0B1220]">{invoice.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                    <Phone className="w-5 h-5" style={{ color: '#10B981' }} />
                  </div>
                  <div>
                    <p className="text-xs text-[#94A3B8]">Phone</p>
                    <p className="text-sm font-medium text-[#0B1220]">{invoice.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
                    <MapPin className="w-5 h-5" style={{ color: '#D4AF37' }} />
                  </div>
                  <div>
                    <p className="text-xs text-[#94A3B8]">Billing Address</p>
                    <p className="text-sm font-medium text-[#0B1220]">{invoice.billingAddress}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Order Information */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="bg-white rounded-2xl p-6"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <h2 className="text-lg font-bold mb-4 text-[#0B1220]">
                Order Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-[#94A3B8]">Order ID</p>
                  <p className="text-sm font-medium text-[#0F4C81]">{invoice.orderId}</p>
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8]">Service</p>
                  <p className="text-sm font-medium text-[#0B1220]">{invoice.service}</p>
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8]">Country</p>
                  <p className="text-sm font-medium text-[#0B1220]">{invoice.country}</p>
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8]">Processing Type</p>
                  <p className="text-sm font-medium text-[#0B1220]">{invoice.processingType}</p>
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8]">Invoice Date</p>
                  <p className="text-sm font-medium text-[#0B1220]">
                    {new Date(invoice.invoiceDate).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8]">Due Date</p>
                  <p className="text-sm font-medium text-[#0B1220]">
                    {new Date(invoice.dueDate).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Invoice Items */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="bg-white rounded-2xl p-6"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <h2 className="text-lg font-bold mb-4 text-[#0B1220]">
                Invoice Items
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <th className="text-left text-xs font-medium py-2 text-[#64748B]">Service</th>
                      <th className="text-center text-xs font-medium py-2 text-[#64748B]">Qty</th>
                      <th className="text-right text-xs font-medium py-2 text-[#64748B]">Price</th>
                      <th className="text-right text-xs font-medium py-2 text-[#64748B]">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, index) => (
                      <tr key={index} style={{ borderBottom: index < invoice.items.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                        <td className="py-2.5 text-sm text-[#0B1220]">{item.description}</td>
                        <td className="py-2.5 text-sm text-center text-[#64748B]">{item.quantity}</td>
                        <td className="py-2.5 text-sm text-right text-[#64748B]">{formatCurrency(item.unitPrice)}</td>
                        <td className="py-2.5 text-sm text-right font-medium text-[#0B1220]">{formatCurrency(item.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ borderTop: '2px solid #E2E8F0' }}>
                      <td colSpan="3" className="py-3 text-right text-sm font-medium text-[#64748B]">Subtotal</td>
                      <td className="py-3 text-right text-sm font-medium text-[#0B1220]">{formatCurrency(invoice.subtotal)}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="py-2 text-right text-sm font-medium text-[#64748B]">
                        VAT ({invoice.vat > 0 ? '20%' : '0%'})
                      </td>
                      <td className="py-2 text-right text-sm font-medium text-[#0B1220]">{formatCurrency(invoice.vat)}</td>
                    </tr>
                    <tr style={{ borderTop: '2px solid #E2E8F0' }}>
                      <td colSpan="3" className="py-3 text-right text-base font-bold text-[#0B1220]">Total</td>
                      <td className="py-3 text-right text-lg font-bold text-[#0F4C81]">{formatCurrency(invoice.total)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Payment & Actions */}
          <div className="space-y-6">
            {/* Payment Information */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="bg-white rounded-2xl p-6"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <h2 className="text-lg font-bold mb-4 text-[#0B1220]">
                Payment Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                  <span className="text-sm text-[#64748B]">Payment Status</span>
                  {getStatusBadge(invoice.status)}
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                  <span className="text-sm text-[#64748B]">Payment Method</span>
                  <span className="text-sm font-medium text-[#0B1220]">
                    {invoice.paymentMethod || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                  <span className="text-sm text-[#64748B]">Transaction ID</span>
                  <span className="text-sm font-medium text-[#0F4C81]">
                    {invoice.transactionId || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                  <span className="text-sm text-[#64748B]">Payment Date</span>
                  <span className="text-sm font-medium text-[#0B1220]">
                    {invoice.paymentDate ? new Date(invoice.paymentDate).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    }) : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                  <span className="text-sm text-[#64748B]">Currency</span>
                  <span className="text-sm font-medium text-[#0B1220]">{invoice.currency}</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="bg-white rounded-2xl p-6"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <h2 className="text-lg font-bold mb-4 text-[#0B1220]">
                Quick Actions
              </h2>
              <div className="space-y-2">
                <button
                  onClick={handleDownloadPDF}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-gray-50"
                  style={{ color: '#64748B' }}
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-gray-50"
                  style={{ color: '#64748B' }}
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
                <button
                  onClick={handleSendToCustomer}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-gray-50"
                  style={{ color: '#64748B' }}
                >
                  <Send className="w-4 h-4" />
                  <span>Send to Customer</span>
                </button>
                {invoice.status === 'unpaid' && (
                  <button
                    onClick={handleRecordPayment}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-green-50"
                    style={{ color: '#10B981' }}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Record Payment</span>
                  </button>
                )}
                {invoice.status === 'paid' && (
                  <button
                    onClick={handleRefund}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-red-50"
                    style={{ color: '#EF4444' }}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span>Refund</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Refund Modal */}
      {showRefundModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowRefundModal(false)}
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
                  Process Refund
                </h2>
                <button
                  onClick={() => setShowRefundModal(false)}
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
                    {invoice.invoiceNumber} - {formatCurrency(invoice.total)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                    Refund Amount <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                    style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                    Refund Reason <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                    placeholder="Enter refund reason..."
                    rows="3"
                    className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none"
                    style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                <button
                  onClick={() => setShowRefundModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                  style={{ color: '#64748B' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleRefundSubmit}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                    color: 'white',
                  }}
                >
                  <ArrowUpRight className="w-4 h-4" />
                  Process Refund
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Record Payment Modal */}
      {showRecordPaymentModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowRecordPaymentModal(false)}
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
                  Record Payment
                </h2>
                <button
                  onClick={() => setShowRecordPaymentModal(false)}
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
                    {invoice.invoiceNumber} - {formatCurrency(invoice.total)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                    Payment Amount <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    defaultValue={invoice.total}
                    className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                    style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                    Payment Method <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all appearance-none" style={{ borderColor: '#E2E8F0', color: '#0B1220' }}>
                    <option>Credit Card</option>
                    <option>Debit Card</option>
                    <option>PayPal</option>
                    <option>Bank Transfer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                    Payment Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                    style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                    Transaction ID (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter transaction ID"
                    className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                    style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                <button
                  onClick={() => setShowRecordPaymentModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                  style={{ color: '#64748B' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handlePaymentRecord}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    color: 'white',
                  }}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Record Payment
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FinanceTeamInvoiceDetails;