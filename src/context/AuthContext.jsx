/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../routes/routes';
import { api, createSession } from '../services/api/api';
import { jwtDecode } from 'jwt-decode';
import { showAlert } from '../utils/showAlert';

export const TokenContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const decodeToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {
        handleLogout();
      }

      return decodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
      handleLogout();
      return null;
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const { data } = await createSession(email, password);

      console.log(data);

      const loggedUser = decodeToken(data.token);

      console.log(loggedUser);

      if (loggedUser) {
        setUser(loggedUser);
        localStorage.setItem('token', data.token);
        api.defaults.headers.authorization = `Bearer ${data.token}`;
      }

      setLoading(false);
    } catch (error) {
      showAlert({
        message: error.response.data.description,
        type: 'error'
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    api.defaults.headers.authorization = null;

    setUser(null);
    navigate(routes.LOGIN);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const loggedUser = decodeToken(token);

      if (loggedUser) {
        setUser(loggedUser);
        api.defaults.headers.authorization = `Bearer ${token}`;
      }
    }

    setLoading(false);
  }, []);

  return (
    <TokenContext.Provider
      value={{
        authenticated: !!user,
        user,
        loading,
        handleLogin,
        handleLogout
      }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useAuth must be used within a TokenContextProvider');
  }
  return context;
}
