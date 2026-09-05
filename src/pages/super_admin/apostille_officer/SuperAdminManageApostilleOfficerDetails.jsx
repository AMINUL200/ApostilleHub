import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Globe,
  FileCheck,
  Clock,
  CheckCircle2,
  XCircle,
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
  Trash2,
  Edit2,
  PlusCircle,
  MinusCircle,
  File,
  FilePlus,
  FileX,
  CheckCircle,
  AlertTriangle,
  FileImage,
  FileArchive,
  FileIcon,
  Crown,
  Shield,
  Star,
  Calendar,
  Link2,
  ExternalLink as ExternalLinkIcon,
} from 'lucide-react';
import { api } from '../../../services/app';
import { useAuthStore } from '../../../store/authStore';

const SuperAdminManageApostilleOfficerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const storage_url = import.meta.env.VITE_API_STORAGE_URL;

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [officer, setOfficer] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showDocumentRejectModal, setShowDocumentRejectModal] = useState(false);
  const [documentRejectReason, setDocumentRejectReason] = useState('');

  // Fetch officer details
  useEffect(() => {
    fetchOfficerDetails();
  }, [id]);

  const fetchOfficerDetails = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await api.get(`/admin/lawyers/${id}`);
      if (response.data.success) {
        setOfficer(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching officer details:', error);
      setErrorMessage(error.message || 'Failed to load officer details');
    } finally {
      setIsLoading(false);
    }
  };

  // Review - No body required, just POST
  const handleReview = async () => {
    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await api.post(`/admin/lawyers/${id}/review`);
      if (response.data.success) {
        setSuccessMessage('Officer moved to under review successfully!');
        await fetchOfficerDetails();
      }
    } catch (error) {
      console.error('Error reviewing officer:', error);
      setErrorMessage(error.message || 'Failed to review officer');
    } finally {
      setIsSaving(false);
    }
  };

  const handleApprove = async () => {
    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await api.post(`/admin/lawyers/${id}/approve`);
      if (response.data.success) {
        setSuccessMessage('Officer approved successfully!');
        await fetchOfficerDetails();
      }
    } catch (error) {
      console.error('Error approving officer:', error);
      setErrorMessage(error.message || 'Failed to approve officer');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReject = async () => {
    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await api.post(`/admin/lawyers/${id}/reject`, {
        reason: rejectionReason,
      });
      if (response.data.success) {
        setSuccessMessage('Officer rejected successfully!');
        await fetchOfficerDetails();
        setShowRejectModal(false);
        setRejectionReason('');
      }
    } catch (error) {
      console.error('Error rejecting officer:', error);
      setErrorMessage(error.message || 'Failed to reject officer');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleAvailability = async () => {
    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await api.post(`/admin/lawyers/${id}/toggle-availability`);
      if (response.data.success) {
        setSuccessMessage(`Officer ${officer.is_available ? 'unavailable' : 'available'} successfully!`);
        await fetchOfficerDetails();
      }
    } catch (error) {
      console.error('Error toggling availability:', error);
      setErrorMessage(error.message || 'Failed to toggle availability');
    } finally {
      setIsSaving(false);
    }
  };

  // Document Actions
  const handleViewDocument = async (doc) => {
    setSelectedDocument(doc);
    try {
      // Open document in new tab
      const response = await api.get(`/admin/lawyers/${id}/documents/${doc.id}/view`, {
        responseType: 'blob',
      });
      
      // Create a blob URL and open in new tab
      const blob = new Blob([response.data], { type: doc.mime_type || 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error viewing document:', error);
      setErrorMessage('Failed to load document. Please try again.');
    }
  };

  const handleVerifyDocument = async (doc) => {
    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await api.post(`/admin/lawyers/${id}/documents/${doc.id}/verify`);
      if (response.data.success) {
        setSuccessMessage('Document verified successfully!');
        await fetchOfficerDetails();
      }
    } catch (error) {
      console.error('Error verifying document:', error);
      setErrorMessage(error.message || 'Failed to verify document');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRejectDocument = async () => {
    if (!selectedDocument) return;
    
    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await api.post(`/admin/lawyers/${id}/documents/${selectedDocument.id}/reject`, {
        rejection_reason: documentRejectReason,
      });
      if (response.data.success) {
        setSuccessMessage('Document rejected successfully!');
        await fetchOfficerDetails();
        setShowDocumentRejectModal(false);
        setDocumentRejectReason('');
        setSelectedDocument(null);
      }
    } catch (error) {
      console.error('Error rejecting document:', error);
      setErrorMessage(error.message || 'Failed to reject document');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRejectDocumentClick = (doc) => {
    setSelectedDocument(doc);
    setDocumentRejectReason('');
    setShowDocumentRejectModal(true);
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: { label: 'Pending', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', icon: Clock },
      under_review: { label: 'Under Review', color: '#0F4C81', bg: 'rgba(15, 76, 129, 0.1)', icon: RefreshCw },
      approved: { label: 'Approved', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', icon: CheckCircle2 },
      rejected: { label: 'Rejected', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', icon: XCircle },
    };
    const statusConfig = config[status] || config.pending;
    const Icon = statusConfig.icon;
    return (
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
        style={{
          background: statusConfig.bg,
          color: statusConfig.color,
        }}
      >
        <Icon className="w-4 h-4" />
        {statusConfig.label}
      </span>
    );
  };

  const getDocumentStatusBadge = (status) => {
    const config = {
      pending: { label: 'Pending', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
      verified: { label: 'Verified', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
      rejected: { label: 'Rejected', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
    };
    const statusConfig = config[status] || config.pending;
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
        style={{
          background: statusConfig.bg,
          color: statusConfig.color,
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusConfig.color }} />
        {statusConfig.label}
      </span>
    );
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getDocumentTypeLabel = (type) => {
    const types = {
      bar_certificate: 'Bar Certificate',
      practising_certificate: 'Practising Certificate',
      professional_license: 'Professional License',
      government_id: 'Government ID',
      passport: 'Passport',
      proof_of_address: 'Proof of Address',
      law_degree: 'Law Degree',
      law_firm_registration: 'Law Firm Registration',
      other: 'Other',
    };
    return types[type] || type;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8FAFC' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0B1220] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[#64748B]">Loading officer details...</p>
        </div>
      </div>
    );
  }

  if (!officer) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8FAFC' }}>
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-[#EF4444]" />
          <h3 className="text-lg font-semibold mb-1 text-[#0B1220]">Officer not found</h3>
          <p className="text-sm text-[#64748B]">The officer you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/super-admin/lawyers')}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #0B1220, #1A2A4A)',
              color: 'white',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </button>
        </div>
      </div>
    );
  }

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
        {/* Back Button & Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/super-admin/lawyers')}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              style={{ color: '#64748B' }}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#0B1220]">
                Officer Details
              </h1>
              <p className="text-sm text-[#64748B]">
                {officer.professional_name || officer.user?.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {officer.approval_status === 'pending' && (
              <>
                <button
                  onClick={handleReview}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #0F4C81, #1E6BB8)',
                    color: 'white',
                  }}
                >
                  <RefreshCw className="w-4 h-4" />
                  Review
                </button>
                <button
                  onClick={handleApprove}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    color: 'white',
                  }}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve
                </button>
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                    color: 'white',
                  }}
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </>
            )}
            {officer.approval_status === 'under_review' && (
              <>
                <button
                  onClick={handleApprove}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    color: 'white',
                  }}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve
                </button>
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                    color: 'white',
                  }}
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </>
            )}
            <button
              onClick={handleToggleAvailability}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: officer.is_available
                  ? 'linear-gradient(135deg, #EF4444, #DC2626)'
                  : 'linear-gradient(135deg, #10B981, #059669)',
                color: 'white',
              }}
            >
              {officer.is_available ? 'Mark Unavailable' : 'Mark Available'}
            </button>
          </div>
        </motion.div>

        {/* Messages */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl flex items-start gap-3"
            style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}
          >
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
            <div>
              <p className="text-sm font-medium" style={{ color: '#10B981' }}>
                {successMessage}
              </p>
            </div>
            <button onClick={() => setSuccessMessage('')} className="ml-auto">
              <X className="w-4 h-4" style={{ color: '#94A3B8' }} />
            </button>
          </motion.div>
        )}

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl flex items-start gap-3"
            style={{
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
            }}
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#EF4444' }} />
            <div>
              <p className="text-sm font-medium" style={{ color: '#EF4444' }}>
                {errorMessage}
              </p>
            </div>
            <button onClick={() => setErrorMessage('')} className="ml-auto">
              <X className="w-4 h-4" style={{ color: '#94A3B8' }} />
            </button>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 text-center"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <div className="relative inline-block">
                <div
                  className="w-28 h-28 rounded-full mx-auto flex items-center justify-center text-4xl font-bold text-white overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #0F4C81, #1E6BB8)',
                  }}
                >
                  {officer.profile_photo ? (
                    <img
                      src={`${storage_url}${officer.profile_photo}`}
                      alt={officer.professional_name || officer.user?.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    getInitials(officer.professional_name || officer.user?.name)
                  )}
                </div>
              </div>

              <h2 className="text-xl font-bold mt-4 text-[#0B1220]">
                {officer.professional_name || officer.user?.name}
              </h2>
              <p className="text-sm text-[#0F4C81] font-medium">
                {officer.bar_registration_number || 'No Registration'}
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                {getStatusBadge(officer.approval_status)}
              </div>

              <div className="mt-4 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                <div className="flex items-center justify-center gap-6">
                  <div>
                    <p className="text-lg font-bold text-[#0B1220]">
                      {officer.years_of_experience || 0}
                    </p>
                    <p className="text-xs text-[#64748B]">Years Exp</p>
                  </div>
                  <div className="w-px h-10" style={{ background: '#E2E8F0' }} />
                  <div>
                    <p className="text-lg font-bold text-[#0F4C81]">
                      {officer.documents?.length || 0}
                    </p>
                    <p className="text-xs text-[#64748B]">Documents</p>
                  </div>
                  <div className="w-px h-10" style={{ background: '#E2E8F0' }} />
                  <div>
                    <p className="text-lg font-bold text-[#D4AF37]">
                      {officer.service_regions?.length || 0}
                    </p>
                    <p className="text-xs text-[#64748B]">Services</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-left">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-[#94A3B8]" />
                  <span className="text-[#64748B]">{officer.user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-[#94A3B8]" />
                  <span className="text-[#64748B]">{officer.user?.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-[#94A3B8]" />
                  <span className="text-[#64748B]">
                    {officer.city}, {officer.country?.name || ''}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Building2 className="w-4 h-4 text-[#94A3B8]" />
                  <span className="text-[#64748B]">
                    {officer.law_firm_name || 'Independent'}
                  </span>
                </div>
                {officer.website && (
                  <div className="flex items-center gap-3 text-sm">
                    <Link2 className="w-4 h-4 text-[#94A3B8]" />
                    <a
                      href={officer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0F4C81] hover:underline"
                    >
                      {officer.website}
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#64748B]">Status</span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      officer.is_available
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${officer.is_available ? 'bg-green-700' : 'bg-gray-500'}`} />
                    {officer.is_available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-[#64748B]">Joined</span>
                  <span className="text-[#0B1220]">{formatDate(officer.created_at)}</span>
                </div>
                {officer.approved_at && (
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-[#64748B]">Approved</span>
                    <span className="text-[#0B1220]">{formatDate(officer.approved_at)}</span>
                  </div>
                )}
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
                Professional Bio
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                {officer.professional_bio || 'No bio provided.'}
              </p>
            </motion.div>

            {/* Professional Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="bg-white rounded-2xl p-6"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <h3 className="text-sm font-semibold mb-4 text-[#0B1220] flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#D4AF37]" />
                Professional Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-[#94A3B8]">Professional Name</p>
                  <p className="text-sm text-[#0B1220]">{officer.professional_name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#94A3B8]">Bar Registration</p>
                  <p className="text-sm text-[#0B1220]">{officer.bar_registration_number || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#94A3B8]">Bar Council</p>
                  <p className="text-sm text-[#0B1220]">{officer.bar_council_name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#94A3B8]">Law Firm</p>
                  <p className="text-sm text-[#0B1220]">{officer.law_firm_name || 'Independent'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#94A3B8]">Years of Experience</p>
                  <p className="text-sm text-[#0B1220]">{officer.years_of_experience || 0} years</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#94A3B8]">Country</p>
                  <p className="text-sm text-[#0B1220]">{officer.country?.name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#94A3B8]">Region</p>
                  <p className="text-sm text-[#0B1220]">{officer.region?.name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#94A3B8]">City</p>
                  <p className="text-sm text-[#0B1220]">{officer.city || 'N/A'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs font-medium text-[#94A3B8]">Address</p>
                  <p className="text-sm text-[#0B1220]">
                    {officer.address_line_1 || ''}
                    {officer.address_line_2 ? `, ${officer.address_line_2}` : ''}
                    {officer.postal_code ? `, ${officer.postal_code}` : ''}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Service Regions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl p-6"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <h3 className="text-sm font-semibold mb-4 text-[#0B1220] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#D4AF37]" />
                Service Regions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {officer.service_regions?.length > 0 ? (
                  officer.service_regions.map((sr) => (
                    <div
                      key={sr.id}
                      className="p-3 rounded-xl"
                      style={{ background: '#F8FAFC' }}
                    >
                      <p className="text-sm font-medium text-[#0B1220]">
                        {sr.service?.name || 'N/A'}
                      </p>
                      <p className="text-xs text-[#64748B]">
                        {sr.country?.name || 'N/A'}
                        {sr.region?.name ? ` - ${sr.region.name}` : ''}
                      </p>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium mt-1 ${
                          sr.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        <span className={`w-1 h-1 rounded-full ${sr.status === 'active' ? 'bg-green-700' : 'bg-gray-500'}`} />
                        {sr.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[#94A3B8] col-span-2 text-center py-4">
                    No service regions added
                  </p>
                )}
              </div>
            </motion.div>

            {/* Documents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="bg-white rounded-2xl p-6"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <h3 className="text-sm font-semibold mb-4 text-[#0B1220] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#D4AF37]" />
                Documents ({officer.documents?.length || 0})
              </h3>
              <div className="space-y-3">
                {officer.documents?.length > 0 ? (
                  officer.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 rounded-xl"
                      style={{ background: '#F8FAFC' }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(239, 68, 68, 0.08)' }}
                        >
                          <FileIcon className="w-5 h-5" style={{ color: '#EF4444' }} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate text-[#0B1220]">
                            {getDocumentTypeLabel(doc.document_type)}
                          </p>
                          <p className="text-xs text-[#64748B]">
                            {doc.file_name || 'No file name'} • {formatFileSize(doc.file_size)}
                          </p>
                          {doc.document_number && (
                            <p className="text-xs text-[#94A3B8]">
                              #{doc.document_number}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getDocumentStatusBadge(doc.verification_status)}
                        <button
                          onClick={() => handleViewDocument(doc)}
                          className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                          style={{ color: '#0F4C81' }}
                          title="View Document"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {doc.verification_status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleVerifyDocument(doc)}
                              className="p-1.5 rounded-lg hover:bg-green-50 transition-colors"
                              style={{ color: '#10B981' }}
                              title="Verify Document"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleRejectDocumentClick(doc)}
                              className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                              style={{ color: '#EF4444' }}
                              title="Reject Document"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[#94A3B8] text-center py-4">
                    No documents uploaded
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      <AnimatePresence>
        {showRejectModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowRejectModal(false)}
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
                    Reject Officer
                  </h2>
                  <button
                    onClick={() => setShowRejectModal(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Officer</p>
                    <p className="text-sm font-medium text-[#0B1220]">
                      {officer.professional_name || officer.user?.name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                      Rejection Reason <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Provide reason for rejection..."
                      rows="4"
                      className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none"
                      style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <button
                    onClick={() => setShowRejectModal(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: '#64748B' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={isSaving}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                      color: 'white',
                    }}
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Rejecting...</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>Reject Officer</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Document Reject Modal */}
      <AnimatePresence>
        {showDocumentRejectModal && selectedDocument && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDocumentRejectModal(false)}
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
                    Reject Document
                  </h2>
                  <button
                    onClick={() => setShowDocumentRejectModal(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl" style={{ background: '#F8FAFC' }}>
                    <p className="text-xs text-[#94A3B8]">Document</p>
                    <p className="text-sm font-medium text-[#0B1220]">
                      {getDocumentTypeLabel(selectedDocument.document_type)}
                    </p>
                    <p className="text-xs text-[#64748B]">
                      {selectedDocument.file_name || 'No file name'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                      Rejection Reason <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={documentRejectReason}
                      onChange={(e) => setDocumentRejectReason(e.target.value)}
                      placeholder="Provide reason for document rejection..."
                      rows="4"
                      className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none"
                      style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <button
                    onClick={() => setShowDocumentRejectModal(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: '#64748B' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRejectDocument}
                    disabled={isSaving}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                      color: 'white',
                    }}
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Rejecting...</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>Reject Document</span>
                      </>
                    )}
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

export default SuperAdminManageApostilleOfficerDetails;