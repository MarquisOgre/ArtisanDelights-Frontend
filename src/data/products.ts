import podiCollection from '@/assets/podi-collection.jpg';
import gunpowderPodi from '@/assets/gunpowder-podi.jpg';
import peanutPodi from '@/assets/peanut-podi.jpg';
import sesamePodiImg from '@/assets/sesame-podi.jpg';
import drumstickPodi from '@/assets/drumstick-podi.jpg';
import curryLeafPodi from '@/assets/curry-leaf-podi.jpg';
import corianderPodi from '@/assets/coriander-podi.jpg';
import garlicPodi from '@/assets/garlic-podi.jpg';

export interface ProductVariant {
  id: string;
  size: string;
  weight: string;
  price: number;
  originalPrice?: number;
}

export interface Product {
  id: string;
  name: string;
  variants: ProductVariant[];
  image: string;
  category: string;
  description: string;
  inStock: boolean;
  featured?: boolean;
  ingredients?: string[];
  benefits?: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Idly Podi',
    variants: [
      { id: '1-trial', size: 'Trial Pack', weight: '50g', price: 45, originalPrice: 55 },
      { id: '1-250', size: '250g', weight: '250g', price: 120, originalPrice: 140 },
      { id: '1-500', size: '500g', weight: '500g', price: 220, originalPrice: 260 },
      { id: '1-1kg', size: '1kg', weight: '1kg', price: 400, originalPrice: 480 }
    ],
    image: podiCollection,
    category: 'Traditional Podis',
    description: 'Classic South Indian spice blend perfect with idly, dosa, and rice. Made with roasted lentils, sesame seeds, and aromatic spices.',
    inStock: true,
    featured: true,
    ingredients: ['Urad Dal', 'Chana Dal', 'Sesame Seeds', 'Red Chili', 'Hing', 'Salt'],
    benefits: ['Rich in Protein', 'High in Fiber', 'No Artificial Colors']
  },
  {
    id: '2',
    name: 'Palli Podi (Peanut Powder)',
    variants: [
      { id: '2-trial', size: 'Trial Pack', weight: '50g', price: 50, originalPrice: 60 },
      { id: '2-250', size: '250g', weight: '250g', price: 135, originalPrice: 155 },
      { id: '2-500', size: '500g', weight: '500g', price: 250, originalPrice: 290 },
      { id: '2-1kg', size: '1kg', weight: '1kg', price: 450, originalPrice: 520 }
    ],
    image: peanutPodi,
    category: 'Traditional Podis',
    description: 'Nutritious peanut-based powder with roasted spices. Perfect protein-rich accompaniment for any South Indian meal.',
    inStock: true,
    featured: true,
    ingredients: ['Roasted Peanuts', 'Red Chili', 'Garlic', 'Curry Leaves', 'Tamarind', 'Salt'],
    benefits: ['High Protein', 'Rich in Healthy Fats', 'Natural Energy Booster']
  },
  {
    id: '3',
    name: 'Sambar Powder',
    variants: [
      { id: '3-trial', size: 'Trial Pack', weight: '50g', price: 55, originalPrice: 65 },
      { id: '3-250', size: '250g', weight: '250g', price: 140, originalPrice: 165 },
      { id: '3-500', size: '500g', weight: '500g', price: 260, originalPrice: 310 },
      { id: '3-1kg', size: '1kg', weight: '1kg', price: 480, originalPrice: 560 }
    ],
    image: corianderPodi,
    category: 'Traditional Podis',
    description: 'Authentic sambar masala blend with perfect balance of spices. Essential for making traditional South Indian sambar.',
    inStock: true,
    featured: true,
    ingredients: ['Coriander Seeds', 'Red Chili', 'Turmeric', 'Fenugreek', 'Curry Leaves', 'Hing'],
    benefits: ['Digestive Properties', 'Anti-inflammatory', 'Rich in Antioxidants']
  },
  {
    id: '4',
    name: 'Rasam Powder',
    variants: [
      { id: '4-trial', size: 'Trial Pack', weight: '50g', price: 55, originalPrice: 65 },
      { id: '4-250', size: '250g', weight: '250g', price: 140, originalPrice: 165 },
      { id: '4-500', size: '500g', weight: '500g', price: 260, originalPrice: 310 },
      { id: '4-1kg', size: '1kg', weight: '1kg', price: 480, originalPrice: 560 }
    ],
    image: sesamePodiImg,
    category: 'Traditional Podis',
    description: 'Tangy and spicy rasam powder for the perfect South Indian soup. Made with traditional spices for authentic taste.',
    inStock: true,
    ingredients: ['Coriander Seeds', 'Cumin Seeds', 'Black Pepper', 'Red Chili', 'Turmeric', 'Hing'],
    benefits: ['Digestive Aid', 'Immunity Booster', 'Cold & Cough Relief']
  },
  {
    id: '5',
    name: 'Curry Leaves Podi',
    variants: [
      { id: '5-trial', size: 'Trial Pack', weight: '50g', price: 60, originalPrice: 70 },
      { id: '5-250', size: '250g', weight: '250g', price: 150, originalPrice: 175 },
      { id: '5-500', size: '500g', weight: '500g', price: 280, originalPrice: 330 },
      { id: '5-1kg', size: '1kg', weight: '1kg', price: 520, originalPrice: 600 }
    ],
    image: curryLeafPodi,
    category: 'Traditional Podis',
    description: 'Aromatic curry leaves powder packed with flavor and health benefits. A unique blend that enhances any dish.',
    inStock: true,
    featured: true,
    ingredients: ['Fresh Curry Leaves', 'Urad Dal', 'Chana Dal', 'Red Chili', 'Hing', 'Salt'],
    benefits: ['Hair Growth', 'Blood Sugar Control', 'Rich in Iron']
  },
  {
    id: '6',
    name: 'Gunpowder Idly Podi',
    variants: [
      { id: '6-trial', size: 'Trial Pack', weight: '50g', price: 50, originalPrice: 60 },
      { id: '6-250', size: '250g', weight: '250g', price: 130, originalPrice: 150 },
      { id: '6-500', size: '500g', weight: '500g', price: 240, originalPrice: 280 },
      { id: '6-1kg', size: '1kg', weight: '1kg', price: 440, originalPrice: 510 }
    ],
    image: gunpowderPodi,
    category: 'Traditional Podis',
    description: 'Spicy and flavorful gunpowder podi with extra kick. Perfect for those who love intense flavors with their breakfast.',
    inStock: true,
    ingredients: ['Urad Dal', 'Red Chili', 'Sesame Seeds', 'Hing', 'Curry Leaves', 'Salt'],
    benefits: ['High Energy', 'Metabolism Booster', 'Rich in Proteins']
  },
  {
    id: '7',
    name: 'Coconut Chutney Podi',
    variants: [
      { id: '7-trial', size: 'Trial Pack', weight: '50g', price: 65, originalPrice: 75 },
      { id: '7-250', size: '250g', weight: '250g', price: 160, originalPrice: 185 },
      { id: '7-500', size: '500g', weight: '500g', price: 300, originalPrice: 350 },
      { id: '7-1kg', size: '1kg', weight: '1kg', price: 560, originalPrice: 650 }
    ],
    image: drumstickPodi,
    category: 'Traditional Podis',
    description: 'Instant coconut chutney powder - just add water! Made with fresh coconut and traditional spices for authentic taste.',
    inStock: true,
    ingredients: ['Dried Coconut', 'Roasted Gram', 'Green Chili', 'Ginger', 'Curry Leaves', 'Salt'],
    benefits: ['Healthy Fats', 'Quick Preparation', 'Natural Preservative Free']
  },
  {
    id: '8',
    name: 'Bisi Bele Bath Powder',
    variants: [
      { id: '8-trial', size: 'Trial Pack', weight: '50g', price: 60, originalPrice: 70 },
      { id: '8-250', size: '250g', weight: '250g', price: 155, originalPrice: 180 },
      { id: '8-500', size: '500g', weight: '500g', price: 290, originalPrice: 340 },
      { id: '8-1kg', size: '1kg', weight: '1kg', price: 540, originalPrice: 620 }
    ],
    image: garlicPodi,
    category: 'Traditional Podis',
    description: 'Special spice blend for Karnataka\'s famous Bisi Bele Bath. Complex flavor profile with aromatic spices and lentils.',
    inStock: true,
    featured: true,
    ingredients: ['Coriander Seeds', 'Chana Dal', 'Cinnamon', 'Cloves', 'Red Chili', 'Turmeric'],
    benefits: ['Complete Meal Enhancer', 'Digestive Spices', 'Traditional Recipe']
  }
];

export const categories = ['All', 'Traditional Podis'];

export const getFeaturedProducts = () => products.filter(product => product.featured);
export const getProductsByCategory = (category: string) => 
  category === 'All' ? products : products.filter(product => product.category === category);

// Get base price for a product (smallest variant)
export const getBasePrice = (product: Product) => {
  return Math.min(...product.variants.map(v => v.price));
};

// Get variant by ID
export const getVariantById = (productId: string, variantId: string) => {
  const product = products.find(p => p.id === productId);
  return product?.variants.find(v => v.id === variantId);
};