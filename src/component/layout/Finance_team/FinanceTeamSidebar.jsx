import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  X,
  Menu,
  LayoutDashboard,
  FileText,
  CreditCard,
  ArrowLeftRight,
  RotateCcw,
  Scale,
  BarChart,
  Bell,
  UserCircle,
  Lock,
  LogOut,
  Landmark,
} from 'lucide-react';

// Logo Component
const Logo = ({ collapsed }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-gradient-to-br from-[#15803D] to-[#22C55E] rounded-xl flex items-center justify-center shadow-lg shadow-[#15803D]/20">
      <Landmark className="w-5 h-5 text-white" />
    </div>
    {!collapsed && (
      <div>
        <h2 className="text-lg font-bold text-white">ApostilleHub</h2>
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#86EFAC]">
          Finance Portal
        </p>
      </div>
    )}
  </div>
);

// Flat items (no section header, sit directly in the flow)
const topLinks = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/finance-team' },
];

const midLinks = [
  { id: 'notifications', label: 'Notifications', icon: Bell, path: '/finance-team/notifications' },
];

// Grouped sections — group label is a static (non-clickable) heading,
// each child is a real nav link, matching the requested sidebar spec.
const sections = [
  {
    id: 'finance',
    label: 'Finance',
    items: [
      { id: 'invoices', label: 'Invoices', icon: FileText, path: '/finance-team/invoices' },
      { id: 'payments', label: 'Payments', icon: CreditCard, path: '/finance-team/payments' },
      { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight, path: '/finance-team/transactions' },
      { id: 'refunds', label: 'Refunds', icon: RotateCcw, path: '/finance-team/refunds' },
      { id: 'reconciliation', label: 'Reconciliation', icon: Scale, path: '/finance-team/reconciliation' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    items: [
      { id: 'financial-reports', label: 'Financial Reports', icon: BarChart, path: '/finance-team/reports' },
    ],
  },
  {
    id: 'profile',
    label: 'Profile',
    items: [
      { id: 'my-profile', label: 'My Profile', icon: UserCircle, path: '/finance-team/profile' },
      { id: 'security', label: 'Security', icon: Lock, path: '/finance-team/security' },
    ],
  },
];

// `isOpen` / `setIsOpen` is the single source of truth for whether the
// sidebar is shown (mobile slide in/out) and whether it's expanded (w-72)
// or collapsed (w-20) on desktop — same contract as the other role sidebars
// so it stays in sync with the state the Navbar's hamburger toggles.
const FinanceTeamSidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const renderLink = (item) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    return (
      <button
        key={item.id}
        onClick={() => handleNavigation(item.path)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
          active
            ? 'bg-gradient-to-r from-[#15803D] to-[#22C55E] text-white shadow-lg shadow-[#15803D]/20'
            : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
        } ${!isOpen ? 'justify-center' : ''}`}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        {isOpen && <span className="text-sm font-medium">{item.label}</span>}
        {active && isOpen && (
          <div className="ml-auto w-1.5 h-6 bg-[#86EFAC] rounded-full" />
        )}
      </button>
    );
  };

  const renderSection = (section) => (
    <div key={section.id} className="mb-1">
      {isOpen ? (
        <p className="px-3 pt-4 pb-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-gray-500">
          {section.label}
        </p>
      ) : (
        <div className="pt-4 pb-1.5 flex justify-center">
          <div className="w-6 border-t border-gray-700/50" />
        </div>
      )}
      <div className="space-y-1">{section.items.map((item) => renderLink(item))}</div>
    </div>
  );

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
        className={`fixed top-0 left-0 z-50 h-full flex flex-col
          bg-gradient-to-b from-[#0B1220] to-[#0F1A2E]
          shadow-2xl transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isOpen ? 'w-72' : 'w-20'}`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0B1220]/95 backdrop-blur-sm flex items-center justify-between p-4 border-b border-gray-700/50 shrink-0">
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
        <nav className="flex-1 min-h-0 overflow-y-auto p-3 custom-scrollbar">
          {topLinks.map((item) => renderLink(item))}

          {sections
            .filter((section) => section.id !== 'profile')
            .map((section) => renderSection(section))}

          <div className="mt-1">
            {midLinks.map((item) => renderLink(item))}
          </div>

          {sections
            .filter((section) => section.id === 'profile')
            .map((section) => renderSection(section))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-gray-700/50 bg-[#0B1220]/95 shrink-0">
          <button
            onClick={() => navigate('/login')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 ${
              !isOpen ? 'justify-center' : ''
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
          background: rgba(34, 197, 94, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.5);
        }
      `}</style>
    </>
  );
};

export default FinanceTeamSidebar;