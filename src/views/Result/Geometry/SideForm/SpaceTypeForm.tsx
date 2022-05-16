import { FormControl } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";
import { Program, programs } from "src/AppTypes";
import { useGeometryContext } from "../GeometryContext";

export default function spaceTypeForm():React.ReactElement{
  const { spaceType,setSpaceType,spaceTypeCandidates } = useGeometryContext();
  return (
    <FormControl>
      <InputLabel id="space-type-label">Space Type</InputLabel>
      <Select
        labelId="space-type-label"
        id="space-type"
        value={spaceType}
        onChange={(e) => {
          setSpaceType(e.target.value);
        }}
      >
        {spaceTypeCandidates.map((spaceType: string) => (
          <MenuItem key={spaceType} value={spaceType}>
            {spaceType}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}