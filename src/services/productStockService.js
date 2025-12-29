// src/services/productStockService.js
import axiosInstance from '../Components/AdminSite/utils/axiosInstance';
import { PRODUCT_STOCK } from '../Components/Endpoint/Endpoint';

// Build URL with query parameters
const buildUrl = (endpoint, params = {}) => {
    const queryString = new URLSearchParams(
        Object.entries(params).filter(([ , value]) => 
            value !== null && value !== undefined && value !== ''
        )
    ).toString();
    
    return queryString ? `${endpoint}?${queryString}` : endpoint;
};

// ✅ Get all product stocks with filters - THIS WAS MISSING
export const getAllProductStocks = async (limit = 10, offset = 0, search = '', filters = {}) => {
    try {
        const params = { limit, offset, search, ...filters };
        const url = buildUrl(PRODUCT_STOCK.BASE || '/product-stock', params);
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch product stocks' };
    }
};

// Get product stock by ID
export const getProductStockById = async (id) => {
    try {
        const endpoint = PRODUCT_STOCK.BY_ID ? PRODUCT_STOCK.BY_ID(id) : `/product-stock/${id}`;
        const response = await axiosInstance.get(endpoint);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch product stock' };
    }
};

// Get stock by product
export const getStockByProduct = async (productId) => {
    try {
        const endpoint = PRODUCT_STOCK.BY_PRODUCT ? PRODUCT_STOCK.BY_PRODUCT(productId) : `/product-stock/product/${productId}`;
        const response = await axiosInstance.get(endpoint);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch stock by product' };
    }
};

// Get stock by warehouse
export const getStockByWarehouse = async (warehouseId) => {
    try {
        const endpoint = PRODUCT_STOCK.BY_WAREHOUSE ? PRODUCT_STOCK.BY_WAREHOUSE(warehouseId) : `/product-stock/warehouse/${warehouseId}`;
        const response = await axiosInstance.get(endpoint);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch stock by warehouse' };
    }
};

// Get low stock items
export const getLowStockItems = async () => {
    try {
        const endpoint = PRODUCT_STOCK.LOW_STOCK || '/product-stock/low-stock';
        const response = await axiosInstance.get(endpoint);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch low stock items' };
    }
};

// Create product stock
export const createProductStock = async (stockData) => {
    try {
        const endpoint = PRODUCT_STOCK.BASE || '/product-stock';
        const response = await axiosInstance.post(endpoint, stockData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to create product stock' };
    }
};

// Update product stock
export const updateProductStock = async (id, stockData) => {
    try {
        const endpoint = PRODUCT_STOCK.BY_ID ? PRODUCT_STOCK.BY_ID(id) : `/product-stock/${id}`;
        const response = await axiosInstance.put(endpoint, stockData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to update product stock' };
    }
};

// Adjust stock quantity
export const adjustStockQuantity = async (id, adjustment, reason) => {
    try {
        const endpoint = PRODUCT_STOCK.ADJUST ? PRODUCT_STOCK.ADJUST(id) : `/product-stock/${id}/adjust`;
        const response = await axiosInstance.post(endpoint, { adjustment, reason });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to adjust stock quantity' };
    }
};

// Transfer stock between warehouses
export const transferStock = async (transferData) => {
    try {
        const endpoint = PRODUCT_STOCK.TRANSFER || '/product-stock/transfer';
        const response = await axiosInstance.post(endpoint, transferData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to transfer stock' };
    }
};

// Soft delete (deactivate)
export const softDeleteProductStock = async (id) => {
    try {
        const endpoint = PRODUCT_STOCK.SOFT_DELETE ? PRODUCT_STOCK.SOFT_DELETE(id) : `/product-stock/${id}/soft`;
        const response = await axiosInstance.patch(endpoint);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to deactivate product stock' };
    }
};

// Hard delete (permanent)
export const deleteProductStock = async (id) => {
    try {
        const endpoint = PRODUCT_STOCK.HARD_DELETE ? PRODUCT_STOCK.HARD_DELETE(id) : `/product-stock/${id}/hard`;
        const response = await axiosInstance.delete(endpoint);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to delete product stock' };
    }
};
