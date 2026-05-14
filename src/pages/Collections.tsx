import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabaseClient';
import { Design } from '../types';
import { Link } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';

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
        const fallback = [
          {
            id: '1',
            title: 'Emerald Silk Blouse',
            category: 'Blouse',
            image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAFrDGh8a_FnzFUy9-1sJDQ90qLl8nzvhla4MivCQMm3O7VxoGkLVmiYP6UB_JOZqduSFhnad3I_8H97uB8jCjJPZsGD2xi7XVqA29tgzb-pTdoBgCKxegVk5qEUZn1H7qRXrSodr-X1noAuPLgnVvv40mCfbUZhNQjqUXY78XuySTonep1BxzV0T5CG7GNIbWw6Ug7ghM_w8ineMZDfuzkHcuhe7kTMFDVlH-xzh-e8oiUmQWudTWfKmscokJXBdpPRxuWOiQq4I',
            price: 18500
          },
          {
            id: '2',
            title: 'Ivory Pearl Bridal',
            category: 'Bridal',
            image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5XqFT0ZaW82T55rNLp90ygvOWW8DINEf2VqV-TSHWPXcKaE4-QxO3FJB8B5GVy2OOzcCz5yEdC174vuedzkk7XbK3hNkPH-XJnv5M-DVXGQXBG_8nhc1O5oRn5gNUCwpOLFHfmKnMRMPjIv1lgNk74C5yC6WROuCoIgNAqXV_26trAZccTMc7EwsgKm2JLJRGAlgfkbCjE004EIqoPParpV-r2f09Xksph2MBJg7lcgPZ1uvRVhdmMC62Lynllr6v0DZKMBuklTM',
            price: 125000
          },
          {
            id: '3',
            title: 'Modern Kurti',
            category: 'Kurti',
            image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBksF2U226_yPKAlIHnVCHFRp4NNJVAb4E1WUlqtiNg9kP9y2OpVd6L-ikF7DBM8Bi_5WKYGQ4cv1Okc_EBvVMwdMuEEQhgaaK5aBOtJa9vFUHOF6qjqy7LDBqVlljjQdb8Ld7ONkMnngLUIxTl5e24o1dhvy90eOCqQem8w5jp9TTC4DvuEenoZWQLApNUxj2nEUd10LwXxSzqPjcyhhD0a5QPY7V3mr0bJ5EbGQjKaK9dT20cLo90wr7P5XvPsbHhoy4FAKfKGs0',
            price: 12400
          },
          {
            id: '4',
            title: 'Midnight Star Lehenga',
            category: 'Lehenga',
            image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnQS43OlK2dmOdgil-HuZ6vgWEhpkVdU6nELvM8fkt7dl2aZbILttrCQxsAPUk32o9o_Sm41vaMhlddUkyFy20aRgDFHSvpGuH4VQDwPTMae2m64vP00fccECw1FvUW0KgxLP_JNA7QUI5_oJelSeBvbXykl2zL7UWqgslfCcGDPEQFh3mC0uRU07tMfmoP5zgxLze039U-1txvZQOmiEA5Yrlk7xMB3NV_xiG-oIKutTu_bCOCuXzAdfYOyy5YnyrVVRsHEcLNpw',
            price: 88500
          },
          {
            id: '5',
            title: 'Architectural Blouse',
            category: 'Blouse',
            image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFQ3lpqnuMoxTwUsqPw69LJgSFvVvZi7kGjFhoAvzUV_IaOPXwUY2E4TNO6xFDyrL6dIS3fjV3pfEVMzQwGoqX3cpWj_fx4PgDxCZQsP5Po2Us95mLx7hLaRiVPgFsXm9Mfi9WQw_jAlUnSpc0q3GQ5aTLIAj-a-sDNJcrssdZrjVDJRnMPsHKgq6lDGXXKMHb_HpthnkSPem260Irc1e6tLkUXJRRilkmEFcVEMBE5_UL3SY64z3t_zX-5qwKcQPMMrk3QpWjiYk',
            price: 22400
          },
          {
            id: '6',
            title: 'Gold Dust Bridal Kurti',
            category: 'Bridal',
            image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkmb2NNgZXA1Q36UUNABK25wecDhPQyj1Ooh45r2SNxc1vmuLiOIy5QOWqyrAXS2jEWzzJuseNRoKvoX1taDuN7jPh8giU8LzxsirH2wdoEcm6vYjgtU2gk8bKwQpotNylmv_QBS3F1-5Sp9k-ce2GyF6lDJ7ZjBHFYPOeRTgLFiWRnYGk3dg2NF1VlXDtHUtN4asibPXHCsgYbUTCKP8DzCot0584fFXZrh8yRzv5XBQtllZnuv_q-01IiHYL-PqYLHj48nNpUwc',
            price: 64200
          }
        ];

        setDesigns(
          selectedCategory === 'All' 
            ? fallback 
            : fallback.filter(d => d.category.toLowerCase() === selectedCategory.toLowerCase())
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
