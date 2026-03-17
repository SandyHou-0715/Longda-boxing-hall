import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { users } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('longda_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Re-fetch from users to get fresh data
        const user = users.find((u) => u.id === parsed.id);
        if (user) setCurrentUser(user);
      }
    } catch {
      localStorage.removeItem('longda_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((identifier, password) => {
    const user = users.find(
      (u) =>
        (u.username === identifier || u.phone === identifier) &&
        u.password === password
    );
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('longda_user', JSON.stringify({ id: user.id }));
      return { success: true };
    }
    return { success: false, message: '用户名或密码错误' };
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('longda_user');
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
