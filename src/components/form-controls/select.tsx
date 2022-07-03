import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect, { SelectChangeEvent } from "@mui/material/Select";

interface SelectProps {
  label: string;
  list: string[];
}

export default function Select({ label, list }: SelectProps) {
  const [item, setItem] = useState(list[0] ?? "");
  const id = `${label}_select`;

  const handleChange = (event: SelectChangeEvent) => {
    setItem(event.target.value as string);
  };

  return (
    <FormControl>
      <InputLabel id={id}>{label}</InputLabel>
      <MuiSelect
        labelId={id}
        id={id}
        value={item}
        label="Category"
        onChange={handleChange}
      >
        {list.map((item) => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
