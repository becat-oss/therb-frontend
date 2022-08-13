export interface IMaterialDetail {
  id: string;
  name: string;
  conductivity: number;
  density: number;
  specificHeat: number;
}

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
    thickness: string;
  }[];
  uValue?: number;
  lcco2?: number;
  cost?: number;
}

