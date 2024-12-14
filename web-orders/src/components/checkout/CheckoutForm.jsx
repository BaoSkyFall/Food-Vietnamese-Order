import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/priceUtils';
import { orderService } from '../../services/api';

export default function CheckoutForm({ onClose }) {
  const { state, dispatch } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        customerInfo: formData,
        items: state.items,
        total: state.total,
        orderDate: new Date().toISOString(),
        status: 'pending'
      };

      await orderService.createOrder(orderData);
      
      dispatch({ type: 'CLEAR_CART' });
      alert('Order placed successfully! You will receive notifications about your order status.');
      onClose();
    } catch (error) {
      alert('Failed to place order. Please try again.');
      console.error('Order submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#FFFBF7] rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto border-2 border-amber-200">
        <h2 className="text-2xl font-bold text-amber-900 mb-6 font-display">Checkout</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-amber-200 rounded-lg 
                       focus:ring-2 focus:ring-amber-500 focus:border-amber-500
                       bg-amber-50 text-amber-900 placeholder-amber-400"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-amber-200 rounded-lg 
                       focus:ring-2 focus:ring-amber-500 focus:border-amber-500
                       bg-amber-50 text-amber-900 placeholder-amber-400"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">
              Delivery Address
            </label>
            <textarea
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-amber-200 rounded-lg 
                       focus:ring-2 focus:ring-amber-500 focus:border-amber-500
                       bg-amber-50 text-amber-900 placeholder-amber-400"
              placeholder="Enter your delivery address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-800 mb-1">
              Special Instructions (Optional)
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows="2"
              className="w-full px-3 py-2 border border-amber-200 rounded-lg 
                       focus:ring-2 focus:ring-amber-500 focus:border-amber-500
                       bg-amber-50 text-amber-900 placeholder-amber-400"
              placeholder="Any special instructions for your order?"
            />
          </div>

          <div className="border-t border-amber-200 pt-4 mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-amber-900">Total Amount:</span>
              <span className="font-bold text-amber-900">
                {formatPrice(state.total.toString())}₫
              </span>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 bg-amber-50 text-amber-800 py-2 rounded-lg 
                       hover:bg-amber-100 transition-colors border border-amber-200
                       disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 classic-button disabled:opacity-50"
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}