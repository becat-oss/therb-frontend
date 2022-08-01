import { TimeSeriesData } from "src/AppTypes";
import { KeyRequests } from "./KeyRequestType";

type TimeseriesGetResponse ={
  "data":TimeSeriesData[];
}

type RequestsKeyObject = {
  [key in keyof KeyRequests]:any;
}

export class KeyResponses implements RequestsKeyObject{
  'timeseries/get': TimeseriesGetResponse;
}