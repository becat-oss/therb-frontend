import { ConstructionCategory } from "src/models/category";
import { IEnvelope } from "src/models/envelope";
import { IAPIResponse } from "../ApiResponse";
import { parseConstructionDetail } from "../construction/requests";
import { IEnvelope_get, IEnvelope_post } from "./model";

//const isProd = process.env.NODE_ENV === "production";
const isProd = false;

export async function getEnvelopeDetails_API() {
  //const url = `https://stingray-app-vgak2.ondigitalocean.app/envelopes`;

  const url = isProd
    ? `https://stingray-app-vgak2.ondigitalocean.app/envelopes`
    : `http://localhost:5000/envelopes`;
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

export async function saveEnvelope(envelope: IEnvelope):Promise<IAPIResponse>{

  const url = isProd
    ? `https://stingray-app-vgak2.ondigitalocean.app/envelopes`
    : `http://localhost:5000/envelopes`;

  const envelopePost: IEnvelope_post = {
    name: envelope.name,
    description: envelope.description || "",
    //TODO:APIのidをstringに変更する
    exteriorWallId: parseInt(envelope.config.find(c => c.category === ConstructionCategory.EXTERIOR_WALL)?.construction.uniqueId),
    interiorWallId: parseInt(envelope.config.find(c => c.category === ConstructionCategory.INTERIOR_WALL)?.construction.uniqueId),
    floorCeilingId: parseInt(envelope.config.find(c => c.category === ConstructionCategory.INTERIOR_FLOOR)?.construction.uniqueId),
    roofId: parseInt(envelope.config.find(c => c.category === ConstructionCategory.EXTERIOR_ROOF)?.construction.uniqueId),
    groundFloorId: parseInt(envelope.config.find(c => c.category === ConstructionCategory.GROUND_FLOOR)?.construction.uniqueId),
    windowId: parseInt(envelope.config.find(c => c.category === ConstructionCategory.WINDOW)?.construction.uniqueId),
  };

  const response = await fetch(url, {
    mode: "cors",
    method: "POST",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json", // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", 
    body: JSON.stringify(envelopePost),
  });
  const data = await response.json();

  const responseData: IAPIResponse = {
    status: "failed",
    message: "",
    data: [],
  };

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
