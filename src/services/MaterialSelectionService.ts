export function getMaterialTags(): string[] {
  return ["tag1", "tag2", "tag3", "tag4", "tag5"];
}

export function getCategories(): string[] {
  return ["category1", "category2", "category3", "category4", "category5"];
}

export function getMaterials(): {
  insulationSummary: string;
  insulationType?: string;
  thermalTransmittance?: string;
  materialHeights: number[];
}[] {
  return [
    {
      insulationSummary: "Wood 50mm",
      insulationType: "Heat",
      thermalTransmittance: "U値 0.50 W/m2k",
      materialHeights: [10,50,20],
    },
    {
      insulationSummary: "Plastic 50mm",
      insulationType: "Heat",
      thermalTransmittance: "U値 0.50 W/m2k",
      materialHeights: [20,50,20],
    },
    {
      insulationSummary: "Metal 40mm",
      thermalTransmittance: "U値 0.50 W/m2k",
      materialHeights: [10,40,10],
    },
    {
      insulationSummary: "Air 60mm",
      insulationType: "Air",
      materialHeights: [10,60,5],
    },
    {
      insulationSummary: "Water 30mm",
      materialHeights: [30,30,30],
    },
  ];
}
