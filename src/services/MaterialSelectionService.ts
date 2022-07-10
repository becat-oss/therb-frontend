import { IMaterialDetail } from "src/pages/material-addition/[id]";

export function getMaterialTags(): string[] {
  return ["tag1", "tag2", "tag3", "tag4", "tag5"];
}

export function getCategories(): string[] {
  return ["category1", "category2", "category3", "category4", "category5"];
}

export function getMaterialTypes(): string[] {
  return [
    "MaterialType1",
    "MaterialType2",
    "MaterialType3",
    "MaterialType4",
    "MaterialType5",
  ];
}

export function getMaterialSizes(): string[] {
  return ["10mm", "20mm", "30mm", "40mm", "50mm"];
}

export function generateUniqueId(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const materialMap = new Map<string, IMaterialDetail>();

export function addToMaterial(material: IMaterialDetail) {
  materialMap.set(material.uniqueId, material);
}

export function getMaterial(uniqueId: string) {
  return materialMap.get(uniqueId);
}

export function getMaterials(): {
  uniqueId: string;
  insulationSummary: string;
  insulationType?: string;
  thermalTransmittance?: string;
  materialHeights: number[];
}[] {
  const results: {
    uniqueId: string;
    insulationSummary: string;
    insulationType?: string;
    thermalTransmittance?: string;
    materialHeights: number[];
  }[] = [];
  materialMap.forEach((m) => {
    results.push({
      uniqueId: m.uniqueId,
      insulationSummary: m.name,
      insulationType: m.category,
      thermalTransmittance: `${m.uValue} W/m2k`,
      materialHeights: m.layerStructure.map((l) => parseFloat(l.thickness)),
    });
  });
  return results;
}

// export function getMaterials(): {
//   insulationSummary: string;
//   insulationType?: string;
//   thermalTransmittance?: string;
//   materialHeights: number[];
// }[] {
//   return [
//     {
//       insulationSummary: "Wood 50mm",
//       insulationType: "Heat",
//       thermalTransmittance: "U値 0.50 W/m2k",
//       materialHeights: [10, 50, 20],
//     },
//     {
//       insulationSummary: "Plastic 50mm",
//       insulationType: "Heat",
//       thermalTransmittance: "U値 0.50 W/m2k",
//       materialHeights: [20, 50, 20],
//     },
//     {
//       insulationSummary: "Metal 40mm",
//       thermalTransmittance: "U値 0.50 W/m2k",
//       materialHeights: [10, 40, 10],
//     },
//     {
//       insulationSummary: "Air 60mm",
//       insulationType: "Air",
//       materialHeights: [10, 60, 5],
//     },
//     {
//       insulationSummary: "Water 30mm",
//       materialHeights: [30, 30, 30],
//     },
//   ];
// }
