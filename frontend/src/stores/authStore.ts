import create from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

export const useAuth = create(
  persist<AuthStore>(
    (set) => ({
      token: null,
      setToken: (token) => set({ token, isAuthenticated: !!token }),
      isAuthenticated: false,
      logout: () => set({ token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);