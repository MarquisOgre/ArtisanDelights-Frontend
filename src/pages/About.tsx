import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Link } from 'react-router-dom';
import { Award, Heart, Users, Clock } from 'lucide-react';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-brown/5 via-soft-beige/10 to-terracotta/5">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-terracotta via-warm-brown to-sage text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            About Artisan Delights
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 drop-shadow">
            Bringing you the authentic taste of South Indian traditional podis, 
            crafted with love and time-tested recipes passed down through generations
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-warm-brown mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground">
                From a small kitchen in South India to serving authentic flavors worldwide
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none text-center space-y-6">
              <p className="text-lg leading-relaxed">
                Artisan Delights was born from a passion for preserving the authentic flavors of traditional South Indian cuisine. 
                Our journey began in a small kitchen where our founder's grandmother shared her secret recipes for creating the perfect podis.
              </p>
              <p className="text-lg leading-relaxed">
                Today, we continue that legacy by sourcing the finest ingredients directly from farms across South India and 
                following the same traditional preparation methods that have been perfected over centuries.
              </p>
              <p className="text-lg leading-relaxed">
                Every podi we create is a celebration of South Indian culinary heritage, bringing you not just a product, 
                but a piece of our culture and tradition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-warm-brown mb-6">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide us in creating exceptional traditional podis
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-terracotta to-warm-brown rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-terracotta">Quality</h3>
                <p className="text-muted-foreground">
                  We source only the finest ingredients and maintain the highest quality standards in every batch
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-sage to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-sage">Authenticity</h3>
                <p className="text-muted-foreground">
                  Traditional recipes and preparation methods preserved through generations
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-warm-brown to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-warm-brown">Community</h3>
                <p className="text-muted-foreground">
                  Supporting local farmers and artisans while bringing families together through food
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-soft-beige to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-soft-beige">Tradition</h3>
                <p className="text-muted-foreground">
                  Time-honored techniques passed down through generations of South Indian cooks
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-terracotta via-warm-brown to-sage text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">
            Experience Authentic South Indian Flavors
          </h2>
          <p className="text-xl mb-8 opacity-90 drop-shadow">
            Discover our collection of traditional podis and bring the taste of South India to your kitchen
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="bg-white text-terracotta hover:bg-orange-50">
                Browse Products
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-terracotta">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer showTopButton />
    </div>
  );
};

export default About;