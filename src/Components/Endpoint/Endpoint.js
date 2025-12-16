const BASE_URL = "http://localhost:5351/api/users";
const BASE_URL_TOKEN = "http://localhost:5351/api/token";
const BASE_URL_COMPANY = "http://localhost:5351/api/company";
const BASE_URL_PRODUCT_CATEGORY = "http://localhost:5351/api/productcategory";
const BASE_URL_UNITS = "http://localhost:5351/api/units";
const API_BASE_URL = "http://localhost:5351/api";


export const LOGIN_USER = `${BASE_URL}/login`;
export const FORGOT_PASSWORD = `${BASE_URL}/forgot-password`;
export const RESET_PASSWORD = `${BASE_URL}/reset-password`;
export const PROFILE = `${BASE_URL}/profile`;
export const CREATEUSER = `${BASE_URL}/register`;
export const GETALLUSERS = `${BASE_URL}/getall/profiles`;

export const REFRESH_TOKEN = `${BASE_URL_TOKEN}/refresh-token`;

export const CREATE_COMPANY = `${BASE_URL_COMPANY}/`;
export const GET_COMPANY = `${BASE_URL_COMPANY}/`;
export const GET_COMPANY_BY_ID = (id) => `${BASE_URL_COMPANY}/${id}`;
export const UPDATE_COMPANY = (id) => `${BASE_URL_COMPANY}/${id}`;
export const DELETE_COMPANY = (id) => `${BASE_URL_COMPANY}/${id}`;
export const TOGGLE_DELETE_COMPANY = (id) => `${BASE_URL_COMPANY}/${id}/toggle-delete`;
export const TOGGLE_ACTIVE_COMPANY = (id) => `${BASE_URL_COMPANY}/${id}/toggle-active`;
export const TOGGLE_FLAG_COMPANY = (id) => `${BASE_URL_COMPANY}/${id}/toggle-flag`;

export const COMPANIES = {
    BASE: BASE_URL_COMPANY,
    CREATE: `${API_BASE_URL}/company/create`,
    GET_ALL: (limit, offset, search) => {
        const params = new URLSearchParams();
        if (limit) params.append('limit', limit);
        if (offset) params.append('offset', offset);
        if (search) params.append('search', search);
        return `${API_BASE_URL}/company/list?${params.toString()}`;
    },
    GET_ACTIVE: `${API_BASE_URL}/company/active`,
    GET_BY_ID: (id) => `${API_BASE_URL}/company/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/company/${id}`,
    DELETE: (id) => `${API_BASE_URL}/company/delete/${id}`,
    TOGGLE_ACTIVE: (id) => `${API_BASE_URL}/company/${id}/toggle-active`,
    TOGGLE_FLAG: (id) => `${API_BASE_URL}/company/${id}/toggle-flag`,
    GET_STATS: `${API_BASE_URL}/company/stats`,
    EXPORT: `${API_BASE_URL}/company/export`,
};

export const PRODUCT_CATEGORY = {
    BASE: BASE_URL_PRODUCT_CATEGORY,
    CREATE: `${BASE_URL_PRODUCT_CATEGORY}/create`,
    GET_ALL: (limit = 10, offset = 0, search = '') =>
        `${BASE_URL_PRODUCT_CATEGORY}/list?limit=${limit}&offset=${offset}&search=${search}`,
    GET_ACTIVE: `${BASE_URL_PRODUCT_CATEGORY}/active`,
    GET_BY_ID: (id) => `${BASE_URL_PRODUCT_CATEGORY}/${id}`,
    UPDATE: (id) => `${BASE_URL_PRODUCT_CATEGORY}/${id}`,
    SOFT_DELETE: (id) => `${BASE_URL_PRODUCT_CATEGORY}/delete/${id}`,
    HARD_DELETE: (id) => `${BASE_URL_PRODUCT_CATEGORY}/${id}`
};

