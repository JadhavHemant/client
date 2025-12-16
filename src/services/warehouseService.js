import axiosInstance from '../Components/AdminSite/utils/axiosInstance';
import { WAREHOUSES } from '../Components/Endpoint/Endpoint';

// Get all warehouses with filters and pagination
export const getWarehouses = async (limit = 10, offset = 0, search = '', filters = {}) => {
    try {
        const params = new URLSearchParams({
            limit,
            offset,
            search,
            ...filters
        });

        const response = await axiosInstance.get(`${WAREHOUSES.BASE}?${params}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Get active warehouses (for dropdowns)
export const getActiveWarehouses = async (companyId = null) => {
    try {
        const params = companyId ? `?companyId=${companyId}` : '';
        const response = await axiosInstance.get(`${WAREHOUSES.ACTIVE}${params}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Get warehouse by ID
export const getWarehouseById = async (id) => {
    try {
        const response = await axiosInstance.get(WAREHOUSES.BY_ID(id));
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Get warehouses by company
export const getWarehousesByCompany = async (companyId, includeInactive = false) => {
    try {
        const response = await axiosInstance.get(`${WAREHOUSES.BY_COMPANY(companyId)}?includeInactive=${includeInactive}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Create warehouse
export const createWarehouse = async (warehouseData) => {
    try {
        const response = await axiosInstance.post(WAREHOUSES.BASE, warehouseData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Update warehouse
export const updateWarehouse = async (id, warehouseData) => {
    try {
        const response = await axiosInstance.put(WAREHOUSES.BY_ID(id), warehouseData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Toggle warehouse status
export const toggleActiveStatus = async (id) => {
    try {
        const response = await axiosInstance.patch(WAREHOUSES.TOGGLE_STATUS(id));
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Soft delete warehouse
export const softDeleteWarehouse = async (id) => {
    try {
        const response = await axiosInstance.delete(WAREHOUSES.SOFT_DELETE(id));
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Hard delete warehouse
export const deleteWarehouse = async (id) => {
    try {
        const response = await axiosInstance.delete(WAREHOUSES.HARD_DELETE(id));
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Bulk import warehouses
export const bulkImportWarehouses = async (warehouses) => {
    try {
        const response = await axiosInstance.post(WAREHOUSES.BULK_IMPORT, { warehouses });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
