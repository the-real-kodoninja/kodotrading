import React, { createContext, useState, useContext, ReactNode } from 'react';
import { login as loginApi, signup as signupApi } from '../services/api';
import { auth, googleProvider, xProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithX: () => Promise<void>;
  loginWithKodoverse: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { token, username: fetchedUsername } = await loginApi(email, password);
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setUsername(fetchedUsername);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, username: string, password: string) => {
    setLoading(true);
    try {
      const { token, username: fetchedUsername } = await signupApi(email, username, password);
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setUsername(fetchedUsername);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setUsername(user.displayName || user.email?.split('@')[0] || 'User');
    } catch (error) {
      console.error('Google login failed:', error);
      throw new Error('Failed to log in with Google.');
    } finally {
      setLoading(false);
    }
  };

  const loginWithX = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, xProvider);
      const user = result.user;
      const token = await user.getIdToken();
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setUsername(user.displayName || user.email?.split('@')[0] || 'User');
    } catch (error) {
      console.error('X login failed:', error);
      throw new Error('Failed to log in with X.');
    } finally {
      setLoading(false);
    }
  };

  const loginWithKodoverse = async () => {
    setLoading(true);
    try {
      // Placeholder for Kodoverse OAuth (to be implemented later)
      console.log('Kodoverse login not implemented yet.');
      throw new Error('Kodoverse login not available yet.');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut(); // Sign out from Firebase
    } catch (error) {
      console.error('Firebase logout failed:', error);
    }
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, username, login, signup, loginWithGoogle, loginWithX, loginWithKodoverse, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};