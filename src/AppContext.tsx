import { useState, useContext, useMemo, useCallback } from "react";
import React from "react";
import { AppState } from "./AppTypes";
import { inputGeometry } from "./utils/inputGeometry";

const initialState:AppState={
    mode:'viewer',
    setMode:()=>{},
    geometry:inputGeometry,
    setGeometry:()=>{}
};

interface AppProviderProps{
    children: React.ReactNode;
}

export const AppContext=React.createContext<AppState>(initialState);

export function AppProvider({children}:AppProviderProps):React.ReactElement{
    const [mode, setMode] = useState(initialState.mode);
    const [geometry,setGeometry] = useState(initialState.geometry)

    const appState = useMemo(():AppState=>{
        return{
            mode,
            setMode,
            geometry,
            setGeometry
        }
    },[mode,geometry])

    return <AppContext.Provider value={appState}>{children}</AppContext.Provider>
}

export function useAppContext(): AppState{
    return useContext(AppContext);
}