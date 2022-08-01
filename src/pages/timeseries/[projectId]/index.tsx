import Stack from '@mui/material/Stack';
import React from 'react';
import { AppProvider } from 'src/AppContext';
import Layout from 'src/components/Layout';
import DateSelector from './DateSelector';
import KeySelector from './KeySelector';
//import LineChartComponent from './LineChart';
import TimeseriesProvider from './TimeseriesContext';

export default function Timeseries(): React.ReactElement{
  return(
    <AppProvider>
      <TimeseriesProvider>
        <Layout>
          <div style={{display:'flex',width:'100%'}}>
            <Stack direction={{xs:'column',sm:'row'}}>
              <KeySelector/>
              <DateSelector />
            </Stack>
          </div>
          {/* <LineChartComponent/> */}
        </Layout>
      </TimeseriesProvider>
    </AppProvider>
    
  )
}