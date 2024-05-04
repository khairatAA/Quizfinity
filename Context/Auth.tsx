// auth.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  showOnboarding: boolean | null;
  isLoggedIn: boolean | null;
}

const AuthContext = createContext<AuthContextType>({
  showOnboarding: null,
  isLoggedIn: null,
});

export const AuthProvider = ({ children }: any) => {
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Authentication logic goes here

  return (
    <AuthContext.Provider value={{ showOnboarding, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
