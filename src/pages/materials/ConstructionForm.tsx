import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ConstructionType } from 'types';
import React from "react";

interface ConstructionFormProps {
  title: string;
  construction: ConstructionType;
}

export default function ConstructionForm({ title, construction }: ConstructionFormProps):React.ReactElement{
  
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
                {t(con.Name as LocaleKey)}
              </MenuItem>
              <ListSubheader>Insulation</ListSubheader>
              {InsulationMaterials.map((key) => (
                <MenuItem key={key.Name} value={key.Name} sx={{ fontSize: 12 }}>
                  {t(key.Name as LocaleKey)}
                </MenuItem>
              ))}
              <ListSubheader>OpaqueMaterial</ListSubheader>
              {OpaqueMaterials.map((key) => (
                <MenuItem key={key.Name} value={key.Name} sx={{ fontSize: 12 }}>
                  {t(key.Name as LocaleKey)}
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
                // con.Thickness=Number(e.target.value);
                // constructionArray[index]=con;
                constructionArray[i].Thickness = Number(e.target.value);

                setConstructionArray([...constructionArray]);
                console.log('constructionArray2', constructionArray);
              } else {
                // constructionArray[index].error=true;
                setEnvelopeError(true);
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
        {t('inside')}
      </Typography>
      <Button onClick={addField} variant="contained" color="primary">
        {t('add-material')}
      </Button>
    </Paper>
  )
}