const API_BASE_URL_RAW =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? "http://localhost:5351/api"
    : "https://server-67qi.onrender.com/api");
// Ensure we never end up with a double slash when composing URLs.
export const API_BASE_URL = API_BASE_URL_RAW.replace(/\/$/, "");

const BASE_URL = `${API_BASE_URL}/users`;
const BASE_URL_TOKEN = `${API_BASE_URL}/token`;
const BASE_URL_COMPANY = `${API_BASE_URL}/company`;
const BASE_URL_PRODUCT_CATEGORY = `${API_BASE_URL}/productcategory`;
const BASE_URL_UNITS = `${API_BASE_URL}/units`;

// ==================== USER AUTHENTICATION ====================
export const LOGIN_USER = `${BASE_URL}/login`;
export const FORGOT_PASSWORD = `${BASE_URL}/forgot-password`;
export const RESET_PASSWORD = `${BASE_URL}/reset-password`;
export const PROFILE = `${BASE_URL}/profile`;
export const CREATEUSER = `${BASE_URL}/register`;
export const GETALLUSERS = `${BASE_URL}/getall/profiles`;
export const UPDATE_USER = `${BASE_URL}/update`;
export const USERS_HIERARCHY = `${BASE_URL}/org/hierarchy`;
export const USERS_MY_TEAM = `${BASE_URL}/my-team`;
export const USERS_DIRECT_REPORTS = (userId) => `${BASE_URL}/direct-reports/${userId}`;
export const USERS_COMPANY_ORG = (companyId) => `${BASE_URL}/company/${companyId}/org-chart`;
export const ROLES = `${API_BASE_URL}/roles`;
export const USER_TYPES = `${API_BASE_URL}/usertypes/get/usertypes`;

// ==================== REPORTS & MONITORING ====================
export const REPORTS_DASHBOARD = `${API_BASE_URL}/reports/dashboard`;
export const REPORTS_EMPLOYEE_ACTIVITY = `${API_BASE_URL}/reports/employee-activity`;
export const REPORTS_NOTIFICATIONS = `${API_BASE_URL}/reports/notifications`;
export const MONITORING_EXECUTION_LOG = `${API_BASE_URL}/monitoring/execution-log`;

// ==================== TOKEN ====================
export const REFRESH_TOKEN = `${BASE_URL_TOKEN}/refresh-token`;

// ==================== CRM MASTER DATA ====================
// These are used by `MasterDetails.jsx` for dropdown CRUD.
// Note: `TaskType` is already implemented on the backend; the others can be wired similarly.
export const TASKTYPE = `${API_BASE_URL}/TaskType`;
export const SALESSTAGES = `${API_BASE_URL}/SalesStages`;
export const PRODUCTCATEGORIES = `${API_BASE_URL}/productcategory/list`;
export const INDUSTRIES = `${API_BASE_URL}/Industries`;
export const FOLLOWUPTYPES = `${API_BASE_URL}/FollowupTypes`;

// TaskType create/delete helpers used by `MasterDetails.jsx`
export const POSTTASKTYPE = `${API_BASE_URL}/TaskType`;
export const DELETETASKTYPE = (id) => `${API_BASE_URL}/TaskType/${id}`;

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
    BASE: `${API_BASE_URL}/Suppliers`,
    CREATE: `${API_BASE_URL}/Suppliers`,
    GET_ALL: (limit = 10, offset = 0, search = '', isActive = '', sortBy = 'CreatedAt', sortOrder = 'DESC') => {
        const params = new URLSearchParams();
        if (limit) params.append('limit', limit);
        if (offset) params.append('offset', offset);
        if (search) params.append('search', search);
        if (isActive !== '') params.append('isActive', isActive);
        if (sortBy) params.append('sortBy', sortBy);
        if (sortOrder) params.append('sortOrder', sortOrder);
        return `${API_BASE_URL}/Suppliers?${params.toString()}`;
    },
    GET_ACTIVE: `${API_BASE_URL}/Suppliers?isActive=true`,
    GET_BY_ID: (id) => `${API_BASE_URL}/Suppliers/${id}`,
    BY_ID: (id) => `${API_BASE_URL}/Suppliers/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/Suppliers/${id}`,
    SOFT_DELETE: (id) => `${API_BASE_URL}/Suppliers/soft-delete/${id}`,
    HARD_DELETE: (id) => `${API_BASE_URL}/Suppliers/hard-delete/${id}`,
    DELETE: (id) => `${API_BASE_URL}/Suppliers/soft-delete/${id}`, // alias for soft delete
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
        const { limit = 10, offset = 0 } = params;
        const queryParams = new URLSearchParams();
        if (limit) queryParams.append('limit', limit);
        if (offset) queryParams.append('offset', offset);
        return `${API_BASE_URL}/purchase-order-items?${queryParams.toString()}`;
    },
    BY_PURCHASE_ORDER: (purchaseOrderId, limit = 50, offset = 0) => 
        `${API_BASE_URL}/purchase-order-items/purchase-order/${purchaseOrderId}?limit=${limit}&offset=${offset}`,
    SUMMARY: (purchaseOrderId) => 
        `${API_BASE_URL}/purchase-order-items/summary/${purchaseOrderId}`,
    UPDATE: (id) => `${API_BASE_URL}/purchase-order-items/${id}`,
    DELETE: (id) => `${API_BASE_URL}/purchase-order-items/${id}`,
    BULK_RECEIVE: `${API_BASE_URL}/purchase-order-items/bulk-receive`
};


