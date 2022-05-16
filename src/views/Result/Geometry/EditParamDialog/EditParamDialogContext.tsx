import React, { useContext, useEffect, useMemo, useState } from "react";
import { GridColumns } from '@mui/x-data-grid';
import AnalysisParams, { LoadGridRowData, LoadParams, ScheduleGridRowData, ScheduleParams } from 'src/utils/AnalysisParams';
import { useGeometryContext } from "../GeometryContext";
import _ from "lodash";

export type InputCategoryKey = 'internal_load' | 'envelope'|'schedule';

interface EditParamDialogState{
  loadColData: GridColumns;
  loadRowData: LoadGridRowData[];
  setLoadRowData: (loadRowData: LoadGridRowData[]) => void;
  inputCategoryKey: InputCategoryKey;
  setInputCategoryKey: (inputCategoryKey: InputCategoryKey) => void;
  scheduleColData: GridColumns;
  scheduleRowData: ScheduleGridRowData[];
  setScheduleRowData: (scheduleRowData: ScheduleGridRowData[]) => void;
  //scheduleGraphData: ScheduleGridRowData[];
}

const initialState: EditParamDialogState = {
  loadColData: [],
  loadRowData: [],
  setLoadRowData: () => { return;},
  inputCategoryKey: 'internal_load',
  setInputCategoryKey: () => { return;},
  scheduleColData: [],
  scheduleRowData: [],
  setScheduleRowData: () => { return;},
}

export const EditParamDialogContext = React.createContext<EditParamDialogState>(initialState);

interface EditParamDialogProviderProps{
  children: React.ReactNode;
}

export function EditParamDialogProvider({children}: EditParamDialogProviderProps): React.ReactElement{
  const { spaceTypeParams,programParams } =useGeometryContext();
  const [inputCategoryKey,setInputCategoryKey] = React.useState<InputCategoryKey>(initialState.inputCategoryKey);

  const loadParams = new AnalysisParams(spaceTypeParams);
  const loadData = loadParams.loadToDataSheet();

  const loadColData = useMemo(() => {
    const cloneCols = _.cloneDeep(loadData.columns);

    return cloneCols;
  },[loadData.columns]);

  const loadRow = useMemo(() => {
    const cloneRows = _.cloneDeep(loadData.rows);

    //TODO: 選ばれているspace typeのみをフィルタリングする

    return cloneRows;
  } ,[loadData.rows]);

  const [loadRowData,setLoadRowData] = useState(loadRow);


  //scheduleに関するデータを処理
  const scheduleParams = new ScheduleParams(programParams);
  const scheduleData = scheduleParams.toDataSheet();

  const scheduleColData = useMemo(() => {
    const cloneCols = _.cloneDeep(scheduleData.columns);

    return cloneCols;
  },[scheduleData.columns]);

  const scheduleRow = useMemo(() => {
    const cloneRows = _.cloneDeep(scheduleData.rows);
    //TODO: 選ばれているspace typeのみをフィルタリングする

    return cloneRows;
  } ,[scheduleData.rows]);

  const [scheduleRowData,setScheduleRowData] = useState(scheduleRow);

  // useEffect(()=>{
  //   scheduleParams.fromDataSheet(scheduleRowData);
  // })

  const state: EditParamDialogState = useMemo(()=>{
    return {
      loadColData,
      loadRowData,
      setLoadRowData,
      inputCategoryKey,
      setInputCategoryKey,
      scheduleColData,
      scheduleRowData,
      setScheduleRowData
    }
  },[loadColData,loadRowData,setLoadRowData,scheduleColData,scheduleRowData,inputCategoryKey,setInputCategoryKey,setScheduleRowData]);

  return <EditParamDialogContext.Provider value={state}>{children}</EditParamDialogContext.Provider>
}

export function useEditParamDialogContext(): EditParamDialogState{
  return useContext(EditParamDialogContext);
}