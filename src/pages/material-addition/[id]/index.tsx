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
import { Button, IconButton, SelectChangeEvent } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export interface IMaterialDetail {
  id: string;
  name: string;
  conductivity: number;
  density: number;
  specificHeat: number;
}

export interface IConstructionDetail {
  uniqueId: string;
  name?: string;
  category?: string;
  tags?: string[];
  description?: string;
  layerStructure?: {
    material: IMaterialDetail;
    thickness: string;
  }[];
  uValue?: number;
  lcco2?: number;
  cost?: number;
}

function* layerIDGenerator() {
  let count = 0;
  while (true) {
    yield ++count;
  }
  return;
}
const layerIdCounter = layerIDGenerator();

export default function MaterialAddition(): React.ReactElement {
  const materialTypes = getMaterialTypes();
  const materialThickness = getMaterialSizes();

  const router = useRouter();
  const { id } = router.query;

  let detail: IConstructionDetail;
  if (id == "new") {
    detail = { uniqueId: generateUniqueId(5) };
  } else {
    detail = getMaterial(id as string);
  }

  const [name, setName] = useState(detail.name || "");
  const [category, setCategory] = useState(detail.category || "");
  const [tags, setTags] = useState(detail.tags || []);

  const [materialLayers, setMaterialLayers] = useState(
    detail.layerStructure
      ? detail.layerStructure.map((l) => {
          return {
            id: layerIdCounter.next().value as number,
            type: l.material,
            thickness: l.thickness,
          };
        })
      : ([] as { id: number; type: IMaterialDetail; thickness: string }[])
  );
  const [description, setDescription] = useState(detail.description || "");
  const [uValue, setUValue] = useState(detail.uValue || 0);
  const [lcco2, setLcco2] = useState(detail.lcco2 || 0);
  const [cost, setCost] = useState(detail.cost || 0);

  const categories = getCategories();

  const onAddLayer = () => {
    const tempMaterialLayers = materialLayers.slice();
    tempMaterialLayers.push({
      id: layerIdCounter.next().value as number,
      type: materialTypes[0],
      thickness: materialThickness[0],
    });
    setMaterialLayers(tempMaterialLayers);
  };

  const onMaterialLayerDelete = (id: number) => {
    const tempMaterialLayers = materialLayers.slice();
    const found = tempMaterialLayers.findIndex((l) => l.id === id);
    if (found !== -1) {
      tempMaterialLayers.splice(found, 1);
      setMaterialLayers(tempMaterialLayers);
    }
  };
  const updateMaterialLayers = (
    id: number,
    type: IMaterialDetail,
    thickness: string
  ) => {
    const tempMaterialLayers = materialLayers.slice();
    const found = tempMaterialLayers.findIndex((l) => l.id === id);
    if (found !== -1) {
      tempMaterialLayers.splice(found, 1, { id, type, thickness });
      setMaterialLayers(tempMaterialLayers);
    }
  };

  const onSubmit = (e: FormDataEvent) => {
    e.preventDefault();
    const materialDetail: IConstructionDetail = {
      uniqueId: detail.uniqueId,
      name,
      category,
      tags,
      layerStructure: materialLayers.map((l) => {
        return {
          material: l.type,
          thickness: l.thickness,
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
                        materialHeights={materialLayers.map((l) =>
                          parseFloat(l.thickness)
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
                    <Stack spacing={2}>
                      {materialLayers.map((l) => (
                        <Grid key={l.id} container>
                          <Grid item xs={7}>
                            <Select
                              label="Type"
                              list={materialTypes.map((m) => m.name)}
                              defaultValue={l.type}
                              sx={{ display: "flex" }}
                              onChange={(e: SelectChangeEvent) =>
                                updateMaterialLayers(
                                  l.id,
                                  materialTypes.find(
                                    (m) => m.name === e.target.value
                                  ),
                                  l.thickness
                                )
                              }
                            ></Select>
                          </Grid>
                          <Grid item xs={4}>
                            <Select
                              label="Size"
                              list={materialThickness}
                              defaultValue={l.thickness}
                              sx={{ display: "flex" }}
                              onChange={(e: SelectChangeEvent) =>
                                updateMaterialLayers(
                                  l.id,
                                  l.type,
                                  e.target.value
                                )
                              }
                            ></Select>
                          </Grid>
                          <Grid item xs={1}>
                            <IconButton
                              aria-label="more"
                              id="long-button"
                              aria-controls={open ? "long-menu" : undefined}
                              aria-expanded={open ? "true" : undefined}
                              aria-haspopup="true"
                              onClick={() => onMaterialLayerDelete(l.id)}
                              sx={{ right: 0 }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                    </Stack>
                    <Button variant="outlined" onClick={onAddLayer}>
                      Add Layer
                    </Button>
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
