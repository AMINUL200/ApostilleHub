import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  X,
  Check,
  AlertCircle,
  CheckCircle2,
  Package,
  Clock,
  DollarSign,
  FileCheck,
  Shield,
  UploadCloud,
  File,
  FilePlus,
  Trash2,
  Eye,
  Download,
  RefreshCw,
  Image,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  AlertTriangle,
  Info,
  ChevronRight,
  Calendar,
  User,
  Building2,
  Globe,
  Plus,
  MapPin,
  Briefcase,
  Users,
  Star,
  Award,
  ChevronDown,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  CreditCard,
  Wallet,
  Banknote,
  Landmark,
  Zap,
  Timer,
  CheckCircle,
  ArrowRight,
  ShoppingBag,
  Receipt,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { api } from "../../services/app";
import { useAuthStore } from "../../store/authStore";

// Processing options
const processingOptions = [
  {
    id: "standard",
    label: "Standard Processing",
    days: "5-7 Business Days",
    price: 149.0,
    icon: Clock,
    color: "#0F4C81",
  },
  {
    id: "express",
    label: "Express Processing",
    days: "2-3 Business Days",
    price: 249.0,
    icon: Zap,
    color: "#D4AF37",
  },
  {
    id: "urgent",
    label: "Urgent Processing",
    days: "Same Day (24hrs)",
    price: 399.0,
    icon: Timer,
    color: "#EF4444",
  },
];

// Payment methods
const paymentMethods = [
  {
    id: "credit_card",
    label: "Credit Card",
    icon: CreditCard,
    color: "#0F4C81",
  },
  { id: "debit_card", label: "Debit Card", icon: Wallet, color: "#10B981" },
  { id: "paypal", label: "PayPal", icon: CreditCard, color: "#0070BA" },
  {
    id: "bank_transfer",
    label: "Bank Transfer",
    icon: Landmark,
    color: "#8B5CF6",
  },
];

