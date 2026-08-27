import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  X,
  ChevronRight,
  Home,
  Briefcase,
  DollarSign,
  BookOpen,
  User,
  LogOut,
  LayoutDashboard,
  UserCircle,
  ShoppingCart,
  FileText,
  Upload,
  CreditCard,
  Headphones,
  Truck,
  ChevronDown,
  Shield,
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const SideBar = ({ toggleMenu, isOpen }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get auth state from store
  const { user, isAuthenticated, logout } = useAuthStore();

  // Sidebar navigation links
  const sidebarLinks = [
    {
      id: "home",
      label: "Home",
      path: "/",
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: "services",
      label: "Services",
      icon: <Briefcase className="w-5 h-5" />,
      dropdown: [
        { id: "apostille", label: "Apostille Services", path: "/services/apostille" },
        { id: "embassy", label: "Embassy Legalisation", path: "/services/embassy-legalisation" },
        { id: "notary", label: "Notary Services", path: "/services/notary" },
        { id: "translation", label: "Translation Services", path: "/services/translation" },
      ],
    },
    {
      id: "pricing",
      label: "Pricing",
      path: "/pricing",
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      id: "blog",
      label: "Blog",
      path: "/blog",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      id: "faq",
      label: "FAQ",
      path: "/faq",
      icon: <HelpCircle className="w-5 h-5" />,
    },
    {
      id: "contact",
      label: "Contact",
      path: "/contact",
      icon: <MessageCircle className="w-5 h-5" />,
    },
  ];

  // Customer profile dropdown items
  const profileDropdownItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
      path: "/dashboard",
    },
    {
      id: "profile",
      label: "My Profile",
      icon: <UserCircle className="w-4 h-4" />,
      path: "/profile",
    },
    {
      id: "orders",
      label: "My Orders",
      icon: <ShoppingCart className="w-4 h-4" />,
      path: "/orders",
    },
    {
      id: "documents",
      label: "My Documents",
      icon: <FileText className="w-4 h-4" />,
      path: "/documents",
    },
    {
      id: "upload",
      label: "Upload Document",
      icon: <Upload className="w-4 h-4" />,
      path: "/upload",
    },
    {
      id: "payments",
      label: "Payments",
      icon: <CreditCard className="w-4 h-4" />,
      path: "/payments",
    },
    {
      id: "support",
      label: "Support",
      icon: <Headphones className="w-4 h-4" />,
      path: "/support",
    },
    {
      id: "track",
      label: "Track Order",
      icon: <Truck className="w-4 h-4" />,
      path: "/track",
    },
  ];

  // Close sidebar when route changes
  useEffect(() => {
    if (isOpen) {
      toggleMenu();
    }
    // Close profile dropdown on route change
    setOpenProfileDropdown(false);
  }, [location.pathname]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const profileSection = document.getElementById("profile-section");
      if (profileSection && !profileSection.contains(event.target)) {
        setOpenProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle dropdown
  const toggleDropdown = (dropdownId) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdownId]: !prev[dropdownId],
    }));
  };

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setOpenProfileDropdown(!openProfileDropdown);
  };

  // Handle navigation
  const handleNavClick = (path) => {
    if (path) {
      navigate(path);
      setOpenDropdowns({});
      setOpenProfileDropdown(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
    toggleMenu();
    setOpenProfileDropdown(false);
  };

  // Check if current path matches
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Render dropdown items recursively
  const renderDropdownItem = (item, level = 1) => {
    const hasSubDropdown = item.dropdown && item.dropdown.length > 0;
    const dropdownKey = `${item.id}-sub-${level}`;
    const isOpen = openDropdowns[dropdownKey];
    const isActive = item.path && isActivePath(item.path);

    return (
      <div key={item.id} className="relative">
        {hasSubDropdown ? (
          <div
            className={`flex items-center justify-between px-4 py-3 text-sm cursor-pointer transition-all duration-200 ${
              level > 1 ? "pl-10" : "pl-6"
            } ${
              isOpen
                ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                : "text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37]"
            }`}
            onClick={() => toggleDropdown(dropdownKey)}
          >
            <span className="font-medium">{item.label}</span>
            <ChevronRight
              className={`w-4 h-4 transition-transform duration-300 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </div>
        ) : (
          <div
            className={`flex items-center px-4 py-3 text-sm cursor-pointer transition-all duration-200 ${
              level > 1 ? "pl-10" : "pl-6"
            } ${
              isActive
                ? "bg-[#D4AF37] text-white font-semibold"
                : "text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37]"
            }`}
            onClick={() => handleNavClick(item.path)}
          >
            <span className="font-medium">{item.label}</span>
          </div>
        )}

        {hasSubDropdown && (
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-gray-50/50 border-l-2 border-[#D4AF37]/30 ml-4">
              {item.dropdown.map((subItem) =>
                renderDropdownItem(subItem, level + 1)
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render navigation item
  const renderNavItem = (item) => {
    const hasDropdown = item.dropdown && item.dropdown.length > 0;
    const isOpen = openDropdowns[item.id];
    const isActive = item.path && isActivePath(item.path);

    return (
      <div key={item.id} className="mb-1">
        {hasDropdown ? (
          <div
            className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-all duration-200 rounded-lg mx-2 ${
              isOpen
                ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                : "text-gray-700 hover:bg-gray-100 hover:text-[#D4AF37]"
            }`}
            onClick={() => toggleDropdown(item.id)}
          >
            <div className="flex items-center space-x-3">
              {item.icon}
              <span className="font-semibold">{item.label}</span>
            </div>
            <ChevronRight
              className={`w-5 h-5 transition-transform duration-300 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </div>
        ) : (
          <div
            className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-all duration-200 rounded-lg mx-2 ${
              isActive
                ? "bg-[#D4AF37] text-white font-semibold shadow-md"
                : "text-gray-700 hover:bg-gray-100 hover:text-[#D4AF37]"
            }`}
            onClick={() => handleNavClick(item.path)}
          >
            {item.icon}
            <span className="font-semibold">{item.label}</span>
          </div>
        )}

        {hasDropdown && (
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-1">
              {item.dropdown.map((dropdownItem) => renderDropdownItem(dropdownItem))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render profile dropdown item
  const renderProfileItem = (item) => {
    const isActive = isActivePath(item.path);
    return (
      <Link
        key={item.id}
        to={item.path}
        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
          isActive
            ? "bg-[#D4AF37]/10 text-[#D4AF37] font-medium"
            : "text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37]"
        }`}
        onClick={() => {
          setOpenProfileDropdown(false);
          toggleMenu();
        }}
      >
        {item.icon}
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-[#0F4C81]/5 to-[#D4AF37]/5 shrink-0">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #0F4C81, #1E6BB8)",
                boxShadow: "0 4px 15px rgba(15, 76, 129, 0.25)",
              }}
            >
              <Shield className="w-5 h-5 text-[#D4AF37]" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                <span style={{ color: "#0F4C81" }}>Apostille</span>
                <span style={{ color: "#D4AF37" }}>Hub</span>
              </h2>
              <p className="text-[8px] font-medium tracking-[0.2em] uppercase text-[#64748B]">
                Document Legalisation
              </p>
            </div>
          </div>
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Navigation Links — flex-1 + min-h-0 so it always fills whatever
            space is left between the header and footer, instead of a
            hardcoded calc() that breaks when the footer's height changes */}
        <nav className="flex-1 min-h-0 overflow-y-auto py-4 px-2">
          {sidebarLinks.map((item) => renderNavItem(item))}
        </nav>

        {/* Auth Section with Profile Dropdown */}
        <div
          className="border-t border-gray-200 p-4 bg-gray-50 shrink-0 relative"
          id="profile-section"
        >
          {!isAuthenticated ? (
            // Login Button
            <button
              onClick={() => {
                navigate("/login");
                toggleMenu();
              }}
              className="w-full bg-[#D4AF37] text-white px-6 py-3 rounded-lg hover:bg-[#C29B20] transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-md"
            >
              <User className="w-5 h-5" />
              <span>Sign In</span>
            </button>
          ) : (
            // Profile Section with Dropdown
            <div className="relative">
              {/* Profile Header - Clickable */}
              <div
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200"
                onClick={toggleProfileDropdown}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ background: "linear-gradient(135deg, #0F4C81, #1E6BB8)" }}
                  >
                    {user?.name?.[0] || user?.email?.[0] || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email || ""}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform duration-300 shrink-0 ${
                    openProfileDropdown ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Profile Dropdown Menu — floats ABOVE the trigger as an
                  anchored popover (bottom-full) instead of expanding
                  inline. This is what actually fixes it: the old inline
                  version grew the footer taller every time it opened,
                  which pushed itself past the bottom of the viewport with
                  no way to scroll to it, since the sidebar's nav height
                  was a fixed calc() that didn't shrink to make room. */}
              {openProfileDropdown && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-slideUp z-50">
                  <div className="max-h-[60vh] overflow-y-auto">
                    {/* User Info Header inside dropdown */}
                    <div className="px-4 py-3 bg-gradient-to-r from-[#0F4C81] to-[#1E6BB8] sticky top-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shrink-0">
                          <span className="text-white text-sm font-bold">
                            {user?.name?.[0] || user?.email?.[0] || "U"}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-sm truncate">
                            {user?.name || "User"}
                          </p>
                          <p className="text-white/80 text-xs truncate">{user?.email || ""}</p>
                          <p className="text-white/60 text-xs mt-0.5 flex items-center gap-1">
                            <User className="w-3 h-3" />
                            Customer
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dropdown Items */}
                    <div className="py-1">
                      {profileDropdownItems.map((item) => renderProfileItem(item))}
                    </div>

                    {/* Logout Button */}
                    <div className="border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.2s ease-out;
          transform-origin: bottom;
        }
      `}</style>
    </>
  );
};

export default SideBar;