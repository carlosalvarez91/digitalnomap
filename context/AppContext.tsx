import { createContext, useContext, ReactNode, useState } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

type AppContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  confirm: FirebaseAuthTypes.ConfirmationResult | null;
  setConfirm: (value: FirebaseAuthTypes.ConfirmationResult | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    confirm,
    setConfirm,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
