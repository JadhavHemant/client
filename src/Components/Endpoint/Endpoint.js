const BASE_URL = "http://localhost:5351/api/users";
const BASE_URL_TOKEN = "http://localhost:5351/api/token";
const BASE_URL_COMPANY = "http://localhost:5351/api/company";
const BASE_URL_PRODUCT_CATEGORY = "http://localhost:5351/api/productcategory";
const BASE_URL_UNITS = "http://localhost:5351/api/units";
const API_BASE_URL = "http://localhost:5351/api";

// ==================== USER AUTHENTICATION ====================
export const LOGIN_USER = `${BASE_URL}/login`;
export const FORGOT_PASSWORD = `${BASE_URL}/forgot-password`;
export const RESET_PASSWORD = `${BASE_URL}/reset-password`;
export const PROFILE = `${BASE_URL}/profile`;
export const CREATEUSER = `${BASE_URL}/register`;
export const GETALLUSERS = `${BASE_URL}/getall/profiles`;

// ==================== TOKEN ====================
export const REFRESH_TOKEN = `${BASE_URL_TOKEN}/refresh-token`;

// ==================== LEGACY COMPANY ENDPOINTS ====================
export const CREATE_COMPANY = `${BASE_URL_COMPANY}/`;
export const GET_COMPANY = `${BASE_URL_COMPANY}/`;
export const GET_COMPANY_BY_ID = (id) => `${BASE_URL_COMPANY}/${id}`;
export const UPDATE_COMPANY = (id) => `${BASE_URL_COMPANY}/${id}`;
export const DELETE_COMPANY = (id) => `${BASE_URL_COMPANY}/${id}`;
export const TOGGLE_DELETE_COMPANY = (id) => `${BASE_URL_COMPANY}/${id}/toggle-delete`;
export const TOGGLE_ACTIVE_COMPANY = (id) => `${BASE_URL_COMPANY}/${id}/toggle-active`;
export const TOGGLE_FLAG_COMPANY = (id) => `${BASE_URL_COMPANY}/${id}/toggle-flag`;

// ==================== COMPANIES ====================
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

// ==================== PRODUCT CATEGORIES ====================
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

// ==================== UNITS ====================
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

// ==================== PRODUCTS ====================
export const PRODUCTS = {
    BASE: `${API_BASE_URL}/products`,
    ACTIVE: `${API_BASE_URL}/products/active`, // ✅ ADDED for getActiveProducts
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
    BY_ID: (id) => `${API_BASE_URL}/products/${id}`, // ✅ ADDED alias
    UPDATE: (id) => `${API_BASE_URL}/products/${id}`,
    DELETE: (id) => `${API_BASE_URL}/products/delete/${id}`,
    HARD_DELETE: (id) => `${API_BASE_URL}/products/delete/${id}`, // ✅ ADDED alias
    TOGGLE_ACTIVE: (id) => `${API_BASE_URL}/products/${id}/toggle-active`,
    TOGGLE_STATUS: (id) => `${API_BASE_URL}/products/${id}/toggle-active`, // ✅ ADDED alias
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
    BY_CATEGORY: (categoryId) => `${API_BASE_URL}/products/category/${categoryId}`, // ✅ ADDED
    BY_COMPANY: (companyId) => `${API_BASE_URL}/products/company/${companyId}`, // ✅ ADDED
};

// ==================== WAREHOUSES ====================
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

// ==================== PRODUCT STOCK ====================
export const PRODUCT_STOCK = {
    BASE: `${API_BASE_URL}/product-stock`, // ✅ FIXED: Added full URL
    BY_ID: (id) => `${API_BASE_URL}/product-stock/${id}`,
    BY_PRODUCT: (productId) => `${API_BASE_URL}/product-stock/product/${productId}`,
    BY_WAREHOUSE: (warehouseId) => `${API_BASE_URL}/product-stock/warehouse/${warehouseId}`,
    LOW_STOCK: `${API_BASE_URL}/product-stock/low-stock`,
    ADJUST: (id) => `${API_BASE_URL}/product-stock/${id}/adjust`,
    TRANSFER: `${API_BASE_URL}/product-stock/transfer`,
    SOFT_DELETE: (id) => `${API_BASE_URL}/product-stock/${id}/soft`,
    HARD_DELETE: (id) => `${API_BASE_URL}/product-stock/${id}/hard`
};



export const STOCK_MOVEMENTS = {
  BASE: `${API_BASE_URL}/stock-movements`,
  BY_ID: (id) => `${API_BASE_URL}/stock-movements/${id}`,
  STATS: `${API_BASE_URL}/stock-movements/stats`,
  RECENT: `${API_BASE_URL}/stock-movements/recent`,
  CREATE: `${API_BASE_URL}/stock-movements`,
  UPDATE: (id) => `${API_BASE_URL}/stock-movements/${id}`,
  DELETE: (id) => `${API_BASE_URL}/stock-movements/${id}`,
};

