import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/landing/LandingPage";
import AdminLayout from "./layout/AdminLayout";
import AboutPage from "./pages/public_page/AboutPage";
import BlogPage from "./pages/public_page/BlogPage";
import ContactPage from "./pages/public_page/ContactPage";
import PricingPage from "./pages/public_page/PricingPage";
import FAQPage from "./pages/public_page/FAQPage";
import BlogDetailsPage from "./pages/public_page/BlogDetailsPage";
import CustomerDashboard from "./pages/customar_page/CustomerDashboard";
import CustomerProfile from "./pages/customar_page/CustomerProfile";
import CustomerOrders from "./pages/customar_page/CustomerOrders";
import CustomerDocuments from "./pages/customar_page/CustomerDocuments";
import CustomerPayments from "./pages/customar_page/CustomerPayments";
import SuperAdminLayout from "./layout/SuperAdminLayout";
import OrganizationAdminLayout from "./layout/OrganizationAdminLayout";
import AdminDashboard from "./pages/orgnization_admin/dashboard/AdminDashboard";
import SiteSettings from "./pages/orgnization_admin/settings/SiteSettings";
import AdminProfile from "./pages/orgnization_admin/profile/AdminProfile";
import OrgSMTPSettings from "./pages/orgnization_admin/settings/OrgSMTPSettings";
import OrgDeliveryMethods from "./pages/orgnization_admin/services/OrgDeliveryMethods";
import OrgServiceCategory from "./pages/orgnization_admin/services/OrgServiceCategory";
import OrgService from "./pages/orgnization_admin/services/OrgService";
import OrgProcessingOption from "./pages/orgnization_admin/services/OrgProcessingOption";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* public route */}
        <Route element={<AppLayout />}>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Route>

        {/* customer route */}
        <Route path="/customer" element={<AdminLayout />}>
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="profile" element={<CustomerProfile />} />
          <Route path="orders" element={<CustomerOrders />} />
          <Route path="documents" element={<CustomerDocuments />} />
          <Route path="payments" element={<CustomerPayments />} />
        </Route>

        {/* Admin route */}
        <Route path="/organization-admin" element={<OrganizationAdminLayout />}>
          <Route index element={<AdminDashboard />} />
          {/* Additional admin routes can be added here */}


          {/* ---------Service Related Route-------- */}
          <Route path="services" element={<OrgService />} />
          <Route path="services/categories" element={<OrgServiceCategory />} />
          <Route path="services/processing-options" element={<OrgProcessingOption />} />
          <Route path="services/delivery-methods" element={<OrgDeliveryMethods />} />


          {/* ---------Setting Related---------- */}
          <Route path="smtp" element={<OrgSMTPSettings />} />
          <Route path="site-settings" element={<SiteSettings />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>


        <Route path="/super-admin" element={<SuperAdminLayout />}>
          <Route index element={<h1>Super admin dashobard </h1>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
