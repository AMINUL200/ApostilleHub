import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  SortAsc,
  SortDesc,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Globe,
  FileCheck,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Shield,
  Award,
  Star,
  Building2,
  FileText,
  MoreHorizontal,
  Copy,
  ExternalLink,
  HelpCircle,
  Info,
  Crown,
  BadgeCheck,
  UserCheck,
  UserCog,
  GraduationCap,
  BookOpen,
  FileCheck as FileCheckIcon,
  Truck,
  Home,
  Building,
  Landmark,
  Users as UsersIcon,
  Award as AwardBadge,
  Plus,
  X,
  Check,
  AlertTriangle,
  DollarSign,
  Map,
} from "lucide-react";
import { api } from "../../../services/app";
import { useAuthStore } from "../../../store/authStore";

// Button Components
const ButtonPrimary = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    style={{
      background: "linear-gradient(135deg, #0B1220, #1A2A4A)",
      boxShadow: "0 4px 15px rgba(11, 18, 32, 0.3)",
    }}
  >
    {children}
  </button>
);

const ButtonOutline = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    style={{
      background: "transparent",
      color: "#0B1220",
      border: "2px solid #0B1220",
    }}
  >
    {children}
  </button>
);

const filterOptions = {
  status: ["All", "Pending", "Approved", "Rejected", "Under Review"],
  availability: ["All", "Available", "Unavailable"],
};

