import React, { useState, createContext, useContext } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../component/admin/AdminNavbar";
import AdminSidebar, { UserRoles } from "../component/admin/AdminSidebar";

// Create a context for user role
export const RoleContext = createContext();

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState(UserRoles.CUSTOMER);

  // Function to switch user role
  const switchUserRole = (role) => {
    setCurrentUserRole(role);
    // You can also add additional logic here like:
    // - Updating localStorage
    // - Making API calls
    // - Refreshing user permissions
  };

  return (
    <RoleContext.Provider value={{ currentUserRole, switchUserRole }}>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <AdminSidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          userRole={currentUserRole}
          onRoleSwitch={switchUserRole}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <AdminNavbar 
            setSidebarOpen={setSidebarOpen} 
            userRole={currentUserRole}
            onRoleSwitch={switchUserRole}
          />
          <main className="flex-1 p-6 overflow-auto min-h-screen lg:pl-74">
            <Outlet />
          </main>
        </div>
      </div>
    </RoleContext.Provider>
  );
};

export default AdminLayout;