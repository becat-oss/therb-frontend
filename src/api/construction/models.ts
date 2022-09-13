import { IMaterialDetail_get } from "../material/models";

export interface ITag_get{
  id: string;
  name: string;
}

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
