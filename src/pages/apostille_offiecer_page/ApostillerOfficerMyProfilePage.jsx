import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Award,
  Star,
  Calendar,
  Briefcase,
  Globe,
  FileCheck,
  Clock,
  CheckCircle2,
  Edit,
  Save,
  X,
  Camera,
  Upload,
  Download,
  Printer,
  Share2,
  MessageCircle,
  Mail as MailIcon,
  Phone as PhoneIcon,
  Building2,
  Users,
  FileText,
  CreditCard,
  Package,
  Headphones,
  Settings,
  Bell,
  LogOut,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Copy,
  ExternalLink,
  HelpCircle,
  Info,
  Award as AwardIcon,
  Star as StarIcon,
  TrendingUp,
  TrendingDown,
  Activity,
  PieChart,
  BarChart,
  LineChart,
  RefreshCw,
  Plus,
  X as XIcon,
  Check,
  AlertCircle,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  MapPin as MapPinIcon,
  Globe as GlobeIcon,
  ShieldCheck,
  BadgeCheck,
  Fingerprint,
  Key,
  Lock,
  UserCheck,
  UserCog,
  Briefcase as BriefcaseIcon,
  GraduationCap,
  BookOpen,
  FileCheck as FileCheckIcon,
  Truck,
  Home,
  Building,
  Landmark,
  Users as UsersIcon,
  Award as AwardBadge,
  Trash2,
  Edit2,
  PlusCircle,
  MinusCircle,
  File,
  FilePlus,
  FileX,
  CheckCircle,
  AlertTriangle,
  FileImage,
  FileArchive,
  FileIcon,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useAuthStore } from "../../store/authStore";
import { api } from "../../services/app";

