import React, { useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { Upload, Info, CheckCircle2, Ruler, ClipboardEdit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CustomOrder: React.FC = () => {
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: user?.full_name || '',
    email: user?.email || '',
    phone: '',
    notes: '',
    address: '',
  });

  const [measurements, setMeasurements] = useState({
    bust: '',
    waist: '',
    hip: '',
    shoulder: '',
    sleeve: '',
    length: '',
  });

  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create Order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          status: 'pending',
          total_price: totalPrice,
          tailoring_notes: formData.notes,
          delivery_address: formData.address,
        } as any)
        .select()
        .single();

      if (orderError || !order) {
        throw orderError || new Error('Failed to create order');
      }

      // 2. Save Measurements
      await (supabase.from('measurements') as any).insert({
        order_id: (order as any).id,
        user_id: user?.id,
        data: measurements,
      });

      // 3. Upload Images
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `orders/${(order as any).id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('orders')
          .upload(filePath, file);

        if (!uploadError) {
          const { data: urlData } = supabase.storage.from('orders').getPublicUrl(filePath);
          await (supabase.from('uploads') as any).insert({
            order_id: (order as any).id,
            user_id: user?.id,
            file_url: urlData.publicUrl,
            file_type: file.type,
          });
        }
      }

      setSubmitted(true);
      clearCart();
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error submitting your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="max-w-2xl mx-auto px-margin-desktop py-40 text-center">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="mb-12 flex justify-center text-luxury-gold"
        >
          <CheckCircle2 size={100} strokeWidth={1} />
        </motion.div>
        <h1 className="text-5xl mb-8 font-light">Order Received.</h1>
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-luxury-taupe leading-loose mb-16">
          Thank you for choosing Prasanth Designer's for your bespoke journey. Our lead draper will contact you within 24 hours to confirm your swatch preferences and measurement profile.
        </p>
        <div className="flex flex-col gap-6">
            <button 
                onClick={() => navigate('/profile')}
                className="luxury-button"
            >
                View Order Status
            </button>
            <button 
                onClick={() => navigate('/')}
                className="luxury-button-outline"
            >
                Return to Home
            </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-margin-desktop py-24">
      <header className="mb-20">
        <h1 className="text-display-lg-mobile md:text-6xl mb-8">Bespoke Commission</h1>
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-luxury-taupe max-w-2xl leading-relaxed">
          Precision tailoring meets your unique vision. Complete your commission details below to begin the craftsmanship process.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-20">
          {/* Section 1: Personal Details */}
          <section className="space-y-10">
            <h3 className="font-label text-luxury-gold flex items-center gap-3">
               <ClipboardEdit size={14} /> 01. Client Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="font-label text-[8px] text-luxury-taupe">Full Name</label>
                <input 
                  type="text" 
                  className="luxury-input" 
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  placeholder="Eleanor Vance" 
                />
              </div>
              <div className="space-y-2">
                <label className="font-label text-[8px] text-luxury-taupe">Email Address</label>
                <input 
                  type="email" 
                  className="luxury-input" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="eleanor@vance.com" 
                />
              </div>
              <div className="space-y-2">
                <label className="font-label text-[8px] text-luxury-taupe">Phone Number</label>
                <input 
                  type="tel" 
                  className="luxury-input" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+91 00000 00000" 
                />
              </div>
              <div className="space-y-2">
                <label className="font-label text-[8px] text-luxury-taupe">Delivery Address</label>
                <input 
                  type="text" 
                  className="luxury-input" 
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Your atelier delivery address" 
                />
              </div>
            </div>
          </section>

          {/* Section 2: Reference Images */}
          <section className="space-y-10">
            <h3 className="font-label text-luxury-gold flex items-center gap-3">
               <Upload size={14} /> 02. Reference Imagery
            </h3>
            <div className="border-2 border-dashed border-luxury-taupe/10 bg-luxury-charcoal/30 p-12 text-center group hover:border-luxury-gold/50 transition-colors">
              <Upload className="mx-auto mb-6 text-luxury-taupe group-hover:text-luxury-gold transition-colors" size={32} strokeWidth={1} />
              <p className="font-sans text-[10px] uppercase tracking-widest text-luxury-cream mb-2">Drag and drop inspiration sketches or fabric photos</p>
              <p className="text-[8px] text-luxury-taupe mb-8 uppercase">MAX SIZE 10MB (JPG, PNG)</p>
              <label className="luxury-button-outline cursor-pointer px-10">
                Browse Files
                <input type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
              {files.length > 0 && (
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  {files.map((f, i) => (
                    <div key={i} className="px-3 py-1 bg-luxury-gold text-luxury-black font-label text-[8px]">
                      {f.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Section 3: Tailoring Instructions */}
          <section className="space-y-10">
            <h3 className="font-label text-luxury-gold flex items-center gap-3">
               <Info size={14} /> 04. Tailoring Instructions
            </h3>
            <textarea 
              className="luxury-input min-h-[200px] border border-luxury-taupe/10 p-6 bg-luxury-charcoal/30"
              placeholder="Detail your fabric preferences, finishing requirements, or specific design modifications..."
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </section>
        </div>

        {/* Section 4: Measurements Sidebar */}
        <div className="lg:col-span-5">
          <div className="luxury-card sticky top-32">
            <h3 className="font-label text-luxury-gold mb-12 border-b border-luxury-taupe/10 pb-6 flex items-center gap-3">
              <Ruler size={14} /> 03. Precision Dimensions (CM)
            </h3>
            <div className="space-y-10">
              {['Bust', 'Waist', 'Hip', 'Shoulder', 'Sleeve', 'Length'].map((field) => (
                <div key={field} className="flex items-center justify-between group">
                  <label className="font-label text-luxury-taupe group-hover:text-luxury-gold transition-colors">{field}</label>
                  <input 
                    type="number" 
                    className="w-24 bg-transparent border-b border-luxury-taupe/20 text-right font-serif text-2xl text-luxury-gold focus:border-luxury-gold outline-none" 
                    placeholder="00"
                    value={measurements[field.toLowerCase() as keyof typeof measurements]}
                    onChange={(e) => setMeasurements({...measurements, [field.toLowerCase()]: e.target.value})}
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-16 bg-luxury-black/50 p-6 flex gap-4 border border-luxury-taupe/5">
              <Info size={16} className="text-luxury-gold shrink-0 mt-1" />
              <p className="font-sans text-[9px] leading-relaxed text-luxury-taupe uppercase tracking-widest">
                Measurements should be taken with a soft tape while wearing lightweight base layers for architectural precision.
              </p>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="luxury-button w-full mt-12 py-6 disabled:opacity-50"
            >
              {loading ? 'Processing Commission...' : 'Submit Bespoke Order'}
            </button>
            <p className="text-center mt-6 font-serif text-sm italic text-luxury-gold/50">
               Current atelier queue: 14–21 business days
            </p>
          </div>
        </div>
      </form>
    </main>
  );
};
