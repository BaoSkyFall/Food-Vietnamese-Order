import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

export default function CartIcon({ onClick }) {
  const { state } = useCart();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <button
      onClick={onClick}
      className="fixed top-4 right-4 bg-amber-800 text-amber-50 p-3 rounded-full shadow-lg 
                 hover:bg-amber-900 transition-colors z-50 border-2 border-amber-900"
    >
      <FaShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs w-6 h-6 
                        rounded-full flex items-center justify-center border-2 border-amber-50">
          {itemCount}
        </span>
      )}
    </button>
  );
}