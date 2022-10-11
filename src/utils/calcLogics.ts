import { IMaterialDetail } from "src/models/material";

export function calcUvalue(construction:{ id: number; type: IMaterialDetail; thickness: number }[]):number{
  
  const heatResistance = construction.map(material=>{
    //FIXME: material.thickess should be used here
    console.log(material.thickness)
    return material.thickness/1000/material.type.conductivity;
  }).reduce((accumulator, current) => {
    return accumulator + current;
  }, 0)+(1/9)+(1/23);

  //FIXME: 小数点2桁にする
  return orgRound(1/heatResistance,2);
}

/**
 * 任意の桁で四捨五入する関数
 * @param {number} value 四捨五入する数値
 * @param {number} digit 小数点以下の桁数
 * @return {number} 四捨五入した値
 */
 function orgRound(value:number, digit:number) :number{
  return Math.round(value * 10**digit) / 10**digit;
}