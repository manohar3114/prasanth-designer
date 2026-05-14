import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-luxury-black border-t border-luxury-taupe/10 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-margin-desktop">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
                    {/* Brand Section */}
                    <div className="lg:col-span-4">
                        <Link to="/" className="text-3xl font-serif tracking-tighter text-luxury-gold mb-8 block">
                            Prasanth <span className="italic font-light">Designers</span>
                        </Link>
                        <p className="font-sans text-xs text-luxury-taupe leading-loose uppercase tracking-widest max-w-sm mb-12">
                            Bespoke tailoring and minimal design since 1994. Every piece is a dialogue between tradition and modernity.
                        </p>
                        <div className="flex gap-6 text-luxury-taupe">
                            <a href="#" className="hover:text-luxury-gold transition-colors"><Instagram size={20} strokeWidth={1} /></a>
                            <a href="#" className="hover:text-luxury-gold transition-colors"><Facebook size={20} strokeWidth={1} /></a>
                            <a href="#" className="hover:text-luxury-gold transition-colors"><Twitter size={20} strokeWidth={1} /></a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="lg:col-span-2">
                        <h4 className="font-label text-luxury-gold mb-10">Collections</h4>
                        <ul className="space-y-6 font-sans text-[10px] text-luxury-taupe uppercase tracking-widest">
                            <li><Link to="/collections" className="hover:text-luxury-cream transition-colors">Signature Designs</Link></li>
                            <li><Link to="/collections" className="hover:text-luxury-cream transition-colors">Bridal Atelier</Link></li>
                            <li><Link to="/collections" className="hover:text-luxury-cream transition-colors">Minimal Series</Link></li>
                            <li><Link to="/custom-order" className="hover:text-luxury-cream transition-colors">Bespoke Orders</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="font-label text-luxury-gold mb-10">Atelier</h4>
                        <ul className="space-y-6 font-sans text-[10px] text-luxury-taupe uppercase tracking-widest">
                            <li><Link to="/appointments" className="hover:text-luxury-cream transition-colors">Book Fitting</Link></li>
                            <li><Link to="/contact" className="hover:text-luxury-cream transition-colors">Contact Us</Link></li>
                            <li><Link to="/profile" className="hover:text-luxury-cream transition-colors">Client Profile</Link></li>
                            <li><Link to="/faq" className="hover:text-luxury-cream transition-colors">Care Guide</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-4">
                        <h4 className="font-label text-luxury-gold mb-10">Newsletter</h4>
                        <p className="font-serif text-lg text-luxury-cream mb-8 italic">Receive invitations to private viewings and new collections.</p>
                        <div className="flex border-b border-luxury-taupe/20 pb-2 mb-12">
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className="bg-transparent border-none outline-none flex-grow text-luxury-cream font-sans text-xs focus:ring-0"
                            />
                            <button className="font-label text-luxury-gold hover:opacity-70 transition-opacity">Subscribe</button>
                        </div>
                        <div className="space-y-4 font-sans text-[10px] text-luxury-taupe uppercase tracking-widest leading-relaxed">
                            <div className="flex items-center gap-3">
                                <MapPin size={12} className="text-luxury-gold" />
                                12 Savile Row, Mayfair, London
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={12} className="text-luxury-gold" />
                                +44 20 1234 5678
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-luxury-taupe/10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="font-sans text-[9px] text-luxury-taupe/60 uppercase tracking-[0.2em]">
                        © {currentYear} Prasanth Designers. All Rights Reserved.
                    </p>
                    <div className="flex gap-12 font-sans text-[9px] text-luxury-taupe/60 uppercase tracking-[0.2em]">
                        <a href="#" className="hover:text-luxury-gold">Privacy Policy</a>
                        <a href="#" className="hover:text-luxury-gold">Terms of Service</a>
                        <a href="#" className="hover:text-luxury-gold">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
