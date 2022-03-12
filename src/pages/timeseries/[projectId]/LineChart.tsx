import { useTimeseriesContext } from "./TimeseriesContext";
import { Chart } from 'react-google-charts';
import { useRouter } from 'next/router';
import { convertNoneZoneDataObjectToLineChartData } from "src/utils/timeseries";

//export type LineChartData = (string | number | Date)[][];
export type LineChartData = any[][];
export type LineChartLabel = (string | { type: 'number' | 'date' | 'datetime' | 'timeofday', label: string })[];

export default function LineChartComponent(): React.ReactElement{
  const { timeseriesData } = useTimeseriesContext();
  
  const { labels, data } = convertNoneZoneDataObjectToLineChartData(timeseriesData);

  return (
    <Chart 
      chartType="LineChart"
      data={data}
      height={600}
    />
  )
}