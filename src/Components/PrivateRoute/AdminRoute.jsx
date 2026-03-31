import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { getDefaultPortalPath, isSuperAdminUser } from "../../utils/sessionUser";

const AdminRoute = () => {
  const isLoggedIn = !!Cookies.get("accessToken") || !!Cookies.get("refreshToken");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!isSuperAdminUser()) {
    return <Navigate to={getDefaultPortalPath()} replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
