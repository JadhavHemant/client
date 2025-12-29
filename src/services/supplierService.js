import axios from 'axios';
import { SUPPLIERS } from '../Components/Endpoint/Endpoint';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
    };
};

export const supplierService = {
    // Get all suppliers with filters
    getAllSuppliers: async (params = {}) => {
        try {
            const { limit = 10, offset = 0, search = '', isActive = '', sortBy = 'CreatedAt', sortOrder = 'DESC' } = params;
            const url = SUPPLIERS.GET_ALL(limit, offset, search, isActive, sortBy, sortOrder);
            const response = await axios.get(url, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get active suppliers only
    getActiveSuppliers: async () => {
        try {
            const response = await axios.get(SUPPLIERS.GET_ACTIVE, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get supplier by ID
    getSupplierById: async (id) => {
        try {
            const response = await axios.get(SUPPLIERS.GET_BY_ID(id), { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Create new supplier
    createSupplier: async (supplierData) => {
        try {
            const response = await axios.post(SUPPLIERS.CREATE, supplierData, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update supplier
    updateSupplier: async (id, supplierData) => {
        try {
            const response = await axios.put(SUPPLIERS.UPDATE(id), supplierData, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Soft delete supplier
    softDeleteSupplier: async (id) => {
        try {
            const response = await axios.patch(SUPPLIERS.SOFT_DELETE(id), {}, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Hard delete supplier
    hardDeleteSupplier: async (id) => {
        try {
            const response = await axios.delete(SUPPLIERS.HARD_DELETE(id), { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};
