import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Scale,
  Package,
  CreditCard,
  Headphones,
  ShieldCheck,
  Users,
  Briefcase,
  Calendar,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { roleColors, roleIcons, roleDisplayNames, UserRoles } from "./AdminSidebar";

const AdminNavbar = ({ setSidebarOpen, userRole, onRoleSwitch }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const roleSwitcherRef = useRef(null);
  const navigate = useNavigate();

  const RoleIcon = roleIcons[userRole] || User;
  const roleColor = roleColors[userRole] || 'from-blue-600 to-indigo-600';
  const roleName = roleDisplayNames[userRole] || 'User';

  // Dummy user data - replace with your actual user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: roleName,
    avatar: null,
  };

  // Dummy notifications
  const notifications = [
    {
      id: 1,
      title: "New order received",
      message: "Order #APS-40219 from Sarah Johnson",
      time: "5 min ago",
      unread: true,
      icon: Package,
      color: "#0F4C81",
    },
    {
      id: 2,
      title: "Payment confirmed",
      message: "Payment of £299.00 received",
      time: "1 hour ago",
      unread: true,
      icon: CreditCard,
      color: "#10B981",
    },
    {
      id: 3,
      title: "Support ticket assigned",
      message: "Ticket #SUP-2024-015 assigned to you",
      time: "2 hours ago",
      unread: false,
      icon: Headphones,
      color: "#D4AF37",
    },
    {
      id: 4,
      title: "Document verified",
      message: "Birth certificate verified for Order #APS-40218",
      time: "3 hours ago",
      unread: false,
      icon: ShieldCheck,
      color: "#8B5CF6",
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
      if (roleSwitcherRef.current && !roleSwitcherRef.current.contains(event.target)) {
        setShowRoleSwitcher(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/signin");
  };

  const handleProfileClick = () => {
    setShowProfileMenu(false);
    navigate(`/${userRole}/profile`);
  };

  const handleSettingsClick = () => {
    setShowProfileMenu(false);
    navigate(`/${userRole}/settings`);
  };

  const handleRoleSwitch = (role) => {
    if (onRoleSwitch) {
      onRoleSwitch(role);
    }
    setShowRoleSwitcher(false);
  };

  // Get notification icon
  const getNotificationIcon = (notif) => {
    const Icon = notif.icon || Bell;
    return <Icon className="w-4 h-4" style={{ color: notif.color || '#64748B' }} />;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Role Indicator */}
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 bg-gradient-to-br ${roleColor} rounded-lg flex items-center justify-center shadow-md`}>
                <RoleIcon className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {userData.name}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: roleColor.split(' ')[1] || '#6366F1' }} />
                  {roleName}
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* Role Switcher (Quick Switch) */}
            <div className="relative" ref={roleSwitcherRef}>
              <button
                onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-xs font-medium text-gray-600"
              >
                <span>Switch Role</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showRoleSwitcher ? 'rotate-180' : ''}`} />
              </button>

              {showRoleSwitcher && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-fadeIn">
                  <div className="p-2 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Switch Role</p>
                  </div>
                  <div className="py-1">
                    {Object.values(UserRoles).map((role) => {
                      const Icon = roleIcons[role] || User;
                      const color = roleColors[role] || 'from-blue-600 to-indigo-600';
                      const displayName = roleDisplayNames[role] || role;
                      const isActive = userRole === role;

                      return (
                        <button
                          key={role}
                          onClick={() => handleRoleSwitch(role)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors ${
                            isActive
                              ? 'bg-gray-50'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className={`w-7 h-7 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-3.5 h-3.5 text-white" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900">{displayName}</p>
                            <p className="text-xs text-gray-500 capitalize">{role.replace('_', ' ')}</p>
                          </div>
                          {isActive && (
                            <div className="w-2 h-2 rounded-full bg-[#D4AF37] flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-fadeIn">
                  <div className="bg-gradient-to-r from-[#0F4C81] to-[#1E6BB8] px-4 py-3">
                    <h3 className="text-white font-semibold">Notifications</h3>
                    <p className="text-white/80 text-xs">{unreadCount} unread messages</p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          notification.unread ? "bg-blue-50/30" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-1.5 rounded-lg flex-shrink-0 mt-0.5" style={{ background: `${notification.color}15` }}>
                            {getNotificationIcon(notification)}
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
                    ))}
                  </div>
                  <div className="px-4 py-2.5 bg-gray-50 text-center border-t border-gray-100">
                    <button className="text-sm text-[#D4AF37] hover:text-[#C29B20] font-semibold transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className={`w-9 h-9 bg-gradient-to-br ${roleColor} rounded-full flex items-center justify-center shadow-md`}>
                  {userData.avatar ? (
                    <img
                      src={userData.avatar}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    {userData.name}
                  </p>
                  <p className="text-xs text-gray-500">{roleName}</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform hidden sm:block ${
                    showProfileMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-fadeIn">
                  {/* User Info Header */}
                  <div className={`bg-gradient-to-r ${roleColor} px-4 py-4`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        {userData.avatar ? (
                          <img
                            src={userData.avatar}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-sm">
                          {userData.name}
                        </p>
                        <p className="text-white/80 text-xs">{userData.email}</p>
                        <p className="text-white/60 text-xs mt-0.5 flex items-center gap-1">
                          <RoleIcon className="w-3 h-3" />
                          {roleName}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      onClick={handleProfileClick}
                      className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <UserCircle className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          My Profile
                        </p>
                        <p className="text-xs text-gray-500">
                          View and edit profile
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={handleSettingsClick}
                      className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Settings className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Settings
                        </p>
                        <p className="text-xs text-gray-500">
                          Manage preferences
                        </p>
                      </div>
                    </button>

                    <button
                      className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Messages
                        </p>
                        <p className="text-xs text-gray-500">
                          View your messages
                        </p>
                      </div>
                    </button>

                    <button
                      className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                        <HelpCircle className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Help & Support
                        </p>
                        <p className="text-xs text-gray-500">
                          Get assistance
                        </p>
                      </div>
                    </button>
                  </div>

                  {/* Logout Button */}
                  <div className="border-t border-gray-200 p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-red-50 transition-colors rounded-lg text-left group"
                    >
                      <div className="w-8 h-8 bg-red-100 group-hover:bg-red-200 rounded-lg flex items-center justify-center transition-colors">
                        <LogOut className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-red-600">
                          Logout
                        </p>
                        <p className="text-xs text-red-400">
                          Sign out of your account
                        </p>
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
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </header>
  );
};

export default AdminNavbar;