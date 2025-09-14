-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number VARCHAR(50) NOT NULL UNIQUE DEFAULT 'ORD-' || EXTRACT(EPOCH FROM NOW())::bigint::text,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  shipping_address JSONB NOT NULL,
  order_items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping_cost DECIMAL(10, 2) NOT NULL DEFAULT 0,
  tax_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL DEFAULT 'UPI',
  payment_reference VARCHAR(255),
  payment_status VARCHAR(50) NOT NULL DEFAULT 'pending',
  order_status VARCHAR(50) NOT NULL DEFAULT 'processing',
  shipping_method VARCHAR(100),
  order_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create email_settings table for SMTP configuration
CREATE TABLE public.email_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  smtp_host VARCHAR(255) NOT NULL,
  smtp_port INTEGER NOT NULL DEFAULT 587,
  smtp_secure BOOLEAN NOT NULL DEFAULT true,
  smtp_username VARCHAR(255) NOT NULL,
  smtp_password VARCHAR(255) NOT NULL,
  from_email VARCHAR(255) NOT NULL,
  from_name VARCHAR(255) NOT NULL DEFAULT 'Artisan Delights',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create email_templates table
CREATE TABLE public.email_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_name VARCHAR(100) NOT NULL UNIQUE,
  subject VARCHAR(255) NOT NULL,
  html_content TEXT NOT NULL,
  text_content TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- Create policies for orders (accessible to everyone for now - can be restricted later)
CREATE POLICY "Orders are viewable by everyone" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Orders can be inserted by everyone" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Orders can be updated by everyone" ON public.orders FOR UPDATE USING (true);

-- Create policies for email settings (accessible to everyone for admin functionality)
CREATE POLICY "Email settings are viewable by everyone" ON public.email_settings FOR SELECT USING (true);
CREATE POLICY "Email settings can be inserted by everyone" ON public.email_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Email settings can be updated by everyone" ON public.email_settings FOR UPDATE USING (true);

-- Create policies for email templates (accessible to everyone for admin functionality)
CREATE POLICY "Email templates are viewable by everyone" ON public.email_templates FOR SELECT USING (true);
CREATE POLICY "Email templates can be inserted by everyone" ON public.email_templates FOR INSERT WITH CHECK (true);
CREATE POLICY "Email templates can be updated by everyone" ON public.email_templates FOR UPDATE USING (true);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at columns
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_email_settings_updated_at
    BEFORE UPDATE ON public.email_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_email_templates_updated_at
    BEFORE UPDATE ON public.email_templates
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default email templates
INSERT INTO public.email_templates (template_name, subject, html_content, text_content) VALUES
('order_confirmation', 'Order Confirmation - {{order_number}}', 
'<html><body><h1>Thank you for your order!</h1><p>Dear {{customer_name}},</p><p>We have received your order <strong>{{order_number}}</strong> and it is being processed.</p><p><strong>Order Details:</strong></p><div>{{order_items}}</div><p><strong>Total: ₹{{total_amount}}</strong></p><p>You will receive a shipping confirmation email once your order has been dispatched.</p><p>Thank you for choosing Artisan Delights!</p></body></html>',
'Thank you for your order! Dear {{customer_name}}, We have received your order {{order_number}} and it is being processed. Total: ₹{{total_amount}}. You will receive a shipping confirmation email once your order has been dispatched. Thank you for choosing Artisan Delights!'),

('order_shipped', 'Your Order Has Been Shipped - {{order_number}}',
'<html><body><h1>Your order is on its way!</h1><p>Dear {{customer_name}},</p><p>Great news! Your order <strong>{{order_number}}</strong> has been shipped and is on its way to you.</p><p><strong>Tracking Information:</strong></p><p>{{tracking_info}}</p><p>Expected delivery: {{expected_delivery}}</p><p>Thank you for choosing Artisan Delights!</p></body></html>',
'Your order is on its way! Dear {{customer_name}}, Great news! Your order {{order_number}} has been shipped and is on its way to you. Expected delivery: {{expected_delivery}}. Thank you for choosing Artisan Delights!');