export const SUPPLIERS = {
    BASE: `${API_BASE_URL}/suppliers`,
    CREATE: `${API_BASE_URL}/suppliers`,
    GET_ALL: (limit = 10, offset = 0, search = '', isActive = '', sortBy = 'CreatedAt', sortOrder = 'DESC') => {
        const params = new URLSearchParams();
        if (limit) params.append('limit', limit);
        if (offset) params.append('offset', offset);
        if (search) params.append('search', search);
        if (isActive !== '') params.append('isActive', isActive);
        if (sortBy) params.append('sortBy', sortBy);
        if (sortOrder) params.append('sortOrder', sortOrder);
        return `${API_BASE_URL}/suppliers?${params.toString()}`;
    },
    GET_ACTIVE: `${API_BASE_URL}/suppliers?isActive=true`,
    GET_BY_ID: (id) => `${API_BASE_URL}/suppliers/${id}`,
    BY_ID: (id) => `${API_BASE_URL}/suppliers/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/suppliers/${id}`,
    SOFT_DELETE: (id) => `${API_BASE_URL}/suppliers/soft-delete/${id}`,
    HARD_DELETE: (id) => `${API_BASE_URL}/suppliers/hard-delete/${id}`,
    DELETE: (id) => `${API_BASE_URL}/suppliers/soft-delete/${id}`, // alias for soft delete
};






// ==================== HELPER FUNCTION ====================
export const buildUrl = (endpoint, params = {}) => {
    const queryString = new URLSearchParams(
        Object.entries(params).filter(([, value]) => 
            value !== null && value !== undefined && value !== ''
        )
    ).toString();
    
    return queryString ? `${endpoint}?${queryString}` : endpoint;
};

// ==================== PURCHASE ORDERS ====================
export const PURCHASE_ORDERS = {
    BASE: `${API_BASE_URL}/purchase-orders`,
    CREATE: `${API_BASE_URL}/purchase-orders`,
    GET_ALL: (params = {}) => {
        const {
            limit = 10,
            offset = 0,
            status = '',
            supplierId = '',
            companyId = '',
            search = '',
            sortBy = 'OrderDate',
            sortOrder = 'DESC',
            startDate = '',
            endDate = ''
        } = params;

        const queryParams = new URLSearchParams();
        if (limit) queryParams.append('limit', limit);
        if (offset) queryParams.append('offset', offset);
        if (status) queryParams.append('status', status);
        if (supplierId) queryParams.append('supplierId', supplierId);
        if (companyId) queryParams.append('companyId', companyId);
        if (search) queryParams.append('search', search);
        if (sortBy) queryParams.append('sortBy', sortBy);
        if (sortOrder) queryParams.append('sortOrder', sortOrder);
        if (startDate) queryParams.append('startDate', startDate);
        if (endDate) queryParams.append('endDate', endDate);

        return `${API_BASE_URL}/purchase-orders?${queryParams.toString()}`;
    },
    GET_BY_ID: (id) => `${API_BASE_URL}/purchase-orders/${id}`,
    BY_ID: (id) => `${API_BASE_URL}/purchase-orders/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/purchase-orders/${id}`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/purchase-orders/${id}/status`,
    SOFT_DELETE: (id) => `${API_BASE_URL}/purchase-orders/soft-delete/${id}`,
    HARD_DELETE: (id) => `${API_BASE_URL}/purchase-orders/hard-delete/${id}`,
    DELETE: (id) => `${API_BASE_URL}/purchase-orders/soft-delete/${id}`,
    BY_SUPPLIER: (supplierId, limit = 10, offset = 0) => 
        `${API_BASE_URL}/purchase-orders/supplier/${supplierId}?limit=${limit}&offset=${offset}`,
    STATS: (companyId = '') => {
        const params = companyId ? `?companyId=${companyId}` : '';
        return `${API_BASE_URL}/purchase-orders/stats${params}`;
    }
};

export const PURCHASE_ORDER_ITEMS = {
    BASE: `${API_BASE_URL}/purchase-order-items`,
    CREATE: `${API_BASE_URL}/purchase-order-items`,
    GET_ALL: (params = {}) => {
        const { limit = 10, offset = 0, productId = '', status = '' } = params;
        const queryParams = new URLSearchParams();
        if (limit) queryParams.append('limit', limit);
        if (offset) queryParams.append('offset', offset);
        if (productId) queryParams.append('productId', productId);
        if (status) queryParams.append('status', status);
        return `${API_BASE_URL}/purchase-order-items?${queryParams.toString()}`;
    },
    GET_BY_ID: (id) => `${API_BASE_URL}/purchase-order-items/${id}`,
    BY_ID: (id) => `${API_BASE_URL}/purchase-order-items/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/purchase-order-items/${id}`,
    DELETE: (id) => `${API_BASE_URL}/purchase-order-items/${id}`,
    BY_PURCHASE_ORDER: (purchaseOrderId, limit = 50, offset = 0) => 
        `${API_BASE_URL}/purchase-order-items/purchase-order/${purchaseOrderId}?limit=${limit}&offset=${offset}`,
    SUMMARY: (purchaseOrderId) => 
        `${API_BASE_URL}/purchase-order-items/summary/${purchaseOrderId}`,
    BULK_RECEIVE: `${API_BASE_URL}/purchase-order-items/bulk-receive`
};



// ==================== DEFAULT EXPORT ====================
export default {
    API_BASE_URL,
    COMPANIES,
    CATEGORIES,
    PRODUCT_CATEGORY,
    UNITS,
    PRODUCTS,
    WAREHOUSES,
    PRODUCT_STOCK,
    LOGIN_USER,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    PROFILE,
    CREATEUSER,
    GETALLUSERS,
    REFRESH_TOKEN,
        PURCHASE_ORDERS,
    PURCHASE_ORDER_ITEMS,
    buildUrl
};