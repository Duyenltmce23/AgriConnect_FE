import type { ApiResponse } from "../../../../types";

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  badge?: string;
  category: string;
}
type GetProductListResponse = ApiResponse<Product[]>;

interface ProductBatch {
  batchCode: {
    value: string;
  };
  totalYield: number;
  availableQuantity: number;
  units: string;
  price: number;
  plantingDate: string;
  harvestDate: string;
  seasonId: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
  id: string;
}

type GetProductBatchResponse = ApiResponse<ProductBatch[]>;

export type {
  Product,
  GetProductListResponse,
  ProductBatch,
  GetProductBatchResponse,
};
