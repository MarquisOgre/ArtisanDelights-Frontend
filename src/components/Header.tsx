import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Palette, Menu, ShoppingCart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  logoUrl?: string;
  onLogoChange?: (url: string) => void;
}

const Header: React.FC<HeaderProps> = ({ logoUrl, onLogoChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-terracotta ${
                  isActive(item.href) ? 'text-terracotta' : 'text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/order-form" className="text-sm font-medium text-muted-foreground hover:text-terracotta transition-colors">
              Checkout
            </Link>
            
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            
            {user ? (
              <>
                <Link to="/user-dashboard">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                {isAdmin && (
                  <Link to="/admin-dashboard">
                    <Button variant="artisan" size="sm">
                      Admin
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="icon" onClick={signOut}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="artisan" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-terracotta ${
                      isActive(item.href) ? 'text-terracotta' : 'text-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link to="/order-form" onClick={() => setIsOpen(false)} className="text-lg font-medium text-muted-foreground hover:text-terracotta transition-colors">
                  Checkout
                </Link>
                <div className="pt-4 space-y-2">
                  {user ? (
                    <>
                      <Link to="/user-dashboard" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full">
                          User Dashboard
                        </Button>
                      </Link>
                      {isAdmin && (
                        <Link to="/admin-dashboard" onClick={() => setIsOpen(false)}>
                          <Button variant="artisan" className="w-full">
                            Admin Dashboard
                          </Button>
                        </Link>
                      )}
                      <Button variant="ghost" className="w-full" onClick={() => { signOut(); setIsOpen(false); }}>
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="artisan" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;