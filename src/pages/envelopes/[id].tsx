import React, { useState } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Select from "src/components/form-controls/select";
import { Button, IconButton, SelectChangeEvent } from "@mui/material";
import { getTags_API } from "src/api/construction/requests";
import { IConstructionDetail, ITag } from "src/models/construction";
import {
  getEnvelopeDetails_API,
} from "src/api/envelope/request";
import { IEnvelope } from "src/models/envelope";
import { uniqueId } from "lodash";

interface ITagType extends ITag {
  inputValue?: string;
}

const filter = createFilterOptions<ITagType>();

export default function Envelope({
  constructionConfig,
  materialTags,
}: {
  constructionConfig: IEnvelope;
  materialTags: ITagType[];
}): React.ReactElement {
  const router = useRouter();

  const [name, setName] = useState(constructionConfig?.name || "");
  const [tags, setTags] = useState<ITagType[]>(constructionConfig?.tags || []);
  const [description, setDescription] = useState(
    constructionConfig?.description || ""
  );

  const [config, setConfig] = useState(constructionConfig?.config || []); 

  const updateConfigVal = (
    uniqueId: string,
    constructVal?: string,
    uValue?: string
  ) => {
    // const tempConfig = [...config];
    // const index = tempConfig.findIndex((c) => c.uniqueId === uniqueId);
    // let constructionVal = tempConfig[index].constructionVal;
    // if (constructVal) {
    //   const indexOfVal = getConstructionOptions(uniqueId).options.findIndex(
    //     (o) => o === constructVal
    //   );
    //   constructionVal = indexOfVal;
    // }

    // let uVal = uValue || tempConfig[index].uVal;

    // const changedVal = {
    //   uniqueId,
    //   label: tempConfig[index].label,
    //   constructionVal,
    //   uVal,
    // };
    // tempConfig.splice(index, 1, changedVal);
    // setConfig(tempConfig);
  };

  const setUValue = (value: string, index: number) => {
    console.log(value, index);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    router.push("../../envelopes");
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
                sx={{ marginBottom: 2 }}
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
                    <Typography>Material</Typography>
                    <Stack spacing={2}>
                      {config.map((l, i) => (
                        <Grid key={l.uniqueId} container>
                          <Grid item xs={4}>
                            <Typography>{l.label}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Select
                              label=""
                              list={[l.construction.name]}
                              defaultValue={l.construction.name}
                              sx={{ display: "flex" }}
                              onChange={(e: SelectChangeEvent) => {
                                updateConfigVal(l.uniqueId, e.target.value);
                              }}
                            ></Select>
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              id="outlined-name"
                              value={l.construction.uValue}
                              onChange={(e) => updateConfigVal(l.uniqueId, undefined, e.target.value)}
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
  if (params.id === "new")
    return {
      props: {
        constructionConfig: null,
        materialTags,
      },
    };
  // Fetch data from external API
  const constructionDetails = await getEnvelopeDetails_API();
  const constructionConfig = constructionDetails.filter(
    (d) => d.id.toString() === params.id
  )[0];
  // const constructionConfig
  // Pass data to the page via props
  return { props: { constructionConfig, materialTags } };
}
