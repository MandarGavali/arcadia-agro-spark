import { motion } from "framer-motion";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <motion.h3 
              className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Arcadia Market
            </motion.h3>
            <p className="text-muted-foreground text-sm">
              Connecting farmers with communities, delivering fresh organic produce straight from farm to table.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 bg-muted rounded-full flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <div className="space-y-2">
              {["About Us", "Our Farmers", "Fresh Products", "Contact"].map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                  whileHover={{ x: 4 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Categories</h4>
            <div className="space-y-2">
              {["Vegetables", "Fruits", "Grains", "Dairy", "Organic Herbs"].map((category) => (
                <motion.a
                  key={category}
                  href="#"
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                  whileHover={{ x: 4 }}
                >
                  {category}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>hello@arcadiamarket.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, Maharashtra</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground flex items-center">
              © {currentYear} Arcadia Market. Made with{" "}
              <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
              for farmers and communities.
            </p>
            
            <div className="flex space-x-6 text-sm text-muted-foreground">
              {["Privacy Policy", "Terms of Service", "Support"].map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  className="hover:text-primary transition-colors"
                  whileHover={{ y: -1 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;