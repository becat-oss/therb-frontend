import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect, { SelectChangeEvent } from "@mui/material/Select";

interface SelectProps {
  label: string;
  list: string[];
  [key: string]:any;
}

export default function Select({ label, list, ...others }: SelectProps) {
  const [item, setItem] = useState(list[0] ?? "");
  const id = `${label}_select`;

  const handleChange = (event: SelectChangeEvent) => {
    setItem(event.target.value as string);
  };

  return (
    <FormControl {...others}>
      <InputLabel id={id}>{label}</InputLabel>
      <MuiSelect
        labelId={id}
        id={id}
        value={item}
        label="Category"
        onChange={handleChange}        
      >
        {list.map((item, i) => (
          <MenuItem key={i} value={item}>{item}</MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
