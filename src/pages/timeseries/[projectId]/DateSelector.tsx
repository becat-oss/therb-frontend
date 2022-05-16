import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useTimeseriesContext } from "./TimeseriesContext";

export default function DateSelector(){
  const { chartStartDate,setChartStartDate,chartEndDate,setChartEndDate } = useTimeseriesContext();

  return (
    <Paper sx={{p:1,m:0}} elevation={1}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack direction="row" spacing={3}>
          <DatePicker
            views={['day']}
            label="start"
            inputFormat="yyyy/MM/dd"
            // minDate={chartStartDate}
            // maxDate={chartEndDate}
            value={chartStartDate}
            onChange ={(newStart)=>{
              console.log("newStart",newStart);
              setChartStartDate(newStart);
            }}
            renderInput={(params) => <TextField {...params} helperText={null}/>}
          />
          <DatePicker 
            views={['day']}
            label="end"
            inputFormat="yyyy/MM/dd"
            value={chartEndDate}
            onChange ={(newEnd)=>{
              setChartEndDate(newEnd);
            }}
            renderInput={(params) => <TextField {...params} helperText={null}/>}
          />

        </Stack>
      </LocalizationProvider>
      
    </Paper>
  )
}