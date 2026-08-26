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
  Tag,
  Hash,
  ChevronLeft,
  ChevronRight,
  SortAsc,
  SortDesc,
  FolderTree,
  BookOpen,
  PenTool,
  Globe,
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
  Image,
  Link,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  User,
  FileText as FileTextIcon,
  Mail,
  Send,
  Eye as EyeIcon,
  ThumbsUp,
  MessageCircle,
  Share2,
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

const SuperAdminBlog = () => {
  const [activeTab, setActiveTab] = useState('categories'); // 'categories' or 'posts'
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Categories state
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  
  // Posts state
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  
  // Common state
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    status: true,
  });
  const [formErrors, setFormErrors] = useState({});
  
  // Blog post form data
  const [postFormData, setPostFormData] = useState({
    title: '',
    category_id: '',
    short_description: '',
    content: '',
    image_alt: '',
    reading_time: '',
    author_name: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    status: true,
  });
  const [postFormErrors, setPostFormErrors] = useState({});

  const { user } = useAuthStore();

  // Fetch data on mount
  useEffect(() => {
    if (activeTab === 'categories') {
      fetchCategories();
    } else {
      fetchPosts();
      fetchCategoryList();
    }
  }, [activeTab]);

  // Apply filters for categories
  useEffect(() => {
    if (activeTab === 'categories') {
      applyCategoryFilters();
    }
  }, [categories, searchTerm, statusFilter, sortField, sortDirection]);

  // Apply filters for posts
  useEffect(() => {
    if (activeTab === 'posts') {
      applyPostFilters();
    }
  }, [posts, searchTerm, statusFilter, categoryFilter, sortField, sortDirection]);

  // ===================== CATEGORY FUNCTIONS =====================
  const fetchCategories = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await api.get('/super-admin/blog-categories');
      if (response.data.success) {
        let data = [];
        if (Array.isArray(response.data.data)) {
          data = response.data.data;
        } else if (response.data.data && Array.isArray(response.data.data.data)) {
          data = response.data.data.data;
        }
        setCategories(data);
        setFilteredCategories(data);
      }
    } catch (error) {
      console.error('Error fetching blog categories:', error);
      setErrorMessage(error.message || 'Failed to load blog categories');
    } finally {
      setIsLoading(false);
    }
  };

  const applyCategoryFilters = () => {
    let filtered = [...categories];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(cat =>
        cat.name.toLowerCase().includes(term) ||
        (cat.slug && cat.slug.toLowerCase().includes(term))
      );
    }
    if (statusFilter !== 'All') {
      const isActive = statusFilter === 'Active';
      filtered = filtered.filter(cat => {
        const status = cat.status === '1' || cat.status === 1 || cat.status === true;
        return status === isActive;
      });
    }
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'status') {
        aVal = a.status === '1' || a.status === 1 || a.status === true ? 1 : 0;
        bVal = b.status === '1' || b.status === 1 || b.status === true ? 1 : 0;
      } else if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredCategories(filtered);
    setCurrentPage(1);
  };

  // ===================== POST FUNCTIONS =====================
  const fetchPosts = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await api.get('/super-admin/blogs');
      if (response.data.success) {
        let data = [];
        if (Array.isArray(response.data.data)) {
          data = response.data.data;
        } else if (response.data.data && Array.isArray(response.data.data.data)) {
          data = response.data.data.data;
        }
        setPosts(data);
        setFilteredPosts(data);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setErrorMessage(error.message || 'Failed to load blog posts');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategoryList = async () => {
    try {
      const response = await api.get('/super-admin/blog-categories');
      if (response.data.success) {
        let data = [];
        if (Array.isArray(response.data.data)) {
          data = response.data.data;
        } else if (response.data.data && Array.isArray(response.data.data.data)) {
          data = response.data.data.data;
        }
        setCategoryList(data);
      }
    } catch (error) {
      console.error('Error fetching category list:', error);
    }
  };

  const applyPostFilters = () => {
    let filtered = [...posts];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(term) ||
        (post.slug && post.slug.toLowerCase().includes(term)) ||
        (post.author_name && post.author_name.toLowerCase().includes(term))
      );
    }
    if (statusFilter !== 'All') {
      const isActive = statusFilter === 'Active';
      filtered = filtered.filter(post => post.status === isActive);
    }
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(post => 
        post.category_id === parseInt(categoryFilter) ||
        post.category?.id === parseInt(categoryFilter)
      );
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
    setFilteredPosts(filtered);
    setCurrentPage(1);
  };

  // ===================== COMMON FUNCTIONS =====================
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

  const handlePostChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setPostFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
    if (postFormErrors[name]) {
      setPostFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // ===================== CATEGORY CRUD =====================
  const validateCategoryForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Category name is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!validateCategoryForm()) return;

    setIsSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const payload = {
        name: formData.name.trim(),
        status: formData.status,
      };

      let response;
      if (editingItem) {
        response = await api.put(`/super-admin/blog-categories/${editingItem.id}`, payload);
      } else {
        response = await api.post('/super-admin/blog-categories', payload);
      }

      if (response.data.success) {
        setSuccessMessage(
          editingItem 
            ? 'Blog category updated successfully!' 
            : 'Blog category created successfully!'
        );
        await fetchCategories();
        resetCategoryForm();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving blog category:', error);
      setErrorMessage(error.message || 'Failed to save blog category');
    } finally {
      setIsSaving(false);
    }
  };

  // ===================== POST CRUD =====================
  const validatePostForm = () => {
    const errors = {};
    if (!postFormData.title.trim()) errors.title = 'Title is required';
    if (!postFormData.category_id) errors.category_id = 'Category is required';
    if (!postFormData.short_description.trim()) errors.short_description = 'Short description is required';
    if (!postFormData.content.trim()) errors.content = 'Content is required';
    if (!postFormData.author_name.trim()) errors.author_name = 'Author name is required';
    setPostFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!validatePostForm()) return;

    setIsSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const payload = {
        title: postFormData.title.trim(),
        category_id: parseInt(postFormData.category_id),
        short_description: postFormData.short_description.trim(),
        content: postFormData.content.trim(),
        image_alt: postFormData.image_alt.trim() || '',
        reading_time: postFormData.reading_time.trim() || '',
        author_name: postFormData.author_name.trim(),
        facebook: postFormData.facebook.trim() || '',
        instagram: postFormData.instagram.trim() || '',
        twitter: postFormData.twitter.trim() || '',
        linkedin: postFormData.linkedin.trim() || '',
        status: postFormData.status,
      };

      let response;
      if (editingItem) {
        response = await api.post(`/super-admin/blogs/${editingItem.id}`, payload);
      } else {
        response = await api.post('/super-admin/blogs', payload);
      }

      if (response.data.success) {
        setSuccessMessage(
          editingItem 
            ? 'Blog post updated successfully!' 
            : 'Blog post created successfully!'
        );
        await fetchPosts();
        resetPostForm();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      setErrorMessage(error.message || 'Failed to save blog post');
    } finally {
      setIsSaving(false);
    }
  };

  // ===================== DELETE FUNCTIONS =====================
  const handleDelete = async () => {
    if (!selectedItem) return;

    setIsDeleting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      let response;
      if (activeTab === 'categories') {
        response = await api.delete(`/super-admin/blog-categories/${selectedItem.id}`);
      } else {
        response = await api.delete(`/super-admin/blogs/${selectedItem.id}`);
      }
      
      if (response.data.success || response.status === 200) {
        setSuccessMessage(
          activeTab === 'categories' 
            ? 'Blog category deleted successfully!' 
            : 'Blog post deleted successfully!'
        );
        if (activeTab === 'categories') {
          await fetchCategories();
        } else {
          await fetchPosts();
        }
        setShowDeleteModal(false);
        setSelectedItem(null);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      setErrorMessage(error.message || 'Failed to delete item');
    } finally {
      setIsDeleting(false);
    }
  };

  // ===================== FORM RESET FUNCTIONS =====================
  const resetCategoryForm = () => {
    setFormData({
      name: '',
      status: true,
    });
    setEditingItem(null);
    setFormErrors({});
  };

  const resetPostForm = () => {
    setPostFormData({
      title: '',
      category_id: '',
      short_description: '',
      content: '',
      image_alt: '',
      reading_time: '',
      author_name: '',
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      status: true,
    });
    setEditingItem(null);
    setPostFormErrors({});
  };

  // ===================== EDIT FUNCTIONS =====================
  const handleEdit = (item) => {
    setEditingItem(item);
    if (activeTab === 'categories') {
      const isActive = item.status === '1' || item.status === 1 || item.status === true;
      setFormData({
        name: item.name || '',
        status: isActive,
      });
    } else {
      setPostFormData({
        title: item.title || '',
        category_id: item.category_id || item.category?.id || '',
        short_description: item.short_description || '',
        content: item.content || '',
        image_alt: item.image_alt || '',
        reading_time: item.reading_time || '',
        author_name: item.author_name || '',
        facebook: item.facebook || '',
        instagram: item.instagram || '',
        twitter: item.twitter || '',
        linkedin: item.linkedin || '',
        status: item.status === true || item.status === 1,
      });
    }
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    if (activeTab === 'categories') {
      resetCategoryForm();
    } else {
      resetPostForm();
    }
    setShowModal(true);
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

  // ===================== UI HELPERS =====================
  const getStatusBadge = (status) => {
    const isActive = status === '1' || status === 1 || status === true;
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

  const getCurrentPageData = () => {
    const data = activeTab === 'categories' ? filteredCategories : filteredPosts;
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return data.slice(startIndex, endIndex);
  };

  const currentData = getCurrentPageData();
  const totalItems = activeTab === 'categories' ? filteredCategories.length : filteredPosts.length;
  const totalPages = Math.ceil(totalItems / perPage);

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
              <BookOpen className="w-6 h-6" style={{ color: '#0B1220' }} />
            </div>
            <div>
              <h1
                className="text-2xl lg:text-3xl font-bold"
                style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
              >
                Blog Management
              </h1>
              <p className="text-sm" style={{ color: '#64748B' }}>
                Manage your blog categories and posts
              </p>
            </div>
          </div>
          <ButtonPrimary onClick={handleAdd}>
            <Plus className="w-4 h-4" />
            <span>{activeTab === 'categories' ? 'Add Category' : 'Add Post'}</span>
          </ButtonPrimary>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeTab === 'categories'
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              background: activeTab === 'categories'
                ? 'linear-gradient(135deg, #0B1220, #1A2A4A)'
                : 'white',
              border: activeTab === 'categories' ? 'none' : '1px solid #E2E8F0',
            }}
          >
            <FolderTree className="w-4 h-4 inline mr-2" />
            Categories
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeTab === 'posts'
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              background: activeTab === 'posts'
                ? 'linear-gradient(135deg, #0B1220, #1A2A4A)'
                : 'white',
              border: activeTab === 'posts' ? 'none' : '1px solid #E2E8F0',
            }}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Blog Posts
          </button>
        </div>

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
                placeholder={activeTab === 'categories' ? "Search by name or slug..." : "Search by title, slug, or author..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {activeTab === 'posts' && (
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all text-sm"
                  style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                >
                  <option value="All">All Categories</option>
                  {categoryList.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}

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

        {/* Table */}
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
                <p className="text-sm" style={{ color: '#64748B' }}>
                  Loading {activeTab === 'categories' ? 'categories' : 'posts'}...
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                      {activeTab === 'categories' ? (
                        <>
                          <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>Name</th>
                          <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>Slug</th>
                          <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>Status</th>
                          <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>Created At</th>
                          <th className="text-right text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>Actions</th>
                        </>
                      ) : (
                        <>
                          <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>Title</th>
                          <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>Category</th>
                          <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>Author</th>
                          <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>Reading Time</th>
                          <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>Status</th>
                          <th className="text-right text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>Actions</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {currentData.length > 0 ? (
                        currentData.map((item, index) => (
                          <motion.tr
                            key={item.id}
                            variants={fadeUp}
                            className="hover:bg-gray-50 transition-colors"
                            style={{ borderBottom: index < currentData.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                          >
                            {activeTab === 'categories' ? (
                              <>
                                <td className="py-3.5 px-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(11, 18, 32, 0.08)' }}>
                                      <FolderTree className="w-5 h-5" style={{ color: '#0B1220' }} />
                                    </div>
                                    <span className="text-sm font-medium" style={{ color: '#0B1220' }}>
                                      {item.name}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className="text-sm font-mono" style={{ color: '#64748B' }}>
                                    {item.slug}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4">{getStatusBadge(item.status)}</td>
                                <td className="py-3.5 px-4">
                                  <span className="text-sm" style={{ color: '#64748B' }}>
                                    {item.created_at ? new Date(item.created_at).toLocaleDateString('en-GB', {
                                      day: '2-digit',
                                      month: 'short',
                                      year: 'numeric',
                                    }) : 'N/A'}
                                  </span>
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="py-3.5 px-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(11, 18, 32, 0.08)' }}>
                                      <FileText className="w-5 h-5" style={{ color: '#0B1220' }} />
                                    </div>
                                    <div>
                                      <span className="text-sm font-medium" style={{ color: '#0B1220' }}>
                                        {item.title.length > 40 ? item.title.substring(0, 40) + '...' : item.title}
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className="text-sm" style={{ color: '#64748B' }}>
                                    {item.category?.name || 'N/A'}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className="text-sm" style={{ color: '#64748B' }}>
                                    {item.author_name || 'N/A'}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className="text-sm" style={{ color: '#64748B' }}>
                                    {item.reading_time || 'N/A'}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4">{getStatusBadge(item.status)}</td>
                              </>
                            )}
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
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
                          <td colSpan={activeTab === 'categories' ? 5 : 6}>
                            <div className="text-center py-12">
                              {activeTab === 'categories' ? (
                                <FolderTree className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                              ) : (
                                <FileText className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                              )}
                              <h3 className="text-lg font-semibold mb-1" style={{ color: '#0B1220' }}>
                                No {activeTab === 'categories' ? 'categories' : 'posts'} found
                              </h3>
                              <p className="text-sm" style={{ color: '#64748B' }}>
                                {searchTerm || statusFilter !== 'All' || (activeTab === 'posts' && categoryFilter !== 'All')
                                  ? 'Try adjusting your filters'
                                  : `Click "Add ${activeTab === 'categories' ? 'Category' : 'Post'}" to create one`}
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
                    {Math.min(currentPage * perPage, totalItems)} of {totalItems} items
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

      {/* Add/Edit Modal - Category */}
      <AnimatePresence>
        {showModal && activeTab === 'categories' && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setShowModal(false);
              resetCategoryForm();
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
                    {editingItem ? 'Edit Blog Category' : 'Add Blog Category'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      resetCategoryForm();
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCategorySubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Category Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g., Apostille"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all ${
                            formErrors.name ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      {formErrors.name && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
                      )}
                      <p className="mt-1 text-xs" style={{ color: '#94A3B8' }}>
                        Slug will be automatically generated from the name
                      </p>
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
                        resetCategoryForm();
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

      {/* Add/Edit Modal - Post */}
      <AnimatePresence>
        {showModal && activeTab === 'posts' && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setShowModal(false);
              resetPostForm();
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                  >
                    {editingItem ? 'Edit Blog Post' : 'Add Blog Post'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      resetPostForm();
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handlePostSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Title <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FileTextIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <input
                          type="text"
                          name="title"
                          value={postFormData.title}
                          onChange={handlePostChange}
                          placeholder="Enter blog post title"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all ${
                            postFormErrors.title ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      {postFormErrors.title && (
                        <p className="mt-1 text-xs text-red-500">{postFormErrors.title}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Category <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FolderTree className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <select
                          name="category_id"
                          value={postFormData.category_id}
                          onChange={handlePostChange}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all appearance-none ${
                            postFormErrors.category_id ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        >
                          <option value="">Select Category</option>
                          {categoryList.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {postFormErrors.category_id && (
                        <p className="mt-1 text-xs text-red-500">{postFormErrors.category_id}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Short Description <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 absolute left-3 top-3" style={{ color: '#94A3B8' }} />
                        <textarea
                          name="short_description"
                          value={postFormData.short_description}
                          onChange={handlePostChange}
                          placeholder="Brief summary of the blog post"
                          rows="2"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all resize-none ${
                            postFormErrors.short_description ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      {postFormErrors.short_description && (
                        <p className="mt-1 text-xs text-red-500">{postFormErrors.short_description}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Content <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 absolute left-3 top-3" style={{ color: '#94A3B8' }} />
                        <textarea
                          name="content"
                          value={postFormData.content}
                          onChange={handlePostChange}
                          placeholder="Full blog post content"
                          rows="6"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all resize-none ${
                            postFormErrors.content ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      {postFormErrors.content && (
                        <p className="mt-1 text-xs text-red-500">{postFormErrors.content}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                          Image Alt Text
                        </label>
                        <input
                          type="text"
                          name="image_alt"
                          value={postFormData.image_alt}
                          onChange={handlePostChange}
                          placeholder="Image alt description"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all"
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                          Reading Time
                        </label>
                        <input
                          type="text"
                          name="reading_time"
                          value={postFormData.reading_time}
                          onChange={handlePostChange}
                          placeholder="e.g., 5 min read"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all"
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Author Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <input
                          type="text"
                          name="author_name"
                          value={postFormData.author_name}
                          onChange={handlePostChange}
                          placeholder="Author name"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all ${
                            postFormErrors.author_name ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      {postFormErrors.author_name && (
                        <p className="mt-1 text-xs text-red-500">{postFormErrors.author_name}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                          Facebook URL
                        </label>
                        <div className="relative">
                          <Facebook className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#1877F2' }} />
                          <input
                            type="url"
                            name="facebook"
                            value={postFormData.facebook}
                            onChange={handlePostChange}
                            placeholder="https://facebook.com/..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all"
                            style={{ color: '#0B1220' }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                          Instagram URL
                        </label>
                        <div className="relative">
                          <Instagram className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#E4405F' }} />
                          <input
                            type="url"
                            name="instagram"
                            value={postFormData.instagram}
                            onChange={handlePostChange}
                            placeholder="https://instagram.com/..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all"
                            style={{ color: '#0B1220' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                          Twitter URL
                        </label>
                        <div className="relative">
                          <Twitter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#000000' }} />
                          <input
                            type="url"
                            name="twitter"
                            value={postFormData.twitter}
                            onChange={handlePostChange}
                            placeholder="https://twitter.com/..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all"
                            style={{ color: '#0B1220' }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                          LinkedIn URL
                        </label>
                        <div className="relative">
                          <Linkedin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#0A66C2' }} />
                          <input
                            type="url"
                            name="linkedin"
                            value={postFormData.linkedin}
                            onChange={handlePostChange}
                            placeholder="https://linkedin.com/..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all"
                            style={{ color: '#0B1220' }}
                          />
                        </div>
                      </div>
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
                            checked={postFormData.status}
                            onChange={handlePostChange}
                            className="w-5 h-5 rounded border-gray-300 text-[#0B1220] focus:ring-[#0B1220]"
                          />
                          <label className="text-sm" style={{ color: '#0B1220' }}>
                            {postFormData.status ? 'Active' : 'Inactive'}
                          </label>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            postFormData.status ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {postFormData.status ? <CheckCircle2 className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          {postFormData.status ? 'Active' : 'Inactive'}
                        </span>
                      </div>
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
                        resetPostForm();
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
                  <h2
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                  >
                    Delete {activeTab === 'categories' ? 'Category' : 'Post'}
                  </h2>
                </div>

                <p className="text-sm mb-6" style={{ color: '#64748B' }}>
                  Are you sure you want to delete <span className="font-semibold" style={{ color: '#0B1220' }}>
                    "{activeTab === 'categories' ? selectedItem.name : selectedItem.title}"
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

export default SuperAdminBlog;