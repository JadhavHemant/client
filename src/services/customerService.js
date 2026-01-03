// src/services/customerService.js

import axiosInstance from '../Components/AdminSite/utils/axiosInstance';
import { CUSTOMERS } from '../Components/Endpoint/Endpoint';

export const getAllCustomers = async (params = {}) => {
    const response = await axiosInstance.get(CUSTOMERS.GET_ALL(params));
    return response.data;
};

export const getCustomerById = async (id) => {
    const response = await axiosInstance.get(CUSTOMERS.GET_BY_ID(id));
    return response.data;
};

export const getActiveCustomers = async () => {
    const response = await axiosInstance.get(CUSTOMERS.GET_ACTIVE);
    return response.data;
};

export const getCustomerStats = async () => {
    const response = await axiosInstance.get(CUSTOMERS.STATS);
    return response.data;
};

export const createCustomer = async (customerData) => {
    const response = await axiosInstance.post(CUSTOMERS.CREATE, customerData);
    return response.data;
};

export const updateCustomer = async (id, customerData) => {
    const response = await axiosInstance.put(CUSTOMERS.UPDATE(id), customerData);
    return response.data;
};

export const toggleActiveStatus = async (id) => {
    const response = await axiosInstance.patch(CUSTOMERS.TOGGLE_ACTIVE(id));
    return response.data;
};

export const updateOutstandingBalance = async (id, amount, operation) => {
    const response = await axiosInstance.patch(CUSTOMERS.UPDATE_OUTSTANDING(id), {
        amount,
        operation
    });
    return response.data;
};

export const softDeleteCustomer = async (id) => {
    const response = await axiosInstance.patch(CUSTOMERS.SOFT_DELETE(id));
    return response.data;
};

export const restoreCustomer = async (id) => {
    const response = await axiosInstance.patch(CUSTOMERS.RESTORE(id));
    return response.data;
};

export const hardDeleteCustomer = async (id) => {
    const response = await axiosInstance.delete(CUSTOMERS.HARD_DELETE(id));
    return response.data;
};
