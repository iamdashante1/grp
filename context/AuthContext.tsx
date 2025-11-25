'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { useI18n } from '@/components/providers/I18nProvider';

interface User {
  _id: string;
  fullName: string;
  name?: string;
  email: string;
  phone: string;
  role: {
    _id: string;
    name: string;
    description: string;
  };
  bloodType?: string;
  profileImage?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userRole: string | null;
  hasRole: (...roles: string[]) => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Safe access to i18n within client-side context
  let t: (k: string, p?: any) => string = (k) => k;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    t = useI18n().t;
  } catch {}
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = sessionStorage.getItem('user');
    const storedToken = sessionStorage.getItem('authToken');
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('authToken');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }

      const { user: userData, token } = data.data;
      
      setUser(userData);
      setIsAuthenticated(true);
      sessionStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('userId', userData._id);
      
      toast.success(t('auth.login.success'));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('auth.login.failed');
      toast.error(errorMessage);
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Registration failed');
      }

      const { user: newUser, token } = data.data;
      
      setUser(newUser);
      setIsAuthenticated(true);
      sessionStorage.setItem('user', JSON.stringify(newUser));
      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('userId', newUser._id);
      
      toast.success(t('auth.register.success'));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('auth.register.failed');
      toast.error(errorMessage);
      throw error;
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const normalizedRole = user?.role?.name ? user.role.name.toLowerCase() : null;

  const hasRole = (...roles: string[]) => {
    if (!normalizedRole) return false;
    return roles.some((role) => role.toLowerCase() === normalizedRole);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    toast.success(t('auth.logout.success'));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, userRole: normalizedRole, hasRole, login, logout, register, updateUser }}>
      {!isLoading && children}
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
