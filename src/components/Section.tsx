import Paper, { PaperProps } from '@mui/material/Paper';
import React from "react";

export default function Section({sx, ...others}: PaperProps):React.ReactElement{
  return(
    <Paper sx={{display:'flex',alignItems:'center',justifyContent:'center',...sx}}{...others} />
  )
}