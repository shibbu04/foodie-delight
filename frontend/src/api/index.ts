import axios from 'axios';
import { useAuth } from '../stores/authStore';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = useAuth.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const register = async (username: string, password: string) => {
  const response = await api.post('/auth/register', { username, password });
  return response.data;
};

export const getMenu = async () => {
  const response = await api.get('/menu');
  return response.data;
};

export const createOrder = async (orderData: any) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export default api;