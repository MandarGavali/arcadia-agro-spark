import { motion } from "framer-motion";
import { Plus, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
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
}

const products: Product[] = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    price: 50,
    description: "Organic farm-fresh tomatoes, perfect for cooking",
    image: tomatoImage,
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    name: "Alphonso Mangoes",
    price: 120,
    description: "Sweet premium Alphonso mangoes from Nashik",
    image: mangoImage,
    rating: 4.9,
    inStock: true
  },
];

interface ProductsGridProps {
  onAddToCart: (product: Product) => void;
}

const ProductsGrid = ({ onAddToCart }: ProductsGridProps) => {
  const { toast } = useToast();

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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Fresh <span className="text-primary">Products</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hand-picked seasonal produce delivered fresh from our partner farms
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card">
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    
                    {/* Stock Status */}
                    <div className="absolute top-4 left-4">
                      <Badge 
                        variant={product.inStock ? "default" : "secondary"}
                        className={product.inStock ? "bg-primary" : "bg-muted"}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 bg-white/90 rounded-full px-2 py-1 flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-medium">{product.rating}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline space-x-1">
                          <span className="text-2xl font-bold text-primary">
                            ₹{product.price}
                          </span>
                          <span className="text-sm text-muted-foreground">/kg</span>
                        </div>
                        
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                            className="bg-accent hover:bg-accent/90 text-accent-foreground"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

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