// Add this to your existing Endpoint.js file

export const CUSTOMERS = {
    BASE: `${API_BASE_URL}/Customers`,
    GET_ALL: (params = {}) => {
        const { 
            limit = 10, offset = 0, search = '', isActive = '', 
            customerType = '', sortBy = 'CreatedAt', sortOrder = 'DESC', 
            includeDeleted = 'false' 
        } = params;
        
        const queryParams = new URLSearchParams();
        if (limit) queryParams.append('limit', limit);
        if (offset) queryParams.append('offset', offset);
        if (search) queryParams.append('search', search);
        if (isActive !== '') queryParams.append('isActive', isActive);
        if (customerType) queryParams.append('customerType', customerType);
        if (sortBy) queryParams.append('sortBy', sortBy);
        if (sortOrder) queryParams.append('sortOrder', sortOrder);
        if (includeDeleted) queryParams.append('includeDeleted', includeDeleted);
        
        return `${API_BASE_URL}/Customers?${queryParams.toString()}`;
    },
    GET_BY_ID: (id) => `${API_BASE_URL}/Customers/${id}`,
    GET_ACTIVE: `${API_BASE_URL}/Customers/active`,
    STATS: `${API_BASE_URL}/Customers/stats`,
    CREATE: `${API_BASE_URL}/Customers`,
    UPDATE: (id) => `${API_BASE_URL}/Customers/${id}`,
    TOGGLE_ACTIVE: (id) => `${API_BASE_URL}/Customers/${id}/toggle-active`,
    UPDATE_OUTSTANDING: (id) => `${API_BASE_URL}/Customers/${id}/outstanding`,
    SOFT_DELETE: (id) => `${API_BASE_URL}/Customers/${id}/soft-delete`,
    RESTORE: (id) => `${API_BASE_URL}/Customers/${id}/restore`,
    HARD_DELETE: (id) => `${API_BASE_URL}/Customers/${id}`
};



// Add to your existing Endpoint.js

export const SALES_ORDERS = {
    BASE: `${API_BASE_URL}/sales-orders`,
    GET_ALL: (params = {}) => {
        const { 
            limit = 10, offset = 0, search = '', status = '', paymentStatus = '',
            customerId = '', startDate = '', endDate = '', priority = '',
            sortBy = 'OrderDate', sortOrder = 'DESC', includeDeleted = 'false'
        } = params;
        
        const queryParams = new URLSearchParams();
        if (limit) queryParams.append('limit', limit);
        if (offset) queryParams.append('offset', offset);
        if (search) queryParams.append('search', search);
        if (status) queryParams.append('status', status);
        if (paymentStatus) queryParams.append('paymentStatus', paymentStatus);
        if (customerId) queryParams.append('customerId', customerId);
        if (startDate) queryParams.append('startDate', startDate);
        if (endDate) queryParams.append('endDate', endDate);
        if (priority) queryParams.append('priority', priority);
        if (sortBy) queryParams.append('sortBy', sortBy);
        if (sortOrder) queryParams.append('sortOrder', sortOrder);
        if (includeDeleted) queryParams.append('includeDeleted', includeDeleted);
        
        return `${API_BASE_URL}/sales-orders?${queryParams.toString()}`;
    },
    GET_BY_ID: (id) => `${API_BASE_URL}/sales-orders/${id}`,
    STATS: `${API_BASE_URL}/sales-orders/stats`,
    BY_CUSTOMER: (customerId, limit = 10, offset = 0) => 
        `${API_BASE_URL}/sales-orders/customer/${customerId}?limit=${limit}&offset=${offset}`,
    CREATE: `${API_BASE_URL}/sales-orders`,
    UPDATE: (id) => `${API_BASE_URL}/sales-orders/${id}`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/sales-orders/${id}/status`,
    UPDATE_PAYMENT: (id) => `${API_BASE_URL}/sales-orders/${id}/payment`,
    SOFT_DELETE: (id) => `${API_BASE_URL}/sales-orders/${id}/soft-delete`,
    RESTORE: (id) => `${API_BASE_URL}/sales-orders/${id}/restore`,
    HARD_DELETE: (id) => `${API_BASE_URL}/sales-orders/${id}`
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
