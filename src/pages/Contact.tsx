import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MessageSquare, MapPin, ExternalLink } from 'lucide-react';

export const Contact: React.FC = () => {
    const whatsappNumber = "+919876543210"; // Sample number
    const whatsappMessage = "Hello Prasanth Designers, I would like to inquire about a custom design.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-24">
      {/* Header Section */}
      <div className="mb-32">
        <span className="font-label text-luxury-gold mb-6 block">Get In Touch</span>
        <h1 className="text-display-lg-mobile md:text-display-lg max-w-4xl leading-tight">
          Connect with <br /><span className="italic font-light">Our Atelier</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
        {/* Left Column: Direct & WhatsApp */}
        <div className="lg:col-span-5 space-y-24">
          {/* Direct Contact */}
          <section>
            <h2 className="font-label text-luxury-taupe mb-12">Direct Contact</h2>
            <div className="space-y-12">
              <div className="flex items-start gap-6">
                <Phone className="text-luxury-gold shrink-0 mt-1" size={20} strokeWidth={1} />
                <div>
                  <p className="font-label text-[8px] text-luxury-taupe mb-2">Client Services</p>
                  <p className="text-xl md:text-2xl text-luxury-cream tracking-wider">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <Mail className="text-luxury-gold shrink-0 mt-1" size={20} strokeWidth={1} />
                <div>
                  <p className="font-label text-[8px] text-luxury-taupe mb-2">Inquiries</p>
                  <p className="text-xl md:text-2xl text-luxury-cream tracking-tight">atelier@prasanthdesigners.com</p>
                </div>
              </div>
            </div>
          </section>

          {/* WhatsApp Integration */}
          <motion.section 
            whileHover={{ scale: 1.02 }}
            className="p-12 border border-luxury-gold/10 bg-luxury-charcoal/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 text-luxury-gold">
                <MessageSquare size={120} />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    <MessageSquare size={20} fill="currentColor" />
                </div>
                <h2 className="font-label text-luxury-cream">Instant Consultation</h2>
                </div>
                <p className="font-sans text-sm text-luxury-taupe mb-12 leading-relaxed max-w-sm">
                Speak directly with our master tailors for fabric selection, custom sizing, or styling advice.
                </p>
                <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" luxury-button w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white border-none"
                >
                Chat with a Designer <ExternalLink size={14} />
                </a>
            </div>
          </motion.section>
        </div>

        {/* Right Column: Visit Us */}
        <div className="lg:col-span-7">
          <section className="h-full flex flex-col">
            <h2 className="font-label text-luxury-taupe mb-12">Visit Us</h2>
            <div className="mb-12 border-b border-luxury-taupe/10 pb-12">
              <h3 className="text-4xl text-luxury-gold mb-4">The Heritage Boutique</h3>
              <p className="font-sans text-sm text-luxury-taupe leading-loose max-w-md uppercase tracking-[0.1em]">
                12 Savile Row, Mayfair, <br />
                London W1S 3PQ, United Kingdom
              </p>
            </div>
            
            {/* Map Placeholder */}
            <div className="flex-grow bg-luxury-charcoal/40 border border-luxury-taupe/10 overflow-hidden relative group min-h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2666&auto=format&fit=crop"
                alt="Map Background"
                className="w-full h-full object-cover grayscale opacity-20 group-hover:opacity-40 transition-opacity duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="luxury-card border-luxury-gold/20 bg-luxury-black/80 backdrop-blur-md p-10 text-center">
                    <MapPin className="text-luxury-gold mx-auto mb-6" size={32} />
                    <p className="font-label text-luxury-gold mb-2">Arrival Details</p>
                    <p className="font-sans text-[10px] text-luxury-taupe uppercase tracking-widest leading-relaxed">
                        Valet parking is available at <br /> the Savile Row entrance.
                    </p>
                 </div>
              </div>
              
              <div className="absolute bottom-8 left-8 p-6 bg-luxury-black border border-luxury-taupe/10">
                <p className="font-label text-luxury-gold mb-3">Operating Hours</p>
                <div className="space-y-2 font-sans text-[10px] text-luxury-taupe uppercase tracking-widest">
                  <p>Mon – Sat: 10:00 – 19:00</p>
                  <p>Sun: By Appointment Only</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Swatch CTA */}
      <section className="mt-40 border-t border-luxury-taupe/10 pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div>
                 <h3 className="text-5xl mb-8 leading-tight">Experience the <br /> <span className="italic">Quality First-Hand</span></h3>
                 <p className="font-sans text-sm text-luxury-taupe mb-12 leading-loose max-w-lg">
                    Request a curated collection of silk, linen, or wool swatches delivered to your doorstep before finalizing your custom order.
                 </p>
                 <button className="luxury-button-outline px-12">
                    Request Swatch Kit
                 </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div className="aspect-square bg-luxury-charcoal overflow-hidden group">
                    <img 
                        src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop" 
                        alt="Fabric 1"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                </div>
                <div className="aspect-square bg-luxury-charcoal overflow-hidden group">
                    <img 
                        src="https://images.unsplash.com/photo-1524230507669-e2989c6700e1?q=80&w=1000&auto=format&fit=crop" 
                        alt="Fabric 2"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                </div>
            </div>
        </div>
      </section>
    </main>
  );
};
