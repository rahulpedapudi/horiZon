import React, { createContext, useContext, useState, useCallback } from "react";
import { getHorizon, triggerEvent } from "../services/agentApi";
import { useAuth } from "./AuthContext";

const HorizonContext = createContext();

export const HorizonProvider = ({ children }) => {
  const { user } = useAuth();
  const [horizonData, setHorizonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch horizon data from agent API
  const fetchHorizon = useCallback(async () => {
    if (!user?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getHorizon(user.id);
      setHorizonData(data);
    } catch (err) {
      console.error("Failed to fetch horizon:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  // Refresh by triggering check_in event
  const refresh = useCallback(async () => {
    if (!user?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await triggerEvent(user.id, "check_in");
      setHorizonData(data);
    } catch (err) {
      console.error("Failed to refresh horizon:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  // Clear data on logout
  const clearHorizon = useCallback(() => {
    setHorizonData(null);
    setError(null);
  }, []);

  return (
    <HorizonContext.Provider
      value={{
        horizonData,
        isLoading,
        error,
        fetchHorizon,
        refresh,
        clearHorizon,
      }}>
      {children}
    </HorizonContext.Provider>
  );
};

export const useHorizon = () => {
  const context = useContext(HorizonContext);
  if (!context) {
    throw new Error("useHorizon must be used within a HorizonProvider");
  }
  return context;
};
