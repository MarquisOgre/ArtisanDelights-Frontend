import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { type Product } from '@/data/products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (error) throw error;

      // Transform database format to match Product interface
      const transformedProducts: Product[] = data.map(product => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        variants: Array.isArray(product.variants) ? product.variants as any[] : [],
        image: product.image || '',
        category: product.category,
        description: product.description || '',
        inStock: product.in_stock,
        featured: product.featured,
        ingredients: Array.isArray(product.ingredients) ? product.ingredients as string[] : [],
        benefits: Array.isArray(product.benefits) ? product.benefits as string[] : []
      }));

      setProducts(transformedProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getFeaturedProducts = () => products.filter(product => product.featured).slice(0, 8);
  
  const getProductsByCategory = (category: string) => 
    category === 'All' ? products : products.filter(product => product.category === category);

  const getBasePrice = (product: Product) => {
    if (!product.variants || product.variants.length === 0) return 0;
    return Math.min(...product.variants.map(v => v.price));
  };

  const getPriceRange = (product: Product) => {
    if (!product.variants || product.variants.length === 0) return '₹0';
    const prices = product.variants.map(v => v.price).sort((a, b) => a - b);
    const min = prices[0];
    const max = prices[prices.length - 1];
    return min === max ? `₹${min}` : `₹${min} - ₹${max}`;
  };

  const getProductBySlug = (slug: string) => {
    return products.find(p => p.slug === slug);
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    getFeaturedProducts,
    getProductsByCategory,
    getBasePrice,
    getPriceRange,
    getProductBySlug
  };
};