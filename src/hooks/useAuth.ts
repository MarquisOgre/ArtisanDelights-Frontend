import { useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);

    // Listen for auth state changes
    const handleAuthStateChange = () => {
      const updatedUser = localStorage.getItem('user');
      if (updatedUser) {
        try {
          setUser(JSON.parse(updatedUser));
        } catch (error) {
          localStorage.removeItem('user');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener('authStateChanged', handleAuthStateChange);
    window.addEventListener('storage', handleAuthStateChange);

    return () => {
      window.removeEventListener('authStateChanged', handleAuthStateChange);
      window.removeEventListener('storage', handleAuthStateChange);
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Hardcoded credentials
    const credentials = {
      'admin@gmail.com': { password: '123456', role: 'admin' as const, name: 'Admin User' },
      'user@gmail.com': { password: '123456', role: 'user' as const, name: 'Regular User' }
    };

    const userCred = credentials[email as keyof typeof credentials];
    
    if (userCred && userCred.password === password) {
      const authUser: User = {
        id: email === 'admin@gmail.com' ? '1' : '2',
        name: userCred.name,
        email,
        role: userCred.role
      };
      
      setUser(authUser);
      localStorage.setItem('user', JSON.stringify(authUser));
      // Trigger a custom event to notify other components
      window.dispatchEvent(new CustomEvent('authStateChanged'));
      return true;
    }
    
    return false;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('authStateChanged'));
  };

  const isAdmin = user?.role === 'admin';

  return {
    user,
    isAdmin,
    isLoading,
    signIn,
    signOut
  };
};