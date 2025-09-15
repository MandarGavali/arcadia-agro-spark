import { motion } from "framer-motion";
import { Plus, Star, Filter, ArrowUpDown, MapPin, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState, useMemo } from "react";
import tomatoImage from "@/assets/tomatoes.jpg";
import mangoImage from "@/assets/mangoes.jpg";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  inStock: boolean;
  type: string;
  location: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    price: 50,
    description: "Organic farm-fresh tomatoes, perfect for cooking",
    image: tomatoImage,
    rating: 4.8,
    inStock: true,
    type: "Vegetables",
    location: "Pune"
  },
  {
    id: 2,
    name: "Alphonso Mangoes",
    price: 120,
    description: "Sweet premium Alphonso mangoes from Nashik",
    image: mangoImage,
    rating: 4.9,
    inStock: true,
    type: "Fruits",
    location: "Nashik"
  },
  {
    id: 3,
    name: "Organic Carrots",
    price: 40,
    description: "Fresh organic carrots from local farms",
    image: tomatoImage,
    rating: 4.6,
    inStock: true,
    type: "Vegetables",
    location: "Mumbai"
  },
  {
    id: 4,
    name: "Sweet Oranges",
    price: 80,
    description: "Juicy sweet oranges packed with vitamin C",
    image: mangoImage,
    rating: 4.7,
    inStock: true,
    type: "Fruits",
    location: "Nashik"
  },
  {
    id: 5,
    name: "Fresh Spinach",
    price: 30,
    description: "Organic spinach leaves, rich in iron",
    image: tomatoImage,
    rating: 4.5,
    inStock: false,
    type: "Vegetables",
    location: "Pune"
  },
  {
    id: 6,
    name: "Basmati Rice",
    price: 150,
    description: "Premium quality basmati rice",
    image: tomatoImage,
    rating: 4.9,
    inStock: true,
    type: "Grains",
    location: "Delhi"
  },
  {
    id: 7,
    name: "Fresh Milk",
    price: 60,
    description: "Pure cow milk from local dairy farms",
    image: mangoImage,
    rating: 4.8,
    inStock: true,
    type: "Dairy",
    location: "Mumbai"
  },
  {
    id: 8,
    name: "Green Apples",
    price: 180,
    description: "Crisp and fresh green apples",
    image: mangoImage,
    rating: 4.6,
    inStock: true,
    type: "Fruits",
    location: "Shimla"
  }
];

interface ProductsGridProps {
  onAddToCart: (product: Product) => void;
}

const ProductsGrid = ({ onAddToCart }: ProductsGridProps) => {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [priceRange, setPriceRange] = useState<string>("all");

  // Get unique types and locations for filter options
  const uniqueTypes = Array.from(new Set(products.map(p => p.type)));
  const uniqueLocations = Array.from(new Set(products.map(p => p.location)));

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const typeMatch = selectedType === "all" || product.type === selectedType;
      const locationMatch = selectedLocation === "all" || product.location === selectedLocation;
      
      let priceMatch = true;
      if (priceRange === "low") priceMatch = product.price <= 50;
      else if (priceRange === "medium") priceMatch = product.price > 50 && product.price <= 100;
      else if (priceRange === "high") priceMatch = product.price > 100;
      
      return typeMatch && locationMatch && priceMatch;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [selectedType, selectedLocation, sortBy, priceRange]);

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <section id="products" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Fresh <span className="text-primary">Products</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hand-picked seasonal products delivered fresh from our partner farms
          </p>
        </motion.div>

        {/* Filters and Sorting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Filter & Sort Products</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Type Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Type
                </label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {uniqueTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {uniqueLocations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Price Range</label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Prices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="low">₹0 - ₹50</SelectItem>
                    <SelectItem value="medium">₹51 - ₹100</SelectItem>
                    <SelectItem value="high">₹100+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4" />
                  Sort By
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="price-low">Price (Low to High)</SelectItem>
                    <SelectItem value="price-high">Price (High to Low)</SelectItem>
                    <SelectItem value="rating">Rating (High to Low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Showing {filteredAndSortedProducts.length} of {products.length} products
              </p>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card h-full">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    
                    {/* Stock Status */}
                    <div className="absolute top-3 left-3">
                      <Badge 
                        variant={product.inStock ? "default" : "secondary"}
                        className={product.inStock ? "bg-primary text-xs" : "bg-muted text-xs"}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-medium">{product.rating}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs border-primary/20 text-primary bg-primary/5">
                          {product.type}
                        </Badge>
                        <div className="flex items-center text-muted-foreground text-xs">
                          <MapPin className="w-3 h-3 mr-1" />
                          {product.location}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-baseline space-x-1">
                        <span className="text-xl font-bold text-primary">
                          ₹{product.price}
                        </span>
                        <span className="text-xs text-muted-foreground">/kg</span>
                      </div>
                      
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock}
                          className="bg-accent hover:bg-accent/90 text-accent-foreground"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Products Found */}
        {filteredAndSortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="bg-muted/50 rounded-2xl p-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No Products Found
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Try adjusting your filters to find more products
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSelectedType("all");
                  setSelectedLocation("all");
                  setPriceRange("all");
                  setSortBy("name");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </motion.div>
        )}

        {/* More Products Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-muted/50 rounded-2xl p-8 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              More Products Coming Soon!
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              We're adding new seasonal produce every week
            </p>
            <Button variant="outline" size="sm">
              Notify Me
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsGrid;