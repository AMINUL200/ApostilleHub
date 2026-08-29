import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  X,
  Menu,
  LayoutDashboard,
  ShoppingCart,
  Clock,
  RefreshCw,
  CheckCircle2,
  FileCheck,
  MessageSquare,
  Bell,
  Calendar,
  HelpCircle,
  UserCircle,
  Lock,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

// Logo Component
const Logo = ({ collapsed }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-gradient-to-br from-[#6D28D9] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-lg shadow-[#6D28D9]/20">
      <ShieldCheck className="w-5 h-5 text-white" />
    </div>
    {!collapsed && (
      <div>
        <h2 className="text-lg font-bold text-white">ApostilleHub</h2>
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#A78BFA]">
          Apostille Officer
        </p>
      </div>
    )}
  </div>
);

// Flat items (no section header, sit directly in the flow)
const topLinks = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/apostille-officer' },
];

const midLinks = [
  { id: 'notifications', label: 'Notifications', icon: Bell, path: '/apostille-officer/notifications' },
  { id: 'work-queue', label: 'Calendar / Work Queue', icon: Calendar, path: '/apostille-officer/work-queue' },
  { id: 'help', label: 'Help / SOP', icon: HelpCircle, path: '/apostille-officer/help' },
];

// Grouped sections — group label is a static (non-clickable) heading,
// each child is a real nav link, matching the requested sidebar spec.
const sections = [
  {
    id: 'orders',
    label: 'Orders',
    items: [
      { id: 'my-orders', label: 'My Orders', icon: ShoppingCart, path: '/apostille-officer/orders' },
      { id: 'pending-documents', label: 'Pending Documents', icon: Clock, path: '/apostille-officer/orders/pending' },
      { id: 'processing-queue', label: 'Processing Queue', icon: RefreshCw, path: '/apostille-officer/orders/processing' },
      { id: 'completed-orders', label: 'Completed Orders', icon: CheckCircle2, path: '/apostille-officer/orders/completed' },
    ],
  },
  {
    id: 'documents',
    label: 'Documents',
    items: [
      { id: 'document-review', label: 'Document Review', icon: FileCheck, path: '/apostille-officer/documents/review' },
    ],
  },
  {
    id: 'communication',
    label: 'Communication',
    items: [
      { id: 'customer-messages', label: 'Customer Messages', icon: MessageSquare, path: '/apostille-officer/messages' },
    ],
  },
  {
    id: 'profile',
    label: 'Profile',
    items: [
      { id: 'my-profile', label: 'My Profile', icon: UserCircle, path: '/apostille-officer/profile' },
      { id: 'security', label: 'Security', icon: Lock, path: '/apostille-officer/security' },
    ],
  },
];

// `isOpen` / `setIsOpen` is the single source of truth for whether the
// sidebar is shown (mobile slide in/out) and whether it's expanded (w-72)
// or collapsed (w-20) on desktop — same contract as the other role sidebars
// so it stays in sync with the state the Navbar's hamburger toggles.
const ApostilleOfficerSidebar = ({ isOpen, setIsOpen }) => {
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
            ? 'bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white shadow-lg shadow-[#6D28D9]/20'
            : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
        } ${!isOpen ? 'justify-center' : ''}`}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        {isOpen && <span className="text-sm font-medium">{item.label}</span>}
        {active && isOpen && (
          <div className="ml-auto w-1.5 h-6 bg-[#A78BFA] rounded-full" />
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

          {sections.map((section) => renderSection(section))}

          <div className="mt-1">
            {midLinks.map((item) => renderLink(item))}
          </div>
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
          background: rgba(139, 92, 246, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </>
  );
};

export default ApostilleOfficerSidebar;