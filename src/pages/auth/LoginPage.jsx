import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, ArrowLeft, ShieldCheck } from "lucide-react";
import CustomInput from "../../component/form/CustomInput";
// import CustomInput from "../path/to/CustomInput"; // Update with your actual path

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        console.log("Login data:", formData);
        // Add your login API call here
        setIsLoading(false);
        // navigate("/dashboard");
      }, 1500);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Background decoration, in-brand */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "rgba(212,175,55,0.14)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "rgba(15,76,129,0.14)" }}
        />
        {/* Faint engraved line texture, consistent with the rest of the site */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" preserveAspectRatio="none" viewBox="0 0 1440 900">
          <defs>
            <pattern id="loginGuilloche" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M0,60 Q30,0 60,60 T120,60" fill="none" stroke="#0F4C81" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1440" height="900" fill="url(#loginGuilloche)" />
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

        {/* Login Card */}
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
            <h2
              className="text-3xl font-semibold mb-2"
              style={{ fontFamily: "'Fraunces', serif", color: "var(--text-primary)" }}
            >
              Welcome back
            </h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Sign in to continue to{" "}
              <span style={{ color: "var(--primary)", fontWeight: 600 }}>ApostilleDesk</span>
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                className={
                  errors.email
                    ? "border-[color:var(--danger)] focus:ring-[color:var(--danger)]/20 focus:border-[color:var(--danger)]"
                    : "focus:border-[color:var(--primary)]"
                }
              />
              {errors.email && (
                <p className="mt-2 text-sm flex items-center" style={{ color: "var(--danger)" }}>
                  <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: "var(--danger)" }} />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <CustomInput
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                placeholder=""
                className={
                  errors.password
                    ? "border-[color:var(--danger)] focus:ring-[color:var(--danger)]/20 focus:border-[color:var(--danger)]"
                    : "focus:border-[color:var(--primary)]"
                }
              />
              {errors.password && (
                <p className="mt-2 text-sm flex items-center" style={{ color: "var(--danger)" }}>
                  <span className="inline-block w-1 h-1 rounded-full mr-2" style={{ background: "var(--danger)" }} />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded cursor-pointer"
                  style={{ accentColor: "var(--primary)", borderColor: "var(--border)" }}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm cursor-pointer"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Remember me
                </label>
              </div>

              <a
                href="/forgot-password"
                className="text-sm font-semibold transition-colors"
                style={{ color: "var(--primary)" }}
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-gold w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div
                    className="animate-spin rounded-full h-5 w-5 border-b-2"
                    style={{ borderColor: "var(--dark)" }}
                  />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
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
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          {/* Social login */}
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

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Don't have an account?{" "}
              <a href="/register" className="font-semibold transition-colors" style={{ color: "var(--primary)" }}>
                Sign up now
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;