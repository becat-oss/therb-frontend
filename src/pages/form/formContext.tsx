import { useEditor } from "src/editor/useEditor";
import { useState, useMemo, useContext } from "react";
import { AnalysisZone } from "src/AppTypes";
import React from "react";

interface FormConditionsProviderProps {
    children: React.ReactNode
}

interface FormConditionsState {
    zone: AnalysisZone | null;
    setZone: React.Dispatch<React.SetStateAction<AnalysisZone | null>>
    openDialog: boolean;
    setOpenDialog: (newOpenDialog:boolean)=>void;
}

const initialZone:AnalysisZone =  {
    name:'test',
    coordinates:[[0,0],[5,0],[5,5],[0,5]],
    exteriorWalls:[],
    program: 'office',
    space_type: 'office',
    wwr:[40]
}

const initialState: FormConditionsState = {
    zone:initialZone,
    setZone: () => {},
    openDialog: false,
    setOpenDialog: ()=>{}
}

export const FormConditionsContext = React.createContext<FormConditionsState>(initialState);

export function FormConditionsProvider({children}: FormConditionsProviderProps): React.ReactElement {
    const { zones } = useEditor();
    const [zone, setZone] = useState(zones.length > 0? zones[0]:initialState.zone);
    const [openDialog,setOpenDialog] = useState(false);

    const state: FormConditionsState = useMemo(()=>{
        return {
            zone,
            setZone,
            openDialog,
            setOpenDialog
        }
    },[zone])

    return <FormConditionsContext.Provider value = {state}>{children}</FormConditionsContext.Provider>
}

export function useFormCondtionsContext():FormConditionsState {
    return useContext(FormConditionsContext);
}