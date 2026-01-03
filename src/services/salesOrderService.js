// src/services/salesOrderService.js

import axiosInstance from '../Components/AdminSite/utils/axiosInstance';
import { SALES_ORDERS } from '../Components/Endpoint/Endpoint';

const salesOrderService = {
    getAllSalesOrders: async (params = {}) => {
        const response = await axiosInstance.get(SALES_ORDERS.GET_ALL(params));
        return response.data;
    },

    getSalesOrderById: async (id) => {
        const response = await axiosInstance.get(SALES_ORDERS.GET_BY_ID(id));
        return response.data;
    },

    getSalesOrderStats: async () => {
        const response = await axiosInstance.get(SALES_ORDERS.STATS);
        return response.data;
    },

    getSalesOrdersByCustomer: async (customerId, limit = 10, offset = 0) => {
        const response = await axiosInstance.get(SALES_ORDERS.BY_CUSTOMER(customerId, limit, offset));
        return response.data;
    },

    createSalesOrder: async (orderData) => {
        const response = await axiosInstance.post(SALES_ORDERS.CREATE, orderData);
        return response.data;
    },

    updateSalesOrder: async (id, orderData) => {
        const response = await axiosInstance.put(SALES_ORDERS.UPDATE(id), orderData);
        return response.data;
    },

    updateStatus: async (id, status) => {
        const response = await axiosInstance.patch(SALES_ORDERS.UPDATE_STATUS(id), { Status: status });
        return response.data;
    },

    updatePayment: async (id, paymentData) => {
        const response = await axiosInstance.patch(SALES_ORDERS.UPDATE_PAYMENT(id), paymentData);
        return response.data;
    },

    softDeleteSalesOrder: async (id) => {
        const response = await axiosInstance.patch(SALES_ORDERS.SOFT_DELETE(id));
        return response.data;
    },

    restoreSalesOrder: async (id) => {
        const response = await axiosInstance.patch(SALES_ORDERS.RESTORE(id));
        return response.data;
    },

    hardDeleteSalesOrder: async (id) => {
        const response = await axiosInstance.delete(SALES_ORDERS.HARD_DELETE(id));
        return response.data;
    }
};

export default salesOrderService;
