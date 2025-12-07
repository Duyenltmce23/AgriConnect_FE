import { useState } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { toast } from "sonner";

interface FavoriteListPageProps {
    onNavigateToProducts: () => void;
    onNavigateToProductDetails: (productId: string) => void;
    onAddToCart: (product: { id: string; name: string; price: number; unit: string; image: string }) => void;
}

interface FavoriteProduct {
    id: string;
    name: string;
    price: number;
    unit: string;
    category: string;
    image: string;
    inStock: boolean;
}

export function FavoriteListPage({
    onNavigateToProducts,
    onNavigateToProductDetails,
    onAddToCart,
}: FavoriteListPageProps) {
    const [favorites, setFavorites] = useState<FavoriteProduct[]>([
        {
            id: "1",
            name: "Organic Tomatoes",
            price: 12.99,
            unit: "kg",
            category: "Vegetables",
            image: "https://images.unsplash.com/photo-1546470427-227dddc6c7aa?w=400&h=300&fit=crop",
            inStock: true,
        },
        {
            id: "2",
            name: "Fresh Spinach",
            price: 5.99,
            unit: "bunch",
            category: "Leafy Greens",
            image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop",
            inStock: true,
        },
        {
            id: "3",
            name: "Green Apples",
            price: 18.99,
            unit: "kg",
            category: "Fruits",
            image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=400&h=300&fit=crop",
            inStock: false,
        },
        {
            id: "4",
            name: "Red Peppers",
            price: 15.50,
            unit: "kg",
            category: "Vegetables",
            image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop",
            inStock: true,
        },
    ]);

    const handleRemoveFromFavorites = (productId: string) => {
        setFavorites((prev) => prev.filter((item) => item.id !== productId));
        toast.success("Removed from favorites");
    };

    const handleAddToCart = (product: FavoriteProduct) => {
        if (!product.inStock) {
            toast.error("Product is out of stock");
            return;
        }
        onAddToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            unit: product.unit,
            image: product.image,
        });
    };

    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-gray-900 mb-2">My Favorites</h1>
                    <p className="text-muted-foreground">
                        {favorites.length > 0
                            ? `You have ${favorites.length} item${favorites.length !== 1 ? "s" : ""} in your favorites`
                            : "Your favorites list is empty"}
                    </p>
                </div>

                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favorites.map((product) => (
                            <Card key={product.id} className="overflow-hidden group">
                                <div className="relative">
                                    <button
                                        onClick={() => onNavigateToProductDetails(product.id)}
                                        className="w-full"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </button>
                                    <button
                                        onClick={() => handleRemoveFromFavorites(product.id)}
                                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                                    >
                                        <Heart className="h-5 w-5 fill-red-600 text-red-600" />
                                    </button>
                                    {!product.inStock && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                            <Badge variant="secondary" className="bg-white">
                                                Out of Stock
                                            </Badge>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4">
                                    <Badge className="bg-green-100 text-green-800 mb-2">
                                        {product.category}
                                    </Badge>
                                    <button
                                        onClick={() => onNavigateToProductDetails(product.id)}
                                        className="w-full text-left"
                                    >
                                        <h3 className="text-gray-900 mb-2 hover:text-green-600 transition-colors">
                                            {product.name}
                                        </h3>
                                    </button>
                                    <p className="text-green-600 mb-4">
                                        ${product.price.toFixed(2)}{" "}
                                        <span className="text-sm text-muted-foreground">/ {product.unit}</span>
                                    </p>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            className="flex-1 bg-green-600 hover:bg-green-700"
                                            onClick={() => handleAddToCart(product)}
                                            disabled={!product.inStock}
                                        >
                                            <ShoppingCart className="h-4 w-4 mr-2" />
                                            Add to Cart
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleRemoveFromFavorites(product.id)}
                                        >
                                            <Trash2 className="h-4 w-4 text-red-600" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="p-12 text-center">
                        <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-xl mb-2">No favorites yet</p>
                        <p className="text-muted-foreground mb-6">
                            Start adding products to your favorites to see them here
                        </p>
                        <Button
                            className="bg-green-600 hover:bg-green-700"
                            onClick={onNavigateToProducts}
                        >
                            Browse Products
                        </Button>
                    </Card>
                )}
            </div>
        </div>
    );
}
