// src/services/productService.js
import axiosInstance from '../Components/AdminSite/utils/axiosInstance';
import { PRODUCTS } from '../Components/Endpoint/Endpoint';

// Build URL with query parameters
const buildUrl = (endpoint, params = {}) => {
    const queryString = new URLSearchParams(
        Object.entries(params).filter(([ , value]) => 
            value !== null && value !== undefined && value !== ''
        )
    ).toString();
    
    return queryString ? `${endpoint}?${queryString}` : endpoint;
};

// Get all products with filters
export const getAllProducts = async (limit = 10, offset = 0, search = '', filters = {}) => {
    try {
        const params = { limit, offset, search, ...filters };
        const url = buildUrl(PRODUCTS.BASE, params);
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch products' };
    }
};

// ✅ Get active products (for dropdowns)
export const getActiveProducts = async (companyId = null) => {
    try {
        const params = companyId ? { companyId } : {};
        const url = buildUrl(PRODUCTS.ACTIVE, params);
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch active products' };
    }
};

// Get product by ID
export const getProductById = async (id) => {
    try {
        const response = await axiosInstance.get(PRODUCTS.BY_ID(id));
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch product' };
    }
};

// Get products by company
export const getProductsByCompany = async (companyId, includeInactive = false) => {
    try {
        const url = buildUrl(PRODUCTS.BY_COMPANY(companyId), { includeInactive });
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch products by company' };
    }
};

// Get products by category
export const getProductsByCategory = async (categoryId) => {
    try {
        const response = await axiosInstance.get(PRODUCTS.BY_CATEGORY(categoryId));
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch products by category' };
    }
};

// Create product
export const createProduct = async (productData) => {
    try {
        const response = await axiosInstance.post(PRODUCTS.BASE, productData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to create product' };
    }
};

// Update product
export const updateProduct = async (id, productData) => {
    try {
        const response = await axiosInstance.put(PRODUCTS.BY_ID(id), productData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to update product' };
    }
};

// Toggle active status
export const toggleActiveStatus = async (id) => {
    try {
        const response = await axiosInstance.patch(PRODUCTS.TOGGLE_STATUS(id));
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to toggle status' };
    }
};

// Soft delete product
export const softDeleteProduct = async (id) => {
    try {
        const response = await axiosInstance.delete(PRODUCTS.SOFT_DELETE(id));
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to deactivate product' };
    }
};

// Hard delete product
export const deleteProduct = async (id) => {
    try {
        const response = await axiosInstance.delete(PRODUCTS.HARD_DELETE(id));
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to delete product' };
    }
};

// Bulk import products
export const bulkImportProducts = async (products) => {
    try {
        const response = await axiosInstance.post(PRODUCTS.BULK_IMPORT, { products });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to import products' };
    }
};
