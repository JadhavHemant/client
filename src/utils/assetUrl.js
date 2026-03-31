import { API_BASE_URL } from "../Components/Endpoint/Endpoint";

const PUBLIC_BASE_URL = API_BASE_URL.replace(/\/api$/, "");

export const resolveAssetUrl = (value) => {
  if (!value) {
    return "";
  }

  const normalized = String(value).replace(/\\/g, "/");

  if (/^https?:\/\//i.test(normalized)) {
    return normalized;
  }

  const uploadsIndex = normalized.toLowerCase().lastIndexOf("/uploads/");
  if (uploadsIndex >= 0) {
    return `${PUBLIC_BASE_URL}${normalized.slice(uploadsIndex)}`;
  }

  if (normalized.toLowerCase().startsWith("uploads/")) {
    return `${PUBLIC_BASE_URL}/${normalized}`;
  }

  return normalized.startsWith("/")
    ? `${PUBLIC_BASE_URL}${normalized}`
    : `${PUBLIC_BASE_URL}/${normalized}`;
};

export { PUBLIC_BASE_URL };
