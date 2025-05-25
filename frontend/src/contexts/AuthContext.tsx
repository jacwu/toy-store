'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// 1. Define Context Types
export interface AuthUser {
  id: number;
  username: string;
  // Add any other user-specific fields if necessary
}

interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (userData: AuthUser) => void;
  logout: () => void;
  isLoading: boolean; // To handle initial loading of auth state
}

// 2. Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Create AuthProvider Component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start as true
  const router = useRouter();

  // useEffect for Initial Load
  useEffect(() => {
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem('user');
      const loggedInStatus = localStorage.getItem('isLoggedIn');

      if (loggedInStatus === 'true' && storedUser) {
        const parsedUser: AuthUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } else {
        // Ensure state is clean if no valid session found
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Failed to load user from localStorage", error);
      // Clear potentially corrupted data
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // login function
  const login = (userData: AuthUser) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    setUser(userData);
    setIsLoggedIn(true);
    router.push('/'); // Redirect to home after login
  };

  // logout function
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    setUser(null);
    setIsLoggedIn(false);
    router.push('/login'); // Redirect to login page after logout
  };

  const value = { user, isLoggedIn, login, logout, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 4. Create useAuth Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
