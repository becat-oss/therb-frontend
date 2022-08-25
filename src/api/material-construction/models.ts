

export interface IMaterialDetail_get {
  conductivity: number;
  density: number;
  description: string;
  id: string;
  name: string;
  specificHeat: number;
}

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
