import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, ArrowLeft, ShieldCheck, User, Briefcase, Users, Building2, UserCog, Eye, CheckCircle2 } from "lucide-react";
import CustomInput from "../../component/form/CustomInput";
import { useAuthStore } from "../../store/authStore";
import { api } from "../../services/app";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    user_type: "customer",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // User type options
  const userTypes = [
    { value: "customer", label: "Customer", icon: User, description: "Create and manage document legalisation orders" },
    { value: "apostille-officer", label: "Apostille Officer", icon: ShieldCheck, description: "Verify and process documents" },
    // { value: "staff", label: "Staff Member", icon: Users, description: "Manage daily operations and support" },
    // { value: "lawyer", label: "Legal Professional", icon: Briefcase, description: "Manage legal cases and documents" },
    // { value: "organization", label: "Organization", icon: Building2, description: "Corporate and business accounts" },
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle user type selection
  const handleUserTypeSelect = (value) => {
    setFormData((prev) => ({
      ...prev,
      user_type: value,
    }));
    if (errors.user_type) {
      setErrors((prev) => ({
        ...prev,
        user_type: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.user_type) {
      newErrors.user_type = "Please select an account type";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.password_confirmation) {
      newErrors.password_confirmation = "Please confirm your password";
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match";
    }

    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { strength: 0, label: "", color: "" },
      { strength: 1, label: "Weak", color: "#EF4444" },
      { strength: 2, label: "Fair", color: "#F59E0B" },
      { strength: 3, label: "Good", color: "#D4AF37" },
      { strength: 4, label: "Strong", color: "#10B981" },
      { strength: 5, label: "Very Strong", color: "#0F4C81" },
    ];

    return levels[strength];
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        user_type: formData.user_type,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      };

      const response = await api.post("/register", payload);

      if (response.data.success) {
        const { user, token } = response.data.data;
        
        // Store user data in Zustand
        login(user, token);
        
        setRegisterSuccess(true);
        
        // Redirect based on user type
        setTimeout(() => {
          const role = user.roles && user.roles[0]?.slug;
          if (role === "apostille-officer") {
            navigate("/apostille-officer");
          } else if (role === "customer") {
            navigate("/dashboard");
          } else if (role === "lawyer") {
            navigate("/lawyer/dashboard");
          } else if (role === "super-admin" || role === "administrator") {
            navigate("/admin/dashboard");
          } else {
            navigate("/customer/dashboard");
          }
        }, 2000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      
      // Handle validation errors from API
      if (error.response?.data?.errors) {
        const apiErrors = error.response.data.errors;
        const formattedErrors = {};
        Object.keys(apiErrors).forEach((key) => {
          formattedErrors[key] = apiErrors[key][0];
        });
        setErrors(formattedErrors);
      } else {
        setErrors({
          general: error.response?.data?.message || "Registration failed. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const errorClass = (field) =>
    errors[field]
      ? "border-[#EF4444] focus:ring-[#EF4444]/20 focus:border-[#EF4444]"
      : "focus:border-[#D4AF37]";

  return (
    <div
      className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "#F8FAFC" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(212,175,55,0.14)" }} />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(15,76,129,0.07)" }}
        />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(15,76,129,0.14)" }} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" preserveAspectRatio="none" viewBox="0 0 1440 900">
          <defs>
            <pattern id="registerGuilloche" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M0,60 Q30,0 60,60 T120,60" fill="none" stroke="#0F4C81" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1440" height="900" fill="url(#registerGuilloche)" />
        </svg>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center space-x-2 transition-colors group"
          style={{ color: "#64748B" }}
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </button>

        {/* Register Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl p-8"
          style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}
        >
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-5">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #D4AF37, #F4D03F)", boxShadow: "0 10px 26px rgba(212,175,55,0.35)" }}
              >
                <ShieldCheck size={28} strokeWidth={1.75} style={{ color: "#0B1220" }} />
              </div>
            </div>
            <h2 className="text-3xl font-semibold mb-2" style={{ fontFamily: "'Fraunces', serif", color: "#0F172A" }}>
              Create your account
            </h2>
            <p className="text-sm" style={{ color: "#64748B" }}>
              Join{" "}
              <span style={{ color: "#0F4C81", fontWeight: 600 }}>ApostilleHub</span> to start
              your document legalisation journey
            </p>
          </div>

          {/* Success Message */}
          {registerSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl flex items-start gap-3"
              style={{
                background: "rgba(16, 185, 129, 0.08)",
                border: "1px solid rgba(16, 185, 129, 0.2)",
              }}
            >
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#10B981" }} />
              <div>
                <p className="text-sm font-medium" style={{ color: "#10B981" }}>
                  Registration successful!
                </p>
                <p className="text-xs" style={{ color: "#64748B" }}>
                  Redirecting to dashboard...
                </p>
              </div>
            </motion.div>
          )}

          {/* General Error */}
          {errors.general && (
            <div
              className="mb-6 p-4 rounded-xl flex items-start gap-3"
              style={{
                background: "rgba(239, 68, 68, 0.08)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
              }}
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#EF4444" }} />
              <div>
                <p className="text-sm font-medium" style={{ color: "#EF4444" }}>
                  {errors.general}
                </p>
              </div>
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#0F172A" }}>
                Account Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {userTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = formData.user_type === type.value;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleUserTypeSelect(type.value)}
                      className={`p-3 rounded-xl text-left transition-all duration-200 ${
                        isSelected
                          ? "border-2 border-[#D4AF37] bg-[#D4AF37]/5"
                          : "border border-[#E2E8F0] hover:border-[#D4AF37]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isSelected ? "bg-[#D4AF37] text-white" : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className={`text-xs font-medium ${isSelected ? "text-[#0F4C81]" : "text-[#0F172A]"}`}>
                            {type.label}
                          </p>
                          <p className="text-[10px] text-[#94A3B8] hidden sm:block">
                            {type.description}
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="mt-1">
                          <span className="text-[10px] font-medium text-[#D4AF37]">Selected</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              {errors.user_type && (
                <p className="mt-2 text-sm flex items-center" style={{ color: "#EF4444" }}>
                  <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: "#EF4444" }} />
                  {errors.user_type}
                </p>
              )}
            </div>

            {/* Full Name Field */}
            <div>
              <CustomInput
                label="Full Name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={errorClass("name")}
              />
              {errors.name && (
                <p className="mt-2 text-sm flex items-center" style={{ color: "#EF4444" }}>
                  <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: "#EF4444" }} />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <CustomInput
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={errorClass("email")}
              />
              {errors.email && (
                <p className="mt-2 text-sm flex items-center" style={{ color: "#EF4444" }}>
                  <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: "#EF4444" }} />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <CustomInput
                label="Phone Number"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+447000000000"
                className={errorClass("phone")}
              />
              {errors.phone && (
                <p className="mt-2 text-sm flex items-center" style={{ color: "#EF4444" }}>
                  <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: "#EF4444" }} />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <CustomInput
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className={errorClass("password")}
                icon={<Lock className="w-5 h-5" style={{ color: "#94A3B8" }} />}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: "#94A3B8" }}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#E2E8F0" }}>
                      <div
                        className="h-full transition-all duration-300 rounded-full"
                        style={{ width: `${(passwordStrength.strength / 5) * 100}%`, background: passwordStrength.color }}
                      />
                    </div>
                    <span className="text-xs font-medium" style={{ color: "#64748B" }}>
                      {passwordStrength.label}
                    </span>
                  </div>
                </div>
              )}

              {errors.password && (
                <p className="mt-2 text-sm flex items-center" style={{ color: "#EF4444" }}>
                  <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: "#EF4444" }} />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <CustomInput
                label="Confirm Password"
                name="password_confirmation"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={errorClass("password_confirmation")}
                icon={<Lock className="w-5 h-5" style={{ color: "#94A3B8" }} />}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: "#94A3B8" }}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              {errors.password_confirmation && (
                <p className="mt-2 text-sm flex items-center" style={{ color: "#EF4444" }}>
                  <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: "#EF4444" }} />
                  {errors.password_confirmation}
                </p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div>
              <div className="flex items-start gap-2.5">
                <input
                  id="agree-terms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked);
                    if (errors.terms) setErrors((prev) => ({ ...prev, terms: "" }));
                  }}
                  className="mt-0.5 h-4 w-4 rounded cursor-pointer flex-shrink-0"
                  style={{ accentColor: "#0F4C81", borderColor: "#E2E8F0" }}
                />
                <label htmlFor="agree-terms" className="text-sm cursor-pointer" style={{ color: "#64748B" }}>
                  I agree to the{" "}
                  <Link to="/terms" className="font-semibold" style={{ color: "#0F4C81" }}>
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="font-semibold" style={{ color: "#0F4C81" }}>
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.terms && (
                <p className="mt-2 text-sm flex items-center" style={{ color: "#EF4444" }}>
                  <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: "#EF4444" }} />
                  {errors.terms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #F4D03F)",
                color: "#0B1220",
                boxShadow: "0 4px 20px rgba(212, 175, 55, 0.3)",
              }}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2" style={{ borderColor: "#0B1220" }} />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full" style={{ borderTop: "1px solid #E2E8F0" }} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3" style={{ background: "#FFFFFF", color: "#94A3B8" }}>
                  Or sign up with
                </span>
              </div>
            </div>
          </div>

          {/* Social sign-up */}
          <button
            type="button"
            className="mt-5 w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg text-sm font-semibold transition-colors duration-200 hover:bg-gray-50"
            style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", color: "#0F172A" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.81z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.92l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11C3.25 21.3 7.31 24 12 24z" />
              <path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54v-3.1H1.27a12 12 0 0 0 0 10.75l4-3.11z" />
              <path fill="#EA4335" d="M12 4.77c1.77 0 3.35.6 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.63l4 3.1C6.22 6.88 8.87 4.77 12 4.77z" />
            </svg>
            Continue with Google
          </button>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: "#64748B" }}>
              Already have an account?{" "}
              <Link to="/login" className="font-semibold transition-colors hover:text-[#0B3D68]" style={{ color: "#0F4C81" }}>
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;