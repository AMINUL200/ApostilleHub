import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap,
  Package,
  FileText,
  Users,
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  RefreshCw,
  Plus,
  X,
  MoreHorizontal,
  MessageCircle,
  Star,
  Award,
  Shield,
  Truck,
  Home,
  Building2,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  HelpCircle,
  Info,
  Timer,
  TrendingUp,
  FileCheck,
  ExternalLink,
  Copy,
  Share2,
  Bell,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  List,
  Grid,
  ChevronUp,
  ChevronDown as ChevronDownIcon,
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
} from 'lucide-react';

// Sample calendar events data
const calendarEvents = [
  {
    id: 'EV-001',
    time: '09:00',
    title: 'Review AP-10231',
    type: 'review',
    orderId: 'APS-10231',
    priority: 'high',
    status: 'pending',
    duration: '45 min',
    customer: 'John Doe',
    document: 'Birth Certificate',
  },
  {
    id: 'EV-002',
    time: '10:30',
    title: 'Process AP-10235',
    type: 'processing',
    orderId: 'APS-10235',
    priority: 'urgent',
    status: 'in_progress',
    duration: '1 hour',
    customer: 'Sarah Johnson',
    document: 'Marriage Certificate',
  },
  {
    id: 'EV-003',
    time: '12:00',
    title: 'Review AP-10241',
    type: 'review',
    orderId: 'APS-10241',
    priority: 'normal',
    status: 'pending',
    duration: '30 min',
    customer: 'Michael Chen',
    document: 'Academic Transcript',
  },
  {
    id: 'EV-004',
    time: '15:00',
    title: 'Complete AP-10245',
    type: 'completion',
    orderId: 'APS-10245',
    priority: 'high',
    status: 'pending',
    duration: '1.5 hours',
    customer: 'Emma Williams',
    document: 'Passport',
  },
  {
    id: 'EV-005',
    time: '11:00',
    title: 'Quality Check AP-10238',
    type: 'quality_check',
    orderId: 'APS-10238',
    priority: 'normal',
    status: 'in_progress',
    duration: '45 min',
    customer: 'James O\'Brien',
    document: 'Corporate Document',
  },
  {
    id: 'EV-006',
    time: '14:00',
    title: 'Document Verification AP-10250',
    type: 'verification',
    orderId: 'APS-10250',
    priority: 'normal',
    status: 'pending',
    duration: '30 min',
    customer: 'Maria Garcia',
    document: 'Diploma',
  },
  {
    id: 'EV-007',
    time: '16:30',
    title: 'Final Approval AP-10255',
    type: 'approval',
    orderId: 'APS-10255',
    priority: 'low',
    status: 'pending',
    duration: '20 min',
    customer: 'David Okafor',
    document: 'Police Clearance',
  },
];

// Today's deadlines
const deadlines = [
  {
    id: 'DL-001',
    orderId: 'APS-10235',
    task: 'Process Marriage Certificate',
    dueTime: 'Today, 5:00 PM',
    priority: 'urgent',
    type: 'processing',
  },
  {
    id: 'DL-002',
    orderId: 'APS-10231',
    task: 'Review Birth Certificate',
    dueTime: 'Today, 6:00 PM',
    priority: 'high',
    type: 'review',
  },
  {
    id: 'DL-003',
    orderId: 'APS-10245',
    task: 'Complete Passport Apostille',
    dueTime: 'Tomorrow, 10:00 AM',
    priority: 'high',
    type: 'completion',
  },
  {
    id: 'DL-004',
    orderId: 'APS-10241',
    task: 'Review Academic Transcript',
    dueTime: 'Aug 31, 2026',
    priority: 'normal',
    type: 'review',
  },
];

