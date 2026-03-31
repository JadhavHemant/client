import Cookies from "js-cookie";
import { getUserFromToken } from "../Components/AdminSite/utils/tokenUtils";

export const getSessionUser = () => {
  try {
    const rawUser = Cookies.get("user");
    if (rawUser) {
      return JSON.parse(rawUser);
    }
  } catch (error) {
    // fall back to token payload
  }

  return getUserFromToken() || null;
};

export const isSuperAdminUser = (user = getSessionUser()) => Number(user?.roleId) === 1;

export const getDefaultPortalPath = (user = getSessionUser()) =>
  isSuperAdminUser(user) ? "/Admin" : "/user";
