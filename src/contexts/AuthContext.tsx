'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, AuthState, User } from '@/types';
import { api } from '@/lib/api';

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);

  // Hàm refresh token
  const refreshToken = async () => {
    try {
      const { accessToken, user } = await api.auth.refresh();
      setState(prev => ({
        ...prev,
        accessToken,
        user,
        isLoading: false,
      }));
      return true;
    } catch (error) {
      setState(prev => ({
        ...prev,
        accessToken: null,
        user: null,
        isLoading: false,
      }));
      return false;
    }
  };

  // Kiểm tra trạng thái đăng nhập khi component mount
  useEffect(() => {
    refreshToken();
    
    // Thiết lập interval để refresh token
    const intervalId = setInterval(refreshToken, 14 * 60 * 1000); // 14 phút

    return () => clearInterval(intervalId);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { accessToken, user } = await api.auth.login(username, password);
      
      setState(prev => ({
        ...prev,
        user,
        accessToken,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.',
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } finally {
      setState(prev => ({
        ...prev,
        user: null,
        accessToken: null,
        error: null,
      }));
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
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