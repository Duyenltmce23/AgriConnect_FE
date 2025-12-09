import { useEffect, useMemo, useState } from "react";
import { Search, Check } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { ProductGrid } from "./components/ProductGrid";
import { getProductBatches } from "./api/productBatch";
import { API } from "../../../api";
import type { ProductBatch } from "./types";

interface ProductPageProps {
  onNavigateToProductDetails: (productId: string) => void;
}

export function ProductPage({
  onNavigateToProductDetails,
}: ProductPageProps) {
  const [productBatches, setProductBatches] = useState<ProductBatch[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

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

    const fetchCategories = async () => {
      try {
        const res = await fetch(API.category.list);
        const json = await res.json();
        if (json && json.success && Array.isArray(json.data)) {
          setCategories(json.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
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

        {/* Categories (new) */}
        <div className="mb-6">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <div
                key={cat.id}
                role="button"
                aria-pressed={selectedCategoryId === cat.id}
                tabIndex={0}
                onClick={() => setSelectedCategoryId((prev) => (prev === cat.id ? null : cat.id))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelectedCategoryId((prev) => (prev === cat.id ? null : cat.id));
                }}
                className={`relative flex-shrink-0 flex items-center justify-center gap-4 p-3 rounded-lg border cursor-pointer transition-all transform ${
                  selectedCategoryId === cat.id ? "scale-105 shadow-lg border-2 border-primary-600 ring-4 ring-primary/20" : "hover:shadow-md"
                }`}
                style={{ backgroundColor: randomPastel(cat.id), minWidth: '13rem' }}
              >
                {selectedCategoryId === cat.id && (
                  <div className="absolute top-1 right-2 bg-white rounded-full p-1 shadow">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                )}
                <img src={cat.illustrativeImageUrl} alt={cat.categoryName} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-1">
                  <div className="font-semibold">{cat.categoryName}</div>
                  <div className="text-xs text-muted-foreground truncate">{cat.categoryDesc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid
          filteredProducts={useMemo(() => {
            const all = productBatches.map((batch) => ({
              id: batch.id,
              name: batch.batchCode.value,
              price: batch.price,
              unit: batch.units,
              image: batch.imageUrls[0] || "",
              category: batch.seasonId,
            }));

            return all.filter((p) => {
              const matchesCategory = selectedCategoryId ? p.category === selectedCategoryId : true;
              const matchesSearch = searchQuery
                ? p.name.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
              return matchesCategory && matchesSearch;
            });
          }, [productBatches, selectedCategoryId, searchQuery])}
          allProducts={productBatches.map((batch) => ({
            id: batch.id,
            name: batch.batchCode.value,
            price: batch.price,
            unit: batch.units,
            image: batch.imageUrls[0] || "",
            category: batch.seasonId,
          }))}
          onNavigateToProductDetails={onNavigateToProductDetails}
          resetSearchAndFilter={() => {
            setSearchQuery("");
            setSelectedCategoryId(null);
          }}
        />
      </div>
    </div>
  );
}


function randomPastel(seed: string) {
  // deterministic-ish pastel HSL based on string hash
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) % 360;
  }
  const s = 70; // saturation
  const l = 90; // very light pastel
  return `hsl(${h} ${s}% ${l}%)`;
}
