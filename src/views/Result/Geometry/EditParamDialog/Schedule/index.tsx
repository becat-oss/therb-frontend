import React from "react";
import { Container } from '@mui/material';
import { useEditParamDialogContext } from "../EditParamDialogContext";
import Datasheet from "src/components/Datasheet";
import Graph from "./Graph";

export default function Schedule():React.ReactElement{
  //TODO:Scheduleデータを取得する
  const {scheduleColData,scheduleRowData,setScheduleRowData} = useEditParamDialogContext();

  return (
    <Container>
      <Datasheet columns = {scheduleColData} rows={scheduleRowData} setRows={setScheduleRowData}/>
      <Graph />
    </Container>
  )
}