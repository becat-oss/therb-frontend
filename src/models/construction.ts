import { IMaterialDetail } from "./material";
import { ITag } from "./tags";

export interface IConstructionDetail {
  id: string;
  name?: string;
  category?: string;
  tags: ITag[];
  description?: string;
  materials: IMaterialDetail[];
  uValue?: number;
  lcco2?: number;
  cost?: number;
}
