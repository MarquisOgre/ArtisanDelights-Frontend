import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Package, 
  Users, 
  DollarSign, 
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3
} from 'lucide-react';
import { products, getBasePrice } from '@/data/products';
import PricingManagerTab from '@/components/PricingManagerTab';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Mock analytics data
  const analytics = {
    totalRevenue: 15420.50,
    totalOrders: 156,
    totalProducts: products.length,
    totalUsers: 89,
    recentOrders: [
      { id: 'ORD-001', customer: 'Sarah Johnson', amount: 89.99, status: 'Completed' },
      { id: 'ORD-002', customer: 'Mike Chen', amount: 68.50, status: 'Processing' },
      { id: 'ORD-003', customer: 'Emma Davis', amount: 156.98, status: 'Shipped' },
    ],
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
    <div className="container mx-auto px-4 py-8">
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
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
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
                      ${analytics.totalRevenue.toLocaleString()}
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
              <div className="space-y-4">
                {analytics.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${order.amount}</p>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
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
                    <Input id="productName" placeholder="Enter product name" />
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" type="number" placeholder="0.00" />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pottery">Pottery</SelectItem>
                        <SelectItem value="woodwork">Woodwork</SelectItem>
                        <SelectItem value="textiles">Textiles</SelectItem>
                        <SelectItem value="jewelry">Jewelry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="artisan">Artisan</Label>
                    <Input id="artisan" placeholder="Artisan name" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Product description" />
                </div>
                <div className="flex gap-2">
                  <Button variant="artisan">Save Product</Button>
                  <Button variant="outline" onClick={() => setIsAddingProduct(false)}>
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
                      <th className="text-left p-4">Artisan</th>
                      <th className="text-left p-4">Price</th>
                      <th className="text-left p-4">Stock</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-muted rounded"></div>
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </td>
                        <td className="p-4">{product.category}</td>
                        <td className="p-4">Artisan Delights</td>
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
                              onClick={() => console.log('View product:', product.id)}
                              title="View Product"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => console.log('Edit product:', product.id)}
                              title="Edit Product"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => console.log('Delete product:', product.id)}
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
                    {analytics.recentOrders.map((order, index) => (
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
                            <Button variant="ghost" size="sm" title="View Order">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Edit Order">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Select>
                              <SelectTrigger className="w-32 h-8">
                                <SelectValue placeholder="Update Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                              </SelectContent>
                            </Select>
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

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">User Management</h2>
            <div className="flex gap-2">
              <Input placeholder="Search users..." className="w-64" />
              <Button variant="artisan">
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-6">
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
                    <p className="text-2xl font-bold text-sage">76</p>
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
                    <p className="text-2xl font-bold text-terracotta">13</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-terracotta" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Premium Users</p>
                    <p className="text-2xl font-bold text-warm-brown">24</p>
                  </div>
                  <Users className="h-8 w-8 text-warm-brown" />
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
                    {[
                      { name: 'Rajesh Kumar', email: 'rajesh@email.com', orders: 12, spent: 2450, status: 'Active', joined: '2024-01-15' },
                      { name: 'Priya Sharma', email: 'priya@email.com', orders: 8, spent: 1890, status: 'Active', joined: '2024-02-20' },
                      { name: 'Suresh Reddy', email: 'suresh@email.com', orders: 15, spent: 3200, status: 'Premium', joined: '2023-12-10' },
                      { name: 'Meera Iyer', email: 'meera@email.com', orders: 5, spent: 980, status: 'Active', joined: '2024-03-05' },
                    ].map((user, index) => (
                      <tr key={index} className="border-b hover:bg-muted/20">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-terracotta to-warm-brown rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{user.email}</td>
                        <td className="p-4">{user.orders}</td>
                        <td className="p-4 font-semibold">₹{user.spent}</td>
                        <td className="p-4">
                          <Badge className={user.status === 'Premium' ? 'bg-terracotta text-white' : 'bg-sage text-white'}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{user.joined}</td>
                        <td className="p-4">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" title="View Profile">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Edit User">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Deactivate">
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
                    <p className="text-2xl font-bold text-sage">12.5%</p>
                    <p className="text-xs text-sage">+2.3% from last month</p>
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
                    <p className="text-2xl font-bold text-terracotta">₹98.80</p>
                    <p className="text-xs text-terracotta">+₹12 from last month</p>
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
                    <p className="text-2xl font-bold text-warm-brown">84.2%</p>
                    <p className="text-xs text-warm-brown">+1.5% from last month</p>
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
                    <p className="text-2xl font-bold text-soft-beige">2.1%</p>
                    <p className="text-xs text-soft-beige">-0.3% from last month</p>
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
                    <p className="text-muted-foreground">Sales chart visualization</p>
                    <p className="text-sm text-muted-foreground">Daily revenue tracking</p>
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
                        <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{product.revenue}</p>
                        <p className="text-sm text-sage">{product.growth}</p>
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
                  <p className="text-2xl font-bold text-terracotta">Age 25-35</p>
                  <p className="text-sm text-muted-foreground">42% of total customers</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Peak Order Time</h4>
                  <p className="text-2xl font-bold text-sage">10 AM - 2 PM</p>
                  <p className="text-sm text-muted-foreground">35% of daily orders</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Repeat Purchase Rate</h4>
                  <p className="text-2xl font-bold text-warm-brown">68%</p>
                  <p className="text-sm text-muted-foreground">Within 3 months</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing Tab */}
        <TabsContent value="pricing">
          <PricingManagerTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;