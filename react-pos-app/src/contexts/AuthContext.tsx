import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in on app start
    const storedUser = localStorage.getItem('qposUser');
    const currentUser = localStorage.getItem('currentUser');
    
    if (storedUser && currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const storedUser = localStorage.getItem('qposUser');
      
      // Check demo credentials
      if (email === 'demo@qtecsolution.net' && password === '87654321') {
        const demoUser = { name: 'Demo User', email: 'demo@qtecsolution.net' };
        setUser(demoUser);
        localStorage.setItem('currentUser', JSON.stringify(demoUser));
        return true;
      }
      
      // Check stored user credentials
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.email === email && userData.password === password) {
          const userInfo = { name: userData.name, email: userData.email };
          setUser(userInfo);
          localStorage.setItem('currentUser', JSON.stringify(userInfo));
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const userData = { name, email, password };
      localStorage.setItem('qposUser', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    user,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}