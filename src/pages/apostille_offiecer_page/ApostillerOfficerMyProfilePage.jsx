import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Award,
  Star,
  Calendar,
  Briefcase,
  Globe,
  FileCheck,
  Clock,
  CheckCircle2,
  Edit,
  Save,
  X,
  Camera,
  Upload,
  Download,
  Printer,
  Share2,
  MessageCircle,
  Mail as MailIcon,
  Phone as PhoneIcon,
  Building2,
  Users,
  FileText,
  CreditCard,
  Package,
  Headphones,
  Settings,
  Bell,
  LogOut,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Copy,
  ExternalLink,
  HelpCircle,
  Info,
  Award as AwardIcon,
  Star as StarIcon,
  TrendingUp,
  TrendingDown,
  Activity,
  PieChart,
  BarChart,
  LineChart,
  RefreshCw,
  Plus,
  X as XIcon,
  Check,
  AlertCircle,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  MapPin as MapPinIcon,
  Globe as GlobeIcon,
  ShieldCheck,
  BadgeCheck,
  Fingerprint,
  Key,
  Lock,
  UserCheck,
  UserCog,
  Briefcase as BriefcaseIcon,
  GraduationCap,
  BookOpen,
  FileCheck as FileCheckIcon,
  Truck,
  Home,
  Building,
  Landmark,
  Users as UsersIcon,
  Award as AwardBadge,
} from 'lucide-react';

const ApostilleOfficerMyProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const fileInputRef = useRef(null);

  // Officer data
  const officerData = {
    name: 'John Smith',
    email: 'john.smith@apostillehub.com',
    phone: '+44 20 1234 5678',
    location: 'London, UK',
    bio: 'Senior Apostille Officer with over 8 years of experience in document legalisation and authentication. Specialised in Hague Convention apostille services.',
    joinDate: '2024-01-15',
    role: 'Senior Apostille Officer',
    department: 'Apostille Services',
    employeeId: 'EMP-2024-001',
    avatar: null,
    // Qualifications
    qualifications: [
      { id: 1, name: 'Certified Apostille Specialist', issuer: 'International Legal Association', year: '2024', status: 'active' },
      { id: 2, name: 'Document Authentication Expert', issuer: 'UK Legal Council', year: '2023', status: 'active' },
      { id: 3, name: 'Notary Public', issuer: 'UK Notary Society', year: '2022', status: 'active' },
      { id: 4, name: 'International Law Certificate', issuer: 'Cambridge University', year: '2021', status: 'active' },
    ],
    // Services offered
    services: [
      { id: 1, name: 'Apostille Services', description: 'Hague Convention apostille certification', countries: ['All Countries'], icon: Shield },
      { id: 2, name: 'Embassy Legalisation', description: 'Consulate and embassy authentication', countries: ['USA', 'Canada', 'Australia'], icon: Globe },
      { id: 3, name: 'Notary Services', description: 'Certified notary verification', countries: ['UK', 'Europe'], icon: FileCheck },
      { id: 4, name: 'Document Translation', description: 'Professional certified translations', countries: ['All Countries'], icon: FileText },
    ],
    // Countries of operation
    countries: [
      { id: 1, name: 'United Kingdom', flag: '🇬🇧' },
      { id: 2, name: 'United States', flag: '🇺🇸' },
      { id: 3, name: 'Canada', flag: '🇨🇦' },
      { id: 4, name: 'Australia', flag: '🇦🇺' },
      { id: 5, name: 'Germany', flag: '🇩🇪' },
      { id: 6, name: 'France', flag: '🇫🇷' },
      { id: 7, name: 'Spain', flag: '🇪🇸' },
      { id: 8, name: 'Italy', flag: '🇮🇹' },
    ],
    // Document types handled
    documentTypes: [
      { id: 1, name: 'Birth Certificates', count: 342, icon: FileCheck },
      { id: 2, name: 'Marriage Certificates', count: 218, icon: FileCheck },
      { id: 3, name: 'Educational Diplomas', count: 156, icon: GraduationCap },
      { id: 4, name: 'Corporate Documents', count: 89, icon: Briefcase },
      { id: 5, name: 'Power of Attorney', count: 67, icon: FileText },
      { id: 6, name: 'Police Clearance', count: 43, icon: Shield },
    ],
    // Statistics
    stats: {
      totalOrders: 1247,
      completedOrders: 1189,
      pendingOrders: 58,
      approvalRate: 98.5,
      avgProcessingTime: '2.3 days',
      totalDocuments: 3245,
      customerSatisfaction: 4.8,
    },
    // Recent activity
    recentActivity: [
      { id: 1, action: 'Verified documents for order APS-40218', time: '2 hours ago', type: 'verification' },
      { id: 2, action: 'Completed apostille for APS-40217', time: '4 hours ago', type: 'completion' },
      { id: 3, action: 'Assigned new order APS-40219', time: '6 hours ago', type: 'assignment' },
      { id: 4, action: 'Updated order status for APS-40215', time: '1 day ago', type: 'update' },
      { id: 5, action: 'Reviewed documents for APS-40213', time: '2 days ago', type: 'review' },
    ],
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status) => {
    return status === 'active' ? '#10B981' : '#94A3B8';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
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
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl" style={{ background: 'rgba(15, 76, 129, 0.1)' }}>
              <User className="w-6 h-6" style={{ color: '#0F4C81' }} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#0B1220]">
                My Profile
              </h1>
              <p className="text-sm text-[#64748B]">
                View and manage your professional profile
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                  color: '#0B1220',
                  boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
                }}
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                  style={{ color: '#64748B' }}
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #0F4C81, #1E6BB8)',
                    color: 'white',
                  }}
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 text-center"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <div className="relative inline-block">
                <div
                  className="w-28 h-28 rounded-full mx-auto flex items-center justify-center text-4xl font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #0F4C81, #1E6BB8)',
                  }}
                >
                  {officerData.avatar ? (
                    <img
                      src={officerData.avatar}
                      alt={officerData.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    getInitials(officerData.name)
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-2 rounded-full text-white shadow-lg hover:scale-110 transition-transform"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                    }}
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <h2 className="text-xl font-bold mt-4 text-[#0B1220]">
                {officerData.name}
              </h2>
              <p className="text-sm text-[#0F4C81] font-medium">
                {officerData.role}
              </p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <BadgeCheck className="w-4 h-4 text-[#10B981]" />
                <span className="text-xs text-[#10B981]">Verified Officer</span>
              </div>

              <div className="mt-4 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                <div className="flex items-center justify-center gap-6">
                  <div>
                    <p className="text-lg font-bold text-[#0B1220]">
                      {officerData.stats.totalOrders}
                    </p>
                    <p className="text-xs text-[#64748B]">Total Orders</p>
                  </div>
                  <div className="w-px h-10" style={{ background: '#E2E8F0' }} />
                  <div>
                    <p className="text-lg font-bold text-[#10B981]">
                      {officerData.stats.approvalRate}%
                    </p>
                    <p className="text-xs text-[#64748B]">Approval Rate</p>
                  </div>
                  <div className="w-px h-10" style={{ background: '#E2E8F0' }} />
                  <div>
                    <p className="text-lg font-bold text-[#D4AF37]">
                      {officerData.stats.customerSatisfaction}
                    </p>
                    <p className="text-xs text-[#64748B]">Satisfaction</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-left">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-[#94A3B8]" />
                  <span className="text-[#64748B]">{officerData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-[#94A3B8]" />
                  <span className="text-[#64748B]">{officerData.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-[#94A3B8]" />
                  <span className="text-[#64748B]">{officerData.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-[#94A3B8]" />
                  <span className="text-[#64748B]">Joined {formatDate(officerData.joinDate)}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Briefcase className="w-4 h-4 text-[#94A3B8]" />
                  <span className="text-[#64748B]">{officerData.department}</span>
                </div>
              </div>

              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full mt-4 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                style={{ color: '#0F4C81', border: '1px solid #E2E8F0' }}
              >
                Change Password
              </button>
            </motion.div>

            {/* Countries of Operation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white rounded-2xl p-6"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <h3 className="text-sm font-semibold mb-4 text-[#0B1220] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#D4AF37]" />
                Countries of Operation
              </h3>
              <div className="flex flex-wrap gap-2">
                {officerData.countries.map((country) => (
                  <span
                    key={country.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{
                      background: 'rgba(15, 76, 129, 0.08)',
                      color: '#0F4C81',
                    }}
                  >
                    <span className="text-base">{country.flag}</span>
                    {country.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <h3 className="text-sm font-semibold mb-3 text-[#0B1220]">
                About Me
              </h3>
              {isEditing ? (
                <textarea
                  defaultValue={officerData.bio}
                  rows="4"
                  className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none"
                  style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                />
              ) : (
                <p className="text-sm text-[#64748B] leading-relaxed">
                  {officerData.bio}
                </p>
              )}
            </motion.div>

            {/* Qualifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="bg-white rounded-2xl p-6"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <h3 className="text-sm font-semibold mb-4 text-[#0B1220] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                Qualifications & Certifications
              </h3>
              <div className="space-y-3">
                {officerData.qualifications.map((qual) => (
                  <div
                    key={qual.id}
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: '#F8FAFC' }}
                  >
                    <div>
                      <p className="text-sm font-medium text-[#0B1220]">
                        {qual.name}
                      </p>
                      <p className="text-xs text-[#64748B]">
                        {qual.issuer} • {qual.year}
                      </p>
                    </div>
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: '#10B981',
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#10B981' }} />
                      {qual.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl p-6"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <h3 className="text-sm font-semibold mb-4 text-[#0B1220] flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#D4AF37]" />
                Services Offered
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {officerData.services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={service.id}
                      className="p-4 rounded-xl transition-all duration-200 hover:shadow-md"
                      style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: 'rgba(15, 76, 129, 0.08)' }}
                        >
                          <Icon className="w-4 h-4" style={{ color: '#0F4C81' }} />
                        </div>
                        <span className="text-sm font-medium text-[#0B1220]">
                          {service.name}
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B] mb-2">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {service.countries.map((country, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-full"
                            style={{
                              background: 'rgba(15, 76, 129, 0.06)',
                              color: '#0F4C81',
                            }}
                          >
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Document Types Handled */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="bg-white rounded-2xl p-6"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <h3 className="text-sm font-semibold mb-4 text-[#0B1220] flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#D4AF37]" />
                Document Types Handled
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {officerData.documentTypes.map((doc) => {
                  const Icon = doc.icon;
                  return (
                    <div
                      key={doc.id}
                      className="p-4 rounded-xl text-center"
                      style={{ background: '#F8FAFC' }}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: '#0F4C81' }} />
                      <p className="text-sm font-medium text-[#0B1220]">
                        {doc.count}
                      </p>
                      <p className="text-xs text-[#64748B]">
                        {doc.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl p-6"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-[#0B1220] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#D4AF37]" />
                  Recent Activity
                </h3>
                <button className="text-sm font-medium transition-colors hover:text-[#D4AF37]" style={{ color: '#0F4C81' }}>
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {officerData.recentActivity.map((activity) => {
                  const typeConfig = {
                    verification: { icon: FileCheck, color: '#0F4C81' },
                    completion: { icon: CheckCircle2, color: '#10B981' },
                    assignment: { icon: Package, color: '#D4AF37' },
                    update: { icon: RefreshCw, color: '#8B5CF6' },
                    review: { icon: Eye, color: '#F59E0B' },
                  };
                  const config = typeConfig[activity.type] || typeConfig.update;
                  const Icon = config.icon;

                  return (
                    <div
                      key={activity.id}
                      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-gray-50"
                    >
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${config.color}15` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: config.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#0B1220]">
                          {activity.action}
                        </p>
                        <p className="text-xs text-[#94A3B8]">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPasswordModal(false)}
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
                    Change Password
                  </h2>
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                      Current Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Enter current password"
                        className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                        style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                      />
                      <Lock className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                      New Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                        style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                      />
                      <Key className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                      Confirm New Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                        style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                      />
                      <CheckCircle2 className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: '#64748B' }}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #0F4C81, #1E6BB8)',
                      color: 'white',
                    }}
                  >
                    <Check className="w-4 h-4" />
                    Update Password
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

export default ApostilleOfficerMyProfilePage;