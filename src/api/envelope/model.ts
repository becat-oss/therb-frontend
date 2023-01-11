import { IConstructionSchema } from "../construction/models";

export interface IEnvelope_get {
  id: number;
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
  exteriorWallId: number;
  interiorWallId: number;
  roofId: number;
  groundFloorId: number;
  floorCeilingId: number;
  windowId: number;
}