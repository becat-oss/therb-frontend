import React, { useState } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import MuiSelect from "@mui/material/Select";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Snackbar,
} from "@mui/material";
import {
  getConstructionDetails_API,
} from "src/api/construction/requests";
import { IConstructionDetail } from "src/models/construction";
import { getEnvelopeDetails_API, saveEnvelope } from "src/api/envelope/request";
import { IEnvelope } from "src/models/envelope";
import { ConstructionCategory } from "src/models/category";
import { getTags_API } from "src/api/tags/request";
import { ITag } from "src/models/tags";

interface ITagType extends ITag {
  label: string;
  inputValue?: string;
}

const filter = createFilterOptions<ITagType>();

export default function Envelope({
  envelope,
  materialTags,
  constructionDetails,
}: {
  envelope: IEnvelope;
  materialTags: ITagType[];
  constructionDetails: IConstructionDetail[];
}): React.ReactElement {
  const router = useRouter();

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
      const newConstructionDetail = categoryConstructionDetailsMap
        .get(constructionVal.category)
        .find((o) => o.name === constructionName);
      constructionVal = newConstructionDetail;
    }

    let uVal = uValue || constructionVal.uValue;

    const changedVal = {
      category,
      label: tempConfig[index].label,
      construction: constructionVal,
    };
    tempConfig.splice(index, 1, changedVal);
    setConstructionConfigs(tempConfig);
  };

  const setUValue = (value: string, index: number) => {
    console.log(value, index);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const envelopeToSave: IEnvelope = {
      name,
      description,
      tags,
      config: constructionConfigs,
    }

    const response = await saveEnvelope(envelopeToSave);
    if (response.status === "success") {
      setAlert({
        open: true,
        message: "Construction Added Successfully",
        severity: "success",
      });
      setTimeout(() => {
        router.push("../../envelopes");
      }, 200);
    } else {
      setAlert({
        open: true,
        message: "Something Went wrong in while adding construction",
        severity: "error",
      });
    }  

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
        Register Envelope
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Stack m={4} spacing={2}>
              <TextField
                fullWidth
                id="envelope_name"
                label="Name"
                variant="outlined"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Autocomplete
                multiple
                limitTags={4}
                id="tags"
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
                    label="Material Tags"
                    placeholder="Material Tags"
                  />
                )}
              />
              <TextField
                fullWidth
                id="material_description"
                label="Description"
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
                                id={l.construction.uniqueId}
                                value={l.construction.name}
                                onChange={(e: SelectChangeEvent) => {
                                  updateConfigVal(l.category, e.target.value);
                                }}
                              >
                                {categoryConstructionDetailsMap
                                  .get(l.construction.category)
                                  .map((item, i) => (
                                    <MenuItem key={i} value={item.name}>
                                      {item.name}
                                    </MenuItem>
                                  ))}
                              </MuiSelect>
                            </FormControl>
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              id="outlined-name"
                              value={l.construction.uValue}
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
              <Button variant="contained" type="submit">
                Save
              </Button>
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
  const constructionDetails = await getConstructionDetails_API();
  console.log("constructionDetails",constructionDetails); 
  if (params.id === "new")
    return {
      props: {
        envelope: null,
        materialTags,
        constructionDetails,
      },
    };
  // Fetch data from external API
  const envelopeDetails = await getEnvelopeDetails_API();
  const envelope = envelopeDetails.filter(
    (d) => d.id.toString() === params.id
  )[0];
  // const constructionConfig
  // Pass data to the page via props
  return { props: { envelope, materialTags, constructionDetails } };
}

