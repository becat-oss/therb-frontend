import React, { useMemo } from "react";
import {Layer} from "building-editor-2d/Canvas";

interface EditPlansState{
  floor: number;
  setFloor: (floor:number) => void;
  northAxis: number;
  setNorthAxis: (northAxis:number) => void;
  editFunction: string;
  setEditFunction: (editFunction:string) => void;
  layers:Layer[];
  setLayers: (layers:Layer[]) => void;
}

const initialState:EditPlansState = {
  floor: 0,
  setFloor: (floor:number) => { return;},
  northAxis: 0,
  setNorthAxis: (northAxis:number) => { return;},
  editFunction: 'Select',
  setEditFunction: (editFunction:string) => { return;},
  layers: [],
  setLayers: (layers:Layer[]) => { return;},
}

export const EditPlansContext = React.createContext<EditPlansState>(initialState);

interface EditPlansProviderProps{
  children: React.ReactNode;
}

export function EditPlansProvider({children}:EditPlansProviderProps):React.ReactElement{
  const [floor,setFloor] = React.useState<number>(initialState.floor);
  const [northAxis,setNorthAxis] = React.useState<number>(initialState.northAxis);
  const [editFunction,setEditFunction] = React.useState<string>(initialState.editFunction);
  const [layers,setLayers] = React.useState<Layer[]>(initialState.layers);

  const state: EditPlansState = useMemo(()=>{
    return{
      floor,
      setFloor,
      northAxis,
      setNorthAxis,
      editFunction,
      setEditFunction,
      layers,
      setLayers,
    }
  },[floor,northAxis,editFunction,layers])

  return <EditPlansContext.Provider value={state}>{children}</EditPlansContext.Provider>
}

export function useEditPlansContext(): EditPlansState{
  return React.useContext(EditPlansContext);
}

