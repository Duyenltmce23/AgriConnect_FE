import axios from "axios";
import { API } from "../../../../api";
import type { ProductBatchListResponse, ProductBatchDetailResponse } from "../types";

export const getFarmerProductBatches = async (
  farmId: string
): Promise<ProductBatchListResponse> => {
  try {
    const url = `${API.productBatch.list}/farm/${farmId}`;
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.get<ProductBatchListResponse>(url, {
      headers,
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    } else {
      return {
        success: false,
        message: "Error fetching product batches",
      };
    }
  }
};

export const getProductBatchDetail = async (
  batchId: string
): Promise<ProductBatchDetailResponse> => {
  try {
    const url = API.productBatch.get(batchId);
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.get<ProductBatchDetailResponse>(url, {
      headers,
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    } else {
      return {
        success: false,
        message: "Error fetching product batch details",
      };
    }
  }
};
