import { useState } from "react";
import { KeyRequestData, KeyRequests } from "./KeyRequestType";
import { KeyResponses } from "./KeyResponseType";
import { useKeyRequestData } from "./useKeyRequestData";

type ExtractGeneric<Type> = Type extends KeyRequestData<infer X> ? X: undefined;

type KeyRequestOption<K extends keyof KeyRequests, T extends KeyRequests[K]>={
  data?: Partial<T["data"]>;
  query?:{
    [key:string]:string;
  };
};

type KeyRequestReturn<K extends keyof KeyRequests> = KeyResponses[K]  
type KeyRequest<K extends keyof KeyRequests> = [(args: ExtractGeneric<KeyRequests[K]>, option?: KeyRequestOption<K, KeyRequests[K]>) => Promise<KeyRequestReturn<K>>, boolean]

//TODO:実装途中
// export function useKeyRequest<K extends keyof KeyRequests>(key:K): KeyRequest<K>{
//   const [loading, setLoading] = useState<boolean>(false);
//   const { url: requestURL, ...requestData} = useKeyRequestData<K>(key);
// }

export async function getTimeseriesData(projectId:string|string[]){
  //TODO:とりあえず固定
  const url = `http://localhost:5000/results/${projectId}`;
  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  console.log('data',data);
  return data;
}

export async function getProjectData(){
  const url = "http://localhost:5000/projects";
  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  return data;
}