// // src/services/productService.js

// import axiosInstance from '../Components/AdminSite/utils/axiosInstance';
// import { PRODUCTS } from '../Components/Endpoint/Endpoint';

// export const getProducts = async (limit = 10, offset = 0, search = '', filters = {}) => {
//     const response = await axiosInstance.get(
//         PRODUCTS.GET_ALL(
//             limit, offset, search,
//             filters.categoryId, filters.companyId, filters.isActive,
//             filters.lowStock, filters.sortBy, filters.sortOrder
//         )
//     );
//     return response.data;
// };

// export const getProductById = async (id) => {
//     const response = await axiosInstance.get(PRODUCTS.GET_BY_ID(id));
//     return response.data;
// };

// export const createProduct = async (formData) => {
//     const response = await axiosInstance.post(PRODUCTS.CREATE, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
// };

// export const updateProduct = async (id, formData) => {
//     const response = await axiosInstance.put(PRODUCTS.UPDATE(id), formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
// };

// export const deleteProduct = async (id) => {
//     const response = await axiosInstance.delete(PRODUCTS.DELETE(id));
//     return response.data;
// };

// export const toggleActiveStatus = async (id) => {
//     const response = await axiosInstance.patch(PRODUCTS.TOGGLE_ACTIVE(id));
//     return response.data;
// };

// export const getLowStockProducts = async (companyId, limit = 10) => {
//     const response = await axiosInstance.get(PRODUCTS.LOW_STOCK(companyId, limit));
//     return response.data;
// };

// export const getProductStats = async (companyId) => {
//     const response = await axiosInstance.get(PRODUCTS.STATS(companyId));
//     return response.data;
// };

// export const bulkDeleteProducts = async (ids) => {
//     const response = await axiosInstance.delete(PRODUCTS.BULK_DELETE, {
//         data: { ids }
//     });
//     return response.data;
// };


// src/services/productService.js

import axiosInstance from '../Components/AdminSite/utils/axiosInstance';
import { PRODUCTS } from '../Components/Endpoint/Endpoint';

export const getProducts = async (limit = 10, offset = 0, search = '', filters = {}) => {
    const response = await axiosInstance.get(
        PRODUCTS.GET_ALL(
            limit, offset, search,
            filters.categoryId, filters.companyId, filters.isActive,
            filters.lowStock, filters.sortBy, filters.sortOrder
        )
    );
    return response.data;
};

export const getProductById = async (id) => {
    const response = await axiosInstance.get(PRODUCTS.GET_BY_ID(id));
    return response.data;
};

export const createProduct = async (formData) => {
    const response = await axiosInstance.post(PRODUCTS.CREATE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const updateProduct = async (id, formData) => {
    const response = await axiosInstance.put(PRODUCTS.UPDATE(id), formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await axiosInstance.delete(PRODUCTS.DELETE(id));
    return response.data;
};

export const toggleActiveStatus = async (id) => {
    const response = await axiosInstance.patch(PRODUCTS.TOGGLE_ACTIVE(id));
    return response.data;
};

export const getLowStockProducts = async (companyId, limit = 10) => {
    const response = await axiosInstance.get(PRODUCTS.LOW_STOCK(companyId, limit));
    return response.data;
};

export const getProductStats = async (companyId) => {
    const response = await axiosInstance.get(PRODUCTS.STATS(companyId));
    return response.data;
};

export const bulkDeleteProducts = async (ids) => {
    const response = await axiosInstance.delete(PRODUCTS.BULK_DELETE, {
        data: { ids }
    });
    return response.data;
};

