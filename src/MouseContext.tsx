import { createContext, ReactNode, useContext, useState } from "react";

type position = {
    x: number;
    y: number;
}

interface MouseContextType {
    mousePosition: position;
    setMousePosition: (newPosition: position) => void;
}

const MouseContext = createContext<MouseContextType | undefined>(undefined);

export const MouseProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [mousePosition, setMousePosition] = useState<position>({
        x: window.innerWidth/2, 
        y: window.innerHeight/2,
    });
    return (
        <MouseContext.Provider value={{ mousePosition, setMousePosition }}>
            {children}
        </MouseContext.Provider>
    );
}

export const useMousePosition = () => {
    const context = useContext(MouseContext);
    if (context === undefined) {
      throw new Error('useMousePosition must be used within a DataProvider');
    }
    return context;
  };
  