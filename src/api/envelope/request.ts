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
            {uniqueId: "exterior_wall", label: "Exterior Wall", construction: parseConstructionDetail(d.exteriorWall)},
            {uniqueId: "interior_wall", label: "Interior Wall", construction: parseConstructionDetail(d.interiorWall)},
            {uniqueId: "floor_ceiling", label: "Floor & Ceiling", construction: parseConstructionDetail(d.floorCeiling)},
            {uniqueId: "roof", label: "Roof", construction: parseConstructionDetail(d.roof)},
            {uniqueId: "ground_floor", label: "Ground Wall", construction: parseConstructionDetail(d.groundFloor)},
            {uniqueId: "window", label: "Window", construction: parseConstructionDetail(d.window)}
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

