import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/enhanced-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
  QrCode,
  Mail,
  Settings
} from 'lucide-react';
import { products, getBasePrice } from '@/data/products';
import PricingManagerTab from '@/components/PricingManagerTab';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [upiQrCode, setUpiQrCode] = useState('/UPI-QRcode.png');
  const [orders, setOrders] = useState([]);
  const [emailSettings, setEmailSettings] = useState({
    smtp_host: '',
    smtp_port: 587,
    smtp_secure: true,
    smtp_username: '',
    smtp_password: '',
    from_email: '',
    from_name: 'Artisan Delights'
  });
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [testEmail, setTestEmail] = useState('');
  const [testEmailType, setTestEmailType] = useState('confirmation');
  const [displayProducts, setDisplayProducts] = useState(() => {
    const saved = localStorage.getItem('adminProducts');
    return saved ? JSON.parse(saved) : products;
  });
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    brand: 'ARTISAN DELIGHTS',
    description: '',
    image: '',
    variants: {
      trial: { size: 'Trial Pack', weight: '50g', price: '' },
      small: { size: '250g', weight: '250g', price: '' },
      medium: { size: '500g', weight: '500g', price: '' },
      large: { size: '1kg', weight: '1000g', price: '' }
    }
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [editProduct, setEditProduct] = useState({
    name: '',
    category: '',
    brand: '',
    description: '',
    image: '',
    variants: {
      trial: { size: 'Trial Pack', weight: '50g', price: '' },
      small: { size: '250g', weight: '250g', price: '' },
      medium: { size: '500g', weight: '500g', price: '' },
      large: { size: '1kg', weight: '1000g', price: '' }
    }
  });

  // Save products to localStorage whenever displayProducts changes
  useEffect(() => {
    localStorage.setItem('adminProducts', JSON.stringify(displayProducts));
  }, [displayProducts]);

  // Fetch orders, email settings, and templates
  useEffect(() => {
    fetchOrders();
    fetchEmailSettings();
    fetchEmailTemplates();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchEmailSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('email_settings')
        .select('*')
        .eq('is_active', true)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching email settings:', error);
      } else if (data) {
        setEmailSettings(data);
      }
    } catch (error) {
      console.error('Error fetching email settings:', error);
    }
  };

  const fetchEmailTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .eq('is_active', true);
      
      if (error) {
        console.error('Error fetching email templates:', error);
      } else {
        setEmailTemplates(data || []);
      }
    } catch (error) {
      console.error('Error fetching email templates:', error);
    }
  };

  const saveEmailSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('email_settings')
        .upsert([emailSettings])
        .select()
        .single();
      
      if (error) {
        console.error('Error saving email settings:', error);
        alert('Error saving email settings');
      } else {
        alert('Email settings saved successfully');
      }
    } catch (error) {
      console.error('Error saving email settings:', error);
    }
  };

  const sendTestEmail = async () => {
    if (!testEmail) {
      alert('Please enter an email address for testing');
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('send-test-email', {
        body: { 
          email: testEmail,
          template_type: testEmailType
        }
      });

      if (error) {
        console.error('Error sending test email:', error);
        alert('Error sending test email: ' + error.message);
      } else {
        alert(`Test ${testEmailType} email sent successfully to ${testEmail}!`);
      }
    } catch (error) {
      console.error('Error calling test email function:', error);
      alert('Error sending test email');
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ order_status: newStatus })
        .eq('id', orderId)
        .select()
        .single();

      if (error) {
        console.error('Error updating order status:', error);
        alert('Error updating order status');
        return;
      }

      // Send email based on status
      if (newStatus === 'shipped') {
        await supabase.functions.invoke('send-order-shipped', {
          body: {
            orderId: data.id,
            orderNumber: data.order_number,
            customerName: data.customer_name,
            customerEmail: data.customer_email,
            shippingAddress: data.shipping_address,
            orderItems: data.order_items,
            totalAmount: data.total_amount,
            trackingNumber: 'TRK' + Date.now()
          }
        });
      } else if (newStatus === 'delivered') {
        await supabase.functions.invoke('send-order-delivered', {
          body: {
            orderId: data.id,
            orderNumber: data.order_number,
            customerName: data.customer_name,
            customerEmail: data.customer_email,
            shippingAddress: data.shipping_address,
            orderItems: data.order_items,
            totalAmount: data.total_amount,
            deliveryDate: new Date().toISOString()
          }
        });
      }

      // Refresh orders
      fetchOrders();
      alert(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order');
    }
  };

  const updatePaymentStatus = async (orderId: string, paymentStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ payment_status: paymentStatus })
        .eq('id', orderId);

      if (error) {
        console.error('Error updating payment status:', error);
        alert('Error updating payment status');
        return;
      }

      fetchOrders();
      alert(`Payment status updated to ${paymentStatus}`);
    } catch (error) {
      console.error('Error updating payment:', error);
      alert('Error updating payment');
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

      if (error) {
        console.error('Error deleting order:', error);
        alert('Error deleting order');
        return;
      }

      fetchOrders();
      alert('Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Error deleting order');
    }
  };

  // Real analytics data from actual orders
  const analytics = {
    totalRevenue: orders.reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0),
    totalOrders: orders.length,
    totalProducts: products.length,
    totalUsers: 0,
    activeUsers: 0,
    recentOrders: orders.slice(0, 5), // Show last 5 orders
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
        <TabsList className="grid w-full grid-cols-7 lg:w-[700px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
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
                        <p className="font-semibold">{order.order_number}</p>
                        <p className="text-sm text-muted-foreground">{order.customer_name}</p>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <div>
                          <p className="font-bold">₹{parseFloat(order.total_amount).toFixed(2)}</p>
                          <Badge className={getStatusColor(order.order_status)}>
                            {order.order_status}
                          </Badge>
                        </div>
                         <div className="flex gap-1">
                           <Button 
                             variant="ghost" 
                             size="sm" 
                             title="View Order"
                             onClick={() => alert(`Order Details:\nID: ${order.order_number}\nCustomer: ${order.customer_name}\nTotal: ₹${order.total_amount}\nStatus: ${order.order_status}\nPayment: ${order.payment_status}`)}
                           >
                             <Eye className="h-4 w-4" />
                           </Button>
                           <DropdownMenu>
                             <DropdownMenuTrigger asChild>
                               <Button variant="ghost" size="sm" title="Update Status">
                                 <Edit className="h-4 w-4" />
                               </Button>
                             </DropdownMenuTrigger>
                             <DropdownMenuContent>
                               <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'processing')}>
                                 Mark as Processing
                               </DropdownMenuItem>
                               <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'shipped')}>
                                 Mark as Shipped
                               </DropdownMenuItem>
                               <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'delivered')}>
                                 Mark as Delivered
                               </DropdownMenuItem>
                               <DropdownMenuSeparator />
                               <DropdownMenuItem onClick={() => updatePaymentStatus(order.id, 'paid')}>
                                 Mark Payment as Paid
                               </DropdownMenuItem>
                               <DropdownMenuItem onClick={() => updatePaymentStatus(order.id, 'failed')}>
                                 Mark Payment as Failed
                               </DropdownMenuItem>
                               <DropdownMenuSeparator />
                               <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'cancelled')}>
                                 Cancel Order
                               </DropdownMenuItem>
                             </DropdownMenuContent>
                           </DropdownMenu>
                           <Button 
                             variant="ghost" 
                             size="sm" 
                             title="Delete Order"
                             onClick={() => {
                               if (confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
                                 deleteOrder(order.id);
                               }
                             }}
                           >
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
                    <div>
                      <Label htmlFor="brand">Brand</Label>
                      <Input 
                        id="brand" 
                        placeholder="Brand name" 
                        value={newProduct.brand}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, brand: e.target.value }))}/>
                    </div>
                  </div>


                  <div>
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
                  </div>                
                </div>

                {/* Product Variants Pricing */}
                <div>
                  <Label className="text-lg font-semibold">Product Variants & Pricing</Label>
                  <div className="grid md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label htmlFor="trialPrice">Trial Pack (50g) - Price (₹)</Label>
                      <Input 
                        id="trialPrice" 
                        type="number" 
                        placeholder="50"
                        value={newProduct.variants.trial.price}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          variants: { 
                            ...prev.variants, 
                            trial: { ...prev.variants.trial, price: e.target.value } 
                          } 
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="smallPrice">250g Pack - Price (₹)</Label>
                      <Input 
                        id="smallPrice" 
                        type="number" 
                        placeholder="150"
                        value={newProduct.variants.small.price}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          variants: { 
                            ...prev.variants, 
                            small: { ...prev.variants.small, price: e.target.value } 
                          } 
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="mediumPrice">500g Pack - Price (₹)</Label>
                      <Input 
                        id="mediumPrice" 
                        type="number" 
                        placeholder="280"
                        value={newProduct.variants.medium.price}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          variants: { 
                            ...prev.variants, 
                            medium: { ...prev.variants.medium, price: e.target.value } 
                          } 
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="largePrice">1 KG Pack - Price (₹)</Label>
                      <Input 
                        id="largePrice" 
                        type="number" 
                        placeholder="520"
                        value={newProduct.variants.large.price}
                        onChange={(e) => setNewProduct(prev => ({ 
                          ...prev, 
                          variants: { 
                            ...prev.variants, 
                            large: { ...prev.variants.large, price: e.target.value } 
                          } 
                        }))}
                      />
                    </div>
                  </div>
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
                      const hasValidVariants = Object.values(newProduct.variants).some(variant => variant.price && parseInt(variant.price) > 0);
                      
                      if (newProduct.name && newProduct.category && newProduct.description && hasValidVariants) {
                        const productVariants = Object.entries(newProduct.variants)
                          .filter(([key, variant]) => variant.price && parseInt(variant.price) > 0)
                          .map(([key, variant]) => ({
                            id: variant.weight,
                            size: variant.size,
                            weight: variant.weight,
                            price: parseInt(variant.price)
                          }));

                        const productToAdd = {
                          id: `new-${Date.now()}`,
                          name: newProduct.name,
                          slug: newProduct.name.toLowerCase().replace(/\s+/g, '-'),
                          category: newProduct.category,
                          description: newProduct.description,
                          image: newProduct.image || '/podi-collection.jpg',
                          inStock: true,
                          featured: false,
                          variants: productVariants
                        };
                        setDisplayProducts(prev => [...prev, productToAdd]);
                        setNewProduct({ 
                          name: '', 
                          category: '', 
                          brand: 'ARTISAN DELIGHTS', 
                          description: '', 
                          image: '',
                          variants: {
                            trial: { size: 'Trial Pack', weight: '50g', price: '' },
                            small: { size: '250g', weight: '250g', price: '' },
                            medium: { size: '500g', weight: '500g', price: '' },
                            large: { size: '1kg', weight: '1000g', price: '' }
                          }
                        });
                        setIsAddingProduct(false);
                        alert('Product added successfully with all variants!');
                      } else {
                        alert('Please fill in product name, category, description, and at least one variant price');
                      }
                    }}
                  >
                    Save Product
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setIsAddingProduct(false);
                    setNewProduct({ 
                      name: '', 
                      category: '', 
                      brand: 'ARTISAN DELIGHTS', 
                      description: '', 
                      image: '',
                      variants: {
                        trial: { size: 'Trial Pack', weight: '50g', price: '' },
                        small: { size: '250g', weight: '250g', price: '' },
                        medium: { size: '500g', weight: '500g', price: '' },
                        large: { size: '1kg', weight: '1000g', price: '' }
                      }
                    });
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
                  <div>
                  <Label htmlFor="editImage">Product Image URL</Label>
                  <Input 
                    id="editImage" 
                    placeholder="Enter image URL or path"
                    value={editProduct.image}
                    onChange={(e) => setEditProduct(prev => ({ ...prev, image: e.target.value }))}
                  />
                </div>
                </div>

                {/* Edit Product Variants Pricing */}
                <div>
                  <Label className="text-lg font-semibold">Product Variants & Pricing</Label>
                  <div className="grid md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label htmlFor="editTrialPrice">Trial Pack (50g) - Price (₹)</Label>
                      <Input 
                        id="editTrialPrice" 
                        type="number" 
                        placeholder="50"
                        value={editProduct.variants.trial.price}
                        onChange={(e) => setEditProduct(prev => ({ 
                          ...prev, 
                          variants: { 
                            ...prev.variants, 
                            trial: { ...prev.variants.trial, price: e.target.value } 
                          } 
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="editSmallPrice">250g Pack - Price (₹)</Label>
                      <Input 
                        id="editSmallPrice" 
                        type="number" 
                        placeholder="150"
                        value={editProduct.variants.small.price}
                        onChange={(e) => setEditProduct(prev => ({ 
                          ...prev, 
                          variants: { 
                            ...prev.variants, 
                            small: { ...prev.variants.small, price: e.target.value } 
                          } 
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="editMediumPrice">500g Pack - Price (₹)</Label>
                      <Input 
                        id="editMediumPrice" 
                        type="number" 
                        placeholder="280"
                        value={editProduct.variants.medium.price}
                        onChange={(e) => setEditProduct(prev => ({ 
                          ...prev, 
                          variants: { 
                            ...prev.variants, 
                            medium: { ...prev.variants.medium, price: e.target.value } 
                          } 
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="editLargePrice">1kg Pack - Price (₹)</Label>
                      <Input 
                        id="editLargePrice" 
                        type="number" 
                        placeholder="520"
                        value={editProduct.variants.large.price}
                        onChange={(e) => setEditProduct(prev => ({ 
                          ...prev, 
                          variants: { 
                            ...prev.variants, 
                            large: { ...prev.variants.large, price: e.target.value } 
                          } 
                        }))}
                      />
                    </div>
                  </div>
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
                      const hasValidVariants = Object.values(editProduct.variants).some(variant => variant.price && parseInt(variant.price) > 0);
                      
                      if (editProduct.name && editProduct.category && editProduct.description && hasValidVariants) {
                        const updatedVariants = Object.entries(editProduct.variants)
                          .filter(([key, variant]) => variant.price && parseInt(variant.price) > 0)
                          .map(([key, variant]) => ({
                            id: variant.weight,
                            size: variant.size,
                            weight: variant.weight,
                            price: parseInt(variant.price)
                          }));

                        setDisplayProducts(prev => prev.map(product => 
                          product.id === editingProduct.id 
                            ? {
                                ...product,
                                name: editProduct.name,
                                description: editProduct.description,
                                image: editProduct.image || product.image,
                                variants: updatedVariants
                              }
                            : product
                        ));
                        setEditingProduct(null);
                        setEditProduct({ 
                          name: '', 
                          category: '', 
                          brand: '', 
                          description: '', 
                          image: '',
                          variants: {
                            trial: { size: 'Trial Pack', weight: '50g', price: '' },
                            small: { size: '250g', weight: '250g', price: '' },
                            medium: { size: '500g', weight: '500g', price: '' },
                            large: { size: '1kg', weight: '1000g', price: '' }
                          }
                        });
                        alert('Product updated successfully!');
                      } else {
                        alert('Please fill in product name, category, description, and at least one variant price');
                      }
                    }}
                  >
                    Update Product
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setEditingProduct(null);
                    setEditProduct({ 
                      name: '', 
                      category: '', 
                      brand: '', 
                      description: '', 
                      image: '',
                      variants: {
                        trial: { size: 'Trial Pack', weight: '50g', price: '' },
                        small: { size: '250g', weight: '250g', price: '' },
                        medium: { size: '500g', weight: '500g', price: '' },
                        large: { size: '1kg', weight: '1000g', price: '' }
                      }
                    });
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
                                // Convert existing variants back to the edit format
                                const editVariants = {
                                  trial: { size: 'Trial Pack', weight: '50g', price: '' },
                                  small: { size: '250g', weight: '250g', price: '' },
                                  medium: { size: '500g', weight: '500g', price: '' },
                                  large: { size: '1kg', weight: '1000g', price: '' }
                                };
                                
                                // Fill in existing variant prices
                                product.variants.forEach(variant => {
                                  if (variant.weight === '50g') editVariants.trial.price = variant.price.toString();
                                  if (variant.weight === '250g') editVariants.small.price = variant.price.toString();
                                  if (variant.weight === '500g') editVariants.medium.price = variant.price.toString();
                                  if (variant.weight === '1000g') editVariants.large.price = variant.price.toString();
                                });

                                setEditProduct({
                                  name: product.name,
                                  category: product.category,
                                  brand: 'ARTISAN DELIGHTS',
                                  description: product.description,
                                  image: product.image,
                                  variants: editVariants
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
                       <th className="text-left p-4">Order Status</th>
                       <th className="text-left p-4">Payment Status</th>
                       <th className="text-left p-4">Date</th>
                       <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                     {orders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center">
                          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">No orders found</p>
                          <p className="text-sm text-muted-foreground">Orders will appear here when customers place orders</p>
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-muted/20">
                          <td className="p-4 font-mono text-sm">{order.order_number}</td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{order.customer_name}</p>
                              <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-muted rounded"></div>
                              <span className="text-sm">{order.order_items?.length || 0} items</span>
                            </div>
                          </td>
                           <td className="p-4">
                             <span className="font-bold">₹{parseFloat(order.total_amount).toFixed(2)}</span>
                           </td>
                           <td className="p-4">
                             <Badge className={getStatusColor(order.order_status)}>
                               {order.order_status}
                             </Badge>
                           </td>
                           <td className="p-4">
                             <Badge variant={order.payment_status === 'paid' ? 'default' : order.payment_status === 'pending' ? 'secondary' : 'destructive'}>
                               {order.payment_status}
                             </Badge>
                           </td>
                           <td className="p-4 text-sm text-muted-foreground">
                             {new Date(order.created_at).toLocaleDateString()}
                           </td>
                           <td className="p-4">
                             <div className="flex gap-1">
                               <Button 
                                 variant="ghost" 
                                 size="sm" 
                                 title="View Order"
                                 onClick={() => alert(`Order Details:\nID: ${order.order_number}\nCustomer: ${order.customer_name}\nTotal: ₹${order.total_amount}\nStatus: ${order.order_status}\nPayment: ${order.payment_status}`)}
                               >
                                 <Eye className="h-4 w-4" />
                               </Button>
                               <DropdownMenu>
                                 <DropdownMenuTrigger asChild>
                                   <Button variant="ghost" size="sm" title="Update Status">
                                     <Edit className="h-4 w-4" />
                                   </Button>
                                 </DropdownMenuTrigger>
                                 <DropdownMenuContent>
                               <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'processing')}>
                                 Mark as Processing
                               </DropdownMenuItem>
                               <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'shipped')}>
                                 Mark as Shipped
                               </DropdownMenuItem>
                               <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'delivered')}>
                                 Mark as Delivered
                               </DropdownMenuItem>
                               <DropdownMenuSeparator />
                               <DropdownMenuItem onClick={() => updatePaymentStatus(order.id, 'paid')}>
                                 Mark Payment as Paid
                               </DropdownMenuItem>
                               <DropdownMenuItem onClick={() => updatePaymentStatus(order.id, 'failed')}>
                                 Mark Payment as Failed
                               </DropdownMenuItem>
                               <DropdownMenuSeparator />
                               <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'cancelled')}>
                                 Cancel Order
                               </DropdownMenuItem>
                                 </DropdownMenuContent>
                               </DropdownMenu>
                               <Button 
                                 variant="ghost" 
                                 size="sm" 
                                 title="Delete Order"
                                 onClick={() => {
                                   if (confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
                                     deleteOrder(order.id);
                                   }
                                 }}
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

        {/* Email Settings Tab */}
        <TabsContent value="email" className="space-y-6">
          <h2 className="text-2xl font-bold">Email Configuration</h2>
          
          {/* SMTP Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                SMTP Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    placeholder="smtp.gmail.com"
                    value={emailSettings.smtp_host}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtp_host: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    placeholder="587"
                    value={emailSettings.smtp_port}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtp_port: parseInt(e.target.value) || 587 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    placeholder="your-email@gmail.com"
                    value={emailSettings.smtp_username}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtp_username: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    placeholder="Your app password"
                    value={emailSettings.smtp_password}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtp_password: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    placeholder="orders@artisandelights.com"
                    value={emailSettings.from_email}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, from_email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    placeholder="Artisan Delights"
                    value={emailSettings.from_name}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, from_name: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={saveEmailSettings} variant="artisan">
                  Save SMTP Settings
                </Button>
              </div>
              
              {/* Test Email Section */}
              <div className="border-t pt-6 mt-6">
                <h4 className="text-lg font-semibold mb-4">Test Email</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="testEmail">Test Email Address</Label>
                    <Input
                      id="testEmail"
                      type="email"
                      placeholder="test@example.com"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="testEmailType">Email Template</Label>
                    <Select value={testEmailType} onValueChange={setTestEmailType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="confirmation">Order Confirmation</SelectItem>
                        <SelectItem value="shipped">Order Shipped</SelectItem>
                        <SelectItem value="delivered">Order Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={sendTestEmail} variant="outline" className="w-full">
                      Send Test Email
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Send a test email to verify your SMTP configuration and email templates
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Email Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Email Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              {emailTemplates.length === 0 ? (
                <div className="text-center py-8">
                  <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No email templates found</p>
                  <p className="text-sm text-muted-foreground">Default templates will be loaded automatically</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {emailTemplates.map((template) => (
                    <div key={template.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold capitalize">{template.template_name.replace('_', ' ')}</h4>
                          <p className="text-sm text-muted-foreground">{template.subject}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit Template
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              const templateType = template.template_name === 'order_confirmation' ? 'confirmation' : 
                                                 template.template_name === 'order_shipped' ? 'shipped' : 'delivered';
                              setTestEmailType(templateType);
                              if (testEmail) {
                                sendTestEmail();
                              } else {
                                alert('Please enter a test email address first');
                              }
                            }}
                          >
                            Test Send
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        <p>Variables: {`{{customer_name}}, {{order_number}}, {{total_amount}}, {{order_items}}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
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