// src/services/stockMovementService.js
import axiosInstance from "../Components/AdminSite/utils/axiosInstance";
import { STOCK_MOVEMENTS } from "../Components/Endpoint/Endpoint";

// Reuse a small buildUrl helper
const buildUrl = (endpoint, params = {}) => {
  const queryString = new URLSearchParams(
    Object.entries(params).filter(
      ([, value]) => value !== null && value !== undefined && value !== ""
    )
  ).toString();

  return queryString ? `${endpoint}?${queryString}` : endpoint;
};

export const getAllStockMovements = async (
  limit = 10,
  offset = 0,
  search = "",
  filters = {}
) => {
  const params = { limit, offset, search, ...filters };
  const url = buildUrl(STOCK_MOVEMENTS.BASE, params);
  const response = await axiosInstance.get(url);
  return response.data;
};

export const getStockMovementById = async (id) => {
  const response = await axiosInstance.get(STOCK_MOVEMENTS.BY_ID(id));
  return response.data;
};

export const getStockMovementStats = async () => {
  const response = await axiosInstance.get(STOCK_MOVEMENTS.STATS);
  return response.data;
};

export const getRecentStockMovements = async (limit = 5) => {
  const url = buildUrl(STOCK_MOVEMENTS.RECENT, { limit });
  const response = await axiosInstance.get(url);
  return response.data;
};

export const createStockMovement = async (movementData) => {
  const response = await axiosInstance.post(
    STOCK_MOVEMENTS.CREATE,
    movementData
  );
  return response.data;
};

export const updateStockMovement = async (id, movementData) => {
  const response = await axiosInstance.put(
    STOCK_MOVEMENTS.UPDATE(id),
    movementData
  );
  return response.data;
};

export const deleteStockMovement = async (id) => {
  const response = await axiosInstance.delete(STOCK_MOVEMENTS.DELETE(id));
  return response.data;
};
