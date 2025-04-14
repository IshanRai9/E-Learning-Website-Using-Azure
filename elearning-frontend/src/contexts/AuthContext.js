import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const setupAuthListener = useCallback(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          setUser(data);
          navigate('/dashboard');
          break;
        case 'signOut':
          setUser(null);
          navigate('/');
          break;
        case 'customOAuthState':
          // Handle custom state if needed
          break;
        default:
          break;
      }
    });
  }, [navigate]);

  async function checkUser() {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
      setLoading(false);
    } catch (error) {
      setUser(null);
      setLoading(false);
    }
  }

  useEffect(() => {
    checkUser();
    setupAuthListener();
  }, [setupAuthListener]);

  const value = {
    user,
    loading,
    checkUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 