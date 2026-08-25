import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Plus,
  Edit,
  Trash2,
  X,
  Check,
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Tag,
  Hash,
  FileText,
  ChevronLeft,
  ChevronRight,
  SortAsc,
  SortDesc,
  Calendar,
  Zap,
  Timer,
  Award,
  Shield,
  TrendingUp,
  Users,
  Package,
  DollarSign,
  ArrowUpDown,
  GripVertical,
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

const OrgProcessingOption = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [allOptions, setAllOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingOption, setEditingOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    turnaround_days: 5,
    description: '',
    status: 'active',
  });
  const [formErrors, setFormErrors] = useState({});

  const { user } = useAuthStore();

  // Fetch processing options on mount
  useEffect(() => {
    fetchProcessingOptions();
  }, []);

  // Apply filters, search, and sorting whenever dependencies change
  useEffect(() => {
    applyFiltersAndSort();
  }, [allOptions, searchTerm, statusFilter, sortField, sortDirection]);

  const fetchProcessingOptions = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await api.get('/admin/processing-options');
      if (response.data.success) {
        // Handle both paginated and non-paginated responses
        let options = [];
        if (Array.isArray(response.data.data)) {
          options = response.data.data;
        } else if (response.data.data && Array.isArray(response.data.data.data)) {
          options = response.data.data.data;
        } else if (response.data.data && typeof response.data.data === 'object') {
          // If it's a paginated response with data property
          if (response.data.data.data && Array.isArray(response.data.data.data)) {
            options = response.data.data.data;
          } else {
            options = [response.data.data];
          }
        }
        setAllOptions(options);
        setFilteredOptions(options);
      }
    } catch (error) {
      console.error('Error fetching processing options:', error);
      setErrorMessage(error.message || 'Failed to load processing options');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...allOptions];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(option =>
        option.name.toLowerCase().includes(term) ||
        option.code.toLowerCase().includes(term) ||
        (option.description && option.description.toLowerCase().includes(term))
      );
    }

    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(option => option.status === statusFilter.toLowerCase());
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (sortField === 'turnaround_days') {
        aVal = parseInt(aVal) || 0;
        bVal = parseInt(bVal) || 0;
      } else if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredOptions(filtered);
    setCurrentPage(1);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: val,
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
    if (formData.turnaround_days === '' || formData.turnaround_days === null) {
      errors.turnaround_days = 'Turnaround days is required';
    }
    if (!formData.description) errors.description = 'Description is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Generate code from name
  const generateCode = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name,
      code: generateCode(name),
    }));
    if (formErrors.name) {
      setFormErrors((prev) => ({
        ...prev,
        name: '',
      }));
    }
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
        turnaround_days: parseInt(formData.turnaround_days) || 0,
        description: formData.description,
        status: formData.status,
      };

      let response;
      if (editingOption) {
        response = await api.put(`/admin/processing-options/${editingOption.id}`, payload);
      } else {
        response = await api.post('/admin/processing-options', payload);
      }

      if (response.data.success) {
        setSuccessMessage(
          editingOption 
            ? 'Processing option updated successfully!' 
            : 'Processing option created successfully!'
        );
        await fetchProcessingOptions();
        resetForm();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving processing option:', error);
      setErrorMessage(error.message || 'Failed to save processing option');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedOption) return;

    setIsDeleting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.delete(`/admin/processing-options/${selectedOption.id}`);
      
      if (response.data.success || response.status === 200) {
        setSuccessMessage('Processing option deleted successfully!');
        await fetchProcessingOptions();
        setShowDeleteModal(false);
        setSelectedOption(null);
      }
    } catch (error) {
      console.error('Error deleting processing option:', error);
      setErrorMessage(error.message || 'Failed to delete processing option');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (option) => {
    setEditingOption(option);
    setFormData({
      name: option.name || '',
      code: option.code || '',
      turnaround_days: parseInt(option.turnaround_days) || 0,
      description: option.description || '',
      status: option.status || 'active',
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingOption(null);
    setFormData({
      name: '',
      code: '',
      turnaround_days: 5,
      description: '',
      status: 'active',
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      turnaround_days: 5,
      description: '',
      status: 'active',
    });
    setEditingOption(null);
    setFormErrors({});
  };

  const handleDeleteClick = (option) => {
    setSelectedOption(option);
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

  const getTurnaroundLabel = (days) => {
    const numDays = parseInt(days) || 0;
    if (numDays === 0) {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: '#D4AF37' }}>
          <Zap className="w-3.5 h-3.5" />
          Same Day
        </span>
      );
    } else if (numDays <= 2) {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: '#0F4C81' }}>
          <Timer className="w-3.5 h-3.5" />
          {numDays} Day{numDays > 1 ? 's' : ''}
        </span>
      );
    } else if (numDays <= 5) {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: '#10B981' }}>
          <Calendar className="w-3.5 h-3.5" />
          {numDays} Days
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: '#64748B' }}>
          <Clock className="w-3.5 h-3.5" />
          {numDays} Days
        </span>
      );
    }
  };

  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return filteredOptions.slice(startIndex, endIndex);
  };

  const currentData = getCurrentPageData();
  const totalPages = Math.ceil(filteredOptions.length / perPage);
  const totalItems = filteredOptions.length;

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
              <Clock className="w-6 h-6" style={{ color: '#0B1220' }} />
            </div>
            <div>
              <h1
                className="text-2xl lg:text-3xl font-bold"
                style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
              >
                Processing Options
              </h1>
              <p className="text-sm" style={{ color: '#64748B' }}>
                Manage your organization's processing speed options
              </p>
            </div>
          </div>
          <ButtonPrimary onClick={handleAdd}>
            <Plus className="w-4 h-4" />
            <span>Add Processing Option</span>
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
            <div className="flex items-center gap-3 flex-wrap">
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

              <select
                value={perPage}
                onChange={handlePerPageChange}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all text-sm"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              >
                <option value="10">10 per page</option>
                <option value="20">20 per page</option>
                <option value="50">50 per page</option>
                <option value="100">100 per page</option>
              </select>

              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('All');
                  setPerPage(20);
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

        {/* Processing Options Table */}
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
                <p className="text-sm" style={{ color: '#64748B' }}>Loading processing options...</p>
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
                        onClick={() => handleSort('name')}
                        style={{ color: '#64748B' }}
                      >
                        <div className="flex items-center gap-1">
                          Name
                          {sortField === 'name' && (
                            sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th
                        className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0B1220] transition-colors"
                        onClick={() => handleSort('code')}
                        style={{ color: '#64748B' }}
                      >
                        <div className="flex items-center gap-1">
                          Code
                          {sortField === 'code' && (
                            sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th
                        className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0B1220] transition-colors"
                        onClick={() => handleSort('turnaround_days')}
                        style={{ color: '#64748B' }}
                      >
                        <div className="flex items-center gap-1">
                          Turnaround
                          {sortField === 'turnaround_days' && (
                            sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                        Description
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
                      {currentData.length > 0 ? (
                        currentData.map((option, index) => (
                          <motion.tr
                            key={option.id}
                            variants={fadeUp}
                            className="hover:bg-gray-50 transition-colors"
                            style={{ borderBottom: index < currentData.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                          >
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(11, 18, 32, 0.08)' }}>
                                  <Clock className="w-5 h-5" style={{ color: '#0B1220' }} />
                                </div>
                                <span className="text-sm font-medium" style={{ color: '#0B1220' }}>
                                  {option.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-sm font-mono" style={{ color: '#64748B' }}>
                                {option.code}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              {getTurnaroundLabel(option.turnaround_days)}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-sm" style={{ color: '#64748B' }}>
                                {option.description?.length > 50 
                                  ? option.description.substring(0, 50) + '...' 
                                  : option.description}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              {getStatusBadge(option.status)}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEdit(option)}
                                  className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                                  style={{ color: '#64748B' }}
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(option)}
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
                              <Clock className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                              <h3 className="text-lg font-semibold mb-1" style={{ color: '#0B1220' }}>
                                No processing options found
                              </h3>
                              <p className="text-sm" style={{ color: '#64748B' }}>
                                {searchTerm || statusFilter !== 'All'
                                  ? 'Try adjusting your filters'
                                  : 'Click "Add Processing Option" to create one'}
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
              {totalItems > 0 && (
                <div className="flex items-center justify-between px-4 py-3 border-t flex-wrap gap-4" style={{ borderColor: '#E2E8F0' }}>
                  <span className="text-sm" style={{ color: '#64748B' }}>
                    Showing {((currentPage - 1) * perPage) + 1} to{' '}
                    {Math.min(currentPage * perPage, totalItems)} of {totalItems} processing options
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
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
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
                    {editingOption ? 'Edit Processing Option' : 'Add Processing Option'}
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
                          onChange={handleNameChange}
                          placeholder="e.g., Standard Processing"
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
                          placeholder="e.g., standard"
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
                        Turnaround Days <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <input
                          type="number"
                          name="turnaround_days"
                          value={formData.turnaround_days}
                          onChange={handleChange}
                          min="0"
                          placeholder="5"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all ${
                            formErrors.turnaround_days ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      {formErrors.turnaround_days && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.turnaround_days}</p>
                      )}
                      <p className="mt-1 text-xs" style={{ color: '#94A3B8' }}>
                        0 = Same day processing
                      </p>
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
                          placeholder="Describe the processing option..."
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
                          <span>{editingOption ? 'Updating...' : 'Creating...'}</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{editingOption ? 'Update' : 'Create'}</span>
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
        {showDeleteModal && selectedOption && (
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
                    Delete Processing Option
                  </h2>
                </div>

                <p className="text-sm mb-6" style={{ color: '#64748B' }}>
                  Are you sure you want to delete <span className="font-semibold" style={{ color: '#0B1220' }}>"{selectedOption.name}"</span>? 
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

export default OrgProcessingOption;