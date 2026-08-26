import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
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
  Mail,
  Phone,
  User,
  Shield,
  Award,
  Clock,
  UserCheck,
  UserCog,
  Briefcase,
  Building2,
  FileText,
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

// Role options
const ROLES = [
  { value: 'apostille_officer', label: 'Apostille Officer' },
  { value: 'customer_support', label: 'Customer Support' },
  { value: 'finance', label: 'Finance Team' },
  { value: 'courier', label: 'Courier Staff' },
];

// Role badge colors
const getRoleBadgeStyle = (roleSlug) => {
  const colors = {
    'apostille_officer': { bg: 'rgba(15, 76, 129, 0.1)', color: '#0F4C81' },
    'customer_support': { bg: 'rgba(16, 185, 129, 0.1)', color: '#10B981' },
    'finance': { bg: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6' },
    'courier': { bg: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' },
  };
  return colors[roleSlug] || { bg: 'rgba(11, 18, 32, 0.05)', color: '#64748B' };
};

const getRoleLabel = (roleSlug) => {
  const role = ROLES.find(r => r.value === roleSlug);
  return role ? role.label : roleSlug || 'N/A';
};

const OrgTeam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const { user } = useAuthStore();

  // Fetch team members on mount
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  // Apply filters, search, and sorting
  useEffect(() => {
    applyFiltersAndSort();
  }, [teamMembers, searchTerm, roleFilter, statusFilter, sortField, sortDirection]);

  const fetchTeamMembers = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await api.get('/admin/staff');
      if (response.data.success) {
        let data = [];
        if (Array.isArray(response.data.data)) {
          data = response.data.data;
        } else if (response.data.data && Array.isArray(response.data.data.data)) {
          data = response.data.data.data;
        }
        setTeamMembers(data);
        setFilteredMembers(data);
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
      setErrorMessage(error.message || 'Failed to load team members');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...teamMembers];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(member =>
        member.user?.name?.toLowerCase().includes(term) ||
        member.user?.email?.toLowerCase().includes(term) ||
        member.user?.phone?.toLowerCase().includes(term) ||
        (member.role?.slug && member.role.slug.toLowerCase().includes(term))
      );
    }

    // Role filter
    if (roleFilter !== 'All') {
      filtered = filtered.filter(member => member.role?.slug === roleFilter);
    }

    // Status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(member => member.status === statusFilter.toLowerCase());
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortField] || a.user?.[sortField] || a.role?.[sortField];
      let bVal = b[sortField] || b.user?.[sortField] || b.role?.[sortField];
      
      if (sortField === 'name' || sortField === 'email' || sortField === 'phone') {
        aVal = a.user?.[sortField] || '';
        bVal = b.user?.[sortField] || '';
      } else if (sortField === 'role') {
        aVal = a.role?.name || '';
        bVal = b.role?.name || '';
      }
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredMembers(filtered);
    setCurrentPage(1);
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
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.role) errors.role = 'Role is required';
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
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        role: formData.role,
      };

      let response;
      if (editingMember) {
        response = await api.put(`/admin/staff/${editingMember.id}`, payload);
      } else {
        response = await api.post('/admin/staff', payload);
      }

      if (response.data.success) {
        setSuccessMessage(
          editingMember 
            ? 'Team member updated successfully!' 
            : 'Team member added successfully!'
        );
        await fetchTeamMembers();
        resetForm();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving team member:', error);
      setErrorMessage(error.message || 'Failed to save team member');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedMember) return;

    setIsDeleting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.delete(`/admin/staff/${selectedMember.id}`);
      
      if (response.data.success || response.status === 200) {
        setSuccessMessage('Team member removed successfully!');
        await fetchTeamMembers();
        setShowDeleteModal(false);
        setSelectedMember(null);
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      setErrorMessage(error.message || 'Failed to delete team member');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.user?.name || '',
      email: member.user?.email || '',
      phone: member.user?.phone || '',
      role: member.role?.slug || '',
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: '',
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: '',
    });
    setEditingMember(null);
    setFormErrors({});
  };

  const handleDeleteClick = (member) => {
    setSelectedMember(member);
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
      pending: { label: 'Pending', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
    };
    const statusConfig = config[status] || config.active;
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

  const getRoleBadge = (roleSlug) => {
    const style = getRoleBadgeStyle(roleSlug);
    const label = getRoleLabel(roleSlug);
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
        style={{
          background: style.bg,
          color: style.color,
        }}
      >
        <User className="w-3 h-3" />
        {label}
      </span>
    );
  };

  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return filteredMembers.slice(startIndex, endIndex);
  };

  const currentData = getCurrentPageData();
  const totalPages = Math.ceil(filteredMembers.length / perPage);
  const totalItems = filteredMembers.length;

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
              <Users className="w-6 h-6" style={{ color: '#0B1220' }} />
            </div>
            <div>
              <h1
                className="text-2xl lg:text-3xl font-bold"
                style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
              >
                Team Members
              </h1>
              <p className="text-sm" style={{ color: '#64748B' }}>
                Manage your organization's team
              </p>
            </div>
          </div>
          <ButtonPrimary onClick={handleAdd}>
            <Plus className="w-4 h-4" />
            <span>Add Team Member</span>
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
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all text-sm"
                style={{ borderColor: '#E2E8F0', color: '#0B1220' }}
              >
                <option value="All">All Roles</option>
                {ROLES.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
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
                <option value="Pending">Pending</option>
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
                  setRoleFilter('All');
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

        {/* Team Members Table */}
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
                <p className="text-sm" style={{ color: '#64748B' }}>Loading team members...</p>
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
                        onClick={() => handleSort('email')}
                        style={{ color: '#64748B' }}
                      >
                        <div className="flex items-center gap-1">
                          Email
                          {sortField === 'email' && (
                            sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th
                        className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0B1220] transition-colors"
                        onClick={() => handleSort('phone')}
                        style={{ color: '#64748B' }}
                      >
                        <div className="flex items-center gap-1">
                          Phone
                          {sortField === 'phone' && (
                            sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th
                        className="text-left text-xs font-medium py-3.5 px-4 cursor-pointer hover:text-[#0B1220] transition-colors"
                        onClick={() => handleSort('role')}
                        style={{ color: '#64748B' }}
                      >
                        <div className="flex items-center gap-1">
                          Role
                          {sortField === 'role' && (
                            sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                          )}
                        </div>
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
                        currentData.map((member, index) => (
                          <motion.tr
                            key={member.id}
                            variants={fadeUp}
                            className="hover:bg-gray-50 transition-colors"
                            style={{ borderBottom: index < currentData.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                          >
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ 
                                  background: 'linear-gradient(135deg, #0B1220, #1A2A4A)',
                                  color: 'white'
                                }}>
                                  <span className="text-sm font-bold">
                                    {member.user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                                  </span>
                                </div>
                                <span className="text-sm font-medium" style={{ color: '#0B1220' }}>
                                  {member.user?.name || 'N/A'}
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" style={{ color: '#94A3B8' }} />
                                <span className="text-sm" style={{ color: '#64748B' }}>
                                  {member.user?.email || 'N/A'}
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" style={{ color: '#94A3B8' }} />
                                <span className="text-sm" style={{ color: '#64748B' }}>
                                  {member.user?.phone || 'N/A'}
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              {getRoleBadge(member.role?.slug || '')}
                            </td>
                            <td className="py-3.5 px-4">
                              {getStatusBadge(member.status)}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEdit(member)}
                                  className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                                  style={{ color: '#64748B' }}
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(member)}
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
                              <Users className="w-16 h-16 mx-auto mb-4" style={{ color: '#94A3B8' }} />
                              <h3 className="text-lg font-semibold mb-1" style={{ color: '#0B1220' }}>
                                No team members found
                              </h3>
                              <p className="text-sm" style={{ color: '#64748B' }}>
                                {searchTerm || roleFilter !== 'All' || statusFilter !== 'All'
                                  ? 'Try adjusting your filters'
                                  : 'Click "Add Team Member" to add one'}
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
                    {Math.min(currentPage * perPage, totalItems)} of {totalItems} members
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
                    {editingMember ? 'Edit Team Member' : 'Add Team Member'}
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
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g., John Smith"
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
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all ${
                            formErrors.email ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      {formErrors.email && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+447700900123"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all ${
                            formErrors.phone ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                        Role <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Shield className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all appearance-none ${
                            formErrors.role ? 'border-red-500' : 'border-[#E2E8F0]'
                          }`}
                          style={{ color: '#0B1220' }}
                        >
                          <option value="">Select Role</option>
                          {ROLES.map((role) => (
                            <option key={role.value} value={role.value}>
                              {role.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      {formErrors.role && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.role}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                    <ButtonPrimary type="submit" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>{editingMember ? 'Updating...' : 'Adding...'}</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{editingMember ? 'Update' : 'Add'}</span>
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
        {showDeleteModal && selectedMember && (
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
                    Remove Team Member
                  </h2>
                </div>

                <p className="text-sm mb-6" style={{ color: '#64748B' }}>
                  Are you sure you want to remove <span className="font-semibold" style={{ color: '#0B1220' }}>
                    "{selectedMember.user?.name}"
                  </span> from the team? This action cannot be undone.
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
                        <span>Removing...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        <span>Remove</span>
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

export default OrgTeam;