import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    // Validate token with backend and fetch current user
    axios.get(`${BACKEND}/api/user/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        const token= resp.data?.user || resp.data;
        const u = jwtDecode(token);
        setUser(u);
      })
      .catch(err => {
        console.warn('Token validation failed:', err?.response?.data || err.message);
        localStorage.removeItem('token');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (token) => {
    localStorage.setItem('token', token);
    try{
      const resp = await axios.get(`${BACKEND}/api/user/me`, { headers: { Authorization: `Bearer ${token}` } });
      const token= resp.data?.user || resp.data;
      const u = jwtDecode(token);
      setUser(u);
    }catch(err){
      // fallback to decoding token if backend /me fails
      try{
        const decoded = jwtDecode(token);
        setUser(decoded);
      }catch(e){
        console.error('Invalid token on login', e);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
