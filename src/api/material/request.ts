import { ConstructionCategory } from "src/models/category";
import { IMaterialDetail } from "src/models/material";
import { IMaterialDetail_get } from "./models";

//const isProd = process.env.NODE_ENV === "production";
const isProd=true;

export async function getMaterials_API() {
  //const url = `https://stingray-app-vgak2.ondigitalocean.app/materials`;
  const url = isProd
    ? `https://stingray-app-vgak2.ondigitalocean.app/materials`
    : `http://localhost:5000/materials`;

  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  const formattedData: IMaterialDetail[] = (
    data.data as IMaterialDetail_get[]
  ).map((d) => {
    return {
      id: d.id.toString(),
      name: d.name || null,
      description: d.description || "",
      conductivity: d.conductivity ?? null,
      density: d.density ?? null,
      specificHeat: d.specificHeat ?? null,
      classification: d.classification ?? null,
      moistureCapacity: d.moistureCapacity ?? null,
      moistureConductivity: d.moistureConductivity ?? null,
    };
  });
  return formattedData;
}

export async function getMaterialById(id: number) {
  //const url = `https://stingray-app-vgak2.ondigitalocean.app/materials`;
  const url = isProd
    ? `https://stingray-app-vgak2.ondigitalocean.app/materials`
    : `http://localhost:5000/materials`;

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
    classification: material.classification,
    description: material.description,
    moistureCapacity: material.moistureCapacity,
    moistureConductivity: material.moistureConductivity
  };
  return formattedData;
}

export function getCategories(): string[] {
  return Object.values(ConstructionCategory);
}
