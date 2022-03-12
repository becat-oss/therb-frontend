export function HSLToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;
  
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;
  
    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
      r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    let rStr = Math.round((r + m) * 255).toString(16);
    let gStr = Math.round((g + m) * 255).toString(16);
    let bStr = Math.round((b + m) * 255).toString(16);
  
    // Prepend 0s, if necessary
    if (rStr.length === 1) { rStr = '0' + rStr; }
    if (gStr.length === 1) { gStr = '0' + gStr; }
    if (bStr.length === 1) { bStr = '0' + bStr; }
  
    return '#' + rStr + gStr + bStr;
  }
  
  export function HSLAToHexA(h: number, s: number, l: number, a: number): string {
    const hex = HSLToHex(h, s, l);
    let aStr = Math.round(a * 255).toString(16);
    if (aStr.length === 1) { aStr = '0' + aStr; }
  
    return hex + aStr;
  }
  