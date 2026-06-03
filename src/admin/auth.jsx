import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authApi, TOKEN_KEY } from "./adminApi";

const AuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  // Only "loading" if there's a token to validate; otherwise we're ready immediately.
  const [loading, setLoading] = useState(() => !!localStorage.getItem(TOKEN_KEY));

  // Validate an existing token on mount (state is set in async callbacks).
  useEffect(() => {
    if (!localStorage.getItem(TOKEN_KEY)) return;
    authApi
      .me()
      .then(setAdmin)
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const { token, admin: a } = await authApi.login(email, password);
    localStorage.setItem(TOKEN_KEY, token);
    setAdmin(a);
    return a;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setAdmin(null);
  }, []);

  return (
    <AuthContext.Provider value={{ admin, setAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AuthContext);
}
