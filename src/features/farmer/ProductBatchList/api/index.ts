import axios from "axios";
import { API } from "../../../../api";
import type {
  ProductBatchListResponse,
  ProductBatchDetailResponse,
  ProductBatchCreateResponse,
  ProductBatch,
} from "../types";

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

export const createProductBatch = async (
  data: {
    seasonId: string;
    totalYield: number;
    units: string;
    plantingDate: string;
  },
  images?: File[]
): Promise<ProductBatchCreateResponse> => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const formData = new FormData();
    formData.append("seasonId", data.seasonId);
    formData.append("totalYield", data.totalYield.toString());
    formData.append("units", data.units);
    formData.append("plantingDate", data.plantingDate);

    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    const response = await axios.post<ProductBatchCreateResponse>(
      API.productBatch.add,
      formData,
      {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    } else {
      return {
        success: false,
        message: "Error creating product batch",
      };
    }
  }
};

export const harvestProductBatch = async (
  batchId: string,
  totalYield: number
): Promise<ProductBatchDetailResponse> => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.patch<ProductBatchDetailResponse>(
      API.productBatch.harvest(batchId),
      { totalYield },
      { headers }
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    } else {
      return {
        success: false,
        message: "Error updating harvest",
      };
    }
  }
};

export const sellProductBatch = async (
  batchId: string,
  availableQuantity: number,
  price: number
): Promise<ProductBatchDetailResponse> => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.patch<ProductBatchDetailResponse>(
      API.productBatch.sell(batchId),
      { availableQuantity, price },
      { headers }
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    } else {
      return {
        success: false,
        message: "Error selling product batch",
      };
    }
  }
};
