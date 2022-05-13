import { useTimeseriesContext } from "./TimeseriesContext";
import { Chart } from 'react-google-charts';
import { useRouter } from 'next/router';
import { useQuery } from "@apollo/client";
import { GET_RESULT } from "src/queries/posts.query";
import { convertPayloadToLineChartData } from 'src/utils/timeseries';
import LineChart from "src/components/baues-uikit/LineChart";

//export type LineChartData = (string | number | Date)[][];
export type LineChartData = any[][];
export type LineChartLabel = (string | { type: 'number' | 'date' | 'datetime' | 'timeofday', label: string })[];

function filterByDate(data: LineChartData, start: Date | null, end: Date | null):LineChartData {
  return data.filter(d => {
    const xValue =new Date(d[0]);
    if (xValue instanceof Date) {
      const xDateTime = xValue.getTime();
      if (start && end) {
        return start.getTime() <= xDateTime && xDateTime <= end.getTime();
      } else if (start) {
        return start.getTime() <= xDateTime;
      } else if (end) {
        return xDateTime <= end.getTime();
      }
    }

    return true;
  });
}

export default function LineChartComponent(): React.ReactElement{
  const { timeseriesKey,loading,data,chartStartDate,chartEndDate } = useTimeseriesContext();

  if (loading) return <p>'Loading...'</p>;
  //if (error) return <p>`Error! ${error.message}`</p>;

  const {labels,chartData}=convertPayloadToLineChartData(data,timeseriesKey,chartStartDate,chartEndDate);
  const filteredData = filterByDate(chartData, chartStartDate, chartEndDate);
  return <LineChart title="Line Chart" data={filteredData} labels={labels}/>;

}