import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface TestEmailRequest {
  email: string;
  template_type: 'confirmation' | 'shipped' | 'delivered';
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, template_type }: TestEmailRequest = await req.json();

    // Sample order data for testing
    const sampleOrder = {
      order_number: "TEST-" + Date.now(),
      customer_name: "Test Customer",
      customer_email: email,
      total_amount: 450.00,
      order_items: [
        { name: "Idly Podi", quantity: 2, price: 150, size: "250g" },
        { name: "Sambar Powder", quantity: 1, price: 150, size: "250g" }
      ]
    };

    const orderItemsHtml = sampleOrder.order_items.map(item => 
      `<tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name} (${item.size})</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`
    ).join('');

    let subject = "";
    let html = "";
    let bgGradient = "";
    let headerText = "";
    let bodyContent = "";

    switch (template_type) {
      case 'confirmation':
        subject = `[TEST] Order Confirmation - ${sampleOrder.order_number}`;
        bgGradient = "linear-gradient(135deg, #8B4513, #D2691E)";
        headerText = "Thank You for Your Order!";
        bodyContent = `
          <p>We're excited to confirm that we've received your order <strong>${sampleOrder.order_number}</strong> and it's being processed with care.</p>
          
          <div style="background: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0;">
            <h3 style="color: #155724; margin-top: 0;">What happens next?</h3>
            <ul style="color: #155724; margin: 0;">
              <li>Your order is being prepared with love and care</li>
              <li>You'll receive a shipping confirmation email once dispatched</li>
              <li>Expected delivery: 5-7 business days</li>
            </ul>
          </div>
        `;
        break;
        
      case 'shipped':
        subject = `[TEST] Your Order Has Been Shipped - ${sampleOrder.order_number}`;
        bgGradient = "linear-gradient(135deg, #4CAF50, #45a049)";
        headerText = "🚚 Your Order is on its Way!";
        bodyContent = `
          <p>Great news! Your order <strong>${sampleOrder.order_number}</strong> has been shipped and is on its way to you.</p>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4CAF50;">
            <h3 style="color: #2e7d32; margin-top: 0;">📦 Shipping Information</h3>
            <p style="margin: 5px 0;"><strong>Tracking:</strong> TEST123456789</p>
            <p style="margin: 5px 0;"><strong>Expected Delivery:</strong> 3-5 business days</p>
          </div>
        `;
        break;
        
      case 'delivered':
        subject = `[TEST] Your Order Has Been Delivered - ${sampleOrder.order_number}`;
        bgGradient = "linear-gradient(135deg, #FF6B35, #F7931E)";
        headerText = "🎉 Your Order Has Been Delivered!";
        bodyContent = `
          <p>Wonderful news! Your order <strong>${sampleOrder.order_number}</strong> has been successfully delivered and should now be in your hands.</p>
          
          <div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF6B35;">
            <h3 style="color: #e65100; margin-top: 0;">📦 Delivery Confirmed</h3>
            <p style="color: #e65100;">We hope you're delighted with your authentic artisan products!</p>
          </div>
          
          <div style="background: #e8f5e8; border-left: 4px solid #4CAF50; padding: 15px; margin: 20px 0;">
            <h3 style="color: #2e7d32; margin-top: 0;">🌟 Share Your Experience</h3>
            <p style="color: #2e7d32; margin: 0;">We'd love to hear about your experience! Please consider leaving a review or sharing your favorite recipes using our products.</p>
          </div>
        `;
        break;
    }

    html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test Email</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: ${bgGradient}; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">${headerText}</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">This is a test email</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="font-size: 18px; margin-bottom: 20px;">Dear ${sampleOrder.customer_name},</p>
          
          ${bodyContent}
          
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
              <strong style="font-size: 18px; color: #8B4513;">Total: ₹${sampleOrder.total_amount.toFixed(2)}</strong>
            </div>
          </div>
          
          <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
            <p style="color: #856404; margin: 0;"><strong>⚠️ This is a test email</strong> - No actual order was placed.</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; margin: 0;">Thank you for choosing Artisan Delights!</p>
            <p style="color: #8B4513; font-weight: bold; margin: 5px 0 0 0;">Bringing authentic flavors to your kitchen</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Artisan Delights <orders@resend.dev>",
      to: [email],
      subject: subject,
      html: html,
    });

    console.log("Test email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-test-email function:", error);
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