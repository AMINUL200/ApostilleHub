import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  MapPin,
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
  Phone,
  DollarSign,
  Flag,
  Hash,
  Filter,
  MoreHorizontal,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  Layers,
  Archive,
  Bookmark,
  TrendingUp,
  Star,
  Crown,
  Users as UsersIcon,
  Building2,
  Map,
  Pin,
  Globe2,
  ChevronDown,
  PlusCircle,
  MinusCircle,
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

const ManageCountryRegion = () => {
  const [activeTab, setActiveTab] = useState('countries');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);

  // Countries state
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countryPagination, setCountryPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 50,
    total: 0,
    from: 0,
    to: 0,
  });

  // Regions state
  const [regions, setRegions] = useState([]);
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [regionPagination, setRegionPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 50,
    total: 0,
    from: 0,
    to: 0,
  });

  // Common state
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Country form data
  const [countryFormData, setCountryFormData] = useState({
    name: '',
    iso2: '',
    iso3: '',
    phone_code: '',
    currency_code: '',
    is_active: true,
  });
  const [countryFormErrors, setCountryFormErrors] = useState({});

  // Region form data
  const [regionFormData, setRegionFormData] = useState({
    country_id: '',
    name: '',
    code: '',
    is_active: true,
  });
  const [regionFormErrors, setRegionFormErrors] = useState({});

  const { user } = useAuthStore();

  // Fetch data on mount
  useEffect(() => {
    if (activeTab === 'countries') {
      fetchCountries();
    } else {
      fetchRegions();
    }
  }, [activeTab, currentPage, perPage]);

  // Apply filters
  useEffect(() => {
    if (activeTab === 'countries') {
      applyCountryFilters();
    } else {
      applyRegionFilters();
    }
  }, [countries, regions, searchTerm, statusFilter, countryFilter]);

  // ===================== COUNTRY FUNCTIONS =====================
  const fetchCountries = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const params = new URLSearchParams({
        page: currentPage,
        per_page: perPage,
      });

      const response = await api.get(`/admin/countries?${params}`);
      if (response.data.success) {
        const data = response.data.data;
        setCountries(data.data || []);
        setFilteredCountries(data.data || []);
        setCountryPagination({
          current_page: data.current_page || 1,
          last_page: data.last_page || 1,
          per_page: data.per_page || 50,
          total: data.total || 0,
          from: data.from || 0,
          to: data.to || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
      setErrorMessage(error.message || 'Failed to load countries');
    } finally {
      setIsLoading(false);
    }
  };

  const applyCountryFilters = () => {
    let filtered = [...countries];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(term) ||
        c.iso2.toLowerCase().includes(term) ||
        c.iso3.toLowerCase().includes(term) ||
        c.currency_code.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'All') {
      const isActive = statusFilter === 'Active';
      filtered = filtered.filter(c => c.is_active === isActive);
    }

    setFilteredCountries(filtered);
  };

  const handleCountrySubmit = async (e) => {
    e.preventDefault();
    if (!validateCountryForm()) return;

    setIsSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const payload = {
        name: countryFormData.name.trim(),
        iso2: countryFormData.iso2.trim().toUpperCase(),
        iso3: countryFormData.iso3.trim().toUpperCase(),
        phone_code: countryFormData.phone_code.trim(),
        currency_code: countryFormData.currency_code.trim().toUpperCase(),
        is_active: countryFormData.is_active,
      };

      let response;
      if (editingItem) {
        response = await api.put(`/admin/countries/${editingItem.id}`, payload);
      } else {
        response = await api.post('/admin/countries', payload);
      }

      if (response.data.success) {
        setSuccessMessage(
          editingItem
            ? 'Country updated successfully!'
            : 'Country added successfully!'
        );
        await fetchCountries();
        resetCountryForm();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving country:', error);
      setErrorMessage(error.message || 'Failed to save country');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCountryStatusToggle = async (country) => {
    setIsStatusUpdating(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.patch(`/admin/countries/${country.id}/status`, {
        is_active: !country.is_active,
      });

      if (response.data.success) {
        setSuccessMessage(`Country ${country.is_active ? 'deactivated' : 'activated'} successfully!`);
        await fetchCountries();
      }
    } catch (error) {
      console.error('Error updating country status:', error);
      setErrorMessage(error.message || 'Failed to update country status');
    } finally {
      setIsStatusUpdating(false);
    }
  };

  const handleCountryDelete = async () => {
    if (!selectedItem) return;

    setIsDeleting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.delete(`/admin/countries/${selectedItem.id}`);

      if (response.data.success || response.status === 200) {
        setSuccessMessage('Country deleted successfully!');
        await fetchCountries();
        setShowDeleteModal(false);
        setSelectedItem(null);
      }
    } catch (error) {
      console.error('Error deleting country:', error);
      setErrorMessage(error.message || 'Failed to delete country');
    } finally {
      setIsDeleting(false);
    }
  };

  const validateCountryForm = () => {
    const errors = {};
    if (!countryFormData.name.trim()) errors.name = 'Country name is required';
    if (!countryFormData.iso2.trim()) errors.iso2 = 'ISO2 code is required';
    if (countryFormData.iso2.trim().length !== 2) errors.iso2 = 'ISO2 must be 2 characters';
    if (!countryFormData.iso3.trim()) errors.iso3 = 'ISO3 code is required';
    if (countryFormData.iso3.trim().length !== 3) errors.iso3 = 'ISO3 must be 3 characters';
    if (!countryFormData.phone_code.trim()) errors.phone_code = 'Phone code is required';
    if (!countryFormData.currency_code.trim()) errors.currency_code = 'Currency code is required';
    if (countryFormData.currency_code.trim().length !== 3) errors.currency_code = 'Currency code must be 3 characters';
    setCountryFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetCountryForm = () => {
    setCountryFormData({
      name: '',
      iso2: '',
      iso3: '',
      phone_code: '',
      currency_code: '',
      is_active: true,
    });
    setEditingItem(null);
    setCountryFormErrors({});
  };

  // ===================== REGION FUNCTIONS =====================
  const fetchRegions = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const params = new URLSearchParams({
        page: currentPage,
        per_page: perPage,
      });

      const response = await api.get(`/admin/regions?${params}`);
      if (response.data.success) {
        const data = response.data.data;
        setRegions(data.data || []);
        setFilteredRegions(data.data || []);
        setRegionPagination({
          current_page: data.current_page || 1,
          last_page: data.last_page || 1,
          per_page: data.per_page || 50,
          total: data.total || 0,
          from: data.from || 0,
          to: data.to || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching regions:', error);
      setErrorMessage(error.message || 'Failed to load regions');
    } finally {
      setIsLoading(false);
    }
  };

  const applyRegionFilters = () => {
    let filtered = [...regions];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(term) ||
        r.code.toLowerCase().includes(term) ||
        (r.country?.name && r.country.name.toLowerCase().includes(term))
      );
    }

    if (statusFilter !== 'All') {
      const isActive = statusFilter === 'Active';
      filtered = filtered.filter(r => r.is_active === isActive);
    }

    if (countryFilter !== 'All') {
      filtered = filtered.filter(r => String(r.country_id) === countryFilter);
    }

    setFilteredRegions(filtered);
  };

  const handleRegionSubmit = async (e) => {
    e.preventDefault();
    if (!validateRegionForm()) return;

    setIsSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const payload = {
        country_id: parseInt(regionFormData.country_id),
        name: regionFormData.name.trim(),
        code: regionFormData.code.trim().toUpperCase(),
        is_active: regionFormData.is_active,
      };

      let response;
      if (editingItem) {
        response = await api.put(`/admin/regions/${editingItem.id}`, payload);
      } else {
        response = await api.post('/admin/regions', payload);
      }

      if (response.data.success) {
        setSuccessMessage(
          editingItem
            ? 'Region updated successfully!'
            : 'Region added successfully!'
        );
        await fetchRegions();
        resetRegionForm();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving region:', error);
      setErrorMessage(error.message || 'Failed to save region');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRegionStatusToggle = async (region) => {
    setIsStatusUpdating(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.patch(`/admin/regions/${region.id}/status`, {
        is_active: !region.is_active,
      });

      if (response.data.success) {
        setSuccessMessage(`Region ${region.is_active ? 'deactivated' : 'activated'} successfully!`);
        await fetchRegions();
      }
    } catch (error) {
      console.error('Error updating region status:', error);
      setErrorMessage(error.message || 'Failed to update region status');
    } finally {
      setIsStatusUpdating(false);
    }
  };

  const handleRegionDelete = async () => {
    if (!selectedItem) return;

    setIsDeleting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.delete(`/admin/regions/${selectedItem.id}`);

      if (response.data.success || response.status === 200) {
        setSuccessMessage('Region deleted successfully!');
        await fetchRegions();
        setShowDeleteModal(false);
        setSelectedItem(null);
      }
    } catch (error) {
      console.error('Error deleting region:', error);
      setErrorMessage(error.message || 'Failed to delete region');
    } finally {
      setIsDeleting(false);
    }
  };

  const validateRegionForm = () => {
    const errors = {};
    if (!regionFormData.country_id) errors.country_id = 'Country is required';
    if (!regionFormData.name.trim()) errors.name = 'Region name is required';
    if (!regionFormData.code.trim()) errors.code = 'Region code is required';
    setRegionFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetRegionForm = () => {
    setRegionFormData({
      country_id: '',
      name: '',
      code: '',
      is_active: true,
    });
    setEditingItem(null);
    setRegionFormErrors({});
  };

  // ===================== COMMON FUNCTIONS =====================
  const handleEdit = (item) => {
    setEditingItem(item);
    if (activeTab === 'countries') {
      setCountryFormData({
        name: item.name || '',
        iso2: item.iso2 || '',
        iso3: item.iso3 || '',
        phone_code: item.phone_code || '',
        currency_code: item.currency_code || '',
        is_active: item.is_active === true || item.is_active === 1,
      });
    } else {
      setRegionFormData({
        country_id: String(item.country_id) || '',
        name: item.name || '',
        code: item.code || '',
        is_active: item.is_active === true || item.is_active === 1,
      });
    }
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    if (activeTab === 'countries') {
      resetCountryForm();
    } else {
      resetRegionForm();
    }
    setShowModal(true);
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleStatusToggle = (item) => {
    if (activeTab === 'countries') {
      handleCountryStatusToggle(item);
    } else {
      handleRegionStatusToggle(item);
    }
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const getStatusBadge = (isActive) => {
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
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

  // Get unique countries for region filter
  const uniqueCountries = regions.reduce((acc, region) => {
    if (region.country && !acc.find(c => c.id === region.country.id)) {
      acc.push(region.country);
    }
    return acc;
  }, []);

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
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl" style={{ background: 'rgba(11, 18, 32, 0.1)' }}>
                <Globe className="w-6 h-6" style={{ color: '#0B1220' }} />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-[#0B1220]">
                  Manage Countries & Regions
                </h1>
                <p className="text-sm text-[#64748B]">
                  Manage countries and their regions
                </p>
              </div>
            </div>
          </div>
          <ButtonPrimary onClick={handleAdd}>
            <Plus className="w-4 h-4" />
            <span>Add {activeTab === 'countries' ? 'Country' : 'Region'}</span>
          </ButtonPrimary>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('countries')}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeTab === 'countries'
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              background: activeTab === 'countries'
                ? 'linear-gradient(135deg, #0B1220, #1A2A4A)'
                : 'white',
              border: activeTab === 'countries' ? 'none' : '1px solid #E2E8F0',
            }}
          >
            <Globe2 className="w-4 h-4 inline mr-2" />
            Countries
          </button>
          <button
            onClick={() => setActiveTab('regions')}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeTab === 'regions'
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              background: activeTab === 'regions'
                ? 'linear-gradient(135deg, #0B1220, #1A2A4A)'
                : 'white',
              border: activeTab === 'regions' ? 'none' : '1px solid #E2E8F0',
            }}
          >
            <MapPin className="w-4 h-4 inline mr-2" />
            Regions
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
                placeholder={activeTab === 'countries' ? "Search by name, ISO2, ISO3, or currency..." : "Search by name, code, or country..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
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

              {activeTab === 'regions' && (
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                  style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
                >
                  <option value="All">All Countries</option>
                  {uniqueCountries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              )}

              <select
                value={perPage}
                onChange={handlePerPageChange}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
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
                  setCountryFilter('All');
                  setPerPage(50);
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
                <p className="text-sm text-[#64748B]">
                  Loading {activeTab === 'countries' ? 'countries' : 'regions'}...
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                      {activeTab === 'countries' ? (
                        <>
                          <th className="text-left text-xs font-medium py-3.5 px-4 text-[#64748B]">Name</th>
                          <th className="text-left text-xs font-medium py-3.5 px-4 text-[#64748B]">ISO2</th>
                          <th className="text-left text-xs font-medium py-3.5 px-4 text-[#64748B]">ISO3</th>
                          <th className="text-left text-xs font-medium py-3.5 px-4 text-[#64748B]">Phone Code</th>
                          <th className="text-left text-xs font-medium py-3.5 px-4 text-[#64748B]">Currency</th>
                          <th className="text-left text-xs font-medium py-3.5 px-4 text-[#64748B]">Status</th>
                          <th className="text-right text-xs font-medium py-3.5 px-4 text-[#64748B]">Actions</th>
                        </>
                      ) : (
                        <>
                          <th className="text-left text-xs font-medium py-3.5 px-4 text-[#64748B]">Name</th>
                          <th className="text-left text-xs font-medium py-3.5 px-4 text-[#64748B]">Code</th>
                          <th className="text-left text-xs font-medium py-3.5 px-4 text-[#64748B]">Country</th>
                          <th className="text-left text-xs font-medium py-3.5 px-4 text-[#64748B]">Status</th>
                          <th className="text-right text-xs font-medium py-3.5 px-4 text-[#64748B]">Actions</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {(activeTab === 'countries' ? filteredCountries : filteredRegions).length > 0 ? (
                        (activeTab === 'countries' ? filteredCountries : filteredRegions).map((item, index) => (
                          <motion.tr
                            key={item.id}
                            variants={fadeUp}
                            className="hover:bg-gray-50 transition-colors"
                            style={{ borderBottom: index < (activeTab === 'countries' ? filteredCountries : filteredRegions).length - 1 ? '1px solid #F1F5F9' : 'none' }}
                          >
                            {activeTab === 'countries' ? (
                              <>
                                <td className="py-3.5 px-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(11, 18, 32, 0.08)' }}>
                                      <Flag className="w-5 h-5" style={{ color: '#0B1220' }} />
                                    </div>
                                    <span className="text-sm font-medium text-[#0B1220]">
                                      {item.name}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className="text-sm font-mono font-semibold text-[#0F4C81]">
                                    {item.iso2}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className="text-sm font-mono text-[#64748B]">
                                    {item.iso3}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className="text-sm text-[#64748B]">
                                    {item.phone_code}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className="text-sm font-mono text-[#64748B]">
                                    {item.currency_code}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4">
                                  {getStatusBadge(item.is_active)}
                                </td>
                                <td className="py-3.5 px-4 text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <button
                                      onClick={() => handleStatusToggle(item)}
                                      className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                                      style={{ color: item.is_active ? '#EF4444' : '#10B981' }}
                                    >
                                      {item.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                              </>
                            ) : (
                              <>
                                <td className="py-3.5 px-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(11, 18, 32, 0.08)' }}>
                                      <MapPin className="w-5 h-5" style={{ color: '#0B1220' }} />
                                    </div>
                                    <span className="text-sm font-medium text-[#0B1220]">
                                      {item.name}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className="text-sm font-mono font-semibold text-[#0F4C81]">
                                    {item.code}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className="text-sm text-[#64748B]">
                                    {item.country?.name || 'N/A'}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4">
                                  {getStatusBadge(item.is_active)}
                                </td>
                                <td className="py-3.5 px-4 text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <button
                                      onClick={() => handleStatusToggle(item)}
                                      className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                                      style={{ color: item.is_active ? '#EF4444' : '#10B981' }}
                                    >
                                      {item.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                              </>
                            )}
                          </motion.tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={activeTab === 'countries' ? 7 : 5}>
                            <div className="text-center py-12">
                              {activeTab === 'countries' ? (
                                <Globe className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                              ) : (
                                <MapPin className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                              )}
                              <h3 className="text-lg font-semibold mb-1 text-[#0B1220]">
                                No {activeTab === 'countries' ? 'countries' : 'regions'} found
                              </h3>
                              <p className="text-sm text-[#64748B]">
                                {searchTerm || statusFilter !== 'All' || (activeTab === 'regions' && countryFilter !== 'All')
                                  ? 'Try adjusting your filters'
                                  : `Click "Add ${activeTab === 'countries' ? 'Country' : 'Region'}" to create one`}
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
              {(activeTab === 'countries' ? countryPagination.total : regionPagination.total) > 0 && (
                <div className="flex items-center justify-between px-4 py-3 border-t flex-wrap gap-4" style={{ borderColor: '#E2E8F0' }}>
                  <span className="text-sm text-[#64748B]">
                    Showing {(activeTab === 'countries' ? countryPagination.from : regionPagination.from)} to{' '}
                    {(activeTab === 'countries' ? countryPagination.to : regionPagination.to)} of{' '}
                    {(activeTab === 'countries' ? countryPagination.total : regionPagination.total)} items
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
                    {Array.from({ length: Math.min((activeTab === 'countries' ? countryPagination.last_page : regionPagination.last_page), 5) }, (_, i) => {
                      let pageNum;
                      const lastPage = activeTab === 'countries' ? countryPagination.last_page : regionPagination.last_page;
                      if (lastPage <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= lastPage - 2) {
                        pageNum = lastPage - 4 + i;
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
                      onClick={() => setCurrentPage(Math.min(currentPage + 1, (activeTab === 'countries' ? countryPagination.last_page : regionPagination.last_page)))}
                      disabled={currentPage === (activeTab === 'countries' ? countryPagination.last_page : regionPagination.last_page)}
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
              if (activeTab === 'countries') resetCountryForm();
              else resetRegionForm();
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
                    {editingItem ? 'Edit' : 'Add'} {activeTab === 'countries' ? 'Country' : 'Region'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      if (activeTab === 'countries') resetCountryForm();
                      else resetRegionForm();
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {activeTab === 'countries' ? (
                  <form onSubmit={handleCountrySubmit}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                          Country Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Flag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                          <input
                            type="text"
                            value={countryFormData.name}
                            onChange={(e) => setCountryFormData({ ...countryFormData, name: e.target.value })}
                            placeholder="e.g., United Kingdom"
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all ${
                              countryFormErrors.name ? 'border-red-500' : 'border-[#E2E8F0]'
                            }`}
                            style={{ color: '#0B1220' }}
                          />
                        </div>
                        {countryFormErrors.name && (
                          <p className="mt-1 text-xs text-red-500">{countryFormErrors.name}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                            ISO2 Code <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Hash className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                            <input
                              type="text"
                              value={countryFormData.iso2}
                              onChange={(e) => setCountryFormData({ ...countryFormData, iso2: e.target.value.toUpperCase() })}
                              placeholder="GB"
                              maxLength="2"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all ${
                                countryFormErrors.iso2 ? 'border-red-500' : 'border-[#E2E8F0]'
                              }`}
                              style={{ color: '#0B1220' }}
                            />
                          </div>
                          {countryFormErrors.iso2 && (
                            <p className="mt-1 text-xs text-red-500">{countryFormErrors.iso2}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                            ISO3 Code <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Hash className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                            <input
                              type="text"
                              value={countryFormData.iso3}
                              onChange={(e) => setCountryFormData({ ...countryFormData, iso3: e.target.value.toUpperCase() })}
                              placeholder="GBR"
                              maxLength="3"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all ${
                                countryFormErrors.iso3 ? 'border-red-500' : 'border-[#E2E8F0]'
                              }`}
                              style={{ color: '#0B1220' }}
                            />
                          </div>
                          {countryFormErrors.iso3 && (
                            <p className="mt-1 text-xs text-red-500">{countryFormErrors.iso3}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                            Phone Code <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                            <input
                              type="text"
                              value={countryFormData.phone_code}
                              onChange={(e) => setCountryFormData({ ...countryFormData, phone_code: e.target.value })}
                              placeholder="+44"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all ${
                                countryFormErrors.phone_code ? 'border-red-500' : 'border-[#E2E8F0]'
                              }`}
                              style={{ color: '#0B1220' }}
                            />
                          </div>
                          {countryFormErrors.phone_code && (
                            <p className="mt-1 text-xs text-red-500">{countryFormErrors.phone_code}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                            Currency Code <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                            <input
                              type="text"
                              value={countryFormData.currency_code}
                              onChange={(e) => setCountryFormData({ ...countryFormData, currency_code: e.target.value.toUpperCase() })}
                              placeholder="GBP"
                              maxLength="3"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all ${
                                countryFormErrors.currency_code ? 'border-red-500' : 'border-[#E2E8F0]'
                              }`}
                              style={{ color: '#0B1220' }}
                            />
                          </div>
                          {countryFormErrors.currency_code && (
                            <p className="mt-1 text-xs text-red-500">{countryFormErrors.currency_code}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                          Status
                        </label>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={countryFormData.is_active}
                              onChange={(e) => setCountryFormData({ ...countryFormData, is_active: e.target.checked })}
                              className="w-5 h-5 rounded border-gray-300 text-[#0B1220] focus:ring-[#0B1220]"
                            />
                            <label className="text-sm text-[#0B1220]">
                              {countryFormData.is_active ? 'Active' : 'Inactive'}
                            </label>
                          </div>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              countryFormData.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {countryFormData.is_active ? <CheckCircle2 className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            {countryFormData.is_active ? 'Active' : 'Inactive'}
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
                          if (activeTab === 'countries') resetCountryForm();
                          else resetRegionForm();
                        }}
                      >
                        Cancel
                      </ButtonOutline>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleRegionSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                          Country <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                          <select
                            value={regionFormData.country_id}
                            onChange={(e) => setRegionFormData({ ...regionFormData, country_id: e.target.value })}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all appearance-none ${
                              regionFormErrors.country_id ? 'border-red-500' : 'border-[#E2E8F0]'
                            }`}
                            style={{ color: '#0B1220' }}
                          >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                              <option key={country.id} value={country.id}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        {regionFormErrors.country_id && (
                          <p className="mt-1 text-xs text-red-500">{regionFormErrors.country_id}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                          Region Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                          <input
                            type="text"
                            value={regionFormData.name}
                            onChange={(e) => setRegionFormData({ ...regionFormData, name: e.target.value })}
                            placeholder="e.g., California"
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all ${
                              regionFormErrors.name ? 'border-red-500' : 'border-[#E2E8F0]'
                            }`}
                            style={{ color: '#0B1220' }}
                          />
                        </div>
                        {regionFormErrors.name && (
                          <p className="mt-1 text-xs text-red-500">{regionFormErrors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                          Region Code <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Hash className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                          <input
                            type="text"
                            value={regionFormData.code}
                            onChange={(e) => setRegionFormData({ ...regionFormData, code: e.target.value.toUpperCase() })}
                            placeholder="e.g., CA"
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all ${
                              regionFormErrors.code ? 'border-red-500' : 'border-[#E2E8F0]'
                            }`}
                            style={{ color: '#0B1220' }}
                          />
                        </div>
                        {regionFormErrors.code && (
                          <p className="mt-1 text-xs text-red-500">{regionFormErrors.code}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                          Status
                        </label>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={regionFormData.is_active}
                              onChange={(e) => setRegionFormData({ ...regionFormData, is_active: e.target.checked })}
                              className="w-5 h-5 rounded border-gray-300 text-[#0B1220] focus:ring-[#0B1220]"
                            />
                            <label className="text-sm text-[#0B1220]">
                              {regionFormData.is_active ? 'Active' : 'Inactive'}
                            </label>
                          </div>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              regionFormData.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {regionFormData.is_active ? <CheckCircle2 className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            {regionFormData.is_active ? 'Active' : 'Inactive'}
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
                          if (activeTab === 'countries') resetCountryForm();
                          else resetRegionForm();
                        }}
                      >
                        Cancel
                      </ButtonOutline>
                    </div>
                  </form>
                )}
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
                    Delete {activeTab === 'countries' ? 'Country' : 'Region'}
                  </h2>
                </div>

                <p className="text-sm mb-6 text-[#64748B]">
                  Are you sure you want to delete <span className="font-semibold text-[#0B1220]">
                    "{activeTab === 'countries' ? selectedItem.name : selectedItem.name}"
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
                    onClick={activeTab === 'countries' ? handleCountryDelete : handleRegionDelete}
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

export default ManageCountryRegion;