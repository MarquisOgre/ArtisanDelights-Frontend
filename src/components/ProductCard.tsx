import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  artisan: string;
  description: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (productId: string) => void;
}

const ProductCard = ({ product, onAddToCart, onToggleFavorite }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(product.id);
  };

  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-card hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1 bg-gradient-card">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-cream text-warm-brown">
            {product.category}
          </Badge>
        </div>
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFavorite ? 'fill-terracotta text-terracotta' : 'text-muted-foreground hover:text-terracotta'
            }`}
          />
        </button>
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center backdrop-blur-sm">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-terracotta transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground">by {product.artisan}</p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-2xl font-bold text-terracotta">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          variant="artisan"
          className="w-full"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;