import { ConstructionCategory } from "src/models/category";
import { IMaterialDetail, ITransparentMaterialDetail } from "src/models/material";
import { IMaterialSchema, ITransparentMaterialSchema } from "./models";

//const isProd = process.env.NODE_ENV === "production";
const isProd = true;
const url = `https://f5dk53b667.execute-api.ap-northeast-1.amazonaws.com/dev/`;

export async function getOpaqueMaterials_API() {
  

  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  const formattedData: IMaterialDetail[] = (
    data.data as IMaterialSchema[]
  ).map((d) => {
    return {
      id: d.id.toString(),
      name: d.name,
      description: d.description || "",
      roughness: d.roughness || "",
      conductivity: d.conductivity ?? null,
      density: d.density ?? null,
      specificHeat: d.specificHeat ?? null,
      ownerId: d.ownerId || "",
      thickness: d.thickness ?? 10,
      thicknessOptions: d.thicknessOptions || [],
      moistureCapacity: d.moistureCapacity ?? null,
      moistureConductivity: d.moistureConductivity ?? null,
      classification: d.classification ?? null,
    };
  });
  return formattedData;
}

export async function getTransparentMaterials_API() {

  const url = `https://m32ugdp0xc.execute-api.ap-northeast-1.amazonaws.com/dev/`;

  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  const formattedData: ITransparentMaterialDetail[] = (
    data.data as ITransparentMaterialSchema[]
  ).map((d) => {
    return {
      id: d.id.toString(),
      name: d.name,
      description: d.description || "",
      conductivity: d.conductivity ?? null,
      density: d.density ?? null,
      specificHeat: d.specificHeat ?? null,
      ownerId: d.ownerId || "",
      thickness: d.thickness ?? 10,
      thicknessOptions: d.thicknessOptions || [],
      moistureCapacity: d.moistureCapacity ?? null,
      moistureConductivity: d.moistureConductivity ?? null,
      classification: d.classification ?? null,
      solarTransmittance: d.solarTransmittance ?? null,
    };
  });
  return formattedData;
}

export async function getMaterialById(id: number) {

  //const url = `https://57mq690b08.execute-api.ap-northeast-1.amazonaws.com/dev/`;

  const response = await fetch(url, {
    mode: "cors",
    method: "GET",
    body: JSON.stringify({ id }),
  });
  const data = await response.json();
  const material = data.data as IMaterialSchema;
  const formattedData: IMaterialDetail = {
    id: material.id.toString(),
    name: material.name,
    description: material.description || "",
    roughness: material.roughness || "",
    conductivity: material.conductivity ?? null,
    density: material.density ?? null,
    specificHeat: material.specificHeat ?? null,
    ownerId: material.ownerId || "",
    thickness: material.thickness ?? 10,
    thicknessOptions: material.thicknessOptions || [],
    moistureCapacity: material.moistureCapacity ?? null,
    moistureConductivity: material.moistureConductivity ?? null,
    classification: material.classification ?? null,
  };
  return formattedData;
}

export function getCategories(): string[] {
  return Object.values(ConstructionCategory);
}
