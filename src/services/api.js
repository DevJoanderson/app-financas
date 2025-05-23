import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Confere com o server.js
});

// Interceptor para incluir o token JWT automaticamente nas requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
