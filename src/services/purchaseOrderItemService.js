// // src/services/purchaseOrderItemService.js
// import axios from 'axios';
// import { PURCHASE_ORDER_ITEMS } from '../Components/Endpoint/Endpoint';

// const getAuthHeaders = () => {
//     const token = localStorage.getItem('token');
//     return {
//         'Content-Type': 'application/json',
//         ...(token && { Authorization: `Bearer ${token}` })
//     };
// };

// export const purchaseOrderItemService = {
//     // Get items by purchase order
//     getItemsByPurchaseOrderId: async (purchaseOrderId, limit = 50, offset = 0) => {
//         try {
//             const response = await axios.get(
//                 PURCHASE_ORDER_ITEMS.BY_PURCHASE_ORDER(purchaseOrderId, limit, offset),
//                 { headers: getAuthHeaders() }
//             );
//             return response.data;
//         } catch (error) {
//             throw error.response?.data || error.message;
//         }
//     },

//     // Get summary
//     getPurchaseOrderSummary: async (purchaseOrderId) => {
//         try {
//             const response = await axios.get(
//                 PURCHASE_ORDER_ITEMS.SUMMARY(purchaseOrderId),
//                 { headers: getAuthHeaders() }
//             );
//             return response.data;
//         } catch (error) {
//             throw error.response?.data || error.message;
//         }
//     },

//     // Create item
//     createPurchaseOrderItem: async (itemData) => {
//         try {
//             const response = await axios.post(
//                 PURCHASE_ORDER_ITEMS.CREATE,
//                 itemData,
//                 { headers: getAuthHeaders() }
//             );
//             return response.data;
//         } catch (error) {
//             throw error.response?.data || error.message;
//         }
//     },

//     // Update item
//     updatePurchaseOrderItem: async (id, itemData) => {
//         try {
//             const response = await axios.put(
//                 PURCHASE_ORDER_ITEMS.UPDATE(id),
//                 itemData,
//                 { headers: getAuthHeaders() }
//             );
//             return response.data;
//         } catch (error) {
//             throw error.response?.data || error.message;
//         }
//     },

//     // Bulk update received quantities
//     bulkUpdateReceivedQuantities: async (items) => {
//         try {
//             const response = await axios.patch(
//                 PURCHASE_ORDER_ITEMS.BULK_RECEIVE,
//                 { items },
//                 { headers: getAuthHeaders() }
//             );
//             return response.data;
//         } catch (error) {
//             throw error.response?.data || error.message;
//         }
//     },

//     // Delete item
//     deletePurchaseOrderItem: async (id) => {
//         try {
//             const response = await axios.delete(
//                 PURCHASE_ORDER_ITEMS.DELETE(id),
//                 { headers: getAuthHeaders() }
//             );
//             return response.data;
//         } catch (error) {
//             throw error.response?.data || error.message;
//         }
//     },

//     // Get all items
//     getAllPurchaseOrderItems: async (params = {}) => {
//         try {
//             const response = await axios.get(
//                 PURCHASE_ORDER_ITEMS.GET_ALL(params),
//                 { headers: getAuthHeaders() }
//             );
//             return response.data;
//         } catch (error) {
//             throw error.response?.data || error.message;
//         }
//     }
// };

// src/services/purchaseOrderItemService.js

import axios from 'axios';
import { PURCHASE_ORDER_ITEMS } from '../Components/Endpoint/Endpoint';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
    };
};

export const purchaseOrderItemService = {
    getItemsByPurchaseOrderId: async (purchaseOrderId, limit = 50, offset = 0) => {
        try {
            const response = await axios.get(
                PURCHASE_ORDER_ITEMS.BY_PURCHASE_ORDER(purchaseOrderId, limit, offset),
                { headers: getAuthHeaders() }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getPurchaseOrderSummary: async (purchaseOrderId) => {
        try {
            const response = await axios.get(
                PURCHASE_ORDER_ITEMS.SUMMARY(purchaseOrderId),
                { headers: getAuthHeaders() }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    createPurchaseOrderItem: async (itemData) => {
        try {
            const response = await axios.post(
                PURCHASE_ORDER_ITEMS.CREATE,
                itemData,
                { headers: getAuthHeaders() }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updatePurchaseOrderItem: async (id, itemData) => {
        try {
            const response = await axios.put(
                PURCHASE_ORDER_ITEMS.UPDATE(id),
                itemData,
                { headers: getAuthHeaders() }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deletePurchaseOrderItem: async (id) => {
        try {
            const response = await axios.delete(
                PURCHASE_ORDER_ITEMS.DELETE(id),
                { headers: getAuthHeaders() }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getAllPurchaseOrderItems: async (limit = 10, offset = 0) => {
        try {
            const response = await axios.get(
                PURCHASE_ORDER_ITEMS.GET_ALL({ limit, offset }),
                { headers: getAuthHeaders() }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    bulkUpdateReceivedQuantities: async (items) => {
        try {
            const response = await axios.patch(
                PURCHASE_ORDER_ITEMS.BULK_RECEIVE,
                { items },
                { headers: getAuthHeaders() }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};