const SuperAdminManageApostilleOfficer = () => {
  const location = useLocation();
  const storage_url = import.meta.env.VITE_API_STORAGE_URL;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [officers, setOfficers] = useState([]);
  const [filteredOfficers, setFilteredOfficers] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
    from: 0,
    to: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [sortField, setSortField] = useState("created_at");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const adminBasePath = location.pathname.startsWith("/organization-admin")
    ? "/organization-admin"
    : "/super-admin";

  // Fetch officers on mount and when pagination/filters change
  useEffect(() => {
    fetchOfficers();
  }, [
    currentPage,
    perPage,
    sortField,
    sortDirection,
    searchTerm,
    statusFilter,
    availabilityFilter,
  ]);

  const fetchOfficers = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const params = new URLSearchParams({
        page: currentPage,
        per_page: perPage,
        sort: sortField,
        direction: sortDirection,
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter !== "All" && {
          approval_status: statusFilter.toLowerCase(),
        }),
        ...(availabilityFilter !== "All" && {
          is_available: availabilityFilter === "Available",
        }),
      });

      const response = await api.get(`/admin/lawyers?${params}`);
      if (response.data.success) {
        const data = response.data.data;
        setOfficers(data.data || []);
        setFilteredOfficers(data.data || []);
        setPagination({
          current_page: data.current_page || 1,
          last_page: data.last_page || 1,
          per_page: data.per_page || 20,
          total: data.total || 0,
          from: data.from || 0,
          to: data.to || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching officers:", error);
      setErrorMessage(error.message || "Failed to load officers");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewOfficer = (officer) => {
    navigate(`${adminBasePath}/apostille-officers/${officer.id}`);
  };

  const handleViewServiceRegionPrice = (officer) => {
    navigate(
      `${adminBasePath}/apostille-officers/${officer.id}/service-region-price`,
    );
  };

  const handleDeleteClick = (officer) => {
    setSelectedOfficer(officer);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedOfficer) return;

    try {
      const response = await api.delete(`/admin/lawyers/${selectedOfficer.id}`);
      if (response.data.success || response.status === 200) {
        setSuccessMessage("Officer removed successfully!");
        await fetchOfficers();
        setShowDeleteModal(false);
        setSelectedOfficer(null);
      }
    } catch (error) {
      console.error("Error deleting officer:", error);
      setErrorMessage(error.message || "Failed to delete officer");
    }
  };

  const handleStatusUpdate = async (officer, status) => {
    try {
      const response = await api.put(`/admin/lawyers/${officer.id}/status`, {
        approval_status: status,
      });
      if (response.data.success) {
        setSuccessMessage(`Officer ${status} successfully!`);
        await fetchOfficers();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setErrorMessage(error.message || "Failed to update status");
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: {
        label: "Pending",
        color: "#F59E0B",
        bg: "rgba(245, 158, 11, 0.1)",
        icon: Clock,
      },
      under_review: {
        label: "Under Review",
        color: "#0F4C81",
        bg: "rgba(15, 76, 129, 0.1)",
        icon: RefreshCw,
      },
      approved: {
        label: "Approved",
        color: "#10B981",
        bg: "rgba(16, 185, 129, 0.1)",
        icon: CheckCircle2,
      },
      rejected: {
        label: "Rejected",
        color: "#EF4444",
        bg: "rgba(239, 68, 68, 0.1)",
        icon: XCircle,
      },
    };
    const statusConfig = config[status] || config.pending;
    const Icon = statusConfig.icon;
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
        style={{
          background: statusConfig.bg,
          color: statusConfig.color,
        }}
      >
        <Icon className="w-3.5 h-3.5" />
        {statusConfig.label}
      </span>
    );
  };

  const getAvailabilityBadge = (isAvailable) => {
    const config = isAvailable
      ? { label: "Available", color: "#10B981", bg: "rgba(16, 185, 129, 0.1)" }
      : {
          label: "Unavailable",
          color: "#94A3B8",
          bg: "rgba(148, 163, 184, 0.1)",
        };
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
        style={{
          background: config.bg,
          color: config.color,
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: config.color }}
        />
        {config.label}
      </span>
    );
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl"
              style={{ background: "rgba(15, 76, 129, 0.1)" }}
            >
              <Users className="w-6 h-6" style={{ color: "#0F4C81" }} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#0B1220]">
                Apostille Officers
              </h1>
              <p className="text-sm text-[#64748B]">
                Manage all apostille officers and lawyers
              </p>
            </div>
          </div>
          {/* <ButtonPrimary onClick={() => navigate('/super-admin/lawyers/create')}>
            <Plus className="w-4 h-4" />
            <span>Add Officer</span>
          </ButtonPrimary> */}
        </motion.div>

        {/* Messages */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl flex items-start gap-3"
            style={{
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
            }}
          >
            <CheckCircle2
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              style={{ color: "#10B981" }}
            />
            <div>
              <p className="text-sm font-medium" style={{ color: "#10B981" }}>
                {successMessage}
              </p>
            </div>
            <button onClick={() => setSuccessMessage("")} className="ml-auto">
              <X className="w-4 h-4" style={{ color: "#94A3B8" }} />
            </button>
          </motion.div>
        )}

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl flex items-start gap-3"
            style={{
              background: "rgba(239, 68, 68, 0.08)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
            }}
          >
            <AlertCircle
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              style={{ color: "#EF4444" }}
            />
            <div>
              <p className="text-sm font-medium" style={{ color: "#EF4444" }}>
                {errorMessage}
              </p>
            </div>
            <button onClick={() => setErrorMessage("")} className="ml-auto">
              <X className="w-4 h-4" style={{ color: "#94A3B8" }} />
            </button>
          </motion.div>
        )}

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl p-4 mb-6"
          style={{ border: "1px solid #E2E8F0" }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#94A3B8" }}
              />
              <input
                type="text"
                placeholder="Search by name, email, or firm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
              />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
              >
                {filterOptions.status.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
              >
                {filterOptions.availability.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <select
                value={perPage}
                onChange={handlePerPageChange}
                className="px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
              >
                <option value="10">10 per page</option>
                <option value="20">20 per page</option>
                <option value="50">50 per page</option>
                <option value="100">100 per page</option>
              </select>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                  setAvailabilityFilter("All");
                  setPerPage(20);
                  setCurrentPage(1);
                }}
                className="px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                style={{ color: "#64748B", border: "1px solid #E2E8F0" }}
              >
                Reset
              </button>
            </div>
          </div>
        </motion.div>

        {/* Officers Table */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-white rounded-2xl overflow-hidden"
          style={{ border: "1px solid #E2E8F0" }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-[#0B1220] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm text-[#64748B]">Loading officers...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr
                      style={{
                        background: "#F8FAFC",
                        borderBottom: "1px solid #E2E8F0",
                      }}
                    >
                      <th className="text-left text-xs font-medium py-3.5 px-4 text-[#64748B]">
                        Officer
                      </th>
                      <th className="text-left text-xs font-medium py-3.5 px-4 text-[#64748B]">
                        Contact
                      </th>
                      <th className="text-left text-xs font-medium py-3.5 px-4 text-[#64748B]">
                        Firm
                      </th>
                      <th className="text-left text-xs font-medium py-3.5 px-4 text-[#64748B]">
                        Experience
                      </th>
                      <th className="text-left text-xs font-medium py-3.5 px-4 text-[#64748B]">
                        Status
                      </th>
                      <th className="text-left text-xs font-medium py-3.5 px-4 text-[#64748B]">
                        Availability
                      </th>
                      <th className="text-right text-xs font-medium py-3.5 px-4 text-[#64748B]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filteredOfficers.length > 0 ? (
                        filteredOfficers.map((officer, index) => (
                          <motion.tr
                            key={officer.id}
                            variants={fadeUp}
                            className="hover:bg-gray-50 transition-colors"
                            style={{
                              borderBottom:
                                index < filteredOfficers.length - 1
                                  ? "1px solid #F1F5F9"
                                  : "none",
                            }}
                          >
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, #0F4C81, #1E6BB8)",
                                  }}
                                >
                                  {officer.profile_photo ? (
                                    <img
                                      src={`${storage_url}${officer.profile_photo}`}
                                      alt={officer.professional_name}
                                      className="w-full h-full rounded-xl object-cover"
                                    />
                                  ) : (
                                    getInitials(
                                      officer.professional_name ||
                                        officer.user?.name,
                                    )
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-[#0B1220]">
                                    {officer.professional_name ||
                                      officer.user?.name}
                                  </p>
                                  <p className="text-xs text-[#64748B]">
                                    {officer.bar_registration_number ||
                                      "No registration"}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                                  <span className="truncate max-w-[120px]">
                                    {officer.user?.email}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                                  <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                                  <span>{officer.user?.phone || "N/A"}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div>
                                <p className="text-sm text-[#0B1220]">
                                  {officer.law_firm_name || "Independent"}
                                </p>
                                <p className="text-xs text-[#64748B]">
                                  {officer.country?.name || "N/A"}
                                </p>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div>
                                <p className="text-sm font-medium text-[#0B1220]">
                                  {officer.years_of_experience || 0} years
                                </p>
                                <p className="text-xs text-[#64748B]">
                                  Documents: {officer.documents_count || 0}
                                </p>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              {getStatusBadge(officer.approval_status)}
                            </td>
                            <td className="py-3.5 px-4">
                              {getAvailabilityBadge(officer.is_available)}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                {/* View Officer Details */}
                                <button
                                  onClick={() => handleViewOfficer(officer)}
                                  className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                                  style={{ color: "#64748B" }}
                                  title="View Officer Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>

                                {/* View Service Region Price */}
                                <button
                                  onClick={() =>
                                    handleViewServiceRegionPrice(officer)
                                  }
                                  className="p-1.5 rounded-lg transition-colors hover:bg-blue-50"
                                  style={{ color: "#0F4C81" }}
                                  title="View Service Region & Price"
                                >
                                  <DollarSign className="w-4 h-4" />
                                </button>

                                {/* Approve/Reject buttons for pending officers */}
                                {officer.approval_status === "pending" && (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleStatusUpdate(officer, "approved")
                                      }
                                      className="p-1.5 rounded-lg transition-colors hover:bg-green-50"
                                      style={{ color: "#10B981" }}
                                      title="Approve"
                                    >
                                      <CheckCircle2 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleStatusUpdate(officer, "rejected")
                                      }
                                      className="p-1.5 rounded-lg transition-colors hover:bg-red-50"
                                      style={{ color: "#EF4444" }}
                                      title="Reject"
                                    >
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  </>
                                )}

                                {/* Delete button */}
                                <button
                                  onClick={() => handleDeleteClick(officer)}
                                  className="p-1.5 rounded-lg transition-colors hover:bg-red-50 hover:text-red-500"
                                  style={{ color: "#64748B" }}
                                  title="Delete Officer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7">
                            <div className="text-center py-12">
                              <Users
                                className="w-16 h-16 mx-auto mb-4"
                                style={{ color: "#94A3B8" }}
                              />
                              <h3 className="text-lg font-semibold mb-1 text-[#0B1220]">
                                No officers found
                              </h3>
                              <p className="text-sm text-[#64748B]">
                                {searchTerm ||
                                statusFilter !== "All" ||
                                availabilityFilter !== "All"
                                  ? "Try adjusting your filters"
                                  : "No apostille officers registered yet"}
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
                <div
                  className="flex items-center justify-between px-4 py-3 border-t flex-wrap gap-4"
                  style={{ borderColor: "#E2E8F0" }}
                >
                  <span className="text-sm text-[#64748B]">
                    Showing {pagination.from} to {pagination.to} of{" "}
                    {pagination.total} officers
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(currentPage - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                      style={{ color: "#64748B" }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from(
                      { length: Math.min(pagination.last_page, 5) },
                      (_, i) => {
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
                                ? "text-white"
                                : "hover:bg-gray-100"
                            }`}
                            style={{
                              background:
                                pageNum === currentPage
                                  ? "linear-gradient(135deg, #0B1220, #1A2A4A)"
                                  : "transparent",
                              color:
                                pageNum === currentPage ? "white" : "#64748B",
                            }}
                          >
                            {pageNum}
                          </button>
                        );
                      },
                    )}
                    <button
                      onClick={() =>
                        setCurrentPage(
                          Math.min(currentPage + 1, pagination.last_page),
                        )
                      }
                      disabled={currentPage === pagination.last_page}
                      className="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                      style={{ color: "#64748B" }}
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

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedOfficer && (
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
                  <div
                    className="p-2 rounded-xl"
                    style={{ background: "rgba(239, 68, 68, 0.1)" }}
                  >
                    <AlertCircle
                      className="w-6 h-6"
                      style={{ color: "#EF4444" }}
                    />
                  </div>
                  <h2 className="text-xl font-bold text-[#0B1220]">
                    Remove Officer
                  </h2>
                </div>

                <p className="text-sm mb-6 text-[#64748B]">
                  Are you sure you want to remove{" "}
                  <span className="font-semibold text-[#0B1220]">
                    "
                    {selectedOfficer.professional_name ||
                      selectedOfficer.user?.name}
                    "
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
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #EF4444, #DC2626)",
                      boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
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

export default SuperAdminManageApostilleOfficer;
