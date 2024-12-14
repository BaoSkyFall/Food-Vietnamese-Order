import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const orderService = {
  async createOrder(orderData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
};