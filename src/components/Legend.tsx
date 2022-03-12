import React from 'react'
import { FormGroup,FormControlLabel,Checkbox } from '@material-ui/core';

export default function Legend(){
  return(
    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="室温"/>
      <FormControlLabel disabled control={<Checkbox />} label="clodS"/>
    </FormGroup>
  )
}

