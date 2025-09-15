import { motion } from "framer-motion";
import { MapPin, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import farmerRavi from "@/assets/farmer-ravi.jpg";
import farmerAsha from "@/assets/farmer-asha.jpg";

interface Farmer {
  id: number;
  name: string;
  location: string;
  produceType: string;
  image: string;
}

const farmers: Farmer[] = [
  { 
    id: 1, 
    name: "Ravi Kumar", 
    location: "Pune", 
    produceType: "Vegetables", 
    image: farmerRavi 
  },
  { 
    id: 2, 
    name: "Asha Patil", 
    location: "Nashik", 
    produceType: "Fruits", 
    image: farmerAsha 
  },
];

const FarmersGrid = () => {
  return (
    <section id="farmers" className="py-20 bg-muted/30">
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
            Meet Our <span className="text-primary">Local Farmers</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get to know the passionate farmers who grow your food with care and dedication
          </p>
        </motion.div>

        {/* Farmers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {farmers.map((farmer, index) => (
            <motion.div
              key={farmer.id}
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
                      src={farmer.image}
                      alt={farmer.name}
                      className="w-full h-64 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Floating Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 text-primary">
                        <Leaf className="w-3 h-3 mr-1" />
                        Organic
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {farmer.name}
                        </h3>
                        <div className="flex items-center text-muted-foreground mb-3">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm">{farmer.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="outline" 
                          className="border-primary/20 text-primary bg-primary/5"
                        >
                          {farmer.produceType}
                        </Badge>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                        >
                          View Products →
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Want to become a partner farmer? Join our growing community!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Join as Farmer
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FarmersGrid;