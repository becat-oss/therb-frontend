

export interface IMaterialDetail_get {
  conductivity: number;
  density: number;
  description: string;
  id: number;
  name: string;
  specificHeat: number;
}

export interface ITag_get{
  id: number;
  name: string;
}

export interface IConstructionDetail_get {
  categories: string;
  description: string;
  id: number;
  materials: IMaterialDetail_get[];
  name: string;
  tags: ITag_get[]
  thickness: number[];
}

export interface IConstructionDetail_post {
  name: string;
  description: string;
  materialIds: number[];
  tags?: ITag_get[];
  category?: string;
  thickness?: string;
}
