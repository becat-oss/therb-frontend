import React, { useEffect, useMemo } from "react";
import { WwrDict } from "src/AppTypes";

interface GeometryState{
  wwr:number;
  setWwr: (wwr:number) => void;
  wwrs:WwrDict;
  setWwrs: (wwrs:WwrDict) => void;
  //programとかspace typeも付け加えていく
  perWall: boolean;
  setPerWall: (perWall:boolean) => void;
}

const initialState: GeometryState = {
  wwr: 40,
  setWwr: (wwr:number) => { return;},
  wwrs:{'wall1':40,'wall2':40,'wall3':40,'wall4':40,'roof':40,'floor':40},
  setWwrs: (wwrs:WwrDict) => { return;},
  perWall: false,
  setPerWall: (perWall:boolean) => { return;}
}

export const GeometryContext = React.createContext<GeometryState>(initialState);

export function GeometryProvider({children}: {children: React.ReactNode}): React.ReactElement{
  const [wwr,setWwr] = React.useState(initialState.wwr);
  const [perWall,setPerWall] = React.useState(initialState.perWall);
  const [wwrs,setWwrs] = React.useState(initialState.wwrs);

  //TODO:wwrsがupdateされたらwwrもupdateするようにする
  useEffect(()=>{
    const newWwr = Object.values(wwrs).reduce((a,b)=>a+b,0)/Object.keys(wwrs).length;
    console.log('newWwr',newWwr);
    setWwr(Math.round(newWwr));
  },[wwrs])

  const state: GeometryState = useMemo(() =>{
    return {
      wwr,
      setWwr,
      wwrs,
      setWwrs,
      perWall,
      setPerWall
    }
  },[wwr,wwrs,perWall])

  return(
    <GeometryContext.Provider value={state}>
      {children}
    </GeometryContext.Provider>
  )
}

export function useGeometryContext(): GeometryState{
  const state = React.useContext(GeometryContext);
  if(!state){
    throw new Error('useGeometry must be used within GeometryProvider');
  }
  return state;
}
