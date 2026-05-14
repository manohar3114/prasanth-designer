import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, LogIn, UserPlus, ArrowRight, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate, useLocation } from 'react-router-dom';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/profile';

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate(from, { replace: true });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'An authentication error occurred');
    } finally {
      setLoading(false);
    }
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
          <h2 className="text-3xl mb-6 italic">Welcome to the Atelier</h2>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-luxury-taupe leading-loose mb-12">
            Verification required. Please check your email inbox to confirm your digital profile.
          </p>
          <button 
            onClick={() => setIsLogin(true) || setSuccess(false)}
            className="luxury-button w-full py-6"
          >
            Go to Login
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-24 min-h-[80vh] flex items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-20 items-center">
        {/* Visual Storytelling */}
        <div className="hidden lg:block space-y-12">
          <span className="font-label text-luxury-gold mb-6 block">Client Gateway</span>
          <h1 className="text-display-lg leading-tight">Secure Your <br /><span className="italic font-light">Digital Silhouette</span></h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-luxury-taupe leading-loose max-w-sm">
            Access your curated gallery, track active commissions, and manage your precision measurements in our secure vault.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-12">
             <div className="border-l border-luxury-gold/30 pl-6">
                <p className="font-serif text-3xl text-luxury-gold mb-2">100%</p>
                <p className="font-label text-[8px] text-luxury-taupe">ENCRYPTED PROFILE</p>
             </div>
             <div className="border-l border-luxury-gold/30 pl-6">
                <p className="font-serif text-3xl text-luxury-gold mb-2">24/7</p>
                <p className="font-label text-[8px] text-luxury-taupe">ATELIER ACCESS</p>
             </div>
          </div>
        </div>

        {/* Auth Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="luxury-card p-10 md:p-16 border-luxury-gold/10">
            <div className="flex justify-between items-center mb-16">
              <h2 className="text-3xl italic">{isLogin ? 'Sign In' : 'Create Profile'}</h2>
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="font-label text-luxury-gold text-[10px] underline underline-offset-8 decoration-luxury-gold/30 hover:decoration-luxury-gold transition-all"
              >
                {isLogin ? 'Join Atelier' : 'Standard Login'}
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-10">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 font-sans text-[10px] uppercase tracking-widest text-center">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <label className="font-label text-[8px] text-luxury-taupe">EMAIL ADDRESS</label>
                   <Mail size={12} className="text-luxury-gold/30" />
                </div>
                <input 
                  type="email" 
                  className="luxury-input text-2xl font-serif py-4"
                  placeholder="name@luxury.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                   <label className="font-label text-[8px] text-luxury-taupe">ACCESS KEY</label>
                   <Lock size={12} className="text-luxury-gold/30" />
                </div>
                <input 
                  type="password" 
                  className="luxury-input text-2xl font-serif py-4"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="luxury-button w-full py-8 flex items-center justify-center gap-4 group"
              >
                {loading ? 'Processing...' : (
                  <>
                    {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                    {isLogin ? 'Access Profile' : 'Register Profile'}
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-16 pt-10 border-t border-luxury-taupe/10 text-center">
              <p className="font-sans text-[8px] text-luxury-taupe uppercase tracking-[0.3em] leading-loose">
                By accessing the atelier, you agree to our <br />
                <span className="text-luxury-cream">Terms of Engagement</span> and <span className="text-luxury-cream">Privacy Protocol</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
