import { useRouter } from 'next/router';
import React, {useState, useContext,useEffect, useMemo} from 'react';
import { getTimeseriesData } from 'src/api/KeyRequests';
import { TimeseriesData } from 'src/AppTypes';

interface TimeseriesState{
  timeseriesData: TimeseriesData[];
  setTimeseriesData: (timeseriesData: TimeseriesData[]) => void;
};

const initialState: TimeseriesState ={
  timeseriesData:[],
  setTimeseriesData:()=>{return;}
};

export const TimeseriesContext = React.createContext<TimeseriesState>(initialState);

interface TimeseriesProviderProps{
  children: React.ReactNode;
}

export function TimeseriesProvider({ children }: TimeseriesProviderProps): React.ReactElement{
  const router = useRouter();
  const {projectId}=router.query;
  const req=getTimeseriesData(projectId);
  const [timeseriesData, setTimeseriesData] = useState(initialState.timeseriesData);

  useEffect(()=>{
    async function getTiemseries(){
      const response = await req;
      
      //TODO: responseの型をどこかで変換する必要
      setTimeseriesData(response["data"]);
    }
    getTiemseries();
  },[projectId])
  
  const timeseriesState: TimeseriesState = useMemo(() =>{
    return {
      timeseriesData,
      setTimeseriesData
    }
  },[timeseriesData]);

  return <TimeseriesContext.Provider value={timeseriesState}>{children}</TimeseriesContext.Provider>
}

export function useTimeseriesContext(): TimeseriesState{
  return useContext(TimeseriesContext);
}