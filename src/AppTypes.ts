import { condition } from 'src/parameters';

//TODO: typesフォルダにmigrateすべき
export interface AppState {
    mode: string;
    setMode: (newMode: string) => void;
    geometry: Geometry;
    setGeometry: (geometry: Geometry) => void;
}

export type Geometry = {
  "BuildingSurface:Detailed": BuildingSurfaceDetailed[];
  "FenestrationSurface:Detailed": FenestrationSurfaceDetailed[];
  //"Shading:Building:Detailed"?: ShadingDetailed[];
  "Zone": InputZone[];
}

export type BuildingSurfaceDetailed = {
  Construction_Name: string;
  Name: string;
  Zone_Name: string;
  Surface_Type: string;
  Outside_Boundary_Condition: string;
  Outside_Boundary_Condition_Object: string;
  Sun_Exposed: string;
  Wind_Exposed: string;
  vertices: number[];
}

export type FenestrationSurfaceDetailed = {
  Name: string;
  Building_Surface_Name: string;
  Construction_Name: string;
  Surface_Type: string;
  vertices: number[];
}

type BaseShadingDetailed={
  Name: string;
  vertices: number[];
}

export type ShadingDetailed=BaseShadingDetailed&{
  [key: string]: number;
}

export type InputZone = {
  Ceiling_Height?: string;
  Multiplier: number;
  Name: string;
  Volume?: string;
  space_type?: string;
  program?: string;
  envelope?: string;
  hvac?: string; //一時的措置
}

export type Program = 'office' | 'residential' | 'retail' ;
export const programs = Object.keys(condition) as Program[];
export const getSpaceTypes = (program: Program) => Object.keys(condition[program]);

export type WwrDict={
  [key: string]: number;
}

export interface SpaceTypeSetting{
  coolingSetpt: number;
  heatingSetpt: number;
  pplDensity: number;
  oaPerson: number;
  oaArea: number;
  smallPower: number;
  lighting:number;
  hvac: string;
  coolingCop: number;
  heatingCop: number;
}

export type SpaceTypeParams ={
  [key:string]: SpaceTypeSetting
}

export type ProgramParams ={
  [key in Program]:ScheduleGroup
}

export type ScheduleGroup = {
  occupancy: ScheduleSet;
  hvac: ScheduleSet;
  lighting: ScheduleSet;
  equipment: ScheduleSet;
}

type ScheduleGroupKeys = 'occupancy'|'hvac'|'lighting'|'equipment';
export const scheduleGroupKeys = ['occupancy','hvac','lighting','equipment'] as ScheduleGroupKeys[];

type ScheduleSet = {
  weekday:ScheduleUnit;
  saturday:ScheduleUnit;
  sunday:ScheduleUnit;
  coolingday:ScheduleUnit;
  heatingday:ScheduleUnit;
}

type ScheduleSetKeys = 'weekday'|'saturday'|'sunday'|'coolingday'|'heatingday';
export const scheduleSetKeys = ['weekday','saturday','sunday','coolingday','heatingday'] as ScheduleSetKeys[];

type ScheduleUnit ={
  schedule: number[]
};


export type cellType={
    readOnly?: boolean
    value: number|string
}

export type gridProps=cellType[][]

export interface ProjectData{
    id: number;
    name: string;
}

export interface TimeseriesPayload{
  result?:TimeseriesPayloadObject[];
}

export interface TimeseriesPayloadObject{
  id: string;
  hour: string;
  roomT: string;
  clodS: string;
  rhexS: string;
  ahexS: string;
  fs:string;
  mrt: string;
}


export interface TimeSeriesDataObject{
  roomId?: number;
  results?:TimeSeriesData;
}

export interface TimeSeriesData{
  [key:string]:number[];
}

export const timeseriesKeys = ['roomT','clodS','rhexS','ahexS','fs','clodL','rhexL','ahexL','fl','mrt'];

export type TimeSeriesKey = typeof timeseriesKeys[number];

// export interface SiteData{
//   outline: coordinate[]
// }

export type SiteOutline = Coordinate[]

export type Coordinate ={
lat: number,
lng: number
}