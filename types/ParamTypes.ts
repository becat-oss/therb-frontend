import { condition } from 'src/parameters';

export type ConstructionType = 'wall' | 'internal_wall' | 'roof' | 'floor' | 'ceiling';

export type ConstructionSetting = {
  wall: OpaqueSetting[];
  internal_wall: OpaqueSetting[];
  roof: OpaqueSetting[];
  floor: OpaqueSetting[];
  ceiling: OpaqueSetting[];
  window: WindowSetting;
};

export interface OpaqueSetting {
  //id: number; 
  //elementNo: number;
  //室内側日射吸収率から入力
  Name:string;
  Roughness:string;
  Thickness:number;
  Conductivity: number;
  Density: number;
  Specific_Heat: number;
  error?: boolean;
}

export interface WindowSetting {
  uvalue: number;
  shgc: number;
  vt: number;
}

export interface EnvelopeParams{
  [key:string]:ConstructionSetting;
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