import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Footer from '@/components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // TODO: Implement form submission
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-brown/5 via-soft-beige/10 to-terracotta/5">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-terracotta via-warm-brown to-sage text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90 drop-shadow">
            We'd love to hear from you. Get in touch with us for any questions about our traditional podis
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-warm-brown">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full bg-terracotta hover:bg-warm-brown text-white">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Location Card */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-warm-brown flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Our Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      123 Traditional Street<br />
                      South Indian Quarter<br />
                      Chennai, Tamil Nadu 600001<br />
                      India
                    </p>
                  </CardContent>
                </Card>

                {/* Phone Numbers Card */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-warm-brown flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Phone Numbers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Customer Service: +91 98765 43210<br />
                      Orders & Inquiries: +91 98765 43211<br />
                      WhatsApp: +91 98765 43212
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-warm-brown">Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-warm-brown rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Email Addresses</h3>
                      <p className="text-muted-foreground">
                        General: info@artisandelights.com<br />
                        Orders: orders@artisandelights.com<br />
                        Support: support@artisandelights.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-soft-beige rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Business Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 7:00 PM<br />
                        Saturday: 9:00 AM - 5:00 PM<br />
                        Sunday: 10:00 AM - 4:00 PM<br />
                        <span className="text-sm">(Indian Standard Time)</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-warm-brown">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">How fresh are your podis?</h4>
                    <p className="text-sm text-muted-foreground">
                      All our podis are made fresh to order and have a shelf life of 6-12 months when stored properly.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Do you ship internationally?</h4>
                    <p className="text-sm text-muted-foreground">
                      Currently, we ship across India. International shipping is coming soon!
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">What is your return policy?</h4>
                    <p className="text-sm text-muted-foreground">
                      We offer a 100% satisfaction guarantee. If you're not happy with your order, contact us within 7 days.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer showTopButton />
    </div>
  );
};

export default Contact;