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

const tags: string[] = ["低コスト", "tag2","tag3"];

export async function getMaterialTags_API() {
  const url = `https://stingray-app-vgak2.ondigitalocean.app/tags`;
  // const url = isProd
  //   ? `https://stingray-app-vgak2.ondigitalocean.app/materials`
  //   : `http://localhost:5000/materials`;
  // const response = await fetch(url, { mode: "cors" });
  // const data = await response.json();
  // const formattedData: ITag[] = (
  //   data.data as IMaterialDetail_get[]
  // ).map((d) => {
  //   return {
  //     id: d.id.toString(),
  //     label: d.name || null,
  //   };
  // });
  // return formattedData;

  return tags.map((t,i)=>{return {id: i.toString(), label: t}}) as ITag[];
}

export async function postMaterialTags_API(newtags: string[]) {
  const url = `https://stingray-app-vgak2.ondigitalocean.app/tags`;
  // const url = isProd
  //   ? `https://stingray-app-vgak2.ondigitalocean.app/materials`
  //   : `http://localhost:5000/materials`;
  // const response = await fetch(url, {
  //   method: "POST",
  //   mode: "no-cors",
  //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //   credentials: "same-origin", // include, *same-origin, omit
  //   headers: {
  //     "Content-Type": "application/json", // 'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   redirect: "follow", // manual, *follow, error
  //   referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //   body: JSON.stringify(newtags), // body data type must match "Content-Type" header
  // });
  // const data = await response.json();
  const prevtagsCount = tags.length;
  tags.push(...newtags);

  return newtags.map((t,i)=>{return {id: (prevtagsCount+i), name: t}}) as ITag_get[];
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

export async function saveConstructionDetail(
  material: IConstructionDetail_post
) {

  //save tags first
  const tagsWithoutId = material.tags.filter(t=>t.id === null);
  if(tagsWithoutId.length > 0){
    const tagsLabels = tagsWithoutId.map(t=>t.name);
    const newTags = await postMaterialTags_API(tagsLabels);
    const tagsWithId = material.tags.filter(t=>t.id!== null);
    material.tags = tagsWithId.concat(newTags);
  }

  const url = `https://stingray-app-vgak2.ondigitalocean.app/constructions`;

  // const url = isProd
  //   ? `https://stingray-app-vgak2.ondigitalocean.app/constructions`
  //   : `http://localhost:5000/constructions`;
  const response = await fetch(url, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json", // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(material), // body data type must match "Content-Type" header
  });
  const data = await response.json();
  return data;
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
      category: d.categories,
      tags: d.tags.map((t) => {return {label: t.name, id: t.id.toString()}}),
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
          thickness: d.thickness[i].toString(),
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
    category: detail.categories,
    tags: detail.tags.map((t) => {return {label: t.name, id: t.id.toString()}}),
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
        thickness: detail.thickness[i].toString(),
      };
    }),
  };
  return formattedData;
  // } catch (e) {
  //   console.error("Error: ", e);
  // }
}
