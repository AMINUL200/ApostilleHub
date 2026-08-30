import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import FinanceTeamNavbar from '../component/layout/Finance_team/FinanceTeamNavbar';
import FinanceTeamSidebar from '../component/layout/Finance_team/FinanceTeamSidebar';

const FinanceTeamLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <FinanceTeamSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'
      }`}>
        <FinanceTeamNavbar
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

export default FinanceTeamLayout;