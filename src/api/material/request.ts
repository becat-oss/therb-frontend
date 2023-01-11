import { ConstructionCategory } from "src/models/category";
import { IMaterialDetail } from "src/models/material";
import { IMaterialSchema } from "./models";

//const isProd = process.env.NODE_ENV === "production";
const isProd = true;

export async function getMaterials_API() {
  //const url = `https://stingray-app-vgak2.ondigitalocean.app/materials`;
  // const url = isProd
  //   ? `https://stingray-app-vgak2.ondigitalocean.app/materials`
  //   : `http://localhost:5000/materials`;

  const url = `https://1glw2368ke.execute-api.ap-northeast-1.amazonaws.com/dev/`;

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

export async function getMaterialById(id: number) {
  // const url = isProd
  //   ? `https://stingray-app-vgak2.ondigitalocean.app/materials`
  //   : `http://localhost:5000/materials`;
  const url = `https://1glw2368ke.execute-api.ap-northeast-1.amazonaws.com/dev/`;

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
