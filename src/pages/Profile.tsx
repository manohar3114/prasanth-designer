import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabaseClient';
import { ArrowRight, Package, Calendar, Settings, LogOut, User as UserIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const { data: oData } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        const { data: aData } = await supabase
          .from('appointments')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: true });

        if (oData) setOrders(oData);
        if (aData) setAppointments(aData);
        setLoading(false);
      };
      fetchData();
    }
  }, [user]);

  if (!user) {
    return (
      <main className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-40 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mb-12">
            <UserIcon size={32} />
        </div>
        <h1 className="text-5xl mb-8">Access Your Profile</h1>
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-luxury-taupe max-w-sm leading-loose mb-16 px-4">
          Sign in to view your bespoke orders, measurement profile, and scheduled consultations.
        </p>
        <Link 
            to="/login"
            className="luxury-button px-16 inline-block"
        >
            Login to Atelier
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 border-b border-luxury-taupe/10 pb-16">
        <div className="flex items-center gap-8">
            <div className="w-24 h-24 bg-luxury-gold flex items-center justify-center text-luxury-black text-3xl font-serif">
                {user.email?.[0].toUpperCase()}
            </div>
            <div>
                <h1 className="text-4xl mb-2">{user.full_name || 'Client Profile'}</h1>
                <p className="font-sans text-[10px] uppercase tracking-widest text-luxury-taupe">{user.email}</p>
            </div>
        </div>
        <div className="flex gap-6">
            <button className="flex items-center gap-2 font-label text-luxury-taupe hover:text-luxury-gold transition-colors">
                <Settings size={14} /> Settings
            </button>
            <button 
                onClick={signOut}
                className="flex items-center gap-2 font-label text-red-400 hover:text-red-300 transition-colors"
            >
                <LogOut size={14} /> Sign Out
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Left: Orders */}
        <div className="lg:col-span-8 space-y-16">
            <section>
                <div className="flex justify-between items-center mb-12 border-b border-luxury-taupe/10 pb-6">
                    <h2 className="text-3xl flex items-center gap-4">
                        <Package size={24} className="text-luxury-gold" /> Bespoke Orders
                    </h2>
                    <span className="font-label text-luxury-taupe">{orders.length} ACTIVE</span>
                </div>
                
                {loading ? (
                    <div className="animate-pulse space-y-8">
                        {[1, 2].map(i => <div key={i} className="h-40 bg-luxury-charcoal" />)}
                    </div>
                ) : orders.length > 0 ? (
                    <div className="space-y-8">
                        {orders.map(order => (
                            <motion.div 
                                key={order.id}
                                whileHover={{ x: 10 }}
                                className="luxury-card p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group"
                            >
                                <div>
                                    <p className="font-label text-luxury-gold mb-3">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                                    <h3 className="text-xl text-luxury-cream mb-2 truncate max-w-xs">{order.tailoring_notes || 'Custom Commission'}</h3>
                                    <p className="font-sans text-[10px] text-luxury-taupe uppercase tracking-widest">Received: {new Date(order.created_at).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                    <span className="px-3 py-1 bg-luxury-gold/10 text-luxury-gold font-label text-[8px] mb-4 border border-luxury-gold/20">
                                        {order.status.toUpperCase()}
                                    </span>
                                    <div className="flex items-center gap-3 text-luxury-cream hover:text-luxury-gold transition-colors cursor-pointer">
                                        <span className="font-label text-[10px]">Track Progress</span>
                                        <ArrowRight size={14} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center border border-dashed border-luxury-taupe/20">
                        <p className="font-label text-luxury-taupe">No orders found.</p>
                        <Link to="/collections" className="text-luxury-gold font-label mt-6 inline-block underline underline-offset-8">Explore Collections</Link>
                    </div>
                )}
            </section>
        </div>

        {/* Right: Appointments & Sidebar */}
        <div className="lg:col-span-4 space-y-16">
            <section>
                 <div className="flex justify-between items-center mb-12 border-b border-luxury-taupe/10 pb-6">
                    <h2 className="text-2xl flex items-center gap-4">
                        <Calendar size={20} className="text-luxury-gold" /> Consultations
                    </h2>
                </div>
                {appointments.length > 0 ? (
                    <div className="space-y-6">
                        {appointments.map(apt => (
                            <div key={apt.id} className="p-8 bg-luxury-charcoal/40 border-l-2 border-luxury-gold">
                                <p className="font-serif text-3xl text-luxury-gold mb-2">{apt.date.split('-')[2]} <span className="text-sm font-sans uppercase tracking-[0.2em]">{new Date(apt.date).toLocaleString('default', { month: 'short' })}</span></p>
                                <p className="font-sans text-[10px] text-luxury-cream uppercase tracking-widest mb-1">{apt.time}</p>
                                <p className="font-sans text-[8px] text-luxury-taupe uppercase tracking-widest flex items-center gap-2">
                                    <Package size={8} /> Heritage Boutique Fitting
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 border border-luxury-taupe/10 text-center">
                        <p className="font-label text-luxury-taupe text-[8px] mb-8 leading-relaxed">No upcoming sessions. Private consultations ensure a perfect silhouette.</p>
                        <Link to="/appointments" className="luxury-button-outline w-full block">Book Session</Link>
                    </div>
                )}
            </section>

            <section className="p-10 bg-luxury-black border border-luxury-gold/5">
                <h3 className="font-label text-luxury-gold mb-10 pb-4 border-b border-luxury-taupe/10">Measurement Profile</h3>
                <div className="space-y-8">
                    <div className="flex justify-between border-b border-luxury-taupe/5 pb-2">
                        <span className="font-label text-[8px] text-luxury-taupe">LAST UPDATED</span>
                        <span className="font-label text-[8px] text-luxury-cream">OCT 2024</span>
                    </div>
                    <div className="space-y-6">
                         {['Bust', 'Waist', 'Hip'].map(dim => (
                            <div key={dim} className="flex justify-between items-end">
                                <span className="font-sans text-[10px] text-luxury-taupe uppercase tracking-widest">{dim}</span>
                                <span className="font-serif text-2xl text-luxury-gold">--</span>
                            </div>
                         ))}
                    </div>
                    <Link to="/measurements" className="w-full font-label text-luxury-gold mt-10 text-[8px] border border-luxury-gold/20 py-4 hover:bg-luxury-gold/5 text-center block">Update Bio-Metrics</Link>
                </div>
            </section>
        </div>
      </div>
    </main>
  );
};
