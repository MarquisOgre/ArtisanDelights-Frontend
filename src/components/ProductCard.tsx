import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { Product, getBasePrice } from '@/data/products';
import { ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const basePrice = getBasePrice(product);
  const hasDiscount = product.variants.some(v => v.originalPrice && v.originalPrice > v.price);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-warm-brown/20">
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.featured && (
          <Badge className="absolute top-4 right-4 bg-terracotta text-white shadow-lg">
            Featured
          </Badge>
        )}
        {hasDiscount && (
          <Badge className="absolute top-4 left-4 bg-sage text-white shadow-lg">
            Special Offer
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
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl group-hover:text-terracotta transition-colors">
            {product.name}
          </CardTitle>
          <Badge variant="secondary" className="bg-soft-beige text-warm-brown">
            {product.variants.length} Sizes
          </Badge>
        </div>
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-sm text-muted-foreground ml-2">(4.8)</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          
          {product.ingredients && (
            <div className="flex flex-wrap gap-1">
              {product.ingredients.slice(0, 3).map((ingredient, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-sage/10 text-sage border-sage/20">
                  {ingredient}
                </Badge>
              ))}
              {product.ingredients.length > 3 && (
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  +{product.ingredients.length - 3} more
                </Badge>
              )}
            </div>
          )}
          
          <div className="flex justify-between items-center pt-2 border-t border-warm-brown/10">
            <div>
              <span className="text-sm text-muted-foreground">Starting from</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-terracotta">
                  ₹{basePrice}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{product.variants[0].originalPrice}
                  </span>
                )}
              </div>
            </div>
            <Link to={`/products/${product.id}`}>
              <Button
                variant="artisan"
                size="sm"
                disabled={!product.inStock}
                className="flex items-center gap-2 bg-terracotta hover:bg-warm-brown"
              >
                <ShoppingCart className="h-4 w-4" />
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;