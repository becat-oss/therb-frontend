import React, { useState } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  getCategories,
  getMaterialSizes,
  getMaterialTags,
  getMaterialTypes,
  generateUniqueId,
  addToMaterial,
  getMaterial,
} from "src/services/MaterialSelectionService";
import MaterialRepresentation from "src/components/MaterialRepresentation";
import Select from "src/components/form-controls/select";
import { Button, SelectChangeEvent } from "@mui/material";

export interface IMaterialDetail {
  uniqueId: string;
  name?: string;
  category?: string;
  tags?: string[];
  description?: string;
  layerStructure?: {
    type: string;
    thickness: string;
  }[];
  uValue?: number;
  lcco2?: number;
  cost?: number;
}

export default function MaterialAddition(): React.ReactElement {
  const materialTypes = getMaterialTypes();
  const materialThickness = getMaterialSizes();

  const router = useRouter();
  const { id } = router.query;

  let detail: IMaterialDetail;
  if (id == "new") {
    detail = { uniqueId: generateUniqueId(5) };
  } else {
    detail = getMaterial(id as string);
  }

  const [name, setName] = useState(detail.name || "");
  const [category, setCategory] = useState(detail.category || "");
  const [tags, setTags] = useState(detail.tags || []);
  const [layerMaterialTypes, setlayerMaterialTypes] = useState(
    detail.layerStructure
      ? detail.layerStructure.map((l) => l.type)
      : [materialTypes[0], materialTypes[0], materialTypes[0]]
  );
  const [layerMaterialThickness, setlayerMaterialThickness] = useState(
    detail.layerStructure
      ? detail.layerStructure.map((l) => l.thickness)
      : [materialThickness[0], materialThickness[0], materialThickness[0]]
  );
  const [description, setDescription] = useState(detail.description || "");
  const [uValue, setUValue] = useState(detail.uValue || 0);
  const [lcco2, setLcco2] = useState(detail.lcco2 || 0);
  const [cost, setCost] = useState(detail.cost || 0);

  const categories = getCategories();

  const onSubmit = (e: FormDataEvent) => {
    e.preventDefault();
    const materialDetail: IMaterialDetail = {
      uniqueId: detail.uniqueId,
      name,
      category,
      tags,
      layerStructure: [0, 1, 2].map((i) => {
        return {
          type: layerMaterialTypes[i],
          thickness: layerMaterialThickness[i],
        };
      }),
      description,
      uValue,
      lcco2,
      cost,
    };
    addToMaterial(materialDetail);
    router.push("../material-selection-list");
  };

  const materialTags = getMaterialTags();
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
        Registration of Material
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Stack m={4} spacing={2}>
              <TextField
                fullWidth
                id="material_name"
                label="Material Name"
                variant="outlined"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              {/* <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>Category</Typography>
                <Select
                  label="Category"
                  list={categories}
                  sx={{ width: "80%" }}
                ></Select>
              </Box> */}
              <Select
                label="Category"
                list={categories}
                defaultValue={category}
                onChange={(e: SelectChangeEvent) => setCategory(e.target.value)}
              ></Select>
              <Autocomplete
                multiple
                limitTags={4}
                id="tags"
                options={materialTags}
                getOptionLabel={(option) => {
                  return option;
                }}
                onChange={(e, value) => setTags(value)}
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
              Layer Structure
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
                    <Typography>Outdoor</Typography>
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
                      <MaterialRepresentation
                        materialHeights={layerMaterialThickness.map((l) =>
                          parseFloat(l)
                        )}
                        length={250}
                      ></MaterialRepresentation>
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
                  >
                    <Typography>Indoor</Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={6}>
                  <Box width={"100%"}>
                    <Typography>Material</Typography>
                    <Grid container>
                      <Grid item xs={8}>
                        <Stack spacing={2}>
                          <Select
                            label="Type"
                            list={materialTypes}
                            defaultValue={layerMaterialTypes[0]}
                            onChange={(e: SelectChangeEvent) =>
                              setlayerMaterialTypes([
                                e.target.value,
                                layerMaterialTypes[1],
                                layerMaterialTypes[2],
                              ])
                            }
                          ></Select>
                          <Select
                            label="Type"
                            list={materialTypes}
                            defaultValue={layerMaterialTypes[1]}
                            onChange={(e: SelectChangeEvent) =>
                              setlayerMaterialTypes([
                                layerMaterialTypes[0],
                                e.target.value,
                                layerMaterialTypes[2],
                              ])
                            }
                          ></Select>
                          <Select
                            label="Type"
                            list={materialTypes}
                            defaultValue={layerMaterialTypes[2]}
                            onChange={(e: SelectChangeEvent) =>
                              setlayerMaterialTypes([
                                layerMaterialTypes[0],
                                layerMaterialTypes[1],
                                e.target.value,
                              ])
                            }
                          ></Select>
                        </Stack>
                      </Grid>
                      <Grid item xs={4}>
                        <Stack spacing={2}>
                          <Select
                            label="Size"
                            list={materialThickness}
                            defaultValue={layerMaterialThickness[0]}
                            onChange={(e: SelectChangeEvent) =>
                              setlayerMaterialThickness([
                                e.target.value,
                                layerMaterialThickness[1],
                                layerMaterialThickness[2],
                              ])
                            }
                          ></Select>
                          <Select
                            label="Size"
                            list={materialThickness}
                            defaultValue={layerMaterialThickness[1]}
                            onChange={(e: SelectChangeEvent) =>
                              setlayerMaterialThickness([
                                layerMaterialThickness[0],
                                e.target.value,
                                layerMaterialThickness[2],
                              ])
                            }
                          ></Select>
                          <Select
                            label="Size"
                            list={materialThickness}
                            defaultValue={layerMaterialThickness[2]}
                            onChange={(e: SelectChangeEvent) =>
                              setlayerMaterialThickness([
                                layerMaterialThickness[0],
                                layerMaterialThickness[1],
                                e.target.value,
                              ])
                            }
                          ></Select>
                        </Stack>
                      </Grid>
                    </Grid>
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
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>Performance Value</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography width={"100%"}>UValue</Typography>
                  <TextField
                    id="first_field"
                    variant="outlined"
                    defaultValue={uValue}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <Typography variant="caption">W/m2k</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography width={"100%"}>LCCO2</Typography>
                  <TextField
                    id="first_field"
                    variant="outlined"
                    defaultValue={lcco2}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <Typography variant="caption">gCO2</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography width={"100%"}>コスト</Typography>
                  <TextField
                    id="first_field"
                    variant="outlined"
                    defaultValue={cost}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <Typography variant="caption">円/m2</Typography>
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
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
