import { IConstructionDetail } from "src/models/construction";
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

export interface IEnvelope_post {
  name: string;
  description: string;
  exteriorWall: IConstructionDetail;
  floorCeiling: IConstructionDetail;
  groundFloor: IConstructionDetail;
  interiorWall: IConstructionDetail;
  roof: IConstructionDetail;
  window: IConstructionDetail;
}