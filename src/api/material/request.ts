import { ConstructionCategory } from "src/models/category";
import { IMaterialDetail } from "src/models/material";
import { IMaterialDetail_get } from "./models";

export async function getMaterials_API() {
  const url = `https://stingray-app-vgak2.ondigitalocean.app/materials`;
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
      classification: d.classification || null
    };
  });
  return formattedData;
}

export async function getMaterialById(id: number) {
  const url = `https://stingray-app-vgak2.ondigitalocean.app/materials`;
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
    classification: material.classification
  };
  return formattedData;
}


export function getCategories():string[]{
  return Object.values(ConstructionCategory)
}