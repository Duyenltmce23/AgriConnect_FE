import { ProductCard } from "../../../../components/ProductCard";
import { Button } from "../../../../components/ui/button";
import type { Product } from "../types";

interface ProductGridProps {
    filteredProducts: Product[],
    allProducts: Product[],
    onNavigateToProductDetails: (productId: string) => void;
    resetSearchAndFilter: () => void,
}
export function ProductGrid({ filteredProducts, allProducts, onNavigateToProductDetails, resetSearchAndFilter }: ProductGridProps) {
    return (
        <div className="flex-1">
            <div className="mb-4 text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {allProducts.length} products
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} onNavigateToProductDetails={onNavigateToProductDetails} />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-muted-foreground mb-4">
                        No products found matching your criteria
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => {
                            resetSearchAndFilter();
                        }}
                    >
                        Clear All Filters
                    </Button>
                </div>
            )}
        </div>
    )
}