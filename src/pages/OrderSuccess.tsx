import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/enhanced-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import Footer from '@/components/Footer';

const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-brown/5 via-soft-beige/10 to-terracotta/5 flex items-center justify-center">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="shadow-xl">
            <CardHeader className="pb-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-warm-brown">
                Order Confirmed!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-muted-foreground">
                Thank you for your order! Your traditional podis are being prepared with care.
              </p>
              
              <div className="bg-soft-beige/20 p-6 rounded-lg">
                <h3 className="font-semibold text-warm-brown mb-2">What's Next?</h3>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li>• You'll receive a confirmation email shortly</li>
                  <li>• We'll prepare your order fresh within 24 hours</li>
                  <li>• Shipping typically takes 3-5 business days</li>
                  <li>• Track your order status in your dashboard</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="outline" size="lg" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
                <Link to="/products">
                  <Button variant="artisan" size="lg" className="flex items-center gap-2">
                    Continue Shopping
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSuccess;