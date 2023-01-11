import {
  IConstructionDetail,
} from "src/models/construction";
import { IAPIResponse } from "../ApiResponse";
import { IConstructionSchema } from "../construction/models";
import { postMaterialTags_API } from "../tags/request";


export async function saveWindowDetail(constructionDetail: IConstructionDetail): Promise<IAPIResponse> {
  //save tags first
  const tagsWithoutId = constructionDetail.tags.filter((t) => t.id === null);
  if (tagsWithoutId.length > 0) {
    const tagsLabels = tagsWithoutId.map((t) => t.label);
    const newTags = await postMaterialTags_API(tagsLabels);
    if(newTags.status === "failed"){
      return {status: "failed", message:"Failed while posting Tags"};
    }
    console.log(newTags);
    const tagsWithId = constructionDetail.tags.filter((t) => t.id !== null);
    constructionDetail.tags = tagsWithId.concat(newTags.data);
  }

  // const url = `https://stingray-app-vgak2.ondigitalocean.app/windows`;
  const url = `https://0h9crfmcs3.execute-api.ap-northeast-1.amazonaws.com/dev/`;

  const constructionDetail_Post: Omit<IConstructionSchema, "id"> = {
    name: constructionDetail.name || "",
    category: constructionDetail.category || "",
    description: constructionDetail.description || "",
    materials: constructionDetail.materials,
    tags: constructionDetail.tags.map((t) => ({ id: t.id, name: t.label })),
    uvalue: constructionDetail.uValue || 0,
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

export function parseConstructionDetail(detail: IConstructionSchema): IConstructionDetail{
  return {
    id: detail.id.toString(),
    name: detail.name,
    category: "window",
    tags: detail.tags?.map(t => ({ label: t.name, id: t.id})) || [],
    description: detail.description || null,
    materials: detail.materials?.map((m, i) => {
      return {
        id: m.id.toString(),
        name: m.name,
        description: m.description || "",
        roughness: m.roughness || "",
        conductivity: m.conductivity,
        density: m.density,
        specificHeat: m.specificHeat,
        ownerId: m.ownerId || "",
        thickness: m.thickness ?? 10,
        thicknessOptions: m.thicknessOptions || [],
        moistureCapacity: m.moistureCapacity ?? 1,
        moistureConductivity: m.moistureConductivity ?? 1,
        classification: m.classification,
      };
    }) || [],
    uValue: detail.uvalue || null
  };
}

export async function getWindowDetails_API() {
  // const url = `https://stingray-app-vgak2.ondigitalocean.app/windows`;
  const url = `https://0h9crfmcs3.execute-api.ap-northeast-1.amazonaws.com/dev/`;


  // const url = isProd
  //   ? `https://stingray-app-vgak2.ondigitalocean.app/constructions`
  //   : `http://localhost:5000/constructions`;
  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  const formattedData: IConstructionDetail[] = (
    data.data as IConstructionSchema[]
  ).map((d) => parseConstructionDetail(d));
  return formattedData;
}

export async function getConstructionDetailById_API(id: string) {
  const url = `https://stingray-app-vgak2.ondigitalocean.app/windows`;

  // const url = isProd
  //   ? `https://stingray-app-vgak2.ondigitalocean.app/materials`
  //   : `http://localhost:5000/materials`;
  const response = await fetch(url, {
    mode: "cors",
    method: "GET",
    body: JSON.stringify({ id }),
  });
  const data = await response.json();
  const detail = data.data as IConstructionSchema;
  const formattedData: IConstructionDetail = {
    id: detail.id.toString(),
    name: detail.name,
    category: detail.category,
    tags: detail.tags.map((t) => {
      return { label: t.name, id: t.id.toString() };
    }),
    description: detail.description,
    materials: detail.materials.map((m, i) => {
      return {
        id: m.id.toString(),
        name: m.name,
        description: m.description,
        roughness: m.roughness,
        conductivity: m.conductivity,
        density: m.density,
        specificHeat: m.specificHeat,
        ownerId: m.ownerId,
        thickness: m.thickness,
        thicknessOptions: m.thicknessOptions,
        moistureCapacity: m.moistureCapacity,
        moistureConductivity: m.moistureConductivity,
        classification: m.classification,
    };
  }),
  };
  return formattedData;
  // } catch (e) {
  //   console.error("Error: ", e);
  // }
}
