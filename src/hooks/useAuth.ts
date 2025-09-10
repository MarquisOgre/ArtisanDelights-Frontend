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
    // Simulate auth check
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin'
    };
    
    setTimeout(() => {
      setUser(mockUser);
      setIsLoading(false);
    }, 100);
  }, []);

  const isAdmin = user?.role === 'admin';

  return {
    user,
    isAdmin,
    isLoading,
    signIn: () => {},
    signOut: () => {}
  };
};