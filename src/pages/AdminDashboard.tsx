import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Footer from '@/components/Footer';
import { 
  Package, 
  Users, 
  DollarSign, 
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  QrCode
} from 'lucide-react';
import { products, getBasePrice } from '@/data/products';
import PricingManagerTab from '@/components/PricingManagerTab';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [upiQrCode, setUpiQrCode] = useState('/upi-qr-placeholder.png');
  const [displayProducts, setDisplayProducts] = useState(() => {
    const saved = localStorage.getItem('adminProducts');
    return saved ? JSON.parse(saved) : products;
  });
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    brand: 'ARTISAN DELIGHTS',
    description: '',
    image: ''
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [editProduct, setEditProduct] = useState({
    name: '',
    price: '',
    category: '',
    brand: '',
    description: '',
    image: ''
  });

  // Save products to localStorage whenever displayProducts changes
  useEffect(() => {
    localStorage.setItem('adminProducts', JSON.stringify(displayProducts));
  }, [displayProducts]);

  // Real analytics data (currently showing 0 for real data)
  const analytics = {
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: products.length,
    totalUsers: 0,
    activeUsers: 0,
    recentOrders: [], // No dummy orders
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-sage text-primary-foreground';
      case 'Processing':
        return 'bg-soft-beige text-warm-brown';
      case 'Shipped':
        return 'bg-terracotta text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your artisan marketplace</p>
        </div>

      {/* Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 lg:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold text-terracotta">
                      ₹{analytics.totalRevenue.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-terracotta" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <p className="text-2xl font-bold">{analytics.totalOrders}</p>
                  </div>
                  <Package className="h-8 w-8 text-sage" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Products</p>
                    <p className="text-2xl font-bold">{analytics.totalProducts}</p>
                  </div>
                  <Package className="h-8 w-8 text-warm-brown" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Users</p>
                    <p className="text-2xl font-bold">{analytics.totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-soft-beige" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {analytics.recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No recent orders found</p>
                  <p className="text-sm text-muted-foreground">Orders will appear here when customers place orders</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {analytics.recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <div>
                          <p className="font-bold">₹{order.amount}</p>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" title="View Order">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Edit Order">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Delete Order">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Product Management</h2>
            <Button 
              variant="artisan" 
              onClick={() => setIsAddingProduct(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>

          {isAddingProduct && (
            <Card>
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="productName">Product Name</Label>
                    <Input 
                      id="productName" 
                      placeholder="Enter product name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Base Price (₹)</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      placeholder="150"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={newProduct.category} onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="traditional-podis">Traditional Podis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input 
                      id="brand" 
                      placeholder="Brand name" 
                      value={newProduct.brand}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, brand: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="image">Product Image URL</Label>
                  <Input 
                    id="image" 
                    placeholder="Enter image URL or path"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Add image URL or use default: /podi-collection.jpg
                  </p>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Product description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="artisan"
                    onClick={() => {
                      if (newProduct.name && newProduct.price && newProduct.category && newProduct.description) {
                        const productToAdd = {
                          id: `new-${Date.now()}`,
                          name: newProduct.name,
                          slug: newProduct.name.toLowerCase().replace(/\s+/g, '-'),
                          category: newProduct.category,
                          description: newProduct.description,
                          image: newProduct.image || '/podi-collection.jpg',
                          inStock: true,
                          featured: false,
                          variants: [
                            {
                              id: '100g',
                              size: '100g',
                              weight: '100g',
                              price: parseInt(newProduct.price)
                            }
                          ]
                        };
                        setDisplayProducts(prev => [...prev, productToAdd]);
                        setNewProduct({ name: '', price: '', category: '', brand: 'ARTISAN DELIGHTS', description: '', image: '' });
                        setIsAddingProduct(false);
                        alert('Product added successfully!');
                      } else {
                        alert('Please fill in all required fields');
                      }
                    }}
                  >
                    Save Product
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setIsAddingProduct(false);
                    setNewProduct({ name: '', price: '', category: '', brand: 'ARTISAN DELIGHTS', description: '', image: '' });
                  }}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {editingProduct && (
            <Card>
              <CardHeader>
                <CardTitle>Edit Product</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editProductName">Product Name</Label>
                    <Input 
                      id="editProductName" 
                      placeholder="Enter product name"
                      value={editProduct.name}
                      onChange={(e) => setEditProduct(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editPrice">Base Price (₹)</Label>
                    <Input 
                      id="editPrice" 
                      type="number" 
                      placeholder="150"
                      value={editProduct.price}
                      onChange={(e) => setEditProduct(prev => ({ ...prev, price: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editCategory">Category</Label>
                    <Select value={editProduct.category} onValueChange={(value) => setEditProduct(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="traditional-podis">Traditional Podis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="editBrand">Brand</Label>
                    <Input 
                      id="editBrand" 
                      placeholder="Brand name" 
                      value={editProduct.brand}
                      onChange={(e) => setEditProduct(prev => ({ ...prev, brand: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="editImage">Product Image URL</Label>
                  <Input 
                    id="editImage" 
                    placeholder="Enter image URL or path"
                    value={editProduct.image}
                    onChange={(e) => setEditProduct(prev => ({ ...prev, image: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editDescription">Description</Label>
                  <Textarea 
                    id="editDescription" 
                    placeholder="Product description"
                    value={editProduct.description}
                    onChange={(e) => setEditProduct(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="artisan"
                    onClick={() => {
                      if (editProduct.name && editProduct.price && editProduct.category && editProduct.description) {
                        setDisplayProducts(prev => prev.map(product => 
                          product.id === editingProduct.id 
                            ? {
                                ...product,
                                name: editProduct.name,
                                description: editProduct.description,
                                image: editProduct.image || product.image,
                                variants: product.variants.map(variant => ({
                                  ...variant,
                                  price: parseInt(editProduct.price)
                                }))
                              }
                            : product
                        ));
                        setEditingProduct(null);
                        setEditProduct({ name: '', price: '', category: '', brand: '', description: '', image: '' });
                        alert('Product updated successfully!');
                      } else {
                        alert('Please fill in all required fields');
                      }
                    }}
                  >
                    Update Product
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setEditingProduct(null);
                    setEditProduct({ name: '', price: '', category: '', brand: '', description: '', image: '' });
                  }}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4">Product</th>
                      <th className="text-left p-4">Category</th>
                      <th className="text-left p-4">Brand</th>
                      <th className="text-left p-4">Price</th>
                      <th className="text-left p-4">Stock</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayProducts.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-12 h-12 rounded object-cover cursor-pointer"
                              onClick={() => window.location.href = `/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                            />
                            <span 
                              className="font-medium cursor-pointer hover:text-terracotta"
                              onClick={() => window.location.href = `/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">{product.category}</td>
                        <td className="p-4">ARTISAN DELIGHTS</td>
                        <td className="p-4">₹{getBasePrice(product)}</td>
                        <td className="p-4">
                          <Badge variant={product.inStock ? "default" : "destructive"}>
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => window.location.href = `/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                              title="View Product"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setEditingProduct(product);
                                setEditProduct({
                                  name: product.name,
                                  price: getBasePrice(product).toString(),
                                  category: product.category,
                                  brand: 'ARTISAN DELIGHTS',
                                  description: product.description,
                                  image: product.image
                                });
                              }}
                              title="Edit Product"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
                                  setDisplayProducts(prev => prev.filter(p => p.id !== product.id));
                                  alert('Product deleted successfully!');
                                }
                              }}
                              title="Delete Product"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Order Management</h2>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left p-4">Order ID</th>
                      <th className="text-left p-4">Customer</th>
                      <th className="text-left p-4">Products</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.recentOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center">
                          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">No orders found</p>
                          <p className="text-sm text-muted-foreground">Orders will appear here when customers place orders</p>
                        </td>
                      </tr>
                    ) : (
                      analytics.recentOrders.map((order, index) => (
                        <tr key={order.id} className="border-b hover:bg-muted/20">
                          <td className="p-4 font-mono text-sm">{order.id}</td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{order.customer}</p>
                              <p className="text-sm text-muted-foreground">customer{index + 1}@email.com</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-muted rounded"></div>
                              <span className="text-sm">Idly Podi + 2 more</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="font-bold">₹{order.amount}</span>
                          </td>
                          <td className="p-4">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {new Date().toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <div className="flex gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                title="View Order"
                                onClick={() => alert('View order functionality will be implemented')}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                title="Edit Order"
                                onClick={() => alert('Edit order functionality will be implemented')}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                title="Delete Order"
                                onClick={() => alert('Delete order functionality will be implemented')}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">User Management</h2>
            <div className="flex gap-2">
              <Input placeholder="Search users..." className="w-64" />
              <Button 
                variant="artisan"
                onClick={() => {
                  console.log('Adding new user...');
                  alert('Add user functionality - Connect to Supabase for full user management');
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">{analytics.totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-soft-beige" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                    <p className="text-2xl font-bold text-sage">{analytics.activeUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-sage" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">New This Month</p>
                    <p className="text-2xl font-bold text-terracotta">0</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-terracotta" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                 <table className="w-full">
                   <thead className="border-b bg-muted/50">
                     <tr>
                       <th className="text-left p-4">User</th>
                       <th className="text-left p-4">Email</th>
                       <th className="text-left p-4">Orders</th>
                       <th className="text-left p-4">Total Spent</th>
                       <th className="text-left p-4">Status</th>
                       <th className="text-left p-4">Joined</th>
                       <th className="text-left p-4">Actions</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                       <td colSpan={7} className="p-8 text-center">
                         <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                         <p className="text-muted-foreground">No users found</p>
                         <p className="text-sm text-muted-foreground">Real user data will appear here when users register</p>
                       </td>
                     </tr>
                   </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <h2 className="text-2xl font-bold">Analytics & Reports</h2>
          
          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-2xl font-bold text-sage">0%</p>
                    <p className="text-xs text-sage">No data available</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-sage" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Order Value</p>
                    <p className="text-2xl font-bold text-terracotta">₹0</p>
                    <p className="text-xs text-terracotta">No orders yet</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-terracotta" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Customer Retention</p>
                    <p className="text-2xl font-bold text-warm-brown">0%</p>
                    <p className="text-xs text-warm-brown">No customer data</p>
                  </div>
                  <Users className="h-8 w-8 text-warm-brown" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Return Rate</p>
                    <p className="text-2xl font-bold text-soft-beige">0%</p>
                    <p className="text-xs text-soft-beige">No returns yet</p>
                  </div>
                  <Package className="h-8 w-8 text-soft-beige" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Sales Trends (Last 30 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-terracotta/10 to-warm-brown/10 rounded flex items-center justify-center border-2 border-dashed border-terracotta/20">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-terracotta/40 mx-auto mb-2" />
                    <p className="text-muted-foreground">No sales data available</p>
                    <p className="text-sm text-muted-foreground">Charts will appear when orders are placed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Top Products Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Idly Podi', sales: 245, revenue: 12250, growth: '+15%' },
                    { name: 'Sambar Powder', sales: 189, revenue: 9450, growth: '+8%' },
                    { name: 'Palli Podi', sales: 156, revenue: 7800, growth: '+22%' },
                    { name: 'Curry Leaves Podi', sales: 134, revenue: 6700, growth: '+12%' },
                   ].map((product, index) => (
                     <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                       <div>
                         <p className="font-medium">{product.name}</p>
                         <p className="text-sm text-muted-foreground">Real data will be shown here</p>
                      </div>
                       <div className="text-right">
                         <p className="font-bold">₹0</p>
                         <p className="text-sm text-sage">No data yet</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Demographics & Behavior</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Top Customer Segment</h4>
                  <p className="text-2xl font-bold text-terracotta">No Data</p>
                  <p className="text-sm text-muted-foreground">0% of total customers</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Peak Order Time</h4>
                  <p className="text-2xl font-bold text-sage">No Data</p>
                  <p className="text-sm text-muted-foreground">0% of daily orders</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Repeat Purchase Rate</h4>
                  <p className="text-2xl font-bold text-warm-brown">0%</p>
                  <p className="text-sm text-muted-foreground">No repeat customers yet</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing Tab */}
        <TabsContent value="pricing">
          <PricingManagerTab products={displayProducts} />
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                System Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">UPI Payment Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Current UPI QR Code</label>
                    <div className="mt-2 p-4 border rounded-lg bg-muted/50">
                      <img 
                        src={upiQrCode} 
                        alt="UPI QR Code" 
                        className="w-32 h-32 mx-auto"
                      />
                    </div>
                  </div>
                  <Button 
                    variant="artisan"
                    onClick={() => {
                      alert('UPI QR Code update functionality will be implemented');
                    }}
                  >
                    Update UPI QR Code
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        </Tabs>
      </div>
      
      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default AdminDashboard;