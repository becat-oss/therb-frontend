import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo, useContext } from "react";
import { getTimeseriesData } from "src/api/KeyRequests";
import { TimeSeriesDataObject, TimeseriesKey } from "src/AppTypes";

interface TimeseriesState{
  timeseriesData: TimeSeriesDataObject;
  setTimeseriesData: (timeseriesData: TimeSeriesDataObject) => void;
  timeseriesKey: TimeseriesKey;
  setTimeseriesKey: (timeseriesKeys: TimeseriesKey) => void;
  chartStartDate: Date | null;
  setChartStartDate: (chartStartDate: Date | null) => void;
  chartEndDate: Date | null;
  setChartEndDate: (chartEndDate: Date | null) => void;
}

const thisYear = new Date().getFullYear();
const initialStartDate = new Date(thisYear, 0, 1);
const initialEndDate = new Date(thisYear, 11, 31);

const initialState: TimeseriesState = {
  timeseriesData: {},
  setTimeseriesData: () => { return; },
  timeseriesKey: "roomT",
  setTimeseriesKey: () => { return; },
  chartStartDate: initialStartDate,
  setChartStartDate: () => { return; },
  chartEndDate: initialEndDate,
  setChartEndDate: () => { return; }
}

export const TimeseriesContext = React.createContext<TimeseriesState>(initialState);

interface TimeseriesProviderProps{
  children: React.ReactNode;
}

export function TimeseriesProvider({children}: TimeseriesProviderProps): React.ReactElement{
  //routerから提供されたidを受け取る
  const router = useRouter();
  const {projectId}=router.query;
  const req=getTimeseriesData(projectId);
  const [timeseriesKey, setTimeseriesKey] = useState(initialState.timeseriesKey);
  const [timeseriesData, setTimeseriesData] = useState(initialState.timeseriesData);
  const [chartStartDate, setChartStartDate] = useState(initialState.chartStartDate);
  const [chartEndDate, setChartEndDate] = useState(initialState.chartEndDate);

  useEffect(()=>{
    async function getTiemseries(){
      const response = await req;
      
      //TODO: responseの型をどこかで変換する必要
      setTimeseriesData(response["data"]);
    }
    getTiemseries();
  },[projectId]);

  useEffect(()=>{
    console.log('timeseriesKey',timeseriesKey);
  },[timeseriesData]);

  const timeseriesState: TimeseriesState = useMemo(() =>{
    return {
      timeseriesData,
      setTimeseriesData,
      timeseriesKey,
      setTimeseriesKey,
      chartStartDate,
      setChartStartDate,
      chartEndDate,
      setChartEndDate
    }
  },[timeseriesData]);

  return <TimeseriesContext.Provider value={timeseriesState}>{children}</TimeseriesContext.Provider>
}

export function useTimeseriesContext(): TimeseriesState{
  return useContext(TimeseriesContext);
}