import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CustomerHeader from './CustomerHeader';
import Footer from './Footer';

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('menu');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Path check
  const hideLayoutPaths = ['/', '/login', '/register', '/forgot-password'];
  const showLayout = !hideLayoutPaths.includes(location.pathname.toLowerCase());

  // Check if current path is admin path
  const isAdminPath = location.pathname.toLowerCase().startsWith('/admin');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Ensure role is cleared
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Sirf tab dikhaye jab path admin na ho aur layout enabled ho */}
      {showLayout && !isAdminPath && (
        <CustomerHeader 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cartCount={cartCount}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          handleLogout={handleLogout}
        />
      )}
      
      <main className="flex-grow overflow-y-auto scroll-smooth">
        {children}
        
        {/* Footer bhi tabhi dikhaye jab admin na ho */}
        {showLayout && !isAdminPath && <Footer />}
      </main>
    </div>
  );
}