"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getToken, isAuthenticated as checkAuth } from '@/utils/auth';
import { decodeToken, isTokenExpired } from '@/utils/tokenValidation';

import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount and refresh
    const checkAuthStatus = async () => {
      try {
        const token = getToken();
        
        if (!token || isTokenExpired(token)) {
          setUser(null);
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        // Decode token to get user info
        const decoded = decodeToken(token);
        console.log('Decoded token:', decoded); // Debug: log the actual token structure
        
        if (decoded) {
          // Handle different token structures - prioritize email and name fields
          let userData: User = {
            _id: decoded.userId || decoded._id || decoded.id || '',
            email: decoded.email || decoded.userEmail || '',
            firstName: '',
            lastName: '',
            role: decoded.role || 'user'
          };
          
          // Handle name from various possible fields
          if (decoded.firstName && decoded.lastName) {
            userData.firstName = decoded.firstName;
            userData.lastName = decoded.lastName;
          } else if (decoded.name) {
            const nameParts = decoded.name.split(' ');
            userData.firstName = nameParts[0] || '';
            userData.lastName = nameParts.slice(1).join(' ') || '';
          } else if (decoded.fullName) {
            const nameParts = decoded.fullName.split(' ');
            userData.firstName = nameParts[0] || '';
            userData.lastName = nameParts.slice(1).join(' ') || '';
          } else if (decoded.username) {
            userData.firstName = decoded.username;
            userData.lastName = '';
          } else {
            // Fallback to email prefix if no name available
            const emailPrefix = userData.email.split('@')[0];
            userData.firstName = emailPrefix;
            userData.lastName = '';
          }
          
          console.log('Mapped user data:', userData); // Debug: log the mapped data
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error validating token:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    window.location.href = '/signin';
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
