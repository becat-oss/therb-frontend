import { IMaterialDetail } from "./material";

export interface ITag{
  label: string;
  id: string;
}

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

