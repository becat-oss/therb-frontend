import { ConstructionCategory } from "src/models/category";
import { IEnvelope } from "src/models/envelope";
import { IAPIResponse } from "../ApiResponse";
import { parseConstructionDetailToSchema, parseConstructionSchemaToDetail } from "../construction/requests";
import { IEnvelopeSchema, TEnvelopePayload } from "./model";

export async function getEnvelopeDetails_API() {
  
  const url = `https://z3ekk9rish.execute-api.ap-northeast-1.amazonaws.com/dev/`;
  //const url = `https://stingray-app-vgak2.ondigitalocean.app/envelopes`;
  
  try {
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();
    const formattedData: IEnvelope[] = (data.data as IEnvelopeSchema[]).map(
      (d) => {
        console.log("d",d.id)
        return {
          id: d.id,
          name: d.name,
          description: d.description,
          tags: [],
          config: [
            {category: ConstructionCategory.EXTERIOR_WALL, label: "Exterior Wall", construction: parseConstructionSchemaToDetail(d.exteriorWall)},
            {category: ConstructionCategory.INTERIOR_WALL, label: "Interior Wall", construction: parseConstructionSchemaToDetail(d.interiorWall)},
            {category: ConstructionCategory.INTERIOR_FLOOR, label: "Floor & Ceiling", construction: parseConstructionSchemaToDetail(d.floorCeiling)},
            {category: ConstructionCategory.EXTERIOR_ROOF, label: "Roof", construction: parseConstructionSchemaToDetail(d.roof)},
            {category: ConstructionCategory.GROUND_FLOOR, label: "Ground Floor", construction: parseConstructionSchemaToDetail(d.groundFloor)},
            {category: ConstructionCategory.WINDOW, label: "Window", construction: parseConstructionSchemaToDetail(d.window)}
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

export async function saveEnvelope(envelope: Omit<IEnvelope, "id">):Promise<IAPIResponse>{

  const url = "https://z3ekk9rish.execute-api.ap-northeast-1.amazonaws.com/dev/"

  const envelopePost: TEnvelopePayload = {
    name: envelope.name,
    description: envelope.description || "",
    //TODO:APIのidをstringに変更する
    exteriorWall: parseConstructionDetailToSchema(envelope.config.find(c => c.category === ConstructionCategory.EXTERIOR_WALL)?.construction),
    interiorWall: parseConstructionDetailToSchema(envelope.config.find(c => c.category === ConstructionCategory.INTERIOR_WALL)?.construction),
    floorCeiling: parseConstructionDetailToSchema(envelope.config.find(c => c.category === ConstructionCategory.INTERIOR_FLOOR)?.construction),
    roof: parseConstructionDetailToSchema(envelope.config.find(c => c.category === ConstructionCategory.EXTERIOR_ROOF)?.construction),
    groundFloor: parseConstructionDetailToSchema(envelope.config.find(c => c.category === ConstructionCategory.GROUND_FLOOR)?.construction),
    window: parseConstructionDetailToSchema(envelope.config.find(c => c.category === ConstructionCategory.WINDOW)?.construction),
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
