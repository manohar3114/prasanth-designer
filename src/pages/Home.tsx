import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { Design } from '../types';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const [featuredDesigns, setFeaturedDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data, error } = await supabase
        .from('designs')
        .select('*')
        .eq('is_featured', true)
        .limit(3);

      if (!error && data) {
        setFeaturedDesigns(data as Design[]);
      }
      setLoading(false);
    };

    fetchFeatured();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1594931800414-934d400e947e?q=80&w=2670&auto=format&fit=crop"
            alt="Luxury Tailoring"
            className="w-full h-full object-cover opacity-30 filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-margin-desktop w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <span className="font-label text-luxury-gold mb-6 block">Quiet Luxury Craftsmanship</span>
            <h1 className="text-display-lg-mobile md:text-display-lg leading-tight mb-8">
              Custom Ladies <br />
              <span className="italic font-light">Designer Wear</span>
            </h1>
            <div className="flex flex-wrap gap-6">
              <Link to="/appointments" className="luxury-button">
                Book Appointment
              </Link>
              <Link to="/custom-order" className="luxury-button-outline">
                Start Custom Order
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Designs */}
      <section className="py-32 bg-luxury-ink">
        <div className="max-w-7xl mx-auto px-margin-desktop">
          <div className="flex justify-between items-end mb-20 border-b border-luxury-taupe/10 pb-10">
            <div>
              <h2 className="text-4xl mb-4">Featured Designs</h2>
              <p className="font-sans text-xs uppercase tracking-widest text-luxury-taupe">
                Signature silhouettes for the modern woman.
              </p>
            </div>
            <Link to="/collections" className="font-label text-luxury-gold border-b border-luxury-gold pb-1 hover:opacity-70 transition-opacity flex items-center gap-2">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {loading ? (
              [1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="aspect-[3/4] bg-luxury-charcoal mb-6 border border-luxury-taupe/5"></div>
                  <div className="h-4 bg-luxury-charcoal w-1/3 mb-4"></div>
                  <div className="h-6 bg-luxury-charcoal w-2/3 mb-2"></div>
                </div>
              ))
            ) : featuredDesigns.length > 0 ? (
              featuredDesigns.map((design) => (
                <motion.div
                  key={design.id}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                >
                  <Link to={`/designs/${design.id}`}>
                    <div className="aspect-[3/4] overflow-hidden mb-6 bg-luxury-charcoal border border-luxury-taupe/10 relative">
                      <img
                        src={design.image_url}
                        alt={design.title}
                        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <span className="font-label text-luxury-taupe mb-2 block">{design.category}</span>
                    <h3 className="text-2xl mb-1 text-luxury-gold group-hover:text-luxury-cream transition-colors">{design.title}</h3>
                    <p className="font-sans text-[10px] text-luxury-cream/40 uppercase tracking-[0.2em]">Bespoke Craftsmanship</p>
                  </Link>
                </motion.div>
              ))
            ) : (
                <div className="col-span-3 py-20 text-center border border-dashed border-luxury-taupe/20">
                    <p className="text-luxury-taupe font-sans text-xs uppercase tracking-widest">No featured designs available at the moment.</p>
                </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 border-t border-luxury-taupe/10">
        <div className="max-w-7xl mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4">
              <span className="font-label text-luxury-gold mb-6 block">Voices of Elegance</span>
              <h2 className="text-5xl leading-tight">Refined <br /><span className="italic">Experiences</span></h2>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="luxury-card border-none bg-luxury-charcoal/40 flex flex-col justify-between">
                <div>
                  <div className="flex text-luxury-gold mb-8">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} fill="currentColor" />)}
                  </div>
                  <p className="font-serif text-xl leading-relaxed mb-12 text-luxury-cream/90">
                    "The attention to detail in the custom blouse was extraordinary. It fits like a second skin. Truly the best tailoring experience."
                  </p>
                </div>
                <div>
                  <p className="font-label text-luxury-gold mb-1">Ananya Sharma</p>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-luxury-taupe">Bridal Client</p>
                </div>
              </div>
              <div className="luxury-card border-none bg-luxury-charcoal/40 flex flex-col justify-between">
                <div>
                  <div className="flex text-luxury-gold mb-8">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} fill="currentColor" />)}
                  </div>
                  <p className="font-serif text-xl leading-relaxed mb-12 text-luxury-cream/90">
                    "Their minimal approach to traditional wear is so refreshing. The quality of fabric and the precision of the cuts speak for themselves."
                  </p>
                </div>
                <div>
                  <p className="font-label text-luxury-gold mb-1">Priya Nair</p>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-luxury-taupe">Regular Patron</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Profile Section */}
      <section className="py-24 text-center border-t border-luxury-taupe/10 bg-luxury-ink">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl mb-6">Your Profile, Perfected</h2>
          <p className="text-luxury-taupe font-sans text-[10px] uppercase tracking-[0.2em] mb-12 leading-relaxed">
            We maintain a secure digital measurement profile for every client to ensure a flawless fit for all future orders.
          </p>
          <div className="inline-flex gap-8 border border-luxury-gold/10 p-10 bg-luxury-black">
            <div className="flex flex-col">
                <span className="text-luxury-gold font-serif text-2xl mb-1">34.5"</span>
                <span className="font-label text-[8px] text-luxury-taupe">BUST</span>
            </div>
            <span className="w-px h-12 bg-luxury-taupe/10"></span>
            <div className="flex flex-col">
                <span className="text-luxury-gold font-serif text-2xl mb-1">28.0"</span>
                <span className="font-label text-[8px] text-luxury-taupe">WAIST</span>
            </div>
            <span className="w-px h-12 bg-luxury-taupe/10"></span>
            <div className="flex flex-col">
                <span className="text-luxury-gold font-serif text-2xl mb-1">38.5"</span>
                <span className="font-label text-[8px] text-luxury-taupe">HIP</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
