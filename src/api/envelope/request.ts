import { ConstructionCategory } from "src/models/category";
import { IEnvelope } from "src/models/envelope";
import { parseConstructionDetail } from "../construction/requests";
import { IEnvelope_get } from "./model";

export async function getEnvelopeDetails_API() {
  const url = `https://stingray-app-vgak2.ondigitalocean.app/envelopes`;

  // const url = isProd
  //   ? `https://stingray-app-vgak2.ondigitalocean.app/constructions`
  //   : `http://localhost:5000/constructions`;
  try {
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();
    const formattedData: IEnvelope[] = (data.data as IEnvelope_get[]).map(
      (d) => {
        return {
          id: d.id,
          name: d.name,
          description: d.description,
          tags: [],
          config: [
            {category: ConstructionCategory.EXTERIOR_WALL, label: "Exterior Wall", construction: parseConstructionDetail(d.exteriorWall)},
            {category: ConstructionCategory.INTERIOR_WALL, label: "Interior Wall", construction: parseConstructionDetail(d.interiorWall)},
            {category: ConstructionCategory.INTERIOR_FLOOR, label: "Floor & Ceiling", construction: parseConstructionDetail(d.floorCeiling)},
            {category: ConstructionCategory.EXTERIOR_ROOF, label: "Roof", construction: parseConstructionDetail(d.roof)},
            {category: ConstructionCategory.GROUND_FLOOR, label: "Ground Floor", construction: parseConstructionDetail(d.groundFloor)},
            {category: ConstructionCategory.WINDOW, label: "Window", construction: parseConstructionDetail(d.window)}
          ]
        };
      }
    );
    return formattedData;
  } catch (e) {
    console.error("Error when getting Envelope Details", e);
  }
  return [];
}

