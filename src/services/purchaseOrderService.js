// src/services/purchaseOrderService.js
import axios from 'axios';
import { PURCHASE_ORDERS } from '../Components/Endpoint/Endpoint';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
    };
};

export const purchaseOrderService = {
    // Get all purchase orders with filters
    getAllPurchaseOrders: async (params = {}) => {
        try {
            const url = PURCHASE_ORDERS.GET_ALL(params);
            const response = await axios.get(url, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get purchase order by ID
    getPurchaseOrderById: async (id) => {
        try {
            const response = await axios.get(PURCHASE_ORDERS.GET_BY_ID(id), { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Create new purchase order
    createPurchaseOrder: async (orderData) => {
        try {
            const response = await axios.post(PURCHASE_ORDERS.CREATE, orderData, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update purchase order
    updatePurchaseOrder: async (id, orderData) => {
        try {
            const response = await axios.put(PURCHASE_ORDERS.UPDATE(id), orderData, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update purchase order status
    updatePurchaseOrderStatus: async (id, status) => {
        try {
            const response = await axios.patch(
                PURCHASE_ORDERS.UPDATE_STATUS(id),
                { Status: status },
                { headers: getAuthHeaders() }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Soft delete (cancel) purchase order
    softDeletePurchaseOrder: async (id) => {
        try {
            const response = await axios.patch(PURCHASE_ORDERS.SOFT_DELETE(id), {}, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Hard delete purchase order
    hardDeletePurchaseOrder: async (id) => {
        try {
            const response = await axios.delete(PURCHASE_ORDERS.HARD_DELETE(id), { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get purchase orders by supplier
    getPurchaseOrdersBySupplier: async (supplierId, limit = 10, offset = 0) => {
        try {
            const response = await axios.get(
                PURCHASE_ORDERS.BY_SUPPLIER(supplierId, limit, offset),
                { headers: getAuthHeaders() }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get purchase order statistics
    getPurchaseOrderStats: async (companyId = '') => {
        try {
            const response = await axios.get(PURCHASE_ORDERS.STATS(companyId), { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};
