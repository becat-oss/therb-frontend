import {
  IDailySchedule,
  IWeeklySchedule,
  IMonthlySchedule,
} from "src/api/schedule/model";

export interface IScheduleDetail {
  daily: IDailySchedule;
  weekly: IWeeklySchedule;
  monthly: IMonthlySchedule;
  id: string;
  name: string;
  description: string;
  tagIds: string[];
}
