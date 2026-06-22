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

  const hideLayoutPaths = ['/', '/login', '/register', '/forgot-password'];
  const showLayout = !hideLayoutPaths.includes(location.pathname.toLowerCase());

  const handleLogout = () => {
    localStorage.removeItem('isCustomerLoggedIn');
    navigate('/login');
  };

  return (
    // 'h-screen' aur 'overflow-hidden' lagane se pura page layout fix ho jata hai
    <div className="flex flex-col h-screen overflow-hidden">
      {showLayout && (
        <CustomerHeader 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cartCount={cartCount}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          handleLogout={handleLogout}
        />
      )}
      
      {/* Scroll sirf 'main' content ke andar hoga, jisse header/footer stable rahenge */}
      <main className="flex-grow overflow-y-auto scroll-smooth">
        {children}
        
        {/* Footer ko main content ke niche rakha gaya hai taaki scroll ke saath move kare */}
        {showLayout && <Footer />}
      </main>
    </div>
  );
}