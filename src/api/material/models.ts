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

export interface ITransparentMaterialSchema{
  ownerId: string;
  id: string;
  name: string;
  description?: string;
  conductivity: number;
  density?: number;
  specificHeat?: number;
  thickness?: number;
  thicknessOptions?: number[];
  solarTransmittance?: number;//Therbは未対応
  //以後はtherb用のattribute
  classification?: number;
  moistureCapacity?: number;
  moistureConductivity?: number;
}