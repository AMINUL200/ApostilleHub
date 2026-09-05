import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  X,
  LayoutDashboard,
  Users,
  Settings,
  Package,
  BarChart,
  ShoppingCart,
  FileText,
  ChevronDown,
  Bell,
  Shield,
  Database,
  Palette,
  Globe,
  Mail,
  UserCog,
  Tag,
  TrendingUp,
  DollarSign,
  Clock,
  Star,
  User2,
  Crown,
  Building2,
  GraduationCap,
  Landmark,
  MapPin,
  Phone,
  CreditCard,
  Headphones,
  Award,
  Activity,
  PieChart,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Zap,
  HelpCircle,
  LogOut,
  Menu,
  Home,
  Briefcase,
  Calendar,
  MessageSquare,
  ClipboardList,
  Upload,
  FileCheck,
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock as ClockIcon,
  Star as StarIcon,
  ThumbsUp,
  Users as UsersIcon,
  FileText as FileTextIcon,
  DollarSign as DollarSignIcon,
  Smartphone,
  Lock,
  Key,
  Fingerprint,
  Globe2,
  Truck,
  Folder,
  TagIcon,
} from "lucide-react";

// Logo Component
const Logo = ({ collapsed }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-xl flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
      <Crown className="w-5 h-5 text-[#0B1220]" />
    </div>
    {!collapsed && (
      <div>
        <h2 className="text-lg font-bold text-white">ApostilleHub</h2>
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#D4AF37]">
          Super Admin
        </p>
      </div>
    )}
  </div>
);

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/super-admin",
  },
  {
    id: "apostille-officers",
    label: "Apostille Officers",
    icon: Users,
    path: "/super-admin/apostille-officers",
  },
  {
    id: "team",
    label: "Staff Management",
    icon: Users,
    children: [
      {
        id: "all-staff",
        label: "All Staff",
        icon: Users,
        path: "/super-admin/staff",
      },
    ],
  },
  {
    id: "services",
    label: "Services",
    icon: Briefcase,
    children: [
      {
        id: "service-categories",
        label: "Service Categories",
        icon: Folder,
        path: "/super-admin/services/categories",
      },
      {
        id: "services-list",
        label: "Services",
        icon: Briefcase,
        path: "/super-admin/services",
      },
      {
        id: "processing-options",
        label: "Processing Options",
        icon: Clock,
        path: "/super-admin/services/processing-options",
      },
      {
        id: "delivery-methods",
        label: "Delivery Methods",
        icon: Truck,
        path: "/super-admin/services/delivery-methods",
      },
      {
        id: "delivery-methods-pricing",
        label: "Delivery Methods Pricing",
        icon: TagIcon,
        path: "/super-admin/services/delivery-methods/pricing",
      },
      // {
      //   id: "pricing",
      //   label: "Service Pricing",
      //   icon: TagIcon,
      //   path: "/organization-admin/services/pricing",
      // },
    ],
  },
  {
    id: "blog",
    label: "Blog",
    icon: Users,
    path: "/super-admin/blogs",
  },
  {
    id: "faq",
    label: "FAQS",
    icon: Users,
    path: "/super-admin/faqs",
  },
  {
    id: "country",
    label: "Country",
    icon: Globe2,
    path: "/super-admin/country",
  },
  // {
  //   id: 'users',
  //   label: 'User Management',
  //   icon: Users,
  //   children: [
  //     {
  //       id: 'all-users',
  //       label: 'All Users',
  //       icon: Users,
  //       path: '/super-admin/users',
  //     },
  //     {
  //       id: 'user-roles',
  //       label: 'User Roles',
  //       icon: UserCog,
  //       path: '/super-admin/users/roles',
  //     },
  //     {
  //       id: 'permissions',
  //       label: 'Permissions',
  //       icon: Shield,
  //       path: '/super-admin/users/permissions',
  //     },
  //   ],
  // },
  // {
  //   id: 'orders',
  //   label: 'Orders',
  //   icon: ShoppingCart,
  //   path: '/super-admin/orders',
  // },
  // {
  //   id: 'services',
  //   label: 'Services',
  //   icon: Package,
  //   children: [
  //     {
  //       id: 'all-services',
  //       label: 'All Services',
  //       icon: Package,
  //       path: '/super-admin/services',
  //     },
  //     {
  //       id: 'categories',
  //       label: 'Categories',
  //       icon: Tag,
  //       path: '/super-admin/services/categories',
  //     },
  //     {
  //       id: 'pricing',
  //       label: 'Pricing Rules',
  //       icon: DollarSign,
  //       path: '/super-admin/services/pricing',
  //     },
  //     {
  //       id: 'countries',
  //       label: 'Countries',
  //       icon: Globe,
  //       path: '/super-admin/services/countries',
  //     },
  //   ],
  // },
  // {
  //   id: 'documents',
  //   label: 'Documents',
  //   icon: FileText,
  //   path: '/super-admin/documents',
  // },
  // {
  //   id: 'payments',
  //   label: 'Payments',
  //   icon: CreditCard,
  //   path: '/super-admin/payments',
  // },
  // {
  //   id: 'analytics',
  //   label: 'Analytics',
  //   icon: BarChart,
  //   children: [
  //     {
  //       id: 'overview',
  //       label: 'Overview',
  //       icon: TrendingUp,
  //       path: '/super-admin/analytics',
  //     },
  //     {
  //       id: 'revenue',
  //       label: 'Revenue',
  //       icon: DollarSign,
  //       path: '/super-admin/analytics/revenue',
  //     },
  //     {
  //       id: 'reports',
  //       label: 'Reports',
  //       icon: PieChart,
  //       path: '/super-admin/analytics/reports',
  //     },
  //   ],
  // },
  // {
  //   id: 'support',
  //   label: 'Support Tickets',
  //   icon: Headphones,
  //   path: '/super-admin/support',
  // },
  // {
  //   id: 'cms',
  //   label: 'Content Management',
  //   icon: FileText,
  //   children: [
  //     {
  //       id: 'blog',
  //       label: 'Blog Posts',
  //       icon: FileText,
  //       path: '/super-admin/cms/blog',
  //     },
  //     {
  //       id: 'faq',
  //       label: 'FAQ',
  //       icon: HelpCircle,
  //       path: '/super-admin/cms/faq',
  //     },
  //     {
  //       id: 'testimonials',
  //       label: 'Testimonials',
  //       icon: StarIcon,
  //       path: '/super-admin/cms/testimonials',
  //     },
  //   ],
  // },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    children: [
      {
        id: "smtp",
        label: "SMTP Settings",
        icon: Settings,
        path: "/super-admin/smtp",
      },
      {
        id: "site-settings",
        label: "Site Settings",
        icon: Palette,
        path: "/super-admin/site-settings",
      },

      // {
      //   id: 'seo',
      //   label: 'SEO Settings',
      //   icon: Search,
      //   path: '/super-admin/settings/seo',
      // },
    ],
  },
];

