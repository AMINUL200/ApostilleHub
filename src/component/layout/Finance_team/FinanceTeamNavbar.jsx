import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  LogOut,
  UserCircle,
  Lock,
  ChevronDown,
  Landmark,
  FileText,
  CreditCard,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';

const FinanceTeamNavbar = ({ setSidebarOpen, sidebarOpen }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  // Finance Team user data
  const userData = {
    name: "Priya Nair",
    email: "p.nair@apostillehub.com",
    role: "Finance Team",
    badge: "FIN-0087",
    avatar: null,
  };

  // Notifications data — scoped to finance's daily work
  const notifications = [
    {
      id: 1,
      title: "New invoice generated",
      message: "Invoice #INV-20458 for Order #APS-40231",
      time: "8 min ago",
      unread: true,
      icon: FileText,
      color: "#15803D",
    },
    {
      id: 2,
      title: "Payment received",
      message: "$249.00 received for Order #APS-40190",
      time: "35 min ago",
      unread: true,
      icon: CreditCard,
      color: "#0EA5E9",
    },
    {
      id: 3,
      title: "Refund requested",
      message: "Order #APS-40155 flagged for refund review",
      time: "1 hour ago",
      unread: false,
      icon: RotateCcw,
      color: "#D97706",
    },
    {
      id: 4,
      title: "Reconciliation mismatch",
      message: "Discrepancy found in yesterday's batch",
      time: "3 hours ago",
      unread: false,
      icon: AlertCircle,
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
    console.log("Logging out...");
    navigate("/login");
  };

  const handleProfileClick = () => {
    setShowProfileMenu(false);
    navigate("/finance-team/profile");
  };

  const handleSecurityClick = () => {
    setShowProfileMenu(false);
    navigate("/finance-team/security");
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
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative text-gray-600"
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
                  <div className="bg-gradient-to-r from-[#15803D] to-[#22C55E] px-4 py-3.5">
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
                            notification.unread ? "bg-green-50/30" : ""
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
                              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="px-4 py-2.5 bg-gray-50 text-center border-t border-gray-100">
                    <button className="text-sm text-[#15803D] hover:text-[#166534] font-semibold transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Finance Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#15803D] to-[#22C55E]">
              <Landmark className="w-3.5 h-3.5 text-white" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                {userData.badge}
              </span>
            </div>

            {/* User Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-[#15803D] to-[#22C55E] rounded-full flex items-center justify-center shadow-md">
                  {userData.avatar ? (
                    <img
                      src={userData.avatar}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-sm font-bold">
                      {userData.name.split(' ').map(n => n[0]).join('')}
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
                  <div className="px-4 py-4 bg-gradient-to-r from-[#15803D] to-[#22C55E]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        {userData.avatar ? (
                          <img
                            src={userData.avatar}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-lg font-bold">
                            {userData.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-sm">
                          {userData.name}
                        </p>
                        <p className="text-white/80 text-xs">{userData.email}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Landmark className="w-3 h-3 text-white/90" />
                          <p className="text-white/70 text-xs">{userData.badge}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items — mirrors the sidebar's PROFILE section */}
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
                      onClick={handleSecurityClick}
                      className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Lock className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Security</p>
                        <p className="text-xs text-gray-500">Password & login activity</p>
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

export default FinanceTeamNavbar;