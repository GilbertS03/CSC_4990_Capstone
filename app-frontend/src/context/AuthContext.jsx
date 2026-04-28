import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import * as authService from "../services/auth";
import { decodeToken } from "../utils/jwt";
import api from "../services/api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Load token on inital mount
  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      setAccessToken(token);

      const decoded = decodeToken(token);
      setUser(decoded);
    }
    setLoading(false);
  }, []);

  //Sync accessToken -> localStorage (also done by auth.js)

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
      const decoded = decodeToken(accessToken);
      setUser(decoded);
    } else {
      localStorage.removeItem("access_token");
      setUser(null);
    }
  }, [accessToken]);

  //login using auth.js

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);

      if (!data?.access_token) {
        return { success: false, message: "Invalid Login response" };
      }
      setAccessToken(data.access_token);
      const decoded = decodeToken(data.access_token);
      return { success: true, user: decoded };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  //signup using auth.js

  const signup = async (firstName, lastName, email, password) => {
    try {
      const data = await authService.signup(
        firstName,
        lastName,
        email,
        password,
      );

      if (!data?.access_token) {
        return { success: false, message: "Invalid signup response" };
      }

      setAccessToken(data.access_token);

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = useCallback(() => {
    authService.logout();
    setAccessToken(null);
    setUser(null);
  }, []);

  //Add authorization to axios requests
  useEffect(() => {
    const reqInterceptor = api.interceptors.request.use((config) => {
      const token = authService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(reqInterceptor);
    };
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    const decoded = decodeToken(accessToken);
    if (!decoded?.exp) return;

    const expTime = decoded.exp * 1000;
    const now = Date.now();
    let timeUntilExpiry = expTime - now;

    if (timeUntilExpiry <= 0) {
      logout();
      return;
    }

    //claming the timer to a min of 1ms to avoid instant logout
    timeUntilExpiry = Math.max(timeUntilExpiry, 1);

    const timer = setTimeout(() => {
      logout();
      alert("Session expired. You have been logged out.");
    }, timeUntilExpiry);

    //Cleanup if token changes or component unmounts
    return () => clearTimeout(timer);
  }, [accessToken, logout]);

  //Value for components

  const value = {
    user,
    accessToken,
    loading,
    isAuthenticated: !!accessToken,
    login,
    signup,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
