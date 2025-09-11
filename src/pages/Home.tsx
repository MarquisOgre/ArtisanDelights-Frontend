import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/enhanced-button';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/data/products';
import { ArrowRight, Award, Heart, Truck, Leaf, ShoppingCart, Star } from 'lucide-react';
import heroImage from '@/assets/podi-collection.jpg';
import Footer from '@/components/Footer';

const Home = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-brown/5 via-soft-beige/10 to-terracotta/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-terracotta via-warm-brown to-sage" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
                    Authentic
                    <span className="block text-yellow-200">Traditional</span>
                    <span className="block text-orange-200">Podis</span>
                  </h1>
                  <p className="text-xl text-orange-100 max-w-lg drop-shadow">
                    Artisan Delights brings you premium South Indian spice blends crafted with authentic flavors and time-tested recipes
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <Link to="/order-form">
                    <Button size="xl" className="text-lg px-8 py-6 bg-white text-terracotta hover:bg-orange-50 shadow-xl hover:shadow-2xl transition-all duration-300">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Order Now
                    </Button>
                  </Link>
                  <Link to="/products">
                    <Button variant="outline" size="xl" className="text-lg px-8 py-6 text-white border-white bg-terracotta/80 hover:bg-terracotta hover:text-white shadow-lg backdrop-blur-sm font-semibold">
                      Explore Products
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Traditional South Indian Spices and Podis" 
                  className="rounded-3xl shadow-2xl w-full h-[500px] object-cover ring-4 ring-white/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-3 text-lg font-bold drop-shadow">Premium Quality</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-soft-beige/20 to-warm-brown/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-terracotta mb-6">Why Choose Artisan Delights Traditional Podis?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We bring you the authentic taste of South India with our carefully crafted spice blends
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-lg bg-card shadow-card hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-terracotta rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-terracotta">Premium Quality</h3>
              <p className="text-muted-foreground">
                Sourced from the finest ingredients across South India using traditional methods
              </p>
            </div>
            
            <div className="text-center p-8 rounded-lg bg-card shadow-card hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-warm-brown rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-warm-brown">Authentic Recipes</h3>
              <p className="text-muted-foreground">
                Traditional recipes passed down through generations of South Indian families
              </p>
            </div>
            
            <div className="text-center p-8 rounded-lg bg-card shadow-card hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-sage rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-sage">Fresh Delivery</h3>
              <p className="text-muted-foreground">
                Made fresh to order and delivered to your doorstep with premium packaging
              </p>
            </div>
            
            <div className="text-center p-8 rounded-lg bg-card shadow-card hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-green-700">Pure & Natural</h3>
              <p className="text-muted-foreground">
                No artificial preservatives, colors, or additives - only pure ingredients
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-terracotta/5 via-warm-brown/5 to-sage/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-warm-brown mb-6">Our Premium Podi Collection</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our range of authentic South Indian spice powders, each with multiple size options
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/products">
              <Button variant="artisan" size="lg" className="mr-4">
                View All Products
              </Button>
            </Link>
            <Link to="/order-form">
              <Button size="lg" className="bg-terracotta hover:bg-warm-brown text-white">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Start Your Order
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-terracotta via-warm-brown to-sage text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            Ready to Experience Authentic South Indian Flavors?
          </h2>
          <p className="text-xl mb-8 opacity-90 drop-shadow">
            Order your favorite traditional podis today and taste the difference
          </p>
          <Link to="/order-form">
            <Button size="xl" className="text-lg px-8 py-6 bg-white text-terracotta hover:bg-orange-50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Place Your Order Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer showTopButton />
    </div>
  );
};

export default Home;