import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Building2,
  Lock,
  Shield,
  History,
  Camera,
  Save,
  Edit2,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Smartphone,
  Key,
  Clock,
  MapPin,
  Globe,
  ChevronRight,
  Download,
  RefreshCw,
  ShieldCheck,
  Fingerprint,
  Award,
  Star,
  Calendar,
  UserCheck,
  Users,
  Briefcase,
  FileText,
  CreditCard,
  Package,
  Headphones,
  Settings,
  Bell,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  X,
  Plus,
  Trash2,
  Copy,
  ExternalLink,
  Check,
} from 'lucide-react';

const CustomerProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+44 20 1234 5678',
    companyName: 'ApostilleHub Ltd',
    jobTitle: 'Legal Consultant',
    address: '123 Legal Street, London, UK',
    bio: 'Legal professional with over 10 years of experience in document legalisation and apostille services.',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('https://i.pravatar.cc/150?img=1');
  const fileInputRef = useRef(null);

  // Login History Data
  const loginHistory = [
    {
      id: 1,
      date: 'Aug 19, 2026',
      time: '14:32',
      device: 'Chrome on Windows',
      location: 'London, UK',
      ip: '192.168.1.1',
      status: 'successful',
    },
    {
      id: 2,
      date: 'Aug 18, 2026',
      time: '09:15',
      device: 'Safari on iPhone',
      location: 'Manchester, UK',
      ip: '192.168.1.2',
      status: 'successful',
    },
    {
      id: 3,
      date: 'Aug 17, 2026',
      time: '22:45',
      device: 'Firefox on MacOS',
      location: 'Birmingham, UK',
      ip: '192.168.1.3',
      status: 'failed',
    },
    {
      id: 4,
      date: 'Aug 16, 2026',
      time: '11:20',
      device: 'Chrome on Android',
      location: 'Liverpool, UK',
      ip: '192.168.1.4',
      status: 'successful',
    },
  ];

  // Security Settings
  const securitySettings = [
    {
      id: 'two-factor',
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      icon: Shield,
      enabled: twoFactorEnabled,
      action: () => setTwoFactorEnabled(!twoFactorEnabled),
    },
    {
      id: 'login-alerts',
      title: 'Login Alerts',
      description: 'Get notified when someone logs into your account',
      icon: Bell,
      enabled: true,
    },
    {
      id: 'session-management',
      title: 'Session Management',
      description: 'View and manage active sessions',
      icon: Clock,
      enabled: false,
    },
  ];

  // Stats
  const stats = [
    { label: 'Orders', value: '24', icon: Package, color: '#0F4C81' },
    { label: 'Documents', value: '48', icon: FileText, color: '#D4AF37' },
    { label: 'Reviews', value: '12', icon: Star, color: '#10B981' },
    { label: 'Support Tickets', value: '3', icon: Headphones, color: '#8B5CF6' },
  ];

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'history', label: 'Login History', icon: History },
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add save logic here
    console.log('Saving profile data:', formData);
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Add password change logic here
    console.log('Changing password:', passwordData);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getStatusColor = (status) => {
    return status === 'successful' ? '#10B981' : '#EF4444';
  };

  const getStatusIcon = (status) => {
    return status === 'successful' ? CheckCircle2 : AlertCircle;
  };

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1
            className="text-2xl lg:text-3xl font-bold"
            style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
          >
            Profile Settings
          </h1>
          <p className="text-sm" style={{ color: '#64748B' }}>
            Manage your personal information and security settings
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
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
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${stat.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
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

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, #0F4C81, #1E6BB8)'
                    : 'white',
                  border: isActive ? 'none' : '1px solid #E2E8F0',
                  boxShadow: isActive ? '0 4px 15px rgba(15, 76, 129, 0.3)' : 'none',
                }}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: 20 }}
            className="grid lg:grid-cols-3 gap-6"
          >
            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <>
                {/* Left Column - Profile Photo & Quick Info */}
                <motion.div variants={fadeUp} className="lg:col-span-1">
                  <div
                    className="rounded-2xl p-6"
                    style={{
                      background: 'white',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    {/* Profile Photo */}
                    <div className="text-center mb-6">
                      <div className="relative inline-block">
                        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-lg">
                          <img
                            src={imagePreview}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          onClick={() => fileInputRef.current.click()}
                          className="absolute bottom-0 right-0 p-2 rounded-full text-white shadow-lg hover:scale-110 transition-transform duration-300"
                          style={{
                            background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                          }}
                        >
                          <Camera className="w-4 h-4" />
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                      <h3
                        className="text-lg font-bold mt-3"
                        style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
                      >
                        {formData.fullName}
                      </h3>
                      <p className="text-sm" style={{ color: '#64748B' }}>
                        {formData.jobTitle}
                      </p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-xs" style={{ color: '#10B981' }}>Verified Account</span>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="space-y-3 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                      <div className="flex items-center justify-between text-sm">
                        <span style={{ color: '#64748B' }}>Member Since</span>
                        <span className="font-medium" style={{ color: '#0F172A' }}>Jan 2024</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span style={{ color: '#64748B' }}>Total Orders</span>
                        <span className="font-medium" style={{ color: '#0F172A' }}>24</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span style={{ color: '#64748B' }}>Account Status</span>
                        <span className="flex items-center gap-1 text-sm font-medium text-[#10B981]">
                          <CheckCircle2 className="w-4 h-4" />
                          Active
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span style={{ color: '#64748B' }}>Trust Score</span>
                        <span className="flex items-center gap-1 text-sm font-medium text-[#D4AF37]">
                          <Award className="w-4 h-4" />
                          98%
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Column - Personal Information Form */}
                <motion.div variants={fadeUp} className="lg:col-span-2">
                  <div
                    className="rounded-2xl p-6"
                    style={{
                      background: 'white',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2
                        className="text-lg font-bold"
                        style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
                      >
                        Personal Information
                      </h2>
                      <div className="flex gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => setIsEditing(false)}
                              className="px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                              style={{ color: '#64748B' }}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSave}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105"
                              style={{
                                background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                              }}
                            >
                              <Save className="w-4 h-4" />
                              Save Changes
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-gray-100"
                            style={{ color: '#0F4C81' }}
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit Profile
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F172A' }}>
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                            style={{
                              borderColor: '#E2E8F0',
                              background: isEditing ? 'white' : '#F8FAFC',
                              color: '#0F172A',
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F172A' }}>
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                            style={{
                              borderColor: '#E2E8F0',
                              background: isEditing ? 'white' : '#F8FAFC',
                              color: '#0F172A',
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F172A' }}>
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                            style={{
                              borderColor: '#E2E8F0',
                              background: isEditing ? 'white' : '#F8FAFC',
                              color: '#0F172A',
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F172A' }}>
                          Company Name
                        </label>
                        <div className="relative">
                          <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                          <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                            style={{
                              borderColor: '#E2E8F0',
                              background: isEditing ? 'white' : '#F8FAFC',
                              color: '#0F172A',
                            }}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F172A' }}>
                          Address
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 absolute left-3 top-3" style={{ color: '#94A3B8' }} />
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                            style={{
                              borderColor: '#E2E8F0',
                              background: isEditing ? 'white' : '#F8FAFC',
                              color: '#0F172A',
                            }}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F172A' }}>
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          rows="3"
                          className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                          style={{
                            borderColor: '#E2E8F0',
                            background: isEditing ? 'white' : '#F8FAFC',
                            color: '#0F172A',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <>
                <motion.div variants={fadeUp} className="lg:col-span-2">
                  <div
                    className="rounded-2xl p-6"
                    style={{
                      background: 'white',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <h2
                      className="text-lg font-bold mb-6"
                      style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
                    >
                      Security Settings
                    </h2>

                    {/* Change Password */}
                    <div className="mb-8">
                      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: '#0F172A' }}>
                        <Key className="w-4 h-4" style={{ color: '#D4AF37' }} />
                        Change Password
                      </h3>
                      <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F172A' }}>
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="currentPassword"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordChange}
                              className="w-full pl-4 pr-12 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                              style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
                              placeholder="Enter current password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2"
                              style={{ color: '#94A3B8' }}
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F172A' }}>
                              New Password
                            </label>
                            <div className="relative">
                              <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                className="w-full pl-4 pr-12 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                                style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
                                placeholder="Enter new password"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1.5" style={{ color: '#0F172A' }}>
                              Confirm Password
                            </label>
                            <div className="relative">
                              <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                className="w-full pl-4 pr-12 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                                style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
                                placeholder="Confirm new password"
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                style={{ color: '#94A3B8' }}
                              >
                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105"
                          style={{
                            background: 'linear-gradient(135deg, #0F4C81, #1E6BB8)',
                            boxShadow: '0 4px 15px rgba(15, 76, 129, 0.3)',
                          }}
                        >
                          Update Password
                        </button>
                      </form>
                    </div>

                    {/* Security Settings */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: '#0F172A' }}>
                        <Shield className="w-4 h-4" style={{ color: '#D4AF37' }} />
                        Additional Security
                      </h3>
                      {securitySettings.map((setting) => {
                        const Icon = setting.icon;
                        return (
                          <div
                            key={setting.id}
                            className="flex items-center justify-between p-4 rounded-xl"
                            style={{
                              background: '#F8FAFC',
                              border: '1px solid #E2E8F0',
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: 'rgba(212, 175, 55, 0.1)' }}
                              >
                                <Icon className="w-5 h-5" style={{ color: '#D4AF37' }} />
                              </div>
                              <div>
                                <p className="text-sm font-medium" style={{ color: '#0F172A' }}>
                                  {setting.title}
                                </p>
                                <p className="text-xs" style={{ color: '#64748B' }}>
                                  {setting.description}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={setting.action}
                              className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                                setting.enabled ? 'bg-[#D4AF37]' : 'bg-gray-300'
                              }`}
                            >
                              <div
                                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${
                                  setting.enabled ? 'right-0.5' : 'left-0.5'
                                }`}
                              />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Right Column - Security Quick Tips */}
                <motion.div variants={fadeUp}>
                  <div
                    className="rounded-2xl p-6"
                    style={{
                      background: 'white',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <h3
                      className="text-sm font-semibold mb-4"
                      style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
                    >
                      Security Tips
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                        <ShieldCheck className="w-4 h-4 mt-0.5" style={{ color: '#D4AF37' }} />
                        <div>
                          <p className="text-sm font-medium" style={{ color: '#0F172A' }}>Use Strong Passwords</p>
                          <p className="text-xs" style={{ color: '#64748B' }}>Use a mix of letters, numbers, and symbols</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                        <Fingerprint className="w-4 h-4 mt-0.5" style={{ color: '#D4AF37' }} />
                        <div>
                          <p className="text-sm font-medium" style={{ color: '#0F172A' }}>Enable 2FA</p>
                          <p className="text-xs" style={{ color: '#64748B' }}>Add an extra layer of security to your account</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                        <Clock className="w-4 h-4 mt-0.5" style={{ color: '#D4AF37' }} />
                        <div>
                          <p className="text-sm font-medium" style={{ color: '#0F172A' }}>Monitor Login Activity</p>
                          <p className="text-xs" style={{ color: '#64748B' }}>Review your login history regularly</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}

            {/* Login History Tab */}
            {activeTab === 'history' && (
              <motion.div variants={fadeUp} className="lg:col-span-3">
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: 'white',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2
                      className="text-lg font-bold"
                      style={{ fontFamily: "'Fraunces', serif", color: '#0F172A' }}
                    >
                      Login History
                    </h2>
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                      style={{ color: '#0F4C81' }}
                    >
                      <RefreshCw className="w-4 h-4" />
                      Refresh
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                          <th className="text-left text-xs font-medium pb-3" style={{ color: '#64748B' }}>Date & Time</th>
                          <th className="text-left text-xs font-medium pb-3" style={{ color: '#64748B' }}>Device</th>
                          <th className="text-left text-xs font-medium pb-3" style={{ color: '#64748B' }}>Location</th>
                          <th className="text-left text-xs font-medium pb-3" style={{ color: '#64748B' }}>IP Address</th>
                          <th className="text-left text-xs font-medium pb-3" style={{ color: '#64748B' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loginHistory.map((entry, index) => {
                          const StatusIcon = getStatusIcon(entry.status);
                          const statusColor = getStatusColor(entry.status);
                          return (
                            <tr
                              key={entry.id}
                              className="hover:bg-gray-50 transition-colors"
                              style={{ borderBottom: index < loginHistory.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                            >
                              <td className="py-3">
                                <div>
                                  <span className="text-sm font-medium" style={{ color: '#0F172A' }}>{entry.date}</span>
                                  <span className="text-xs block" style={{ color: '#94A3B8' }}>{entry.time}</span>
                                </div>
                              </td>
                              <td className="py-3">
                                <span className="text-sm" style={{ color: '#64748B' }}>{entry.device}</span>
                              </td>
                              <td className="py-3">
                                <span className="text-sm" style={{ color: '#64748B' }}>{entry.location}</span>
                              </td>
                              <td className="py-3">
                                <span className="text-sm font-mono" style={{ color: '#64748B' }}>{entry.ip}</span>
                              </td>
                              <td className="py-3">
                                <span
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                                  style={{
                                    background: `${statusColor}15`,
                                    color: statusColor,
                                  }}
                                >
                                  <StatusIcon className="w-3 h-3" />
                                  {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomerProfile;