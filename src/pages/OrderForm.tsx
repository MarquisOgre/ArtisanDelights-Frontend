import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Truck, 
  Minus,
  Plus,
  X,
  QrCode
} from 'lucide-react';
import Footer from '@/components/Footer';
import upiQrImage from '@/assets/upi-qr-placeholder.png';

const OrderForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedProduct = location.state?.selectedProduct;
  
  const [cartItems, setCartItems] = useState(() => {
    if (selectedProduct) {
      return [{
        id: selectedProduct.id || '1',
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: 1,
        size: selectedProduct.size,
        image: selectedProduct.image || '',
      }];
    }
    return [];
  });

  const [selectedShipping, setSelectedShipping] = useState('free');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    notes: '',
    upiReference: '',
  });

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const shippingOptions = {
    free: 0,
    standard: 99,
    express: 199,
    overnight: 299
  };
  
  const shipping = shippingOptions[selectedShipping as keyof typeof shippingOptions] || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order submitted:', { formData, cartItems, total });
    navigate('/order-success');
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Complete Your Order</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Shipping Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={selectedShipping} onValueChange={setSelectedShipping}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free Shipping (7-10 days) - ₹0</SelectItem>
                        <SelectItem value="standard">Standard Shipping (5-7 days) - ₹99</SelectItem>
                        <SelectItem value="express">Express Shipping (2-3 days) - ₹199</SelectItem>
                        <SelectItem value="overnight">Overnight Shipping - ₹299</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Payment via UPI */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <QrCode className="h-5 w-5" />
                      Payment via UPI
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-4">
                        Scan the QR code below with any UPI app to make payment
                      </p>
                      
                      <div className="flex justify-center mb-4">
                        <div className="p-4 bg-white rounded-lg border-2 border-dashed border-muted-foreground/30">
                          <img 
                            src={upiQrImage} 
                            alt="UPI QR Code" 
                            className="w-48 h-48 object-contain"
                          />
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>• Open any UPI app (Google Pay, PhonePe, Paytm, etc.)</p>
                        <p>• Scan the QR code</p>
                        <p>• Complete the payment</p>
                      </div>
                      
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium">Total Amount: ₹{total.toFixed(2)}</p>
                      </div>
                      
                      <div className="mt-4">
                        <Label htmlFor="upiReference">UPI Payment Reference Number</Label>
                        <Input
                          id="upiReference"
                          placeholder="Enter your UPI transaction reference number"
                          value={formData.upiReference}
                          onChange={(e) => handleInputChange('upiReference', e.target.value)}
                          required
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Please enter the transaction reference number after completing the UPI payment
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Notes (Optional)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Any special instructions for your order..."
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      rows={3}
                    />
                  </CardContent>
                </Card>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {cartItems.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No items in your cart</p>
                        <p className="text-sm">Add items from the products page</p>
                      </div>
                    ) : (
                      cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="w-16 h-16 bg-muted rounded"></div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                            <p className="text-xs text-muted-foreground">{item.size}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 ml-auto"
                                onClick={() => removeItem(item.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>₹{shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-terracotta">₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button 
                    variant="hero" 
                    className="w-full" 
                    size="lg"
                    onClick={handleSubmit}
                    disabled={cartItems.length === 0}
                  >
                    Complete Order
                  </Button>

                  <div className="text-xs text-muted-foreground text-center">
                    By placing your order, you agree to our terms and conditions
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer outside container to make full width */}
      <Footer />
    </>
  );
};

export default OrderForm;
