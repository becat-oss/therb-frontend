import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

export interface ILineData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: "time",
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "set point",
      },
      beginAtZero: true,
    },
  },
};

export default function LineChart({
  data,
}: {
  data: ILineData;
}): React.ReactElement {
  return <Line options={options} data={data} />;
}
