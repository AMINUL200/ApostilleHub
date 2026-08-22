import React, { useState } from "react";
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
  ChevronRight,
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
  FileCheck,
  Scale,
  Briefcase,
  Calendar,
  MessageSquare,
  ClipboardList,
  Upload,
  CreditCard,
  Headphones,
  Award,
  Home,
  LogOut,
  HelpCircle,
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
  Crown,
  Building2,
  GraduationCap,
  Landmark,
  MapPin,
  Phone,
  Mail as MailIcon,
  Globe2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock as ClockIcon,
  Star as StarIcon,
  ThumbsUp,
  Users as UsersIcon,
  FileText as FileTextIcon,
  DollarSign as DollarSignIcon,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// User roles enum
export const UserRoles = {
  ADMIN: 'admin',
  LAWYER: 'lawyer',
  CUSTOMER: 'customer',
  STAFF: 'staff',
  APOSTILLE_OFFICER: 'apostille_officer',
  FINANCE: 'finance',
  COURIER: 'courier',
};

// Role display names
export const roleDisplayNames = {
  [UserRoles.ADMIN]: 'Administrator',
  [UserRoles.LAWYER]: 'Legal Professional',
  [UserRoles.CUSTOMER]: 'Customer',
  [UserRoles.STAFF]: 'Staff Member',
  [UserRoles.APOSTILLE_OFFICER]: 'Apostille Officer',
  [UserRoles.FINANCE]: 'Finance Team',
  [UserRoles.COURIER]: 'Courier Staff',
};

// Role colors
export const roleColors = {
  [UserRoles.ADMIN]: 'from-blue-600 to-indigo-600',
  [UserRoles.LAWYER]: 'from-emerald-600 to-teal-600',
  [UserRoles.CUSTOMER]: 'from-purple-600 to-pink-600',
  [UserRoles.STAFF]: 'from-orange-600 to-amber-600',
  [UserRoles.APOSTILLE_OFFICER]: 'from-cyan-600 to-blue-600',
  [UserRoles.FINANCE]: 'from-green-600 to-emerald-600',
  [UserRoles.COURIER]: 'from-red-600 to-rose-600',
};

// Role icons
export const roleIcons = {
  [UserRoles.ADMIN]: Crown,
  [UserRoles.LAWYER]: Scale,
  [UserRoles.CUSTOMER]: User2,
  [UserRoles.STAFF]: Users,
  [UserRoles.APOSTILLE_OFFICER]: ShieldCheck,
  [UserRoles.FINANCE]: DollarSign,
  [UserRoles.COURIER]: Package,
};

