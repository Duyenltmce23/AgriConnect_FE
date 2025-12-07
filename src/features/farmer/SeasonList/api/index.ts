import axios from "axios";
import { API } from "../../../../api";
import type { FarmResponse, SeasonListResponse } from "../types";

export async function getSeasons(): Promise<SeasonListResponse> {
  try {
    const token = localStorage.getItem("token");
    const api = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const url = API.season.list;
    const response = await api.get<SeasonListResponse>(url);
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
