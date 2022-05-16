import React, { useCallback, useEffect, useMemo } from "react";
import { Program, WwrDict,getSpaceTypes, SpaceTypeParams, ProgramParams } from "src/AppTypes";
import { programParams, spaceTypeParams } from "src/parameters";

interface GeometryState{
  wwr:number;
  setWwr: (wwr:number) => void;
  wwrs:WwrDict;
  setWwrs: (wwrs:WwrDict) => void;
  //programとかspace typeも付け加えていく
  perWall: boolean;
  setPerWall: (perWall:boolean) => void;
  program: Program;
  setProgram: (program:Program) => void;
  spaceType: string;
  setSpaceType: (spaceType:string) => void;
  spaceTypeCandidates: string[];
  setSpaceTypeCandidates: (program:Program) => void;
  detailDialog:boolean;
  setDetailDialog: (detailDialog:boolean) => void;
  spaceTypeParams:SpaceTypeParams;
  setSpaceTypeParams: (spaceTypeParams:SpaceTypeParams) => void;
  programParams:ProgramParams;
  setProgramParams: (programParams:ProgramParams) => void;
}

const initialState: GeometryState = {
  wwr: 40,
  setWwr: (wwr:number) => { return;},
  wwrs:{'wall1':40,'wall2':40,'wall3':40,'wall4':40,'roof':40,'floor':40},
  setWwrs: (wwrs:WwrDict) => { return;},
  perWall: false,
  setPerWall: (perWall:boolean) => { return;},
  program: 'office',
  setProgram: (program:Program) => { return;},
  spaceType: 'office_open',
  setSpaceType: (spaceType:string) => { return;},
  spaceTypeCandidates: getSpaceTypes('office'),
  setSpaceTypeCandidates: (program:Program) => { return;},
  detailDialog: false,
  setDetailDialog: (detailDialog:boolean) => { return;},
  spaceTypeParams: spaceTypeParams,
  setSpaceTypeParams: (spaceTypeParams:SpaceTypeParams) => { return;},
  programParams: programParams,
  setProgramParams: (programParams:ProgramParams) => { return;},
}

export const GeometryContext = React.createContext<GeometryState>(initialState);

export function GeometryProvider({children}: {children: React.ReactNode}): React.ReactElement{
  const [wwr,setWwr] = React.useState(initialState.wwr);
  const [perWall,setPerWallAction] = React.useState(initialState.perWall);
  const [wwrs,setWwrs] = React.useState(initialState.wwrs);
  const [program,setProgram] = React.useState(initialState.program);
  const [spaceType,setSpaceType] = React.useState(initialState.spaceType);
  const [spaceTypeCandidates,setSpaceTypeCandidatesAction] = React.useState(initialState.spaceTypeCandidates);
  const [detailDialog,setDetailDialog] = React.useState(initialState.detailDialog);
  const [spaceTypeParams,setSpaceTypeParams] = React.useState(initialState.spaceTypeParams);
  const [programParams,setProgramParams] = React.useState(initialState.programParams);
  //TODO:wwrsがupdateされたらwwrもupdateするようにする
  // useEffect(()=>{
  //   const newWwr = Object.values(wwrs).reduce((a,b)=>a+b,0)/Object.keys(wwrs).length;
  //   console.log('newWwr',newWwr);
  //   setWwr(Math.round(newWwr));
  // },[wwrs])
  const setPerWall = useCallback((perWall:boolean) => {
    console.log('setPerWall',perWall);
    if (perWall){
      // let newWwrs:WwrDict = {}
      // console.log('wwr',wwr);
      // Object.keys(wwrs).forEach((key)=>{
      //   newWwrs[key] = wwr;
      // });
      // console.log('newWwrs',newWwrs);
      // setWwrs(newWwrs);
    } else{
      const newWwr = Object.values(wwrs).reduce((a,b)=>a+b,0)/Object.keys(wwrs).length;
      console.log('newWwr',newWwr);
      setWwr(Math.round(newWwr));
    }
    setPerWallAction(perWall);
  }, [perWall,wwr,wwrs]);

  const setSpaceTypeCandidates = useCallback((program:Program)=>{
    setSpaceTypeCandidatesAction(getSpaceTypes(program));
    // return (program:Program) => {
    //   setSpaceTypeCandidatesAction(getSpaceTypes(program));
    // }
  },[program]);
  //TODO: programが更新されたら、spaceTypeCandidatesも更新する
  useEffect(()=>{
    setSpaceTypeCandidates(program);
  },[program])

  const state: GeometryState = useMemo(() =>{
    return {
      wwr,
      setWwr,
      wwrs,
      setWwrs,
      perWall,
      setPerWall,
      program,
      setProgram,
      spaceType,
      setSpaceType,
      spaceTypeCandidates,
      setSpaceTypeCandidates,
      detailDialog,
      setDetailDialog,
      spaceTypeParams,
      setSpaceTypeParams,
      programParams,
      setProgramParams
    }
  },[wwr,wwrs,perWall,setPerWall,program,spaceType,spaceTypeCandidates,detailDialog,spaceTypeParams,programParams])

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
