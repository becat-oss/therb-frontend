import {
  IConstructionDetail,
} from "src/models/construction";
import { IAPIResponse } from "../ApiResponse";
import { postMaterialTags_API } from "../tags/request";
import {
  IConstructionDetail_get,
  IConstructionDetail_post,
} from "./models";


export async function saveConstructionDetail(material: IConstructionDetail): Promise<IAPIResponse> {
  //save tags first
  const tagsWithoutId = material.tags.filter((t) => t.id === null);
  if (tagsWithoutId.length > 0) {
    const tagsLabels = tagsWithoutId.map((t) => t.label);
    const newTags = await postMaterialTags_API(tagsLabels);
    if(newTags.status === "failed"){
      return {status: "failed", message:"Failed while posting Tags"};
    }
    console.log(newTags);
    const tagsWithId = material.tags.filter((t) => t.id !== null);
    material.tags = tagsWithId.concat(newTags.data);
  }

  const url = `https://stingray-app-vgak2.ondigitalocean.app/constructions`;

  const constructionDetail_Post: IConstructionDetail_post = {
    name: material.name || "",
    category: material.category || "",
    description: material.description || "",
    materialIds:
      material.layerStructure?.map((l) => parseInt(l.material.id, 10)) || [],
    tagIds: material.tags?.map((t) => t.id) || [],
    //thickness: material.layerStructure?.map((l) => l.thickness.replace('mm','')).join(",") || "",
    thickness: material.layerStructure?.map((l) => l.thickness).join(",") || "",
    uvalue: material.uValue || 0,
  };

  const responseData: IAPIResponse = {
    status: "failed",
    message: "",
    data: [],
  };
  // const url = isProd
  //   ? `https://stingray-app-vgak2.ondigitalocean.app/constructions`
  //   : `http://localhost:5000/constructions`;
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json", // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(constructionDetail_Post), // body data type must match "Content-Type" header
  });
  const data = await response.json();
  if(data.status=== "success"){
    responseData.status = "success";
    responseData.data = [data.data];
  }
  else{
    responseData.status = "failed";
    responseData.message= data.message
  }
  return responseData;
}

export function parseConstructionDetail(detail: IConstructionDetail_get): IConstructionDetail{
  return {
    uniqueId: detail.id.toString(),
    name: detail.name,
    category: detail.category,
    tags: detail.tags.map((t) => {
      return { label: t.name, id: t.id.toString() };
    }),
    description: detail.description,
    layerStructure: detail.materials.map((m, i) => {
      return {
        material: {
          id: m.id.toString(),
          name: m.name,
          conductivity: m.conductivity,
          density: m.density,
          specificHeat: m.specificHeat,
        },
        //thickness: d.thickness[i].toString(),
        thickness: detail.thickness[i],
      };
    }),
    uValue: detail.uvalue
  };
}

export async function getConstructionDetails_API() {
  const url = `https://stingray-app-vgak2.ondigitalocean.app/constructions`;

  // const url = isProd
  //   ? `https://stingray-app-vgak2.ondigitalocean.app/constructions`
  //   : `http://localhost:5000/constructions`;
  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  const formattedData: IConstructionDetail[] = (
    data.data as IConstructionDetail_get[]
  ).map((d) => parseConstructionDetail(d));
  return formattedData;
}

export async function getConstructionDetailById_API(id: string) {
  const url = `https://stingray-app-vgak2.ondigitalocean.app/constructions`;

  // const url = isProd
  //   ? `https://stingray-app-vgak2.ondigitalocean.app/materials`
  //   : `http://localhost:5000/materials`;
  const response = await fetch(url, {
    mode: "cors",
    method: "GET",
    body: JSON.stringify({ id }),
  });
  const data = await response.json();
  const detail = data.data as IConstructionDetail_get;
  const formattedData: IConstructionDetail = {
    uniqueId: detail.id.toString(),
    name: detail.name,
    category: detail.category,
    tags: detail.tags.map((t) => {
      return { label: t.name, id: t.id.toString() };
    }),
    description: detail.description,
    layerStructure: detail.materials.map((m, i) => {
      return {
        material: {
          id: m.id.toString(),
          name: m.name,
          conductivity: m.conductivity,
          density: m.density,
          specificHeat: m.specificHeat,
        },
        thickness: detail.thickness[i],
      };
    }),
  };
  return formattedData;
  // } catch (e) {
  //   console.error("Error: ", e);
  // }
}
