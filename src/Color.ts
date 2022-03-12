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