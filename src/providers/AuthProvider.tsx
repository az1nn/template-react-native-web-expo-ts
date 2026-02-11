import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

interface User {
  id: string;
  email: string;
  name: string;
  photo?: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_STORAGE_KEY = '@app:auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const stored = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          setUser(JSON.parse(stored));
        }
      } catch {
        // ignore
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const signIn = useCallback(async () => {
    try {
      if (Platform.OS === 'web') {
        // Web stub: simulate sign-in with guest user
        const guestUser: User = {
          id: 'guest',
          email: 'guest@example.com',
          name: 'Guest User',
        };
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(guestUser));
        setUser(guestUser);
      } else {
        // Native: use Google Sign-In
        // This is a stub — real implementation requires @react-native-google-signin/google-signin
        const nativeUser: User = {
          id: 'native-user',
          email: 'user@example.com',
          name: 'Native User',
        };
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nativeUser));
        setUser(nativeUser);
      }
    } catch {
      // handle error
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      setUser(null);
    } catch {
      // handle error
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
