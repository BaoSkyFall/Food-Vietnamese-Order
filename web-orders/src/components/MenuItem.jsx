import React, { useState } from 'react';
import { FaFire, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

export default function MenuItem({ item }) {
  const [quantity, setQuantity] = useState(0);
  const { dispatch } = useCart();

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(0, prev - 1));
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          ...item,
          quantity,
        },
      });
      setQuantity(0);
    }
  };

  return (
    <div className="menu-card">
      <div className="h-56 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover menu-item-image"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-amber-900">{item.name}</h3>
          {item.isPopular && (
            <span className="bg-red-50 text-red-800 text-xs px-3 py-1 rounded-full font-medium border border-red-200">
              Popular
            </span>
          )}
        </div>
        <p className="text-amber-800 text-sm mb-4 min-h-[40px]">{item.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-amber-900 text-lg font-bold">{item.price}</span>
          <div className="flex items-center space-x-1">
            {[...Array(item.spicyLevel)].map((_, index) => (
              <FaFire 
                key={index} 
                className="spicy-icon w-4 h-4" 
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDecrement}
              className="quantity-button"
              disabled={quantity === 0}
            >
              <FaMinus className="w-3 h-3" />
            </button>
            <span className="font-medium text-amber-900 w-8 text-center">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="quantity-button"
            >
              <FaPlus className="w-3 h-3" />
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={quantity === 0}
            className="classic-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}