import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "../AdminSite/NavigationBar/NavigationBar";
import LoginCommon from "../LoginPage/LoginCommon";
import LoginPage from "../LoginPage/LoginPage";
// import Sell from "../AdminSite/Sell/Sell"; // Removed - unused component
import HomePage from "../AdminSite/HomePage/HomePage";
import Users from "../AdminSite/Users/Users";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AdminRoute from "../PrivateRoute/AdminRoute";
import UserRoute from "../PrivateRoute/UserRoute";
import ProductCategeory from "../AdminSite/ProductCategeory/ProductCategeory";
import Products from "../AdminSite/Products/Products";
import Reports from "../AdminSite/Reports/Reports";
import MasterDetails, {
  FollowupTypesPage,
  IndustriesPage,
  SalesStagesPage,
  TaskTypesPage,
  LeadSourcesPage,
} from "../../features/crm/pages/MasterDetailsPage";
import Leads from "../../features/crm/pages/LeadsPage";
import Opportunities from "../../features/crm/pages/OpportunitiesPage";
import PreSales from "../../features/crm/pages/PreSalesPage";
import Cases from "../../features/crm/pages/CasesPage";
import Contact from "../../features/crm/pages/ContactsPage";
import Accounts from "../../features/crm/pages/AccountsPage";
import Units from "../AdminSite/Units/Units";
import Companies from "../AdminSite/Company/Company";
import Warehouse from "../AdminSite/Warehouse/Warehouse";
import ProductStock from "../AdminSite/ProductStock/ProductStock";
import StockMovements from "../AdminSite/StockMovements/StockMovements";
import SupplierManagement from "../AdminSite/Suppliers/SupplierManagement";
import PurchaseOrderManagement from "../AdminSite/PurchaseOrders/PurchaseOrderManagement";
import PurchaseOrderItems from "../AdminSite/PurchaseOrderItems/PurchaseOrderItems";
import Customers from "../AdminSite/Customers/Customers";
import SalesOrders from "../AdminSite/SalesOrders/SalesOrders";
import Profile from "../AdminSite/Profile/Profile";
import EditProfilePage from "../AdminSite/Profile/EditProfilePage";
import SettingsPage from "../AdminSite/Settings/SettingsPage";
import RegisterUserPage from "../AdminSite/Users/RegisterUserPage";
import UserPortalLayout from "../UserPortal/UserPortalLayout";
import UserDashboard from "../UserPortal/UserDashboard";

const MainRouting = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginCommon />}>
          <Route index element={<LoginPage />} />
        </Route>
        <Route path="/" element={<PrivateRoute />} />
        <Route element={<AdminRoute />}>
          <Route path="/Admin" element={<Navigation />}>
            <Route index element={<HomePage />} />
            <Route path="category" element={<ProductCategeory />} />
            <Route path="Units" element={<Units />} />
            <Route path="Company" element={<Companies />} />
            <Route path="users" element={<Users />} />
            <Route path="users/register" element={<RegisterUserPage />} />
            <Route path="reports" element={<Reports />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="settings/profile" element={<EditProfilePage />} />
            {/* <Route path="Sales" element={<Sell />} /> */}
            <Route path="Product" element={<Products />} />
            <Route path="Warehouse" element={ <Warehouse/> }/>
            <Route path="ProductStock" element={ <ProductStock/> }/>
            <Route path="StockMovements" element={ <StockMovements/> }/>
            <Route path="Supplier" element={ <SupplierManagement/> }/>
            <Route path="PurchaseOrder" element={ <PurchaseOrderManagement/> }/>
            <Route path="PurchaseOrderIteam" element={ <PurchaseOrderItems/> }/>
            <Route path="Customer" element={ <Customers/> }/>
            <Route path="SalesOrder" element={ <SalesOrders/> }/>


            <Route path="Master" element={<MasterDetails />} />
            <Route path="CRM/TaskTypes" element={<TaskTypesPage />} />
            <Route path="CRM/SalesStages" element={<SalesStagesPage />} />
            <Route path="CRM/Industries" element={<IndustriesPage />} />
            <Route path="CRM/FollowupTypes" element={<FollowupTypesPage />} />
            <Route path="CRM/LeadSources" element={<LeadSourcesPage />} />
            <Route path="Leads" element={<Leads />} />
            <Route path="Opportunities" element={<Opportunities />} />
            <Route path="PreSales" element={<PreSales />} />
            <Route path="Cases" element={<Cases />} />
            <Route path="Accounts" element={<Accounts />} />
            <Route path="Contact" element={<Contact />} />
          </Route>
        </Route>
        <Route element={<UserRoute />}>
          <Route path="/user" element={<UserPortalLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="settings/profile" element={<EditProfilePage />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="contacts" element={<Contact />} />
            <Route path="leads" element={<Leads />} />
            <Route path="opportunities" element={<Opportunities />} />
            <Route path="presales" element={<PreSales />} />
            <Route path="cases" element={<Cases />} />
            <Route path="products" element={<Products />} />
            <Route path="warehouses" element={<Warehouse />} />
            <Route path="customers" element={<Customers />} />
            <Route path="suppliers" element={<SupplierManagement />} />
            <Route path="purchase-orders" element={<PurchaseOrderManagement />} />
            <Route path="sales-orders" element={<SalesOrders />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Route>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default MainRouting;
