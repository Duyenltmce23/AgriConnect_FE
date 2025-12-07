import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { ProductGrid } from "./components/ProductGrid";
import { getProductBatches } from "./api/productBatch";
import type { ProductBatch } from "./types";

interface ProductPageProps {
  onNavigateToProductDetails: (productId: string) => void;
}

export function ProductPage({
  onNavigateToProductDetails,
}: ProductPageProps) {
  const [productBatches, setProductBatches] = useState<ProductBatch[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProductBatches = async () => {
      try {
        const response = await getProductBatches();
        if (response.success) {
          if (response.data) {
            setProductBatches(response.data);
          }
        } else {
          console.error(`Failed to fetch product batches: ${response.message}`);
        }
      } catch (error) {
        console.error("Error fetching product batches:", error);
      }
    };
    fetchProductBatches();
  }, []);

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">All Products</h1>
          <p className="text-muted-foreground">
            Browse our complete selection of fresh organic produce
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid
          filteredProducts={productBatches.map((batch) => ({
            id: batch.id,
            name: batch.batchCode.value,
            price: batch.price,
            unit: batch.units,
            image: batch.imageUrls[0] || "", // Default to empty string if no image
            category: batch.seasonId, // Map seasonId to category
          }))}
          allProducts={productBatches.map((batch) => ({
            id: batch.id,
            name: batch.batchCode.value,
            price: batch.price,
            unit: batch.units,
            image: batch.imageUrls[0] || "", // Default to empty string if no image
            category: batch.seasonId, // Map seasonId to category
          }))}
          onNavigateToProductDetails={onNavigateToProductDetails}
          resetSearchAndFilter={() => {
            setSearchQuery("");
          }}
        />
      </div>
    </div>
  );
}