// NOTE: `isOpen` / `setIsOpen` is now the SINGLE source of truth for:
//   1. Whether the sidebar is shown at all on mobile (slide in/out)
//   2. Whether the sidebar is expanded (w-72) or collapsed (w-20) on desktop
// This is the same state that lives in SuperAdminLayout and is passed to
// SuperAdminNavbar's hamburger button, so all three components now stay in sync.
const SuperAdminSidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isActive = (path) => location.pathname === path;

  const isParentActive = (children) => {
    return children?.some((child) => location.pathname === child.path);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const renderMenuItem = (item, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActiveItem = isActive(item.path);
    const isParentActiveItem = isParentActive(item.children);
    const isDropdownOpen = openDropdowns[item.id];
    const Icon = item.icon;

    if (hasChildren) {
      return (
        <div key={item.id} className="mb-1">
          <button
            onClick={() => toggleDropdown(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
              isParentActiveItem
                ? "bg-gradient-to-r from-[#0F4C81] to-[#1E6BB8] text-white shadow-lg shadow-[#0F4C81]/20"
                : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
            } ${!isOpen ? "justify-center" : ""}`}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5" />
              {isOpen && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </div>
            {isOpen && (
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </button>

          {isOpen && isDropdownOpen && (
            <div className="ml-4 pl-4 border-l-2 border-gray-700/50 space-y-1 py-1">
              {item.children.map((child) => renderMenuItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={item.id}
        onClick={() => handleNavigation(item.path)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
          isActiveItem
            ? "bg-gradient-to-r from-[#0F4C81] to-[#1E6BB8] text-white shadow-lg shadow-[#0F4C81]/20"
            : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
        } ${!isOpen ? "justify-center" : ""}`}
      >
        <Icon className="w-5 h-5" />
        {isOpen && <span className="text-sm font-medium">{item.label}</span>}
        {isActiveItem && isOpen && (
          <div className="ml-auto w-1.5 h-6 bg-[#D4AF37] rounded-full" />
        )}
      </button>
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full 
          bg-gradient-to-b from-[#0B1220] to-[#0F1A2E] 
          shadow-2xl transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isOpen ? "w-72" : "w-20"}`}
      >
        {/* Header */}
        <div className="sticky top-0 z-50 bg-[#0B1220]/95 backdrop-blur-sm flex items-center justify-between p-4 border-b border-gray-700/50">
          <Logo collapsed={!isOpen} />
          <div className="flex items-center gap-2">
            {/* Desktop collapse/expand toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors text-gray-400 hover:text-white"
            >
              <Menu className="w-4 h-4" />
            </button>
            {/* Mobile close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar">
          {menuItems.map((item) => renderMenuItem(item))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-700/50 bg-[#0B1220]/95">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 ${
              !isOpen ? "justify-center" : ""
            }`}
          >
            <LogOut className="w-5 h-5" />
            {isOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.5);
        }
      `}</style>
    </>
  );
};

export default SuperAdminSidebar;
