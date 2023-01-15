import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  SelectChangeEvent,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import MuiSelect from "@mui/material/Select";
import { ConstructionCategory } from "src/models/category";
import { IConstructionDetail } from "src/models/construction";
import { IEnvelope } from "src/models/envelope";
import { ITagType } from "../construction/construction-detail";
import { Translate } from "next-translate";
import { IAPIResponse } from "src/api/ApiResponse";

const filter = createFilterOptions<ITagType>();

export function EnvelopeDetailComponent({
  envelope,
  materialTags,
  constructionDetails,
  windowDetails,
  t,
  onCancel,
  onSubmit,
  onAfterSubmit,
}: {
  envelope: IEnvelope;
  materialTags: ITagType[];
  constructionDetails: IConstructionDetail[];
  windowDetails: IConstructionDetail[];
  t: Translate;
  onCancel: () => void;
  onSubmit: (detail: Omit<IEnvelope, "id">) => Promise<IAPIResponse>;
  onAfterSubmit: () => void;
}): React.ReactElement {
  const [errorMap, setErrorMap] = useState(new Map<string, boolean>());
  const [name, setName] = useState(envelope?.name || "");
  const [tags, setTags] = useState<ITagType[]>(envelope?.tags || []);
  const [description, setDescription] = useState(envelope?.description || "");

  const categoryConstructionDetailsMap = new Map<
    string,
    IConstructionDetail[]
  >();
  constructionDetails.forEach((c) => {
    const contructions = categoryConstructionDetailsMap.get(c.category);
    if (contructions) {
      contructions.push(c);
    } else {
      categoryConstructionDetailsMap.set(c.category, [c]);
    }
  });

  const windowsConstruction = categoryConstructionDetailsMap.get(
    ConstructionCategory.WINDOW
  );
  if (windowsConstruction) {
    windowsConstruction.push(...windowDetails);
  } else {
    categoryConstructionDetailsMap.set(
      ConstructionCategory.WINDOW,
      windowDetails
    );
  }

  const initialConfig = envelope
    ? envelope.config
    : [
        {
          category: ConstructionCategory.EXTERIOR_WALL,
          label: "Exterior Wall",
          construction: categoryConstructionDetailsMap.has(
            ConstructionCategory.EXTERIOR_WALL
          )
            ? categoryConstructionDetailsMap.get(
                ConstructionCategory.EXTERIOR_WALL
              )[0]
            : null,
        },
        {
          category: ConstructionCategory.INTERIOR_WALL,
          label: "Interior Wall",
          construction: categoryConstructionDetailsMap.has(
            ConstructionCategory.INTERIOR_WALL
          )
            ? categoryConstructionDetailsMap.get(
                ConstructionCategory.INTERIOR_WALL
              )[0]
            : null,
        },
        {
          category: ConstructionCategory.INTERIOR_FLOOR,
          label: "Floor & Ceiling",
          construction: categoryConstructionDetailsMap.has(
            ConstructionCategory.INTERIOR_FLOOR
          )
            ? categoryConstructionDetailsMap.get(
                ConstructionCategory.INTERIOR_FLOOR
              )[0]
            : null,
        },
        {
          category: ConstructionCategory.EXTERIOR_ROOF,
          label: "Roof",
          construction: categoryConstructionDetailsMap.has(
            ConstructionCategory.EXTERIOR_ROOF
          )
            ? categoryConstructionDetailsMap.get(
                ConstructionCategory.EXTERIOR_ROOF
              )[0]
            : null,
        },
        {
          category: ConstructionCategory.GROUND_FLOOR,
          label: "Ground Floor",
          construction: categoryConstructionDetailsMap.has(
            ConstructionCategory.GROUND_FLOOR
          )
            ? categoryConstructionDetailsMap.get(
                ConstructionCategory.GROUND_FLOOR
              )[0]
            : null,
        },
        {
          category: ConstructionCategory.WINDOW,
          label: "Window",
          construction: categoryConstructionDetailsMap.has(
            ConstructionCategory.WINDOW
          )
            ? categoryConstructionDetailsMap.get(ConstructionCategory.WINDOW)[0]
            : null,
        },
      ];

  const [constructionConfigs, setConstructionConfigs] = useState(initialConfig);

  const updateConfigVal = (
    category: ConstructionCategory,
    constructionName?: string,
    uValue?: string
  ) => {
    const tempConfig = [...constructionConfigs];
    const index = tempConfig.findIndex((c) => c.category === category);
    let constructionVal = tempConfig[index].construction;
    if (constructionName) {
      if (category !== ConstructionCategory.WINDOW) {
        const newConstructionDetail = categoryConstructionDetailsMap
          .get(constructionVal.category)
          .find((o) => o.name === constructionName);
        constructionVal = newConstructionDetail;
      } else {
        const newConstructionDetail = windowDetails.find(
          (o) => o.name === constructionName
        );
        constructionVal = newConstructionDetail;
      }
    }

    let uVal = uValue || constructionVal.uvalue;

    const changedVal = {
      category,
      label: tempConfig[index].label,
      construction: constructionVal,
    };
    tempConfig.splice(index, 1, changedVal);
    setConstructionConfigs(tempConfig);
  };

  const handleNameChange = (name: string) => {
    setName(name);
    name === "" ? errorMap.set("name", true) : errorMap.delete("name");
  };

  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    const envelopeToSave: Omit<IEnvelope, "id"> = {
      name,
      description,
      tags,
      config: constructionConfigs,
    };

    const response = await onSubmit(envelopeToSave);
    if (response.status === "success") {
      setAlert({
        open: true,
        message: "Construction Added Successfully",
        severity: "success",
      });
      setTimeout(() => {
        onAfterSubmit();
      }, 200);
    } else {
      setAlert({
        open: true,
        message: "Something Went wrong in while adding construction",
        severity: "error",
      });
    }
  };

  const onFormCancel = () => {
    setAlert({
      open: true,
      message: "Envelope Cancelled",
      severity: "error",
    });
    setTimeout(() => {
      onCancel();
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

  return (
    <Box>
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
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Stack m={4} spacing={2}>
                <TextField
                  fullWidth
                  id="envelope_name"
                  label={t("common:name")}
                  variant="outlined"
                  defaultValue={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                />
                <Autocomplete
                  multiple
                  limitTags={4}
                  id={t("common:tags")}
                  defaultValue={tags}
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
                  onChange={(e, v) => setTags(v as unknown as ITagType[])}
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
                      label={t("common:tags")}
                      placeholder="Material Tags"
                    />
                  )}
                />
                <TextField
                  fullWidth
                  id="material_description"
                  label={t("common:description")}
                  variant="outlined"
                  defaultValue={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={7}
                />
              </Stack>
            </Grid>
            <Grid container item xs={8}>
              <Typography variant="h6" ml={2}>
                Configuration
              </Typography>
              <Box
                p={4}
                sx={{
                  width: "100%",
                  borderStyle: "solid",
                  color: "#000",
                }}
              >
                <Grid container>
                  <Grid container item xs={8}>
                    <Box width={"100%"}>
                      <Stack spacing={2}>
                        <Grid key="header" container>
                          <Grid item xs={4}></Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ textAlign: "center" }}>
                              Construction
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography sx={{ textAlign: "center" }}>
                              UValue
                            </Typography>
                          </Grid>
                        </Grid>
                        {constructionConfigs.map((l, i) => (
                          <Grid key={l.category} container>
                            <Grid item xs={4}>
                              <Typography>{l.label}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <FormControl fullWidth>
                                <MuiSelect
                                  id={l.construction?.id || null}
                                  value={l.construction?.name || "hello"}
                                  onChange={(e: SelectChangeEvent) => {
                                    updateConfigVal(l.category, e.target.value);
                                  }}
                                >
                                  {categoryConstructionDetailsMap
                                    .get(l.category)
                                    ?.map((item, i) => (
                                      <MenuItem key={i} value={item.name}>
                                        {item.name}
                                      </MenuItem>
                                    ))}
                                  <MenuItem value={l.construction?.name}>
                                    {l.construction?.name}
                                  </MenuItem>
                                </MuiSelect>
                              </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                              <TextField
                                id="outlined-name"
                                value={l.construction?.uvalue}
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </Grid>
                          </Grid>
                        ))}
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
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
                    onClick={onFormCancel}
                    sx={{ mr: 1 }}
                  >
                    {t("common:cancel")}
                  </Button>
                  <Button
                    variant="contained"
                    disabled={!!envelope}
                    type="submit"
                  >
                    {t("common:save")}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}
