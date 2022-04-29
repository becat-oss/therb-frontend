import React from "react";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { useGeometryContext } from "../GeometryContext";
import Button from "@material-ui/core/Button";

interface FormProps{
  name:string;
  disabled: boolean;
}
function Form({name,disabled=false}:FormProps): React.ReactElement {
  const { wwr,setWwr } = useGeometryContext();
  console.log('wwr in form',wwr);
  return (
    <FormControl style={{display:disabled ? 'none':undefined}}>
      <TextField
        key={name}
        id={name}
        variant="standard"
        defaultValue={wwr}
        onChange = {(e: React.ChangeEvent<HTMLInputElement>) => {
          setWwr(Number(e.target.value));
        }}
        label={name}
        type="number"
      />
      <FormHelperText>
        WWR
      </FormHelperText>
    </FormControl>
  )
}

function FormPerWall({name,disabled=true}:FormProps): React.ReactElement {
  const { wwrs,setWwrs } = useGeometryContext();
  return (
    <FormControl style={{display:disabled ? 'none':undefined}}>
      <TextField
        key={name}
        id={name}
        variant="standard"
        defaultValue={wwrs[name]}
        onChange = {(e: React.ChangeEvent<HTMLInputElement>) => {
          setWwrs({...wwrs,[name]:Number(e.target.value)});
        }}
        label={name}
        type="number"
      />
      <FormHelperText>
        WWR
      </FormHelperText>
    </FormControl>
  )
}

export default function WwrForm():React.ReactElement{
  const { perWall,setPerWall,wwrs } = useGeometryContext();
  return(
    <>
      <Form name="room" disabled={perWall}/>
      {Object.keys(wwrs).map((key)=>{
        return <FormPerWall name={key} disabled={!perWall}/>
      })}
      <Button variant="outlined" color="secondary" onClick={()=>setPerWall(!perWall)}>
        入力方法切替
      </Button>
    </>
  )
}