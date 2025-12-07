import { Card } from "../../../../components/ui/card";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../../../../components/ui/tabs";
import type { ProductDetail } from "../types";
interface ProductDetailInfoProps {
    product: ProductDetail;
}

export function ProductDetailInfo({ product }: ProductDetailInfoProps) {
    return (
        <div className="p-2 mt-12">
            <Tabs defaultValue="description" className="w-full">
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="nutrition">Nutrition Facts</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-6">
                    <Card className="p-6">
                        <h3 className="text-gray-900 mb-4">Product Description</h3>
                        <p className="text-muted-foreground">{product.description}</p>
                    </Card>
                </TabsContent>

                <TabsContent value="nutrition" className="mt-6">
                    <Card className="p-6">
                        <h3 className="text-gray-900 mb-4">Nutrition Facts</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border-b pb-2">
                                <p className="text-sm text-muted-foreground">Serving Size</p>
                                <p>{product.nutritionFacts.servingSize}</p>
                            </div>
                            <div className="border-b pb-2">
                                <p className="text-sm text-muted-foreground">Calories</p>
                                <p>{product.nutritionFacts.calories}</p>
                            </div>
                            <div className="border-b pb-2">
                                <p className="text-sm text-muted-foreground">Protein</p>
                                <p>{product.nutritionFacts.protein}</p>
                            </div>
                            <div className="border-b pb-2">
                                <p className="text-sm text-muted-foreground">Carbohydrates</p>
                                <p>{product.nutritionFacts.carbs}</p>
                            </div>
                            <div className="border-b pb-2">
                                <p className="text-sm text-muted-foreground">Fiber</p>
                                <p>{product.nutritionFacts.fiber}</p>
                            </div>
                            <div className="border-b pb-2">
                                <p className="text-sm text-muted-foreground">Vitamin C</p>
                                <p>{product.nutritionFacts.vitaminC}</p>
                            </div>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="features" className="mt-6">
                    <Card className="p-6">
                        <h3 className="text-gray-900 mb-4">Key Features</h3>
                        <ul className="space-y-3">
                            {product.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-600" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}