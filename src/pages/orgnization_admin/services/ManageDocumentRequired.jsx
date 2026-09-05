import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  X,
  Check,
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  SortAsc,
  SortDesc,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  Tag,
  Hash,
  Calendar,
  Globe,
  MapPin,
  Briefcase,
  Shield,
  Clock,
  Users,
  Award,
  Building2,
  FolderTree,
  Layers,
  FileCheck,
  ArrowUpDown,
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

const ManageDocumentRequired = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const [requirements, setRequirements] = useState([]);
  const [filteredRequirements, setFilteredRequirements] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
    from: 0,
    to: 0,
  });
  const [services, setServices] = useState([]);
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [formData, setFormData] = useState({
    service_id: '',
    country_id: '',
    region_id: '',
    document_type: '',
    title: '',
    description: '',
    is_required: true,
    sort_order: 1,
    status: 'active',
  });
  const [formErrors, setFormErrors] = useState({});

  const { user } = useAuthStore();

  // Fetch data on mount
  useEffect(() => {
    fetchRequirements();
    fetchServices();
    fetchCountries();
  }, []);

  // Apply filters
  useEffect(() => {
    applyFilters();
  }, [requirements, searchTerm, statusFilter, serviceFilter, sortField, sortDirection]);

  // Fetch regions when country changes in modal
  useEffect(() => {
    if (formData.country_id) {
      fetchRegionsByCountry(formData.country_id);
    } else {
      setRegions([]);
    }
  }, [formData.country_id]);

  const fetchRequirements = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const params = new URLSearchParams({
        page: currentPage,
        per_page: perPage,
      });

      const response = await api.get(`/admin/service-document-requirements?${params}`);
      if (response.data.success) {
        const data = response.data.data;
        setRequirements(data.data || []);
        setFilteredRequirements(data.data || []);
        setPagination({
          current_page: data.current_page || 1,
          last_page: data.last_page || 1,
          per_page: data.per_page || 15,
          total: data.total || 0,
          from: data.from || 0,
          to: data.to || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching requirements:', error);
      setErrorMessage(error.message || 'Failed to load requirements');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await api.get('/admin/services?per_page=100');
      if (response.data.success) {
        setServices(response.data.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await api.get('/admin/countries?per_page=100');
      if (response.data.success) {
        setCountries(response.data.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchRegionsByCountry = async (countryId) => {
    try {
      const response = await api.get(`/admin/regions?country_id=${countryId}&per_page=100`);
      if (response.data.success) {
        setRegions(response.data.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching regions:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...requirements];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(r =>
        r.title?.toLowerCase().includes(term) ||
        r.document_type?.toLowerCase().includes(term) ||
        r.description?.toLowerCase().includes(term) ||
        r.service?.name?.toLowerCase().includes(term) ||
        r.country?.name?.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(r => r.status === statusFilter.toLowerCase());
    }

    if (serviceFilter !== 'All') {
      filtered = filtered.filter(r => String(r.service_id) === serviceFilter);
    }

    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'created_at') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredRequirements(filtered);
    setCurrentPage(1);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    // If country changes, reset region
    if (name === 'country_id') {
      setSelectedCountryId(val);
      setFormData(prev => ({
        ...prev,
        country_id: val,
        region_id: '',
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: val,
      }));
    }
    
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.service_id) errors.service_id = 'Service is required';
    if (!formData.document_type) errors.document_type = 'Document type is required';
    if (!formData.title) errors.title = 'Title is required';
    if (!formData.description) errors.description = 'Description is required';
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
        service_id: parseInt(formData.service_id),
        country_id: formData.country_id ? parseInt(formData.country_id) : null,
        region_id: formData.region_id ? parseInt(formData.region_id) : null,
        document_type: formData.document_type,
        title: formData.title,
        description: formData.description,
        is_required: formData.is_required,
        sort_order: parseInt(formData.sort_order) || 1,
        status: formData.status,
      };

      let response;
      if (editingItem) {
        response = await api.put(`/admin/service-document-requirements/${editingItem.id}`, payload);
      } else {
        response = await api.post('/admin/service-document-requirements', payload);
      }

      if (response.data.success) {
        setSuccessMessage(
          editingItem
            ? 'Document requirement updated successfully!'
            : 'Document requirement created successfully!'
        );
        await fetchRequirements();
        resetForm();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving requirement:', error);
      setErrorMessage(error.message || 'Failed to save requirement');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;

    setIsDeleting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.delete(`/admin/service-document-requirements/${selectedItem.id}`);
      
      if (response.data.success || response.status === 200) {
        setSuccessMessage('Document requirement deleted successfully!');
        await fetchRequirements();
        setShowDeleteModal(false);
        setSelectedItem(null);
      }
    } catch (error) {
      console.error('Error deleting requirement:', error);
      setErrorMessage(error.message || 'Failed to delete requirement');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusToggle = async (item) => {
    setIsStatusUpdating(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const newStatus = item.status === 'active' ? 'inactive' : 'active';
      const response = await api.patch(`/admin/service-document-requirements/${item.id}/status`, {
        status: newStatus,
      });

      if (response.data.success) {
        setSuccessMessage(`Status updated to ${newStatus}!`);
        await fetchRequirements();
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setErrorMessage(error.message || 'Failed to update status');
    } finally {
      setIsStatusUpdating(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setSelectedCountryId(item.country_id || '');
    setFormData({
      service_id: String(item.service_id || ''),
      country_id: item.country_id || '',
      region_id: item.region_id || '',
      document_type: item.document_type || '',
      title: item.title || '',
      description: item.description || '',
      is_required: item.is_required === true || item.is_required === 1,
      sort_order: parseInt(item.sort_order) || 1,
      status: item.status || 'active',
    });
    if (item.country_id) {
      fetchRegionsByCountry(item.country_id);
    }
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setSelectedCountryId('');
    setRegions([]);
    setFormData({
      service_id: '',
      country_id: '',
      region_id: '',
      document_type: '',
      title: '',
      description: '',
      is_required: true,
      sort_order: 1,
      status: 'active',
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      service_id: '',
      country_id: '',
      region_id: '',
      document_type: '',
      title: '',
      description: '',
      is_required: true,
      sort_order: 1,
      status: 'active',
    });
    setSelectedCountryId('');
    setRegions([]);
    setEditingItem(null);
    setFormErrors({});
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

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

  const getRequiredBadge = (isRequired) => {
    const config = isRequired
      ? { label: 'Required', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' }
      : { label: 'Optional', color: '#94A3B8', bg: 'rgba(148, 163, 184, 0.1)' };
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
        style={{
          background: config.bg,
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
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl" style={{ background: 'rgba(11, 18, 32, 0.1)' }}>
              <FileText className="w-6 h-6" style={{ color: '#0B1220' }} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#0B1220]">
                Document Requirements
              </h1>
              <p className="text-sm text-[#64748B]">
                Manage service document requirements
              </p>
            </div>
          </div>
          <ButtonPrimary onClick={handleAdd}>
            <Plus className="w-4 h-4" />
            <span>Add Requirement</span>
          </ButtonPrimary>
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
                placeholder="Search by title, document type, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              >
                <option value="All">All Services</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <select
                value={perPage}
                onChange={handlePerPageChange}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              >
                <option value="10">10 per page</option>
                <option value="15">15 per page</option>
                <option value="25">25 per page</option>
                <option value="50">50 per page</option>
                <option value="100">100 per page</option>
              </select>

              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('All');
                  setServiceFilter('All');
                  setPerPage(15);
                  setCurrentPage(1);
                }}
                className="px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                style={{ color: '#64748B', border: '1px solid #E2E8F0' }}
              >
                Reset
              </button>
            </div>
          </div>
        </motion.div>

        {/* Requirements Table */}
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
                <p className="text-sm text-[#64748B]">Loading requirements...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                      <th
                        className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0B1220] transition-colors"
                        onClick={() => handleSort('title')}
                        style={{ color: '#64748B' }}
                      >
                        <div className="flex items-center gap-1">
                          Title
                          {sortField === 'title' && (
                            sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th
                        className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0B1220] transition-colors"
                        onClick={() => handleSort('document_type')}
                        style={{ color: '#64748B' }}
                      >
                        <div className="flex items-center gap-1">
                          Document Type
                          {sortField === 'document_type' && (
                            sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                        Service
                      </th>
                      <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                        Country
                      </th>
                      <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                        Region
                      </th>
                      <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                        Required
                      </th>
                      <th
                        className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0B1220] transition-colors"
                        onClick={() => handleSort('status')}
                        style={{ color: '#64748B' }}
                      >
                        <div className="flex items-center gap-1">
                          Status
                          {sortField === 'status' && (
                            sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th className="text-right text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filteredRequirements.length > 0 ? (
                        filteredRequirements.map((item, index) => (
                          <motion.tr
                            key={item.id}
                            variants={fadeUp}
                            className="hover:bg-gray-50 transition-colors"
                            style={{ borderBottom: index < filteredRequirements.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                          >
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(11, 18, 32, 0.08)' }}>
                                  <FileCheck className="w-5 h-5" style={{ color: '#0B1220' }} />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-[#0B1220]">
                                    {item.title}
                                  </p>
                                  <p className="text-xs text-[#64748B]">
                                    Sort: {item.sort_order}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-sm font-mono text-[#0F4C81]">
                                {item.document_type}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-sm text-[#64748B]">
                                {item.service?.name || 'N/A'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-sm text-[#64748B]">
                                {item.country?.name || 'Global'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-sm text-[#64748B]">
                                {item.region?.name || 'N/A'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              {getRequiredBadge(item.is_required)}
                            </td>
                            <td className="py-3.5 px-4">
                              {getStatusBadge(item.status)}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => handleStatusToggle(item)}
                                  className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                                  style={{ color: item.status === 'active' ? '#EF4444' : '#10B981' }}
                                  title={item.status === 'active' ? 'Deactivate' : 'Activate'}
                                >
                                  {item.status === 'active' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                                <button
                                  onClick={() => handleEdit(item)}
                                  className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                                  style={{ color: '#64748B' }}
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(item)}
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
                          <td colSpan="8">
                            <div className="text-center py-12">
                              <FileText className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                              <h3 className="text-lg font-semibold mb-1 text-[#0B1220]">
                                No requirements found
                              </h3>
                              <p className="text-sm text-[#64748B]">
                                {searchTerm || statusFilter !== 'All' || serviceFilter !== 'All'
                                  ? 'Try adjusting your filters'
                                  : 'Click "Add Requirement" to create one'}
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
              {pagination.total > 0 && (
                <div className="flex items-center justify-between px-4 py-3 border-t flex-wrap gap-4" style={{ borderColor: '#E2E8F0' }}>
                  <span className="text-sm text-[#64748B]">
                    Showing {pagination.from} to {pagination.to} of {pagination.total} requirements
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
                    {Array.from({ length: Math.min(pagination.last_page, 5) }, (_, i) => {
                      let pageNum;
                      if (pagination.last_page <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= pagination.last_page - 2) {
                        pageNum = pagination.last_page - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                            pageNum === currentPage
                              ? 'text-white'
                              : 'hover:bg-gray-100'
                          }`}
                          style={{
                            background: pageNum === currentPage
                              ? 'linear-gradient(135deg, #0B1220, #1A2A4A)'
                              : 'transparent',
                            color: pageNum === currentPage ? 'white' : '#64748B',
                          }}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage(Math.min(currentPage + 1, pagination.last_page))}
                      disabled={currentPage === pagination.last_page}
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
                  <h2 className="text-xl font-bold text-[#0B1220]">
                    {editingItem ? 'Edit Document Requirement' : 'Add Document Requirement'}
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
                      <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                        Service <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                        <select
                          name="service_id"
                          value={formData.service_id}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all appearance-none ${
                            formErrors.service_id ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        >
                          <option value="">Select Service</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {formErrors.service_id && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.service_id}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                        Document Type <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                        <input
                          type="text"
                          name="document_type"
                          value={formData.document_type}
                          onChange={handleChange}
                          placeholder="e.g., passport, address_proof"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all ${
                            formErrors.document_type ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      {formErrors.document_type && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.document_type}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Hash className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="e.g., Valid Passport"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all ${
                            formErrors.title ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      {formErrors.title && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.title}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 absolute left-3 top-3 text-[#94A3B8]" />
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Describe the document requirement..."
                          rows="3"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none ${
                            formErrors.description ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      {formErrors.description && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.description}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                          Country
                        </label>
                        <div className="relative">
                          <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                          <select
                            name="country_id"
                            value={formData.country_id}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all appearance-none"
                            style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                          >
                            <option value="">Global (All Countries)</option>
                            {countries.map((country) => (
                              <option key={country.id} value={country.id}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                          Region
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                          <select
                            name="region_id"
                            value={formData.region_id}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all appearance-none"
                            style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                            disabled={!formData.country_id}
                          >
                            <option value="">
                              {!formData.country_id ? 'Select Country First' : 'All Regions'}
                            </option>
                            {regions.map((region) => (
                              <option key={region.id} value={region.id}>
                                {region.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                          Sort Order
                        </label>
                        <input
                          type="number"
                          name="sort_order"
                          value={formData.sort_order}
                          onChange={handleChange}
                          min="1"
                          className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                          style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                          Status
                        </label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all appearance-none"
                          style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="is_required"
                        checked={formData.is_required}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 text-[#0B1220] focus:ring-[#0B1220]"
                      />
                      <label className="text-sm text-[#0B1220]">
                        This document is required
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                    <ButtonPrimary type="submit" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>{editingItem ? 'Updating...' : 'Creating...'}</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{editingItem ? 'Update' : 'Create'}</span>
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
        {showDeleteModal && selectedItem && (
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
                  <h2 className="text-xl font-bold text-[#0B1220]">
                    Delete Requirement
                  </h2>
                </div>

                <p className="text-sm mb-6 text-[#64748B]">
                  Are you sure you want to delete <span className="font-semibold text-[#0B1220]">
                    "{selectedItem.title}"
                  </span>? This action cannot be undone.
                </p>

                <div className="flex gap-3">
                  <ButtonOutline
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 justify-center"
                  >
                    Cancel
                  </ButtonOutline>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                      boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
                    }}
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

export default ManageDocumentRequired;