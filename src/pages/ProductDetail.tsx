import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductBySlug } from '@/data/products';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart, Star, Check } from 'lucide-react';
import { useState } from 'react';
import Footer from '@/components/Footer';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug || '');
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-muted-foreground mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button variant="artisan">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleOrderNow = () => {
    if (!selectedVariant) return;
    
    navigate('/order-form', {
      state: {
        selectedProduct: {
          id: product.id,
          name: product.name,
          price: selectedVariant.price,
          size: selectedVariant.size,
          image: product.image,
          variantId: selectedVariant.id
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/products">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column: Product Image + Ingredients & Benefits */}
          <div className="space-y-6">
            {/* Product Image */}
            <Card className="overflow-hidden border-warm-brown/20">
              <div className="relative h-96 md:h-[500px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.featured && (
                  <Badge className="absolute top-4 right-4 bg-terracotta text-white shadow-lg">
                    Featured
                  </Badge>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>
            </Card>

            {/* Ingredients */}
            {product.ingredients && (
              <Card className="border-warm-brown/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Check className="h-5 w-5 text-sage" />
                    Ingredients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient, index) => (
                      <Badge key={index} variant="outline" className="bg-sage/10 text-sage border-sage/20">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            {product.benefits && (
              <Card className="border-warm-brown/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Check className="h-5 w-5 text-terracotta" />
                    Health Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {product.benefits.map((benefit, index) => (
                      <Badge key={index} variant="outline" className="bg-terracotta/10 text-terracotta border-terracotta/20">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column: Product Details + Order */}
          <div className="space-y-6">
            {/* Product Name & Description */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-muted-foreground ml-2">(4.8 reviews)</span>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Variant Selection */}
            <Card className="border-warm-brown/20">
              <CardHeader>
                <CardTitle className="text-lg">Choose Size</CardTitle>
                <CardDescription>Select your preferred pack size</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map((variant) => (
                    <div
                      key={variant.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedVariant?.id === variant.id
                          ? 'border-terracotta bg-terracotta/5'
                          : 'border-warm-brown/20 hover:border-terracotta/50'
                      }`}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      <div className="text-center">
                        <div className="font-semibold text-foreground">{variant.size}</div>
                        <div className="text-sm text-muted-foreground">{variant.weight}</div>
                        <div className="mt-2">
                          <span className="text-lg font-bold text-terracotta">₹{variant.price}</span>
                          {variant.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through ml-2">
                              ₹{variant.originalPrice}
                            </span>
                          )}
                        </div>
                        {variant.originalPrice && (
                          <div className="text-xs text-sage font-semibold">
                            Save ₹{variant.originalPrice - variant.price}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Section */}
            <Card className="border-warm-brown/20 bg-soft-beige/30">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Selected: {selectedVariant?.size}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-terracotta">
                        ₹{selectedVariant?.price}
                      </span>
                      {selectedVariant?.originalPrice && (
                        <span className="text-muted-foreground line-through">
                          ₹{selectedVariant.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="artisan"
                    size="lg"
                    disabled={!product.inStock}
                    onClick={handleOrderNow}
                    className="flex items-center gap-2 bg-terracotta hover:bg-warm-brown"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Order Now
                  </Button>
                </div>
                {!product.inStock && (
                  <p className="text-muted-foreground text-sm">This product is currently out of stock.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;