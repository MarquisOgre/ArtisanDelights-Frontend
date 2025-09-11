import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/enhanced-button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Header from './Header';

const Navigation = () => {
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

  return (
    <>
      <Header />
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
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
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
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
      </nav>
    </>
  );
};

export default Navigation;