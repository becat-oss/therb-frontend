import { HSLToHex } from "./utils/color";

export const hueMaxMap = 0.75;
export const hueMax = 1;
export const hueMin = 0;
export const selectHue = 0.1;
export const deleteHue = 0;
export const defaultSaturation = 0.8;
export const defaultLightness = 0.5;
export const hslHMap = (hueMaxMap - hueMin) * 359;
export const hslH = (hueMax - hueMin) * 359;
export const hslS = defaultSaturation * 100;
export const hslL = defaultLightness * 100;

export interface ColorObj {
    [key:string]: string;
}

export interface Color {
  'scene/background/light': string | number | THREE.Color;
  'scene/background/dark': string | number | THREE.Color;
  'object': string;
  'canvas/object/light': string;
  'canvas/object/dark': string;
  'canvas/warning': string;
  'gridHelper': number | THREE.Color;
  'planeHelper': number;
  'coplanarHelper': number;
  'light': number;
  'wireframe': number;
  'select': string | number | THREE.Color;
  'results/geometry/default': number;
}

export const color: Color = {
  'scene/background/light': '#fff',
  'scene/background/dark': '#222229',
  'object': '#D1D5DB',
  'canvas/object/light': '#222222',
  'canvas/object/dark': '#f9f9f9',
  'canvas/warning': HSLToHex(hslH * 0.02, hslS, hslL),
  'gridHelper': 0x666666,
  'planeHelper': 0x999999,
  'coplanarHelper': 0x00bbff,
  'light': 0xffffff,
  'wireframe': 0x666666,
  'select': 0x00bbff,
  'results/geometry/default': 0xD1D5DB,
};

export const energyBreakdownColor: ColorObj = {
    'Cooling/General': HSLToHex(hslH * 0.7, hslS, hslL),
    'Heating/General': HSLToHex(hslH * 0.02, hslS, hslL),
    'Interior Lighting/General': HSLToHex(hslH * 0.12, hslS, hslL),
    'Interior Equipment/General': HSLToHex(hslH * 0.3, hslS, hslL),
    'Exterior Lighting/General': HSLToHex(hslH * 0.16, hslS, hslL),
    'Exterior Equipment/General': HSLToHex(hslH * 0.44, hslS, hslL),
    'Fans/General': HSLToHex(hslH * 0.6, hslS, hslL),
    'Pumps/General': HSLToHex(hslH * 0.8, hslS, hslL),
    'Heat Rejection/General': HSLToHex(hslH * 0.9, hslS, hslL),
  };