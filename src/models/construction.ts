import { IMaterialDetail } from "./material";
import { ITag } from "./tags";

export interface IConstructionDetail {
  uniqueId: string;
  name?: string;
  category?: string;
  tags?: ITag[];
  description?: string;
  layerStructure?: {
    material: IMaterialDetail;
    thickness: number;
  }[];
  uValue?: number;
  lcco2?: number;
  cost?: number;
}
