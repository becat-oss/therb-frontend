import { LineChart } from "baues-uikit";
import React from "react";


export default function LineChartComponent():React.ReactElement{

  const testData = [
    ["weekday", 0, 1],
    ["saturday", 0.5, 0.5],
    ["sunday", 1, 0],
    ["coolingday", 0, 0],
  ];

  const testLabels = ["date", "0:00", "1:00"];

  return<LineChart data={testData} labels={testLabels}/>
}