import axiosInstance from '../Components/AdminSite/utils/axiosInstance';
import { UNITS } from '../Components/Endpoint/Endpoint';

/**
 * Get all units with pagination
 */
export const getUnits = async (limit = 10, offset = 0, search = '') => {
    const response = await axiosInstance.get(UNITS.GET_ALL(limit, offset, search));
    return response.data;
};

/**
 * Get active units only (for dropdowns)
 */
export const getActiveUnits = async () => {
    const response = await axiosInstance.get(UNITS.GET_ACTIVE);
    return response.data;
};

/**
 * Get unit by ID
 */
export const getUnitById = async (id) => {
    const response = await axiosInstance.get(UNITS.GET_BY_ID(id));
    return response.data;
};

/**
 * Create new unit
 */
export const createUnit = async (unitData) => {
    const response = await axiosInstance.post(UNITS.CREATE, unitData);
    return response.data;
};

/**
 * Update unit
 */
export const updateUnit = async (id, unitData) => {
    const response = await axiosInstance.put(UNITS.UPDATE(id), unitData);
    return response.data;
};

/**
 * Delete unit
 */
export const deleteUnit = async (id) => {
    const response = await axiosInstance.delete(UNITS.SOFT_DELETE(id));
    return response.data;
};

/**
 * Bulk create units
 */
export const bulkCreateUnits = async (unitsArray) => {
    const response = await axiosInstance.post(UNITS.BULK_CREATE, { units: unitsArray });
    return response.data;
};
