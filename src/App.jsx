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
import SuperAdminBlog from "./pages/super_admin/blog/SuperAdminBlog";
import SuperAdminFaq from "./pages/super_admin/faq/SuperAdminFaq";
import OrgTeam from "./pages/orgnization_admin/team/OrgTeam";
import CustomerUploadDocument from "./pages/customar_page/CustomerUploadDocument";
import CustomerTrackOrder from "./pages/customar_page/CustomerTrackOrder";
import CustomerSupport from "./pages/customar_page/CustomerSupport";
import ApostilleOfficerLayout from "./layout/ApostilleOfficerLayout";
import ApostilleOfficerDashboard from "./pages/apostille_offiecer_page/ApostilleOfficerDashboard";
import ApostillerOfficerMyOrderPage from "./pages/apostille_offiecer_page/ApostillerOfficerMyOrderPage";
import ApostilleOfficerDocumentReview from "./pages/apostille_offiecer_page/ApostilleOfficerDocumentReview";
import ApostilleOficerPendingDocuments from "./pages/apostille_offiecer_page/ApostilleOficerPendingDocuments";
import ApostilleOfficerProcessingQueue from "./pages/apostille_offiecer_page/ApostilleOfficerProcessingQueue";
import ApostilleOfiicerCompletedOrders from "./pages/apostille_offiecer_page/ApostilleOfiicerCompletedOrders";
import ApostilleOfficerCalendar from "./pages/apostille_offiecer_page/ApostilleOfficerCalendar";
import FinanceTeamLayout from "./layout/FinanceTeamLayout";
import FinanceTeamDashboard from "./pages/finance_team/FinanceTeamDashboard";
import FinanceTeamManageInvoice from "./pages/finance_team/FinanceTeamManageInvoice";
import FinanceTeamInvoiceDetails from "./pages/finance_team/FinanceTeamInvoiceDetails";
import FinanceTeamPayment from "./pages/finance_team/FinanceTeamPayment";
import FinanceTeamTransactions from "./pages/finance_team/FinanceTeamTransactions";
import FinanceTeamRefunds from "./pages/finance_team/FinanceTeamRefunds";
import FinanceTeamReconciliation from "./pages/finance_team/FinanceTeamReconciliation";
import FinancialReports from "./pages/finance_team/FinancialReports";
import ApostillerOfficerMyProfilePage from "./pages/apostille_offiecer_page/ApostillerOfficerMyProfilePage";
import ManageCountryRegion from "./pages/orgnization_admin/country_region/ManageCountryRegion";
import SuperAdminManageApostilleOfficer from "./pages/super_admin/apostille_officer/SuperAdminManageApostilleOfficer";
import SuperAdminManageApostilleOfficerDetails from "./pages/super_admin/apostille_officer/SuperAdminManageApostilleOfficerDetails";
import ManageDocumentRequired from "./pages/orgnization_admin/services/ManageDocumentRequired";
import OrgDeliveryMethodsPrice from "./pages/orgnization_admin/services/OrgDeliveryMethodsPrice";
import SuperAdminManageApostilleOfficerServicePrice from "./pages/super_admin/apostille_officer/SuperAdminManageApostilleOfficerServicePrice";
import ApostilleOfficerServicePricing from "./pages/apostille_offiecer_page/ApostilleOfficerServicePricing";

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

          {/* Customer Route */}
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/profile" element={<CustomerProfile />} />
          <Route path="/orders" element={<CustomerOrders />} />
          <Route path="/documents" element={<CustomerDocuments />} />
          <Route path="/payments" element={<CustomerPayments />} />
          <Route path="/upload" element={<CustomerUploadDocument />} />
          <Route path="/track" element={<CustomerTrackOrder />} />
          <Route path="/support" element={<CustomerSupport />} />
        </Route>

        {/* apostille officer */}
        <Route path="/apostille-officer" element={<ApostilleOfficerLayout />}>
          <Route index element={<ApostilleOfficerDashboard />} />
          <Route path="orders" element={<ApostillerOfficerMyOrderPage />} />
          <Route
            path="orders/pending"
            element={<ApostilleOficerPendingDocuments />}
          />
          <Route
            path="orders/processing"
            element={<ApostilleOfficerProcessingQueue />}
          />
          <Route
            path="orders/completed"
            element={<ApostilleOfiicerCompletedOrders />}
          />
          <Route
            path="documents/review"
            element={<ApostilleOfficerDocumentReview />}
          />
          <Route path="service/region-price" element={<ApostilleOfficerServicePricing />} />
          <Route path="work-queue" element={<ApostilleOfficerCalendar />} />
          <Route path="profile" element={<ApostillerOfficerMyProfilePage />} />
        </Route>

        {/* finance route  */}
        <Route path="/finance-team" element={<FinanceTeamLayout />}>
          <Route index element={<FinanceTeamDashboard />} />
          <Route path="invoices" element={<FinanceTeamManageInvoice />} />
          <Route path="invoices/:id" element={<FinanceTeamInvoiceDetails />} />
          <Route path="payments" element={<FinanceTeamPayment />} />
          <Route path="transactions" element={<FinanceTeamTransactions />} />
          <Route path="refunds" element={<FinanceTeamRefunds />} />
          <Route
            path="reconciliation"
            element={<FinanceTeamReconciliation />}
          />
          <Route path="reports" element={<FinancialReports />} />
        </Route>

        {/* Admin or organization  route */}
        <Route path="/organization-admin" element={<OrganizationAdminLayout />}>
          <Route index element={<AdminDashboard />} />
          {/* Additional admin routes can be added here */}
          <Route
            path="apostille-officers"
            element={<SuperAdminManageApostilleOfficer />}
          />
        
          <Route
            path="apostille-officers/:id"
            element={<SuperAdminManageApostilleOfficerDetails />}
          />
          <Route path="apostille-officers/:id/service-region-price" element={<SuperAdminManageApostilleOfficerServicePrice />} />

          <Route path="staff" element={<OrgTeam />} />
          {/* ---------Service Related Route-------- */}
          <Route path="services" element={<OrgService />} />
          <Route path="services/categories" element={<OrgServiceCategory />} />
          <Route
            path="services/req-documents"
            element={<ManageDocumentRequired />}
          />
          <Route
            path="services/processing-options"
            element={<OrgProcessingOption />}
          />
          <Route
            path="services/delivery-methods"
            element={<OrgDeliveryMethods />}
          />
          <Route
            path="services/delivery-methods/pricing"
            element={<OrgDeliveryMethodsPrice />}
          />
          <Route path="country" element={<ManageCountryRegion />} />

          {/* ---------Setting Related---------- */}
          <Route path="smtp" element={<OrgSMTPSettings />} />
          <Route path="site-settings" element={<SiteSettings />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* Super admin route */}
        <Route path="/super-admin" element={<SuperAdminLayout />}>
          <Route index element={<h1>Super admin dashobard </h1>} />

          <Route
            path="apostille-officers"
            element={<SuperAdminManageApostilleOfficer />}
          />
          <Route
            path="apostille-officers/:id"
            element={<SuperAdminManageApostilleOfficerDetails />}
          />
          <Route path="apostille-officers/:id/service-region-price" element={<SuperAdminManageApostilleOfficerServicePrice />} />

          <Route path="staff" element={<OrgTeam />} />
          <Route path="blogs" element={<SuperAdminBlog />} />
          <Route path="faqs" element={<SuperAdminFaq />} />
          <Route path="country" element={<ManageCountryRegion />} />
          <Route path="services" element={<OrgService />} />
          <Route path="services/categories" element={<OrgServiceCategory />} />
          <Route
            path="services/processing-options"
            element={<OrgProcessingOption />}
          />
          <Route
            path="services/delivery-methods"
            element={<OrgDeliveryMethods />}
          />
          <Route
            path="services/delivery-methods/pricing"
            element={<OrgDeliveryMethodsPrice />}
          />

          <Route path="smtp" element={<OrgSMTPSettings />} />
          <Route path="site-settings" element={<SiteSettings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
