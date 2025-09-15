-- Add order delivered template if it doesn't exist
INSERT INTO public.email_templates (template_name, subject, html_content, text_content) 
VALUES ('order_delivered', 'Your Order Has Been Delivered - {{order_number}}',
'<html><body><h1>Your order has been delivered!</h1><p>Dear {{customer_name}},</p><p>Great news! Your order <strong>{{order_number}}</strong> has been successfully delivered.</p><p><strong>Order Details:</strong></p><div>{{order_items}}</div><p><strong>Total: ₹{{total_amount}}</strong></p><p>We hope you enjoy your authentic artisan products! Please let us know if you have any feedback.</p><p>Thank you for choosing Artisan Delights!</p></body></html>',
'Your order has been delivered! Dear {{customer_name}}, Great news! Your order {{order_number}} has been successfully delivered. Total: ₹{{total_amount}}. We hope you enjoy your authentic artisan products! Thank you for choosing Artisan Delights!')
ON CONFLICT (template_name) DO NOTHING;