export const CATEGORIES = {
    BASE: BASE_URL_PRODUCT_CATEGORY,
    CREATE: `${BASE_URL_PRODUCT_CATEGORY}/create`,
    GET_ALL: (limit = 10, offset = 0, search = '') =>
        `${BASE_URL_PRODUCT_CATEGORY}/list?limit=${limit}&offset=${offset}&search=${search}`,
    GET_ACTIVE: `${BASE_URL_PRODUCT_CATEGORY}/active`, 
    GET_BY_ID: (id) => `${BASE_URL_PRODUCT_CATEGORY}/${id}`,
    UPDATE: (id) => `${BASE_URL_PRODUCT_CATEGORY}/${id}`,
    DELETE: (id) => `${BASE_URL_PRODUCT_CATEGORY}/delete/${id}`,
    SOFT_DELETE: (id) => `${BASE_URL_PRODUCT_CATEGORY}/delete/${id}`,
};

export const UNITS = {
    BASE: BASE_URL_UNITS,
    CREATE: `${BASE_URL_UNITS}/create`,
    BULK_CREATE: `${BASE_URL_UNITS}/bulk-create`,
    GET_ALL: (limit = 10, offset = 0, search = '') =>
        `${BASE_URL_UNITS}/list?limit=${limit}&offset=${offset}&search=${search}`,
    GET_ACTIVE: `${BASE_URL_UNITS}/active`,  
    SEARCH: (query) => `${BASE_URL_UNITS}/search?q=${encodeURIComponent(query)}`,
    GET_BY_ID: (id) => `${BASE_URL_UNITS}/${id}`,
    UPDATE: (id) => `${BASE_URL_UNITS}/${id}`,
    SOFT_DELETE: (id) => `${BASE_URL_UNITS}/delete/${id}`,
    HARD_DELETE: (id) => `${BASE_URL_UNITS}/${id}`
};

export const PRODUCTS = {
    BASE: `${API_BASE_URL}/products`,
    CREATE: `${API_BASE_URL}/products/create`,
    GET_ALL: (limit, offset, search, categoryId, companyId, isActive, lowStock, sortBy, sortOrder) => {
        const params = new URLSearchParams();
        if (limit) params.append('limit', limit);
        if (offset) params.append('offset', offset);
        if (search) params.append('search', search);
        if (categoryId) params.append('categoryId', categoryId);
        if (companyId) params.append('companyId', companyId);
        if (isActive !== undefined && isActive !== '') params.append('isActive', isActive);
        if (lowStock) params.append('lowStock', lowStock);
        if (sortBy) params.append('sortBy', sortBy);
        if (sortOrder) params.append('sortOrder', sortOrder);
        return `${API_BASE_URL}/products/list?${params.toString()}`;
    },
    GET_BY_ID: (id) => `${API_BASE_URL}/products/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/products/${id}`,
    DELETE: (id) => `${API_BASE_URL}/products/delete/${id}`,
    TOGGLE_ACTIVE: (id) => `${API_BASE_URL}/products/${id}/toggle-active`,
    LOW_STOCK: (companyId, limit) => {
        const params = new URLSearchParams();
        if (companyId) params.append('companyId', companyId);
        if (limit) params.append('limit', limit);
        return `${API_BASE_URL}/products/alerts/low-stock?${params.toString()}`;
    },
    STATS: (companyId) => {
        const params = new URLSearchParams();
        if (companyId) params.append('companyId', companyId);
        return `${API_BASE_URL}/products/reports/stats?${params.toString()}`;
    },
    BULK_DELETE: `${API_BASE_URL}/products/bulk-delete`,
};

// ==================== WAREHOUSE ENDPOINTS ====================
export const WAREHOUSES = {
    BASE: `${API_BASE_URL}/warehouses`,
    BY_ID: (id) => `${API_BASE_URL}/warehouses/${id}`,
    ACTIVE: `${API_BASE_URL}/warehouses/active`,
    BY_COMPANY: (companyId) => `${API_BASE_URL}/warehouses/company/${companyId}`,
    TOGGLE_STATUS: (id) => `${API_BASE_URL}/warehouses/${id}/toggle`,
    SOFT_DELETE: (id) => `${API_BASE_URL}/warehouses/${id}/soft`,
    HARD_DELETE: (id) => `${API_BASE_URL}/warehouses/${id}/hard`,
    BULK_IMPORT: `${API_BASE_URL}/warehouses/bulk-import`
};


export default {
    COMPANIES,
    CATEGORIES,
    PRODUCT_CATEGORY,
    UNITS,
    PRODUCTS,
    LOGIN_USER,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    PROFILE,
    CREATEUSER,
    GETALLUSERS,
    REFRESH_TOKEN,
};
