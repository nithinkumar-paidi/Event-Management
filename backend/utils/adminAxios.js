// utils/adminAxios.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const adminAxios = axios.create({
  baseURL: 'http://localhost:5001',  // Adjust this URL based on your server's configuration
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
adminAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
adminAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default adminAxios;