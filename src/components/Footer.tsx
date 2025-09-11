import { Link } from 'react-router-dom';

interface FooterProps {
  showTopButton?: boolean;
}

const Footer = ({ showTopButton }: FooterProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-muted border-t">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo + brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div id="footer-logo-container" className="flex items-center">
                <img
                  src="/logo.png"
                  alt="Artisan Delights Logo"
                  className="h-12 w-12"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <h3 className="font-bold text-lg">Artisan Delights</h3>
            </div>
            <p className="text-muted-foreground">
              Authentic South Indian flavors delivered to your doorstep
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link
                to="/"
                className="block text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                to="/contact"
                className="block text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-2">
              <Link
                to="/help"
                className="block text-muted-foreground hover:text-foreground"
              >
                Help Center
              </Link>
              <Link
                to="/terms"
                className="block text-muted-foreground hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                to="/privacy"
                className="block text-muted-foreground hover:text-foreground"
              >
                Privacy
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-muted-foreground">
              Email: info@artisandelights.com
            </p>
            <p className="text-muted-foreground">Phone: +91 8500 60 6000</p>
          </div>
        </div>
      </div>

      {/* Full-width gradient bar */}
      <div className="w-full bg-gradient-to-r from-terracotta via-warm-brown to-sage p-4 text-center">
        <p className="text-white font-medium">
          &copy; 2024 Artisan Delights. All rights reserved.
        </p>
      </div>

      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          ↑
        </button>
      )}
    </footer>
  );
};

export default Footer;
