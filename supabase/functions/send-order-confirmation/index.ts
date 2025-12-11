import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  size: string;
}

interface OrderConfirmationRequest {
  order: {
    order_number: string;
    customer_name: string;
    customer_email: string;
    total_amount: number;
    order_items: OrderItem[] | string;
  };
}

interface EmailSettings {
  smtp_host: string;
  smtp_port: number;
  smtp_username: string;
  smtp_password: string;
  smtp_secure: boolean;
  from_email: string;
  from_name: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { order }: OrderConfirmationRequest = await req.json();
    
    console.log("Received order data:", JSON.stringify(order, null, 2));

    // Get SMTP settings from database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: settings, error: settingsError } = await supabase
      .from('email_settings')
      .select('*')
      .single();

    if (settingsError || !settings) {
      console.error("Error fetching email settings:", settingsError);
      throw new Error("Email settings not configured");
    }

    const emailSettings: EmailSettings = settings;
    console.log("Using email settings:", {
      host: emailSettings.smtp_host,
      port: emailSettings.smtp_port,
      username: emailSettings.smtp_username,
      from: emailSettings.from_email
    });

    // Parse order_items if it's a string (from database JSON)
    let orderItems: OrderItem[] = [];
    if (typeof order.order_items === 'string') {
      orderItems = JSON.parse(order.order_items);
    } else if (Array.isArray(order.order_items)) {
      orderItems = order.order_items;
    }

    // Generate order items HTML
    const orderItemsHtml = orderItems.map(item => 
      `<tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name} (${item.size})</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`
    ).join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #8B4513, #D2691E); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Your Order!</h1>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="font-size: 18px; margin-bottom: 20px;">Dear ${order.customer_name},</p>
          
          <p>We're excited to confirm that we've received your order <strong>${order.order_number}</strong> and it's being processed with care.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #8B4513; margin-top: 0;">Order Details</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
              <thead>
                <tr style="background: #e9ecef;">
                  <th style="padding: 10px; text-align: left; border-bottom: 2px solid #8B4513;">Product</th>
                  <th style="padding: 10px; text-align: center; border-bottom: 2px solid #8B4513;">Qty</th>
                  <th style="padding: 10px; text-align: right; border-bottom: 2px solid #8B4513;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${orderItemsHtml}
              </tbody>
            </table>
            
            <div style="text-align: right; margin-top: 15px; padding-top: 15px; border-top: 2px solid #8B4513;">
              <strong style="font-size: 18px; color: #8B4513;">Total: ₹${order.total_amount.toFixed(2)}</strong>
            </div>
          </div>
          
          <div style="background: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0;">
            <h3 style="color: #155724; margin-top: 0;">What happens next?</h3>
            <ul style="color: #155724; margin: 0;">
              <li>Your order is being prepared with love and care</li>
              <li>You'll receive a shipping confirmation email once dispatched</li>
              <li>Expected delivery: 5-7 business days</li>
            </ul>
          </div>
          
          <p>If you have any questions about your order, please don't hesitate to contact us.</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; margin: 0;">Thank you for choosing Artisan Delights!</p>
            <p style="color: #8B4513; font-weight: bold; margin: 5px 0 0 0;">Bringing authentic flavors to your kitchen</p>
          </div>
        </div>
      </body>
      </html>
    `;

    console.log("Attempting to send confirmation email via Brevo API to:", order.customer_email);

    // Use Brevo HTTP API with dedicated API key
    const brevoApiKey = Deno.env.get("BREVO_API_KEY");
    if (!brevoApiKey) {
      throw new Error("BREVO_API_KEY not configured");
    }

    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: emailSettings.from_name,
          email: emailSettings.from_email,
        },
        to: [{ email: order.customer_email }],
        subject: `Order Confirmation - ${order.order_number}`,
        htmlContent: html,
      }),
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.text();
      console.error("Brevo API error:", errorData);
      throw new Error(`Brevo API error: ${errorData}`);
    }

    const responseData = await brevoResponse.json();
    console.log("Order confirmation email sent successfully via Brevo API:", responseData);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);