import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { CategorySection } from "./components/CategorySection";

interface HomePageProps {
  onNavigateToProducts: () => void;
  onNavigateToProductDetails: (productId: string) => void;
}

export function HomePage({
  onNavigateToProducts,
  onNavigateToProductDetails,
}: HomePageProps) {
  const fruitsProducts = [
    {
      id: "1",
      name: "Organic Strawberries",
      price: 4.99,
      unit: "Per lb",
      image: "https://images.unsplash.com/photo-1565032156168-0a22e5b8374f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHN0cmF3YmVycmllc3xlbnwxfHx8fDE3NTk5NTE4OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Fresh",
    },
    {
      id: "2",
      name: "Ripe Bananas",
      price: 2.49,
      unit: "Per bunch",
      image: "https://images.unsplash.com/photo-1680165528445-acee3470f012?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXBlJTIwYmFuYW5hc3xlbnwxfHx8fDE3NTk5ODY2ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "3",
      name: "Fresh Oranges",
      price: 3.99,
      unit: "Per lb",
      image: "https://images.unsplash.com/photo-1757283961709-1087406a5df1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yYW5nZXMlMjBjaXRydXN8ZW58MXx8fHwxNzU5OTYwMjk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Popular",
    },
    {
      id: "4",
      name: "Mixed Berries",
      price: 5.99,
      unit: "Per pack",
      image: "https://images.unsplash.com/photo-1715941873083-4ea6926678dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMGFzc29ydG1lbnR8ZW58MXx8fHwxNzU5OTg2NjgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const vegetablesProducts = [
    {
      id: "5",
      name: "Organic Tomatoes",
      price: 3.49,
      unit: "Per lb",
      image: "https://images.unsplash.com/photo-1630172821918-1df2441fb327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB0b21hdG9lc3xlbnwxfHx8fDE3NTk5NzUzMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Organic",
    },
    {
      id: "6",
      name: "Fresh Carrots",
      price: 2.99,
      unit: "Per bunch",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNhcnJvdHN8ZW58MXx8fHwxNzU5OTIwNDk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "7",
      name: "Bell Peppers",
      price: 4.49,
      unit: "Per lb",
      image: "https://images.unsplash.com/photo-1509377244-b9820f59c12f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWxsJTIwcGVwcGVycyUyMGNvbG9yZnVsfGVufDF8fHx8MTc1OTk4NjY4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Colorful",
    },
    {
      id: "8",
      name: "Fresh Vegetables Mix",
      price: 6.99,
      unit: "Per basket",
      image: "https://images.unsplash.com/photo-1562437243-4117943e59b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdmVnZXRhYmxlcyUyMG1hcmtldHxlbnwxfHx8fDE3NTk5MjM2NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const leafyGreensProducts = [
    {
      id: "9",
      name: "Fresh Spinach",
      price: 3.29,
      unit: "Per bunch",
      image: "https://images.unsplash.com/photo-1683536905403-ea18a3176d29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNwaW5hY2h8ZW58MXx8fHwxNzU5OTg2Njg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Fresh",
    },
    {
      id: "10",
      name: "Green Lettuce",
      price: 2.79,
      unit: "Per head",
      image: "https://images.unsplash.com/photo-1657411658285-2742c4c5ed1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZXR0dWNlJTIwZ3JlZW58ZW58MXx8fHwxNzU5OTg2Njg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "11",
      name: "Organic Kale",
      price: 3.99,
      unit: "Per bunch",
      image: "https://images.unsplash.com/photo-1757466687626-613680476e5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYWxlJTIwbGVhdmVzfGVufDF8fHx8MTc1OTkyMDQ5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Organic",
    },
    {
      id: "12",
      name: "Mixed Salad Greens",
      price: 4.49,
      unit: "Per pack",
      image: "https://images.unsplash.com/photo-1741515042603-70545daeb0c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFmeSUyMGdyZWVucyUyMHNhbGFkfGVufDF8fHx8MTc1OTk4NjY4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];
  return (
    <div>
      <Hero onNavigateToProducts={onNavigateToProducts} />
      <Features />

      <CategorySection
        id="fruits"
        title="Fresh Fruits"
        description="Handpicked ripe fruits bursting with natural sweetness and vitamins"
        products={fruitsProducts}
        onNavigateToProductDetails={onNavigateToProductDetails}
      />

      <div className="bg-gray-50">
        <CategorySection
          id="vegetables"
          title="Garden Vegetables"
          description="Farm-fresh vegetables harvested at peak ripeness"
          products={vegetablesProducts}
          onNavigateToProductDetails={onNavigateToProductDetails}
        />
      </div>

      <CategorySection
        id="leafy-greens"
        title="Leafy Greens"
        description="Nutrient-rich greens for your healthy lifestyle"
        products={leafyGreensProducts}
        onNavigateToProductDetails={onNavigateToProductDetails}
      />

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="mb-4">AgriConnect</h3>
              <p className="text-green-200">
                Your trusted source for organic fruits, vegetables, and leafy greens.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Shop</h4>
              <ul className="space-y-2 text-green-200">
                <li><a href="#fruits" className="hover:text-white transition-colors">Fruits</a></li>
                <li><a href="#vegetables" className="hover:text-white transition-colors">Vegetables</a></li>
                <li><a href="#leafy-greens" className="hover:text-white transition-colors">Leafy Greens</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-green-200">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2 text-green-200">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-green-800 text-center text-green-200">
            <p>&copy; 2025 AgriConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
