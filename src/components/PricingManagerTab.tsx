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
                  <th className="text-left p-4">Variant</th>
                  <th className="text-left p-4">Current Price</th>
                  <th className="text-left p-4">Original Price</th>
                  <th className="text-left p-4">Discount</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) =>
                  product.variants.map((variant) => {
                    const discount = calculateDiscount(variant.originalPrice, variant.price);
                    const isEditing = editingVariant === variant.id;
                    
                    return (
                      <tr key={variant.id} className="border-b hover:bg-muted/20">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-muted rounded"></div>
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <span className="font-medium">{variant.size}</span>
                            <p className="text-sm text-muted-foreground">{variant.weight}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          {isEditing ? (
                            <Input
                              type="number"
                              value={tempPrices[variant.id] || variant.price}
                              onChange={(e) => setTempPrices({
                                ...tempPrices,
                                [variant.id]: Number(e.target.value)
                              })}
                              className="w-24"
                            />
                          ) : (
                            <span className="font-bold text-terracotta">₹{variant.price}</span>
                          )}
                        </td>
                        <td className="p-4">
                          <span className="text-muted-foreground">
                            {variant.originalPrice ? `₹${variant.originalPrice}` : '-'}
                          </span>
                        </td>
                        <td className="p-4">
                          {discount > 0 ? (
                            <Badge className="bg-sage text-white">
                              -{discount}%
                            </Badge>
                          ) : (
                            <Badge variant="outline">No Discount</Badge>
                          )}
                        </td>
                        <td className="p-4">
                          <Badge className={product.inStock ? 'bg-sage text-white' : 'bg-destructive text-white'}>
                            {product.inStock ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td className="p-4">
                          {isEditing ? (
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSavePrice(variant.id)}
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
                            </div>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditPrice(variant.id, variant.price)}
                              title="Edit Price"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
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