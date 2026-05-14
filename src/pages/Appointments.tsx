import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, CheckCircle2, MapPin, Clock } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../hooks/useAuth';

export const Appointments: React.FC = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<number | null>(6);
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.full_name || '',
    email: user?.email || '',
    phone: '',
  });

  const slots = {
    morning: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'],
    afternoon: ['02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !timeSlot) return;
    setLoading(true);

    try {
      const { error } = await (supabase.from('appointments') as any).insert({
        user_id: user?.id,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        date: `2024-11-${selectedDate}`,
        time: timeSlot,
        status: 'scheduled',
      });

      if (error) throw error;
      setSubmitted(true);
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Unable to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="max-w-4xl mx-auto px-margin-desktop py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-7">
                <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-full bg-luxury-gold/20 border border-luxury-gold/30">
                    <CheckCircle2 size={32} className="text-luxury-gold" />
                </div>
                <h1 className="text-5xl md:text-7xl italic font-light mb-8">Your Bespoke Journey Begins.</h1>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-luxury-taupe leading-loose max-w-lg mb-12">
                   We have reserved a private consultation for you at our Heritage Boutique. Our master tailors are preparing to bring your vision to life with the precision of high-end Swiss design.
                </p>
            </div>
            <div className="lg:col-span-5 w-full">
                <div className="luxury-card border-luxury-gold/20">
                    <span className="font-label text-luxury-gold mb-6 block">Appointment Details</span>
                    <div className="space-y-12">
                        <div>
                             <p className="font-serif text-5xl text-luxury-gold mb-2">{selectedDate}</p>
                             <p className="text-xl text-luxury-cream">November, 2024</p>
                             <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-luxury-taupe mt-2">{timeSlot}</p>
                        </div>
                        <div className="flex items-start gap-4">
                            <MapPin className="text-luxury-gold shrink-0 mt-1" size={18} />
                            <div>
                                <p className="text-lg text-luxury-cream">Heritage Boutique</p>
                                <p className="font-sans text-[10px] text-luxury-taupe leading-relaxed uppercase tracking-widest">Plot 12, Savile Row, Mayfair, <br /> London W1S 3PQ </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-margin-desktop py-24">
      <section className="mb-24 flex flex-col md:flex-row gap-20 items-center">
        <div className="w-full md:w-1/2">
          <h1 className="text-display-lg-mobile md:text- display-lg leading-tight mb-8">Book a Boutique Consultation</h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-luxury-taupe max-w-xl leading-relaxed">
            Experience the pinnacle of quiet luxury. Secure a dedicated time with our master tailors to discuss your bespoke requirements, fabric selections, and precision measurements.
          </p>
        </div>
        <div className="w-full md:w-1/2 aspect-[4/5] bg-luxury-charcoal overflow-hidden border border-luxury-taupe/10">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop"
            alt="Boutique"
            className="w-full h-full object-cover grayscale opacity-60"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-16">
          {/* Calendar Picker */}
          <div className="luxury-card border-none bg-luxury-charcoal/40 p-10">
            <div className="flex justify-between items-center mb-10">
              <h3 className="font-label text-luxury-gold underline underline-offset-8 decoration-1">Select Date — November 2024</h3>
              <div className="flex gap-4">
                <button className="p-2 border border-luxury-taupe/20 hover:border-luxury-gold transition-colors text-luxury-taupe hover:text-luxury-gold"><ChevronLeft size={16} /></button>
                <button className="p-2 border border-luxury-taupe/20 hover:border-luxury-gold transition-colors text-luxury-taupe hover:text-luxury-gold"><ChevronRight size={16} /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center border-t border-luxury-taupe/5 pt-8">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                <div key={d} className="font-label text-[8px] text-luxury-taupe mb-4">{d}</div>
              ))}
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const isSelected = selectedDate === day;
                const isDisabled = day < 6;
                return (
                  <button
                    key={day}
                    onClick={() => !isDisabled && setSelectedDate(day)}
                    disabled={isDisabled}
                    className={`py-4 font-serif text-lg transition-all duration-300 ${
                      isSelected ? 'bg-luxury-gold text-luxury-black' : 
                      isDisabled ? 'opacity-10 cursor-not-allowed text-luxury-taupe' : 'hover:bg-luxury-gold/10 text-luxury-cream'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          <div className="space-y-12">
            <div>
              <h3 className="font-label text-luxury-gold mb-8 flex items-center gap-3"><Clock size={14} /> Morning Sessions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {slots.morning.map(s => (
                  <button
                    key={s}
                    onClick={() => setTimeSlot(s)}
                    className={`py-4 font-sans text-[10px] uppercase tracking-widest border transition-all ${
                      timeSlot === s ? 'bg-luxury-gold text-luxury-black border-luxury-gold' : 'border-luxury-taupe/20 text-luxury-taupe hover:border-luxury-gold'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-label text-luxury-gold mb-8 flex items-center gap-3"><Clock size={14} /> Afternoon Sessions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {slots.afternoon.map(s => (
                  <button
                    key={s}
                    onClick={() => setTimeSlot(s)}
                    className={`py-4 font-sans text-[10px] uppercase tracking-widest border transition-all ${
                      timeSlot === s ? 'bg-luxury-gold text-luxury-black border-luxury-gold' : 'border-luxury-taupe/20 text-luxury-taupe hover:border-luxury-gold'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form Sidebar */}
        <div className="lg:col-span-5">
           <form onSubmit={handleSubmit} className="luxury-card sticky top-32 p-12">
                <h3 className="text-3xl mb-12 border-b border-luxury-taupe/10 pb-6">Client Details</h3>
                <div className="space-y-10">
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
                            placeholder="+44 20 0000 0000" 
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || !selectedDate || !timeSlot}
                    className="luxury-button w-full mt-16 py-6"
                >
                    {loading ? 'Processing...' : 'Confirm Appointment'}
                </button>
                <p className="text-center mt-6 font-sans text-[9px] uppercase tracking-widest text-luxury-taupe/60 italic leading-relaxed">
                    Consultations are approximately 45 minutes. <br /> A confirmation email will be sent upon booking.
                </p>
           </form>
        </div>
      </div>
    </main>
  );
};
