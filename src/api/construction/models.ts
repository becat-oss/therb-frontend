import { IMaterialSchema } from "../material/models";
import { ITag_get } from "../tags/model";

export interface IConstructionSchema {
  category: string;
  description: string;
  id: string;
  materials: IMaterialSchema[];
  name: string;
  tags: ITag_get[]
  // thickness: number[];
  uvalue: number;
}


export type TConstructionPayload = Omit<IConstructionSchema, "id">;
// export interface IConstructionPayload {
//   name: string;
//   description: string;
//   materialIds: number[];
//   tagIds?: string[];
//   category?: string;
//   thickness?: string;
//   uvalue?: number;
// }
