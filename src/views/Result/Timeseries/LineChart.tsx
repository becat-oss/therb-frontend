import React from "react";
import { useTimeseriesContext } from "./TimeseriesContext";

export default function LineChartComponent():React.ReactElement{

  const { timeseriesKey } = useTimeseriesContext();
  
  return <LineChart  title={timeseriesKey} />
}