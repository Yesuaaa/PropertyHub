import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser, getMe } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data } = await getMe();
        if (mounted) {
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
      } catch {
        if (mounted) {
          setUser(null);
          localStorage.removeItem('user');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    const handleExpired = () => {
      setUser(null);
      localStorage.removeItem('user');
    };
    window.addEventListener('auth:expired', handleExpired);
    return () => {
      mounted = false;
      window.removeEventListener('auth:expired', handleExpired);
    };
  }, []);

  const login = async (email, password) => {
    const { data } = await loginUser(email, password);
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data.user;
  };

  const register = async (userData) => {
    await registerUser(userData);
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
