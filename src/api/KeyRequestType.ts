import { AxiosRequestConfig } from 'axios';

export type KeyRequestData<Args = undefined, Data = undefined> = Omit<AxiosRequestConfig, 'url'|'data'> & {
  url: (args: Args) => string;
  data?: (args: Args)=> Data;
}

export interface GetKeyRequests{
  'timeseries/get': KeyRequestData;
}

export type KeyRequests = GetKeyRequests;