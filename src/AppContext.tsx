import { useState, useContext, useMemo, useCallback } from "react";
import React from "react";
import { AppState } from "./AppTypes";

const defaultInitialState:AppState={
    mode:'viewer',
    setMode:()=>{}
};

interface AppProviderProps{
    children: React.ReactNode;
}

export const AppContext=React.createContext<AppState>(defaultInitialState);

export function AppProvider({children}:AppProviderProps):React.ReactElement{
    const [mode, setMode] = useState(defaultInitialState.mode);

    const appState = useMemo(():AppState=>{
        return{
            mode,
            setMode,
        }
    },[mode])

    return <AppContext.Provider value={appState}>{children}</AppContext.Provider>
}

export function useAppContext(): AppState{
    return useContext(AppContext);
}