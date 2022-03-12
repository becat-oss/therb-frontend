import { TimeseriesData } from "src/types/AppTypes";
import { KeyRequests } from "./KeyRequestType";

type TimeseriesGetResponse ={
  "data":TimeseriesData[];
}

type RequestsKeyObject = {
  [key in keyof KeyRequests]:any;
}

export class KeyResponses implements RequestsKeyObject{
  'timeseries/get': TimeseriesGetResponse;
}