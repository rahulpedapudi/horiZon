import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem('futureHubUser');
    const storedOnboarding = localStorage.getItem('futureHubOnboarded');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedOnboarding === 'true') {
      setIsOnboarded(true);
    }

    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: email,
      avatar: null
    };
    setUser(mockUser);
    localStorage.setItem('futureHubUser', JSON.stringify(mockUser));
    
    // Check if this specific mock user has onboarded (simplified logic)
    // For now, we'll rely on the global onboarding flag for the 'device'
    // In a real app, this would come from the backend user profile
  };

  const signup = (name, email, password) => {
    // Mock signup
    const mockUser = {
      id: Date.now().toString(),
      name: name,
      email: email,
      avatar: null
    };
    setUser(mockUser);
    localStorage.setItem('futureHubUser', JSON.stringify(mockUser));
    setIsOnboarded(false); // New users need to onboard
    localStorage.removeItem('futureHubOnboarded');
  };

  const logout = () => {
    setUser(null);
    setIsOnboarded(false);
    localStorage.removeItem('futureHubUser');
    localStorage.removeItem('futureHubOnboarded');
  };

  const completeOnboarding = (data) => {
    console.log('Onboarding Data:', data); // In real app, save to backend
    setIsOnboarded(true);
    localStorage.setItem('futureHubOnboarded', 'true');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isOnboarded,
      isLoading,
      login,
      signup,
      logout,
      completeOnboarding
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
