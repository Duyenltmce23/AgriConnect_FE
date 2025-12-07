import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { ProductDetailInfo } from "./components/ProductDetailInfo";
import { getProductDetails } from "../ProductDetail/api";
import { useCart } from "../../../hooks/useCart";
import type { ProductDetail, CareEvent } from "./types";
import { ProductBasicInfo } from "./components/ProductBasicInfo";

interface ProductDetailProps {
  productId: string;
  onNavigateToProducts: () => void;
  onNavigateToTraceability: (careEvents: CareEvent[], errorMessage?: string) => void;
  onNavigateToError: () => void;
  onNavigateToFarmDetail?: (farmId: string) => void;
}

const defaultProduct: ProductDetail = {
  id: "",
  name: "",
  price: 0,
  unit: "",
  category: "",
  image: "",
  farm: "",
  farmId: "",
  farmLocation: "",
  inStock: false,
  stock: 0,
  rating: 0,
  reviews: 0,
  description: "",
  features: [],
  nutritionFacts: {
    servingSize: "",
    calories: "",
    protein: "",
    carbs: "",
    fiber: "",
    vitaminC: "",
  },
};
export function ProductDetail({
  productId,
  onNavigateToProducts,
  onNavigateToTraceability,
  onNavigateToError,
  onNavigateToFarmDetail,
}: ProductDetailProps) {
  const { productId: urlProductId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetail>(defaultProduct);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { handleAddToCart: addToCart, isLoading } = useCart();

  // Use URL parameter if available, otherwise use prop
  const effectiveProductId = urlProductId || productId;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await getProductDetails(effectiveProductId);
        if (response.success) {
          if (response.data) {
            setProduct(response.data);
          }
        } else {
          console.error("Failed to load product details.");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    if (effectiveProductId) {
      fetchProductDetails();
    }
  }, [effectiveProductId]);

  const handleAddToCart = async () => {
    await addToCart(product.id, quantity);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={onNavigateToProducts} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
        <ProductBasicInfo
          product={product}
          quantity={quantity}
          setQuantity={setQuantity}
          handleAddToCart={handleAddToCart}
          onNavigateToTraceability={onNavigateToTraceability}
          onNavigateToError={onNavigateToError}
          onNavigateToFarmDetail={onNavigateToFarmDetail}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          isLoading={isLoading}
        />
        <ProductDetailInfo product={product} />
      </div>
    </div>
  );
}
