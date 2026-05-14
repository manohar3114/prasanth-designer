import React from 'react';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Wishlist: React.FC = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-40 text-center">
        <div className="mb-12 flex justify-center text-luxury-gold/20">
          <Heart size={80} strokeWidth={1} />
        </div>
        <h1 className="text-4xl italic mb-6">Your Gallery is Empty</h1>
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-luxury-taupe mb-16">
          Save your favorite silhouettes here for future commissions.
        </p>
        <Link to="/collections" className="luxury-button px-16">Explore Collections</Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-24">
      <div className="mb-24 text-center">
        <span className="font-label text-luxury-gold mb-6 block">Reserved Designs</span>
        <h1 className="text-5xl italic">Your Wishlist</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="luxury-card group"
            >
              <div className="aspect-[3/4] overflow-hidden mb-8 relative">
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-luxury-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                   <button 
                     onClick={() => {
                        addToCart({ ...item, quantity: 1 });
                        navigate('/cart');
                     }}
                     className="w-12 h-12 bg-luxury-gold text-luxury-black rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                   >
                     <ShoppingBag size={20} />
                   </button>
                   <button 
                     onClick={() => removeFromWishlist(item.id)}
                     className="w-12 h-12 bg-white/10 text-white backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                   >
                     <Trash2 size={20} />
                   </button>
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-serif mb-2">{item.title}</h3>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-luxury-taupe">{item.category}</p>
                </div>
                <p className="text-xl text-luxury-gold">₹{item.price.toLocaleString()}</p>
              </div>

              <Link 
                to={`/design/${item.id}`} 
                className="mt-8 flex items-center gap-4 font-label text-[10px] text-luxury-cream group-hover:text-luxury-gold transition-colors"
              >
                VIEW DETAILS <ArrowRight size={12} />
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
};
