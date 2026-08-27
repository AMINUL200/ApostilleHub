import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Headphones,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Plus,
  X,
  Send,
  Paperclip,
  Image,
  Smile,
  ChevronDown,
  ChevronRight,
  User,
  Calendar,
  Tag,
  Filter,
  MoreHorizontal,
  Eye,
  Reply,
  Trash2,
  Archive,
  RefreshCw,
  Star,
  StarOff,
  Flag,
  Users,
  Award,
  Shield,
  TrendingUp,
  MessageSquare,
  HelpCircle,
  FileText,
  Upload,
  Download,
  Printer,
  ExternalLink,
  Copy,
  Clock as ClockIcon,
  Check,
  Info,
  BookOpen,
  ThumbsUp,
} from 'lucide-react';

// Sample ticket data
const tickets = [
  {
    id: 'SUP-001',
    subject: 'Document verification delay',
    category: 'Processing',
    status: 'open',
    priority: 'high',
    createdAt: '2026-08-20T10:30:00',
    updatedAt: '2026-08-21T14:45:00',
    messages: [
      {
        id: 1,
        sender: 'customer',
        name: 'John Doe',
        message: 'My documents have been under review for 5 days. Can you please update me on the status?',
        timestamp: '2026-08-20T10:30:00',
        attachments: [],
      },
      {
        id: 2,
        sender: 'support',
        name: 'Sarah Johnson',
        message: 'I apologize for the delay. Let me check your case and get back to you within 2 hours.',
        timestamp: '2026-08-20T11:15:00',
        attachments: [],
      },
      {
        id: 3,
        sender: 'support',
        name: 'Sarah Johnson',
        message: 'Good news! Your documents have been verified and are now in processing. You should receive an update within 24-48 hours.',
        timestamp: '2026-08-21T14:45:00',
        attachments: [],
      },
    ],
  },
  {
    id: 'SUP-002',
    subject: 'Payment issue',
    category: 'Billing',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2026-08-19T09:15:00',
    updatedAt: '2026-08-20T16:30:00',
    messages: [
      {
        id: 1,
        sender: 'customer',
        name: 'John Doe',
        message: 'I tried to make a payment but it keeps failing. Can you help?',
        timestamp: '2026-08-19T09:15:00',
        attachments: [],
      },
    ],
  },
  {
    id: 'SUP-003',
    subject: 'Need help with document upload',
    category: 'Technical',
    status: 'resolved',
    priority: 'low',
    createdAt: '2026-08-18T14:20:00',
    updatedAt: '2026-08-19T11:00:00',
    messages: [
      {
        id: 1,
        sender: 'customer',
        name: 'John Doe',
        message: 'I am having trouble uploading my documents. The system keeps giving an error.',
        timestamp: '2026-08-18T14:20:00',
        attachments: [],
      },
      {
        id: 2,
        sender: 'support',
        name: 'Michael Chen',
        message: 'Please clear your browser cache and try again. If the issue persists, try using a different browser.',
        timestamp: '2026-08-19T11:00:00',
        attachments: [],
      },
    ],
  },
];

// Knowledge base articles
const knowledgeBase = [
  {
    id: 1,
    title: 'How to upload documents',
    category: 'Getting Started',
    views: 1245,
    helpful: 92,
  },
  {
    id: 2,
    title: 'Understanding apostille processing times',
    category: 'Processing',
    views: 876,
    helpful: 88,
  },
  {
    id: 3,
    title: 'Payment methods and troubleshooting',
    category: 'Billing',
    views: 654,
    helpful: 85,
  },
  {
    id: 4,
    title: 'How to track your order',
    category: 'Tracking',
    views: 543,
    helpful: 90,
  },
];

// FAQ data
const faqs = [
  {
    id: 1,
    question: 'How long does apostille processing take?',
    answer: 'Standard processing typically takes 5-7 business days. Express processing is available for 2-3 business days.',
  },
  {
    id: 2,
    question: 'What documents can be apostilled?',
    answer: 'Birth certificates, marriage certificates, educational diplomas, power of attorney, and many more.',
  },
  {
    id: 3,
    question: 'How do I track my order?',
    answer: 'You can track your order using the tracking number provided in your confirmation email.',
  },
];

