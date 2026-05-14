import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { AuthProvider } from './hooks/useAuth';
import { CartProvider } from './hooks/useCart';
import { Home } from './pages/Home';
import { Collections } from './pages/Collections';
import { DesignDetail } from './pages/DesignDetail';
import { Cart } from './pages/Cart';
import { CustomOrder } from './pages/CustomOrder';
import { Appointments } from './pages/Appointments';
import { Measurements } from './pages/Measurements';
import { Contact } from './pages/Contact';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen pt-20 bg-luxury-black text-luxury-cream">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/designs/:id" element={<DesignDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/custom-order" element={<CustomOrder />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/measurements" element={<Measurements />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
