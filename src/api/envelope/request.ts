import { IEnvelope } from "src/models/envelope";
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
          tags: d.tags.map(t=>{return {label: t.name,id: t.id.toString() }}),
          config: [
            {uniqueId: "exterior_wall", label: "Exterior Wall", constructionVal: d.exteriorWallId || null, uVal: ""},
            {uniqueId: "interior_wall", label: "Interior Wall", constructionVal: d.interiorWallId || null, uVal: ""},
            {uniqueId: "floor_ceiling", label: "Floor & Ceiling", constructionVal: d.floorCeilingId || null, uVal: ""},
            {uniqueId: "roof", label: "roof", constructionVal: d.roofId || null, uVal: ""},
            {uniqueId: "ground_floor", label: "Ground Floor", constructionVal: d.groundFloorId || null, uVal: ""},
            {uniqueId: "window_floor", label: "Window Floor", constructionVal: d.windowId || null, uVal: ""}
          ]
        };
      }
    );
    return formattedData;
  } catch (e) {
    return [
      {
        id: 1,
        name: "test",
        description: "test description",
        tags: [{label: "test", id: "1"}],
        config: [
          {uniqueId: "exterior_wall", label: "Exterior Wall", constructionVal: 1, uVal: "4"},
          {uniqueId: "interior_wall", label: "Interior Wall", constructionVal:1, uVal: "4"},
          {uniqueId: "floor_ceiling", label: "Floor & Ceiling", constructionVal: 1, uVal: "4"},
          {uniqueId: "roof", label: "roof", constructionVal:1, uVal: "4"},
          {uniqueId: "ground_floor", label: "Ground Floor", constructionVal: 1, uVal: "4"},
          {uniqueId: "window_floor", label: "Window Floor", constructionVal: 1, uVal: "4"}
        ]
      }
    ];
  }
}

const constructionOptionsMap = new Map<string, string[]>();
constructionOptionsMap.set("exterior_wall", ["RC 120mm", "RC 130mm"]);
constructionOptionsMap.set("interior_wall", [
  "Wooden Interior",
  "Frame Interior",
]);
constructionOptionsMap.set("floor_ceiling", ["Wooden floor", "Tile floor"]);
constructionOptionsMap.set("roof", ["RC roof", "Thachet roof"]);
constructionOptionsMap.set("ground_floor", ["Wooden floor", "Tile floor"]);
constructionOptionsMap.set("window_floor", ["Wooden floor", "Tile floor"]);

export async function getConstructionOptions_API(uniqueId: string) {
  const url = `https://stingray-app-vgak2.ondigitalocean.app/envelopes`;

  // const url = isProd
  //   ? `https://stingray-app-vgak2.ondigitalocean.app/constructions`
  //   : `http://localhost:5000/constructions`;
  // try {
  //   const response = await fetch(url, { mode: "cors" });
  //   const data = await response.json();
  //   const formattedData: IEnvelope_get[] = (data.data as IEnvelope_get[]).map(
  //     (d) => {
  //       return {
  //         id: d.id,
  //         name: d.name,
  //         description: d.description,
  //         exteriorWallId: d.exteriorWallId || null,
  //         interiorWallId: d.interiorWallId || null,
  //         roofId: d.roofId || null,
  //         groundFloorId: d.groundFloorId || null,
  //         floorCeilingId: d.floorCeilingId || null,
  //         windowId: d.windowId || null,
  //       };
  //     }
  //   );
  //   return formattedData;
  // } catch (e) {
  //   return [];
  // }
  const options = constructionOptionsMap.get(uniqueId);
  return options || [];
}

// export async function getConstructionConfig_API(uniqueId: string) {
//   const url = `https://stingray-app-vgak2.ondigitalocean.app/envelopes`;

//   // const url = isProd
//   //   ? `https://stingray-app-vgak2.ondigitalocean.app/constructions`
//   //   : `http://localhost:5000/constructions`;
//   // try {
//   //   const response = await fetch(url, { mode: "cors" });
//   //   const data = await response.json();
//   //   const formattedData: IEnvelope_get[] = (data.data as IEnvelope_get[]).map(
//   //     (d) => {
//   //       return {
//   //         id: d.id,
//   //         name: d.name,
//   //         description: d.description,
//   //         exteriorWallId: d.exteriorWallId || null,
//   //         interiorWallId: d.interiorWallId || null,
//   //         roofId: d.roofId || null,
//   //         groundFloorId: d.groundFloorId || null,
//   //         floorCeilingId: d.floorCeilingId || null,
//   //         windowId: d.windowId || null,
//   //       };
//   //     }
//   //   );
//   //   return formattedData;
//   // } catch (e) {
//   //   return [];
//   // }
//   const config = [
//     {
//       uniqueId: "exterior_wall",
//       label: "Exterior Wall",
//       construction: "RC 130mm",
//     },
//     {
//       uniqueId: "interior_wall",
//       label: "Interior Wall",
//       construction: "Frame Interior",
//     },
//     {
//       uniqueId: "floor_ceiling",
//       label: "floor & ceiling",
//       construction: "Wooden floor",
//     },
//     { uniqueId: "roof", label: "roof", construction: "Thachet roof" },
//     {
//       uniqueId: "ground_floor",
//       label: "ground floor",
//       construction: "Tile floor",
//     },
//     {
//       uniqueId: "window_floor",
//       label: "window floor",
//       construction: "Tile floor",
//     },
//   ];
//   return config;
// }
