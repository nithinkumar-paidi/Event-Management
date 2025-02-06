// src/utils/adminAxios.js
import axios from 'axios';

const adminAxios = axios.create({
  baseURL: 'http://localhost:5001/api/admin', // Update to match your server port
  headers: {
    'Content-Type': 'application/json'
  }
});


adminAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default adminAxios;