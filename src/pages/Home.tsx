import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/enhanced-button';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/data/products';
import { ArrowRight, Palette, Heart, Users } from 'lucide-react';
import heroPottery from '@/assets/hero-pottery.jpg';

const Home = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroPottery})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center lg:text-left">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Discover
              </span>
              <br />
              Artisan Treasures
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-muted-foreground max-w-2xl">
              Handcrafted with love by skilled artisans. Each piece tells a story of 
              tradition, creativity, and exceptional craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/products">
                <Button variant="hero" size="xl">
                  Shop Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="xl">
                  Meet Our Artisans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Artisan Delights</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We connect you with the world's most talented artisans
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg bg-card shadow-card">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Handcrafted Quality</h3>
              <p className="text-muted-foreground">
                Every piece is carefully handmade using traditional techniques passed down through generations.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-lg bg-card shadow-card">
              <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Made with Love</h3>
              <p className="text-muted-foreground">
                Each artisan pours their passion and expertise into creating unique, meaningful pieces.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-lg bg-card shadow-card">
              <div className="w-16 h-16 bg-terracotta rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Supporting Communities</h3>
              <p className="text-muted-foreground">
                Your purchase directly supports artisan communities and helps preserve traditional crafts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Collection</h2>
            <p className="text-xl text-muted-foreground">
              Discover our most beloved handcrafted pieces
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/products">
              <Button variant="artisan" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;