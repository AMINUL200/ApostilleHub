import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileCheck,
  Clock,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Package,
  Users,
  TrendingUp,
  Calendar,
  Bell,
  Search,
  Filter,
  ChevronDown,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Download,
  Printer,
  Share2,
  MessageCircle,
  Star,
  Award,
  Shield,
  Truck,
  Home,
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  FileText,
  Upload,
  Plus,
  X,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  BarChart,
  PieChart,
  Target,
  Zap,
  Crown,
  Building2,
  Globe,
  Headphones,
  CreditCard,
  HelpCircle,
  Info,
  Settings,
  LogOut,
} from 'lucide-react';

const ApostilleOfficerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('today');

  // Stats Data
  const stats = [
    {
      id: 1,
      label: 'Assigned Orders',
      value: 12,
      icon: Package,
      color: '#0F4C81',
      bgColor: 'rgba(15, 76, 129, 0.1)',
      change: '+2',
      changeType: 'increase',
    },
    {
      id: 2,
      label: 'New Orders',
      value: 8,
      icon: RefreshCw,
      color: '#D4AF37',
      bgColor: 'rgba(212, 175, 55, 0.1)',
      change: '+5',
      changeType: 'increase',
    },
    {
      id: 3,
      label: 'Awaiting Document Review',
      value: 15,
      icon: FileCheck,
      color: '#8B5CF6',
      bgColor: 'rgba(139, 92, 246, 0.1)',
      change: '+3',
      changeType: 'increase',
    },
    {
      id: 4,
      label: 'Documents Requiring Changes',
      value: 4,
      icon: AlertCircle,
      color: '#EF4444',
      bgColor: 'rgba(239, 68, 68, 0.1)',
      change: '-2',
      changeType: 'decrease',
    },
    {
      id: 5,
      label: 'Orders in Processing',
      value: 18,
      icon: Clock,
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      change: '+4',
      changeType: 'increase',
    },
    {
      id: 6,
      label: 'Completed Today',
      value: 7,
      icon: CheckCircle2,
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      change: '+1',
      changeType: 'increase',
    },
    {
      id: 7,
      label: 'Urgent / Express Orders',
      value: 3,
      icon: Zap,
      color: '#EF4444',
      bgColor: 'rgba(239, 68, 68, 0.1)',
      change: '+2',
      changeType: 'increase',
    },
    {
      id: 8,
      label: 'Pending Actions',
      value: 6,
      icon: AlertCircle,
      color: '#D4AF37',
      bgColor: 'rgba(212, 175, 55, 0.1)',
      change: '-1',
      changeType: 'decrease',
    },
  ];

  // Recent Assigned Orders
  const recentOrders = [
    {
      id: 'APS-40218',
      customer: 'John Doe',
      service: 'Apostille Services',
      status: 'in_processing',
      priority: 'high',
      date: '2026-08-29',
      documents: 3,
    },
    {
      id: 'APS-40217',
      customer: 'Sarah Johnson',
      service: 'Embassy Legalisation',
      status: 'under_review',
      priority: 'normal',
      date: '2026-08-29',
      documents: 2,
    },
    {
      id: 'APS-40216',
      customer: 'Michael Chen',
      service: 'Notary Services',
      status: 'awaiting_documents',
      priority: 'low',
      date: '2026-08-28',
      documents: 1,
    },
    {
      id: 'APS-40215',
      customer: 'Emma Williams',
      service: 'Translation Services',
      status: 'in_processing',
      priority: 'high',
      date: '2026-08-28',
      documents: 2,
    },
    {
      id: 'APS-40214',
      customer: 'James O\'Brien',
      service: 'Corporate Documents',
      status: 'completed',
      priority: 'normal',
      date: '2026-08-27',
      documents: 5,
    },
  ];

  // Upcoming Deadlines
  const deadlines = [
    { id: 1, order: 'APS-40218', task: 'Document Verification', due: 'Today, 5:00 PM', priority: 'high' },
    { id: 2, order: 'APS-40217', task: 'Apostille Processing', due: 'Tomorrow, 10:00 AM', priority: 'normal' },
    { id: 3, order: 'APS-40216', task: 'Document Review', due: 'Aug 31, 2026', priority: 'normal' },
    { id: 4, order: 'APS-40215', task: 'Final Approval', due: 'Sep 1, 2026', priority: 'high' },
    { id: 5, order: 'APS-40214', task: 'Quality Check', due: 'Sep 2, 2026', priority: 'low' },
  ];

  // Recent Activity
  const recentActivities = [
    { id: 1, action: 'Verified documents for order APS-40218', time: '2 hours ago', type: 'verification' },
    { id: 2, action: 'Completed apostille for APS-40217', time: '4 hours ago', type: 'completion' },
    { id: 3, action: 'Requested changes for APS-40216', time: '6 hours ago', type: 'changes' },
    { id: 4, action: 'Assigned new order APS-40219', time: '8 hours ago', type: 'assignment' },
    { id: 5, action: 'Updated order status for APS-40215', time: '10 hours ago', type: 'update' },
  ];

  const getStatusBadge = (status) => {
    const config = {
      in_processing: { label: 'In Processing', color: '#D4AF37' },
      under_review: { label: 'Under Review', color: '#0F4C81' },
      awaiting_documents: { label: 'Awaiting Documents', color: '#F59E0B' },
      completed: { label: 'Completed', color: '#10B981' },
      requires_changes: { label: 'Requires Changes', color: '#EF4444' },
    };
    const statusConfig = config[status] || config.under_review;
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
        style={{
          background: `${statusConfig.color}15`,
          color: statusConfig.color,
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusConfig.color }} />
        {statusConfig.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const config = {
      high: { label: 'High', color: '#EF4444' },
      normal: { label: 'Normal', color: '#0F4C81' },
      low: { label: 'Low', color: '#10B981' },
    };
    const priorityConfig = config[priority] || config.normal;
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
        style={{
          background: `${priorityConfig.color}15`,
          color: priorityConfig.color,
        }}
      >
        {priorityConfig.label}
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
              <div className="p-2.5 rounded-xl" style={{ background: 'rgba(15, 76, 129, 0.1)' }}>
                <Shield className="w-6 h-6" style={{ color: '#0F4C81' }} />
              </div>
              <div>
                <h1
                  className="text-2xl lg:text-3xl font-bold"
                  style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                >
                  Officer Dashboard
                </h1>
                <p className="text-sm" style={{ color: '#64748B' }}>
                  Manage your daily apostille and legalisation tasks
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
              <Calendar className="w-4 h-4" style={{ color: '#94A3B8' }} />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-transparent border-none outline-none text-sm"
                style={{ color: '#0B1220' }}
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <ChevronDown className="w-4 h-4" style={{ color: '#94A3B8' }} />
            </div>
            <button className="p-2.5 rounded-xl relative" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
              <Bell className="w-5 h-5" style={{ color: '#64748B' }} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                4
              </span>
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={fadeUp}
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
          {/* Left Column - Orders & Activities */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Workload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-lg font-bold"
                  style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                >
                  Today's Workload
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm" style={{ color: '#64748B' }}>
                    <Clock className="w-4 h-4 inline mr-1" />
                    8:30 AM - 5:00 PM
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl text-center" style={{ background: '#F8FAFC' }}>
                  <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#0F4C81' }}>
                    12
                  </p>
                  <p className="text-xs" style={{ color: '#64748B' }}>Assigned</p>
                </div>
                <div className="p-4 rounded-xl text-center" style={{ background: '#F8FAFC' }}>
                  <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#D4AF37' }}>
                    8
                  </p>
                  <p className="text-xs" style={{ color: '#64748B' }}>In Progress</p>
                </div>
                <div className="p-4 rounded-xl text-center" style={{ background: '#F8FAFC' }}>
                  <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#10B981' }}>
                    7
                  </p>
                  <p className="text-xs" style={{ color: '#64748B' }}>Completed</p>
                </div>
                <div className="p-4 rounded-xl text-center" style={{ background: '#F8FAFC' }}>
                  <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#EF4444' }}>
                    3
                  </p>
                  <p className="text-xs" style={{ color: '#64748B' }}>Urgent</p>
                </div>
              </div>
            </motion.div>

            {/* Recent Assigned Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-lg font-bold"
                  style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                >
                  Recent Assigned Orders
                </h2>
                <button className="text-sm font-medium transition-colors hover:text-[#D4AF37]" style={{ color: '#0F4C81' }}>
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <th className="text-left text-xs font-medium pb-3" style={{ color: '#64748B' }}>Order ID</th>
                      <th className="text-left text-xs font-medium pb-3" style={{ color: '#64748B' }}>Customer</th>
                      <th className="text-left text-xs font-medium pb-3" style={{ color: '#64748B' }}>Service</th>
                      <th className="text-left text-xs font-medium pb-3" style={{ color: '#64748B' }}>Status</th>
                      <th className="text-left text-xs font-medium pb-3" style={{ color: '#64748B' }}>Priority</th>
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
                          <span className="text-sm font-medium" style={{ color: '#0B1220' }}>{order.id}</span>
                        </td>
                        <td className="py-3">
                          <span className="text-sm" style={{ color: '#64748B' }}>{order.customer}</span>
                        </td>
                        <td className="py-3">
                          <span className="text-sm" style={{ color: '#64748B' }}>{order.service}</span>
                        </td>
                        <td className="py-3">
                          {getStatusBadge(order.status)}
                        </td>
                        <td className="py-3">
                          {getPriorityBadge(order.priority)}
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

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl p-6"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-lg font-bold"
                  style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                >
                  Recent Activity
                </h2>
                <button className="text-sm font-medium transition-colors hover:text-[#D4AF37]" style={{ color: '#0F4C81' }}>
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const typeConfig = {
                    verification: { icon: FileCheck, color: '#0F4C81' },
                    completion: { icon: CheckCircle2, color: '#10B981' },
                    changes: { icon: AlertCircle, color: '#EF4444' },
                    assignment: { icon: Package, color: '#D4AF37' },
                    update: { icon: RefreshCw, color: '#8B5CF6' },
                  };
                  const config = typeConfig[activity.type] || typeConfig.update;
                  const Icon = config.icon;

                  return (
                    <div
                      key={activity.id}
                      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-gray-50"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${config.color}15` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: config.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm" style={{ color: '#0B1220' }}>
                          {activity.action}
                        </p>
                        <p className="text-xs" style={{ color: '#94A3B8' }}>
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Deadlines & Summary */}
          <div className="space-y-6">
            {/* Order Status Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <h2
                className="text-lg font-bold mb-4"
                style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
              >
                Order Status Summary
              </h2>

              <div className="space-y-3">
                {[
                  { label: 'In Processing', value: 18, color: '#D4AF37', bg: 'rgba(212, 175, 55, 0.1)' },
                  { label: 'Under Review', value: 15, color: '#0F4C81', bg: 'rgba(15, 76, 129, 0.1)' },
                  { label: 'Awaiting Documents', value: 12, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
                  { label: 'Completed', value: 42, color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
                  { label: 'Requires Changes', value: 4, color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: '#64748B' }}>{item.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold" style={{ color: '#0B1220' }}>{item.value}</span>
                      <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium" style={{ color: '#0B1220' }}>Total Orders</span>
                  <span className="text-sm font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}>
                    91
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Upcoming Deadlines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl p-6"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-lg font-bold"
                  style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                >
                  Upcoming Deadlines
                </h2>
                <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }}>
                  {deadlines.filter(d => d.priority === 'high').length} Urgent
                </span>
              </div>

              <div className="space-y-3">
                {deadlines.map((deadline) => (
                  <div
                    key={deadline.id}
                    className="flex items-center justify-between p-3 rounded-xl transition-all duration-200 hover:bg-gray-50"
                    style={{
                      borderLeft: `3px solid ${deadline.priority === 'high' ? '#EF4444' : '#D4AF37'}`,
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                        {deadline.order}
                      </p>
                      <p className="text-xs" style={{ color: '#64748B' }}>
                        {deadline.task}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium" style={{ color: deadline.priority === 'high' ? '#EF4444' : '#64748B' }}>
                        {deadline.due}
                      </p>
                      {getPriorityBadge(deadline.priority)}
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.02]" style={{ background: '#F8FAFC', color: '#0F4C81', border: '1px solid #E2E8F0' }}>
                View All Deadlines
              </button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 text-white"
              style={{
                background: 'linear-gradient(135deg, #0B1220, #1A2A4A)',
              }}
            >
              <h3
                className="text-lg font-bold mb-3"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Quick Actions
              </h3>
              <p className="text-sm text-white/70 mb-4">
                Perform common tasks quickly
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button className="px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 hover:scale-105" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
                  <FileCheck className="w-4 h-4 inline mr-1" />
                  Review Documents
                </button>
                <button className="px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 hover:scale-105" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
                  <Package className="w-4 h-4 inline mr-1" />
                  Assign Orders
                </button>
                <button className="px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 hover:scale-105" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
                  <MessageCircle className="w-4 h-4 inline mr-1" />
                  Contact Customer
                </button>
                <button className="px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 hover:scale-105" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
                  <Download className="w-4 h-4 inline mr-1" />
                  Generate Report
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApostilleOfficerDashboard;