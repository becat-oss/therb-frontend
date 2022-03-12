import Chart, { ChartType,ChartPoint,ChartColor,Scriptable } from 'chart.js';
import { useTheme } from '@material-ui/core/styles';
import { useCallback, useRef, useState, useEffect, MutableRefObject, SetStateAction, Dispatch } from 'react';

export interface ChartConfig {
    title?: string;
    type: ChartType;
    labels?: (string | number | string[] | number[] | Date | Date[] | moment.Moment | moment.Moment[])[];
    data?: (number | number[] | null | undefined)[] | ChartPoint[] | number[];
    backgroundColor?: string | CanvasGradient | CanvasPattern | string[] | ChartColor[] | Scriptable<ChartColor>;
}

export const useCreateConfig = (): (ChartConfig: ChartConfig) => Chart.ChartConfiguration => {
    const theme = useTheme();

    const createConfig = useCallback(({title, type, labels, data, backgroundColor}:ChartConfig):Chart.ChartConfiguration=>{
        const config: Chart.ChartConfiguration = {
            type,
            data: {
                labels,
                datasets:[
                    {
                        label: title,
                        data,
                        backgroundColor,
                        borderColor: theme.palette.divider,
                        borderWidth: 1
                    }
                ]
            },
            //plugins: [ChartDataLabels,CenterPlugin]
            options: {
                title: {
                    display: false,
                    text: title,
                },
                legend: {
                    position: 'right',
                    labels: {
                        fontColor: theme.palette.text.primary,
                    }
                }
            }
        };

        return config
    },[])

    return createConfig
}
export function useChart(type:ChartType): [Chart | null, MutableRefObject<HTMLCanvasElement|null>,Dispatch<SetStateAction<Chart.ChartConfiguration>>]{
    const createConfig = useCreateConfig();
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const [chart,setChart] = useState<Chart | null>(null);
    const [config,setConfig] = useState<Chart.ChartConfiguration>(createConfig({type}));

    useEffect(()=>{
        if (chartRef && chartRef.current && config.data?.datasets && config.data?.datasets.length > 0 && config.data?.datasets[0].data){
            if (chart){
                chart.destroy();
            }
            const newChart = new Chart(chartRef.current, config);
            setChart(newChart);
        }
    },[chartRef, config]);

    return [chart, chartRef, setConfig]
}