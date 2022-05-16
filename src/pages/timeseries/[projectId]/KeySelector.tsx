import { FormControl } from "@material-ui/core";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { timeseriesKeys } from "src/AppTypes";
import { useTimeseriesContext } from "./TimeseriesContext";

export default function KeySelector(){
  const {timeseriesKey, setTimeseriesKey} = useTimeseriesContext();

  const handleChange = (event: SelectChangeEvent) => {
    setTimeseriesKey(event.target.value);
  }
  return (
    <Box>
      <FormControl fullWidth>
        <Select
          id="key-selector"
          value={timeseriesKey}
          onChange = {handleChange}
        >
          {timeseriesKeys.map((key,i)=>{
            return <MenuItem key={i} value={key}>{key}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  )
}