import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, User, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onConfirm: () => void;
}

interface FormData {
  name: string;
  email: string;
  address: string;
}

const Checkout = ({ isOpen, onClose, totalAmount, onConfirm }: CheckoutProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    address: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsConfirmed(true);
    
    // Auto close after showing confirmation
    setTimeout(() => {
      onConfirm();
      setIsConfirmed(false);
      setFormData({ name: "", email: "", address: "" });
    }, 3000);
  };

  const isFormValid = formData.name && formData.email && formData.address;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Checkout Modal */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md"
            >
              <Card className="relative shadow-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold">
                      {isConfirmed ? "Order Confirmed!" : "Checkout"}
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <AnimatePresence mode="wait">
                    {isConfirmed ? (
                      <motion.div
                        key="confirmation"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center py-8"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                          className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                          <Check className="w-8 h-8 text-primary-foreground" />
                        </motion.div>
                        
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="text-lg font-semibold text-foreground mb-2"
                        >
                          Thank you for your order!
                        </motion.h3>
                        
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="text-muted-foreground text-sm"
                        >
                          Your fresh produce will be delivered within 24 hours
                        </motion.p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                      >
                        {/* Order Summary */}
                        <div className="bg-muted/30 rounded-lg p-4">
                          <h4 className="font-semibold text-foreground mb-2">Order Summary</h4>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Total Amount:</span>
                            <span className="font-bold text-primary text-lg">
                              ₹{totalAmount.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center space-x-2">
                              <User className="w-4 h-4" />
                              <span>Full Name</span>
                            </Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              placeholder="Enter your full name"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center space-x-2">
                              <Mail className="w-4 h-4" />
                              <span>Email Address</span>
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              placeholder="Enter your email"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="address" className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span>Delivery Address</span>
                            </Label>
                            <Input
                              id="address"
                              value={formData.address}
                              onChange={(e) => handleInputChange("address", e.target.value)}
                              placeholder="Enter your delivery address"
                              required
                            />
                          </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          size="lg"
                          disabled={!isFormValid || isSubmitting}
                          className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all duration-300"
                        >
                          {isSubmitting ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                          ) : (
                            `Place Order - ₹${totalAmount.toFixed(2)}`
                          )}
                        </Button>

                        <p className="text-xs text-muted-foreground text-center">
                          By placing this order, you agree to our terms and conditions
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Checkout;