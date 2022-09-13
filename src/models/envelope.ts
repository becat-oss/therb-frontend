import { IConstructionDetail, ITag } from "./construction";

export interface IEnvelope {
  id: number;
  name: string;
  description: string;
  tags: ITag[];
  config: {uniqueId: string, label: string, construction: IConstructionDetail}[];  
}

