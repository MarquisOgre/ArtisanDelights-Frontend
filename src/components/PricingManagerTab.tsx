import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { products } from '@/data/products';
import { Edit, Save, X, TrendingUp, TrendingDown, Percent } from 'lucide-react';

const PricingManagerTab = () => {
  const [editingVariant, setEditingVariant] = useState<string | null>(null);
  const [tempPrices, setTempPrices] = useState<{ [key: string]: number }>({});

  const handleEditPrice = (variantId: string, currentPrice: number) => {
    setEditingVariant(variantId);
    setTempPrices({ ...tempPrices, [variantId]: currentPrice });
  };

  const handleSavePrice = (variantId: string) => {
    console.log('Saving price for variant:', variantId, 'New price:', tempPrices[variantId]);
    setEditingVariant(null);
  };

  const handleCancelEdit = () => {
    setEditingVariant(null);
    setTempPrices({});
  };

  const calculateDiscount = (originalPrice?: number, currentPrice?: number) => {
    if (!originalPrice || !currentPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pricing Manager</h2>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="discount">On Discount</SelectItem>
              <SelectItem value="regular">Regular Price</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="artisan">
            Apply Bulk Discount
          </Button>
        </div>
      </div>

      {/* Pricing Overview Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Product Price</p>
                <p className="text-2xl font-bold text-terracotta">₹245</p>
                <p className="text-xs text-sage">+₹12 from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-sage" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Products on Discount</p>
                <p className="text-2xl font-bold text-warm-brown">24</p>
                <p className="text-xs text-warm-brown">75% of products</p>
              </div>
              <Percent className="h-8 w-8 text-warm-brown" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Discount</p>
                <p className="text-2xl font-bold text-soft-beige">18%</p>
                <p className="text-xs text-soft-beige">Across all variants</p>
              </div>
              <TrendingDown className="h-8 w-8 text-soft-beige" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue Impact</p>
                <p className="text-2xl font-bold text-sage">+₹8.2K</p>
                <p className="text-xs text-sage">From pricing strategy</p>
              </div>
              <TrendingUp className="h-8 w-8 text-sage" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Pricing Management</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="text-left p-4">Product</th>
                  <th className="text-left p-4">Trial Pack (50g)</th>
                  <th className="text-left p-4">250g Pack</th>
                  <th className="text-left p-4">500g Pack</th>
                  <th className="text-left p-4">1kg Pack</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const trialVariant = product.variants.find(v => v.size === 'Trial Pack');
                  const variant250 = product.variants.find(v => v.size === '250g');
                  const variant500 = product.variants.find(v => v.size === '500g');
                  const variant1kg = product.variants.find(v => v.size === '1kg');
                  
                  return (
                    <tr key={product.id} className="border-b hover:bg-muted/20">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
                          <div>
                            <span className="font-medium">{product.name}</span>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                          </div>
                        </div>
                      </td>
                      
                      {/* Trial Pack Variant */}
                      <td className="p-4">
                        {trialVariant && (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {editingVariant === trialVariant.id ? (
                                <Input
                                  type="number"
                                  value={tempPrices[trialVariant.id] || trialVariant.price}
                                  onChange={(e) => setTempPrices({
                                    ...tempPrices,
                                    [trialVariant.id]: Number(e.target.value)
                                  })}
                                  className="w-20 h-7 text-xs"
                                />
                              ) : (
                                <span className="font-bold text-terracotta">₹{trialVariant.price}</span>
                              )}
                            </div>
                            {trialVariant.originalPrice && (
                              <div className="text-xs text-muted-foreground line-through">
                                ₹{trialVariant.originalPrice}
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                      
                      {/* 250g Variant */}
                      <td className="p-4">
                        {variant250 && (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {editingVariant === variant250.id ? (
                                <Input
                                  type="number"
                                  value={tempPrices[variant250.id] || variant250.price}
                                  onChange={(e) => setTempPrices({
                                    ...tempPrices,
                                    [variant250.id]: Number(e.target.value)
                                  })}
                                  className="w-20 h-7 text-xs"
                                />
                              ) : (
                                <span className="font-bold text-terracotta">₹{variant250.price}</span>
                              )}
                            </div>
                            {variant250.originalPrice && (
                              <div className="text-xs text-muted-foreground line-through">
                                ₹{variant250.originalPrice}
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                      
                      {/* 500g Variant */}
                      <td className="p-4">
                        {variant500 && (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {editingVariant === variant500.id ? (
                                <Input
                                  type="number"
                                  value={tempPrices[variant500.id] || variant500.price}
                                  onChange={(e) => setTempPrices({
                                    ...tempPrices,
                                    [variant500.id]: Number(e.target.value)
                                  })}
                                  className="w-20 h-7 text-xs"
                                />
                              ) : (
                                <span className="font-bold text-terracotta">₹{variant500.price}</span>
                              )}
                            </div>
                            {variant500.originalPrice && (
                              <div className="text-xs text-muted-foreground line-through">
                                ₹{variant500.originalPrice}
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                      
                      {/* 1kg Variant */}
                      <td className="p-4">
                        {variant1kg && (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {editingVariant === variant1kg.id ? (
                                <Input
                                  type="number"
                                  value={tempPrices[variant1kg.id] || variant1kg.price}
                                  onChange={(e) => setTempPrices({
                                    ...tempPrices,
                                    [variant1kg.id]: Number(e.target.value)
                                  })}
                                  className="w-20 h-7 text-xs"
                                />
                              ) : (
                                <span className="font-bold text-terracotta">₹{variant1kg.price}</span>
                              )}
                            </div>
                            {variant1kg.originalPrice && (
                              <div className="text-xs text-muted-foreground line-through">
                                ₹{variant1kg.originalPrice}
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                      
                      <td className="p-4">
                        <Badge className={product.inStock ? 'bg-sage text-white' : 'bg-destructive text-white'}>
                          {product.inStock ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      
                      <td className="p-4">
                        <div className="flex gap-1">
                          {editingVariant && product.variants.some(v => v.id === editingVariant) ? (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSavePrice(editingVariant)}
                                title="Save Price"
                              >
                                <Save className="h-4 w-4 text-sage" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCancelEdit}
                                title="Cancel"
                              >
                                <X className="h-4 w-4 text-destructive" />
                              </Button>
                            </>
                          ) : (
                            <Select onValueChange={(variantId) => {
                              const variant = product.variants.find(v => v.id === variantId);
                              if (variant) handleEditPrice(variant.id, variant.price);
                            }}>
                              <SelectTrigger className="w-24 h-8 text-xs">
                                <SelectValue placeholder="Edit" />
                              </SelectTrigger>
                              <SelectContent>
                                {product.variants.map(variant => (
                                  <SelectItem key={variant.id} value={variant.id}>
                                    {variant.size}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Pricing Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Pricing Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <Label>Apply Discount to All</Label>
              <div className="flex gap-2">
                <Input placeholder="Discount %" type="number" />
                <Button variant="outline">Apply</Button>
              </div>
            </div>
            <div className="space-y-4">
              <Label>Price Increase</Label>
              <div className="flex gap-2">
                <Input placeholder="Increase %" type="number" />
                <Button variant="outline">Apply</Button>
              </div>
            </div>
            <div className="space-y-4">
              <Label>Quick Actions</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Remove All Discounts</Button>
                <Button variant="outline" size="sm">Festival Pricing</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingManagerTab;