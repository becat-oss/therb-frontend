import { ITag_get } from "../construction/models";

export interface IEnvelope_get {
  id: number;
  name: string;
  tags: ITag_get[];
  description: string;
  exteriorWallId?: number;
  interiorWallId?: number;
  roofId?: number;
  groundFloorId?: number;
  floorCeilingId?: number;
  windowId?: number;
}