const CustomerSupport = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [newMessage, setNewMessage] = useState('');
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedTicket?.messages]);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedTicket) return;
    // Add message logic here
    setNewMessage('');
  };

  const getStatusBadge = (status) => {
    const config = {
      open: { label: 'Open', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
      in_progress: { label: 'In Progress', color: '#D4AF37', bg: 'rgba(212, 175, 55, 0.1)' },
      resolved: { label: 'Resolved', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
      closed: { label: 'Closed', color: '#64748B', bg: 'rgba(100, 116, 139, 0.1)' },
    };
    const configStatus = config[status] || config.open;
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

  const getPriorityBadge = (priority) => {
    const config = {
      high: { label: 'High', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
      medium: { label: 'Medium', color: '#D4AF37', bg: 'rgba(212, 175, 55, 0.1)' },
      low: { label: 'Low', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
    };
    const configPriority = config[priority] || config.low;
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
        style={{
          background: configPriority.bg,
          color: configPriority.color,
        }}
      >
        {configPriority.label}
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
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl" style={{ background: 'rgba(11, 18, 32, 0.1)' }}>
              <Headphones className="w-6 h-6" style={{ color: '#0B1220' }} />
            </div>
            <div>
              <h1
                className="text-2xl lg:text-3xl font-bold"
                style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
              >
                Support
              </h1>
              <p className="text-sm" style={{ color: '#64748B' }}>
                Get help with your documents and orders
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowNewTicketForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
              color: '#0B1220',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
            }}
          >
            <Plus className="w-4 h-4" />
            New Ticket
          </button>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeTab === 'tickets'
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              background: activeTab === 'tickets'
                ? 'linear-gradient(135deg, #0B1220, #1A2A4A)'
                : 'white',
              border: activeTab === 'tickets' ? 'none' : '1px solid #E2E8F0',
            }}
          >
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Support Tickets
          </button>
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeTab === 'knowledge'
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              background: activeTab === 'knowledge'
                ? 'linear-gradient(135deg, #0B1220, #1A2A4A)'
                : 'white',
              border: activeTab === 'knowledge' ? 'none' : '1px solid #E2E8F0',
            }}
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            Knowledge Base
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeTab === 'faq'
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              background: activeTab === 'faq'
                ? 'linear-gradient(135deg, #0B1220, #1A2A4A)'
                : 'white',
              border: activeTab === 'faq' ? 'none' : '1px solid #E2E8F0',
            }}
          >
            <HelpCircle className="w-4 h-4 inline mr-2" />
            FAQ
          </button>
        </div>

        {/* Tickets Tab */}
        {activeTab === 'tickets' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Ticket List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-4" style={{ border: '1px solid #E2E8F0' }}>
                <div className="relative mb-4">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                    style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                  />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                    style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                  >
                    <option value="All">All Status</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {filteredTickets.map((ticket) => (
                    <button
                      key={ticket.id}
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setShowTicketDetails(true);
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                        selectedTicket?.id === ticket.id
                          ? 'bg-[#0F4C81]/5 border-2 border-[#0F4C81]'
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate" style={{ color: '#0B1220' }}>
                            {ticket.subject}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs" style={{ color: '#94A3B8' }}>
                              {ticket.id}
                            </span>
                            <span className="text-xs" style={{ color: '#94A3B8' }}>
                              •
                            </span>
                            <span className="text-xs" style={{ color: '#94A3B8' }}>
                              {new Date(ticket.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 ml-2">
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </div>
                      </div>
                      <div className="mt-1 flex items-center gap-1">
                        <span className="text-xs" style={{ color: '#94A3B8' }}>
                          {ticket.messages.length} messages
                        </span>
                        {ticket.messages.filter(m => m.sender === 'support' && !m.read).length > 0 && (
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: '#D4AF37' }}
                          />
                        )}
                      </div>
                    </button>
                  ))}
                  {filteredTickets.length === 0 && (
                    <div className="text-center py-8">
                      <HelpCircle className="w-12 h-12 mx-auto mb-3" style={{ color: '#94A3B8' }} />
                      <p className="text-sm" style={{ color: '#64748B' }}>No tickets found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="lg:col-span-2">
              {selectedTicket && showTicketDetails ? (
                <div className="bg-white rounded-2xl" style={{ border: '1px solid #E2E8F0' }}>
                  {/* Ticket Header */}
                  <div className="p-6 border-b" style={{ borderColor: '#E2E8F0' }}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3
                          className="text-lg font-bold"
                          style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                        >
                          {selectedTicket.subject}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm" style={{ color: '#64748B' }}>
                            {selectedTicket.id}
                          </span>
                          <span className="text-sm" style={{ color: '#64748B' }}>
                            •
                          </span>
                          <span className="text-sm" style={{ color: '#64748B' }}>
                            {selectedTicket.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(selectedTicket.status)}
                        {getPriorityBadge(selectedTicket.priority)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <ClockIcon className="w-4 h-4" style={{ color: '#94A3B8' }} />
                      <span className="text-xs" style={{ color: '#94A3B8' }}>
                        Last updated: {new Date(selectedTicket.updatedAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="p-6 max-h-[400px] overflow-y-auto">
                    <div className="space-y-4">
                      {selectedTicket.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl p-4 ${
                              message.sender === 'customer'
                                ? 'bg-[#0F4C81] text-white'
                                : 'bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium" style={{ color: message.sender === 'customer' ? 'rgba(255,255,255,0.8)' : '#64748B' }}>
                                {message.name}
                              </span>
                              <span className="text-xs" style={{ color: message.sender === 'customer' ? 'rgba(255,255,255,0.5)' : '#94A3B8' }}>
                                {new Date(message.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-sm leading-relaxed">{message.message}</p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Reply Area */}
                  <div className="p-6 border-t" style={{ borderColor: '#E2E8F0' }}>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Type your reply..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                        style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="p-2.5 rounded-xl text-white transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                          color: '#0B1220',
                        }}
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <button className="text-xs flex items-center gap-1 transition-colors hover:text-[#D4AF37]" style={{ color: '#94A3B8' }}>
                        <Paperclip className="w-3.5 h-3.5" />
                        Attach
                      </button>
                      <button className="text-xs flex items-center gap-1 transition-colors hover:text-[#D4AF37]" style={{ color: '#94A3B8' }}>
                        <Image className="w-3.5 h-3.5" />
                        Image
                      </button>
                      <button className="text-xs flex items-center gap-1 transition-colors hover:text-[#D4AF37]" style={{ color: '#94A3B8' }}>
                        <Smile className="w-3.5 h-3.5" />
                        Emoji
                      </button>
                      <span className="text-xs" style={{ color: '#94A3B8' }}>Press Enter to send</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center" style={{ border: '1px solid #E2E8F0' }}>
                  <MessageSquare className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}>
                    Select a Ticket
                  </h3>
                  <p className="text-sm" style={{ color: '#64748B' }}>
                    Choose a ticket from the list to view details and reply
                  </p>
                  <button
                    onClick={() => setShowNewTicketForm(true)}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                      color: '#0B1220',
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    Create New Ticket
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Knowledge Base Tab */}
        {activeTab === 'knowledge' && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 gap-6"
          >
            {knowledgeBase.map((article) => (
              <motion.div
                key={article.id}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{ border: '1px solid #E2E8F0' }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-bold mb-2" style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}>
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(11, 18, 32, 0.05)', color: '#64748B' }}>
                        {article.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs" style={{ color: '#94A3B8' }}>
                        <Eye className="w-3 h-3 inline mr-1" />
                        {article.views} views
                      </span>
                      <span className="text-xs" style={{ color: '#94A3B8' }}>
                        <ThumbsUp className="w-3 h-3 inline mr-1" />
                        {article.helpful}% helpful
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5" style={{ color: '#94A3B8' }} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-3xl mx-auto space-y-4"
          >
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 transition-all duration-300 hover:shadow-lg"
                style={{ border: '1px solid #E2E8F0' }}
              >
                <h3 className="text-sm font-bold mb-2" style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}>
                  {faq.question}
                </h3>
                <p className="text-sm" style={{ color: '#64748B' }}>
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Quick Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 grid md:grid-cols-3 gap-4"
        >
          <div className="p-6 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(11, 18, 32, 0.05)' }}>
              <Mail className="w-6 h-6" style={{ color: '#0B1220' }} />
            </div>
            <h4 className="text-sm font-semibold" style={{ color: '#0B1220' }}>Email Support</h4>
            <p className="text-xs" style={{ color: '#64748B' }}>support@apostillehub.com</p>
            <p className="text-xs" style={{ color: '#94A3B8' }}>Response within 24 hours</p>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(11, 18, 32, 0.05)' }}>
              <Phone className="w-6 h-6" style={{ color: '#0B1220' }} />
            </div>
            <h4 className="text-sm font-semibold" style={{ color: '#0B1220' }}>Phone Support</h4>
            <p className="text-xs" style={{ color: '#64748B' }}>+44 20 1234 5678</p>
            <p className="text-xs" style={{ color: '#94A3B8' }}>Mon-Fri, 9AM-6PM GMT</p>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(11, 18, 32, 0.05)' }}>
              <MessageCircle className="w-6 h-6" style={{ color: '#0B1220' }} />
            </div>
            <h4 className="text-sm font-semibold" style={{ color: '#0B1220' }}>Live Chat</h4>
            <p className="text-xs" style={{ color: '#64748B' }}>Chat with our support team</p>
            <button className="text-xs font-medium transition-colors hover:underline" style={{ color: '#D4AF37' }}>
              Start Chat
            </button>
          </div>
        </motion.div>
      </div>

      {/* New Ticket Modal */}
      <AnimatePresence>
        {showNewTicketForm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowNewTicketForm(false)}
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
                    New Support Ticket
                  </h2>
                  <button
                    onClick={() => setShowNewTicketForm(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Brief description of your issue"
                      className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                      style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all appearance-none" style={{ borderColor: '#E2E8F0', color: '#0B1220' }}>
                      <option>General</option>
                      <option>Processing</option>
                      <option>Billing</option>
                      <option>Technical</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                      Priority <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all appearance-none" style={{ borderColor: '#E2E8F0', color: '#0B1220' }}>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows="4"
                      placeholder="Please describe your issue in detail..."
                      className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none"
                      style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                      Attachments (Optional)
                    </label>
                    <div className="p-4 rounded-xl text-center border-2 border-dashed cursor-pointer transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37]/5" style={{ borderColor: '#E2E8F0' }}>
                      <Upload className="w-6 h-6 mx-auto mb-2" style={{ color: '#94A3B8' }} />
                      <p className="text-sm" style={{ color: '#64748B' }}>Click to upload or drag and drop</p>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>PDF, JPG, PNG (Max 10MB)</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <button
                    onClick={() => setShowNewTicketForm(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: '#64748B' }}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                      color: '#0B1220',
                    }}
                  >
                    Submit Ticket
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

export default CustomerSupport;