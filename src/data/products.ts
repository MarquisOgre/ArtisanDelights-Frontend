import heroPottery from '@/assets/hero-pottery.jpg';
import woodenCrafts from '@/assets/wooden-crafts.jpg';
import textiles from '@/assets/textiles.jpg';
import jewelry from '@/assets/jewelry.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  artisan: string;
  description: string;
  inStock: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Handcrafted Ceramic Bowl Set',
    price: 89.99,
    image: heroPottery,
    category: 'Pottery',
    artisan: 'Maria Rodriguez',
    description: 'Beautiful set of 4 ceramic bowls with terracotta and sage glazes, perfect for serving or display.',
    inStock: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Artisan Wooden Cutting Board',
    price: 45.00,
    image: woodenCrafts,
    category: 'Woodwork',
    artisan: 'James Carter',
    description: 'Premium walnut cutting board with natural edge, hand-finished with food-safe oil.',
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Hand-Woven Wool Scarf',
    price: 68.50,
    image: textiles,
    category: 'Textiles',
    artisan: 'Elena Vasquez',
    description: 'Luxurious merino wool scarf in earthy tones, hand-woven on traditional looms.',
    inStock: true,
    featured: true,
  },
  {
    id: '4',
    name: 'Glass Bead Necklace',
    price: 34.99,
    image: jewelry,
    category: 'Jewelry',
    artisan: 'Sarah Chen',
    description: 'Elegant necklace featuring hand-blown glass beads in vibrant colors.',
    inStock: true,
  },
  {
    id: '5',
    name: 'Ceramic Coffee Mug',
    price: 24.99,
    image: heroPottery,
    category: 'Pottery',
    artisan: 'Maria Rodriguez',
    description: 'Handthrown ceramic mug with unique glaze pattern, perfect for your morning coffee.',
    inStock: true,
  },
  {
    id: '6',
    name: 'Wooden Spoon Set',
    price: 28.00,
    image: woodenCrafts,
    category: 'Woodwork',
    artisan: 'James Carter',
    description: 'Set of 3 hand-carved wooden spoons made from sustainable maple wood.',
    inStock: false,
  },
  {
    id: '7',
    name: 'Woven Throw Blanket',
    price: 125.00,
    image: textiles,
    category: 'Textiles',
    artisan: 'Elena Vasquez',
    description: 'Cozy wool throw blanket with geometric patterns in natural colors.',
    inStock: true,
  },
  {
    id: '8',
    name: 'Sterling Silver Earrings',
    price: 42.00,
    image: jewelry,
    category: 'Jewelry',
    artisan: 'Sarah Chen',
    description: 'Delicate sterling silver earrings with hand-formed wire details.',
    inStock: true,
  },
];

export const categories = ['All', 'Pottery', 'Woodwork', 'Textiles', 'Jewelry'];

export const getFeaturedProducts = () => products.filter(product => product.featured);
export const getProductsByCategory = (category: string) => 
  category === 'All' ? products : products.filter(product => product.category === category);