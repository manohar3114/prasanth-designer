import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, User as UserIcon, ShoppingBag, Calendar, Ruler, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../hooks/useCart';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { items } = useCart();

  const navLinks = [
    { name: 'Collections', href: '/collections' },
    { name: 'Custom Order', href: '/custom-order' },
    { name: 'Appointments', href: '/appointments' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-luxury-black/90 backdrop-blur-lg border-b border-luxury-taupe/10">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0">
            <NavLink to="/" className="font-serif text-xl tracking-[0.2em] font-medium text-luxury-gold">
              PRASANTH <span className="font-light italic opacity-80">Designers</span>
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `font-sans text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive ? 'text-luxury-gold' : 'text-luxury-cream/60 hover:text-luxury-gold'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            
            <div className="flex items-center space-x-6 pl-6 border-l border-luxury-taupe/20">
              <Link to="/cart" className="relative text-luxury-cream/60 hover:text-luxury-gold transition-colors">
                <ShoppingBag size={18} strokeWidth={1.5} />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>
              <NavLink to="/profile" className="text-luxury-cream/60 hover:text-luxury-gold transition-colors">
                <UserIcon size={18} strokeWidth={1.5} />
              </NavLink>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-6">
            <Link to="/cart" className="relative text-luxury-cream/60">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-luxury-gold focus:outline-none"
            >
              {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-luxury-ink border-b border-luxury-taupe/10"
          >
            <div className="px-6 py-12 flex flex-col space-y-8 items-center">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-sans text-[12px] uppercase tracking-[0.3em] font-semibold text-luxury-cream/80 hover:text-luxury-gold transition-colors"
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-8 border-t border-luxury-taupe/10 w-full flex justify-center space-x-8">
                <NavLink
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="font-sans text-[10px] uppercase tracking-[0.2em] text-luxury-gold"
                >
                  Profile
                </NavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
