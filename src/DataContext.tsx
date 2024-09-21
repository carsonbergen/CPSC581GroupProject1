import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DataContextType {
  activeQuadrant: number;
  setActiveQuadrant: (index: number) => void;
  characterIdle: boolean;
  setCharacterIdle: (state: boolean) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [activeQuadrant, setActiveQuadrant] = useState<number>(0);
  const [characterIdle, setCharacterIdle] = useState<boolean>(true);

  return (
    <DataContext.Provider value={{ activeQuadrant, setActiveQuadrant, characterIdle, setCharacterIdle }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
