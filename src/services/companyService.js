import axiosInstance from '../Components/AdminSite/utils/axiosInstance';
import { COMPANIES } from '../Components/Endpoint/Endpoint';


export const getActiveCompanies = async () => {
    try {
        console.log('📡 Fetching active companies from:', COMPANIES.GET_ACTIVE);
        const response = await axiosInstance.get(COMPANIES.GET_ACTIVE);
        console.log('✅ Companies response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ getActiveCompanies error:', error.response?.data || error.message);
        throw error;
    }
};


export const getCompanies = async (limit = 10, offset = 0, search = '') => {
    try {
        const response = await axiosInstance.get(COMPANIES.GET_ALL(limit, offset, search));
        return response.data;
    } catch (error) {
        console.error('Error fetching companies:', error);
        throw error;
    }
};


export const getCompanyById = async (id) => {
    try {
        const response = await axiosInstance.get(COMPANIES.GET_BY_ID(id));
        return response.data;
    } catch (error) {
        console.error('Error fetching company:', error);
        throw error;
    }
};


export const createCompany = async (formData) => {
    try {
        const response = await axiosInstance.post(COMPANIES.CREATE, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
};


export const updateCompany = async (id, formData) => {
    try {
        const response = await axiosInstance.put(COMPANIES.UPDATE(id), formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating company:', error);
        throw error;
    }
};


export const deleteCompany = async (id) => {
    try {
        const response = await axiosInstance.delete(COMPANIES.DELETE(id));
        return response.data;
    } catch (error) {
        console.error('Error deleting company:', error);
        throw error;
    }
};


export const toggleActiveStatus = async (id) => {
    try {
        const response = await axiosInstance.patch(COMPANIES.TOGGLE_ACTIVE(id));
        return response.data;
    } catch (error) {
        console.error('Error toggling company status:', error);
        throw error;
    }
};


export const toggleFlagStatus = async (id) => {
    try {
        const response = await axiosInstance.patch(COMPANIES.TOGGLE_FLAG(id));
        return response.data;
    } catch (error) {
        console.error('Error toggling company flag:', error);
        throw error;
    }
};
