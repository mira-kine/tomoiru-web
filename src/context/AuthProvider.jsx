import React, { createContext, useContext } from 'react';
import { useStateWithStorage } from '../hooks/useStateWithStorage';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useStateWithStorage('authenticated', false);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be inside the AuthProvider wrapper');
  }

  return context;
};

export { AuthProvider, useAuth };
