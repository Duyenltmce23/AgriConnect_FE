import axios from "axios";
import { API } from "../../../../api";
import type { SeasonDetailResponse } from "../types";

export async function getSeason(
  seasonId: string
): Promise<SeasonDetailResponse> {
  try {
    var url = API.season.get(seasonId);
    const response = await axios.get<SeasonDetailResponse>(url);
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
