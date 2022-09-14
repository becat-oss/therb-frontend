import { ConstructionCategory } from "./category";
import { IConstructionDetail, ITag } from "./construction";

export interface IEnvelope {
  id: number;
  name: string;
  description: string;
  tags: ITag[];
  config: {category: ConstructionCategory, label: string, construction: IConstructionDetail}[];  
}

