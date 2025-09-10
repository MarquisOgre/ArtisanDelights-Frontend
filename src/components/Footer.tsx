import { Link } from 'react-router-dom';

interface FooterProps {
  showTopButton?: boolean;
}

const Footer = ({ showTopButton }: FooterProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Artisan Delights</h3>
            <p className="text-muted-foreground">
              Authentic South Indian flavors delivered to your doorstep
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-foreground">Home</Link>
              <Link to="/products" className="block text-muted-foreground hover:text-foreground">Products</Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-foreground">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-2">
              <Link to="/help" className="block text-muted-foreground hover:text-foreground">Help Center</Link>
              <Link to="/terms" className="block text-muted-foreground hover:text-foreground">Terms</Link>
              <Link to="/privacy" className="block text-muted-foreground hover:text-foreground">Privacy</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-muted-foreground">Email: info@artisandelights.com</p>
            <p className="text-muted-foreground">Phone: +91 98765 43210</p>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Artisan Delights. All rights reserved.</p>
        </div>
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