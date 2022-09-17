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