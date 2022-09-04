import {
  IConstructionDetail,
  IMaterialDetail,
  ITag,
} from "src/models/construction";
import {
  IConstructionDetail_get,
  IConstructionDetail_post,
  IMaterialDetail_get,
  ITag_get,
} from "./models";

export interface IAPIResponse {
  status: "success" | "failed";
  message: string;
  data?: any[];
}

const isProd = process.env.NODE_ENV === "production";

export async function getMaterials_API() {
  const url = `https://stingray-app-vgak2.ondigitalocean.app/materials`;
  // const url = isProd
  //   ? `https://stingray-app-vgak2.ondigitalocean.app/materials`
  //   : `http://localhost:5000/materials`;
  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  const formattedData: IMaterialDetail[] = (
    data.data as IMaterialDetail_get[]
  ).map((d) => {
    return {
      id: d.id.toString(),
      name: d.name || null,
      conductivity: d.conductivity || null,
      density: d.density || null,
      specificHeat: d.specificHeat || null,
    };
  });
  return formattedData;
}

export async function getMaterialTags_API() {
  const url = `https://stingray-app-vgak2.ondigitalocean.app/tags`;
  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  const formattedData: ITag[] = (data.data as ITag_get[]).map((d) => {
    return {
      id: d.id,
      label: d.name || null,
    };
  });
  return formattedData;

  // return tags.map((t,i)=>{return {id: i.toString(), label: t}}) as ITag[];
}

export async function postMaterialTags_API(newtags: string[]): Promise<IAPIResponse> {
  const url = `https://stingray-app-vgak2.ondigitalocean.app/tags`;
  const tagsToPost = newtags.map((t) => {
    return { name: t, description: "" };
  });

  const responseData: IAPIResponse = {
    status: "failed",
    message: "",
    data: [],
  };
  for (const tag of tagsToPost) {
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
      body: JSON.stringify(tag), // body data type must match "Content-Type" header
    });
    const data = await response.json();
    if(data.status === 'success'){
      responseData.data.push(data.data);
      responseData.status = "success";
      responseData.message = "";
    }
    else{
      responseData.message = data.message;
    }
  }
  return responseData;

  // const data = await response.json();
  // return data;
  // const prevtagsCount = tags.length;
  // tags.push(...newtags);

  // return newtags.map((t,i)=>{return {id: (prevtagsCount+i), name: t}}) as ITag_get[];
}

export async function getMaterialById(id: number) {
  const url = `https://stingray-app-vgak2.ondigitalocean.app/materials`;

  // const url = isProd
  //   ? `https://stingray-app-vgak2.ondigitalocean.app/materials`
  //   : `http://localhost:5000/materials`;
  const response = await fetch(url, {
    mode: "cors",
    method: "GET",
    body: JSON.stringify({ id }),
  });
  const data = await response.json();
  const material = data.data as IMaterialDetail_get;
  const formattedData: IMaterialDetail = {
    id: material.id.toString(),
    name: material.name,
    conductivity: material.conductivity,
    density: material.density,
    specificHeat: material.specificHeat,
  };
  return formattedData;
}

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

export async function getConstructionDetails_API() {
  const url = `https://stingray-app-vgak2.ondigitalocean.app/constructions`;

  // const url = isProd
  //   ? `https://stingray-app-vgak2.ondigitalocean.app/constructions`
  //   : `http://localhost:5000/constructions`;
  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  const formattedData: IConstructionDetail[] = (
    data.data as IConstructionDetail_get[]
  ).map((d) => {
    return {
      uniqueId: d.id.toString(),
      name: d.name,
      category: d.category,
      tags: d.tags.map((t) => {
        return { label: t.name, id: t.id.toString() };
      }),
      description: d.description,
      layerStructure: d.materials.map((m, i) => {
        return {
          material: {
            id: m.id.toString(),
            name: m.name,
            conductivity: m.conductivity,
            density: m.density,
            specificHeat: m.specificHeat,
          },
          //thickness: d.thickness[i].toString(),
          thickness: d.thickness[i],
        };
      }),
    };
  });
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
