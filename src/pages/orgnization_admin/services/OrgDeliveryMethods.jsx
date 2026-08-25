import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Truck,
  Plus,
  Edit,
  Trash2,
  X,
  Check,
  Search,
  Filter,
  ChevronDown,
  MoreHorizontal,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Clock,
  Globe,
  MapPin,
  TrendingUp,
  Users,
  Award,
  Shield,
  Eye,
  EyeOff,
  ExternalLink,
  Copy,
  Download,
  Printer,
  Mail,
  Phone,
  Building2,
  Tag,
  Hash,
  FileText,
  Calendar,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
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

const OrgDeliveryMethods = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    status: 'active',
  });
  const [formErrors, setFormErrors] = useState({});
  const itemsPerPage = 5;

  const { user } = useAuthStore();

  // Fetch delivery methods on mount
  useEffect(() => {
    fetchDeliveryMethods();
  }, []);

  const fetchDeliveryMethods = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await api.get('/admin/delivery-methods');
      if (response.data.success) {
        setDeliveryMethods(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching delivery methods:', error);
      setErrorMessage(error.message || 'Failed to load delivery methods');
    } finally {
      setIsLoading(false);
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
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.code) errors.code = 'Code is required';
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
        name: formData.name,
        code: formData.code,
        description: formData.description,
        status: formData.status,
      };

      let response;
      if (editingMethod) {
        // Update
        response = await api.put(`/admin/delivery-methods/${editingMethod.id}`, payload);
      } else {
        // Create
        response = await api.post('/admin/delivery-methods', payload);
      }

      if (response.data.success || response.data) {
        setSuccessMessage(
          editingMethod 
            ? 'Delivery method updated successfully!' 
            : 'Delivery method created successfully!'
        );
        await fetchDeliveryMethods();
        resetForm();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving delivery method:', error);
      setErrorMessage(error.message || 'Failed to save delivery method');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedMethod) return;

    setIsDeleting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.delete(`/admin/delivery-methods/${selectedMethod.id}`);
      
      if (response.data.success || response.status === 200) {
        setSuccessMessage('Delivery method deleted successfully!');
        await fetchDeliveryMethods();
        setShowDeleteModal(false);
        setSelectedMethod(null);
      }
    } catch (error) {
      console.error('Error deleting delivery method:', error);
      setErrorMessage(error.message || 'Failed to delete delivery method');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (method) => {
    setEditingMethod(method);
    setFormData({
      name: method.name || '',
      code: method.code || '',
      description: method.description || '',
      status: method.status || 'active',
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingMethod(null);
    setFormData({
      name: '',
      code: '',
      description: '',
      status: 'active',
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      description: '',
      status: 'active',
    });
    setEditingMethod(null);
    setFormErrors({});
  };

  const handleDeleteClick = (method) => {
    setSelectedMethod(method);
    setShowDeleteModal(true);
  };

  // Filter and pagination
  const filteredMethods = deliveryMethods.filter((method) => {
    const matchesSearch = method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          method.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          method.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || method.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredMethods.length / itemsPerPage);
  const paginatedMethods = filteredMethods.slice(
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
            <div className="p-2.5 rounded-xl" style={{ background: 'rgba(11, 18, 32, 0.1)' }}>
              <Truck className="w-6 h-6" style={{ color: '#0B1220' }} />
            </div>
            <div>
              <h1
                className="text-2xl lg:text-3xl font-bold"
                style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
              >
                Delivery Methods
              </h1>
              <p className="text-sm" style={{ color: '#64748B' }}>
                Manage your organization's delivery options
              </p>
            </div>
          </div>
          <ButtonPrimary onClick={handleAdd}>
            <Plus className="w-4 h-4" />
            <span>Add Delivery Method</span>
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
                placeholder="Search by name, code, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              />
            </div>
            <div className="flex items-center gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all text-sm"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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

        {/* Delivery Methods Table */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-white rounded-2xl overflow-hidden"
          style={{ border: '1px solid #E2E8F0' }}
        >
          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-[#0B1220] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm" style={{ color: '#64748B' }}>Loading delivery methods...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                      <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                        Name
                      </th>
                      <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                        Code
                      </th>
                      <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                        Description
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
                      {paginatedMethods.length > 0 ? (
                        paginatedMethods.map((method, index) => (
                          <motion.tr
                            key={method.id}
                            variants={fadeUp}
                            className="hover:bg-gray-50 transition-colors"
                            style={{ borderBottom: index < paginatedMethods.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                          >
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(11, 18, 32, 0.08)' }}>
                                  <Truck className="w-5 h-5" style={{ color: '#0B1220' }} />
                                </div>
                                <span className="text-sm font-medium" style={{ color: '#0B1220' }}>
                                  {method.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-sm font-mono" style={{ color: '#64748B' }}>
                                {method.code}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-sm" style={{ color: '#64748B' }}>
                                {method.description}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              {getStatusBadge(method.status)}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEdit(method)}
                                  className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                                  style={{ color: '#64748B' }}
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(method)}
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
                          <td colSpan="5">
                            <div className="text-center py-12">
                              <Truck className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                              <h3 className="text-lg font-semibold mb-1" style={{ color: '#0B1220' }}>
                                No delivery methods found
                              </h3>
                              <p className="text-sm" style={{ color: '#64748B' }}>
                                {searchTerm || statusFilter !== 'All' 
                                  ? 'Try adjusting your filters' 
                                  : 'Click "Add Delivery Method" to create one'}
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
                    {Math.min(currentPage * itemsPerPage, filteredMethods.length)} of{' '}
                    {filteredMethods.length} methods
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
                    {editingMethod ? 'Edit Delivery Method' : 'Add Delivery Method'}
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
                        Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g., UK Courier Delivery"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all ${
                            formErrors.name ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      {formErrors.name && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Code <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Hash className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <input
                          type="text"
                          name="code"
                          value={formData.code}
                          onChange={handleChange}
                          placeholder="e.g., uk-courier"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all ${
                            formErrors.code ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      {formErrors.code && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.code}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Description <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 absolute left-3 top-3" style={{ color: '#94A3B8' }} />
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Describe the delivery method..."
                          rows="3"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all resize-none ${
                            formErrors.description ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      {formErrors.description && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.description}</p>
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
                          <span>{editingMethod ? 'Updating...' : 'Creating...'}</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{editingMethod ? 'Update' : 'Create'}</span>
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
        {showDeleteModal && selectedMethod && (
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
                    Delete Delivery Method
                  </h2>
                </div>

                <p className="text-sm mb-6" style={{ color: '#64748B' }}>
                  Are you sure you want to delete <span className="font-semibold" style={{ color: '#0B1220' }}>"{selectedMethod.name}"</span>? 
                  This action cannot be undone.
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

export default OrgDeliveryMethods;