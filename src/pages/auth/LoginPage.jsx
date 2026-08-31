import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  LogIn,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import CustomInput from "../../component/form/CustomInput";
import { api } from "../../services/app";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "abcorganiztion@gmail.com",
    password: "Password@123",
  });
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuthStore();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    if (showError) {
      setShowError("");
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
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
    setShowError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Make API call
      const response = await api.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      // Check if login was successful
      if (response.data.success) {
        const { user, organization, roles, token, dashboard_url } =
          response.data.data;

        // Store user data in Zustand
        login(user, token, organization, user?.roles[0]);

        console.log("login roles", user?.roles[0])
        // Redirect based on role
        if (user?.roles) {
          const roleSlug = user?.roles[0].slug?.toLowerCase();


          if (roleSlug === "super-admin") { 
            navigate("/super-admin");
          } else if (roleSlug === "administrator") {  // Organization Admin
            navigate("/organization-admin");
          } else if (roleSlug === "customer") {
            navigate("/customer/dashboard");
          } else if (roleSlug === "staff") {
            navigate("/staff/dashboard");
          } else if (roleSlug === "apostille-officer") {
            navigate("/apostille-officer");
          } else if (roleSlug === "finance") {
            navigate("/finance/dashboard");
          } else if (roleSlug === "courier") {
            navigate("/courier/dashboard");
          } else {
            navigate(dashboard_url || "/dashboard");
          }
        } else {
          navigate(dashboard_url || "/dashboard");
        }
      } else {
        setShowError(
          response.data.message || "Login failed. Please try again.",
        );
      }
    } catch (error) {
      console.error("Login error:", error);

      // Handle different error scenarios
      if (error.response) {
        // Server responded with error
        const message =
          error.response.data?.message ||
          error.response.data?.error ||
          "Invalid credentials. Please try again.";
        setShowError(message);
      } else if (error.request) {
        // Request was made but no response
        setShowError(
          "Unable to connect to the server. Please check your internet connection.",
        );
      } else {
        // Something else happened
        setShowError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "rgba(212,175,55,0.14)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "rgba(15,76,129,0.14)" }}
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          <defs>
            <pattern
              id="loginGuilloche"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0,60 Q30,0 60,60 T120,60"
                fill="none"
                stroke="#0F4C81"
                strokeWidth="1"
              />
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
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-5">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "var(--gradient-gold)",
                  boxShadow: "0 10px 26px rgba(212,175,55,0.35)",
                }}
              >
                <ShieldCheck
                  size={28}
                  strokeWidth={1.75}
                  style={{ color: "var(--dark)" }}
                />
              </div>
            </div>
            <h2
              className="text-3xl font-semibold mb-2"
              style={{
                fontFamily: "'Fraunces', serif",
                color: "var(--text-primary)",
              }}
            >
              Welcome back
            </h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Sign in to continue to{" "}
              <span style={{ color: "var(--primary)", fontWeight: 600 }}>
                ApostilleHub
              </span>
            </p>
          </div>

          {/* Error Message */}
          {showError && (
            <div
              className="mb-6 p-4 rounded-xl flex items-start gap-3"
              style={{
                background: "rgba(239, 68, 68, 0.08)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
              }}
            >
              <AlertCircle
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: "var(--danger)" }}
              />
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--danger)" }}
                >
                  {showError}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Please check your credentials and try again.
                </p>
              </div>
            </div>
          )}

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
                placeholder="john@example.com"
                icon={
                  <Mail
                    className="w-5 h-5"
                    style={{ color: "var(--text-light)" }}
                  />
                }
                className={
                  errors.email
                    ? "border-[color:var(--danger)] focus:ring-[color:var(--danger)]/20 focus:border-[color:var(--danger)]"
                    : "focus:border-[color:var(--primary)]"
                }
              />
              {errors.email && (
                <p
                  className="mt-2 text-sm flex items-center"
                  style={{ color: "var(--danger)" }}
                >
                  <span
                    className="inline-block w-1 h-1 rounded-full mr-2"
                    style={{ background: "var(--danger)" }}
                  />
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
                placeholder="Enter your password"
                icon={
                  <Lock
                    className="w-5 h-5"
                    style={{ color: "var(--text-light)" }}
                  />
                }
                className={
                  errors.password
                    ? "border-[color:var(--danger)] focus:ring-[color:var(--danger)]/20 focus:border-[color:var(--danger)]"
                    : "focus:border-[color:var(--primary)]"
                }
              />
              {errors.password && (
                <p
                  className="mt-2 text-sm flex items-center"
                  style={{ color: "var(--danger)" }}
                >
                  <span
                    className="inline-block w-1 h-1 rounded-full mr-2"
                    style={{ background: "var(--danger)" }}
                  />
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
                  style={{
                    accentColor: "var(--primary)",
                    borderColor: "var(--border)",
                  }}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm cursor-pointer"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm font-semibold transition-colors hover:opacity-80"
                style={{ color: "var(--primary)" }}
              >
                Forgot password?
              </Link>
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
                <div
                  className="w-full"
                  style={{ borderTop: "1px solid var(--border)" }}
                />
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className="px-3"
                  style={{
                    background: "var(--surface)",
                    color: "var(--text-light)",
                  }}
                >
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold transition-colors hover:opacity-80"
                style={{ color: "var(--primary)" }}
              >
                Sign up now
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
