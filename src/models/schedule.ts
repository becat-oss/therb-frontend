import {
  IDailySchedule,
  IWeeklySchedule,
  IMonthlySchedule,
} from "src/api/schedule/model";
import { ITag } from "./tags";

export interface IScheduleDetail {
  daily: IDailySchedule;
  weekly: IWeeklySchedule;
  monthly: IMonthlySchedule;
  id: string;
  name: string;
  description: string;
  tags?: ITag[];
}
