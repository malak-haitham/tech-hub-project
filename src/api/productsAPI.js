/* eslint-disable no-unused-vars */
import axiosInstance from "./axiosInstance";

export const getAllProducts = async (filters = {}, search="") => {
  let endpoint = '/products';
  const params = new URLSearchParams();

  if (search){
    endpoint = '/products/search';
    params.append("q", search);
  }

  if (filters.category) params.append("categoryId", filters.category);
  if (filters.province) params.append("provinceId", filters.province);
  if (filters.condition) params.append("condition", filters.condition);
  if (filters.priceRange) {
    params.append("minPrice", filters.priceRange[0]);
    params.append("maxPrice", filters.priceRange[1]);
  }

  const res = await axiosInstance.get(`{endpoint}?${params.toString()}`);
  return res.data;
};
