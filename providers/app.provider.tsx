"use client"
import { createContext, useState, ReactNode, FC, useContext } from "react";

interface AppType {
  progress: number;
  setProgress: (value: number) => void;
}

const AppContext = createContext<AppType | undefined>(undefined);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgressState] = useState<number>(0);

  const setProgress = (value: number) => {
    if (value >= 0 && value <= 100) {
      setProgressState(value);
    }
  };

  return (
    <AppContext.Provider value={{ progress, setProgress }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = ()=>{
    const context = useContext(AppContext)

    if(!context){
        throw new Error ("Context not found")

    }
    return context
}

