import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { getDefaultPortalPath, isSuperAdminUser } from "../../utils/sessionUser";
import { getUserPortalItems } from "../UserPortal/userPortalConfig";
import { getSessionUser } from "../../utils/sessionUser";

const UserRoute = () => {
  const isLoggedIn = !!Cookies.get("accessToken") || !!Cookies.get("refreshToken");
  const location = useLocation();
  const user = getSessionUser();
  const allowedItems = getUserPortalItems(user?.roleId);
  const hasAllowedRoute = allowedItems.some(
    (item) =>
      location.pathname === item.to ||
      (item.to !== "/user" && location.pathname.startsWith(`${item.to}/`))
  );

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isSuperAdminUser()) {
    return <Navigate to={getDefaultPortalPath()} replace />;
  }

  if (!hasAllowedRoute) {
    return <Navigate to="/user" replace />;
  }

  return <Outlet />;
};

export default UserRoute;
