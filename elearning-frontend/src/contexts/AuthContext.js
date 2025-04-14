import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkUser = useCallback(async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const setupAuthListener = useCallback(() => {
    Hub.listen('auth', async ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          await checkUser();
          navigate('/dashboard');
          break;
        case 'signOut':
          setUser(null);
          navigate('/');
          break;
        case 'customOAuthState':
          break;
        case 'tokenRefresh':
          await checkUser();
          break;
        case 'cognitoHostedUI':
          await checkUser();
          navigate('/dashboard');
          break;
        default:
          break;
      }
    });
  }, [navigate, checkUser]);

  useEffect(() => {
    checkUser();
    setupAuthListener();

    // Refresh auth state periodically
    const interval = setInterval(() => {
      checkUser();
    }, 30 * 60 * 1000); // Check every 30 minutes

    return () => clearInterval(interval);
  }, [checkUser, setupAuthListener]);

  const signOut = async () => {
    try {
      await Auth.signOut();
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    loading,
    checkUser,
    signOut,
    isAuthenticated: !!user,
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