const CustomerUploadDocument = () => {
  const { user } = useAuthStore();

  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    "Service Selection",
    "Upload Documents",
    "Review & Confirm",
    "Payment",
  ];

  // Data states
  const [services, setServices] = useState([]);
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [documentRequirements, setDocumentRequirements] = useState([]);

  // Selection states
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [selectedProcessing, setSelectedProcessing] = useState("standard");
  const [selectedPayment, setSelectedPayment] = useState("credit_card");

  // Document states
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Loading states
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [isLoadingRegions, setIsLoadingRegions] = useState(false);
  const [isLoadingLawyers, setIsLoadingLawyers] = useState(false);
  const [isLoadingRequirements, setIsLoadingRequirements] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    description: "",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Success state
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const fileInputRef = useRef(null);

  // Fetch services on mount
  useEffect(() => {
    fetchServices();
    fetchCountries();
  }, []);

  // Fetch document requirements when service changes
  useEffect(() => {
    if (selectedService) {
      fetchDocumentRequirements(selectedService.id);
    }
  }, [selectedService]);

  // Fetch regions when country changes
  useEffect(() => {
    if (selectedCountry) {
      fetchRegions(selectedCountry.id);
    } else {
      setRegions([]);
    }
  }, [selectedCountry]);

  // Fetch lawyers when service and country change
  useEffect(() => {
    if (selectedService && selectedCountry) {
      fetchLawyers(selectedService.id, selectedCountry.id);
    } else {
      setLawyers([]);
    }
  }, [selectedService, selectedCountry]);

  // API Calls
  const fetchServices = async () => {
    setIsLoadingServices(true);
    try {
      const response = await api.get("/customer/services");
      if (response.data.success) {
        const data = response.data.data.data || response.data.data || [];
        setServices(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]);
    } finally {
      setIsLoadingServices(false);
    }
  };

  const fetchCountries = async () => {
    setIsLoadingCountries(true);
    try {
      const response = await api.get("/customer/countries");
      if (response.data.success) {
        const data = response.data.data || [];
        setCountries(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
      setCountries([]);
    } finally {
      setIsLoadingCountries(false);
    }
  };

  const fetchRegions = async (countryId) => {
    setIsLoadingRegions(true);
    try {
      const response = await api.get(
        `/customer/countries/${countryId}/regions`,
      );
      if (response.data.success) {
        const data = response.data.data || [];
        setRegions(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching regions:", error);
      setRegions([]);
    } finally {
      setIsLoadingRegions(false);
    }
  };

  const fetchDocumentRequirements = async (serviceId) => {
    setIsLoadingRequirements(true);
    try {
      const response = await api.get(`/customer/services/${serviceId}`);
      if (response.data.success) {
        const data = response.data.data.document_requirements || [];
        setDocumentRequirements(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching document requirements:", error);
      setDocumentRequirements([]);
    } finally {
      setIsLoadingRequirements(false);
    }
  };

  const fetchLawyers = async (serviceId, countryId) => {
    setIsLoadingLawyers(true);
    try {
      const response = await api.get(
        `/customer/lawyers?service_id=${serviceId}&country_id=${countryId}`,
      );
      console.log("Lawyers response:", response.data);
      console.log(
        "api ::",
        `/customer/lawyers?service_id=${serviceId}&country_id=${countryId}`,
      );
      if (response.data.success) {
        // Access the nested data correctly
        const lawyersData = response.data.data.data || [];
        setLawyers(Array.isArray(lawyersData) ? lawyersData : []);
      } else {
        setLawyers([]);
      }
    } catch (error) {
      console.error("Error fetching lawyers:", error);
      setLawyers([]);
    } finally {
      setIsLoadingLawyers(false);
    }
  };

  // Handle file drop
  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: "pending",
      preview: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    setUploadError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxSize: 10485760,
    multiple: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const validateStep = () => {
    const errors = {};
    if (currentStep === 1) {
      if (!selectedService) errors.service = "Please select a service";
      if (!selectedCountry) errors.country = "Please select a country";
      if (!selectedLawyer) errors.lawyer = "Please select a lawyer";
    } else if (currentStep === 2) {
      if (files.length === 0)
        errors.files = "Please upload at least one document";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      clearInterval(interval);
      setUploadProgress(100);
      setUploadComplete(true);
      setOrderComplete(true);
      setOrderId("APS-" + String(Math.floor(10000 + Math.random() * 90000)));
      setIsUploading(false);
    } catch (error) {
      clearInterval(interval);
      setUploadError("Failed to process your order. Please try again.");
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (filename) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    const iconMap = {
      pdf: FileImage,
      jpg: FileImage,
      jpeg: FileImage,
      png: FileImage,
      doc: FileText,
      docx: FileText,
    };
    const Icon = iconMap[ext] || File;
    return Icon;
  };

  const getFileColor = (filename) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    const colorMap = {
      pdf: "#EF4444",
      jpg: "#8B5CF6",
      jpeg: "#8B5CF6",
      png: "#8B5CF6",
      doc: "#3B82F6",
      docx: "#3B82F6",
    };
    return colorMap[ext] || "#64748B";
  };

  const getProcessingOption = (id) => {
    return processingOptions.find((p) => p.id === id) || processingOptions[0];
  };

  const selectedProcessingOption = getProcessingOption(selectedProcessing);

  const getTotalPrice = () => {
    return selectedProcessingOption ? selectedProcessingOption.price : 0;
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
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-8 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="p-2.5 rounded-xl"
              style={{ background: "rgba(11, 18, 32, 0.1)" }}
            >
              <Upload className="w-6 h-6" style={{ color: "#0B1220" }} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#0B1220]">
                Submit Documents
              </h1>
              <p className="text-sm text-[#64748B]">
                Complete the process to get your documents apostilled
              </p>
            </div>
          </div>
        </motion.div>

        {/* Steps Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between relative">
            <div
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1"
              style={{ background: "#E2E8F0" }}
            >
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                  background: "linear-gradient(90deg, #D4AF37, #F4D03F)",
                }}
              />
            </div>
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              const isCompleted = stepNumber < currentStep;
              const isUpcoming = stepNumber > currentStep;

              return (
                <div
                  key={index}
                  className="relative z-10 flex flex-col items-center"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "text-[#0B1220] shadow-lg"
                        : isCompleted
                          ? "text-white"
                          : "text-gray-400"
                    }`}
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, #D4AF37, #F4D03F)"
                        : isCompleted
                          ? "#10B981"
                          : "white",
                      border: isActive
                        ? "none"
                        : isCompleted
                          ? "none"
                          : "2px solid #E2E8F0",
                      boxShadow: isActive
                        ? "0 4px 20px rgba(212, 175, 55, 0.3)"
                        : "none",
                    }}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium ${
                      isActive
                        ? "text-[#0B1220]"
                        : isCompleted
                          ? "text-[#10B981]"
                          : "text-[#94A3B8]"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Select Service */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                      Select Service <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                      <select
                        value={selectedService?.id || ""}
                        onChange={(e) => {
                          const service = services.find(
                            (s) => s.id === parseInt(e.target.value),
                          );
                          setSelectedService(service || null);
                          setSelectedLawyer(null);
                        }}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all appearance-none"
                        style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                        disabled={isLoadingServices}
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {formErrors.service && (
                      <p className="mt-1 text-xs text-red-500">
                        {formErrors.service}
                      </p>
                    )}
                  </div>

                  {/* Select Country */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                      Select Country <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                      <select
                        value={selectedCountry?.id || ""}
                        onChange={(e) => {
                          const country = countries.find(
                            (c) => c.id === parseInt(e.target.value),
                          );
                          setSelectedCountry(country || null);
                          setSelectedRegion(null);
                          setSelectedLawyer(null);
                        }}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all appearance-none"
                        style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                        disabled={isLoadingCountries}
                      >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {formErrors.country && (
                      <p className="mt-1 text-xs text-red-500">
                        {formErrors.country}
                      </p>
                    )}
                  </div>
                </div>

                {/* Select Region (Optional) */}
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                    Select Region (Optional)
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                    <select
                      value={selectedRegion?.id || ""}
                      onChange={(e) => {
                        const region = regions.find(
                          (r) => r.id === parseInt(e.target.value),
                        );
                        setSelectedRegion(region || null);
                      }}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all appearance-none"
                      style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                      disabled={!selectedCountry || isLoadingRegions}
                    >
                      <option value="">
                        {!selectedCountry
                          ? "Select country first"
                          : "Select a region (optional)"}
                      </option>
                      {regions.map((region) => (
                        <option key={region.id} value={region.id}>
                          {region.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Select Lawyer */}
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                    Select Lawyer <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                    <select
                      value={selectedLawyer?.id || ""}
                      onChange={(e) => {
                        const lawyer = lawyers.find(
                          (l) => l.id === parseInt(e.target.value),
                        );
                        setSelectedLawyer(lawyer || null);
                      }}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all appearance-none"
                      style={{ borderColor: "#E2E8F0", color: "#0B1220" }}
                      disabled={
                        !selectedService ||
                        !selectedCountry ||
                        isLoadingLawyers ||
                        lawyers.length === 0
                      }
                    >
                      <option value="">
                        {!selectedService || !selectedCountry
                          ? "Select service and country first"
                          : isLoadingLawyers
                            ? "Loading lawyers..."
                            : lawyers.length === 0
                              ? "No lawyers available"
                              : "Select a lawyer"}
                      </option>
                      {console.log("Lawyers array:", lawyers[0])}
                      {Array.isArray(lawyers) &&
                        lawyers.map((lawyer) => (
                          <option key={lawyer.id} value={lawyer.id}>
                            {lawyer?.lawyer_profile?.professional_name ||
                              lawyer?.user?.name ||
                              "Lawyer"}
                            {lawyer?.lawyer_profile?.law_firm_name
                              ? ` - ${lawyer.lawyer_profile?.law_firm_name}`
                              : ""}
                          </option>
                        ))}
                    </select>
                  </div>
                  {formErrors.lawyer && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.lawyer}
                    </p>
                  )}
                </div>

                {/* Document Requirements Preview */}
                {selectedService && documentRequirements.length > 0 && (
                  <div
                    className="rounded-2xl p-4"
                    style={{
                      background: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    <h4 className="text-sm font-semibold mb-3 text-[#0B1220] flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-[#D4AF37]" />
                      Required Documents for {selectedService.name}
                    </h4>
                    <div className="space-y-2">
                      {documentRequirements.map((req) => (
                        <div
                          key={req.id}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                          <span style={{ color: "#64748B" }}>{req.title}</span>
                          {req.is_required && (
                            <span className="text-xs text-red-500">
                              *Required
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Upload Documents */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Document Upload Area */}
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: "white",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  <h2 className="text-lg font-bold mb-4 text-[#0B1220]">
                    Upload Documents
                  </h2>

                  {/* Dropzone */}
                  <div
                    {...getRootProps()}
                    className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 cursor-pointer ${
                      isDragActive
                        ? "border-[#D4AF37] bg-[#D4AF37]/5"
                        : "border-gray-300 hover:border-[#D4AF37] hover:bg-gray-50"
                    } ${files.length > 0 ? "pb-4" : "py-12"}`}
                  >
                    <input {...getInputProps()} />

                    {files.length === 0 ? (
                      <div className="text-center">
                        <div
                          className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                          style={{ background: "rgba(11, 18, 32, 0.05)" }}
                        >
                          <UploadCloud
                            className="w-8 h-8"
                            style={{ color: "#94A3B8" }}
                          />
                        </div>
                        <p className="text-sm font-medium text-[#0B1220]">
                          Drag & drop your documents here
                        </p>
                        <p className="text-xs mt-1 text-[#94A3B8]">
                          or click to browse files
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 mt-3">
                          {["PDF", "JPG", "PNG", "DOC", "DOCX"].map(
                            (format) => (
                              <span
                                key={format}
                                className="px-2 py-0.5 rounded text-[10px] font-medium"
                                style={{
                                  background: "rgba(11, 18, 32, 0.05)",
                                  color: "#64748B",
                                }}
                              >
                                {format}
                              </span>
                            ),
                          )}
                        </div>
                        <p className="text-xs mt-2 text-[#94A3B8]">
                          Max file size: 10MB per document
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-medium mb-3 text-[#0B1220]">
                          {files.length} file{files.length > 1 ? "s" : ""}{" "}
                          selected
                        </p>
                        <button
                          type="button"
                          className="text-xs font-medium transition-colors hover:underline text-[#D4AF37]"
                          onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                          }}
                        >
                          <Plus className="w-3 h-3 inline mr-1" />
                          Add more files
                        </button>
                      </div>
                    )}
                  </div>

                  {/* File List */}
                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {files.map((file) => {
                        const FileIcon = getFileIcon(file.name);
                        const color = getFileColor(file.name);
                        return (
                          <div
                            key={file.id}
                            className="flex items-center justify-between p-3 rounded-xl"
                            style={{
                              background: "#F8FAFC",
                              border: "1px solid #E2E8F0",
                            }}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ background: `${color}15` }}
                              >
                                <FileIcon
                                  className="w-5 h-5"
                                  style={{ color }}
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate text-[#0B1220]">
                                  {file.name}
                                </p>
                                <p className="text-xs text-[#94A3B8]">
                                  {formatFileSize(file.size)}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(file.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-[#94A3B8] hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {formErrors.files && (
                    <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.files}
                    </p>
                  )}

                  {/* Additional Notes */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-1.5 text-[#0B1220]">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Add any special instructions or notes..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none"
                      style={{ color: "#0B1220" }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review & Confirm */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Order Summary */}
                  <div
                    className="rounded-2xl p-6"
                    style={{ background: "white", border: "1px solid #E2E8F0" }}
                  >
                    <h3 className="text-lg font-bold mb-4 text-[#0B1220] flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                      Order Summary
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-[#64748B]">Service</span>
                        <span className="text-sm font-medium text-[#0B1220]">
                          {selectedService?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-[#64748B]">Country</span>
                        <span className="text-sm font-medium text-[#0B1220]">
                          {selectedCountry?.name}
                        </span>
                      </div>
                      {selectedRegion && (
                        <div className="flex justify-between">
                          <span className="text-sm text-[#64748B]">Region</span>
                          <span className="text-sm font-medium text-[#0B1220]">
                            {selectedRegion?.name}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm text-[#64748B]">Lawyer</span>
                        <span className="text-sm font-medium text-[#0B1220]">
                          {selectedLawyer?.professional_name ||
                            selectedLawyer?.user?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-[#64748B]">
                          Documents
                        </span>
                        <span className="text-sm font-medium text-[#0B1220]">
                          {files.length} files
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Processing Options */}
                  <div
                    className="rounded-2xl p-6"
                    style={{ background: "white", border: "1px solid #E2E8F0" }}
                  >
                    <h3 className="text-lg font-bold mb-4 text-[#0B1220] flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#D4AF37]" />
                      Processing Speed
                    </h3>
                    <div className="space-y-3">
                      {processingOptions.map((option) => {
                        const Icon = option.icon;
                        const isSelected = selectedProcessing === option.id;
                        return (
                          <button
                            key={option.id}
                            onClick={() => setSelectedProcessing(option.id)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                              isSelected
                                ? "border-2"
                                : "border hover:border-[#D4AF37]"
                            }`}
                            style={{
                              borderColor: isSelected
                                ? option.color
                                : "#E2E8F0",
                              background: isSelected
                                ? `${option.color}08`
                                : "transparent",
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: `${option.color}15` }}
                              >
                                <Icon
                                  className="w-5 h-5"
                                  style={{ color: option.color }}
                                />
                              </div>
                              <div className="text-left">
                                <p className="text-sm font-medium text-[#0B1220]">
                                  {option.label}
                                </p>
                                <p className="text-xs text-[#64748B]">
                                  {option.days}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-[#0B1220]">
                                £{option.price}
                              </p>
                              {isSelected && (
                                <CheckCircle2 className="w-4 h-4 text-[#10B981] ml-auto" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Total Price */}
                <div
                  className="rounded-2xl p-6"
                  style={{ background: "white", border: "1px solid #E2E8F0" }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#0B1220]">
                        Total Amount
                      </p>
                      <p className="text-xs text-[#64748B]">Including VAT</p>
                    </div>
                    <p className="text-3xl font-bold text-[#0F4C81]">
                      £{getTotalPrice().toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && (
              <div className="space-y-6">
                {!orderComplete ? (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Payment Methods */}
                      <div
                        className="rounded-2xl p-6"
                        style={{
                          background: "white",
                          border: "1px solid #E2E8F0",
                        }}
                      >
                        <h3 className="text-lg font-bold mb-4 text-[#0B1220] flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                          Payment Method
                        </h3>
                        <div className="space-y-3">
                          {paymentMethods.map((method) => {
                            const Icon = method.icon;
                            const isSelected = selectedPayment === method.id;
                            return (
                              <button
                                key={method.id}
                                onClick={() => setSelectedPayment(method.id)}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                                  isSelected
                                    ? "border-2"
                                    : "border hover:border-[#D4AF37]"
                                }`}
                                style={{
                                  borderColor: isSelected
                                    ? method.color
                                    : "#E2E8F0",
                                  background: isSelected
                                    ? `${method.color}08`
                                    : "transparent",
                                }}
                              >
                                <Icon
                                  className="w-5 h-5"
                                  style={{ color: method.color }}
                                />
                                <span className="text-sm font-medium text-[#0B1220]">
                                  {method.label}
                                </span>
                                {isSelected && (
                                  <CheckCircle2 className="w-4 h-4 text-[#10B981] ml-auto" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Payment Summary */}
                      <div
                        className="rounded-2xl p-6"
                        style={{
                          background: "white",
                          border: "1px solid #E2E8F0",
                        }}
                      >
                        <h3 className="text-lg font-bold mb-4 text-[#0B1220] flex items-center gap-2">
                          <Receipt className="w-5 h-5 text-[#D4AF37]" />
                          Payment Summary
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-[#64748B]">
                              Service Fee
                            </span>
                            <span className="text-sm font-medium text-[#0B1220]">
                              £{getTotalPrice().toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-[#64748B]">
                              VAT (20%)
                            </span>
                            <span className="text-sm font-medium text-[#0B1220]">
                              £{(getTotalPrice() * 0.2).toFixed(2)}
                            </span>
                          </div>
                          <div
                            className="flex justify-between pt-3 border-t"
                            style={{ borderColor: "#E2E8F0" }}
                          >
                            <span className="text-sm font-bold text-[#0B1220]">
                              Total
                            </span>
                            <span className="text-lg font-bold text-[#0F4C81]">
                              £{getTotalPrice().toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div
                          className="mt-4 p-3 rounded-xl flex items-start gap-2"
                          style={{ background: "#F8FAFC" }}
                        >
                          <ShieldCheck className="w-4 h-4 text-[#10B981] mt-0.5" />
                          <p className="text-xs text-[#64748B]">
                            Your payment is secure and encrypted. We do not
                            store your payment details.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Upload Progress */}
                    {isUploading && (
                      <div
                        className="rounded-2xl p-4"
                        style={{
                          background: "white",
                          border: "1px solid #E2E8F0",
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-[#0B1220]">
                            Processing your order...
                          </span>
                          <span className="text-sm text-[#64748B]">
                            {uploadProgress}%
                          </span>
                        </div>
                        <div
                          className="w-full h-2 rounded-full"
                          style={{ background: "#E2E8F0" }}
                        >
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${uploadProgress}%`,
                              background:
                                "linear-gradient(90deg, #D4AF37, #F4D03F)",
                            }}
                          />
                        </div>
                        <p className="text-xs mt-2 text-[#94A3B8]">
                          Please don't close this page while processing
                        </p>
                      </div>
                    )}

                    {uploadError && (
                      <div
                        className="rounded-2xl p-4 flex items-start gap-3"
                        style={{
                          background: "rgba(239, 68, 68, 0.08)",
                          border: "1px solid rgba(239, 68, 68, 0.2)",
                        }}
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#EF4444]" />
                        <div>
                          <p className="text-sm font-medium text-[#EF4444]">
                            {uploadError}
                          </p>
                          <p className="text-xs text-[#64748B]">
                            Please try again or contact support.
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  // Order Complete
                  <div className="text-center py-12">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: "rgba(16, 185, 129, 0.1)" }}
                    >
                      <CheckCircle2 className="w-12 h-12 text-[#10B981]" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-[#0B1220]">
                      Order Placed Successfully!
                    </h2>
                    <p className="text-sm text-[#64748B] mb-4">
                      Your order has been submitted and is being processed.
                    </p>
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl"
                      style={{
                        background: "#F8FAFC",
                        border: "1px solid #E2E8F0",
                      }}
                    >
                      <span className="text-sm text-[#64748B]">Order ID:</span>
                      <span className="text-sm font-bold text-[#0F4C81]">
                        {orderId}
                      </span>
                    </div>
                    <div className="mt-6 flex justify-center gap-4">
                      <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                        style={{
                          background:
                            "linear-gradient(135deg, #D4AF37, #F4D03F)",
                          color: "#0B1220",
                        }}
                      >
                        Create New Order
                      </button>
                      <button
                        className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                        style={{
                          background: "white",
                          color: "#0B1220",
                          border: "1px solid #E2E8F0",
                        }}
                      >
                        Track Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {!orderComplete && (
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                onClick={handlePrevious}
                disabled={isUploading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: "white",
                  color: "#0B1220",
                  border: "1px solid #E2E8F0",
                }}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
            )}
            <div className="flex-1" />
            {currentStep < steps.length ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #F4D03F)",
                  color: "#0B1220",
                  boxShadow: "0 4px 15px rgba(212, 175, 55, 0.3)",
                }}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isUploading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: isUploading
                    ? "#94A3B8"
                    : "linear-gradient(135deg, #10B981, #059669)",
                  boxShadow: isUploading
                    ? "none"
                    : "0 4px 15px rgba(16, 185, 129, 0.3)",
                }}
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Confirm & Pay
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerUploadDocument;
