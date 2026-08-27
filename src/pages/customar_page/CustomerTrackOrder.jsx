import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Search,
  MapPin,
  Clock,
  CheckCircle2,
  FileCheck,
  Shield,
  Truck,
  Home,
  Calendar,
  User,
  Mail,
  Phone,
  ChevronRight,
  AlertCircle,
  RefreshCw,
  Eye,
  Download,
  Printer,
  Share2,
  MessageCircle,
  Star,
  Award,
  TrendingUp,
  Users,
  Headphones,
  CreditCard,
  FileText,
  Globe,
  Building2,
  MapPin as MapPinIcon,
  Navigation,
  Clock as ClockIcon,
  Check,
  X,
  Info,
  HelpCircle,
  ExternalLink,
  Copy,
} from 'lucide-react';

// Order status data
const orderStatuses = [
  {
    id: 'received',
    label: 'Order Received',
    icon: Package,
    color: '#0F4C81',
    description: 'Your order has been received and is being processed.',
  },
  {
    id: 'under_review',
    label: 'Under Review',
    icon: FileCheck,
    color: '#D4AF37',
    description: 'Our team is reviewing your documents.',
  },
  {
    id: 'in_processing',
    label: 'In Processing',
    icon: RefreshCw,
    color: '#8B5CF6',
    description: 'Your documents are being processed.',
  },
  {
    id: 'apostille_completed',
    label: 'Apostille Completed',
    icon: Shield,
    color: '#10B981',
    description: 'Apostille certification has been completed.',
  },
  {
    id: 'dispatched',
    label: 'Dispatched',
    icon: Truck,
    color: '#3B82F6',
    description: 'Your documents have been dispatched.',
  },
  {
    id: 'delivered',
    label: 'Delivered',
    icon: Home,
    color: '#10B981',
    description: 'Your documents have been delivered.',
  },
];

// Sample order data
const orderData = {
  id: 'APS-40218',
  service: 'Apostille Services',
  status: 'in_processing',
  createdAt: '2026-08-15T10:30:00',
  updatedAt: '2026-08-20T14:45:00',
  customer: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+44 20 1234 5678',
  },
  documents: [
    { name: 'Birth Certificate', type: 'Personal', status: 'verified' },
    { name: 'Marriage Certificate', type: 'Personal', status: 'processing' },
  ],
  timeline: [
    {
      id: 1,
      status: 'received',
      date: '2026-08-15T10:30:00',
      description: 'Order received and confirmed',
      location: 'London, UK',
    },
    {
      id: 2,
      status: 'under_review',
      date: '2026-08-16T09:15:00',
      description: 'Documents under review by our team',
      location: 'London, UK',
    },
    {
      id: 3,
      status: 'in_processing',
      date: '2026-08-18T11:00:00',
      description: 'Apostille processing in progress',
      location: 'London, UK',
    },
    {
      id: 4,
      status: 'apostille_completed',
      date: '2026-08-20T14:45:00',
      description: 'Apostille completed',
      location: 'London, UK',
    },
    {
      id: 5,
      status: 'dispatched',
      date: null,
      description: 'Documents dispatched',
      location: 'London, UK',
    },
    {
      id: 6,
      status: 'delivered',
      date: null,
      description: 'Documents delivered',
      location: 'London, UK',
    },
  ],
  tracking: {
    courier: 'DHL Express',
    trackingNumber: 'DH1234567890',
    estimatedDelivery: '2026-08-22T18:00:00',
    currentLocation: 'London Sorting Centre',
    nextLocation: 'Delivery Hub',
  },
};

const CustomerTrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [showTrackingDetails, setShowTrackingDetails] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      // For demo, always return the sample order
      if (orderId === 'APS-40218') {
        setOrder(orderData);
      } else {
        setError('Order not found. Please check your order ID and try again.');
        setOrder(null);
      }
      setIsLoading(false);
    }, 1500);
  };

  const getStatusIndex = (statusId) => {
    return orderStatuses.findIndex(s => s.id === statusId);
  };

  const getCurrentStatusIndex = () => {
    if (!order) return -1;
    return getStatusIndex(order.status);
  };

  const getStatusProgress = () => {
    if (!order) return 0;
    const currentIndex = getCurrentStatusIndex();
    return ((currentIndex + 1) / orderStatuses.length) * 100;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { label: 'Completed', color: '#10B981' },
      processing: { label: 'In Progress', color: '#D4AF37' },
      pending: { label: 'Pending', color: '#94A3B8' },
      verified: { label: 'Verified', color: '#10B981' },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium"
        style={{
          background: `${config.color}15`,
          color: config.color,
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: config.color }} />
        {config.label}
      </span>
    );
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
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl" style={{ background: 'rgba(11, 18, 32, 0.1)' }}>
              <Package className="w-6 h-6" style={{ color: '#0B1220' }} />
            </div>
            <div>
              <h1
                className="text-2xl lg:text-3xl font-bold"
                style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
              >
                Track Order
              </h1>
              <p className="text-sm" style={{ color: '#64748B' }}>
                Track your document apostille and legalisation status
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl p-6 mb-8"
          style={{ border: '1px solid #E2E8F0' }}
        >
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
              <input
                type="text"
                placeholder="Enter your order ID (e.g., APS-40218)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                color: '#0B1220',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
              }}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Track Order</span>
                </>
              )}
            </button>
          </form>
          {error && (
            <div className="mt-4 p-3 rounded-xl flex items-start gap-2" style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#EF4444' }} />
              <p className="text-sm" style={{ color: '#EF4444' }}>{error}</p>
            </div>
          )}
        </motion.div>

        {/* Order Tracking Results */}
        <AnimatePresence>
          {order && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Order Summary */}
              <motion.div
                variants={fadeUp}
                className="bg-white rounded-2xl p-6"
                style={{ border: '1px solid #E2E8F0' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium" style={{ color: '#64748B' }}>Order ID:</span>
                      <span className="text-sm font-bold" style={{ color: '#0B1220' }}>{order.id}</span>
                      <button className="p-1 rounded hover:bg-gray-100 transition-colors" style={{ color: '#94A3B8' }}>
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-sm" style={{ color: '#64748B' }}>{order.service}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs" style={{ color: '#94A3B8' }}>Status</p>
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                        style={{
                          background: `${orderStatuses.find(s => s.id === order.status)?.color}15`,
                          color: orderStatuses.find(s => s.id === order.status)?.color,
                        }}
                      >
                        {orderStatuses.find(s => s.id === order.status)?.icon && 
                          React.createElement(orderStatuses.find(s => s.id === order.status).icon, { className: "w-4 h-4" })
                        }
                        {orderStatuses.find(s => s.id === order.status)?.label}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs" style={{ color: '#94A3B8' }}>Last Updated</p>
                      <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                        {new Date(order.updatedAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Progress Timeline */}
              <motion.div
                variants={fadeUp}
                className="bg-white rounded-2xl p-8"
                style={{ border: '1px solid #E2E8F0' }}
              >
                <h2
                  className="text-lg font-bold mb-8"
                  style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                >
                  Order Progress
                </h2>

                {/* Progress Bar */}
                <div className="relative mb-8">
                  <div className="w-full h-2 rounded-full" style={{ background: '#E2E8F0' }}>
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${getStatusProgress()}%`,
                        background: 'linear-gradient(90deg, #D4AF37, #F4D03F)',
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs" style={{ color: '#94A3B8' }}>Order Received</span>
                    <span className="text-xs" style={{ color: '#94A3B8' }}>Delivered</span>
                  </div>
                </div>

                {/* Timeline Steps */}
                <div className="relative">
                  {/* Vertical Line */}
                  <div className="absolute left-5 top-6 bottom-6 w-0.5" style={{ background: '#E2E8F0' }} />

                  {order.timeline.map((step, index) => {
                    const isCompleted = step.date !== null;
                    const isCurrent = step.status === order.status;
                    const StatusIcon = orderStatuses.find(s => s.id === step.status)?.icon || Clock;
                    const statusColor = orderStatuses.find(s => s.id === step.status)?.color || '#94A3B8';

                    return (
                      <div key={step.id} className="relative flex gap-6 pb-8 last:pb-0">
                        {/* Status Icon */}
                        <div className="relative z-10">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                              isCompleted ? 'scale-100' : 'scale-90'
                            }`}
                            style={{
                              background: isCompleted ? `${statusColor}15` : '#F8FAFC',
                              border: `2px solid ${isCompleted ? statusColor : '#E2E8F0'}`,
                            }}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5" style={{ color: statusColor }} />
                            ) : (
                              <StatusIcon className="w-5 h-5" style={{ color: '#94A3B8' }} />
                            )}
                          </div>
                          {isCompleted && (
                            <div
                              className="absolute inset-0 rounded-full animate-ping"
                              style={{
                                background: `${statusColor}20`,
                                animationDuration: '2s',
                              }}
                            />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h4
                                className={`font-semibold ${
                                  isCompleted ? 'text-[#0B1220]' : 'text-[#94A3B8]'
                                }`}
                                style={{ fontFamily: "'Fraunces', serif" }}
                              >
                                {step.description}
                              </h4>
                              {isCurrent && (
                                <span
                                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium"
                                  style={{
                                    background: 'rgba(212, 175, 55, 0.1)',
                                    color: '#D4AF37',
                                  }}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                                  In Progress
                                </span>
                              )}
                            </div>
                            {isCompleted ? (
                              <span className="text-sm whitespace-nowrap" style={{ color: '#64748B' }}>
                                {new Date(step.date).toLocaleDateString('en-GB', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </span>
                            ) : (
                              <span className="text-sm whitespace-nowrap" style={{ color: '#94A3B8' }}>
                                Pending
                              </span>
                            )}
                          </div>
                          {step.location && (
                            <div className="flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" style={{ color: '#94A3B8' }} />
                              <span className="text-xs" style={{ color: '#94A3B8' }}>
                                {step.location}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Order Details */}
              <motion.div
                variants={fadeUp}
                className="grid md:grid-cols-2 gap-6"
              >
                {/* Customer Info */}
                <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #E2E8F0' }}>
                  <h3
                    className="text-sm font-semibold mb-4 flex items-center gap-2"
                    style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                  >
                    <User className="w-4 h-4" style={{ color: '#D4AF37' }} />
                    Customer Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(11, 18, 32, 0.08)' }}>
                        <span className="text-sm font-bold" style={{ color: '#0B1220' }}>
                          {order.customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                          {order.customer.name}
                        </p>
                        <div className="flex items-center gap-3">
                          <span className="text-xs flex items-center gap-1" style={{ color: '#64748B' }}>
                            <Mail className="w-3 h-3" />
                            {order.customer.email}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: '#64748B' }}>
                      <Phone className="w-4 h-4" />
                      {order.customer.phone}
                    </div>
                  </div>
                </div>

                {/* Documents Info */}
                <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #E2E8F0' }}>
                  <h3
                    className="text-sm font-semibold mb-4 flex items-center gap-2"
                    style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                  >
                    <FileText className="w-4 h-4" style={{ color: '#D4AF37' }} />
                    Documents
                  </h3>
                  <div className="space-y-3">
                    {order.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-xl"
                        style={{ background: '#F8FAFC' }}
                      >
                        <div>
                          <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                            {doc.name}
                          </p>
                          <p className="text-xs" style={{ color: '#64748B' }}>
                            {doc.type}
                          </p>
                        </div>
                        {getStatusBadge(doc.status)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tracking Info */}
                <div className="bg-white rounded-2xl p-6 md:col-span-2" style={{ border: '1px solid #E2E8F0' }}>
                  <h3
                    className="text-sm font-semibold mb-4 flex items-center gap-2"
                    style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                  >
                    <Truck className="w-4 h-4" style={{ color: '#D4AF37' }} />
                    Tracking Information
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>Courier</p>
                      <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                        {order.tracking.courier}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>Tracking Number</p>
                      <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                        {order.tracking.trackingNumber}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>Estimated Delivery</p>
                      <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                        {new Date(order.tracking.estimatedDelivery).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>Current Location</p>
                      <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                        {order.tracking.currentLocation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-white rounded-2xl p-6 md:col-span-2 flex flex-wrap gap-3" style={{ border: '1px solid #E2E8F0' }}>
                  <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #0B1220, #1A2A4A)',
                      color: 'white',
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'white',
                      color: '#0B1220',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Download Receipt
                  </button>
                  <button
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
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'white',
                      color: '#0B1220',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'white',
                      color: '#0B1220',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Contact Support
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help Section */}
        {!order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 grid md:grid-cols-3 gap-4"
          >
            <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
              <HelpCircle className="w-8 h-8 mx-auto mb-2" style={{ color: '#D4AF37' }} />
              <h4 className="text-sm font-semibold" style={{ color: '#0B1220' }}>Need Help?</h4>
              <p className="text-xs" style={{ color: '#64748B' }}>
                Contact our support team for assistance
              </p>
              <button className="mt-2 text-xs font-medium transition-colors hover:underline" style={{ color: '#D4AF37' }}>
                Contact Support
              </button>
            </div>
            <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
              <FileText className="w-8 h-8 mx-auto mb-2" style={{ color: '#D4AF37' }} />
              <h4 className="text-sm font-semibold" style={{ color: '#0B1220' }}>Order ID Format</h4>
              <p className="text-xs" style={{ color: '#64748B' }}>
                Enter your order ID in the format: APS-XXXXX
              </p>
            </div>
            <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
              <Clock className="w-8 h-8 mx-auto mb-2" style={{ color: '#D4AF37' }} />
              <h4 className="text-sm font-semibold" style={{ color: '#0B1220' }}>Tracking Updates</h4>
              <p className="text-xs" style={{ color: '#64748B' }}>
                Status updates are available 24/7 in real-time
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CustomerTrackOrder;