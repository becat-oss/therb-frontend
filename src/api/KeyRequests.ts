import { useState } from "react";
import { KeyRequestData, KeyRequests } from "./KeyRequestType";
import { KeyResponses } from "./KeyResponseType";
import { useKeyRequestData } from "./useKeyRequestData";

type ExtractGeneric<Type> = Type extends KeyRequestData<infer X>
  ? X
  : undefined;

type KeyRequestOption<K extends keyof KeyRequests, T extends KeyRequests[K]> = {
  data?: Partial<T["data"]>;
  query?: {
    [key: string]: string;
  };
};

type KeyRequestReturn<K extends keyof KeyRequests> = KeyResponses[K];
type KeyRequest<K extends keyof KeyRequests> = [
  (
    args: ExtractGeneric<KeyRequests[K]>,
    option?: KeyRequestOption<K, KeyRequests[K]>
  ) => Promise<KeyRequestReturn<K>>,
  boolean
];

//const isProd = process.env.NODE_ENV === "production";
const isProd=true;

//FIXME: 一つの関数にまとめることはできないか？
export async function getTimeseriesData(projectId: string | string[]) {
  //TODO:とりあえず固定
  const url = isProd
    ? `https://stingray-app-vgak2.ondigitalocean.app/results/${projectId}`
    : `http://localhost:5000/results/${projectId}`;
  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  return data;
}

export async function getProjectData() {
  const url = "https://oyster-app-8jboe.ondigitalocean.app/projects";
  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  console.log(data);
  return data;    
}

export async function deleteProjectData(projectId: string) {
  const url = `https://oyster-app-8jboe.ondigitalocean.app/projects/${projectId}`;
  const response = await fetch(url, { mode: "cors", method: "DELETE" });
  const data = await response.json();
  return data;
}

export async function deleteTherbData(projectId: string) {
  const url = `https://oyster-app-8jboe.ondigitalocean.app/therb/${projectId}`;
  const response = await fetch(url, { mode: "cors", method: "DELETE" });
  const data = await response.json();
  return data;
}

export async function getDownload(fileType:string,projectId: number) {
  const url = `https://ufhcn59q7f.execute-api.ap-northeast-1.amazonaws.com/stage/therb/download/${fileType}/${projectId}`;
  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  const downloadUrl = data.url;
  const downloadResponse = await fetch(downloadUrl, { mode: "cors" });
  return downloadResponse;
}