const eventTypeConfig = {
  review: { label: 'Review', color: '#0F4C81', bg: 'rgba(15, 76, 129, 0.1)', icon: FileText },
  processing: { label: 'Processing', color: '#D4AF37', bg: 'rgba(212, 175, 55, 0.1)', icon: Package },
  quality_check: { label: 'Quality Check', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)', icon: CheckCircle2 },
  completion: { label: 'Completion', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', icon: FileCheck },
  verification: { label: 'Verification', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', icon: Shield },
  approval: { label: 'Approval', color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.1)', icon: BadgeCheck },
};

const priorityConfig = {
  urgent: { label: 'Urgent', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.15)', icon: Zap },
  high: { label: 'High', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', icon: AlertCircle },
  normal: { label: 'Normal', color: '#0F4C81', bg: 'rgba(15, 76, 129, 0.1)', icon: Circle },
  low: { label: 'Low', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', icon: CircleSlash },
};

const statusConfig = {
  pending: { label: 'Pending', color: '#94A3B8', bg: 'rgba(148, 163, 184, 0.1)', icon: CircleDot },
  in_progress: { label: 'In Progress', color: '#D4AF37', bg: 'rgba(212, 175, 55, 0.1)', icon: Timer },
  completed: { label: 'Completed', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', icon: CheckCircle2 },
};

const filterOptions = {
  type: ['All', 'Review', 'Processing', 'Quality Check', 'Completion', 'Verification', 'Approval'],
  priority: ['All', 'Urgent', 'High', 'Normal', 'Low'],
  status: ['All', 'Pending', 'In Progress', 'Completed'],
};

const ApostilleOfficerCalendar = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);

  // Filter events
  const filteredEvents = React.useMemo(() => {
    let filtered = [...calendarEvents];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(term) ||
        event.orderId.toLowerCase().includes(term) ||
        event.customer.toLowerCase().includes(term) ||
        event.document.toLowerCase().includes(term)
      );
    }

    if (typeFilter !== 'All') {
      filtered = filtered.filter(event => event.type === typeFilter.toLowerCase());
    }

    if (priorityFilter !== 'All') {
      filtered = filtered.filter(event => event.priority === priorityFilter.toLowerCase());
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(event => event.status === statusFilter.toLowerCase());
    }

    return filtered;
  }, [calendarEvents, searchTerm, typeFilter, priorityFilter, statusFilter]);

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const getTypeBadge = (type) => {
    const config = eventTypeConfig[type];
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

  const getPriorityBadge = (priority) => {
    const config = priorityConfig[priority] || priorityConfig.normal;
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

  const getStatusBadge = (status) => {
    const config = statusConfig[status] || statusConfig.pending;
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

  const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const getTimeDisplay = (time) => {
    return time;
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
              <div className="p-2.5 rounded-xl" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
                <Calendar className="w-6 h-6" style={{ color: '#D4AF37' }} />
              </div>
              <div>
                <h1
                  className="text-2xl lg:text-3xl font-bold"
                  style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                >
                  Work Calendar
                </h1>
                <p className="text-sm" style={{ color: '#64748B' }}>
                  Manage your daily tasks and deadlines
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
                background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                color: '#0B1220',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
              }}
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>
        </motion.div>

        {/* Today's Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
                <CalendarIcon className="w-5 h-5" style={{ color: '#D4AF37' }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                  {getTodayDate()}
                </p>
                <p className="text-xs" style={{ color: '#64748B' }}>
                  {filteredEvents.length} tasks scheduled for today
                </p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }}>
                {calendarEvents.filter(e => e.priority === 'urgent').length} Urgent
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>
                {calendarEvents.filter(e => e.status === 'completed').length} Completed
              </span>
            </div>
          </div>
        </motion.div>

        {/* Deadlines Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        >
          <div className="p-4 rounded-2xl" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <div className="flex items-center gap-2">
              <AlarmClock className="w-4 h-4" style={{ color: '#EF4444' }} />
              <span className="text-xs font-medium" style={{ color: '#64748B' }}>Due Today</span>
            </div>
            <p className="text-xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}>
              {deadlines.filter(d => d.dueTime.includes('Today')).length}
            </p>
          </div>
          <div className="p-4 rounded-2xl" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" style={{ color: '#EF4444' }} />
              <span className="text-xs font-medium" style={{ color: '#64748B' }}>Urgent Tasks</span>
            </div>
            <p className="text-xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}>
              {deadlines.filter(d => d.priority === 'urgent').length}
            </p>
          </div>
          <div className="p-4 rounded-2xl" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" style={{ color: '#0F4C81' }} />
              <span className="text-xs font-medium" style={{ color: '#64748B' }}>Reviews</span>
            </div>
            <p className="text-xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}>
              {deadlines.filter(d => d.type === 'review').length}
            </p>
          </div>
          <div className="p-4 rounded-2xl" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" style={{ color: '#D4AF37' }} />
              <span className="text-xs font-medium" style={{ color: '#64748B' }}>Processing</span>
            </div>
            <p className="text-xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}>
              {deadlines.filter(d => d.type === 'processing').length}
            </p>
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
                placeholder="Search tasks by title, order ID, or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              >
                {filterOptions.type.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              >
                {filterOptions.priority.map((opt) => (
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

              <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                  style={{ color: viewMode === 'list' ? '#0F4C81' : '#94A3B8' }}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                  style={{ color: viewMode === 'grid' ? '#0F4C81' : '#94A3B8' }}
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('All');
                  setPriorityFilter('All');
                  setStatusFilter('All');
                }}
                className="px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                style={{ color: '#64748B', border: '1px solid #E2E8F0' }}
              >
                Reset
              </button>
            </div>
          </div>
        </motion.div>

        {/* Calendar Events - List View */}
        {viewMode === 'list' && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-white rounded-2xl overflow-hidden"
            style={{ border: '1px solid #E2E8F0' }}
          >
            <div className="divide-y divide-gray-100">
              <AnimatePresence>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      variants={fadeUp}
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleViewEvent(event)}
                    >
                      {/* Time */}
                      <div className="w-16 text-center flex-shrink-0">
                        <p className="text-sm font-bold" style={{ color: '#0B1220' }}>
                          {getTimeDisplay(event.time)}
                        </p>
                      </div>

                      {/* Time indicator line */}
                      <div className="w-0.5 h-12 flex-shrink-0" style={{ background: '#E2E8F0' }} />

                      {/* Event Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-medium" style={{ color: '#0B1220' }}>
                            {event.title}
                          </h3>
                          {getTypeBadge(event.type)}
                          {getPriorityBadge(event.priority)}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs" style={{ color: '#64748B' }}>
                            {event.orderId}
                          </span>
                          <span className="text-xs" style={{ color: '#64748B' }}>
                            •
                          </span>
                          <span className="text-xs" style={{ color: '#64748B' }}>
                            {event.customer}
                          </span>
                          <span className="text-xs" style={{ color: '#64748B' }}>
                            •
                          </span>
                          <span className="text-xs" style={{ color: '#64748B' }}>
                            {event.document}
                          </span>
                        </div>
                      </div>

                      {/* Status & Duration */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {getStatusBadge(event.status)}
                        <span className="text-xs" style={{ color: '#94A3B8' }}>
                          {event.duration}
                        </span>
                        <button
                          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                          style={{ color: '#94A3B8' }}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                    <h3 className="text-lg font-semibold mb-1" style={{ color: '#0B1220' }}>
                      No events found
                    </h3>
                    <p className="text-sm" style={{ color: '#64748B' }}>
                      {searchTerm || typeFilter !== 'All' || priorityFilter !== 'All' || statusFilter !== 'All'
                        ? 'Try adjusting your filters'
                        : 'No tasks scheduled for today'}
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Calendar Events - Grid View */}
        {viewMode === 'grid' && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    variants={fadeUp}
                    className="bg-white rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    style={{ border: '1px solid #E2E8F0' }}
                    onClick={() => handleViewEvent(event)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" style={{ color: '#94A3B8' }} />
                        <span className="text-sm font-medium" style={{ color: '#0B1220' }}>
                          {getTimeDisplay(event.time)}
                        </span>
                      </div>
                      {getPriorityBadge(event.priority)}
                    </div>

                    <h3 className="text-sm font-medium mb-2" style={{ color: '#0B1220' }}>
                      {event.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {getTypeBadge(event.type)}
                      {getStatusBadge(event.status)}
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs" style={{ color: '#64748B' }}>
                        <span className="font-medium">Order:</span> {event.orderId}
                      </p>
                      <p className="text-xs" style={{ color: '#64748B' }}>
                        <span className="font-medium">Customer:</span> {event.customer}
                      </p>
                      <p className="text-xs" style={{ color: '#64748B' }}>
                        <span className="font-medium">Document:</span> {event.document}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: '#E2E8F0' }}>
                      <span className="text-xs" style={{ color: '#94A3B8' }}>
                        {event.duration}
                      </span>
                      <button
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        style={{ color: '#94A3B8' }}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                  <h3 className="text-lg font-semibold mb-1" style={{ color: '#0B1220' }}>
                    No events found
                  </h3>
                  <p className="text-sm" style={{ color: '#64748B' }}>
                    {searchTerm || typeFilter !== 'All' || priorityFilter !== 'All' || statusFilter !== 'All'
                      ? 'Try adjusting your filters'
                      : 'No tasks scheduled for today'}
                  </p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Upcoming Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 bg-white rounded-2xl p-6"
          style={{ border: '1px solid #E2E8F0' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-lg font-bold"
              style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
            >
              Upcoming Deadlines
            </h2>
            <button className="text-sm font-medium transition-colors hover:text-[#D4AF37]" style={{ color: '#0F4C81' }}>
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {deadlines.map((deadline) => (
              <div
                key={deadline.id}
                className="p-4 rounded-xl transition-all duration-200 hover:bg-gray-50"
                style={{
                  background: '#F8FAFC',
                  borderLeft: `3px solid ${deadline.priority === 'urgent' ? '#EF4444' : deadline.priority === 'high' ? '#D4AF37' : '#0F4C81'}`,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium" style={{ color: '#64748B' }}>
                    {deadline.orderId}
                  </span>
                  {getPriorityBadge(deadline.priority)}
                </div>
                <p className="text-sm font-medium mb-1" style={{ color: '#0B1220' }}>
                  {deadline.task}
                </p>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" style={{ color: '#94A3B8' }} />
                  <span className="text-xs" style={{ color: '#64748B' }}>
                    {deadline.dueTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {showEventDetails && selectedEvent && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowEventDetails(false)}
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
                    style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                  >
                    Task Details
                  </h2>
                  <button
                    onClick={() => setShowEventDetails(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Task</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedEvent.title}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>Time</p>
                      <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                        {getTimeDisplay(selectedEvent.time)}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>Duration</p>
                      <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                        {selectedEvent.duration}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>Type</p>
                      {getTypeBadge(selectedEvent.type)}
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>Priority</p>
                      {getPriorityBadge(selectedEvent.priority)}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Status</p>
                    {getStatusBadge(selectedEvent.status)}
                  </div>

                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Order ID</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedEvent.orderId}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Customer</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedEvent.customer}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Document</p>
                    <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                      {selectedEvent.document}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #0F4C81, #1E6BB8)',
                      color: 'white',
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    View Order
                  </button>
                  <button
                    onClick={() => setShowEventDetails(false)}
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

export default ApostilleOfficerCalendar;