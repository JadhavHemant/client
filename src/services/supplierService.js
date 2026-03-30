import { SUPPLIERS } from '../Components/Endpoint/Endpoint';
import axiosInstance from '../Components/AdminSite/utils/axiosInstance';

export const supplierService = {
    // Get all suppliers with filters
    getAllSuppliers: async (params = {}) => {
        try {
            const { limit = 10, offset = 0, search = '', isActive = '', sortBy = 'CreatedAt', sortOrder = 'DESC' } = params;
            const url = SUPPLIERS.GET_ALL(limit, offset, search, isActive, sortBy, sortOrder);
            const response = await axiosInstance.get(url);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get active suppliers only
    getActiveSuppliers: async () => {
        try {
            const response = await axiosInstance.get(SUPPLIERS.GET_ACTIVE);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get supplier by ID
    getSupplierById: async (id) => {
        try {
            const response = await axiosInstance.get(SUPPLIERS.GET_BY_ID(id));
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Create new supplier
    createSupplier: async (supplierData) => {
        try {
            const response = await axiosInstance.post(SUPPLIERS.CREATE, supplierData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update supplier
    updateSupplier: async (id, supplierData) => {
        try {
            const response = await axiosInstance.put(SUPPLIERS.UPDATE(id), supplierData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Soft delete supplier
    softDeleteSupplier: async (id) => {
        try {
            const response = await axiosInstance.patch(SUPPLIERS.SOFT_DELETE(id), {});
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Hard delete supplier
    hardDeleteSupplier: async (id) => {
        try {
            const response = await axiosInstance.delete(SUPPLIERS.HARD_DELETE(id));
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};
