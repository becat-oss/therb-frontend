export interface IMaterialDetail {
  id: string;
  name: string;
  description: string;
  roughness: string;
  conductivity: number;
  density: number;
  specificHeat: number;
  ownerId: string;
  thickness: number;
  thicknessOptions: number[];
  moistureConductivity: number;
  moistureCapacity: number;
  classification: number;
}

export interface ITransparentMaterialDetail {
  id: string;
  name: string;
  description: string;
  conductivity: number;
  density: number;
  specificHeat: number;
  ownerId: string;
  solarTransmittance: number;
  thickness: number;
  thicknessOptions: number[];
  moistureConductivity: number;
  moistureCapacity: number;
  classification: number;
}
