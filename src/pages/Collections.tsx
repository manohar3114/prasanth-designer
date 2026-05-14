import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabaseClient';
import { Design } from '../types';
import { Link } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';

import { FALLBACK_DESIGNS } from '../constants';

export const Collections: React.FC = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Blouse', 'Lehenga', 'Kurti', 'Bridal'];

  useEffect(() => {
    const fetchDesigns = async () => {
      setLoading(true);
      let query = supabase.from('designs').select('*');
      
      if (selectedCategory !== 'All') {
        query = query.ilike('category', selectedCategory);
      }

      const { data, error } = await query;

      if (!error && data && data.length > 0) {
        setDesigns(data as Design[]);
      } else {
        // Fallback signature designs from the provided screens
        setDesigns(
          selectedCategory === 'All' 
            ? FALLBACK_DESIGNS 
            : FALLBACK_DESIGNS.filter(d => d.category.toLowerCase() === selectedCategory.toLowerCase())
        );
      }
      setLoading(false);
    };


    fetchDesigns();
  }, [selectedCategory]);

  return (
    <main className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-24">
      <header className="mb-20">
        <h1 className="text- display-lg-mobile md:text-6xl mb-8">Our Collection</h1>
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-luxury-taupe max-w-2xl leading-relaxed">
          A curated selection of bespoke tailoring, where precision meets heritage. Explore our signature silhouettes crafted from the world's finest fabrics.
        </p>
      </header>

      {/* Filter Bar */}
      <section className="mb-16 flex flex-col md:flex-row justify-between items-end border-b border-luxury-taupe/10 pb-8">
        <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-label px-6 py-2 border transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-luxury-gold text-luxury-black border-luxury-gold'
                  : 'bg-transparent text-luxury-taupe border-luxury-taupe/20 hover:border-luxury-gold hover:text-luxury-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-luxury-taupe pb-2">
          <SlidersHorizontal size={14} />
          <span className="font-label text-[10px]">Sorted by: <span className="text-luxury-gold">Newest First</span></span>
        </div>
      </section>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-luxury-charcoal mb-6"></div>
              <div className="h-4 bg-luxury-charcoal w-1/3 mb-4"></div>
              <div className="h-6 bg-luxury-charcoal w-2/3 mb-2"></div>
            </div>
          ))
        ) : designs.length > 0 ? (
          designs.map((design) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={design.id}
              className="group"
            >
              <Link to={`/designs/${design.id}`}>
                <div className="aspect-[3/4] overflow-hidden mb-8 bg-luxury-charcoal border border-luxury-taupe/5 relative">
                  <img
                    src={design.image_url}
                    alt={design.title}
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="luxury-button transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      View Details
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-label text-luxury-taupe mb-2 block">{design.category}</span>
                    <h3 className="text-2xl text-luxury-gold group-hover:text-luxury-cream transition-colors">{design.title}</h3>
                  </div>
                  {design.price && (
                    <p className="font-serif text-xl text-luxury-cream">₹{design.price.toLocaleString()}</p>
                  )}
                </div>
                <div className="mt-4 flex gap-3">
                    <span className="font-label text-[8px] border border-luxury-taupe/20 px-2 py-1 text-luxury-taupe">Pure Silk</span>
                    <span className="font-label text-[8px] border border-luxury-taupe/20 px-2 py-1 text-luxury-taupe">Bespoke</span>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-40 text-center border border-dashed border-luxury-taupe/20">
            <p className="font-label text-luxury-taupe">No designs found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
};
