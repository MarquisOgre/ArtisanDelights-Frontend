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
      }
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
                onClick={handleLogoClick}
                onError={(e) => {
                  // Fallback to icon if custom logo fails
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : (
            <div title="Click to change logo">
              <Palette 
                className="h-8 w-8 text-terracotta cursor-pointer" 
                onClick={handleLogoClick}
              />
            </div>
            )}
            <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Artisan Delights
            </span>
          </Link>

          {/* Favicon Change Button */}
          <button
            onClick={handleFaviconClick}
            className="text-sm text-muted-foreground hover:text-terracotta transition-colors"
            title="Click to change favicon"
          >
            Change Favicon
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;