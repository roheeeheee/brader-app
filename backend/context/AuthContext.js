import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

// Added 'export' here so LoginPage.js can import { AuthContext }
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Automatically check for token and fetch user on app start
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        // Set the default Authorization header for all future API calls
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          // Fetch current user data from backend (GET /api/auth/me)
          const { data } = await API.get('/auth/me');
          setUser(data);
        } catch (err) {
          console.error('Session expired or invalid token');
          localStorage.removeItem('token');
          delete API.defaults.headers.common['Authorization'];
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await API.post('/auth/login', { email, password });
      
      // 1. Store token
      localStorage.setItem('token', data.token);
      
      // 2. Set Axios header for subsequent requests
      API.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      // 3. Update state
      setUser(data.user);
      
      // IMPORTANT: Return user for the LoginPage redirect logic
      return data.user;
    } catch (err) {
      // Clear any partial state on failure
      localStorage.removeItem('token');
      delete API.defaults.headers.common['Authorization'];
      setUser(null);
      throw err; // Re-throw so LoginPage.js can catch and display the error
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const { data } = await API.post('/auth/register', userData);
      localStorage.setItem('token', data.token);
      API.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data.user);
      return data.user;
    } catch (err) {
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    delete API.defaults.headers.common['Authorization'];
    setUser(null);
    window.location.href = '/login'; // Force redirect to login
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};