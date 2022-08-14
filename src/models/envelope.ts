import { ITag } from "./construction";

export interface IEnvelope {
  id: number;
  name: string;
  description: string;
  tags: ITag[];
  config: {uniqueId: string, label: string, constructionVal: number, uVal: string}[];  
}

