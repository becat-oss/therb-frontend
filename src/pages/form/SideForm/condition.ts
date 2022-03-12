import { useEditor } from "src/editor/useEditor";
import { useCallback, useState, useEffect } from "react";
import _ from 'lodash';
import { ConditionInputs, AnalysisZone, programKey, spaceTypeKey, wwrKey, perWwrKey, ConditionProperty } from "src/AppTypes";

export const initialWwr = (zone: AnalysisZone):number =>{
    //const value = defaultCondition[zone.program][zone.space_type]?.base_wwr ?? _.map()
    return 40
}
export const initialPerWwr = (zone:AnalysisZone):{ [index: string]: number}=>{
    const wwr: {[index: string]: number} = {};
    const defaultWwr = initialWwr(zone);

    zone.coordinates.forEach((_c,i)=>{
        if (zone.exteriorWalls.includes(i)){
            wwr[perWwrKey(i)]=zone.wwr?zone.wwr[i] ?? defaultWwr : defaultWwr;
        } else {
            wwr[perWwrKey(i)] = 0;
        }
    });
    return wwr
}

export function useCondition(){
    const { zones }=useEditor();

    const addDefaultCondition = useCallback((zone: AnalysisZone): AnalysisZone =>{
        const conditions: ConditionProperty = {base_wwr:40};
        const condtionedZone = {
            ...conditions,
            ...zone,
            envelope:'wood'
        };
        return condtionedZone;
    },[])

    const updateZoneCondition = useCallback((zone:AnalysisZone, inputs: ConditionInputs):void=>{
        const program = inputs[programKey];
        const spaceType = inputs[spaceTypeKey];
        const wwr0 = inputs[wwrKey];
        const wwr = (wwr0 || Number(wwr0) === 0) ? zone.coordinates.map((_,i)=>zone.exteriorWalls.includes(i) ? Number(wwr0) : null):[];
    },[])

    //Apply initial condition to zoneData
    const [startInit,setStartInit]=useState(false);
    const init = useCallback(():void=>{
        zones.forEach((zone)=>{
            const initialValues: ConditionInputs ={
                program: zone.program,
                space_type: zone.space_type,
                wwr:initialWwr(zone)
            };

            updateZoneCondition(addDefaultCondition(zone),initialValues);
        })
    },[])

    useEffect(()=>{
        init();
        setStartInit(false);
    },[startInit]);

    return {
        updateZoneCondition
    }
}