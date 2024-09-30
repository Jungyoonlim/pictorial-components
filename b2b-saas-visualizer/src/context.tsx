import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { SelectedItem } from './types';

interface AppContextType {
  selectedItem: SelectedItem | null;
  setSelectedItem: Dispatch<SetStateAction<SelectedItem | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

  return (
    <AppContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
