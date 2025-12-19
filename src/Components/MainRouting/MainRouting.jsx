import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "../AdminSite/NavigationBar/NavigationBar";
import LoginCommon from "../LoginPage/LoginCommon";
import LoginPage from "../LoginPage/LoginPage";
import Sell from "../AdminSite/Sell/Sell";
import HomePage from "../AdminSite/HomePage/HomePage";
import Users from "../AdminSite/Users/Users";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import CompanyManagement from "../AdminSite/Company/Company";
import ProductCategeory from "../AdminSite/ProductCategeory/ProductCategeory";
import Products from "../AdminSite/Products/Products";
import Reports from "../AdminSite/Reports/Reports";
import MasterDetails from "../AdminSite/CRM/MasterDetails/MasterDetails";
import Leads from "../AdminSite/CRM/Leads/Leads";
import Opportunities from "../AdminSite/CRM/Opportunities/Opportunities";
import PreSales from "../AdminSite/CRM/PreSales/PreSales";
import Cases from "../AdminSite/CRM/Cases/Cases";
import Contact from "../AdminSite/CRM/Contact/Contact";
import Accounts from "../AdminSite/CRM/Accounts/Accounts";
import Units from "../AdminSite/Units/Units";
import Companies from "../AdminSite/Company/Company";
import Warehouse from "../AdminSite/Warehouse/Warehouse";
import ProductStock from "../AdminSite/ProductStock/ProductStock";

const MainRouting = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginCommon />}>
          <Route index element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/Admin" element={<Navigation />}>
            <Route index element={<HomePage />} />
            <Route path="category" element={<ProductCategeory />} />
            <Route path="Units" element={<Units />} />
            <Route path="Company" element={<Companies />} />
            <Route path="users" element={<Users />} />
            <Route path="reports" element={<Reports />} />
            <Route path="Sales" element={<Sell />} />
            <Route path="Product" element={<Products />} />
            <Route path="Warehouse" element={ <Warehouse/> }/>
            <Route path="ProductStock" element={ <ProductStock/> }/>

            <Route path="Master" element={<MasterDetails />} />
            <Route path="Leads" element={<Leads />} />
            <Route path="Opportunities" element={<Opportunities />} />
            <Route path="PreSales" element={<PreSales />} />
            <Route path="Cases" element={<Cases />} />
            <Route path="Accounts" element={<Accounts />} />
            <Route path="Contact" element={<Contact />} />
          </Route>
        </Route>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default MainRouting;
