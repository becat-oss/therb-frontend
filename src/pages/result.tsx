import ChartCanvas, { ChartCanvasConfig } from "src/components/ChartCanvas";
import { useMemo, useCallback, useState } from "react";
import { energyBreakdownColor } from 'src/Color';
import { AnalysisResults } from "src/AppTypes";
import { useAppContext } from "src/AppContext";

interface EnergyBreakdownData {
    labels?: string[];
    datasetsValue?: number[];
    backgroundColor?: string[];
}

function useGetEnergyBreakdown():(analysisResults:AnalysisResults)=>EnergyBreakdownData{

    const getEnergyBreakdown = useCallback(
        (analysisResults: AnalysisResults): EnergyBreakdownData=>{
            const kWh = analysisResults['energy_breakdown[kWh]'];
            const labels = kWh && Object.keys(kWh);
            const datasetsValue = kWh && Object.values(kWh);
            const backgroundColor= Object.keys(kWh).map((cat)=>{
                return energyBreakdownColor[cat]
            })

            return {labels,datasetsValue,backgroundColor}
        },[]
    )

    return getEnergyBreakdown
}

export default function Result(): React.ReactElement{
    const getEnergyBreakdown = useGetEnergyBreakdown();
    //const{ analysisResults }=useAppContext();
    const analysisResults:AnalysisResults={
        'energy_breakdown[kWh]':{
            'Cooling/General':100,
            'Heating/General':20,
            'Interior Lighting/General':50
        }}
    const {labels, datasetsValue,backgroundColor}=useMemo(()=>getEnergyBreakdown(analysisResults),[])
    const [data,setData]=useState<number[] | undefined>(datasetsValue);

    const config = useMemo(():ChartCanvasConfig=>{
        return {
            title:'test',
            type: 'doughnut',
            labels,
            data: data || [],
            backgroundColor,
        }
    },[])
    return(
         <ChartCanvas config={config} width='100%' height='100%'></ChartCanvas>

    )
}