import { ConstructionCategory } from "./category";
import { IConstructionDetail } from "./construction";
import { ITag } from "./tags";

export interface IEnvelope {
  id: string;
  name: string;
  description: string;
  tags: ITag[];
  config: {category: ConstructionCategory, label: string, construction: IConstructionDetail}[];  
}


