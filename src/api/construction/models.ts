import { IMaterialDetail_get } from "../material/models";
import { ITag_get } from "../tags/model";

export interface IConstructionDetail_get {
  category: string;
  description: string;
  id: string;
  materials: IMaterialDetail_get[];
  name: string;
  tags: ITag_get[]
  thickness: number[];
  uvalue: number;
}

export interface IConstructionDetail_post {
  name: string;
  description: string;
  materialIds: number[];
  tagIds?: string[];
  category?: string;
  thickness?: string;
  uvalue?: number;
}
