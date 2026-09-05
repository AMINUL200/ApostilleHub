import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  DollarSign,
  Plus,
  Edit,
  Trash2,
  X,
  Check,
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Globe,
  MapPin,
  Truck,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Package,
  Hash,
  FileText,
  Clock,
  TrendingUp,
  User,
  Briefcase,
  Building2,
  Mail,
  Phone,
  ArrowLeft,
  Eye,
  EyeOff,
  Award,
  Star,
  Users,
  CreditCard,
  Timer,
  Layers,
} from 'lucide-react';
import { api } from '../../../services/app';
import { useAuthStore } from '../../../store/authStore';

// Button Components
const ButtonPrimary = ({ children, onClick, type = 'button', disabled = false, className = '' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    style={{
      background: 'linear-gradient(135deg, #0B1220, #1A2A4A)',
      boxShadow: '0 4px 15px rgba(11, 18, 32, 0.3)',
    }}
  >
    {children}
  </button>
);

const ButtonOutline = ({ children, onClick, type = 'button', disabled = false, className = '' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    style={{
      background: 'transparent',
      color: '#0B1220',
      border: '2px solid #0B1220',
    }}
  >
    {children}
  </button>
);

const ButtonSuccess = ({ children, onClick, type = 'button', disabled = false, className = '' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    style={{
      background: 'linear-gradient(135deg, #10B981, #059669)',
      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
    }}
  >
    {children}
  </button>
);

const ButtonDanger = ({ children, onClick, type = 'button', disabled = false, className = '' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    style={{
      background: 'linear-gradient(135deg, #EF4444, #DC2626)',
      boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
    }}
  >
    {children}
  </button>
);

const SuperAdminManageApostilleOfficerServicePrice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const storage_url = import.meta.env.VITE_API_STORAGE_URL;
  const { user } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [lawyer, setLawyer] = useState(null);
  const [pricings, setPricings] = useState([]);
  const [filteredPricings, setFilteredPricings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingPricing, setEditingPricing] = useState(null);
  const [selectedPricing, setSelectedPricing] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    lawyer_service_region_id: '',
    service_level: 'standard',
    fee: '',
    currency: 'AUD',
    estimated_days: '',
    status: 'active',
  });
  const [formErrors, setFormErrors] = useState({});
  const itemsPerPage = 5;

  // Service level options - Only Standard, Express, Urgent
  const serviceLevels = [
    { value: 'standard', label: 'Standard' },
    { value: 'express', label: 'Express' },
    { value: 'urgent', label: 'Urgent' },
  ];

  // Currencies
  const currencies = ['AUD', 'USD', 'EUR', 'GBP', 'CAD', 'NZD', 'JPY', 'CNY', 'INR', 'SGD', 'MYR', 'PHP', 'IDR', 'THB', 'VND'];

  // Fetch lawyer details and pricings on mount
  useEffect(() => {
    if (id) {
      fetchLawyerDetails();
      fetchPricings();
    }
  }, [id]);

  const fetchLawyerDetails = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/admin/lawyers/${id}`);
      if (response.data.success) {
        setLawyer(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching lawyer details:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to load lawyer details');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPricings = async () => {
    try {
      const response = await api.get('/admin/lawyer-service-pricings');
      if (response.data.success) {
        const data = response.data.data.data || response.data.data || [];
        // Filter pricings for this lawyer
         const lawyerPricings = data.filter(
        (pricing) =>
          Number(pricing.lawyer_service_region?.lawyer_profile_id) === Number(id)
      );
        console.log('Fetched pricings:', lawyerPricings);
        setPricings(lawyerPricings);
        setFilteredPricings(lawyerPricings);
      }
    } catch (error) {
      console.error('Error fetching pricings:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to load pricings');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.lawyer_service_region_id) errors.lawyer_service_region_id = 'Service region is required';
    if (!formData.service_level) errors.service_level = 'Service level is required';
    if (!formData.fee) errors.fee = 'Fee is required';
    if (formData.fee && isNaN(formData.fee)) errors.fee = 'Fee must be a valid number';
    if (formData.fee && parseFloat(formData.fee) < 0) errors.fee = 'Fee cannot be negative';
    if (!formData.estimated_days) errors.estimated_days = 'Estimated days is required';
    if (formData.estimated_days && isNaN(formData.estimated_days)) errors.estimated_days = 'Must be a valid number';
    if (formData.estimated_days && parseInt(formData.estimated_days) < 0) errors.estimated_days = 'Days cannot be negative';
    if (!formData.currency) errors.currency = 'Currency is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const payload = {
        lawyer_service_region_id: parseInt(formData.lawyer_service_region_id),
        service_level: formData.service_level,
        fee: parseFloat(formData.fee),
        currency: formData.currency,
        estimated_days: parseInt(formData.estimated_days),
        status: formData.status,
      };

      let response;
      if (editingPricing) {
        response = await api.put(`/admin/lawyer-service-pricings/${editingPricing.id}`, payload);
      } else {
        response = await api.post('/admin/lawyer-service-pricings', payload);
      }

      if (response.data.success || response.data) {
        setSuccessMessage(
          editingPricing 
            ? 'Pricing updated successfully!' 
            : 'Pricing created successfully!'
        );
        await fetchPricings();
        resetForm();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving pricing:', error);
      setErrorMessage(error.response?.data?.message || error.message || 'Failed to save pricing');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedPricing) return;

    setIsDeleting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.delete(`/admin/lawyer-service-pricings/${selectedPricing.id}`);
      
      if (response.data.success || response.status === 200) {
        setSuccessMessage('Pricing deleted successfully!');
        await fetchPricings();
        setShowDeleteModal(false);
        setSelectedPricing(null);
      }
    } catch (error) {
      console.error('Error deleting pricing:', error);
      setErrorMessage(error.response?.data?.message || error.message || 'Failed to delete pricing');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusToggle = async (pricing) => {
    const newStatus = pricing.status === 'active' ? 'inactive' : 'active';
    try {
      const payload = {
        lawyer_service_region_id: parseInt(pricing.lawyer_service_region_id),
        service_level: pricing.service_level,
        fee: parseFloat(pricing.fee),
        currency: pricing.currency,
        estimated_days: parseInt(pricing.estimated_days),
        status: newStatus,
      };
      
      const response = await api.put(`/admin/lawyer-service-pricings/${pricing.id}`, payload);
      
      if (response.data.success || response.data) {
        setSuccessMessage(`Pricing ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
        await fetchPricings();
      }
    } catch (error) {
      console.error('Error toggling status:', error);
      setErrorMessage(error.response?.data?.message || error.message || 'Failed to update status');
    }
  };

  const handleEdit = (pricing) => {
    setEditingPricing(pricing);
    setFormData({
      lawyer_service_region_id: pricing.lawyer_service_region_id || '',
      service_level: pricing.service_level || 'standard',
      fee: pricing.fee || '',
      currency: pricing.currency || 'AUD',
      estimated_days: pricing.estimated_days || '',
      status: pricing.status || 'active',
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingPricing(null);
    setFormData({
      lawyer_service_region_id: '',
      service_level: 'standard',
      fee: '',
      currency: 'AUD',
      estimated_days: '',
      status: 'active',
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      lawyer_service_region_id: '',
      service_level: 'standard',
      fee: '',
      currency: 'AUD',
      estimated_days: '',
      status: 'active',
    });
    setEditingPricing(null);
    setFormErrors({});
  };

  const handleDeleteClick = (pricing) => {
    setSelectedPricing(pricing);
    setShowDeleteModal(true);
  };

  // Filter and pagination
  const filteredData = filteredPricings.filter((pricing) => {
    const matchesSearch = 
      (pricing.lawyer_service_region?.service?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pricing.lawyer_service_region?.country?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pricing.lawyer_service_region?.region?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pricing.service_level || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pricing.currency || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || (pricing.status || '').toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status) => {
    const config = {
      active: { label: 'Active', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
      inactive: { label: 'Inactive', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
    };
    const statusConfig = config[status] || config.inactive;
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

  const getServiceLevelBadge = (level) => {
    const config = {
      standard: { label: 'Standard', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
      express: { label: 'Express', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
      urgent: { label: 'Urgent', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
    };
    const levelConfig = config[level] || { label: level || 'Unknown', color: '#64748B', bg: 'rgba(100, 116, 139, 0.1)' };
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
        style={{
          background: levelConfig.bg,
          color: levelConfig.color,
        }}
      >
        {levelConfig.label}
      </span>
    );
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
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

  // Get user role for navigation
  const getBasePath = () => {
    const role = user?.role || user?.user_type || user?.type || 'super-admin';
    const roleMap = {
      'super_admin': 'super-admin',
      'superadmin': 'super-admin',
      'super-admin': 'super-admin',
      'organization_admin': 'organization-admin',
      'organizationadmin': 'organization-admin',
      'organization-admin': 'organization-admin',
      'org_admin': 'organization-admin',
      'orgadmin': 'organization-admin',
    };
    return roleMap[role] || 'super-admin';
  };

  const handleBack = () => {
    const basePath = getBasePath();
    navigate(`/${basePath}/apostille-officers`);
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBack}
                className="p-2.5 rounded-xl transition-colors hover:bg-gray-100"
                style={{ color: '#64748B' }}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1
                  className="text-2xl lg:text-3xl font-bold"
                  style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                >
                  Service Pricing
                </h1>
                <p className="text-sm" style={{ color: '#64748B' }}>
                  {lawyer?.professional_name || 'Loading...'} - Manage service pricing
                </p>
              </div>
            </div>
            <ButtonPrimary onClick={handleAdd}>
              <Plus className="w-4 h-4" />
              <span>Add Pricing</span>
            </ButtonPrimary>
          </div>
        </motion.div>

        {/* Lawyer Info Card */}
        {lawyer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl p-6 mb-6"
            style={{ border: '1px solid #E2E8F0' }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #0F4C81, #1E6BB8)',
                }}
              >
                {lawyer.profile_photo ? (
                  <img
                    src={`${storage_url}${lawyer.profile_photo}`}
                    alt={lawyer.professional_name}
                    className="w-full h-full rounded-2xl object-cover"
                  />
                ) : (
                  getInitials(lawyer.professional_name || lawyer.user?.name)
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold" style={{ color: '#0B1220' }}>
                  {lawyer.professional_name || lawyer.user?.name}
                </h3>
                <div className="flex flex-wrap items-center gap-4 mt-1">
                  <span className="text-sm" style={{ color: '#64748B' }}>
                    <Mail className="w-3.5 h-3.5 inline mr-1" />
                    {lawyer.user?.email}
                  </span>
                  <span className="text-sm" style={{ color: '#64748B' }}>
                    <Phone className="w-3.5 h-3.5 inline mr-1" />
                    {lawyer.user?.phone || 'N/A'}
                  </span>
                  <span className="text-sm" style={{ color: '#64748B' }}>
                    <Building2 className="w-3.5 h-3.5 inline mr-1" />
                    {lawyer.law_firm_name || 'Independent'}
                  </span>
                  <span className="text-sm" style={{ color: '#64748B' }}>
                    <Globe className="w-3.5 h-3.5 inline mr-1" />
                    {lawyer.country?.name || 'N/A'}
                  </span>
                  <span className="text-sm" style={{ color: '#64748B' }}>
                    <Award className="w-3.5 h-3.5 inline mr-1" />
                    {lawyer.years_of_experience || 0} years
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ 
                  background: lawyer.approval_status === 'approved' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: lawyer.approval_status === 'approved' ? '#10B981' : '#EF4444'
                }}>
                  {lawyer.approval_status?.toUpperCase() || 'PENDING'}
                </span>
                <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ 
                  background: lawyer.is_available ? 'rgba(16, 185, 129, 0.1)' : 'rgba(148, 163, 184, 0.1)',
                  color: lawyer.is_available ? '#10B981' : '#94A3B8'
                }}>
                  {lawyer.is_available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
          </motion.div>
        )}

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

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl p-4 mb-6"
          style={{ border: '1px solid #E2E8F0' }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
              <input
                type="text"
                placeholder="Search by service, country, region, or service level..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all text-sm"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              >
                <option value="All">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button
                onClick={() => {
                  setSearchTerm('');
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

        {/* Pricings Table */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-white rounded-2xl overflow-hidden"
          style={{ border: '1px solid #E2E8F0' }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-[#0B1220] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm" style={{ color: '#64748B' }}>Loading pricings...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                      <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                        Service / Region
                      </th>
                      <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                        Service Level
                      </th>
                      <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                        Fee
                      </th>
                      <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                        Est. Days
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
                      {paginatedData.length > 0 ? (
                        paginatedData.map((pricing, index) => (
                          <motion.tr
                            key={pricing.id}
                            variants={fadeUp}
                            className="hover:bg-gray-50 transition-colors"
                            style={{ borderBottom: index < paginatedData.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                          >
                            <td className="py-3.5 px-4">
                              <div>
                                <p className="text-sm font-medium" style={{ color: '#0B1220' }}>
                                  {pricing.lawyer_service_region?.service?.name || 'N/A'}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs" style={{ color: '#64748B' }}>
                                    <MapPin className="w-3 h-3 inline mr-0.5" />
                                    {pricing.lawyer_service_region?.country?.name || 'N/A'}
                                  </span>
                                  <span className="text-xs" style={{ color: '#94A3B8' }}>•</span>
                                  <span className="text-xs" style={{ color: '#64748B' }}>
                                    {pricing.lawyer_service_region?.region?.name || 'All Regions'}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              {getServiceLevelBadge(pricing.service_level)}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-sm font-semibold" style={{ color: '#0B1220' }}>
                                {pricing.currency} {parseFloat(pricing.fee).toFixed(2)}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" style={{ color: '#64748B' }} />
                                <span className="text-sm" style={{ color: '#64748B' }}>
                                  {pricing.estimated_days} days
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              {getStatusBadge(pricing.status)}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleStatusToggle(pricing)}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all hover:scale-105 ${
                                    pricing.status === 'active' 
                                      ? 'hover:bg-red-50 hover:text-red-500' 
                                      : 'hover:bg-green-50 hover:text-green-500'
                                  }`}
                                  style={{ 
                                    color: pricing.status === 'active' ? '#EF4444' : '#10B981',
                                    background: pricing.status === 'active' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)',
                                  }}
                                >
                                  {pricing.status === 'active' ? 'Deactivate' : 'Activate'}
                                </button>
                                <button
                                  onClick={() => handleEdit(pricing)}
                                  className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                                  style={{ color: '#64748B' }}
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(pricing)}
                                  className="p-1.5 rounded-lg transition-colors hover:bg-red-50 hover:text-red-500"
                                  style={{ color: '#64748B' }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6">
                            <div className="text-center py-12">
                              <DollarSign className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                              <h3 className="text-lg font-semibold mb-1" style={{ color: '#0B1220' }}>
                                No pricing found
                              </h3>
                              <p className="text-sm" style={{ color: '#64748B' }}>
                                {searchTerm || statusFilter !== 'All'
                                  ? 'Try adjusting your filters'
                                  : 'Click "Add Pricing" to create one'}
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
                  <span className="text-sm" style={{ color: '#64748B' }}>
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                    {Math.min(currentPage * itemsPerPage, filteredData.length)} of{' '}
                    {filteredData.length} pricings
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
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          page === currentPage
                            ? 'text-white'
                            : 'hover:bg-gray-100'
                        }`}
                        style={{
                          background: page === currentPage
                            ? 'linear-gradient(135deg, #0B1220, #1A2A4A)'
                            : 'transparent',
                          color: page === currentPage ? 'white' : '#64748B',
                        }}
                      >
                        {page}
                      </button>
                    ))}
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
            </>
          )}
        </motion.div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setShowModal(false);
              resetForm();
            }}
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
                    {editingPricing ? 'Edit Pricing' : 'Add Pricing'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Service Region <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <select
                          name="lawyer_service_region_id"
                          value={formData.lawyer_service_region_id}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all appearance-none ${
                            formErrors.lawyer_service_region_id ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        >
                          <option value="">Select service region</option>
                          {lawyer?.service_regions?.map((region) => (
                            <option key={region.id} value={region.id}>
                              {region.service?.name} - {region.country?.name} ({region.region?.name || 'All Regions'})
                            </option>
                          ))}
                        </select>
                      </div>
                      {formErrors.lawyer_service_region_id && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.lawyer_service_region_id}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Service Level <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Layers className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <select
                          name="service_level"
                          value={formData.service_level}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all appearance-none ${
                            formErrors.service_level ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        >
                          {serviceLevels.map((level) => (
                            <option key={level.value} value={level.value}>
                              {level.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      {formErrors.service_level && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.service_level}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Fee <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <input
                          type="number"
                          name="fee"
                          value={formData.fee}
                          onChange={handleChange}
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all ${
                            formErrors.fee ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      {formErrors.fee && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.fee}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Currency <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Hash className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <select
                          name="currency"
                          value={formData.currency}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all appearance-none ${
                            formErrors.currency ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        >
                          {currencies.map((curr) => (
                            <option key={curr} value={curr}>{curr}</option>
                          ))}
                        </select>
                      </div>
                      {formErrors.currency && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.currency}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Estimated Days <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <input
                          type="number"
                          name="estimated_days"
                          value={formData.estimated_days}
                          onChange={handleChange}
                          placeholder="e.g., 5"
                          min="1"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all ${
                            formErrors.estimated_days ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      {formErrors.estimated_days && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.estimated_days}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all appearance-none"
                        style={{ color: '#0B1220' }}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                    <ButtonPrimary type="submit" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>{editingPricing ? 'Updating...' : 'Creating...'}</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{editingPricing ? 'Update' : 'Create'}</span>
                        </>
                      )}
                    </ButtonPrimary>
                    <ButtonOutline
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </ButtonOutline>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedPricing && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                    <AlertCircle className="w-6 h-6" style={{ color: '#EF4444' }} />
                  </div>
                  <h2
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                  >
                    Delete Pricing
                  </h2>
                </div>

                <p className="text-sm mb-6" style={{ color: '#64748B' }}>
                  Are you sure you want to delete the pricing for{' '}
                  <span className="font-semibold" style={{ color: '#0B1220' }}>
                    {selectedPricing.lawyer_service_region?.service?.name || 'N/A'}
                  </span>{' '}
                  ({selectedPricing.service_level}) -{' '}
                  <span className="font-semibold" style={{ color: '#0B1220' }}>
                    {selectedPricing.currency} {parseFloat(selectedPricing.fee).toFixed(2)}
                  </span>
                  ? This action cannot be undone.
                </p>

                <div className="flex gap-3">
                  <ButtonOutline
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 justify-center"
                  >
                    Cancel
                  </ButtonOutline>
                  <ButtonDanger
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex-1 justify-center"
                  >
                    {isDeleting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </>
                    )}
                  </ButtonDanger>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SuperAdminManageApostilleOfficerServicePrice;