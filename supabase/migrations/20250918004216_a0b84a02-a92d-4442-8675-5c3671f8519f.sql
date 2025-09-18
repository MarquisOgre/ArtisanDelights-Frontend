-- Fix the search path for the send_order_confirmation function
CREATE OR REPLACE FUNCTION public.send_order_confirmation()
RETURNS trigger AS $$
BEGIN
  -- Call the edge function to send confirmation email
  PERFORM
    net.http_post(
      url:='https://ajtdmenflndkxhvvuwak.supabase.co/functions/v1/send-order-confirmation',
      headers:='{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.settings.service_role_key', true) || '"}'::jsonb,
      body:=jsonb_build_object(
        'orderId', NEW.id,
        'orderNumber', NEW.order_number,
        'customerName', NEW.customer_name,
        'customerEmail', NEW.customer_email,
        'shippingAddress', NEW.shipping_address,
        'orderItems', NEW.order_items,
        'totalAmount', NEW.total_amount
      )
    );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;