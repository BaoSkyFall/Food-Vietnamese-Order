import React, { useState } from 'react';
import MenuHeader from './components/MenuHeader';
import CategoryTabs from './components/CategoryTabs';
import MenuGrid from './components/MenuGrid';
import Footer from './components/Footer';
import CartIcon from './components/cart/CartIcon';
import CartModal from './components/cart/CartModal';
import CheckoutForm from './components/checkout/CheckoutForm';
import { CartProvider } from './context/CartContext';
import { menuCategories } from './constants/categories';
import { menuItems } from './constants/menuItems';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const filteredItems = menuItems.filter(
    item => item.categoryId === menuCategories[selectedCategory].id
  );

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-orange-50 flex flex-col">
        <MenuHeader />
        <CartIcon onClick={() => setIsCartOpen(true)} />
        <div className="max-w-7xl mx-auto px-4 py-6 flex-grow">
          <CategoryTabs
            categories={menuCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <MenuGrid items={filteredItems} />
        </div>
        <Footer />
        
        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={handleCheckout}
        />
        
        {isCheckoutOpen && (
          <CheckoutForm onClose={() => setIsCheckoutOpen(false)} />
        )}
      </div>
    </CartProvider>
  );
}

export default App;