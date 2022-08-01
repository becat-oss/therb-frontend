import { TimeSeriesKey, TimeseriesPayload } from "src/AppTypes";

export type LineChartData = (string | number | Date)[][];
export type LineChartLabel = (string | { type: 'number' | 'date' | 'datetime' | 'timeofday', label: string })[];

export function convertPayloadToLineChartData(payload: TimeseriesPayload,key:TimeSeriesKey,start:Date | null, end:Date|null): { labels: LineChartLabel; chartData: LineChartData } {
  if (payload.result.length === 0)  return { labels: [], chartData: [] };

  //TODO: this label should be updated dynamically
  const labels: LineChartLabel = ['time']
  const roomLabels: LineChartLabel = payload.result.map((r) => r.id);
  labels.push(...roomLabels);
  //const chartData = Object.values(payload)[0].map((point) => [point[0]]);
  const chartData:LineChartData =[]
  chartData[0]=Object.values(JSON.parse(payload.result[0].hour));
  // chartData[0]=Object.values(JSON.parse(payload.result[0].hour)).map((date:string)=>{
  //   return new Date(date);
  // }); 
  payload.result.forEach((r,i)=>{
    //@ts-ignore
    chartData[i+1] = Object.values(JSON.parse(JSON.parse(r[key])));
    //TODO:roomTに二回JSON.parseする必要があるので、バックエンド側の修正必要
  })

  //console.log('transpose',transpose(chartData));
  return { labels, chartData: transpose(chartData) };
}

function filterByDate(data: LineChartData, start: Date | null, end: Date | null) {
  return data.filter(d => {
    const xValue = d[0];
    console.log('xValue', xValue);
    if (xValue instanceof Date) {
      const xDateTime = xValue.getTime();
      console.log('xDateTime', xDateTime);
      console.log('start', start);
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

function transpose(matrix:any[][]) :LineChartData {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}
