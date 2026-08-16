import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, ArrowLeft, ShieldCheck } from "lucide-react";
import CustomInput from "../../component/form/CustomInput";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

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

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      { strength: 1, label: "Weak", color: "var(--danger)" },
      { strength: 2, label: "Fair", color: "var(--warning)" },
      { strength: 3, label: "Good", color: "var(--secondary)" },
      { strength: 4, label: "Strong", color: "var(--success)" },
      { strength: 5, label: "Very Strong", color: "var(--primary)" },
    ];

    return levels[strength];
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        console.log("Register data:", formData);
        // Add your registration API call here
        setIsLoading(false);
        // navigate("/signin");
      }, 1500);
    }
  };

  const errorClass = (field) =>
    errors[field]
      ? "border-[color:var(--danger)] focus:ring-[color:var(--danger)]/20 focus:border-[color:var(--danger)]"
      : "focus:border-[color:var(--primary)]";

  return (
    <div
      className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Background decoration, in-brand */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(212,175,55,0.14)" }} />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(15,76,129,0.07)" }}
        />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(15,76,129,0.14)" }} />
        {/* Faint engraved line texture, consistent with the rest of the site */}
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
          style={{ color: "var(--text-secondary)" }}
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
          style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)" }}
        >
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-5">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "var(--gradient-gold)", boxShadow: "0 10px 26px rgba(212,175,55,0.35)" }}
              >
                <ShieldCheck size={28} strokeWidth={1.75} style={{ color: "var(--dark)" }} />
              </div>
            </div>
            <h2 className="text-3xl font-semibold mb-2" style={{ fontFamily: "'Fraunces', serif", color: "var(--text-primary)" }}>
              Create your account
            </h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Join{" "}
              <span style={{ color: "var(--primary)", fontWeight: 600 }}>ApostilleDesk</span> to start
              tracking your orders
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <CustomInput
                label="Full Name"
                name="fullName"
                type="text"
                autoComplete="name"
                value={formData.fullName}
                onChange={handleChange}
                placeholder=""
                className={errorClass("fullName")}
              />
              {errors.fullName && (
                <p className="mt-2 text-sm flex items-center" style={{ color: "var(--danger)" }}>
                  <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: "var(--danger)" }} />
                  {errors.fullName}
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
                placeholder=""
                className={errorClass("email")}
              />
              {errors.email && (
                <p className="mt-2 text-sm flex items-center" style={{ color: "var(--danger)" }}>
                  <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: "var(--danger)" }} />
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
                placeholder=""
                className={errorClass("phone")}
              />
              {errors.phone && (
                <p className="mt-2 text-sm flex items-center" style={{ color: "var(--danger)" }}>
                  <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: "var(--danger)" }} />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <CustomInput
                label="Password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                placeholder=""
                className={errorClass("password")}
              />

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                      <div
                        className="h-full transition-all duration-300 rounded-full"
                        style={{ width: `${(passwordStrength.strength / 5) * 100}%`, background: passwordStrength.color }}
                      />
                    </div>
                    <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                      {passwordStrength.label}
                    </span>
                  </div>
                </div>
              )}

              {errors.password && (
                <p className="mt-2 text-sm flex items-center" style={{ color: "var(--danger)" }}>
                  <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: "var(--danger)" }} />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <CustomInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder=""
                className={errorClass("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-sm flex items-center" style={{ color: "var(--danger)" }}>
                  <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: "var(--danger)" }} />
                  {errors.confirmPassword}
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
                  style={{ accentColor: "var(--primary)", borderColor: "var(--border)" }}
                />
                <label htmlFor="agree-terms" className="text-sm cursor-pointer" style={{ color: "var(--text-secondary)" }}>
                  I agree to the{" "}
                  <a href="/terms" className="font-semibold" style={{ color: "var(--primary)" }}>
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="font-semibold" style={{ color: "var(--primary)" }}>
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.terms && (
                <p className="mt-2 text-sm flex items-center" style={{ color: "var(--danger)" }}>
                  <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: "var(--danger)" }} />
                  {errors.terms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-gold w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2" style={{ borderColor: "var(--dark)" }} />
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
                <div className="w-full" style={{ borderTop: "1px solid var(--border)" }} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3" style={{ background: "var(--surface)", color: "var(--text-light)" }}>
                  Or sign up with
                </span>
              </div>
            </div>
          </div>

          {/* Social sign-up */}
          <button
            type="button"
            className="mt-5 w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg text-sm font-semibold transition-colors duration-200"
            style={{ background: "var(--background)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
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
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Already have an account?{" "}
              <a href="/login" className="font-semibold transition-colors" style={{ color: "var(--primary)" }}>
                Sign in here
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;