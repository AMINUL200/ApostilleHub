import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  MapPin,
  Truck,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
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

// Currency list — each entry carries its country flag + display name so the
// dropdown reads as "flag  CODE — Country" instead of a bare currency code.
const currencies = [
  { code: 'AUD', name: 'Australia', flag: '🇦🇺' },
  { code: 'USD', name: 'United States', flag: '🇺🇸' },
  { code: 'EUR', name: 'European Union', flag: '🇪🇺' },
  { code: 'GBP', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CAD', name: 'Canada', flag: '🇨🇦' },
  { code: 'NZD', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'JPY', name: 'Japan', flag: '🇯🇵' },
  { code: 'CNY', name: 'China', flag: '🇨🇳' },
  { code: 'INR', name: 'India', flag: '🇮🇳' },
  { code: 'SGD', name: 'Singapore', flag: '🇸🇬' },
  { code: 'MYR', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'PHP', name: 'Philippines', flag: '🇵🇭' },
  { code: 'IDR', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'THB', name: 'Thailand', flag: '🇹🇭' },
  { code: 'VND', name: 'Vietnam', flag: '🇻🇳' },
  // ASEAN currencies that were missing from the original list
  { code: 'BND', name: 'Brunei', flag: '🇧🇳' },
  { code: 'KHR', name: 'Cambodia', flag: '🇰🇭' },
  { code: 'LAK', name: 'Laos', flag: '🇱🇦' },
  { code: 'MMK', name: 'Myanmar', flag: '🇲🇲' },
];

const OrgDeliveryMethodsPrice = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [rates, setRates] = useState([]);
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [countries, setCountries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingRate, setEditingRate] = useState(null);
  const [selectedRate, setSelectedRate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [methodFilter, setMethodFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    delivery_method_id: '',
    country_id: '',
    price: '',
    currency: 'AUD',
    estimated_days: '',
    status: 'active',
  });
  const [formErrors, setFormErrors] = useState({});
  const itemsPerPage = 5;

  const { user } = useAuthStore();

  // Fetch data on mount
  useEffect(() => {
    fetchRates();
    fetchDeliveryMethods();
    fetchCountries();
  }, []);

  const fetchRates = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await api.get('/admin/delivery-method-rates');
      if (response.data.success) {
        const ratesData = response.data.data.data || response.data.data || [];
        setRates(ratesData);
      } else {
        setRates([]);
      }
    } catch (error) {
      console.error('Error fetching rates:', error);
      setErrorMessage(error.response?.data?.message || error.message || 'Failed to load rates');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDeliveryMethods = async () => {
    try {
      const response = await api.get('/admin/delivery-methods');
      if (response.data.success) {
        const methodsData = response.data.data.data || response.data.data || [];
        setDeliveryMethods(methodsData);
      }
    } catch (error) {
      console.error('Error fetching delivery methods:', error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await api.get('/admin/countries');
      if (response.data.success) {
        const countriesData = response.data.data.data || response.data.data || [];
        setCountries(countriesData);
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
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
    if (!formData.delivery_method_id) errors.delivery_method_id = 'Delivery method is required';
    if (!formData.country_id) errors.country_id = 'Country is required';
    if (!formData.price) errors.price = 'Price is required';
    if (formData.price && isNaN(formData.price)) errors.price = 'Price must be a valid number';
    if (formData.price && parseFloat(formData.price) < 0) errors.price = 'Price cannot be negative';
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
        delivery_method_id: parseInt(formData.delivery_method_id),
        country_id: parseInt(formData.country_id),
        price: parseFloat(formData.price),
        currency: formData.currency,
        estimated_days: parseInt(formData.estimated_days),
        status: formData.status,
      };

      let response;
      if (editingRate) {
        response = await api.put(`/admin/delivery-method-rates/${editingRate.id}`, payload);
      } else {
        response = await api.post('/admin/delivery-method-rates', payload);
      }

      if (response.data.success || response.data) {
        setSuccessMessage(
          editingRate 
            ? 'Rate updated successfully!' 
            : 'Rate created successfully!'
        );
        await fetchRates();
        resetForm();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving rate:', error);
      setErrorMessage(error.response?.data?.message || error.message || 'Failed to save rate');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedRate) return;

    setIsDeleting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.delete(`/admin/delivery-method-rates/${selectedRate.id}`);
      
      if (response.data.success || response.status === 200) {
        setSuccessMessage('Rate deleted successfully!');
        await fetchRates();
        setShowDeleteModal(false);
        setSelectedRate(null);
      }
    } catch (error) {
      console.error('Error deleting rate:', error);
      setErrorMessage(error.response?.data?.message || error.message || 'Failed to delete rate');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusToggle = async (rate) => {
    const newStatus = rate.status === 'active' ? 'inactive' : 'active';
    try {
      const payload = {
        delivery_method_id: parseInt(rate.delivery_method_id),
        country_id: parseInt(rate.country_id),
        price: parseFloat(rate.price),
        currency: rate.currency,
        estimated_days: parseInt(rate.estimated_days),
        status: newStatus,
      };
      
      const response = await api.put(`/admin/delivery-method-rates/${rate.id}`, payload);
      
      if (response.data.success || response.data) {
        setSuccessMessage(`Rate ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
        await fetchRates();
      }
    } catch (error) {
      console.error('Error toggling status:', error);
      setErrorMessage(error.response?.data?.message || error.message || 'Failed to update status');
    }
  };

  const handleEdit = (rate) => {
    setEditingRate(rate);
    setFormData({
      delivery_method_id: rate.delivery_method_id || '',
      country_id: rate.country_id || '',
      price: rate.price || '',
      currency: rate.currency || 'AUD',
      estimated_days: rate.estimated_days || '',
      status: rate.status || 'active',
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingRate(null);
    setFormData({
      delivery_method_id: '',
      country_id: '',
      price: '',
      currency: 'AUD',
      estimated_days: '',
      status: 'active',
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      delivery_method_id: '',
      country_id: '',
      price: '',
      currency: 'AUD',
      estimated_days: '',
      status: 'active',
    });
    setEditingRate(null);
    setFormErrors({});
  };

  const handleDeleteClick = (rate) => {
    setSelectedRate(rate);
    setShowDeleteModal(true);
  };

  // Filter and pagination
  const filteredRates = rates.filter((rate) => {
    const matchesSearch = 
      (rate.delivery_method?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rate.country?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rate.currency || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || (rate.status || '').toLowerCase() === statusFilter.toLowerCase();
    const matchesMethod = methodFilter === 'All' || (rate.delivery_method_id || '').toString() === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalPages = Math.ceil(filteredRates.length / itemsPerPage);
  const paginatedRates = filteredRates.slice(
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

  const getMethodTypeBadge = (type) => {
    const config = {
      digital: { label: 'Digital', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
      courier: { label: 'Courier', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
      postal: { label: 'Postal', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
    };
    const typeConfig = config[type] || { label: type || 'Unknown', color: '#64748B', bg: 'rgba(100, 116, 139, 0.1)' };
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
        style={{
          background: typeConfig.bg,
          color: typeConfig.color,
        }}
      >
        {typeConfig.label}
      </span>
    );
  };

  // Look up the flag for whatever currency code a rate is stored in — used
  // both in the modal's live icon and in the table's price cell.
  const getCurrencyMeta = (code) =>
    currencies.find((c) => c.code === code) || { code, name: '', flag: '💱' };

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

  const selectedCurrencyMeta = getCurrencyMeta(formData.currency);

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
              <DollarSign className="w-6 h-6" style={{ color: '#0B1220' }} />
            </div>
            <div>
              <h1
                className="text-2xl lg:text-3xl font-bold"
                style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
              >
                Delivery Rates
              </h1>
              <p className="text-sm" style={{ color: '#64748B' }}>
                Manage delivery method pricing by country
              </p>
            </div>
          </div>
          <ButtonPrimary onClick={handleAdd}>
            <Plus className="w-4 h-4" />
            <span>Add Rate</span>
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
                placeholder="Search by delivery method, country, or currency..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all text-sm"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              >
                <option value="All">All Methods</option>
                {deliveryMethods.map((method) => (
                  <option key={method.id} value={method.id.toString()}>
                    {method.name}
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('All');
                  setMethodFilter('All');
                }}
                className="px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                style={{ color: '#64748B', border: '1px solid #E2E8F0' }}
              >
                Reset
              </button>
            </div>
          </div>
        </motion.div>

        {/* Rates Table */}
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
                <p className="text-sm" style={{ color: '#64748B' }}>Loading rates...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                      <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                        Delivery Method
                      </th>
                      <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                        Country
                      </th>
                      <th className="text-left text-xs font-medium py-3.5 px-4" style={{ color: '#64748B' }}>
                        Price
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
                      {paginatedRates.length > 0 ? (
                        paginatedRates.map((rate, index) => {
                          const currencyMeta = getCurrencyMeta(rate.currency);
                          return (
                            <motion.tr
                              key={rate.id}
                              variants={fadeUp}
                              className="hover:bg-gray-50 transition-colors"
                              style={{ borderBottom: index < paginatedRates.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                            >
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(11, 18, 32, 0.08)' }}>
                                    <Truck className="w-5 h-5" style={{ color: '#0B1220' }} />
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium" style={{ color: '#0B1220' }}>
                                      {rate.delivery_method?.name || 'N/A'}
                                    </span>
                                    <div className="mt-0.5">
                                      {getMethodTypeBadge(rate.delivery_method?.type)}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium" style={{ color: '#0B1220' }}>
                                    {rate.country?.name || 'N/A'}
                                  </span>
                                  <span className="text-xs text-muted" style={{ color: '#94A3B8' }}>
                                    ({rate.country?.iso2 || ''})
                                  </span>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="text-sm font-semibold flex items-center gap-1.5" style={{ color: '#0B1220' }}>
                                  <span>{currencyMeta.flag}</span>
                                  <span>{rate.currency} {parseFloat(rate.price).toFixed(2)}</span>
                                </span>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5" style={{ color: '#64748B' }} />
                                  <span className="text-sm" style={{ color: '#64748B' }}>
                                    {rate.estimated_days} days
                                  </span>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                {getStatusBadge(rate.status)}
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => handleStatusToggle(rate)}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all hover:scale-105 ${
                                      rate.status === 'active' 
                                        ? 'hover:bg-red-50 hover:text-red-500' 
                                        : 'hover:bg-green-50 hover:text-green-500'
                                    }`}
                                    style={{ 
                                      color: rate.status === 'active' ? '#EF4444' : '#10B981',
                                      background: rate.status === 'active' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)',
                                    }}
                                  >
                                    {rate.status === 'active' ? 'Deactivate' : 'Activate'}
                                  </button>
                                  <button
                                    onClick={() => handleEdit(rate)}
                                    className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                                    style={{ color: '#64748B' }}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteClick(rate)}
                                    className="p-1.5 rounded-lg transition-colors hover:bg-red-50 hover:text-red-500"
                                    style={{ color: '#64748B' }}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </motion.tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="6">
                            <div className="text-center py-12">
                              <DollarSign className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                              <h3 className="text-lg font-semibold mb-1" style={{ color: '#0B1220' }}>
                                No rates found
                              </h3>
                              <p className="text-sm" style={{ color: '#64748B' }}>
                                {searchTerm || statusFilter !== 'All' || methodFilter !== 'All'
                                  ? 'Try adjusting your filters'
                                  : 'Click "Add Rate" to create one'}
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
                    {Math.min(currentPage * itemsPerPage, filteredRates.length)} of{' '}
                    {filteredRates.length} rates
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
                    {editingRate ? 'Edit Rate' : 'Add Rate'}
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
                        Delivery Method <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Truck className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <select
                          name="delivery_method_id"
                          value={formData.delivery_method_id}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all appearance-none ${
                            formErrors.delivery_method_id ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        >
                          <option value="">Select delivery method</option>
                          {deliveryMethods.map((method) => (
                            <option key={method.id} value={method.id}>
                              {method.name} ({method.type})
                            </option>
                          ))}
                        </select>
                      </div>
                      {formErrors.delivery_method_id && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.delivery_method_id}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Country <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <select
                          name="country_id"
                          value={formData.country_id}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all appearance-none ${
                            formErrors.country_id ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        >
                          <option value="">Select country</option>
                          {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                              {country.name} ({country.iso2})
                            </option>
                          ))}
                        </select>
                      </div>
                      {formErrors.country_id && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.country_id}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Price <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all ${
                            formErrors.price ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      {formErrors.price && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.price}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Currency <span className="text-red-500">*</span>
                      </label>
                      {/* Currency select — icon shows the flag of whichever
                          currency is currently chosen, and each option is
                          rendered as "flag  CODE — Country" so the country
                          behind each currency is visible at a glance. */}
                      <div className="relative">
                        <span
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-base leading-none pointer-events-none"
                          aria-hidden="true"
                        >
                          {selectedCurrencyMeta.flag}
                        </span>
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
                            <option key={curr.code} value={curr.code}>
                              {curr.flag} {curr.code} — {curr.name}
                            </option>
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
                          <span>{editingRate ? 'Updating...' : 'Creating...'}</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{editingRate ? 'Update' : 'Create'}</span>
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
        {showDeleteModal && selectedRate && (
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
                    Delete Rate
                  </h2>
                </div>

                <p className="text-sm mb-6" style={{ color: '#64748B' }}>
                  Are you sure you want to delete the rate for{' '}
                  <span className="font-semibold" style={{ color: '#0B1220' }}>
                    {selectedRate.delivery_method?.name || 'N/A'}
                  </span>{' '}
                  to{' '}
                  <span className="font-semibold" style={{ color: '#0B1220' }}>
                    {selectedRate.country?.name || 'N/A'}
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

export default OrgDeliveryMethodsPrice;