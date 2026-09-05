import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  User,
  LogOut,
  Settings,
  UserCircle,
  Mail,
  ChevronDown,
  Crown,
  Shield,
  LayoutDashboard,
  Sun,
  Moon,
  HelpCircle,
  MessageSquare,
  Award,
  Activity,
  Zap,
} from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';

const SuperAdminNavbar = ({ setSidebarOpen, sidebarOpen }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  // Get user data from auth store
  const { user, logout } = useAuthStore();

  // Super Admin user data - fallback if no user in store
  const userData = {
    name: user?.name || "Super Admin",
    email: user?.email || "superadmin@apostillehub.com",
    role: user?.roles?.[0]?.name || "Super Administrator",
    avatar: user?.profile_photo || null,
  };


  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return 'SA';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Notifications data - can be fetched from API
  const notifications = [
    {
      id: 1,
      title: "New user registered",
      message: "Sarah Johnson just created an account",
      time: "5 min ago",
      unread: true,
      icon: User,
      color: "#0F4C81",
    },
    {
      id: 2,
      title: "System update available",
      message: "Version 2.4.0 is ready to install",
      time: "1 hour ago",
      unread: true,
      icon: Zap,
      color: "#D4AF37",
    },
    {
      id: 3,
      title: "New order received",
      message: "Order #APS-40220 from Michael Chen",
      time: "2 hours ago",
      unread: false,
      icon: LayoutDashboard,
      color: "#10B981",
    },
    {
      id: 4,
      title: "Security alert",
      message: "Failed login attempt detected",
      time: "3 hours ago",
      unread: false,
      icon: Shield,
      color: "#EF4444",
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProfileClick = () => {
    setShowProfileMenu(false);
    navigate("/super-admin/profile");
  };

  const handleSettingsClick = () => {
    setShowProfileMenu(false);
    navigate("/super-admin/settings");
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-30 transition-all duration-300">
      <div className="px-6 py-3.5">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            {/* Dynamic User Info */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: 'linear-gradient(135deg, #0F4C81, #1E6BB8)' }}>
                {userData.avatar ? (
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getUserInitials(userData.name)
                )}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">
                  {userData.name}
                </p>
                <p className="text-xs text-gray-500">{userData.role}</p>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative text-gray-600"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-lg shadow-red-500/30">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-slideDown">
                  <div className="bg-gradient-to-r from-[#0F4C81] to-[#1E6BB8] px-4 py-3.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-semibold">Notifications</h3>
                        <p className="text-white/70 text-xs">{unreadCount} unread messages</p>
                      </div>
                      <button className="text-white/70 hover:text-white text-xs font-medium transition-colors">
                        Mark all read
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
                    {notifications.map((notification) => {
                      const Icon = notification.icon;
                      return (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                            notification.unread ? "bg-blue-50/30" : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ background: `${notification.color}15` }}
                            >
                              <Icon className="w-4 h-4" style={{ color: notification.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-600 mt-0.5">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="px-4 py-2.5 bg-gray-50 text-center border-t border-gray-100">
                    <button className="text-sm text-[#D4AF37] hover:text-[#C29B20] font-semibold transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Super Admin Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F]">
              <Crown className="w-3.5 h-3.5 text-[#0B1220]" />
              <span className="text-[10px] font-bold text-[#0B1220] uppercase tracking-wider">
                Super Admin
              </span>
            </div>

            {/* User Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                aria-label="Profile menu"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center shadow-md">
                  {userData.avatar ? (
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-[#0B1220] text-sm font-bold">
                      {getUserInitials(userData.name)}
                    </span>
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    {userData.name}
                  </p>
                  <p className="text-xs text-gray-500">{userData.role}</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform hidden sm:block ${
                    showProfileMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-slideDown">
                  {/* User Info */}
                  <div className="px-4 py-4 bg-gradient-to-r from-[#0F4C81] to-[#1E6BB8]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        {userData.avatar ? (
                          <img
                            src={userData.avatar}
                            alt={userData.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-lg font-bold">
                            {getUserInitials(userData.name)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-sm">
                          {userData.name}
                        </p>
                        <p className="text-white/80 text-xs">{userData.email}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Crown className="w-3 h-3 text-[#D4AF37]" />
                          <p className="text-white/70 text-xs">{userData.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      onClick={handleProfileClick}
                      className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <UserCircle className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">My Profile</p>
                        <p className="text-xs text-gray-500">View and edit profile</p>
                      </div>
                    </button>

                    <button
                      onClick={handleSettingsClick}
                      className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Settings className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Settings</p>
                        <p className="text-xs text-gray-500">Manage preferences</p>
                      </div>
                    </button>

                    <button
                      className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Support</p>
                        <p className="text-xs text-gray-500">Get help</p>
                      </div>
                    </button>

                    <button
                      className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Activity className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Activity Log</p>
                        <p className="text-xs text-gray-500">View your activity</p>
                      </div>
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-200 p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-red-50 transition-colors rounded-lg text-left group"
                    >
                      <div className="w-8 h-8 bg-red-100 group-hover:bg-red-200 rounded-lg flex items-center justify-center transition-colors">
                        <LogOut className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-red-600">Logout</p>
                        <p className="text-xs text-red-400">Sign out of your account</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.25s ease-out;
        }
      `}</style>
    </header>
  );
};

export default SuperAdminNavbar;