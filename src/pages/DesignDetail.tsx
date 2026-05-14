import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabaseClient';
import { Design } from '../types';
import { useCart } from '../hooks/useCart';
import { ChevronRight, Ruler, DraftingCompass, Sparkles } from 'lucide-react';

export const DesignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [design, setDesign] = useState<Design | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesign = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('designs')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        navigate('/collections');
      } else {
        setDesign(data as Design);
      }
      setLoading(false);
    };

    if (id) fetchDesign();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-luxury-gold"></div>
      </div>
    );
  }

  if (!design) return null;

  const handleAddToCart = () => {
    addToCart({ ...design, quantity: 1 });
    navigate('/cart');
  };

  return (
    <main className="max-w-7xl mx-auto px-margin-desktop py-20">
      {/* Breadcrumb */}
      <nav className="mb-12">
        <ul className="flex items-center gap-2 font-label text-luxury-taupe tracking-widest">
          <li><a href="/collections" className="hover:text-luxury-gold transition-colors">Designs</a></li>
          <ChevronRight size={10} />
          <li><span className="text-luxury-taupe/60">{design.category}</span></li>
          <ChevronRight size={10} />
          <li className="text-luxury-gold font-bold">{design.title}</li>
        </ul>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: Large Image Preview */}
        <div className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="aspect-[4/5] bg-luxury-charcoal overflow-hidden border border-luxury-taupe/10"
          >
            <img 
              src={design.image_url} 
              alt={design.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-luxury-charcoal border border-luxury-taupe/10 cursor-pointer hover:border-luxury-gold transition-colors overflow-hidden">
                 <img 
                  src={design.image_url} 
                  alt={design.title}
                  className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="lg:col-span-5 flex flex-col">
          <header className="mb-10">
            <span className="font-label text-luxury-black bg-luxury-gold px-3 py-1 mb-6 inline-block">Limited Collection</span>
            <h1 className="text-4xl md:text-5xl font-semibold text-luxury-gold mb-2">{design.title}</h1>
            <p className="font-sans text-xs uppercase tracking-widest text-luxury-taupe">Bespoke Tailoring & Pure Fabric</p>
            <div className="mt-8 text-3xl font-light text-luxury-cream">₹{design.price?.toLocaleString()}</div>
            <p className="font-label text-[8px] text-luxury-taupe/60 mt-2">Estimated Price • Final price based on custom measurements</p>
          </header>

          <div className="space-y-10 mb-12">
            <section>
              <h3 className="font-label text-luxury-gold mb-4">Fabric & Craft</h3>
              <p className="font-sans text-sm text-luxury-taupe leading-relaxed">
                {design.description || "Crafted with hand-picked materials, this piece features a liquid drape and a sophisticated finish. Every piece is hand-cut and assembled using traditional bespoke techniques, including reinforced French seams and hand-rolled hems."}
              </p>
            </section>

            <section>
              <h3 className="font-label text-luxury-gold mb-6">Details</h3>
              <ul className="space-y-4 font-sans text-xs text-luxury-cream/80 uppercase tracking-widest">
                <li className="flex items-center gap-4">
                  <DraftingCompass size={14} className="text-luxury-gold" />
                  Architectural precision cut
                </li>
                <li className="flex items-center gap-4">
                  <Ruler size={14} className="text-luxury-gold" />
                  Precision-tailored darts for a modern silhouette
                </li>
                <li className="flex items-center gap-4">
                  <Sparkles size={14} className="text-luxury-gold" />
                  Signature hand-stitched detailing
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-label text-luxury-gold mb-4">Fabric Swatch</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-luxury-gold/20 border border-luxury-taupe/20"></div>
                <div>
                  <p className="font-label text-luxury-cream">Bespoke Selection</p>
                  <p className="text-[10px] text-luxury-taupe uppercase tracking-widest">Premium Sourced Fibers</p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-auto space-y-4">
            <button 
              onClick={handleAddToCart}
              className=" luxury-button w-full"
            >
              Add to Cart
            </button>
            <button 
              onClick={() => navigate('/custom-order')}
              className="luxury-button-outline w-full"
            >
              Customize this Design
            </button>
            <p className="text-center text-[9px] text-luxury-taupe/60 mt-4 uppercase tracking-[0.2em]">
              Bespoke orders typically ship within 14–21 business days.
            </p>
          </div>
        </div>
      </div>

      {/* Measurement Grid Section */}
      <section className="mt-40 pt-20 border-t border-luxury-taupe/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h3 className="text-3xl mb-4">The Precision Standard</h3>
            <p className="font-sans text-sm text-luxury-taupe leading-relaxed">
              Our tailoring process relies on exact anatomical mapping. For this piece, we recommend providing these key dimensions for the perfect fit using our digital measurement profile.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 border-l border-t border-luxury-taupe/10">
              {['Shoulder Width', 'Bust Circ', 'Waist Line', 'Sleeve Length', 'Bicep Width', 'Total Length'].map((dim) => (
                <div key={dim} className="p-8 border-r border-b border-luxury-taupe/10 bg-luxury-charcoal/30">
                  <p className="font-label text-[8px] text-luxury-taupe mb-2">{dim}</p>
                  <p className="font-serif text-2xl text-luxury-gold opacity-30">-- cm</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
