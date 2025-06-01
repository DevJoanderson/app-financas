import axios from 'axios';

// 🔐 API protegida (com token) - para despesas, etc.
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 🔓 API pública (sem token) - para login e cadastro
export const apiAuth = axios.create({
  baseURL: 'http://localhost:4000/api/auth',
});

export default api;
