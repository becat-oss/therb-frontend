import React, { useState, useMemo, useContext } from "react";

interface SidebarState {
    open: boolean,
    setOpen: (open: boolean) => void,
    handleOpen: () => void,
    handleClose: () => void
}

const initialState: SidebarState = {
    open: false,
    setOpen: () => {},
    handleOpen: () => {},
    handleClose: () => {},
}

export const SidebarContext = React.createContext(initialState);

interface SidebarProviderProps {
    children: React.ReactNode;
}

export function SidebarProvider({ children }:SidebarProviderProps):React.ReactElement {
    const [open, setOpen ] = useState(initialState.open)

    const handleOpen = ():void =>{
        setOpen(true);
    }

    const handleClose = ():void =>{
        setOpen(false);
    }

    const SidebarState = useMemo(():SidebarState=>{
        return {
            open,
            setOpen,
            handleOpen,
            handleClose
        }
    },[open]);

    return <SidebarContext.Provider value={SidebarState}>{children}</SidebarContext.Provider>
}

export function useSidebarContext(): SidebarState{
    return useContext(SidebarContext)
}