import React, { useMemo } from 'react';
import { Chart } from 'react-google-charts';
import { useTheme } from '@mui/material/styles';
import { useParentSize } from '../utils/useWindowSize';

export type LineChartData = (string | number | Date)[][];
export type LineChartLabel = (string | { type: 'number' | 'date' | 'datetime' | 'timeofday', label: string })[];

interface Props {
  data: LineChartData;
  labels: LineChartLabel;
  title?: string;
  vAxisTitle?: string;
  hAxisTitle?: string;
  colors?: string[];
}

const dataLength = 300;

export default function LineChart({ data, labels, title, vAxisTitle, hAxisTitle, colors }: Props): React.ReactElement {
  const { ref, width } = useParentSize();
  const theme = useTheme();

  const filteredData = data.length > dataLength ? data.filter((_, i) => i % Math.round(data.length / dataLength) === 0) : data;
  const dateFormat = useMemo(() => {
    const dates = data
      .map((p) => (p[0] instanceof Date ? p[0].getTime() : null))
      .filter((d) => !!d) as number[];

    if (dates.length === 0) return undefined;

    const deltaDay = (Math.max(...dates) - Math.min(...dates)) / 1000 / 60 / 60 / 24;
    if (deltaDay < 7) {
      return 'M/d h:mm a';
    } else {
      return 'M/d';
    } 
  }, [data]);


  return (
    <div ref={ref} style={{ width: '100%' }}>
      {width ? (
        <Chart
          width={width}
          height={width / 1.7}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[labels, ...filteredData]}
          options={{
            title,
            titleTextStyle: {
              color: theme.palette.text.primary,
              fontSize: 18,
            },
            colors,
            backgroundColor: 'transparent',
            chartArea: {
              backgroundColor: 'transparent',
            },
            legend: {
              textStyle: {
                color: theme.palette.text.primary,
              },
            },
            hAxis: {
              title: hAxisTitle,
              titleTextStyle: {
                color: theme.palette.text.primary,
                italic: false,
              },
              textStyle: {
                color: theme.palette.text.primary,
              },
              baselineColor: theme.palette.text.primary,
              format: dateFormat,
            },
            vAxis: {
              title: vAxisTitle,
              titleTextStyle: {
                color: theme.palette.text.primary,
                italic: false,
              },
              textStyle: {
                color: theme.palette.text.primary,
              },
              baselineColor: theme.palette.text.primary,
            },
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
