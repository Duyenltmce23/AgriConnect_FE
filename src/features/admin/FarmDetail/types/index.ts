import type { ApiResponse } from "../../../../types";

interface Farm {
  farmName: string;
  farmDesc: string;
  batchCodePrefix: string;
  bannerUrl: string;
  phone: string;
  area: string;
  isDelete: boolean;
  isBanned: boolean;
  isValidForSelling: boolean;
  isConfirmAsMall: boolean;
  createdAt: string;
  farmerId: string;
  addressId: string;
  id: string;
}
interface Farmer {
  fullname: string;
  email: string;
  phone: string;
  avatarUrl: string;
  accountId: string;
  createdAt: string;
  id: string;
}
type GetFarmerResponse = ApiResponse<Farmer[]>;
type GetFarmDetailResponse = ApiResponse<Farm>;
export type { Farm, GetFarmDetailResponse, Farmer, GetFarmerResponse };
