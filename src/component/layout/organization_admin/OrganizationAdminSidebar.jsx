import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  X,
  LayoutDashboard,
  Users,
  Settings,
  ShoppingCart,
  FileText,
  ChevronDown,
  Building2,
  UserCog,
  Tag,
  CreditCard,
  Headphones,
  BarChart,
  TrendingUp,
  Menu,
  LogOut,
  Bell,
  Briefcase,
  TagIcon,
  Truck,
  Clock,
  Folder,
  Globe2,
} from "lucide-react";

// Logo Component
const Logo = ({ collapsed }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-gradient-to-br from-[#0F9B8E] to-[#14C4B4] rounded-xl flex items-center justify-center shadow-lg shadow-[#0F9B8E]/20">
      <Building2 className="w-5 h-5 text-[#0B1220]" />
    </div>
    {!collapsed && (
      <div>
        <h2 className="text-lg font-bold text-white">ApostilleHub</h2>
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#14C4B4]">
          Organization Admin
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
    path: "/organization-admin",
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
        path: "/organization-admin/staff",
      },
    ],
  },
  {
    id: "apostille-officers",
    label: "Apostille Officers",
    icon: Users,
    // path: "/organization-admin/apostille-officers",
    children: [
      {
        id: "all-apostille-officers",
        label: "All Apostille Officers",
        icon: Users,
        path: "/organization-admin/apostille-officers",
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
        path: "/organization-admin/services/categories",
      },
      {
        id: "services-list",
        label: "Services",
        icon: Briefcase,
        path: "/organization-admin/services",
      },
      {
        id: "required-documents",
        label: "Required Documents",
        icon: FileText,
        path: "/organization-admin/services/req-documents",
      },

      {
        id: "processing-options",
        label: "Processing Options",
        icon: Clock,
        path: "/organization-admin/services/processing-options",
      },
      {
        id: "delivery-methods",
        label: "Delivery Methods",
        icon: Truck,
        path: "/organization-admin/services/delivery-methods",
      },
      {
        id: "delivery-methods-pricing",
        label: "Delivery Methods Pricing",
        icon: TagIcon,
        path: "/organization-admin/services/delivery-methods/pricing",
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
    id: "country",
    label: "Country",
    icon: Globe2,
    path: "/organization-admin/country",
  },

  // {
  //   id: "documents",
  //   label: "Documents",
  //   icon: FileText,
  //   path: "/organization-admin/documents",
  // },
  // {
  //   id: "billing",
  //   label: "Billing",
  //   icon: CreditCard,
  //   children: [
  //     {
  //       id: "invoices",
  //       label: "Invoices",
  //       icon: FileText,
  //       path: "/organization-admin/billing/invoices",
  //     },
  //     {
  //       id: "plans",
  //       label: "Plan & Pricing",
  //       icon: Tag,
  //       path: "/organization-admin/billing/plans",
  //     },
  //   ],
  // },
  // {
  //   id: "analytics",
  //   label: "Analytics",
  //   icon: BarChart,
  //   path: "/organization-admin/analytics",
  // },
  // {
  //   id: "support",
  //   label: "Support Tickets",
  //   icon: Headphones,
  //   path: "/organization-admin/support",
  // },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    children: [
      {
        id: "smtp-email-setup",
        label: "SMTP Setup",
        icon: Settings,
        path: "/organization-admin/smtp",
      },
      {
        id: "site-settings",
        label: "Site Settings",
        icon: Settings,
        path: "/organization-admin/site-settings",
      },
      // {
      //   id: "notifications",
      //   label: "Notifications",
      //   icon: Bell,
      //   path: "/organization-admin/settings/notifications",
      // },
    ],
  },
];

// `isOpen` / `setIsOpen` is the single source of truth for whether the
// sidebar is shown (mobile slide in/out) and whether it's expanded (w-72)
// or collapsed (w-20) on desktop — same contract as SuperAdminSidebar, so
// it stays in sync with the state OrganizationAdminNavbar's hamburger uses.
const OrganizationAdminSidebar = ({ isOpen, setIsOpen }) => {
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
                ? "bg-gradient-to-r from-[#0F9B8E] to-[#14C4B4] text-white shadow-lg shadow-[#0F9B8E]/20"
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
            ? "bg-gradient-to-r from-[#0F9B8E] to-[#14C4B4] text-white shadow-lg shadow-[#0F9B8E]/20"
            : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
        } ${!isOpen ? "justify-center" : ""}`}
      >
        <Icon className="w-5 h-5" />
        {isOpen && <span className="text-sm font-medium">{item.label}</span>}
        {isActiveItem && isOpen && (
          <div className="ml-auto w-1.5 h-6 bg-[#14C4B4] rounded-full" />
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
          background: rgba(20, 196, 180, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(20, 196, 180, 0.5);
        }
      `}</style>
    </>
  );
};

export default OrganizationAdminSidebar;
