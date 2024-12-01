"use client"
import { createContext, useState, ReactNode, FC, useContext } from "react";
import { Location } from "@/core/signalRService";
interface AppType {
  progress: number;
  setProgress: (value: number) => void;
  locations:Location[];
  addLocation:(location:Location) => void
}

const AppContext = createContext<AppType | undefined>(undefined);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgressState] = useState<number>(0);
  const [locations, setLocations] = useState<Location[]>([]);


  const setProgress = (value: number) => {
    if (value >= 0 && value <= 100) {
      setProgressState(value);
    }
  };
  const addLocation = (location:Location)=>{
    setLocations(prevLocations => [...prevLocations,location])

  }

  return (
    <AppContext.Provider value={{ progress, setProgress,locations,addLocation }}>
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

