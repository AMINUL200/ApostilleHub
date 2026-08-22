import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Clock,
  CheckCircle2,
  Headphones,
  Upload,
  Package,
  CreditCard,
  MessageSquare,
  Bell,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Eye,
  MoreHorizontal,
  User,
  Settings,
  LogOut,
  Shield,
  Award,
  Calendar,
  ChevronRight,
  Plus,
  AlertCircle,
  TrendingUp,
  Users,
  Briefcase,
  Star,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Dashboard Stats
  const stats = [
    {
      id: 1,
      label: 'Total Orders',
      value: '24',
      icon: Package,
      change: '+12%',
      changeType: 'increase',
      color: '#0F4C81',
      bgColor: 'rgba(15, 76, 129, 0.1)',
    },
    {
      id: 2,
      label: 'Pending Orders',
      value: '3',
      icon: Clock,
      change: '-2%',
      changeType: 'decrease',
      color: '#D4AF37',
      bgColor: 'rgba(212, 175, 55, 0.1)',
    },
    {
      id: 3,
      label: 'Completed Orders',
      value: '21',
      icon: CheckCircle2,
      change: '+18%',
      changeType: 'increase',
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
    },
    {
      id: 4,
      label: 'Invoices',
      value: '18',
      icon: CheckCircle2,
      change: '+5%',
      changeType: 'increase',
      color: '#8B5CF6',
      bgColor: 'rgba(139, 92, 246, 0.1)',
    },
    {
      id: 5,
      label: 'Support Tickets',
      value: '2',
      icon: Headphones,
      change: '-3%',
      changeType: 'decrease',
      color: '#EF4444',
      bgColor: 'rgba(239, 68, 68, 0.1)',
    },
  ];

  // Recent Activity Data
  const recentActivities = [
    {
      id: 1,
      type: 'document',
      title: 'Document Uploaded',
      description: 'Birth Certificate - Order #APS-40218',
      time: '2 hours ago',
      icon: Upload,
      color: '#0F4C81',
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Received',
      description: 'Invoice #INV-2024-001 - £149.00',
      time: '5 hours ago',
      icon: CreditCard,
      color: '#10B981',
    },
    {
      id: 3,
      type: 'order',
      title: 'Order Completed',
      description: 'Order #APS-40216 - Apostille Certificate',
      time: '1 day ago',
      icon: CheckCircle2,
      color: '#D4AF37',
    },
    {
      id: 4,
      type: 'support',
      title: 'Support Reply',
      description: 'Ticket #SUP-2024-012 - Document verification',
      time: '2 days ago',
      icon: MessageSquare,
      color: '#8B5CF6',
    },
  ];

  // Recent Orders Data
  const recentOrders = [
    {
      id: 'APS-40218',
      service: 'Apostille Services',
      date: 'Aug 15, 2026',
      status: 'In Processing',
      amount: '£149.00',
      statusColor: '#D4AF37',
    },
    {
      id: 'APS-40217',
      service: 'Embassy Legalisation',
      date: 'Aug 12, 2026',
      status: 'Completed',
      amount: '£299.00',
      statusColor: '#10B981',
    },
    {
      id: 'APS-40216',
      service: 'Notary Services',
      date: 'Aug 8, 2026',
      status: 'Delivered',
      amount: '£89.00',
      statusColor: '#10B981',
    },
    {
      id: 'APS-40215',
      service: 'Translation Services',
      date: 'Aug 5, 2026',
      status: 'Awaiting Documents',
      amount: '£129.00',
      statusColor: '#F59E0B',
    },
  ];

  // Quick Actions
  const quickActions = [
    {
      id: 1,
      label: 'Create New Order',
      icon: Package,
      color: '#0F4C81',
      path: '/orders/create',
      bgColor: 'rgba(15, 76, 129, 0.1)',
    },
    {
      id: 2,
      label: 'Upload Document',
      icon: Upload,
      color: '#D4AF37',
      path: '/documents/upload',
      bgColor: 'rgba(212, 175, 55, 0.1)',
    },
    {
      id: 3,
      label: 'Track Order',
      icon: Package,
      color: '#10B981',
      path: '/orders/track',
      bgColor: 'rgba(16, 185, 129, 0.1)',
    },
    {
      id: 4,
      label: 'Contact Support',
      icon: Headphones,
      color: '#8B5CF6',
      path: '/support',
      bgColor: 'rgba(139, 92, 246, 0.1)',
    },
  ];

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
      {/* Dashboard Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 ">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl transition-all duration-300 hover:shadow-lg"
                style={{
                  background: 'white',
                  border: '1px solid #E2E8F0',
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: stat.bgColor }}
                  >
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <span
                    className="text-xs font-medium flex items-center gap-0.5"
                    style={{
                      color: stat.changeType === 'increase' ? '#10B981' : '#EF4444',
                    }}
                  >
                    {stat.changeType === 'increase' ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {stat.change}
                  </span>
                </div>
                <p
                  className="text-2xl font-bold mb-0.5"
                  style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
                >
                  {stat.value}
                </p>
                <p className="text-xs font-medium" style={{ color: '#64748B' }}>
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Recent Activity & Orders */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl p-6"
              style={{
                background: 'white',
                border: '1px solid #E2E8F0',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-lg font-bold"
                  style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
                >
                  Recent Activity
                </h2>
                <button className="text-sm font-medium transition-colors hover:text-[#0F4C81]" style={{ color: '#D4AF37' }}>
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-gray-50 cursor-pointer"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${activity.color}15` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: activity.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>
                          {activity.title}
                        </p>
                        <p className="text-xs" style={{ color: '#64748B' }}>
                          {activity.description}
                        </p>
                      </div>
                      <span className="text-xs whitespace-nowrap" style={{ color: '#94A3B8' }}>
                        {activity.time}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl p-6"
              style={{
                background: 'white',
                border: '1px solid #E2E8F0',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-lg font-bold"
                  style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
                >
                  Recent Orders
                </h2>
                <button className="text-sm font-medium transition-colors hover:text-[#0F4C81]" style={{ color: '#D4AF37' }}>
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <th className="text-left text-xs font-medium pb-3" style={{ color: '#64748B' }}>Order ID</th>
                      <th className="text-left text-xs font-medium pb-3" style={{ color: '#64748B' }}>Service</th>
                      <th className="text-left text-xs font-medium pb-3" style={{ color: '#64748B' }}>Date</th>
                      <th className="text-left text-xs font-medium pb-3" style={{ color: '#64748B' }}>Status</th>
                      <th className="text-right text-xs font-medium pb-3" style={{ color: '#64748B' }}>Amount</th>
                      <th className="text-right text-xs font-medium pb-3" style={{ color: '#64748B' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50 transition-colors"
                        style={{ borderBottom: index < recentOrders.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                      >
                        <td className="py-3">
                          <span className="text-sm font-medium" style={{ color: '#0F172A' }}>{order.id}</span>
                        </td>
                        <td className="py-3">
                          <span className="text-sm" style={{ color: '#64748B' }}>{order.service}</span>
                        </td>
                        <td className="py-3">
                          <span className="text-sm" style={{ color: '#64748B' }}>{order.date}</span>
                        </td>
                        <td className="py-3">
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{
                              background: `${order.statusColor}15`,
                              color: order.statusColor,
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: order.statusColor }} />
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <span className="text-sm font-semibold" style={{ color: '#0F172A' }}>{order.amount}</span>
                        </td>
                        <td className="py-3 text-right">
                          <button className="p-1.5 rounded-lg transition-colors hover:bg-gray-100" style={{ color: '#64748B' }}>
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Quick Actions & Support */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl p-6"
              style={{
                background: 'white',
                border: '1px solid #E2E8F0',
              }}
            >
              <h2
                className="text-lg font-bold mb-4"
                style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
              >
                Quick Actions
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.id}
                      to={action.path}
                      className="group p-4 rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      style={{
                        background: action.bgColor,
                        border: '1px solid transparent',
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 transition-transform duration-300 group-hover:scale-110"
                        style={{ background: 'white' }}
                      >
                        <Icon className="w-5 h-5" style={{ color: action.color }} />
                      </div>
                      <p className="text-xs font-medium" style={{ color: '#0F172A' }}>
                        {action.label}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </motion.div>

            {/* Support Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="rounded-2xl p-6 text-white relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #0F4C81, #0B3D68)',
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl" />
              
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Headphones className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-sm font-semibold text-[#D4AF37]">Support</span>
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
                  Need Help?
                </h3>
                <p className="text-sm text-white/80 mb-4">
                  Our support team is available 24/7 to assist you.
                </p>
                <div className="flex gap-3">
                  <Link
                    to="/support"
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-center transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                      color: '#0B1220',
                    }}
                  >
                    Contact Support
                  </Link>
                  <Link
                    to="/faq"
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold text-center transition-all duration-300 hover:bg-white/10"
                    style={{
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: 'white',
                    }}
                  >
                    FAQ
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="rounded-2xl p-6 flex items-center gap-4"
              style={{
                background: 'white',
                border: '1px solid #E2E8F0',
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(212, 175, 55, 0.1)' }}
              >
                <Shield className="w-7 h-7" style={{ color: '#D4AF37' }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>
                  Verified Customer
                </p>
                <p className="text-xs" style={{ color: '#64748B' }}>
                  100% satisfaction guarantee
                </p>
              </div>
              <Award className="w-5 h-5 ml-auto" style={{ color: '#D4AF37' }} />
            </motion.div>
          </div>
        </div>

        {/* Bottom Section - Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <div className="flex items-center justify-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-[#10B981]" />
              <span className="text-lg font-bold" style={{ color: '#0F172A' }}>98%</span>
            </div>
            <p className="text-xs" style={{ color: '#64748B' }}>Success Rate</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <div className="flex items-center justify-center gap-2 mb-1">
              <Users className="w-4 h-4 text-[#0F4C81]" />
              <span className="text-lg font-bold" style={{ color: '#0F172A' }}>10K+</span>
            </div>
            <p className="text-xs" style={{ color: '#64748B' }}>Documents Processed</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <div className="flex items-center justify-center gap-2 mb-1">
              <Star className="w-4 h-4 text-[#D4AF37]" fill="#D4AF37" />
              <span className="text-lg font-bold" style={{ color: '#0F172A' }}>4.9/5</span>
            </div>
            <p className="text-xs" style={{ color: '#64748B' }}>Trustpilot Rating</p>
          </div>
          <div className="p-4 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <div className="flex items-center justify-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-lg font-bold" style={{ color: '#0F172A' }}>24/7</span>
            </div>
            <p className="text-xs" style={{ color: '#64748B' }}>Support Available</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerDashboard;