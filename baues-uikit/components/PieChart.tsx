import React from 'react';
import { Chart } from 'react-google-charts';
import { useTheme } from '@mui/material/styles';
import { useParentSize } from '../utils/useWindowSize';

export type PieChartData = [string, number];

interface Props {
  data: PieChartData[];
  title?: string;
  backgroundColors?: string[];
  percentage?: boolean;
}

export default function PieChart({ data, title, backgroundColors, percentage = false }: Props): React.ReactElement {
  const { ref, width } = useParentSize();
  const datasets = [['name', 'value'], ...data];
  const theme = useTheme();

  return (
    <div ref={ref} style={{ width: '100%' }}>
      {width ? (
        <Chart
          style={{ display: 'block', margin: '0 auto' }}
          width={width}
          height={width / 1.7}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={datasets}
          options={{
            title,
            titleTextStyle: {
              color: theme.palette.text.primary,
              fontSize: 16,
            },
            legend: {
              textStyle: {
                color: theme.palette.text.primary,
              },
            },
            backgroundColor: 'transparent',
            colors: backgroundColors,
            pieSliceText: percentage ? 'percentage' : 'value',
          }}
        />
      ) : <></>}
    </div>
  );
}
