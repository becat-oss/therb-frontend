export interface IMaterialSchema {
  id: string;
  name: string;
  description?: string;
  roughness?: string;
  conductivity: number;
  density: number;
  specificHeat: number;
  ownerId?: string;
  thickness?: number;
  thicknessOptions?: number[];
  moistureConductivity?: number;
  moistureCapacity?: number;
  classification?: number;  
}