const AdminSidebar = ({ 
  isOpen, 
  setIsOpen, 
  userRole = UserRoles.ADMIN,
  onRoleSwitch 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState({});

  const RoleIcon = roleIcons[userRole] || User2;
  const roleColor = roleColors[userRole] || 'from-blue-600 to-indigo-600';
  const roleName = roleDisplayNames[userRole] || 'User';

  // Get role display name for header
  const getRoleDisplayName = (role) => {
    const names = {
      [UserRoles.CUSTOMER]: 'My Account',
      [UserRoles.ADMIN]: 'Admin Panel',
      [UserRoles.LAWYER]: 'Legal Portal',
      [UserRoles.STAFF]: 'Staff Portal',
      [UserRoles.APOSTILLE_OFFICER]: 'Officer Portal',
      [UserRoles.FINANCE]: 'Finance Portal',
      [UserRoles.COURIER]: 'Courier Portal',
    };
    return names[role] || 'Portal';
  };

  // Define menu items based on user role
  const getMenuItems = () => {
    const commonItems = [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: <LayoutDashboard className="w-5 h-5" />,
        path: `/${userRole}/dashboard`,
      },
      {
        id: "profile",
        label: "My Profile",
        icon: <User2 className="w-5 h-5" />,
        path: `/${userRole}/profile`,
      },
    ];

    const roleMenus = {
      [UserRoles.ADMIN]: [
        ...commonItems,
        {
          id: "users",
          label: "Users Management",
          icon: <Users className="w-5 h-5" />,
          children: [
            {
              id: "all-users",
              label: "All Users",
              icon: <Users className="w-4 h-4" />,
              path: "/admin/users/all",
            },
            {
              id: "user-roles",
              label: "User Roles",
              icon: <UserCog className="w-4 h-4" />,
              path: "/admin/users/roles",
            },
            {
              id: "permissions",
              label: "Permissions",
              icon: <Shield className="w-4 h-4" />,
              path: "/admin/users/permissions",
            },
          ],
        },
        {
          id: "orders",
          label: "All Orders",
          icon: <ShoppingCart className="w-5 h-5" />,
          path: "/admin/orders",
        },
        {
          id: "services",
          label: "Services",
          icon: <Package className="w-5 h-5" />,
          children: [
            {
              id: "all-services",
              label: "All Services",
              icon: <Package className="w-4 h-4" />,
              path: "/admin/services/all",
            },
            {
              id: "categories",
              label: "Categories",
              icon: <Tag className="w-4 h-4" />,
              path: "/admin/services/categories",
            },
            {
              id: "pricing",
              label: "Pricing Rules",
              icon: <DollarSign className="w-4 h-4" />,
              path: "/admin/services/pricing",
            },
            {
              id: "countries",
              label: "Countries",
              icon: <Globe className="w-4 h-4" />,
              path: "/admin/services/countries",
            },
          ],
        },
        {
          id: "analytics",
          label: "Analytics",
          icon: <BarChart className="w-5 h-5" />,
          children: [
            {
              id: "overview",
              label: "Overview",
              icon: <TrendingUp className="w-4 h-4" />,
              path: "/admin/analytics/overview",
            },
            {
              id: "revenue",
              label: "Revenue",
              icon: <DollarSign className="w-4 h-4" />,
              path: "/admin/analytics/revenue",
            },
            {
              id: "reports",
              label: "Reports",
              icon: <FileText className="w-4 h-4" />,
              path: "/admin/analytics/reports",
            },
          ],
        },
        {
          id: "documents",
          label: "Documents",
          icon: <FileText className="w-5 h-5" />,
          path: "/admin/documents",
        },
        {
          id: "payments",
          label: "Payments",
          icon: <CreditCard className="w-5 h-5" />,
          path: "/admin/payments",
        },
        {
          id: "support",
          label: "Support Tickets",
          icon: <Headphones className="w-5 h-5" />,
          path: "/admin/support",
        },
        {
          id: "cms",
          label: "Content Management",
          icon: <FileText className="w-5 h-5" />,
          children: [
            {
              id: "blog",
              label: "Blog Posts",
              icon: <FileText className="w-4 h-4" />,
              path: "/admin/cms/blog",
            },
            {
              id: "faq",
              label: "FAQ",
              icon: <HelpCircle className="w-4 h-4" />,
              path: "/admin/cms/faq",
            },
            {
              id: "testimonials",
              label: "Testimonials",
              icon: <Star className="w-4 h-4" />,
              path: "/admin/cms/testimonials",
            },
          ],
        },
        {
          id: "settings",
          label: "Settings",
          icon: <Settings className="w-5 h-5" />,
          children: [
            {
              id: "site-settings",
              label: "Site Settings",
              icon: <Settings className="w-4 h-4" />,
              path: "/admin/settings/site",
            },
            {
              id: "appearance",
              label: "Appearance",
              icon: <Palette className="w-4 h-4" />,
              path: "/admin/settings/appearance",
            },
            {
              id: "notifications",
              label: "Notifications",
              icon: <Bell className="w-4 h-4" />,
              path: "/admin/settings/notifications",
            },
            {
              id: "integrations",
              label: "Integrations",
              icon: <Globe className="w-4 h-4" />,
              path: "/admin/settings/integrations",
            },
            {
              id: "seo",
              label: "SEO Settings",
              icon: <Search className="w-4 h-4" />,
              path: "/admin/settings/seo",
            },
          ],
        },
      ],
      [UserRoles.LAWYER]: [
        ...commonItems,
        {
          id: "legal-cases",
          label: "Legal Cases",
          icon: <Briefcase className="w-5 h-5" />,
          path: "/lawyer/cases",
        },
        {
          id: "documents",
          label: "Legal Documents",
          icon: <FileText className="w-5 h-5" />,
          children: [
            {
              id: "all-documents",
              label: "All Documents",
              icon: <FileText className="w-4 h-4" />,
              path: "/lawyer/documents/all",
            },
            {
              id: "review",
              label: "Review Documents",
              icon: <Eye className="w-4 h-4" />,
              path: "/lawyer/documents/review",
            },
            {
              id: "upload",
              label: "Upload Documents",
              icon: <Upload className="w-4 h-4" />,
              path: "/lawyer/documents/upload",
            },
          ],
        },
        {
          id: "clients",
          label: "Clients",
          icon: <Users className="w-5 h-5" />,
          path: "/lawyer/clients",
        },
        {
          id: "calendar",
          label: "Calendar",
          icon: <Calendar className="w-5 h-5" />,
          path: "/lawyer/calendar",
        },
        {
          id: "messages",
          label: "Messages",
          icon: <MessageSquare className="w-5 h-5" />,
          path: "/lawyer/messages",
        },
      ],
      [UserRoles.CUSTOMER]: [
        ...commonItems,
        {
          id: "orders",
          label: "My Orders",
          icon: <ShoppingCart className="w-5 h-5" />,
          path: "/customer/orders",
        },
        {
          id: "documents",
          label: "My Documents",
          icon: <FileText className="w-5 h-5" />,
          path: "/customer/documents",
        },
        {
          id: "upload",
          label: "Upload Document",
          icon: <Upload className="w-5 h-5" />,
          path: "/customer/upload",
        },
        {
          id: "payments",
          label: "Payments",
          icon: <CreditCard className="w-5 h-5" />,
          path: "/customer/payments",
        },
        {
          id: "support",
          label: "Support",
          icon: <Headphones className="w-5 h-5" />,
          path: "/customer/support",
        },
        {
          id: "track",
          label: "Track Order",
          icon: <Package className="w-5 h-5" />,
          path: "/customer/track",
        },
      ],
      [UserRoles.STAFF]: [
        ...commonItems,
        {
          id: "tasks",
          label: "My Tasks",
          icon: <ClipboardList className="w-5 h-5" />,
          path: "/staff/tasks",
        },
        {
          id: "orders",
          label: "Orders",
          icon: <ShoppingCart className="w-5 h-5" />,
          path: "/staff/orders",
        },
        {
          id: "customers",
          label: "Customers",
          icon: <Users className="w-5 h-5" />,
          path: "/staff/customers",
        },
        {
          id: "support",
          label: "Support Tickets",
          icon: <Headphones className="w-5 h-5" />,
          path: "/staff/support",
        },
      ],
      [UserRoles.APOSTILLE_OFFICER]: [
        ...commonItems,
        {
          id: "verification",
          label: "Verification Queue",
          icon: <ShieldCheck className="w-5 h-5" />,
          path: "/officer/verification",
        },
        {
          id: "processing",
          label: "Processing",
          icon: <Activity className="w-5 h-5" />,
          path: "/officer/processing",
        },
        {
          id: "completed",
          label: "Completed",
          icon: <CheckCircle2 className="w-5 h-5" />,
          path: "/officer/completed",
        },
        {
          id: "certificates",
          label: "Certificates",
          icon: <Award className="w-5 h-5" />,
          path: "/officer/certificates",
        },
      ],
      [UserRoles.FINANCE]: [
        ...commonItems,
        {
          id: "dashboard",
          label: "Finance Dashboard",
          icon: <LayoutDashboard className="w-5 h-5" />,
          path: "/finance/dashboard",
        },
        {
          id: "invoices",
          label: "Invoices",
          icon: <FileText className="w-5 h-5" />,
          path: "/finance/invoices",
        },
        {
          id: "payments",
          label: "Payments",
          icon: <CreditCard className="w-5 h-5" />,
          path: "/finance/payments",
        },
        {
          id: "refunds",
          label: "Refunds",
          icon: <DollarSign className="w-5 h-5" />,
          path: "/finance/refunds",
        },
        {
          id: "reports",
          label: "Financial Reports",
          icon: <PieChart className="w-5 h-5" />,
          path: "/finance/reports",
        },
      ],
      [UserRoles.COURIER]: [
        ...commonItems,
        {
          id: "pickups",
          label: "Pickups",
          icon: <Package className="w-5 h-5" />,
          path: "/courier/pickups",
        },
        {
          id: "deliveries",
          label: "Deliveries",
          icon: <Package className="w-5 h-5" />,
          path: "/courier/deliveries",
        },
        {
          id: "tracking",
          label: "Tracking",
          icon: <Globe className="w-5 h-5" />,
          path: "/courier/tracking",
        },
        {
          id: "schedule",
          label: "Schedule",
          icon: <Calendar className="w-5 h-5" />,
          path: "/courier/schedule",
        },
      ],
    };

    return roleMenus[userRole] || commonItems;
  };

  const menuItems = getMenuItems();

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
    setIsOpen(false);
  };

  const handleRoleSwitch = (role) => {
    if (onRoleSwitch) {
      onRoleSwitch(role);
    }
    // Close any open dropdowns
    setOpenDropdowns({});
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 
          bg-gradient-to-b from-slate-900 to-slate-800 
          shadow-2xl transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Header */}
        <div className="sticky top-0 z-50 bg-slate-900 flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${roleColor} rounded-xl flex items-center justify-center shadow-lg`}>
              <RoleIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {getRoleDisplayName(userRole)}
              </h2>
              <p className="text-xs text-slate-400">{roleName}</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors lg:hidden text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Role Switcher */}
        <div className="p-4 border-b border-slate-700/50 bg-slate-800/50">
          <p className="text-xs text-slate-400 mb-2">Switch Role</p>
          <div className="flex flex-wrap gap-1">
            {Object.values(UserRoles).map((role) => {
              const isActiveRole = userRole === role;
              const roleColorClass = roleColors[role] || 'from-blue-600 to-indigo-600';
              const RoleIconComponent = roleIcons[role] || User2;
              
              return (
                <button
                  key={role}
                  onClick={() => handleRoleSwitch(role)}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-all ${
                    isActiveRole
                      ? `bg-gradient-to-r ${roleColorClass} text-white shadow-lg`
                      : 'bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <RoleIconComponent className="w-3 h-3" />
                  <span>{role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-220px)] custom-scrollbar">
          {menuItems.map((item) => (
            <div key={item.id}>
              {/* Parent Item */}
              {item.children ? (
                <button
                  onClick={() => toggleDropdown(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isParentActive(item.children)
                      ? `bg-gradient-to-r ${roleColor} text-white shadow-lg shadow-blue-500/30`
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`${
                        isParentActive(item.children)
                          ? "text-white"
                          : "text-slate-400 group-hover:text-white"
                      } transition-colors`}
                    >
                      {item.icon}
                    </div>
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  <div
                    className={`transition-transform duration-200 ${
                      openDropdowns[item.id] ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive(item.path)
                      ? `bg-gradient-to-r ${roleColor} text-white shadow-lg shadow-blue-500/30`
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <div
                    className={`${
                      isActive(item.path)
                        ? "text-white"
                        : "text-slate-400 group-hover:text-white"
                    } transition-colors`}
                  >
                    {item.icon}
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              )}

              {/* Dropdown Children */}
              {item.children && (
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openDropdowns[item.id]
                      ? "max-h-96 opacity-100 mt-1"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-4 pl-4 border-l-2 border-slate-700/50 space-y-1 py-1">
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => handleNavigation(child.path)}
                        className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                          isActive(child.path)
                            ? `bg-${roleColor.split(' ')[0].replace('from-', '')}/20 text-blue-400 border-l-2 border-blue-400`
                            : "text-slate-400 hover:bg-slate-700/30 hover:text-slate-200"
                        }`}
                      >
                        <div
                          className={`${
                            isActive(child.path)
                              ? "text-blue-400"
                              : "text-slate-500 group-hover:text-slate-300"
                          } transition-colors`}
                        >
                          {child.icon}
                        </div>
                        <span className="font-medium text-sm">
                          {child.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer / Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50 bg-slate-900/95">
          <button
            onClick={() => {
              console.log('Logout');
              navigate('/login');
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;