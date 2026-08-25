import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
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
  FolderTree,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  GripVertical,
  Layers,
  FolderOpen,
  FileCheck,
  Shield,
  Clock,
  Users,
  Award,
  Building2,
  Globe,
  MapPin,
  Calendar,
  DollarSign,
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

const OrgService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
    from: 0,
    to: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    service_category_id: '',
    name: '',
    slug: '',
    description: '',
    requires_original_document: false,
    max_documents: 1,
    status: 'active',
  });
  const [formErrors, setFormErrors] = useState({});

  const { user } = useAuthStore();

  // Fetch services and categories on mount and when filters change
  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, [currentPage, perPage, sortField, sortDirection, searchTerm, statusFilter, categoryFilter]);

  const fetchServices = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const params = new URLSearchParams({
        page: currentPage,
        per_page: perPage,
        sort: sortField,
        direction: sortDirection,
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter !== 'All' && { status: statusFilter.toLowerCase() }),
        ...(categoryFilter !== 'All' && { category_id: categoryFilter }),
      });

      const response = await api.get(`/admin/services?${params}`);
      if (response.data.success) {
        setServices(response.data.data.data || []);
        setPagination({
          current_page: response.data.data.current_page || 1,
          last_page: response.data.data.last_page || 1,
          per_page: response.data.data.per_page || 20,
          total: response.data.data.total || 0,
          from: response.data.data.from || 0,
          to: response.data.data.to || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setErrorMessage(error.message || 'Failed to load services');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/admin/service-categories?per_page=100');
      if (response.data.success) {
        setCategories(response.data.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
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
    if (!formData.service_category_id) errors.service_category_id = 'Category is required';
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.slug) errors.slug = 'Slug is required';
    if (!formData.description) errors.description = 'Description is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Generate slug from name
  const generateSlug = (name) => {
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
      slug: generateSlug(name),
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
        service_category_id: parseInt(formData.service_category_id),
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        requires_original_document: formData.requires_original_document,
        max_documents: parseInt(formData.max_documents) || 1,
        status: formData.status,
      };

      let response;
      if (editingService) {
        response = await api.put(`/admin/services/${editingService.id}`, payload);
      } else {
        response = await api.post('/admin/services', payload);
      }

      if (response.data.success) {
        setSuccessMessage(
          editingService 
            ? 'Service updated successfully!' 
            : 'Service created successfully!'
        );
        await fetchServices();
        resetForm();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving service:', error);
      setErrorMessage(error.message || 'Failed to save service');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedService) return;

    setIsDeleting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.delete(`/admin/services/${selectedService.id}`);
      
      if (response.data.success || response.status === 200) {
        setSuccessMessage('Service deleted successfully!');
        await fetchServices();
        setShowDeleteModal(false);
        setSelectedService(null);
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      setErrorMessage(error.message || 'Failed to delete service');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      service_category_id: service.service_category_id || '',
      name: service.name || '',
      slug: service.slug || '',
      description: service.description || '',
      requires_original_document: service.requires_original_document || false,
      max_documents: service.max_documents || 1,
      status: service.status || 'active',
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingService(null);
    setFormData({
      service_category_id: '',
      name: '',
      slug: '',
      description: '',
      requires_original_document: false,
      max_documents: 1,
      status: 'active',
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      service_category_id: '',
      name: '',
      slug: '',
      description: '',
      requires_original_document: false,
      max_documents: 1,
      status: 'active',
    });
    setEditingService(null);
    setFormErrors({});
  };

  const handleDeleteClick = (service) => {
    setSelectedService(service);
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

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'N/A';
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
              <Package className="w-6 h-6" style={{ color: '#0B1220' }} />
            </div>
            <div>
              <h1
                className="text-2xl lg:text-3xl font-bold"
                style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
              >
                Services
              </h1>
              <p className="text-sm" style={{ color: '#64748B' }}>
                Manage your organization's services
              </p>
            </div>
          </div>
          <ButtonPrimary onClick={handleAdd}>
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
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
                placeholder="Search by name, slug, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all text-sm"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

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
                  setCategoryFilter('All');
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

        {/* Services Table */}
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
                <p className="text-sm" style={{ color: '#64748B' }}>Loading services...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="max-w-[400px] md:max-w-[700px] lg:max-w-[1140px] overflow-x-auto">
              <table className="w-full min-w-[700px]">
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
                        onClick={() => handleSort('slug')}
                        style={{ color: '#64748B' }}
                      >
                        <div className="flex items-center gap-1">
                          Slug
                          {sortField === 'slug' && (
                            sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                        Category
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
                      {services.length > 0 ? (
                        services.map((service, index) => (
                          <motion.tr
                            key={service.id}
                            variants={fadeUp}
                            className="hover:bg-gray-50 transition-colors"
                            style={{ borderBottom: index < services.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                          >
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(11, 18, 32, 0.08)' }}>
                                  <Package className="w-5 h-5" style={{ color: '#0B1220' }} />
                                </div>
                                <div>
                                  <span className="text-sm font-medium" style={{ color: '#0B1220' }}>
                                    {service.name}
                                  </span>
                                  {service.requires_original_document && (
                                    <span className="block text-xs" style={{ color: '#D4AF37' }}>
                                      <Shield className="w-3 h-3 inline mr-0.5" />
                                      Original required
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-sm font-mono" style={{ color: '#64748B' }}>
                                {service.slug}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-sm" style={{ color: '#64748B' }}>
                                {service.category?.name || getCategoryName(service.service_category_id)}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-sm" style={{ color: '#64748B' }}>
                                {service.description?.length > 50 
                                  ? service.description.substring(0, 50) + '...' 
                                  : service.description}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              {getStatusBadge(service.status)}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEdit(service)}
                                  className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                                  style={{ color: '#64748B' }}
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(service)}
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
                              <Package className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                              <h3 className="text-lg font-semibold mb-1" style={{ color: '#0B1220' }}>
                                No services found
                              </h3>
                              <p className="text-sm" style={{ color: '#64748B' }}>
                                {searchTerm || statusFilter !== 'All' || categoryFilter !== 'All'
                                  ? 'Try adjusting your filters'
                                  : 'Click "Add Service" to create one'}
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
                  <span className="text-sm" style={{ color: '#64748B' }}>
                    Showing {pagination.from} to {pagination.to} of {pagination.total} services
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
                  <h2
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                  >
                    {editingService ? 'Edit Service' : 'Add Service'}
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
                        Category <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FolderTree className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <select
                          name="service_category_id"
                          value={formData.service_category_id}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all appearance-none ${
                            formErrors.service_category_id ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {formErrors.service_category_id && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.service_category_id}</p>
                      )}
                    </div>

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
                          placeholder="e.g., Standard UK Apostille"
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
                        Slug <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Hash className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <input
                          type="text"
                          name="slug"
                          value={formData.slug}
                          onChange={handleChange}
                          placeholder="e.g., standard-uk-apostille"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all ${
                            formErrors.slug ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      {formErrors.slug && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.slug}</p>
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
                          placeholder="Describe the service..."
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

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                          Max Documents
                        </label>
                        <input
                          type="number"
                          name="max_documents"
                          value={formData.max_documents}
                          onChange={handleChange}
                          min="1"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all"
                          style={{ color: '#0B1220' }}
                        />
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

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="requires_original_document"
                        checked={formData.requires_original_document}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 text-[#0B1220] focus:ring-[#0B1220]"
                      />
                      <label className="text-sm" style={{ color: '#0B1220' }}>
                        Requires original document
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                    <ButtonPrimary type="submit" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>{editingService ? 'Updating...' : 'Creating...'}</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{editingService ? 'Update' : 'Create'}</span>
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
        {showDeleteModal && selectedService && (
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
                    Delete Service
                  </h2>
                </div>

                <p className="text-sm mb-6" style={{ color: '#64748B' }}>
                  Are you sure you want to delete <span className="font-semibold" style={{ color: '#0B1220' }}>"{selectedService.name}"</span>? 
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

export default OrgService;