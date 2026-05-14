import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabaseClient';
import { Design } from '../types';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { ChevronRight, Ruler, DraftingCompass, Sparkles, Heart, Share2, Check, ShoppingBag } from 'lucide-react';

import { FALLBACK_DESIGNS } from '../constants';

export const DesignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [design, setDesign] = useState<Design | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sizes = ['S', 'M', 'L', 'XL', 'Bespoke'];

  useEffect(() => {
    const fetchDesign = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('designs')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        setDesign(data as Design);
      } else {
        // Check fallback designs
        const fallback = FALLBACK_DESIGNS.find(d => d.id === id);
        if (fallback) {
          setDesign(fallback);
        } else {
          navigate('/collections');
        }
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
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    setError(null);
    addToCart({ ...design, quantity: 1 });
    navigate('/cart');
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    setError(null);
    addToCart({ ...design, quantity: 1 });
    navigate('/checkout');
  };

  const toggleWishlist = () => {
    if (isInWishlist(design.id)) {
      removeFromWishlist(design.id);
    } else {
      addToWishlist(design);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-20">
      {/* Breadcrumb */}
      <nav className="mb-12">
        <ul className="flex items-center gap-2 font-label text-[10px] tracking-widest text-luxury-taupe uppercase">
          <li><Link to="/collections" className="hover:text-luxury-gold transition-colors">Portfolio</Link></li>
          <ChevronRight size={10} />
          <li><span className="text-luxury-taupe/60">{design.category}</span></li>
          <ChevronRight size={10} />
          <li className="text-luxury-gold">{design.title}</li>
        </ul>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Left: Visual Showcase */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-[4/5] bg-luxury-charcoal overflow-hidden relative group"
          >
            <img 
              src={design.image_url} 
              alt={design.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute top-8 right-8 flex flex-col gap-4">
               <button 
                  onClick={toggleWishlist}
                  className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${isInWishlist(design.id) ? 'bg-luxury-gold text-luxury-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
               >
                  <Heart size={20} fill={isInWishlist(design.id) ? "currentColor" : "none"} />
               </button>
               <button className="w-12 h-12 rounded-full bg-white/10 text-white backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all">
                  <Share2 size={20} />
               </button>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-luxury-charcoal cursor-pointer overflow-hidden border border-luxury-taupe/10 opacity-50 hover:opacity-100 transition-opacity">
                 <img src={design.image_url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Spec & Configuration */}
        <div className="lg:col-span-5 flex flex-col">
          <header className="mb-12">
            <span className="font-label text-[10px] text-luxury-gold tracking-[0.3em] mb-4 block">BESPOKE COLLECTION</span>
            <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight italic">{design.title}</h1>
            <div className="flex items-baseline gap-4 mb-4">
                <span className="text-3xl text-luxury-gold">₹{design.price?.toLocaleString()}</span>
                <span className="font-sans text-[10px] text-luxury-taupe uppercase tracking-widest">Inclusive of Atelier Services</span>
            </div>
          </header>

          <div className="space-y-12">
            <section>
              <h3 className="font-label text-[10px] text-luxury-taupe uppercase tracking-[0.2em] mb-6">Select Proportion</h3>
              <div className="flex flex-wrap gap-4">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => {
                        setSelectedSize(size);
                        setError(null);
                    }}
                    className={`w-14 h-14 font-label text-[10px] flex items-center justify-center border transition-all ${selectedSize === size ? 'border-luxury-gold bg-luxury-gold text-luxury-black' : 'border-luxury-taupe/20 text-luxury-cream hover:border-luxury-gold'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {error && <p className="mt-4 text-red-500 font-sans text-[10px] uppercase tracking-widest">{error}</p>}
              <button 
                onClick={() => navigate('/measurements')}
                className="mt-6 flex items-center gap-2 text-luxury-gold opacity-60 hover:opacity-100 transition-opacity"
              >
                <Ruler size={12} />
                <span className="font-label text-[9px] uppercase tracking-widest border-b border-luxury-gold/30">View Size Protocol</span>
              </button>
            </section>

            <section>
              <h3 className="font-label text-[10px] text-luxury-taupe uppercase tracking-[0.2em] mb-4">Atelier Story</h3>
              <p className="font-serif text-lg text-luxury-cream/80 leading-relaxed italic opacity-80">
                {design.description || "A masterwork of contemporary silhouette, this piece explores the intersection of traditional handwork and modern minimalism."}
              </p>
            </section>

            <div className="grid grid-cols-2 gap-8 py-8 border-y border-luxury-taupe/10">
                <div className="flex items-start gap-4">
                    <Sparkles size={16} className="text-luxury-gold mt-1" />
                    <div>
                        <p className="font-label text-[10px] text-luxury-gold">PURE SILK</p>
                        <p className="text-[10px] text-luxury-taupe leading-relaxed">Sourced from private looms</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <DraftingCompass size={16} className="text-luxury-gold mt-1" />
                    <div>
                        <p className="font-label text-[10px] text-luxury-gold">BESPOKE FIT</p>
                        <p className="text-[10px] text-luxury-taupe leading-relaxed">Hand-cut anatomical mapping</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-12">
                <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={handleAddToCart}
                      className="luxury-button-outline py-6 flex items-center justify-center gap-3 transition-all hover:bg-luxury-gold/5"
                    >
                      <ShoppingBag size={18} />
                      <span className="font-label text-[10px] tracking-widest">ADD TO BAG</span>
                    </button>
                    <button 
                      onClick={handleBuyNow}
                      className="luxury-button py-6 flex items-center justify-center gap-3 shadow-xl shadow-luxury-gold/10"
                    >
                      <span className="font-label text-[10px] tracking-widest">BUY NOW</span>
                      <ChevronRight size={16} />
                    </button>
                </div>
                
                <button 
                  onClick={toggleWishlist}
                  className={`w-full py-6 flex items-center justify-center gap-3 border transition-all ${isInWishlist(design.id) ? 'bg-luxury-gold/10 border-luxury-gold text-luxury-gold' : 'border-luxury-taupe/20 text-luxury-taupe hover:border-luxury-gold hover:text-luxury-gold'}`}
                >
                  <Heart size={18} fill={isInWishlist(design.id) ? "currentColor" : "none"} />
                  <span className="font-label text-[10px] tracking-[0.2em]">
                    {isInWishlist(design.id) ? 'SAVED TO WISHLIST' : 'ADD TO WISHLIST'}
                  </span>
                </button>

                <button 
                   onClick={() => navigate('/custom-order')}
                   className="w-full py-6 font-label text-[10px] tracking-[0.3em] text-luxury-cream/40 border border-dashed border-luxury-taupe/20 hover:border-luxury-gold hover:text-luxury-gold transition-all"
                >
                   REQUEST CUSTOM COMMISSION
                </button>
            </div>
            
            <div className="mt-12 p-8 bg-luxury-charcoal/30 border border-luxury-taupe/5 text-center">
                <p className="font-sans text-[8px] text-luxury-taupe uppercase tracking-widest mb-4">Total Payout including Atelier Crafting</p>
                <p className="text-4xl text-luxury-gold font-serif">₹{design.price?.toLocaleString()}</p>
            </div>

          </div>
        </div>
      </div>

      {/* Anatomical Details */}
      <section className="mt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
                 <span className="font-label text-luxury-gold mb-6 block">The Atelier Standard</span>
                 <h2 className="text-5xl italic mb-10 leading-tight">Crafted for<br />Your Silhouette</h2>
                 <div className="space-y-8">
                    {[
                        { title: 'Hand-Rolled Hems', desc: 'Finished by master artisans requiring 12 hours of manual labor per piece.' },
                        { title: 'Architectural Lining', desc: 'Internal structure designed to maintain silhouette integrity over time.' },
                        { title: 'Noble Fibers', desc: 'We only use 100% natural, ethically sourced materials with liquid drape.' }
                    ].map((feature, i) => (
                        <div key={i} className="flex gap-6 group">
                            <span className="text-luxury-gold font-serif text-xl opacity-40 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                            <div>
                                <h4 className="font-label text-luxury-cream text-[10px] tracking-widest mb-2">{feature.title}</h4>
                                <p className="font-sans text-[10px] text-luxury-taupe leading-relaxed uppercase tracking-widest opacity-80">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
            <div className="relative">
                <div className="aspect-[3/4] bg-luxury-charcoal overflow-hidden grayscale contrast-125">
                     <img src={design.image_url} alt="" className="w-full h-full object-cover opacity-60" />
                </div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-luxury-gold p-8 flex flex-col justify-end">
                     <p className="font-label text-luxury-black text-[8px] uppercase tracking-widest leading-loose">
                        AUTHENTICITY <br />GUARANTEED BY <br />PRASANTH DESIGNERS
                     </p>
                </div>
            </div>
        </div>
      </section>
    </main>
  );
};
