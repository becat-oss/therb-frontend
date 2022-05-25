import { CanvasDocument } from 'building-editor-2d/Canvas';
//import { programKey, shadingKey, spaceTypeKey, wwrKey } from 'src/AppTypes';
import { PolylineObject } from '../Canvas/Object';
import { Polyline, Point } from '../Geometry';

// export class Zone {

//   static convertPolylineToZone(polyline: PolylineObject, index: number, fl: number): AnalysisZone {
//     return {
//       name: fl + '_zone' + index,
//       coordinates: polyline.toAnalysisPointArray(),
//       exteriorWalls: [],
//       [programKey]: "office",
//       [spaceTypeKey]: "office_closed",
//       [wwrKey]: [],
//       [shadingKey]: [],
//       envelope: "concrete",
//       base_wwr: 40,
//       cooling_setpt: 26,
//       heating_setpt: 20,
//       hvac: "VRF::VRF",
//       ef_ach: 0,
//       ef_deltapressure: 0,
//     };
//   }

  // static convertZonesToPolylines(geometries: AnalysisFloorGeometry[]): PolylineObject[] {
  //   const polylineObjs: PolylineObject[] = [];

  //   for (let floor = 0; floor < geometries.length; floor++) {
  //     const zones = geometries[floor].zones!;

  //     if (zones) {
  //       zones.forEach((zone) => {
  //         const polyline = new Polyline();
  //         const coordinates = zone.coordinates;

  //         for (let i = 0; i < coordinates.length; i++) {
  //           polyline.push(new Point(coordinates[i][0], coordinates[i][1]));
  //         }

  //         polylineObjs.push(
  //           new PolylineObject(polyline, zone.name, String(floor)),
  //         );
  //       });
  //     }
  //   }

  //   return polylineObjs;
  // }

//   static convertToAnalysisZoneGeometry(doc: CanvasDocument, analysisGeometries: AnalysisFloorGeometry[]): void {
//     for (let i = 0; i < analysisGeometries.length; i++) {
//       let objIndex = 1;
//       const floor = analysisGeometries[i].floor;
//       analysisGeometries[i].zones! = [];

//       doc.geometryObjects.forEach((obj) => {
//         if (obj.layerName === String(floor) && obj.objectType === 'Polyline') {
//           const polyline = obj as PolylineObject;
//           analysisGeometries[i].zones!.push(
//             Zone.convertPolylineToZone(polyline, objIndex, floor));
//           objIndex++;
//         }
//       });

//     }
//   }
// }
