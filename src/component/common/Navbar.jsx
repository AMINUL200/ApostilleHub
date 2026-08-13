import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { 
  Menu, 
  ChevronDown, 
  User, 
  LogOut, 
  LayoutDashboard,
  Shield,
  FileCheck,
  Globe,
  Clock,
  Phone,
  Mail,
  ChevronRight,
  Sparkles,
  Home,
  Briefcase,
  BookOpen,
  MessageCircle,
  HelpCircle,
  CreditCard,
  UserCircle,
  Settings,
  Bell,
  ClipboardList,
  FileText,
  Truck,
  Award
} from "lucide-react";

const Navbar = ({ toggleMenu }) => {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRefs = useRef({});
  const navigate = useNavigate();
  const location = useLocation();

  // Color scheme from your index.css
  const colors = {
    primary: '#0F4C81',
    primaryHover: '#0B3D68',
    secondary: '#D4AF37',
    secondaryHover: '#C29B20',
    dark: '#0B1220',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    border: '#E2E8F0',
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Updated navigation links for Apostille Platform
  const navLinks = [
    { 
      id: "home", 
      label: "Home", 
      path: "/",
      icon: Home 
    },
    {
      id: "services",
      label: "Services",
      icon: Shield,
      dropdown: [
        { 
          id: "apostille", 
          label: "Apostille Services", 
          path: "/services/apostille",
          description: "Hague Convention certification"
        },
        { 
          id: "embassy", 
          label: "Embassy Legalisation", 
          path: "/services/embassy-legalisation",
          description: "Consulate authentication"
        },
        { 
          id: "notary", 
          label: "Notary Services", 
          path: "/services/notary",
          description: "Certified notary verification"
        },
        { 
          id: "translation", 
          label: "Translation Services", 
          path: "/services/translation",
          description: "Professional certified translations"
        },
        { 
          id: "corporate", 
          label: "Corporate Documents", 
          path: "/services/corporate",
          description: "Business certificates & legalisation"
        },
        { 
          id: "educational", 
          label: "Educational Documents", 
          path: "/services/educational",
          description: "Degree & diploma apostille"
        },
      ],
    },
    {
      id: "process",
      label: "How It Works",
      icon: Clock,
      dropdown: [
        { 
          id: "step1", 
          label: "1. Upload Documents", 
          path: "/process/upload",
          description: "Submit your documents online"
        },
        { 
          id: "step2", 
          label: "2. Review & Verify", 
          path: "/process/review",
          description: "Our experts verify your documents"
        },
        { 
          id: "step3", 
          label: "3. Processing", 
          path: "/process/processing",
          description: "Apostille & legalisation process"
        },
        { 
          id: "step4", 
          label: "4. Delivery", 
          path: "/process/delivery",
          description: "Track & receive your documents"
        },
      ],
    },
    { 
      id: "pricing", 
      label: "Pricing", 
      path: "/pricing",
      icon: CreditCard 
    },
    { 
      id: "blog", 
      label: "Blog", 
      path: "/blog",
      icon: BookOpen 
    },
    { 
      id: "faq", 
      label: "FAQ", 
      path: "/faq",
      icon: HelpCircle 
    },
    { 
      id: "contact", 
      label: "Contact", 
      path: "/contact",
      icon: MessageCircle 
    },
  ];

  // Auth state - Replace with your actual auth logic
  const isAuthenticated = false;
  const userData = { 
    user_type: 2,
    name: "John Doe",
    email: "john@example.com"
  };

  // Helper functions for dropdown management
  const toggleDropdown = (dropdownId) => {
    setOpenDropdowns((prev) => {
      const newState = { ...prev };
      
      // Close other dropdowns
      Object.keys(newState).forEach((key) => {
        if (key !== dropdownId) {
          newState[key] = false;
        }
      });
      
      newState[dropdownId] = !prev[dropdownId];
      return newState;
    });
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      let clickedOutside = true;
      Object.values(dropdownRefs.current).forEach((ref) => {
        if (ref && ref.contains(event.target)) {
          clickedOutside = false;
        }
      });
      if (clickedOutside) {
        setOpenDropdowns({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (path) => {
    navigate(path);
    setOpenDropdowns({});
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  // Render dropdown items
  const renderDropdownItem = (item) => {
    return (
      <RouterLink
        key={item.id}
        to={item.path}
        className="group flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-all duration-200 border-b border-gray-50 last:border-0"
        onClick={() => setOpenDropdowns({})}
      >
        <div className="flex-1">
          <div className="text-sm font-semibold text-gray-800 group-hover:text-[#0F4C81] transition-colors">
            {item.label}
          </div>
          {item.description && (
            <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">
              {item.description}
            </div>
          )}
        </div>
        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#D4AF37] transition-colors" />
      </RouterLink>
    );
  };

  // Render navigation item
  const renderNavItem = (item) => {
    const hasDropdown = item.dropdown && item.dropdown.length > 0;
    const isOpen = openDropdowns[item.id];
    const isActive = location.pathname === item.path;

    return (
      <div
        key={item.id}
        className="relative"
        ref={(el) => (dropdownRefs.current[item.id] = el)}
      >
        {hasDropdown ? (
          <button
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-[#0F4C81]/5 ${
              isOpen ? "text-[#0F4C81] bg-[#0F4C81]/5" : "text-gray-700"
            }`}
            onClick={() => toggleDropdown(item.id)}
            onMouseEnter={() => !isMobile && toggleDropdown(item.id)}
          >
            {item.icon && <item.icon className="w-4 h-4" />}
            <span>{item.label}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        ) : (
          <RouterLink
            to={item.path}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-[#0F4C81]/5 ${
              isActive 
                ? "text-[#0F4C81] bg-[#0F4C81]/5" 
                : "text-gray-700 hover:text-[#0F4C81]"
            }`}
          >
            {item.icon && <item.icon className="w-4 h-4" />}
            {item.label}
          </RouterLink>
        )}

        {hasDropdown && isOpen && (
          <div 
            className="absolute top-full left-0 mt-2 min-w-[280px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
            style={{ boxShadow: '0 20px 60px rgba(15, 76, 129, 0.12)' }}
            onMouseLeave={() => !isMobile && setOpenDropdowns({})}
          >
            {/* Dropdown Header */}
            <div 
              className="px-4 py-3 bg-gradient-to-r from-[#0F4C81] to-[#1E6BB8]"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
            </div>
            
            {/* Dropdown Items */}
            <div className="py-1">
              {item.dropdown.map((dropdownItem) => renderDropdownItem(dropdownItem))}
            </div>

            {/* Dropdown Footer */}
            <div 
              className="px-4 py-2 bg-gray-50/80 border-t border-gray-100"
            >
              <RouterLink
                to={`${item.path}`}
                className="text-xs font-medium text-[#0F4C81] hover:text-[#0B3D68] flex items-center gap-1"
                onClick={() => setOpenDropdowns({})}
              >
                View All Services
                <ChevronRight className="w-3 h-3" />
              </RouterLink>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg py-2"
          : "bg-white/90 backdrop-blur-sm py-4"
      }`}
      style={{ borderBottom: scrolled ? '1px solid rgba(226, 232, 240, 0.5)' : 'none' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            {/* Logo Icon */}
            <div className="relative">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #0F4C81, #1E6BB8)',
                  boxShadow: '0 4px 15px rgba(15, 76, 129, 0.25)'
                }}
              >
                <Shield className="w-5 h-5 text-[#D4AF37]" strokeWidth={2.5} />
              </div>
              {/* Decorative dot */}
              <div 
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse"
                style={{ background: '#D4AF37' }}
              />
            </div>
            
            <div>
              <h1 
                className="text-xl font-bold tracking-tight"
                style={{ 
                  fontFamily: "'Fraunces', serif",
                  color: '#0F172A'
                }}
              >
                <span style={{ color: '#0F4C81' }}>Apostille</span>
                <span style={{ color: '#D4AF37' }}>Hub</span>
              </h1>
              <div className="text-[8px] font-medium tracking-[0.2em] uppercase text-[#64748B]">
                Document Legalisation
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((item) => renderNavItem(item))}

          {/* Auth Buttons */}
          {!isAuthenticated && (
            <div className="flex items-center gap-3 ml-4">
              <RouterLink
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-[#0F4C81] transition-colors px-3 py-2 rounded-lg hover:bg-[#0F4C81]/5"
              >
                Sign In
              </RouterLink>
              <RouterLink
                to="/register"
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                  color: '#0B1220',
                  boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                }}
              >
                <User className="w-4 h-4" />
                <span>Get Started</span>
              </RouterLink>
            </div>
          )}

          {isAuthenticated && (
            <div className="flex items-center gap-3 ml-4">
              {/* Notification Bell */}
              <button className="p-2 text-gray-600 hover:text-[#0F4C81] rounded-lg hover:bg-[#0F4C81]/5 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#0F4C81]/5 transition-colors"
                  onClick={() => toggleDropdown('user-menu')}
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                    style={{ background: 'linear-gradient(135deg, #0F4C81, #1E6BB8)' }}
                  >
                    {userData.name?.[0] || 'U'}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {openDropdowns['user-menu'] && (
                  <div 
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                    style={{ boxShadow: '0 20px 60px rgba(15, 76, 129, 0.12)' }}
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">{userData.name}</p>
                      <p className="text-xs text-gray-500">{userData.email}</p>
                    </div>
                    <div className="py-1">
                      {userData.user_type === 4 ? (
                        // Admin Dashboard
                        <RouterLink
                          to="/admin/dashboard"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#0F4C81]/5 hover:text-[#0F4C81] transition-colors"
                          onClick={() => setOpenDropdowns({})}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Admin Dashboard</span>
                        </RouterLink>
                      ) : (
                        // Customer Dashboard
                        <>
                          <RouterLink
                            to="/dashboard"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#0F4C81]/5 hover:text-[#0F4C81] transition-colors"
                            onClick={() => setOpenDropdowns({})}
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Dashboard</span>
                          </RouterLink>
                          <RouterLink
                            to="/orders"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#0F4C81]/5 hover:text-[#0F4C81] transition-colors"
                            onClick={() => setOpenDropdowns({})}
                          >
                            <ClipboardList className="w-4 h-4" />
                            <span>My Orders</span>
                          </RouterLink>
                          <RouterLink
                            to="/documents"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#0F4C81]/5 hover:text-[#0F4C81] transition-colors"
                            onClick={() => setOpenDropdowns({})}
                          >
                            <FileText className="w-4 h-4" />
                            <span>My Documents</span>
                          </RouterLink>
                          <RouterLink
                            to="/profile"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#0F4C81]/5 hover:text-[#0F4C81] transition-colors"
                            onClick={() => setOpenDropdowns({})}
                          >
                            <UserCircle className="w-4 h-4" />
                            <span>Profile Settings</span>
                          </RouterLink>
                        </>
                      )}
                    </div>
                    <div className="border-t border-gray-100 py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {isAuthenticated && (
            <button className="p-2 text-gray-600 hover:text-[#0F4C81] relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>
          )}
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-700 hover:text-[#0F4C81] rounded-lg hover:bg-[#0F4C81]/5 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay - This will be controlled by parent */}
    </header>
  );
};

export default Navbar;