import React from 'react';
import { Link } from 'react-router-dom';
import { Palette } from 'lucide-react';

interface HeaderProps {
  logoUrl?: string;
  onLogoChange?: (url: string) => void;
}

const Header: React.FC<HeaderProps> = ({ logoUrl, onLogoChange }) => {
  const handleLogoClick = () => {
    if (onLogoChange) {
      const newLogoUrl = prompt('Enter new logo URL:');
      if (newLogoUrl) {
        onLogoChange(newLogoUrl);
        // Also update footer logo
        updateFooterLogo(newLogoUrl);
      }
    }
  };

  const updateFooterLogo = (logoUrl: string) => {
    const footerLogoContainer = document.getElementById('footer-logo-container');
    if (footerLogoContainer) {
      footerLogoContainer.innerHTML = `<img src="${logoUrl}" alt="Logo" class="h-8 w-8" />`;
    }
  };

  const handleFaviconClick = () => {
    const newFaviconUrl = prompt('Enter new favicon URL:');
    if (newFaviconUrl) {
      // Update favicon dynamically
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'icon';
      link.href = newFaviconUrl;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  };

  // Auto-trigger favicon change when logo is clicked (combined functionality)
  const handleLogoWithFaviconClick = () => {
    handleLogoClick();
    handleFaviconClick();
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Artisan Delights Logo" 
                className="h-8 w-8 cursor-pointer"
                onClick={handleLogoWithFaviconClick}
                onError={(e) => {
                  // Fallback to icon if custom logo fails
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : (
            <div title="Click to change logo and favicon">
              <Palette 
                className="h-8 w-8 text-terracotta cursor-pointer" 
                onClick={handleLogoWithFaviconClick}
              />
            </div>
            )}
            <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Artisan Delights
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link to="/products" className="text-muted-foreground hover:text-terracotta transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-terracotta transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-terracotta transition-colors">
              Contact
            </Link>
            <Link to="/order-form" className="text-muted-foreground hover:text-terracotta transition-colors">
              Checkout
            </Link>
            <Link to="/login" className="text-muted-foreground hover:text-terracotta transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;