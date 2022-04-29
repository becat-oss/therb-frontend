import React, { useMemo } from 'react';
import { Chart } from 'react-google-charts';
import { useTheme } from '@mui/material/styles';
import { useParentSize } from '../utils/useWindowSize';

export type ColumnChartData = (string | number | Date)[][];
export type ColumnChartLabel = (string | { type: 'number' | 'date' | 'datetime' | 'timeofday', label: string })[];

interface Props {
  data: ColumnChartData;
  labels: ColumnChartLabel;
  title?: string;
  vAxisTitle?: string;
  hAxisTitle?: string;
  backgroundColors?: string[];
  percentage?: boolean;
  isStacked?: boolean | 'percent' | 'relative' | 'absolute';
}

export default function ColumnChart({ data, labels, title, hAxisTitle, vAxisTitle, backgroundColors, percentage = false, isStacked = false }: Props): React.ReactElement {
  const { ref, width } = useParentSize();
  const theme = useTheme();
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
          style={{ display: 'block', margin: '0 auto' }}
          width={width}
          height={width / 1.7}
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={[labels, ...data]}
          options={{
            title,
            titleTextStyle: {
              color: theme.palette.text.primary,
              fontSize: 16,
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
            legend: {
              textStyle: {
                color: theme.palette.text.primary,
              },
            },
            backgroundColor: 'transparent',
            colors: (backgroundColors && backgroundColors.length > 0) ? backgroundColors : undefined,
            pieSliceText: percentage ? 'percentage' : 'value',
            isStacked,
          }}
        />
      ) : <></>}
    </div>
  );
}
