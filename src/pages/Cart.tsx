import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { Trash2, Minus, Plus, ShoppingBag, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-margin-desktop py-40 text-center">
        <div className="mb-8 flex justify-center text-luxury-gold/20">
          <ShoppingBag size={80} strokeWidth={1} />
        </div>
        <h1 className="text-4xl mb-6">Your collection is empty</h1>
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-luxury-taupe mb-12">
          Discover our signature designs to begin your bespoke journey.
        </p>
        <button 
          onClick={() => navigate('/collections')}
          className="luxury-button"
        >
          Explore Collections
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-margin-desktop py-24">
      <h1 className="text- display-lg-mobile md:text-5xl mb-20">Your Selection</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Side: Cart Items */}
        <div className="lg:col-span-7">
          <div className="space-y-12">
            {items.map((item) => (
              <motion.div 
                layout
                key={item.id}
                className="flex flex-col md:flex-row gap-8 pb-12 border-b border-luxury-taupe/10"
              >
                <div className="w-full md:w-48 h-64 bg-luxury-charcoal overflow-hidden border border-luxury-taupe/5">
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-full h-full object-cover grayscale opacity-80"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl text-luxury-gold mb-1">{item.title}</h2>
                      <p className="font-sans text-[10px] uppercase tracking-widest text-luxury-taupe">{item.category} / Bespoke</p>
                    </div>
                    <p className="text-2xl font-light text-luxury-cream">₹{item.price.toLocaleString()}</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <span className="font-label text-luxury-gold/60 block mb-2">Customization Notes</span>
                      <p className="font-sans text-xs text-luxury-taupe leading-relaxed">
                        {item.customization_notes || "Standard bespoke pattern based on digital measurement profile."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center border border-luxury-taupe/20 px-4 py-2 bg-luxury-black">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-luxury-gold transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="mx-6 font-serif text-lg">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-luxury-gold transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="font-label text-red-400 hover:underline underline-offset-8 flex items-center gap-2"
                      >
                        <Trash2 size={12} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <button 
            onClick={() => navigate('/collections')}
            className="mt-12 group flex items-center gap-3 font-label text-luxury-taupe hover:text-luxury-gold transition-colors"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" />
            Continue Browsing
          </button>
        </div>

        {/* Right Side: Summary */}
        <div className="lg:col-span-5">
          <div className="luxury-card sticky top-32">
            <h3 className="text-3xl mb-10">Order Summary</h3>
            <div className="space-y-6 mb-10 text-luxury-taupe font-sans text-xs uppercase tracking-widest">
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span className="text-luxury-cream">₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span>Tailoring Fee</span>
                  <span className="text-[8px] border border-luxury-gold/30 px-1 rounded text-luxury-gold">Incl.</span>
                </div>
                <span className="text-luxury-cream">₹0</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span className="text-luxury-gold">Complimentary</span>
              </div>
              <div className="pt-8 border-t border-luxury-taupe/10 flex justify-between items-center font-serif">
                <span className="text-2xl text-luxury-cream normal-case tracking-normal">Total</span>
                <span className="text-3xl text-luxury-gold">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-6">
              <button 
                onClick={() => navigate('/custom-order')}
                className="luxury-button w-full py-6"
              >
                Proceed to Secure Order
              </button>
              <p className="text-center font-sans text-[10px] text-luxury-taupe uppercase tracking-widest leading-relaxed">
                Prices include VAT where applicable. Custom pieces are non-refundable once tailoring commences.
              </p>
            </div>

            <div className="mt-12 pt-12 border-t border-luxury-taupe/10">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-luxury-gold/60">
                  <ShieldCheck size={18} />
                  <span className="font-label text-[8px]">Secured Bespoke Transaction</span>
                </div>
                <div className="flex items-center gap-4 text-luxury-gold/60">
                  <Truck size={18} />
                  <span className="font-label text-[8px]">Complimentary Global Silk-Route Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
