// src/services/purchaseOrderService.js
import { PURCHASE_ORDERS } from '../Components/Endpoint/Endpoint';
import axiosInstance from '../Components/AdminSite/utils/axiosInstance';

export const purchaseOrderService = {
    // Get all purchase orders with filters
    getAllPurchaseOrders: async (params = {}) => {
        try {
            const url = PURCHASE_ORDERS.GET_ALL(params);
            const response = await axiosInstance.get(url);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get purchase order by ID
    getPurchaseOrderById: async (id) => {
        try {
            const response = await axiosInstance.get(PURCHASE_ORDERS.GET_BY_ID(id));
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Create new purchase order
    createPurchaseOrder: async (orderData) => {
        try {
            const response = await axiosInstance.post(PURCHASE_ORDERS.CREATE, orderData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update purchase order
    updatePurchaseOrder: async (id, orderData) => {
        try {
            const response = await axiosInstance.put(PURCHASE_ORDERS.UPDATE(id), orderData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update purchase order status
    updatePurchaseOrderStatus: async (id, status) => {
        try {
            const response = await axiosInstance.patch(PURCHASE_ORDERS.UPDATE_STATUS(id), { Status: status });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Soft delete (cancel) purchase order
    softDeletePurchaseOrder: async (id) => {
        try {
            const response = await axiosInstance.patch(PURCHASE_ORDERS.SOFT_DELETE(id), {});
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Hard delete purchase order
    hardDeletePurchaseOrder: async (id) => {
        try {
            const response = await axiosInstance.delete(PURCHASE_ORDERS.HARD_DELETE(id));
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get purchase orders by supplier
    getPurchaseOrdersBySupplier: async (supplierId, limit = 10, offset = 0) => {
        try {
            const response = await axiosInstance.get(PURCHASE_ORDERS.BY_SUPPLIER(supplierId, limit, offset));
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get purchase order statistics
    getPurchaseOrderStats: async (companyId = '') => {
        try {
            const response = await axiosInstance.get(PURCHASE_ORDERS.STATS(companyId));
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

// Named exports for convenience and to support `import * as purchaseOrderService` usage patterns.
// Some components access `purchaseOrderService.getAllPurchaseOrders` directly from the module namespace.
export const getAllPurchaseOrders = purchaseOrderService.getAllPurchaseOrders;
export const getPurchaseOrderById = purchaseOrderService.getPurchaseOrderById;
export const createPurchaseOrder = purchaseOrderService.createPurchaseOrder;
export const updatePurchaseOrder = purchaseOrderService.updatePurchaseOrder;
export const updatePurchaseOrderStatus = purchaseOrderService.updatePurchaseOrderStatus;
export const softDeletePurchaseOrder = purchaseOrderService.softDeletePurchaseOrder;
export const hardDeletePurchaseOrder = purchaseOrderService.hardDeletePurchaseOrder;
export const getPurchaseOrdersBySupplier = purchaseOrderService.getPurchaseOrdersBySupplier;
export const getPurchaseOrderStats = purchaseOrderService.getPurchaseOrderStats;