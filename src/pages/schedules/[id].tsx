import React, { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import MuiSelect from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import {
  Alert,
  Button,
  Paper,
  SelectChangeEvent,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { ITag } from "src/models/tags";
import { getTags_API } from "src/api/tags/request";
import {
  getSchedules_API,
  saveScheduleDetail_API,
} from "src/api/schedule/request";
import { IScheduleDetail } from "src/models/schedule";
import LineChart, { ILineData } from "src/components/chartjs/lineChart";

interface ITagType extends ITag {
  inputValue?: string;
}

const filter = createFilterOptions<ITagType>();
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Schedule({
  scheduleDetail,
  allTags,
}: {
  scheduleDetail: IScheduleDetail;
  allTags: ITagType[];
}): React.ReactElement {
  const router = useRouter();
  const { t } = useTranslation("add-construction");

  console.log(scheduleDetail);
  const [errorMap, setErrorMap] = useState(new Map<string, boolean>());
  const [name, setName] = useState(scheduleDetail?.name || "");
  const [tags, setTags] = useState<ITagType[]>(scheduleDetail?.tags || []);
  const [description, setDescription] = useState(
    scheduleDetail?.description || ""
  );

  // 0: no AC
  // 1: heating
  // 2: cooling
  // 3: heating & cooling

  const [weeklySchedule, setWeeklySchedule] = useState(
    scheduleDetail
      ? scheduleDetail.weekly.hvac.map((k) => !!k)
      : [...Array<boolean>(7).keys()].map((k) => true)
  );
  const [monthlyHeatSchedule, setMonthlyHeatSchedule] = useState(
    scheduleDetail
      ? scheduleDetail.monthly.hvac.map((k) => !!(k & 1))
      : [...Array<boolean>(12).keys()].map((k) => false)
  );
  const [monthlyCoolSchedule, setMonthlyCoolSchedule] = useState(
    scheduleDetail
      ? scheduleDetail.monthly.hvac.map((k) => !!(k & 2))
      : [...Array<boolean>(12).keys()].map((k) => false)
  );

  const [dailyScheduleHVAC, setDailyScheduleHVAC] = useState(
    scheduleDetail
      ? scheduleDetail.daily.hvac.map((k) => !!k)
      : [...Array<boolean>(24).keys()].map((k) => true)
  );

  const [dailySchedule, setDailySchedule] = useState(
    scheduleDetail
      ? scheduleDetail.daily.hvac.map((_k, i) => {
          return {
            heating: scheduleDetail.daily.heating[i],
            cooling: scheduleDetail.daily.cooling[i],
          };
        })
      : [...Array<boolean>(24).keys()].map((k) => {
          return {
            heating: 20,
            cooling: 28,
          };
        })
  );

  const getDataForChart = (
    data: { heating: number; cooling: number }[],
    hvac: boolean[]
  ): ILineData => {
    return {
      labels: [...Array<boolean>(24).keys()].map((k) => `${k + 1}`),
      datasets: [
        {
          label: "Heating",
          data: hvac.map((h, i) => (h ? data[i].heating : null)),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Cooling",
          data: hvac.map((h, i) => (h ? data[i].cooling : null)),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
  };

  const updateOnOff = (
    setter: (arr: boolean[]) => void,
    array: boolean[],
    index: number,
    val: boolean
  ) => {
    const temp = [...array];
    temp.splice(index, 1, val);
    setter(temp);
  };

  const handleDailySchedule = (
    isCooling: boolean,
    index: number,
    value: number
  ) => {
    const temp = [...dailySchedule];
    const data = isCooling
      ? { heating: dailySchedule[index].heating, cooling: value }
      : { heating: value, cooling: dailySchedule[index].cooling };
    temp.splice(index, 1, data);
    setDailySchedule(temp);
  };

  const handleNameChange = (name: string) => {
    setName(name);
    name === "" ? errorMap.set("name", true) : errorMap.delete("name");
  };

  const handleTagsChange = (tags: ITagType[]) => {
    setTags(tags);
    // tags.length === 0 ? errorMap.set("tags", true) : errorMap.delete("tags");
  };

  const handleDescriptionChange = (description: string) => {
    setDescription(description);
    // description === ""
    //   ? errorMap.set("description", true)
    //   : errorMap.delete("description");
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const newErrorMap = new Map<string, boolean>();
    //Validation
    name === "" && newErrorMap.set("name", true);
    // description === "" && newErrorMap.set("description", true);
    // tags.length === 0 && newErrorMap.set("tags", true);
    // schedule detail to save to backend
    if (newErrorMap.size === 0) {
      //schedule detail to save
      const scheduleToSave: IScheduleDetail = {
        id: scheduleDetail?.id || "new",
        name,
        description,
        tags: tags.map((t) => {
          return { id: t.id, label: t.inputValue || t.label };
        }),
        daily: {
          id: "",
          hvac: dailyScheduleHVAC.map((b) => (b ? 1 : 0)),
          heating: dailySchedule.map((b) => b.heating),
          cooling: dailySchedule.map((b) => b.cooling),
        },
        weekly: { id: "", hvac: weeklySchedule.map((b) => (b ? 1 : 0)) },
        monthly: {
          id: "",
          hvac: months.map(
            (_m, i) =>
              (monthlyCoolSchedule[i] ? 2 : 0) |
              (monthlyHeatSchedule[i] ? 1 : 0)
          ),
        },
      };
      const response = await saveScheduleDetail_API(scheduleToSave);
      if (response.status === "success") {
        setAlert({
          open: true,
          message: "Schedules Added Successfully",
          severity: "success",
        });
        setTimeout(() => {
          router.push("../schedules");
        }, 200);
      } else {
        setAlert({
          open: true,
          message: "Something Went wrong in while adding schedules",
          severity: "error",
        });
      }
    } else {
      setErrorMap(newErrorMap);
      setAlert({
        open: true,
        message: "Please fill all the required details",
        severity: "error",
      });
    }
  };

  const onCancel = () => {
    setAlert({
      open: true,
      message: "Schedule Cancelled",
      severity: "error",
    });
    setTimeout(() => {
      router.push("../schedules");
    }, 200);
  };

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  } as { open: boolean; message: string; severity: "success" | "error" });
  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ open: false, message: "", severity: "success" });
  };

  const OnOffSelect = (params: {
    val: boolean;
    callback: (val: boolean) => void;
  }) => (
    <FormControl fullWidth>
      <MuiSelect
        value={params.val ? "ON" : "OFF"}
        onChange={(e: SelectChangeEvent) => {
          console.log(e.target.value);
          params.callback(e.target.value === "ON" ? true : false);
        }}
        sx={{ borderRadius: 0 }}
      >
        {["ON", "OFF"].map((item, i) => (
          <MenuItem key={i} value={item}>
            {item}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );

  return (
    <Box
      sx={{
        m: 6,
        p: 4,
        borderStyle: "solid",
        color: "#707070",
        borderRadius: 1,
      }}
    >
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          variant="outlined"
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      <Typography variant="h5" ml={2}>
        {t("title")}
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Stack m={4} spacing={2}>
              <TextField
                fullWidth
                id="material_name"
                label={t("name")}
                variant="outlined"
                defaultValue={name}
                onChange={(e) => handleNameChange(e.target.value)}
                sx={{ marginBottom: 2 }}
                error={errorMap.get("name")}
                helperText="Name is required"
              />
              <Autocomplete
                multiple
                limitTags={4}
                id={t("tags")}
                defaultValue={tags}
                options={allTags}
                getOptionLabel={(option) => {
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return option.label;
                }}
                renderOption={(props, option) => (
                  <li {...props}>{option.label}</li>
                )}
                onChange={(e, v) =>
                  handleTagsChange(v as unknown as ITagType[])
                }
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  const { inputValue } = params;
                  // Suggest the creation of a new value
                  const isExisting = options.some(
                    (option) => inputValue === option.label
                  );
                  if (inputValue !== "" && !isExisting) {
                    filtered.push({
                      inputValue,
                      label: `Add "${inputValue}"`,
                      id: null,
                    });
                  }
                  return filtered;
                }}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("tags")}
                    placeholder="Material Tags"
                    // error={errorMap.get("tags")}
                    // helperText="At least one tag is required"
                  />
                )}
              />
              <TextField
                fullWidth
                id="material_description"
                label={t("description")}
                variant="outlined"
                defaultValue={description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                multiline
                rows={7}
                // error={errorMap.get("description")}
                // helperText="Description is required"
              />
            </Stack>
          </Grid>
          <Grid container item xs={8}>
            <Box
              p={4}
              sx={{
                width: "100%",
                borderStyle: "solid",
                color: errorMap.get("materialLayers") ? "#F00" : "#000",
              }}
            >
              <Grid container>
                <Grid container item xs={6}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Typography>Daily</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        paddingRight: 4,
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <LineChart
                        data={getDataForChart(dailySchedule, dailyScheduleHVAC)}
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  ></Grid>
                </Grid>
                <Grid container item xs={6}>
                  <Box width={"100%"}>
                    <Stack spacing={2}>
                      <Box>
                        <Typography>Weekly</Typography>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 100 }}
                            size="small"
                            aria-label="a dense table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ border: "solid" }}></TableCell>
                                {weekDays.map((day) => (
                                  <TableCell
                                    key={day}
                                    align="center"
                                    sx={{ border: "solid" }}
                                  >
                                    {day}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow sx={{ border: "solid" }}>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={{ border: "solid" }}
                                >
                                  HVAC
                                </TableCell>

                                {weekDays.map((_day, i) => (
                                  <TableCell
                                    align="right"
                                    sx={{ padding: 0, border: "solid" }}
                                  >
                                    <OnOffSelect
                                      val={weeklySchedule[i]}
                                      callback={(val: boolean) => {
                                        updateOnOff(
                                          setWeeklySchedule,
                                          weeklySchedule,
                                          i,
                                          val
                                        );
                                      }}
                                    />
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                      <Box>
                        <Typography>Cooling Season</Typography>
                        <Grid container spacing={0}>
                          {months.map((month, i) => (
                            <Grid item xs={2}>
                              <Box
                                sx={{
                                  border: "solid",
                                  padding: 1,
                                  backgroundColor: monthlyCoolSchedule[i]
                                    ? "royalblue"
                                    : "",
                                  textAlign: "center",
                                }}
                                onClick={() => {
                                  const temp = [...monthlyCoolSchedule];
                                  temp.splice(i, 1, !monthlyCoolSchedule[i]);
                                  setMonthlyCoolSchedule(temp);
                                }}
                              >
                                <Typography>{month}</Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                      <Box>
                        <Typography>Heating Season</Typography>
                        <Grid container spacing={0}>
                          {months.map((month, i) => (
                            <Grid item xs={2}>
                              <Box
                                sx={{
                                  border: "solid",
                                  padding: 1,
                                  backgroundColor: monthlyHeatSchedule[i]
                                    ? "crimson"
                                    : "",
                                  textAlign: "center",
                                }}
                                onClick={() => {
                                  const temp = [...monthlyHeatSchedule];
                                  temp.splice(i, 1, !monthlyHeatSchedule[i]);
                                  setMonthlyHeatSchedule(temp);
                                }}
                              >
                                <Typography>{month}</Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid container item xs={12}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ border: "solid" }}></TableCell>
                    {dailySchedule.map((hour, id) => (
                      <TableCell sx={{ border: "solid" }}>{`${
                        id + 1
                      }:00`}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ border: "solid" }}
                    >
                      HVAC
                    </TableCell>
                    {dailyScheduleHVAC.map((hour, id) => (
                      <TableCell
                        align="right"
                        sx={{ padding: 0, border: "solid" }}
                      >
                        <OnOffSelect
                          val={dailyScheduleHVAC[id]}
                          callback={(val: boolean) => {
                            updateOnOff(
                              setDailyScheduleHVAC,
                              dailyScheduleHVAC,
                              id,
                              val
                            );
                          }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow key="heating">
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ border: "solid" }}
                    >
                      Heating
                    </TableCell>
                    {dailySchedule.map((hour, id) => (
                      <TableCell
                        align="right"
                        sx={{ padding: 0, border: "solid" }}
                      >
                        <TextField
                          disabled={!dailyScheduleHVAC[id]}
                          id={`heating_${id}`}
                          type="number"
                          variant={
                            dailyScheduleHVAC[id] ? "outlined" : "filled"
                          }
                          sx={{ borderRadius: 0 }}
                          value={dailyScheduleHVAC[id] ? `${hour.heating}` : ""}
                          onChange={(e) =>
                            handleDailySchedule(
                              false,
                              id,
                              parseFloat(e.target.value)
                            )
                          }
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow key="cooling">
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ border: "solid" }}
                    >
                      Cooling
                    </TableCell>
                    {dailySchedule.map((hour, id) => (
                      <TableCell
                        align="right"
                        sx={{ padding: 0, border: "solid" }}
                      >
                        <TextField
                          disabled={!dailyScheduleHVAC[id]}
                          id={`cooling_${id}`}
                          variant={
                            dailyScheduleHVAC[id] ? "outlined" : "filled"
                          }
                          type="number"
                          sx={{ borderRadius: 0 }}
                          value={dailyScheduleHVAC[id] ? `${hour.cooling}` : ""}
                          onChange={(e) =>
                            handleDailySchedule(
                              true,
                              id,
                              parseFloat(e.target.value)
                            )
                          }
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid container item xs={12}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Box></Box>
              <Box>
                <Button
                  variant="contained"
                  color="error"
                  onClick={onCancel}
                  sx={{ mr: 1 }}
                >
                  {t("cancel")}
                </Button>
                <Button variant="contained" disabled={!!scheduleDetail} type="submit" sx={{ ml: 1 }}>
                  {t("save")}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

// This gets called on every request
export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  const tags = await getTags_API();
  if (params.id === "new")
    return {
      props: { scheduleDetail: null, allTags: tags },
    };
  // Fetch data from external API
  const scheduleDetails = await getSchedules_API();

  const scheduleDetail = scheduleDetails.filter((d) => d.id === params.id)[0];
  console.log(scheduleDetail);
  // Pass data to the page via props
  return { props: { scheduleDetail, allTags: tags } };
}
