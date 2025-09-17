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