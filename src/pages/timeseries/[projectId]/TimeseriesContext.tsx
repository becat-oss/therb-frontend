import { useRouter } from 'next/router';
import React, {useState, useContext,useEffect, useMemo} from 'react';
import _ from 'lodash';
import { getTimeseriesData } from 'src/api/KeyRequests';
import { useQuery } from "@apollo/client";
import { GET_RESULT } from "src/queries/posts.query";
import { TimeSeriesKey,timeseriesKeys, TimeseriesPayload, TimeseriesPayloadObject } from 'src/AppTypes';
import { convertPayloadToLineChartData } from 'src/utils/timeseries';

interface TimeseriesState{
  timeseriesKey:TimeSeriesKey;
  setTimeseriesKey: (timeseriesKey:TimeSeriesKey) => void;
  loading:boolean;
  data:TimeseriesPayload;
  chartStartDate: Date | null;
  setChartStartDate: (chartStartDate: Date | null) => void;
  chartEndDate: Date | null;
  setChartEndDate: (chartEndDate: Date | null) => void;
};

const year2021 = new Date().getFullYear()-1;
const initialStartDate = new Date(year2021, 0, 1);
const initialEndDate = new Date(year2021, 11, 31);

const initialState: TimeseriesState ={
  timeseriesKey:timeseriesKeys[0],
  setTimeseriesKey:()=>{return;},
  loading:false,
  data:{},
  chartStartDate: initialStartDate,
  setChartStartDate: () => { return; },
  chartEndDate: initialEndDate,
  setChartEndDate: () => { return; }
};

export const TimeseriesContext = React.createContext<TimeseriesState>(initialState);

interface TimeseriesProviderProps{
  children: React.ReactNode;
}

export function TimeseriesProvider({ children }: TimeseriesProviderProps): React.ReactElement{
  const [timeseriesKey,setTimeseriesKey] = useState(initialState.timeseriesKey);
  const router = useRouter();
  const { projectId }=router.query;
  const { loading:loading,error,data } = useQuery(GET_RESULT, {
    variables: { projectId:Number(projectId) },
  });
  const [chartStartDate, setChartStartDate] = useState(initialState.chartStartDate);
  const [chartEndDate, setChartEndDate] = useState(initialState.chartEndDate);

  const dates:number[] = useMemo(() => {
    if (!data || _.isEmpty(data)) return [];
    return Object.values(JSON.parse(data.result[0].hour)).map((date:string)=>{
      return new Date(date).getTime();
    }) as number[]
  }, [data]);

  const minDate = useMemo(() => {
    if (dates.length === 0) return null;
    return new Date(Math.min(...dates));
  }, [dates]);

  const maxDate = useMemo(() => {
    if (dates.length === 0) return null;
    return new Date(Math.max(...dates));
  }, [dates]);

  useEffect(() => {
    console.log('chartStartDate changed',chartStartDate);
    // if (!chartStartDate && minDate){
    //   setChartStartDate(new Date(minDate));
    // }else if(!chartStartDate){
    //   setChartStartDate(initialState.chartStartDate);
    // }else if(chartStartDate && minDate && chartStartDate.getTime() < minDate.getTime()){
    //   setChartStartDate(new Date(minDate));
    // }
  } , [chartStartDate,minDate]);

  useEffect(() => {
    console.log('chartEndDate changed',chartEndDate);
    // if (!chartEndDate && maxDate){
    //   setChartEndDate(new Date(maxDate));
    // }else if(!chartEndDate){
    //   setChartEndDate(initialState.chartEndDate);
    // }else if(chartEndDate && maxDate && chartEndDate.getTime() > maxDate.getTime()){
    //   setChartEndDate(new Date(maxDate));
    // }
  } , [chartEndDate,maxDate]);
  
  const timeseriesState: TimeseriesState = useMemo(() =>{
    return {
      timeseriesKey,
      setTimeseriesKey,
      loading,
      data,
      chartStartDate,
      setChartStartDate,
      chartEndDate,
      setChartEndDate
    }
  },[timeseriesKey,loading,data,chartStartDate,chartEndDate]);

  return <TimeseriesContext.Provider value={timeseriesState}>{children}</TimeseriesContext.Provider>
}

export function useTimeseriesContext(): TimeseriesState{
  return useContext(TimeseriesContext);
}