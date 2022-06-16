import React,{useState} from "react";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ListSubheader from '@mui/material/ListSubheader';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ConstructionType } from 'types';
import { useEditParamDialogContext } from './EditParamDialogContext';
import { InsulationMaterials, OpaqueMaterials } from 'src/parameters';

interface ConstructionFormProps {
  title: string;
  construction: ConstructionType;
}

export default function ConstructionForm({ title, construction }: ConstructionFormProps):React.ReactElement{
  
  const{constructionSet, setConstructionSet,opaqueError,setOpaqueError} = useEditParamDialogContext();
  const [constructionArray, setConstructionArray] = useState(constructionSet[construction]);
  const materialList = InsulationMaterials.concat(OpaqueMaterials);

  const addField = () => {
    constructionArray.push({ Name: '', Thickness: 0, Conductivity: 100, Density: 100, Roughness: 'Rough', Specific_Heat: 100 });
    setConstructionArray([...constructionArray]);
  };

  const deleteMaterial = (i: number) => {
    const removedMaterial = constructionArray.splice(i, 1);
    setConstructionArray([...constructionArray]);
  };
  
  const validateThickness = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const inputThickness = Number(event.target.value);
    if (inputThickness <= 1 && inputThickness > 0) {
      return true;
    } else {
      return false;
    }
  };

  return(
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography align="center" variant="h5" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Typography align="center" variant="subtitle1" color="secondary">
        室外側
      </Typography>
      {constructionArray.map((con, i) => (
        <Stack key={i} direction="row" spacing={2} sx={{ mt: 1, mb: 1 }}>
          <FormControl sx={{ minWidth: 300 }}>
            <Select
              id={con.Name}
              value={con.Name}
              variant="outlined"
              onChange={(e) => {
                const changedMaterial = materialList.filter((material) => material.Name == e.target.value);
                constructionArray[i] = changedMaterial[0];
                setConstructionArray([...constructionArray]);
              }}
              sx={{ fontSize: 12 }}
            >
              <MenuItem value={con.Name} sx={{ fontSize: 12 }}>
                {con.Name}
              </MenuItem>
              <ListSubheader>Insulation</ListSubheader>
              {InsulationMaterials.map((key) => (
                <MenuItem key={key.Name} value={key.Name} sx={{ fontSize: 12 }}>
                  {key.Name}
                </MenuItem>
              ))}
              <ListSubheader>OpaqueMaterial</ListSubheader>
              {OpaqueMaterials.map((key) => (
                <MenuItem key={key.Name} value={key.Name} sx={{ fontSize: 12 }}>
                  {key.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            type="number"
            value={con.Thickness}
            variant="outlined"
            error={con.error}
            InputProps={{
              endAdornment: <InputAdornment position="end">m</InputAdornment>,
              inputProps: { min: '0', max: '1.1', step: '0.1', style: { fontSize: 12 } },
            }}
            onChange={(e) => {
              //validationをここで入れる
              if (validateThickness(e)) {
                constructionArray[i].Thickness = Number(e.target.value);
                setConstructionArray([...constructionArray]);
              } else {
                setOpaqueError(true);
                setConstructionArray([...constructionArray]);
              }
            }}
          />
          <IconButton aria-label="delete" onClick={() => deleteMaterial(i)} size="large">
            <DeleteIcon />
          </IconButton>
        </Stack>
      ))}
      <Typography align="center" variant="subtitle1" color="secondary">
        室内側
      </Typography>
      <Button onClick={addField} variant="contained" color="primary">
        追加
      </Button>
    </Paper>
  )
}