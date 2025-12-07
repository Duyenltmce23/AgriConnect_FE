import axios from "axios";
import { API } from "../../../../api";
import type { GetFarmDetailResponse, GetFarmerResponse } from "../types";

export async function getFarmDetail(
  farmId: string
): Promise<GetFarmDetailResponse> {
  try {
    const token = localStorage.getItem("token");
    const url = API.farm.get(farmId);
    const api = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await api.get<GetFarmDetailResponse>(url);
    const responseData = response.data;
    return responseData;
  } catch (error: any) {
    if (error.response?.status === 400) {
      return error.response.data;
    } else {
      throw error;
    }
  }
}

export async function getFarmer(farmerId: string): Promise<GetFarmerResponse> {
  try {
    const token = localStorage.getItem("token");
    const url = API.profile.list;
    const api = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await api.get<GetFarmerResponse>(url);
    const responseData = response.data;
    return responseData;
  } catch (error: any) {
    if (error.response?.status === 400) {
      return error.response.data;
    } else {
      throw error;
    }
  }
}
