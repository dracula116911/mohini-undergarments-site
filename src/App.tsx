import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';

// Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Hero from './components/Home/Hero';
import FeaturedProducts from './components/Home/FeaturedProducts';
import Testimonials from './components/Home/Testimonials';
import ProductGrid from './components/Shop/ProductGrid';
import WishlistPage from './components/Wishlist/WishlistPage';
import CartPage from './components/Cart/CartPage';
import AboutPage from './components/About/AboutPage';
import ContactPage from './components/Contact/ContactPage';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import SizeGuidePage from './components/SizeGuide/SizeGuidePage';
import SearchPage from './components/Search/SearchPage';
import { useWishlist } from './context/WishlistContext';
import { useCart } from './context/CartContext';
import { Product } from './lib/supabase';
import ProductDetailPage from './components/Shop/ProductDetailPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const { wishlist } = useWishlist(); // ✅ pull from hook so changes reflect in header
  const { cartItems } = useCart();    // ✅ same for cart
  const handleNavigation = (page: string, product?: Product) => {
    setCurrentPage(page);
    if (product) {
      setCurrentProduct(product);
    }
  };




  const handleAdminLogin = (admin: any) => {
    setIsAdminLoggedIn(true);
    setCurrentAdmin(admin);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentAdmin(null);
    setCurrentPage('home');
  };

  // Admin panel
  if (currentPage === 'admin') {
    if (!isAdminLoggedIn) {
      return <AdminLogin onLogin={handleAdminLogin} />;
    }
    return <AdminDashboard admin={currentAdmin} onLogout={handleAdminLogout} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={handleNavigation} />
            <FeaturedProducts onNavigate={handleNavigation} />
            <Testimonials />
          </>
        );
      case 'shop':
        return <ProductGrid onNavigate={handleNavigation} />;
      case 'cart':
        return <CartPage onNavigate={handleNavigation} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'size-guide':
        return <SizeGuidePage onNavigate={handleNavigation} />;
      case 'wishlist':
        return <WishlistPage onNavigate={handleNavigation} />;
      case 'search':
        return <SearchPage onNavigate={handleNavigation} />;
      case 'product':
        return currentProduct ? (
          <ProductDetailPage product={currentProduct} onNavigate={handleNavigation} />
        ) : null;

      default:
        return (
          <>
            <Hero onNavigate={handleNavigation} />
            <FeaturedProducts onNavigate={handleNavigation} />
            <Testimonials />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />

      <Header onNavigate={handleNavigation} currentPage={currentPage} />

      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer />

      {/* Admin Access Button - Hidden but accessible */}
      <button
        onClick={() => handleNavigation('admin')}
        className="fixed bottom-4 right-4 w-8 h-8 bg-gray-800 text-white rounded-full opacity-10 hover:opacity-100 transition-opacity text-xs"
        title="Admin Access"
      >
        A
      </button>
    </div>
  );
}

export default App;