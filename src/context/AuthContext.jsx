import React, { createContext, useContext, useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch current user from backend on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        credentials: "include", // Include cookies
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setIsOnboarded(data.user.isOnboarded);
      } else {
        setUser(null);
        setIsOnboarded(false);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
      setIsOnboarded(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect to Google OAuth
  const loginWithGoogle = () => {
    window.location.href = `${API_URL}/api/auth/google`;
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsOnboarded(false);
    }
  };

  const completeOnboarding = async (data) => {
    try {
      const res = await fetch(`${API_URL}/api/user/onboarding`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setIsOnboarded(true);
        return { success: true };
      } else {
        const error = await res.json();
        return { success: false, error: error.message };
      }
    } catch (error) {
      console.error("Onboarding error:", error);
      return { success: false, error: "Network error" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isOnboarded,
        isLoading,
        loginWithGoogle,
        logout,
        completeOnboarding,
        checkAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
