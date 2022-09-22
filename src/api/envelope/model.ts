import { IConstructionDetail_get, ITag_get } from "../construction/models";

export interface IEnvelope_get {
  id: number;
  name: string;
  description: string;
  exteriorWall: IConstructionDetail_get;
  floorCeiling: IConstructionDetail_get;
  groundFloor: IConstructionDetail_get;
  interiorWall: IConstructionDetail_get;
  roof: IConstructionDetail_get;
  window: IConstructionDetail_get;
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