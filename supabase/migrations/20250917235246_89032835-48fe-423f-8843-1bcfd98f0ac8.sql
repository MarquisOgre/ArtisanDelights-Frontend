-- Create products table for persistent storage
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  brand TEXT NOT NULL DEFAULT 'ARTISAN DELIGHTS',
  description TEXT,
  image TEXT,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  ingredients JSONB,
  benefits JSONB,
  variants JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies for product management
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Products can be inserted by everyone" 
ON public.products 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Products can be updated by everyone" 
ON public.products 
FOR UPDATE 
USING (true);

CREATE POLICY "Products can be deleted by everyone" 
ON public.products 
FOR DELETE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create UPI settings table
CREATE TABLE public.upi_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  qr_code_url TEXT NOT NULL,
  upi_id TEXT,
  merchant_name TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security for UPI settings
ALTER TABLE public.upi_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for UPI settings
CREATE POLICY "UPI settings are viewable by everyone" 
ON public.upi_settings 
FOR SELECT 
USING (true);

CREATE POLICY "UPI settings can be inserted by everyone" 
ON public.upi_settings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "UPI settings can be updated by everyone" 
ON public.upi_settings 
FOR UPDATE 
USING (true);

-- Create trigger for UPI settings timestamps
CREATE TRIGGER update_upi_settings_updated_at
BEFORE UPDATE ON public.upi_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default UPI settings
INSERT INTO public.upi_settings (qr_code_url, merchant_name) VALUES ('/UPI-QRcode.png', 'Artisan Delights');

-- Seed products table with existing data
INSERT INTO public.products (id, name, slug, category, description, image, in_stock, featured, ingredients, benefits, variants) VALUES 
('1', 'Idly Podi', 'idly-podi', 'Traditional Podis', 'Classic South Indian spice blend perfect with idly, dosa, and rice. Made with roasted lentils, sesame seeds, and aromatic spices.', '/src/assets/podi-collection.jpg', true, true, '["Urad Dal", "Chana Dal", "Sesame Seeds", "Red Chili", "Hing", "Salt"]', '["Rich in Protein", "High in Fiber", "No Artificial Colors"]', '[
  {"id": "1-trial", "size": "Trial Pack", "weight": "50g", "price": 45, "originalPrice": 55},
  {"id": "1-250", "size": "250g", "weight": "250g", "price": 120, "originalPrice": 140},
  {"id": "1-500", "size": "500g", "weight": "500g", "price": 220, "originalPrice": 260},
  {"id": "1-1kg", "size": "1kg", "weight": "1kg", "price": 400, "originalPrice": 480}
]'),
('2', 'Palli Podi (Peanut Powder)', 'palli-podi-peanut-powder', 'Traditional Podis', 'Nutritious peanut-based powder with roasted spices. Perfect protein-rich accompaniment for any South Indian meal.', '/src/assets/peanut-podi.jpg', true, true, '["Roasted Peanuts", "Red Chili", "Garlic", "Curry Leaves", "Tamarind", "Salt"]', '["High Protein", "Rich in Healthy Fats", "Natural Energy Booster"]', '[
  {"id": "2-trial", "size": "Trial Pack", "weight": "50g", "price": 50, "originalPrice": 60},
  {"id": "2-250", "size": "250g", "weight": "250g", "price": 135, "originalPrice": 155},
  {"id": "2-500", "size": "500g", "weight": "500g", "price": 250, "originalPrice": 290},
  {"id": "2-1kg", "size": "1kg", "weight": "1kg", "price": 450, "originalPrice": 520}
]');