import { TextField } from "@material-ui/core";
import { TransitEnterexit,BorderColor, FitScreen } from '@mui/icons-material';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import React from "react";
import Sidebar from "src/components/Sidebar";
import { useEditPlansContext } from "./EditPlansContext";

function NorthAxisInput():React.ReactElement{
  const { northAxis,setNorthAxis } = useEditPlansContext();
  return(
    <TextField 
      id="northAxis"
      label=""
      type="number"
      value={northAxis}
      onChange={(e)=>{
        setNorthAxis(Number(e.target.value));
      }}
    />
  )
}

function EditFunctionButtons():React.ReactElement{
  const {setEditFunction} = useEditPlansContext();
  
  return(
    <Box>
      <IconButton onClick={():void=>{
        setEditFunction('Select');
      }}>
        <TransitEnterexit />
      </IconButton>
      <IconButton onClick={():void=>{
        setEditFunction('ZoomExtendAll');
      }}>
        <FitScreen />
      </IconButton>
      <IconButton onClick={():void=>{
        setEditFunction('AddRectangle');
      }}>
        <BorderColor />
      </IconButton>
    </Box>
  )
}

export default function InputSidebar():React.ReactElement{
  return(
    <Sidebar anchor="right">
      <Stack direction = "column" spacing={2}>
        <NorthAxisInput />
        <EditFunctionButtons />
      </Stack>
    </Sidebar>
  )
}