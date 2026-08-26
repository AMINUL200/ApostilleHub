import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
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
  Calendar,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  Layers,
  Archive,
  Bookmark,
  TrendingUp,
  Users,
  Award,
  Shield,
  Clock,
  MessageCircle,
  FileText,
  Tag,
  Hash,
  FolderTree,
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

const SuperAdminFaq = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
    question: '',
    answer: '',
    status: true,
  });
  const [formErrors, setFormErrors] = useState({});

  const { user } = useAuthStore();

  // Fetch FAQs on mount
  useEffect(() => {
    fetchFaqs();
  }, []);

  // Apply filters, search, and sorting
  useEffect(() => {
    applyFiltersAndSort();
  }, [faqs, searchTerm, categoryFilter, statusFilter, sortField, sortDirection]);

  const fetchFaqs = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await api.get('/super-admin/faqs');
      if (response.data.success) {
        let data = [];
        if (Array.isArray(response.data.data)) {
          data = response.data.data;
        } else if (response.data.data && Array.isArray(response.data.data.data)) {
          data = response.data.data.data;
        }
        setFaqs(data);
        setFilteredFaqs(data);
        
        // Extract unique categories for filter
        const uniqueCategories = [...new Set(data.map(faq => faq.category))].filter(Boolean);
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      setErrorMessage(error.message || 'Failed to load FAQs');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...faqs];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(term) ||
        faq.answer.toLowerCase().includes(term) ||
        faq.category.toLowerCase().includes(term)
      );
    }

    // Category filter
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(faq => faq.category === categoryFilter);
    }

    // Status filter
    if (statusFilter !== 'All') {
      const isActive = statusFilter === 'Active';
      filtered = filtered.filter(faq => faq.status === isActive);
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (sortField === 'created_at') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else if (sortField === 'status') {
        aVal = a.status ? 1 : 0;
        bVal = b.status ? 1 : 0;
      } else if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredFaqs(filtered);
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
    if (!formData.category.trim()) errors.category = 'Category is required';
    if (!formData.question.trim()) errors.question = 'Question is required';
    if (!formData.answer.trim()) errors.answer = 'Answer is required';
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
        category: formData.category.trim(),
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        status: formData.status,
      };

      let response;
      if (editingFaq) {
        response = await api.put(`/super-admin/faqs/${editingFaq.id}`, payload);
      } else {
        response = await api.post('/super-admin/faqs', payload);
      }

      if (response.data.success) {
        setSuccessMessage(
          editingFaq 
            ? 'FAQ updated successfully!' 
            : 'FAQ created successfully!'
        );
        await fetchFaqs();
        resetForm();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
      setErrorMessage(error.message || 'Failed to save FAQ');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedFaq) return;

    setIsDeleting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.delete(`/super-admin/faqs/${selectedFaq.id}`);
      
      if (response.data.success || response.status === 200) {
        setSuccessMessage('FAQ deleted successfully!');
        await fetchFaqs();
        setShowDeleteModal(false);
        setSelectedFaq(null);
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      setErrorMessage(error.message || 'Failed to delete FAQ');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setFormData({
      category: faq.category || '',
      question: faq.question || '',
      answer: faq.answer || '',
      status: faq.status === true || faq.status === 1,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingFaq(null);
    setFormData({
      category: '',
      question: '',
      answer: '',
      status: true,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      category: '',
      question: '',
      answer: '',
      status: true,
    });
    setEditingFaq(null);
    setFormErrors({});
  };

  const handleDeleteClick = (faq) => {
    setSelectedFaq(faq);
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
    const isActive = status === true || status === 1;
    const config = isActive 
      ? { label: 'Active', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' }
      : { label: 'Inactive', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' };
    
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

  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return filteredFaqs.slice(startIndex, endIndex);
  };

  const currentData = getCurrentPageData();
  const totalPages = Math.ceil(filteredFaqs.length / perPage);
  const totalItems = filteredFaqs.length;

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
              <HelpCircle className="w-6 h-6" style={{ color: '#0B1220' }} />
            </div>
            <div>
              <h1
                className="text-2xl lg:text-3xl font-bold"
                style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
              >
                FAQ Management
              </h1>
              <p className="text-sm" style={{ color: '#64748B' }}>
                Manage frequently asked questions
              </p>
            </div>
          </div>
          <ButtonPrimary onClick={handleAdd}>
            <Plus className="w-4 h-4" />
            <span>Add FAQ</span>
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
                placeholder="Search by question, answer, or category..."
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
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
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
                  setCategoryFilter('All');
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

        {/* FAQs Table */}
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
                <p className="text-sm" style={{ color: '#64748B' }}>Loading FAQs...</p>
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
                        onClick={() => handleSort('question')}
                        style={{ color: '#64748B' }}
                      >
                        <div className="flex items-center gap-1">
                          Question
                          {sortField === 'question' && (
                            sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th
                        className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0B1220] transition-colors"
                        onClick={() => handleSort('category')}
                        style={{ color: '#64748B' }}
                      >
                        <div className="flex items-center gap-1">
                          Category
                          {sortField === 'category' && (
                            sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                        Answer
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
                        currentData.map((faq, index) => (
                          <motion.tr
                            key={faq.id}
                            variants={fadeUp}
                            className="hover:bg-gray-50 transition-colors"
                            style={{ borderBottom: index < currentData.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                          >
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(11, 18, 32, 0.08)' }}>
                                  <MessageCircle className="w-5 h-5" style={{ color: '#0B1220' }} />
                                </div>
                                <span className="text-sm font-medium" style={{ color: '#0B1220' }}>
                                  {faq.question.length > 60 ? faq.question.substring(0, 60) + '...' : faq.question}
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                                style={{
                                  background: 'rgba(11, 18, 32, 0.08)',
                                  color: '#0B1220',
                                }}
                              >
                                <FolderTree className="w-3 h-3" />
                                {faq.category}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-sm" style={{ color: '#64748B' }}>
                                {faq.answer.length > 80 ? faq.answer.substring(0, 80) + '...' : faq.answer}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              {getStatusBadge(faq.status)}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEdit(faq)}
                                  className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                                  style={{ color: '#64748B' }}
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(faq)}
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
                              <HelpCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                              <h3 className="text-lg font-semibold mb-1" style={{ color: '#0B1220' }}>
                                No FAQs found
                              </h3>
                              <p className="text-sm" style={{ color: '#64748B' }}>
                                {searchTerm || categoryFilter !== 'All' || statusFilter !== 'All'
                                  ? 'Try adjusting your filters'
                                  : 'Click "Add FAQ" to create one'}
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
                    {Math.min(currentPage * perPage, totalItems)} of {totalItems} FAQs
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
                    {editingFaq ? 'Edit FAQ' : 'Add FAQ'}
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
                        <input
                          type="text"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          placeholder="e.g., General, Apostille, Legalisation..."
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all ${
                            formErrors.category ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      {formErrors.category && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.category}</p>
                      )}
                      <p className="mt-1 text-xs" style={{ color: '#94A3B8' }}>
                        Slug will be automatically generated from the category name
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Question <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MessageCircle className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <input
                          type="text"
                          name="question"
                          value={formData.question}
                          onChange={handleChange}
                          placeholder="Enter the frequently asked question"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all ${
                            formErrors.question ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      {formErrors.question && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.question}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Answer <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 absolute left-3 top-3" style={{ color: '#94A3B8' }} />
                        <textarea
                          name="answer"
                          value={formData.answer}
                          onChange={handleChange}
                          placeholder="Enter the detailed answer"
                          rows="5"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all resize-none ${
                            formErrors.answer ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      {formErrors.answer && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.answer}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Status
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="status"
                            checked={formData.status}
                            onChange={handleChange}
                            className="w-5 h-5 rounded border-gray-300 text-[#0B1220] focus:ring-[#0B1220]"
                          />
                          <label className="text-sm" style={{ color: '#0B1220' }}>
                            {formData.status ? 'Active' : 'Inactive'}
                          </label>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            formData.status ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {formData.status ? <CheckCircle2 className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          {formData.status ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                    <ButtonPrimary type="submit" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>{editingFaq ? 'Updating...' : 'Creating...'}</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{editingFaq ? 'Update' : 'Create'}</span>
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
        {showDeleteModal && selectedFaq && (
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
                    Delete FAQ
                  </h2>
                </div>

                <p className="text-sm mb-6" style={{ color: '#64748B' }}>
                  Are you sure you want to delete this FAQ?
                  <br />
                  <span className="font-semibold" style={{ color: '#0B1220' }}>
                    Question: "{selectedFaq.question}"
                  </span>
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

export default SuperAdminFaq;