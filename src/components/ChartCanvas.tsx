import { useChart, ChartConfig, useCreateConfig } from "src/utils/useChart"
//import { ChartPoint } from "chart.js";
import { useEffect } from "react";

interface Data {
    //data: (number | number[] | null | undefined)[] | ChartPoint[];
    data: (number | number[] | null | undefined)[] ;
}

export type ChartCanvasConfig = Omit<ChartConfig, keyof Data> & Data;

type Props = React.HTMLAttributes<HTMLCanvasElement> & {
    config: ChartCanvasConfig;
    width?: string | number;
    height?: string | number;
}

export default function ChartCanvas({config,width,height, ...others}: Props): React.ReactElement {
    const createConfig = useCreateConfig();
    const [chart, chartRef, setConfig]=useChart(config.type);

    useEffect(()=>{
        if(config){
            setConfig(createConfig(config));
        }
    },[config]);
    
    return (
        <div style={{ position: 'relative',height, width}}>
            <canvas ref={chartRef} {...others}/>
        </div>
    )
}