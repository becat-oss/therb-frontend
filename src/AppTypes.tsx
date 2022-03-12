import parameters from './parameters.json';
import AnalysisParams from './utils/AnalysisParams';
 
export const programKey = 'program';
export const spaceTypeKey = 'space_type';
export const wwrKey = 'wwr';
export const perWwrKey = (value: number): string=>wwrKey+String(value);

export type Program = "office" | "residential"
export const programs = ["office" , "residential"] as Program[];

export type AnalysisPoint = [number, number];
export type AnalysisLine = [AnalysisPoint, AnalysisPoint];

export interface AnalysisZone {
    name: string;
    coordinates: AnalysisPoint[];
    exteriorWalls: number[];
    [programKey]: string;
    [spaceTypeKey]: string;
    [wwrKey]: (number | null)[];
}

export type ConditionInputs = {
    [programKey]: string;
    [spaceTypeKey]: string;
    [wwrKey]: number;
}

export interface ConditionProperty{
    'base_wwr':number;
}

export interface AnalysisParameters{
    load:load;
    schedule:{};
    envelope:{};
    others:{};
    airside:{};
    plant:{};
}

export interface spaceTypeSetting {
    cooling_setpt: number;
    heating_setpt: number;
    ppl_density: number;
    oa_person: number;
    oa_area: number;
    smallpower: number;
    lighting: number;
    hvac: string;
    ef_ach: number;
    ef_deltapressure: number;
}

export interface load {
    [key:string]: spaceTypeSetting
}

export interface AnalysisGeometry {
    floor: number;
    level: number;
    height: number;
    zones: AnalysisZone[]
}

export interface AnalysisZoneDataStatus {
    imageScale: number;
}

export interface AnalysisZoneData {
    status: AnalysisZoneDataStatus;
    geometries: AnalysisGeometry[];
}

export interface Results {
    [key: string]: number;
}

export interface AnalysisResults {
    'energy_breakdown[kWh]'?:Results;
}

//export type AnalysisParameters = typeof parameters;
export const steps = ['import-models','input-conditions']
export const stepIndices = [0,1] as const;
export type StepIndex = typeof stepIndices[number];

export interface AppState {
    mode: string;
    setMode: (newMode: string) => void;
    //stepIndex: StepIndex;
    //setStepIndex: (newStepIndex: StepIndex)=>void;
    analysisParams: AnalysisParameters;
    setAnalysisParams: (newAnalysisParameters: AnalysisParameters) => void;
    analysisResults: AnalysisResults;
    setAnalysisResults: (newAncpalysisResults:AnalysisResults) => void;
    zoneData: AnalysisZoneData;
    setZoneData: (newZoneData: AnalysisZoneData) => void;
}

export type cellType={
    readOnly?: boolean
    value: number|string
}

export type gridProps=cellType[][]
