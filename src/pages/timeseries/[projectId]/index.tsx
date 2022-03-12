import React from 'react';
import { AppProvider } from 'src/AppContext';
import LineChartComponent from './LineChart';
import { TimeseriesProvider } from './TimeseriesContext';

export default function Timeseries(): React.ReactElement{
  return(
    <AppProvider>
      <TimeseriesProvider>
        <LineChartComponent/>
      </TimeseriesProvider>
    </AppProvider>
    
  )
}