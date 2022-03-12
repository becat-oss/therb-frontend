import { useMemo } from "react";
import { KeyRequests } from "./KeyRequestType";

export function useKeyRequestData<K extends keyof KeyRequests>(key:K): KeyRequests[K]{

  const requestData = useMemo(():KeyRequests=>{
    return{
      'timeseries/get':{
        method: 'GET',
        url:()=>`localhost:8000/5/timeseries`
      }
    }
  },[]);

  return requestData[key];
}