import React from 'react';
import { useCart } from '../../context/CartContext';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { formatPrice } from '../../utils/priceUtils';

export default function CartModal({ isOpen, onClose, onCheckout }) {
  const { state, dispatch } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#FFFBF7] rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto border-2 border-amber-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-amber-900">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-amber-800 hover:text-amber-900"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {state.items.length === 0 ? (
          <p className="text-amber-800 text-center py-4">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-amber-200 pb-4"
                >
                  <div>
                    <h3 className="font-medium text-amber-900">{item.name}</h3>
                    <p className="text-sm text-amber-700">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })
                    }
                    className="text-red-700 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-amber-200 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-amber-900">Total:</span>
                <span className="font-bold text-amber-900">
                  {formatPrice(state.total.toString())}₫
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="classic-button w-full"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}