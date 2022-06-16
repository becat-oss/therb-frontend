

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