import React, { useEffect, useState } from "react";
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
import {
  getConstructionDetails_API,
  getTags_API,
} from "src/api/construction/requests";
import { IConstructionDetail, ITag } from "src/models/construction";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

interface ITagType extends ITag {
  inputValue?: string;
}

const filter = createFilterOptions<ITagType>();

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: "time",
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "set point",
      },
    },
  },
};

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
  constructionDetail,
  materialTags,
}: {
  constructionDetail: IConstructionDetail;
  materialTags: ITagType[];
}): React.ReactElement {
  const router = useRouter();
  const { t } = useTranslation("add-construction");

  const [errorMap, setErrorMap] = useState(new Map<string, boolean>());
  const [name, setName] = useState(constructionDetail?.name || "");
  const [tags, setTags] = useState<ITagType[]>(constructionDetail?.tags || []);
  const [description, setDescription] = useState(
    constructionDetail?.description || ""
  );

  const [weeklySchedule, setWeeklySchedule] = useState(
    [...Array<boolean>(3).keys()].map((k) => true)
  );
  const [monthlyHeatSchedule, setMonthlyHeatSchedule] = useState(
    [...Array<boolean>(12).keys()].map((k) => false)
  );
  const [monthlyCoolSchedule, setMonthlyCoolSchedule] = useState(
    [...Array<boolean>(12).keys()].map((k) => false)
  );

  const [dailyScheduleHVAC, setDailyScheduleHVAC] = useState(
    [...Array<boolean>(24).keys()].map((k) => true)
  );

  const [dailySchedule, setDailySchedule] = useState(
    [...Array<boolean>(24).keys()].map((k) => {
      return {
        heating: faker.datatype.number({ min: 0, max: 100 }),
        cooling: faker.datatype.number({ min: 0, max: 100 }),
      };
    })
  );

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

  const data = {
    labels: [...Array<boolean>(24).keys()].map((k) => `${k + 1}`),
    datasets: [
      {
        label: "Heating",
        data: dailySchedule.map((hour) => hour.heating),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Cooling",
        data: dailySchedule.map((hour) => hour.cooling),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const handleNameChange = (name: string) => {
    setName(name);
    name === "" ? errorMap.set("name", true) : errorMap.delete("name");
  };

  const handleTagsChange = (tags: ITagType[]) => {
    setTags(tags);
    tags.length === 0 ? errorMap.set("tags", true) : errorMap.delete("tags");
  };

  const handleDescriptionChange = (description: string) => {
    setDescription(description);
    description === ""
      ? errorMap.set("description", true)
      : errorMap.delete("description");
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const newErrorMap = new Map<string, boolean>();
    //Validation
    name === "" && newErrorMap.set("name", true);
    description === "" && newErrorMap.set("description", true);
    tags.length === 0 && newErrorMap.set("tags", true);
    // construction detail to save to backend
    if (newErrorMap.size === 0) {
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
      message: "Construction Cancelled",
      severity: "error",
    });
    setTimeout(() => {
      router.push("../constructions");
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
                options={materialTags}
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
                    error={errorMap.get("tags")}
                    helperText="At least one tag is required"
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
                error={errorMap.get("description")}
                helperText="Description is required"
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
                      <Line options={options} data={data} />
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
                                <TableCell
                                  align="right"
                                  sx={{ border: "solid" }}
                                >
                                  Weekday
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{ border: "solid" }}
                                >
                                  Saturday
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{ border: "solid" }}
                                >
                                  Sunday
                                </TableCell>
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
                                <TableCell
                                  align="right"
                                  sx={{ padding: 0, border: "solid" }}
                                >
                                  <OnOffSelect
                                    val={weeklySchedule[0]}
                                    callback={(val: boolean) => {
                                      updateOnOff(
                                        setWeeklySchedule,
                                        weeklySchedule,
                                        0,
                                        val
                                      );
                                    }}
                                  />
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{ padding: 0, border: "solid" }}
                                >
                                  <OnOffSelect
                                    val={weeklySchedule[1]}
                                    callback={(val: boolean) => {
                                      updateOnOff(
                                        setWeeklySchedule,
                                        weeklySchedule,
                                        1,
                                        val
                                      );
                                    }}
                                  />
                                </TableCell>
                                <TableCell align="right" sx={{ padding: 0 }}>
                                  <OnOffSelect
                                    val={weeklySchedule[2]}
                                    callback={(val: boolean) => {
                                      updateOnOff(
                                        setWeeklySchedule,
                                        weeklySchedule,
                                        2,
                                        val
                                      );
                                    }}
                                  />
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                      <Box>
                        <Typography>Cooling Season</Typography>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 650 }}
                            size="small"
                            aria-label="a dense table"
                          >
                            <TableBody>
                              <TableRow>
                                {months.map((month, i) => (
                                  <TableCell
                                    sx={{
                                      border: "solid",
                                      backgroundColor: monthlyCoolSchedule[i]
                                        ? "royalblue"
                                        : "",
                                    }}
                                    scope="row"
                                    onClick={() => {
                                      const temp = [...monthlyCoolSchedule];
                                      temp.splice(
                                        i,
                                        1,
                                        !monthlyCoolSchedule[i]
                                      );
                                      setMonthlyCoolSchedule(temp);
                                    }}
                                  >
                                    {month}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                      <Box>
                        <Typography>Heating Season</Typography>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 650 }}
                            size="small"
                            aria-label="a dense table"
                          >
                            <TableBody>
                              <TableRow>
                                {months.map((month, i) => (
                                  <TableCell
                                    sx={{
                                      border: "solid",
                                      backgroundColor: monthlyHeatSchedule[i]
                                        ? "crimson"
                                        : "",
                                    }}
                                    scope="row"
                                    onClick={() => {
                                      const temp = [...monthlyHeatSchedule];
                                      temp.splice(
                                        i,
                                        1,
                                        !monthlyHeatSchedule[i]
                                      );
                                      setMonthlyHeatSchedule(temp);
                                    }}
                                  >
                                    {month}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
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
                <Button variant="contained" type="submit" sx={{ ml: 1 }}>
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
  const materialTags = await getTags_API();
  if (params.id === "new")
    return {
      props: { constructionDetail: null, materialTags },
    };
  // Fetch data from external API
  const constructionDetails = await getConstructionDetails_API();

  const constructionDetail = constructionDetails.filter(
    (d) => d.uniqueId === params.id
  )[0];
  // Pass data to the page via props
  return { props: { constructionDetail, materialTags } };
}
