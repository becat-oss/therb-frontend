import { FormControl } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";
import { Program, programs } from "src/AppTypes";
import { useGeometryContext } from "../GeometryContext";

export default function ProgramForm(): React.ReactElement {
  const { program,setProgram } = useGeometryContext();
  return (
    <FormControl>
      <InputLabel>Program</InputLabel>
      <Select
        labelId='program'
        label='Program'
        onChange={(e) => {
          setProgram(e.target.value as Program);
        }}
      >
        {programs.map((program) => (
          <MenuItem key={program} value={program}>
            {program}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}