import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Ruler, Save, Info, CheckCircle2, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../hooks/useAuth';

export const Measurements: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const measurementFields = [
    { label: 'Bust Circumference', name: 'bust' },
    { label: 'Natural Waist', name: 'waist' },
    { label: 'Full Hip', name: 'hip' },
    { label: 'Across Shoulder', name: 'shoulder' },
    { label: 'Sleeve Length', name: 'sleeve' },
    { label: 'Total Length', name: 'length' },
    { label: 'Neck to Waist', name: 'neck_to_waist' },
    { label: 'Arm Hole', name: 'arm_hole' }
  ];

  const [measurements, setMeasurements] = useState<Record<string, string>>({});

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in to save your measurements.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await (supabase.from('measurements') as any).upsert({
        user_id: user.id,
        data: measurements,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

      if (error) throw error;
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving measurements:', error);
      alert('Failed to save measurements.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-24">
      <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="max-w-2xl">
          <span className="font-label text-luxury-gold mb-6 block">Precision Bio-Metrics</span>
          <h1 className="text-display-lg-mobile md:text-display-lg leading-tight mb-8">Digital <br /><span className="italic font-light">Silhouette Profile</span></h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-luxury-taupe leading-loose">
            Your anatomical profile is the master blueprint for every bespoke piece. We maintain a secure digital archive of your dimensions to ensure consistency across all future commissions.
          </p>
        </div>
        {!user && (
           <div className="p-8 border border-luxury-gold/20 bg-luxury-gold/5 flex items-center gap-4">
              <Info className="text-luxury-gold" size={20} />
              <p className="font-label text-[8px] text-luxury-gold uppercase tracking-widest">Sign in to sync these dimensions with your atelier profile.</p>
           </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-8">
            <form onSubmit={handleSave} className="luxury-card p-12 md:p-20 bg-luxury-charcoal/30 border-luxury-taupe/10">
                <div className="flex items-center gap-6 mb-20 border-b border-luxury-taupe/10 pb-10">
                    <Ruler size={32} className="text-luxury-gold" strokeWidth={1} />
                    <h2 className="text-4xl">Calibration Form</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
                    {measurementFields.map((field) => (
                        <div key={field.name} className="group">
                             <div className="flex justify-between items-end mb-4">
                                <label className="font-label text-luxury-taupe group-hover:text-luxury-gold transition-colors">{field.label}</label>
                                <span className="font-serif text-[10px] italic text-luxury-taupe/40">cm</span>
                             </div>
                             <input 
                                type="number" 
                                step="0.1"
                                className="luxury-input w-full p-4 border-luxury-taupe/10 focus:border-luxury-gold transition-colors text-2xl font-serif"
                                placeholder="00.0"
                                value={measurements[field.name] || ''}
                                onChange={(e) => setMeasurements({...measurements, [field.name]: e.target.value})}
                             />
                        </div>
                    ))}
                </div>

                <div className="mt-24 pt-12 border-t border-luxury-taupe/10">
                    <button 
                        type="submit"
                        disabled={loading || !user}
                        className="luxury-button w-full py-8 flex items-center justify-center gap-4 disabled:opacity-50"
                    >
                        {success ? (
                            <><CheckCircle2 size={24} /> PROFILE CALIBRATED</>
                        ) : (
                            <><Save size={20} /> {loading ? 'CALIBRATING...' : 'UPDATE DIGITAL BLUEPRINT'}</>
                        )}
                    </button>
                    <p className="text-center mt-8 font-sans text-[8px] uppercase tracking-[0.3em] text-luxury-taupe leading-relaxed">
                        By updating, you authorize the atelier to use these revised dimensions for all active commissions.
                    </p>
                </div>
            </form>
        </div>

        {/* Sidebar: Visual Guide */}
        <div className="lg:col-span-4 space-y-12">
            <section className="luxury-card border-none bg-luxury-ink p-12">
                <h3 className="font-label text-luxury-gold mb-10 pb-4 border-b border-luxury-gold/10">Measurement Protocol</h3>
                <ul className="space-y-8 font-sans text-[10px] text-luxury-taupe uppercase tracking-widest leading-loose">
                    <li className="flex gap-4">
                         <span className="text-luxury-gold">01.</span> Hold the tape firm but not restrictive around the widest part of each area.
                    </li>
                    <li className="flex gap-4">
                         <span className="text-luxury-gold">02.</span> Stand naturally upright with feet slightly apart.
                    </li>
                    <li className="flex gap-4">
                         <span className="text-luxury-gold">03.</span> For architectural symmetry, have an associate record the values.
                    </li>
                </ul>
            </section>

            <div className="aspect-[4/5] bg-luxury-charcoal relative overflow-hidden border border-luxury-taupe/10">
                 <img 
                    src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2670&auto=format&fit=crop" 
                    alt="Mannequin"
                    className="w-full h-full object-cover opacity-40 grayscale"
                />
                <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-luxury-black to-transparent">
                    <h4 className="font-serif text-3xl text-luxury-gold mb-4 italic">"The Human Architecture."</h4>
                    <p className="font-sans text-[8px] uppercase tracking-widest text-luxury-taupe">Precision Atelier Standard / Since 1994</p>
                </div>
            </div>
            
            <button className="w-full luxury-button-outline py-6 flex items-center justify-center gap-3">
                Request Virtual Fitting <ChevronRight size={14} />
            </button>
        </div>
      </div>
    </main>
  );
};
