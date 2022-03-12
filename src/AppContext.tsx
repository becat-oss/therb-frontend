import { useState, useContext, useMemo, useCallback } from "react";
import React from "react";
import parameters from './parameters.json';
import { AppState,AnalysisParameters, AnalysisResults, AnalysisZoneData, AnalysisGeometry, AnalysisZone } from "./AppTypes";
import { initialState } from "./EditorContext";

const defaultZone: AnalysisZone = {
    name:'test',
    coordinates: [[0,0],[5,0],[5,5],[0,5]],
    program:'office',
    exteriorWalls:[],
    space_type: 'office',
    wwr:[40]
}

const defaultGeometry: AnalysisGeometry={
    floor:0,
    level:0,
    height:3,
    zones:[{
        name:'test',
        coordinates: [[0,0],[5,0],[5,5],[0,5]],
        program:'office',
        exteriorWalls:[],
        space_type: 'office',
        wwr:[40]
    }]
}

const defaultInitialState:AppState={
    mode:'viewer',
    setMode:()=>{},
    analysisParams: parameters,
    setAnalysisParams: () => {},
    analysisResults: {},
    setAnalysisResults: () => {},
    zoneData:{
        status: {
            imageScale:1
        },
        geometries:[{
            floor:0,
            level:0,
            height:3,
            zones:[{
                name:'test',
                coordinates: [[0,0],[5,0],[5,5],[0,5]],
                program:'office',
                exteriorWalls:[],
                space_type: 'office',
                wwr:[40]
            }]
        }]
    },
    setZoneData: () => {}
};

interface AppProviderProps{
    children: React.ReactNode;
}

export const AppContext=React.createContext<AppState>(defaultInitialState);

export function AppProvider({children}:AppProviderProps):React.ReactElement{
    const [mode, setMode] = useState(defaultInitialState.mode);
    const [analysisParams,setAnalysisParams] = useState<AnalysisParameters>(defaultInitialState.analysisParams);
    const [analysisResults,setAnalysisResults]=useState<AnalysisResults>(defaultInitialState.analysisResults);
    const [zoneData, setZoneDataAction] = useState(defaultInitialState.zoneData);

    const setZoneData = useCallback((newZoneData: AnalysisZoneData)=>{
        newZoneData.geometries.forEach((g,i)=>{
            newZoneData.geometries[i]={
                ...defaultGeometry,
                ...g,
            };

            const zones = newZoneData.geometries[i].zones;

            if (zones){
                zones.forEach((z,zi)=>{
                    zones[zi]={
                        ...defaultZone,
                        ...z
                    }
                })
            }
        })

        const clone = Object.assign(Object.create(Object.getPrototypeOf(newZoneData)),newZoneData);
        setZoneDataAction(clone);
    },[]);

    const appState = useMemo(():AppState=>{
        return{
            mode,
            setMode,
            analysisParams,
            setAnalysisParams,
            analysisResults,
            setAnalysisResults,
            zoneData,
            setZoneData
        }
    },[mode,analysisParams])

    return <AppContext.Provider value={appState}>{children}</AppContext.Provider>
}

export function useAppContext(): AppState{
    return useContext(AppContext);
}