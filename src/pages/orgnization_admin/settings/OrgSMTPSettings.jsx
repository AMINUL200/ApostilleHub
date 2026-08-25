import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Server,
  Lock,
  User,
  Globe,
  Shield,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Save,
  Eye,
  EyeOff,
  Key,
  Send,
  MailCheck,
  Settings,
  Building2,
  Users,
  Database,
  Clock,
  Activity,
  Check,
  X,
  Info,
  HelpCircle,
  ArrowLeft,
  ExternalLink,
  Copy,
  CheckCheck,
  AlertTriangle,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { api } from '../../../services/app';
import { useAuthStore } from '../../../store/authStore';

const OrgSMTPSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    host: '',
    port: '',
    username: '',
    password: '',
    encryption: 'tls',
    from_address: '',
    from_name: '',
    reply_to_address: '',
    is_enabled: true,
  });
  const [initialData, setInitialData] = useState({});
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const { user } = useAuthStore();

  // Fetch SMTP settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await api.get('/admin/settings/email');
      if (response.data.success) {
        const data = response.data.data;
        setFormData({
          host: data.host || '',
          port: data.port || '',
          username: data.username || '',
          password: '',
          encryption: data.encryption || 'tls',
          from_address: data.from_address || '',
          from_name: data.from_name || '',
          reply_to_address: data.reply_to_address || '',
          is_enabled: data.is_enabled ?? true,
        });
        setInitialData(data);
        setIsDirty(false);
      }
    } catch (error) {
      console.error('Error fetching SMTP settings:', error);
      setErrorMessage(error.message || 'Failed to load SMTP settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
    setIsDirty(true);
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
    setSuccessMessage('');
    setErrorMessage('');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.host) newErrors.host = 'SMTP host is required';
    if (!formData.port) newErrors.port = 'SMTP port is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password && !initialData.id) {
      newErrors.password = 'Password is required';
    }
    if (!formData.from_address) newErrors.from_address = 'From address is required';
    if (!formData.from_name) newErrors.from_name = 'From name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const payload = {
        host: formData.host,
        port: parseInt(formData.port),
        username: formData.username,
        password: formData.password,
        encryption: formData.encryption,
        from_address: formData.from_address,
        from_name: formData.from_name,
        reply_to_address: formData.reply_to_address || formData.from_address,
        is_enabled: formData.is_enabled,
      };

      const response = await api.put('/admin/settings/email', payload);
      
      if (response.data.success) {
        setSuccessMessage(response.data.message || 'SMTP settings saved successfully!');
        setInitialData(response.data.data);
        setIsDirty(false);
        setFormData(prev => ({ ...prev, password: '' }));
      }
    } catch (error) {
      console.error('Error saving SMTP settings:', error);
      setErrorMessage(error.message || 'Failed to save SMTP settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestConnection = async () => {
    if (!validateForm()) return;

    setIsTesting(true);
    setTestResult(null);
    setErrorMessage('');

    try {
      const response = await api.post('/admin/settings/email/test', {
        host: formData.host,
        port: parseInt(formData.port),
        username: formData.username,
        password: formData.password,
        encryption: formData.encryption,
        from_address: formData.from_address,
      });
      
      if (response.data.success) {
        setTestResult({
          success: true,
          message: response.data.message || 'Connection test successful!',
        });
      } else {
        setTestResult({
          success: false,
          message: response.data.message || 'Connection test failed.',
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: error.message || 'Failed to test connection.',
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleReset = () => {
    if (!isDirty && initialData.id) {
      setFormData({
        host: initialData.host || '',
        port: initialData.port || '',
        username: initialData.username || '',
        password: '',
        encryption: initialData.encryption || 'tls',
        from_address: initialData.from_address || '',
        from_name: initialData.from_name || '',
        reply_to_address: initialData.reply_to_address || '',
        is_enabled: initialData.is_enabled ?? true,
      });
      setIsDirty(false);
      setSuccessMessage('');
      setErrorMessage('');
    } else {
      fetchSettings();
    }
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

  // Button Styles
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

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl" style={{ background: 'rgba(11, 18, 32, 0.1)' }}>
              <Mail className="w-6 h-6" style={{ color: '#0B1220' }} />
            </div>
            <div>
              <h1
                className="text-2xl lg:text-3xl font-bold"
                style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
              >
                SMTP Settings
              </h1>
              <p className="text-sm" style={{ color: '#64748B' }}>
                Configure your organization's email server settings
              </p>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm" style={{ color: '#64748B' }}>Loading settings...</p>
            </div>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {/* Success/Error Messages */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl flex items-start gap-3"
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
              </motion.div>
            )}

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl flex items-start gap-3"
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
              </motion.div>
            )}

            {/* Test Result */}
            {testResult && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl flex items-start gap-3 ${
                  testResult.success
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                {testResult.success ? (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
                )}
                <div>
                  <p className={`text-sm font-medium ${testResult.success ? 'text-green-700' : 'text-red-700'}`}>
                    {testResult.message}
                  </p>
                </div>
              </motion.div>
            )}

            {/* SMTP Form */}
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-2xl p-6 lg:p-8"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* SMTP Server Settings */}
                  <div>
                    <h3
                      className="text-lg font-semibold mb-4 flex items-center gap-2"
                      style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                    >
                      <Server className="w-5 h-5" style={{ color: '#0B1220' }} />
                      SMTP Server Settings
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                          SMTP Host <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Server className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                          <input
                            type="text"
                            name="host"
                            value={formData.host}
                            onChange={handleChange}
                            placeholder="smtp.gmail.com"
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all ${
                              errors.host ? 'border-red-500' : 'border-[#E2E8F0]'
                            }`}
                            style={{ color: '#0B1220' }}
                          />
                        </div>
                        {errors.host && (
                          <p className="mt-1 text-xs text-red-500">{errors.host}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                          SMTP Port <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Settings className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                          <input
                            type="text"
                            name="port"
                            value={formData.port}
                            onChange={handleChange}
                            placeholder="587"
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all ${
                              errors.port ? 'border-red-500' : 'border-[#E2E8F0]'
                            }`}
                            style={{ color: '#0B1220' }}
                          />
                        </div>
                        {errors.port && (
                          <p className="mt-1 text-xs text-red-500">{errors.port}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                          Encryption
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                          <select
                            name="encryption"
                            value={formData.encryption}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all appearance-none"
                            style={{ color: '#0B1220' }}
                          >
                            <option value="tls">TLS</option>
                            <option value="ssl">SSL</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                          Username <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="your-email@gmail.com"
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all ${
                              errors.username ? 'border-red-500' : 'border-[#E2E8F0]'
                            }`}
                            style={{ color: '#0B1220' }}
                          />
                        </div>
                        {errors.username && (
                          <p className="mt-1 text-xs text-red-500">{errors.username}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                          Password {!initialData.id && <span className="text-red-500">*</span>}
                        </label>
                        <div className="relative">
                          <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder={initialData.id ? 'Enter new password (optional)' : 'Enter password'}
                            className={`w-full pl-10 pr-12 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all ${
                              errors.password ? 'border-red-500' : 'border-[#E2E8F0]'
                            }`}
                            style={{ color: '#0B1220' }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                            style={{ color: '#94A3B8' }}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                        )}
                        {initialData.id && (
                          <p className="mt-1 text-xs" style={{ color: '#94A3B8' }}>
                            Leave blank to keep current password
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Email Settings */}
                  <div className="pt-6 border-t" style={{ borderColor: '#E2E8F0' }}>
                    <h3
                      className="text-lg font-semibold mb-4 flex items-center gap-2"
                      style={{ fontFamily: "'Fraunces', serif", color: '#0B1220' }}
                    >
                      <Mail className="w-5 h-5" style={{ color: '#0B1220' }} />
                      Email Settings
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                          From Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                          <input
                            type="email"
                            name="from_address"
                            value={formData.from_address}
                            onChange={handleChange}
                            placeholder="noreply@yourdomain.com"
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all ${
                              errors.from_address ? 'border-red-500' : 'border-[#E2E8F0]'
                            }`}
                            style={{ color: '#0B1220' }}
                          />
                        </div>
                        {errors.from_address && (
                          <p className="mt-1 text-xs text-red-500">{errors.from_address}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                          From Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                          <input
                            type="text"
                            name="from_name"
                            value={formData.from_name}
                            onChange={handleChange}
                            placeholder="Your Company Name"
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all ${
                              errors.from_name ? 'border-red-500' : 'border-[#E2E8F0]'
                            }`}
                            style={{ color: '#0B1220' }}
                          />
                        </div>
                        {errors.from_name && (
                          <p className="mt-1 text-xs text-red-500">{errors.from_name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                          Reply To Address
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                          <input
                            type="email"
                            name="reply_to_address"
                            value={formData.reply_to_address}
                            onChange={handleChange}
                            placeholder="support@yourdomain.com"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#0B1220] transition-all"
                            style={{ color: '#0B1220' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: '#0B1220' }}>
                          Status
                        </label>
                        <div className="flex items-center gap-3 pt-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              name="is_enabled"
                              checked={formData.is_enabled}
                              onChange={handleChange}
                              className="w-5 h-5 rounded border-gray-300 text-[#0B1220] focus:ring-[#0B1220]"
                            />
                            <label className="text-sm" style={{ color: '#0B1220' }}>
                              {formData.is_enabled ? 'Enabled' : 'Disabled'}
                            </label>
                          </div>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              formData.is_enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {formData.is_enabled ? <CheckCircle2 className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            {formData.is_enabled ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="pt-6 border-t flex flex-wrap items-center gap-4" style={{ borderColor: '#E2E8F0' }}>
                    <div className="flex-1 flex items-center gap-3">
                      {/* Primary Button - Save */}
                      <ButtonPrimary type="submit" disabled={isSaving}>
                        {isSaving ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Save Settings</span>
                          </>
                        )}
                      </ButtonPrimary>

                      {/* Outline Button - Test Connection */}
                      <ButtonOutline onClick={handleTestConnection} disabled={isTesting}>
                        {isTesting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Testing...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Test Connection</span>
                          </>
                        )}
                      </ButtonOutline>

                      {/* Outline Button - Reset */}
                      <ButtonOutline onClick={handleReset}>
                        <RefreshCw className="w-4 h-4" />
                        <span>Reset</span>
                      </ButtonOutline>
                    </div>

                    {isDirty && (
                      <span className="text-xs flex items-center gap-1" style={{ color: '#0B1220' }}>
                        <span className="w-2 h-2 rounded-full bg-[#0B1220] animate-pulse" />
                        Unsaved changes
                      </span>
                    )}
                  </div>
                </div>
              </form>
            </motion.div>

            {/* Help Section */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="p-4 rounded-xl" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg" style={{ background: 'rgba(11, 18, 32, 0.1)' }}>
                    <Shield className="w-4 h-4" style={{ color: '#0B1220' }} />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: '#0B1220' }}>Secure Connection</span>
                </div>
                <p className="text-xs" style={{ color: '#64748B' }}>
                  Use TLS or SSL encryption for secure email delivery
                </p>
              </div>

              <div className="p-4 rounded-xl" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg" style={{ background: 'rgba(11, 18, 32, 0.1)' }}>
                    <Key className="w-4 h-4" style={{ color: '#0B1220' }} />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: '#0B1220' }}>App Password</span>
                </div>
                <p className="text-xs" style={{ color: '#64748B' }}>
                  For Gmail, use an app-specific password instead of your regular password
                </p>
              </div>

              <div className="p-4 rounded-xl" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg" style={{ background: 'rgba(11, 18, 32, 0.1)' }}>
                    <MailCheck className="w-4 h-4" style={{ color: '#0B1220' }} />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: '#0B1220' }}>Test Before Save</span>
                </div>
                <p className="text-xs" style={{ color: '#64748B' }}>
                  Use the test connection button to verify your settings before saving
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OrgSMTPSettings;