import { ITag_get } from "../tags/model";

export interface IDailySchedule {
  hvac: number[];
  heating: number[];
  cooling: number[];
  id: string;
}

export interface IWeeklySchedule {
  hvac: number[];
  id: string;
}

export interface IMonthlySchedule {
  hvac: number[];
  id: string;
}

export interface ISchedule_get {
  daily: IDailySchedule;
  weekly: IWeeklySchedule;
  monthly: IMonthlySchedule;  
  id: string;
  name: string;
  description: string;
  tags: ITag_get[]
}

export interface ISchedule_post {
  daily: IDailySchedule;
  weekly: IWeeklySchedule;
  monthly: IMonthlySchedule;
  name: string;
  description: string;
  tagIds: string[]
}
