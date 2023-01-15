import { IConstructionSchema } from "../construction/models";

export interface IEnvelopeSchema {
  id: string;
  name: string;
  description: string;
  exteriorWall: IConstructionSchema;
  floorCeiling: IConstructionSchema;
  groundFloor: IConstructionSchema;
  interiorWall: IConstructionSchema;
  roof: IConstructionSchema;
  window: IConstructionSchema;
}

export type TEnvelopePayload = Omit<IEnvelopeSchema, "id">;