const ApostilleOfficerMyProfilePage = () => {
  const { user, token } = useAuthStore();
  const storage_url = import.meta.env.VITE_API_STORAGE_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showServiceRegionModal, setShowServiceRegionModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [countries, setCountries] = useState([]);
  // Profile address regions (kept separate from service region regions)
  const [regions, setRegions] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  
  // Service Region modal specific states
  const [serviceRegionRegions, setServiceRegionRegions] = useState([]);
  const [isLoadingServiceRegionRegions, setIsLoadingServiceRegionRegions] = useState(false);
  
  const fileInputRef = useRef(null);
  const documentFileInputRef = useRef(null);

  // Profile data
  const [profileData, setProfileData] = useState({
    id: null,
    user_id: null,
    professional_name: "",
    bar_registration_number: "",
    bar_council_name: "",
    law_firm_name: "",
    professional_bio: "",
    country_id: "",
    region_id: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    postal_code: "",
    years_of_experience: "",
    website: "",
    profile_photo: null,
    approval_status: "",
    is_available: false,
    is_active: true,
    user: {
      name: "",
      email: "",
      phone: "",
    },
    country: null,
    region: null,
    documents: [],
    service_regions: [],
  });

  // Document form data
  const [documentFormData, setDocumentFormData] = useState({
    document_type: "",
    document_number: "",
    document: null,
    expires_at: "",
    reviewer_notes: "",
  });
  const [documentFormErrors, setDocumentFormErrors] = useState({});

  // Service region form data
  const [serviceRegionFormData, setServiceRegionFormData] = useState({
    service_id: "",
    country_id: "",
    region_id: "",
    status: "active",
  });
  const [serviceRegionFormErrors, setServiceRegionFormErrors] = useState({});
  const [editingServiceRegion, setEditingServiceRegion] = useState(null);
  const [editingDocument, setEditingDocument] = useState(null);

  // Fetch profile data
  useEffect(() => {
    fetchProfile();
    fetchCountries();
    fetchServices();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/apostille-officer/profile");
      if (response.data.success) {
        setProfileData(response.data.data);
        if (response.data.data.country_id) {
          setSelectedCountryId(String(response.data.data.country_id));
          await fetchRegionsByCountry(response.data.data.country_id);
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setErrorMessage(error.message || "Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await api.get("/apostille-officer/countries");
      if (response.data.success) {
        setCountries(response.data.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  // Profile address region fetch (kept separate)
  const fetchRegionsByCountry = async (countryId) => {
    try {
      const response = await api.get(
        `/apostille-officer/countries/${countryId}`,
      );
      if (response.data.success) {
        setRegions(response.data.data.regions || []);
      }
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  };

  // Service Region modal region fetch (dedicated function)
  const fetchServiceRegionRegions = async (countryId) => {
    if (!countryId) {
      setServiceRegionRegions([]);
      return;
    }

    setIsLoadingServiceRegionRegions(true);
    try {
      const response = await api.get(
        `/apostille-officer/countries/${countryId}`,
      );
      if (response.data.success) {
        setServiceRegionRegions(response.data.data.regions || []);
      }
    } catch (error) {
      console.error("Error fetching service region regions:", error);
      setServiceRegionRegions([]);
    } finally {
      setIsLoadingServiceRegionRegions(false);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await api.get("/apostille-officer/services");
      if (response.data.success) {
        setServices(response.data.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleCountryChange = async (e) => {
    const countryId = e.target.value;
    setSelectedCountryId(countryId);
    setProfileData((prev) => ({
      ...prev,
      country_id: countryId,
      region_id: "",
    }));
    if (countryId) {
      await fetchRegionsByCountry(countryId);
    } else {
      setRegions([]);
    }
  };

  // Service Region country change handler (dedicated)
  const handleServiceRegionCountryChange = async (e) => {
    const countryId = e.target.value;
    
    // Update country
    setServiceRegionFormData((prev) => ({
      ...prev,
      country_id: countryId,
      region_id: "", // Clear region when country changes
    }));
    
    // Clear previous regions
    setServiceRegionRegions([]);
    
    // Fetch new regions
    if (countryId) {
      await fetchServiceRegionRegions(countryId);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData((prev) => ({ ...prev, profile_photo: file }));
    }
  };

  const handleDocumentChange = (e) => {
    const { name, value } = e.target;
    setDocumentFormData((prev) => ({ ...prev, [name]: value }));
    if (documentFormErrors[name]) {
      setDocumentFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDocumentFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocumentFormData((prev) => ({ ...prev, document: file }));
    }
  };

  const handleServiceRegionChange = (e) => {
    const { name, value } = e.target;
    setServiceRegionFormData((prev) => ({ ...prev, [name]: value }));
    if (serviceRegionFormErrors[name]) {
      setServiceRegionFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Submit profile update
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const formData = new FormData();
      const fields = [
        "professional_name",
        "bar_registration_number",
        "bar_council_name",
        "law_firm_name",
        "professional_bio",
        "country_id",
        "region_id",
        "address_line_1",
        "address_line_2",
        "city",
        "postal_code",
        "years_of_experience",
        "website",
        "is_available",
        "is_active",
      ];

      fields.forEach((field) => {
        if (profileData[field] !== undefined && profileData[field] !== null) {
          formData.append(field, profileData[field]);
        }
      });

      if (
        profileData.profile_photo &&
        typeof profileData.profile_photo !== "string"
      ) {
        formData.append("profile_photo", profileData.profile_photo);
      }

      const response = await api.post("/apostille-officer/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setSuccessMessage("Profile updated successfully!");
        await fetchProfile();
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to update profile",
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Submit document
  const handleDocumentSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("document_type", documentFormData.document_type);
      formData.append("document_number", documentFormData.document_number);
      formData.append("expires_at", documentFormData.expires_at);
      formData.append("reviewer_notes", documentFormData.reviewer_notes || "");
      if (documentFormData.document) {
        formData.append("document", documentFormData.document);
      }

      let response;
      if (editingDocument) {
        response = await api.put(
          `/apostille-officer/documents/${editingDocument.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
      } else {
        response = await api.post("/apostille-officer/documents", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response.data.success) {
        setSuccessMessage(
          editingDocument
            ? "Document updated successfully!"
            : "Document uploaded successfully!",
        );
        await fetchProfile();
        setShowDocumentModal(false);
        resetDocumentForm();
      }
    } catch (error) {
      console.error("Error saving document:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to save document",
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Submit service region
  const handleServiceRegionSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const payload = {
        service_id: parseInt(serviceRegionFormData.service_id),
        country_id: parseInt(serviceRegionFormData.country_id),
        region_id: serviceRegionFormData.region_id
          ? parseInt(serviceRegionFormData.region_id)
          : null,
        status: serviceRegionFormData.status,
      };

      let response;
      if (editingServiceRegion) {
        response = await api.put(
          `/apostille-officer/service-regions/${editingServiceRegion.id}`,
          payload,
        );
      } else {
        response = await api.post(
          "/apostille-officer/service-regions",
          payload,
        );
      }

      if (response.data.success) {
        setSuccessMessage(
          editingServiceRegion
            ? "Service region updated successfully!"
            : "Service region added successfully!",
        );
        await fetchProfile();
        setShowServiceRegionModal(false);
        resetServiceRegionForm();
      }
    } catch (error) {
      console.error("Error saving service region:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to save service region",
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Delete document
  const handleDeleteDocument = async (docId) => {
    if (!window.confirm("Are you sure you want to delete this document?"))
      return;

    try {
      const response = await api.delete(
        `/apostille-officer/documents/${docId}`,
      );
      if (response.data.success) {
        setSuccessMessage("Document deleted successfully!");
        await fetchProfile();
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      setErrorMessage(
        error?.message || "Failed to delete document",
      );
    }
  };

  // Delete service region
  const handleDeleteServiceRegion = async (srId) => {
    if (!window.confirm("Are you sure you want to remove this service region?"))
      return;

    try {
      const response = await api.delete(
        `/apostille-officer/service-regions/${srId}`,
      );
      if (response.data.success) {
        setSuccessMessage("Service region removed successfully!");
        await fetchProfile();
      }
    } catch (error) {
      console.error("Error deleting service region:", error);
      setErrorMessage(
        error?.message || "Failed to delete service region",
      );
    }
  };

  const resetDocumentForm = () => {
    setDocumentFormData({
      document_type: "",
      document_number: "",
      document: null,
      expires_at: "",
      reviewer_notes: "",
    });
    setEditingDocument(null);
    setDocumentFormErrors({});
  };

  const resetServiceRegionForm = () => {
    setServiceRegionFormData({
      service_id: "",
      country_id: "",
      region_id: "",
      status: "active",
    });
    setServiceRegionRegions([]); // Clear regions when form resets
    setEditingServiceRegion(null);
    setServiceRegionFormErrors({});
  };

  const handleEditDocument = (doc) => {
    setEditingDocument(doc);
    setDocumentFormData({
      document_type: doc.document_type || "",
      document_number: doc.document_number || "",
      document: null,
      expires_at: doc.expires_at ? doc.expires_at.split("T")[0] : "",
      reviewer_notes: doc.reviewer_notes || "",
    });
    setShowDocumentModal(true);
  };

  // Updated edit handler with proper region loading
  const handleEditServiceRegion = async (sr) => {
    setEditingServiceRegion(sr);
    
    // Set form data with country
    setServiceRegionFormData({
      service_id: String(sr.service_id || ""),
      country_id: String(sr.country_id || ""),
      region_id: "", // Temporarily empty
      status: sr.status || "active",
    });
    
    setShowServiceRegionModal(true);
    
    // Fetch regions for the country
    if (sr.country_id) {
      await fetchServiceRegionRegions(sr.country_id);
      
      // After regions are loaded, set the region_id
      setServiceRegionFormData((prev) => ({
        ...prev,
        region_id: String(sr.region_id || ""),
      }));
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusBadge = (status) => {
    const config = {
      active: {
        label: "Active",
        color: "#10B981",
        bg: "rgba(16, 185, 129, 0.1)",
      },
      pending: {
        label: "Pending",
        color: "#F59E0B",
        bg: "rgba(245, 158, 11, 0.1)",
      },
      under_review: {
        label: "Under Review",
        color: "#0F4C81",
        bg: "rgba(15, 76, 129, 0.1)",
      },
      approved: {
        label: "Approved",
        color: "#10B981",
        bg: "rgba(16, 185, 129, 0.1)",
      },
      rejected: {
        label: "Rejected",
        color: "#EF4444",
        bg: "rgba(239, 68, 68, 0.1)",
      },
      verified: {
        label: "Verified",
        color: "#10B981",
        bg: "rgba(16, 185, 129, 0.1)",
      },
    };
    const statusConfig = config[status] || config.pending;
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
        style={{
          background: statusConfig.bg,
          color: statusConfig.color,
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: statusConfig.color }}
        />
        {statusConfig.label}
      </span>
    );
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#F8FAFC" }}
      >
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0B1220] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[#64748B]">Loading profile...</p>
        </div>
      </div>
    );
  }

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
              <User className="w-6 h-6" style={{ color: "#0F4C81" }} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#0B1220]">
                My Profile
              </h1>
              <p className="text-sm text-[#64748B]">
                View and manage your professional profile
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #F4D03F)",
                  color: "#0B1220",
                  boxShadow: "0 4px 15px rgba(212, 175, 55, 0.3)",
                }}
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                  style={{ color: "#64748B" }}
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleProfileSubmit}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, #0F4C81, #1E6BB8)",
                  }}
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 text-center"
              style={{ border: "1px solid #E2E8F0" }}
            >
              <div className="relative inline-block">
                <div
                  className="w-28 h-28 rounded-full mx-auto flex items-center justify-center text-4xl font-bold text-white overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #0F4C81, #1E6BB8)",
                  }}
                >
                  {profileData.profile_photo ? (
                    typeof profileData.profile_photo === "string" ? (
                      <img
                        src={`${storage_url}${profileData.profile_photo}`}
                        alt={
                          profileData.professional_name ||
                          profileData.user?.name
                        }
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(profileData.profile_photo)}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    )
                  ) : (
                    getInitials(
                      profileData.professional_name || profileData.user?.name,
                    )
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-2 rounded-full text-white shadow-lg hover:scale-110 transition-transform"
                    style={{
                      background: "linear-gradient(135deg, #D4AF37, #F4D03F)",
                    }}
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoUpload}
                  className="hidden"
                />
              </div>

              <h2 className="text-xl font-bold mt-4 text-[#0B1220]">
                {profileData.professional_name || profileData.user?.name}
              </h2>
              <p className="text-sm text-[#0F4C81] font-medium">
                {profileData.approval_status === "approved"
                  ? "Verified Lawyer"
                  : "Lawyer"}
              </p>
              <div className="flex items-center justify-center gap-2 mt-1">
                {profileData.approval_status === "approved" ? (
                  <BadgeCheck className="w-4 h-4 text-[#10B981]" />
                ) : (
                  <Clock className="w-4 h-4 text-[#F59E0B]" />
                )}
                <span
                  className={`text-xs ${profileData.approval_status === "approved" ? "text-[#10B981]" : "text-[#F59E0B]"}`}
                >
                  {profileData.approval_status === "approved"
                    ? "Verified"
                    : "Pending Approval"}
                </span>
              </div>

              <div
                className="mt-4 pt-4 border-t"
                style={{ borderColor: "#E2E8F0" }}
              >
                <div className="flex items-center justify-center gap-6">
                  <div>
                    <p className="text-lg font-bold text-[#0B1220]">
                      {profileData.years_of_experience || 0}
                    </p>
                    <p className="text-xs text-[#64748B]">Years Exp</p>
                  </div>
                  <div
                    className="w-px h-10"
                    style={{ background: "#E2E8F0" }}
                  />
                  <div>
                    <p className="text-lg font-bold text-[#0F4C81]">
                      {profileData.documents?.length || 0}
                    </p>
                    <p className="text-xs text-[#64748B]">Documents</p>
                  </div>
                  <div
                    className="w-px h-10"
                    style={{ background: "#E2E8F0" }}
                  />
                  <div>
                    <p className="text-lg font-bold text-[#D4AF37]">
                      {profileData.service_regions?.length || 0}
                    </p>
                    <p className="text-xs text-[#64748B]">Services</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-left">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-[#94A3B8]" />
                  <span className="text-[#64748B]">
                    {profileData.user?.email}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-[#94A3B8]" />
                  <span className="text-[#64748B]">
                    {profileData.user?.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-[#94A3B8]" />
                  <span className="text-[#64748B]">
                    {profileData.city}, {profileData.country?.name || ""}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Building2 className="w-4 h-4 text-[#94A3B8]" />
                  <span className="text-[#64748B]">
                    {profileData.law_firm_name || "Independent"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full mt-4 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                style={{ color: "#0F4C81", border: "1px solid #E2E8F0" }}
              >
                Change Password
              </button>
            </motion.div>

            {/* Countries of Operation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white rounded-2xl p-6"
              style={{ border: "1px solid #E2E8F0" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-[#0B1220] flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#D4AF37]" />
                  Service Regions
                </h3>
                <button
                  onClick={() => {
                    resetServiceRegionForm();
                    setShowServiceRegionModal(true);
                  }}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  style={{ color: "#0F4C81" }}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {profileData.service_regions?.length > 0 ? (
                  profileData.service_regions.map((sr) => (
                    <div
                      key={sr.id}
                      className="flex items-center justify-between p-2 rounded-xl"
                      style={{ background: "#F8FAFC" }}
                    >
                      <div>
                        <p className="text-xs font-medium text-[#0B1220]">
                          {sr.service?.name || "N/A"}
                        </p>
                        <p className="text-[10px] text-[#64748B]">
                          {sr.country?.name || "N/A"}{" "}
                          {sr.region?.name ? `- ${sr.region.name}` : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {getStatusBadge(sr.status)}
                        <button
                          onClick={() => handleEditServiceRegion(sr)}
                          className="p-1 rounded hover:bg-gray-200 transition-colors"
                          style={{ color: "#64748B" }}
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteServiceRegion(sr.id)}
                          className="p-1 rounded hover:bg-red-50 transition-colors"
                          style={{ color: "#EF4444" }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#94A3B8] text-center py-4">
                    No service regions added yet
                  </p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6"
              style={{ border: "1px solid #E2E8F0" }}
            >
              <h3 className="text-sm font-semibold mb-3 text-[#0B1220]">
                About Me
              </h3>
              {isEditing ? (
                <textarea
                  name="professional_bio"
                  value={profileData.professional_bio || ""}
                  onChange={handleProfileChange}
                  rows="4"
                  className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none"
                  style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                />
              ) : (
                <p className="text-sm text-[#64748B] leading-relaxed">
                  {profileData.professional_bio || "No bio provided yet."}
                </p>
              )}
            </motion.div>

            {/* Professional Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="bg-white rounded-2xl p-6"
              style={{ border: "1px solid #E2E8F0" }}
            >
              <h3 className="text-sm font-semibold mb-4 text-[#0B1220] flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#D4AF37]" />
                Professional Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                    Professional Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="professional_name"
                      value={profileData.professional_name || ""}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                    />
                  ) : (
                    <p className="text-sm text-[#0B1220]">
                      {profileData.professional_name || "N/A"}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                    Bar Registration Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="bar_registration_number"
                      value={profileData.bar_registration_number || ""}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                    />
                  ) : (
                    <p className="text-sm text-[#0B1220]">
                      {profileData.bar_registration_number || "N/A"}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                    Bar Council Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="bar_council_name"
                      value={profileData.bar_council_name || ""}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                    />
                  ) : (
                    <p className="text-sm text-[#0B1220]">
                      {profileData.bar_council_name || "N/A"}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                    Law Firm Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="law_firm_name"
                      value={profileData.law_firm_name || ""}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                    />
                  ) : (
                    <p className="text-sm text-[#0B1220]">
                      {profileData.law_firm_name || "N/A"}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                    Years of Experience
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="years_of_experience"
                      value={profileData.years_of_experience || ""}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                    />
                  ) : (
                    <p className="text-sm text-[#0B1220]">
                      {profileData.years_of_experience || "0"} years
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                    Website
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="website"
                      value={profileData.website || ""}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                    />
                  ) : (
                    <p className="text-sm text-[#0F4C81]">
                      {profileData.website || "N/A"}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl p-6"
              style={{ border: "1px solid #E2E8F0" }}
            >
              <h3 className="text-sm font-semibold mb-4 text-[#0B1220] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                    Country
                  </label>
                  {isEditing ? (
                    <select
                      name="country_id"
                      value={profileData.country_id || ""}
                      onChange={handleCountryChange}
                      className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-sm text-[#0B1220]">
                      {profileData.country?.name || "N/A"}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                    Region
                  </label>
                  {isEditing ? (
                    <select
                      name="region_id"
                      value={profileData.region_id || ""}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                      disabled={!selectedCountryId}
                    >
                      <option value="">Select Region</option>
                      {regions.map((region) => (
                        <option key={region.id} value={region.id}>
                          {region.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-sm text-[#0B1220]">
                      {profileData.region?.name || "N/A"}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                    Address Line 1
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address_line_1"
                      value={profileData.address_line_1 || ""}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                    />
                  ) : (
                    <p className="text-sm text-[#0B1220]">
                      {profileData.address_line_1 || "N/A"}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                    Address Line 2
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address_line_2"
                      value={profileData.address_line_2 || ""}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                    />
                  ) : (
                    <p className="text-sm text-[#0B1220]">
                      {profileData.address_line_2 || "N/A"}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                    City
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="city"
                      value={profileData.city || ""}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                    />
                  ) : (
                    <p className="text-sm text-[#0B1220]">
                      {profileData.city || "N/A"}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                    Postal Code
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="postal_code"
                      value={profileData.postal_code || ""}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-sm"
                      style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                    />
                  ) : (
                    <p className="text-sm text-[#0B1220]">
                      {profileData.postal_code || "N/A"}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#94A3B8] mb-1">
                    Availability
                  </label>
                  {isEditing ? (
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="is_available"
                          checked={profileData.is_available || false}
                          onChange={handleProfileChange}
                          className="w-5 h-5 rounded border-gray-300 text-[#0F4C81] focus:ring-[#0F4C81]"
                        />
                        <label className="text-sm text-[#0B1220]">
                          Available for work
                        </label>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-[#0B1220]">
                      {profileData.is_available
                        ? "✅ Available"
                        : "❌ Not Available"}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Documents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="bg-white rounded-2xl p-6"
              style={{ border: "1px solid #E2E8F0" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-[#0B1220] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#D4AF37]" />
                  Documents
                </h3>
                <button
                  onClick={() => setShowDocumentModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37, #F4D03F)",
                    color: "#0B1220",
                  }}
                >
                  <Plus className="w-3.5 h-3.5" />
                  Upload
                </button>
              </div>
              <div className="space-y-3">
                {profileData.documents?.length > 0 ? (
                  profileData.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 rounded-xl"
                      style={{ background: "#F8FAFC" }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: "rgba(15, 76, 129, 0.08)" }}
                        >
                          <FileIcon
                            className="w-5 h-5"
                            style={{ color: "#EF4444" }}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate text-[#0B1220]">
                            {doc.file_name || doc.document_type}
                          </p>
                          <p className="text-xs text-[#64748B]">
                            {doc.document_type} • {doc.document_number || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(doc.verification_status || "pending")}
                        <button
                          onClick={() => handleEditDocument(doc)}
                          className="p-1 rounded hover:bg-gray-200 transition-colors"
                          style={{ color: "#64748B" }}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="p-1 rounded hover:bg-red-50 transition-colors"
                          style={{ color: "#EF4444" }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#94A3B8] text-center py-4">
                    No documents uploaded yet
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Document Modal */}
      <AnimatePresence>
        {showDocumentModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDocumentModal(false)}
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
                    {editingDocument ? "Edit Document" : "Upload Document"}
                  </h2>
                  <button
                    onClick={() => {
                      setShowDocumentModal(false);
                      resetDocumentForm();
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: "#64748B" }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleDocumentSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                        Document Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="document_type"
                        value={documentFormData.document_type}
                        onChange={handleDocumentChange}
                        className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                        style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                      >
                        <option value="">Select Type</option>

                        <option value="bar_certificate">Bar Certificate</option>
                        <option value="practising_certificate">
                          Practising Certificate
                        </option>
                        <option value="professional_license">
                          Professional License
                        </option>
                        <option value="government_id">Government ID</option>
                        <option value="passport">Passport</option>
                        <option value="proof_of_address">
                          Proof of Address
                        </option>
                        <option value="law_degree">Law Degree</option>
                        <option value="law_firm_registration">
                          Law Firm Registration
                        </option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                        Document Number
                      </label>
                      <input
                        type="text"
                        name="document_number"
                        value={documentFormData.document_number}
                        onChange={handleDocumentChange}
                        className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                        style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                        File <span className="text-red-500">*</span>
                      </label>
                      <div
                        className="p-4 rounded-xl text-center border-2 border-dashed cursor-pointer transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37]/5"
                        style={{ borderColor: "#E2E8F0" }}
                        onClick={() => documentFileInputRef.current?.click()}
                      >
                        <input
                          ref={documentFileInputRef}
                          type="file"
                          onChange={handleDocumentFileUpload}
                          className="hidden"
                        />
                        {documentFormData.document ? (
                          <div>
                            <FileIcon className="w-8 h-8 mx-auto mb-2 text-[#EF4444]" />
                            <p className="text-sm font-medium text-[#0B1220]">
                              {documentFormData.document.name}
                            </p>
                            <p className="text-xs text-[#94A3B8]">
                              {(documentFormData.document.size / 1024).toFixed(
                                2,
                              )}{" "}
                              KB
                            </p>
                          </div>
                        ) : (
                          <div>
                            <Upload className="w-8 h-8 mx-auto mb-2 text-[#94A3B8]" />
                            <p className="text-sm text-[#64748B]">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-[#94A3B8]">
                              PDF, JPG, PNG (Max 10MB)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                        Expires At
                      </label>
                      <input
                        type="date"
                        name="expires_at"
                        value={documentFormData.expires_at}
                        onChange={handleDocumentChange}
                        className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                        style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                        Reviewer Notes
                      </label>
                      <textarea
                        name="reviewer_notes"
                        value={documentFormData.reviewer_notes}
                        onChange={handleDocumentChange}
                        rows="2"
                        className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none"
                        style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                      />
                    </div>
                  </div>

                  <div
                    className="flex gap-3 mt-6 pt-4 border-t"
                    style={{ borderColor: "#E2E8F0" }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setShowDocumentModal(false);
                        resetDocumentForm();
                      }}
                      className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                      style={{ color: "#64748B" }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background: "linear-gradient(135deg, #D4AF37, #F4D03F)",
                        color: "#0B1220",
                      }}
                    >
                      {isSaving ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>{editingDocument ? "Update" : "Upload"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Service Region Modal */}
      <AnimatePresence>
        {showServiceRegionModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowServiceRegionModal(false)}
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
                    {editingServiceRegion
                      ? "Edit Service Region"
                      : "Add Service Region"}
                  </h2>
                  <button
                    onClick={() => {
                      setShowServiceRegionModal(false);
                      resetServiceRegionForm();
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: "#64748B" }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleServiceRegionSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                        Service <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="service_id"
                        value={serviceRegionFormData.service_id}
                        onChange={handleServiceRegionChange}
                        className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                        style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                      >
                        <option value="">Select Service</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="country_id"
                        value={serviceRegionFormData.country_id}
                        onChange={handleServiceRegionCountryChange}
                        className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                        style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                      >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                        Region
                      </label>
                      <select
                        name="region_id"
                        value={serviceRegionFormData.region_id}
                        onChange={handleServiceRegionChange}
                        className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                        style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                        disabled={
                          !serviceRegionFormData.country_id ||
                          isLoadingServiceRegionRegions
                        }
                      >
                        <option value="">
                          {!serviceRegionFormData.country_id
                            ? "Select Country First"
                            : isLoadingServiceRegionRegions
                              ? "Loading regions..."
                              : serviceRegionRegions.length === 0
                                ? "No regions available"
                                : "Select Region"}
                        </option>
                        {serviceRegionRegions.map((region) => (
                          <option key={region.id} value={region.id}>
                            {region.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                        Status
                      </label>
                      <select
                        name="status"
                        value={serviceRegionFormData.status}
                        onChange={handleServiceRegionChange}
                        className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                        style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div
                    className="flex gap-3 mt-6 pt-4 border-t"
                    style={{ borderColor: "#E2E8F0" }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setShowServiceRegionModal(false);
                        resetServiceRegionForm();
                      }}
                      className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                      style={{ color: "#64748B" }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background: "linear-gradient(135deg, #D4AF37, #F4D03F)",
                        color: "#0B1220",
                      }}
                    >
                      {isSaving ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{editingServiceRegion ? "Update" : "Add"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPasswordModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#0B1220]">
                    Change Password
                  </h2>
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: "#64748B" }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                      Current Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Enter current password"
                        className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                        style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                      />
                      <Lock className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                      New Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                        style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                      />
                      <Key className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                      Confirm New Password{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                        style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                      />
                      <CheckCircle2 className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                    </div>
                  </div>
                </div>

                <div
                  className="flex gap-3 mt-6 pt-4 border-t"
                  style={{ borderColor: "#E2E8F0" }}
                >
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: "#64748B" }}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #0F4C81, #1E6BB8)",
                      color: "white",
                    }}
                  >
                    <Check className="w-4 h-4" />
                    Update Password
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

export default ApostilleOfficerMyProfilePage;