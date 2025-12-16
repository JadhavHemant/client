// src/services/categoryService.js
import axiosInstance from '../Components/AdminSite/utils/axiosInstance';
import { CATEGORIES } from '../Components/Endpoint/Endpoint';

export const getActiveCategories = async () => {
    const response = await axiosInstance.get(CATEGORIES.GET_ACTIVE);
    return response.data;
};

export const getCategories = async (limit = 10, offset = 0, search = '') => {
    const response = await axiosInstance.get(CATEGORIES.GET_ALL(limit, offset, search));
    return response.data;
};
