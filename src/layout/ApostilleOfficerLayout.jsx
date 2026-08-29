import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ApostilleOfficerNavbar from '../component/layout/Apostille_officer/ApostilleOfficerNavbar';
import ApostilleOfficerSidebar from '../component/layout/Apostille_officer/ApostilleOfficerSidebar';

const ApostilleOfficerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <ApostilleOfficerSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'
      }`}>
        <ApostilleOfficerNavbar
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
        <main className="flex-1 p-6 overflow-auto min-h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ApostilleOfficerLayout;