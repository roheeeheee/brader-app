import axios from 'axios';

const API = axios.create({
  baseURL: 'https://brader-app.vercel.app/api',
});

// Automatically attach the token to every request if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;