import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'motion/react';
import { ShieldCheck, Truck, CreditCard, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    shippingAddress: '',
    city: '',
    postalCode: '',
    paymentMethod: 'credit_card',
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }

    setLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setSuccess(true);
    clearCart();
  };

  if (success) {
    return (
      <main className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-40 text-center">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="max-w-md mx-auto luxury-card p-16"
        >
          <div className="w-20 h-20 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-10 text-luxury-gold">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl mb-6 italic">Order Confirmed</h2>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-luxury-taupe leading-loose mb-12">
            Your bespoke commission has been secured. Our master tailors will begin crafting your silhouette within 24 hours.
          </p>
          <button 
            onClick={() => navigate('/profile')}
            className="luxury-button w-full py-6"
          >
            Track Commission
          </button>
        </motion.div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-40 text-center">
        <h1 className="text-4xl mb-6">Your bag is empty</h1>
        <button onClick={() => navigate('/collections')} className="luxury-button">Return to Collections</button>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-24">
      <div className="mb-20">
        <nav className="mb-8">
            <ul className="flex items-center gap-4 font-label text-[10px] tracking-widest text-luxury-taupe uppercase">
                <li className="text-luxury-gold">Bag</li>
                <ChevronRight size={10} />
                <li className="text-luxury-gold">Information</li>
                <ChevronRight size={10} />
                <li>Bespoke Finalization</li>
            </ul>
        </nav>
        <h1 className="text-5xl italic">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7">
          <form onSubmit={handleCheckout} className="space-y-16">
            <section>
              <h2 className="text-2xl mb-8 flex items-center gap-4">
                 <span className="w-8 h-8 rounded-full border border-luxury-gold flex items-center justify-center text-xs font-label">1</span>
                 Shipping Details
              </h2>
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="font-label text-[8px] text-luxury-taupe uppercase tracking-widest">Atelier Delivery Address</label>
                  <input 
                    type="text" 
                    required
                    className="luxury-input py-6"
                    placeholder="Street name and house number"
                    value={formData.shippingAddress}
                    onChange={(e) => setFormData({...formData, shippingAddress: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <label className="font-label text-[8px] text-luxury-taupe uppercase tracking-widest">City</label>
                      <input 
                        type="text" 
                        required
                        className="luxury-input py-6"
                        placeholder="Paris, London, Mumbai"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                   </div>
                   <div className="space-y-4">
                      <label className="font-label text-[8px] text-luxury-taupe uppercase tracking-widest">Postal Code</label>
                      <input 
                        type="text" 
                        required
                        className="luxury-input py-6"
                        placeholder="000 000"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                      />
                   </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl mb-8 flex items-center gap-4">
                 <span className="w-8 h-8 rounded-full border border-luxury-gold flex items-center justify-center text-xs font-label">2</span>
                 Payment Method
              </h2>
              <div className="space-y-4">
                 <div 
                    onClick={() => setFormData({...formData, paymentMethod: 'credit_card'})}
                    className={`luxury-card p-8 cursor-pointer border-2 transition-all ${formData.paymentMethod === 'credit_card' ? 'border-luxury-gold bg-luxury-gold/5' : 'border-luxury-taupe/10 opacity-60'}`}
                 >
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-6">
                            <CreditCard size={24} className="text-luxury-gold" />
                            <div>
                                <p className="font-label text-[10px] text-luxury-cream">CREDIT / DEBIT CARD</p>
                                <p className="font-sans text-[8px] text-luxury-taupe uppercase tracking-widest mt-1">Encrypted Secure Transaction</p>
                            </div>
                        </div>
                        {formData.paymentMethod === 'credit_card' && <CheckCircle2 size={16} className="text-luxury-gold" />}
                    </div>
                 </div>
              </div>
            </section>

            <button 
              type="submit" 
              disabled={loading}
              className="luxury-button w-full py-8 flex items-center justify-center gap-4 group"
            >
              {loading ? 'Securing Commission...' : (
                <>
                  <ShieldCheck size={20} />
                  Authorize Payment (₹{totalPrice.toLocaleString()})
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="lg:col-span-5">
           <div className="luxury-card sticky top-32">
             <h3 className="text-2xl mb-10 italic">Selection Summary</h3>
             <div className="space-y-8 mb-10">
                {items.map(item => (
                    <div key={item.id} className="flex gap-6 pb-8 border-b border-luxury-taupe/5 last:border-0 last:pb-0">
                        <div className="w-20 h-24 bg-luxury-charcoal flex-shrink-0">
                            <img src={item.image_url} alt={item.title} className="w-full h-full object-cover opacity-60" />
                        </div>
                        <div className="flex flex-col justify-center">
                             <h4 className="font-serif text-lg text-luxury-gold">{item.title}</h4>
                             <p className="font-sans text-[8px] uppercase tracking-widest text-luxury-taupe mt-1">QTY: {item.quantity} • Bespoke Silk</p>
                             <p className="text-sm text-luxury-cream mt-2">₹{item.price.toLocaleString()}</p>
                        </div>
                    </div>
                ))}
             </div>
             
             <div className="pt-8 border-t border-luxury-taupe/10 space-y-4">
                <div className="flex justify-between font-sans text-[10px] uppercase tracking-widest text-luxury-taupe">
                    <span>Shipping</span>
                    <span className="text-luxury-gold">Complimentary</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                    <span className="text-2xl italic">Total</span>
                    <span className="text-3xl text-luxury-gold">₹{totalPrice.toLocaleString()}</span>
                </div>
             </div>

             <div className="mt-12 space-y-6">
                <div className="flex items-center gap-4 text-luxury-taupe">
                    <Truck size={14} className="text-luxury-gold/40" />
                    <p className="text-[8px] uppercase tracking-widest">Digital measurement profile will be attached</p>
                </div>
             </div>
           </div>
        </div>
      </div>
    </main>
  );
};
