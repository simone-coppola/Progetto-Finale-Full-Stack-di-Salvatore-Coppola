import { createContext, useContext, useEffect, useState } from "react";
import { loginApi, getUserProfileApi } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const isAuthenticated = Boolean(token && user);

  // Verifica all'avvio se il token salvato è ancora valido.
  useEffect(() => {
    const restoreSession = async () => {
      if (!token) {
        setIsCheckingAuth(false);
        return;
      }

      try {
        const userData = await getUserProfileApi();
        setUser(userData);
      } catch {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    restoreSession();
  }, [token]);

  const login = async (username, password) => {
    setIsCheckingAuth(true);

    try {
      const data = await loginApi(username, password);
      const newToken = data.token;

      localStorage.setItem("token", newToken);
      setToken(newToken);

      const userData = await getUserProfileApi();
      setUser(userData);
    } catch (error) {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      throw error;
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isCheckingAuth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}