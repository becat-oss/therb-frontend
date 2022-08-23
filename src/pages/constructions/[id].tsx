import React, { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { getCategories } from "src/services/MaterialSelectionService";
import MaterialRepresentation from "src/components/MaterialRepresentation";
import Select from "src/components/form-controls/select";
import MuiSelect from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Button, IconButton, SelectChangeEvent } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getConstructionDetailById_API,
  getConstructionDetails_API,
  getMaterials_API,
  getMaterialTags_API,
  postMaterialTags_API,
  saveConstructionDetail,
} from "src/api/material-construction/requests";
import {
  IConstructionDetail,
  IMaterialDetail,
  ITag,
} from "src/models/construction";
import { IConstructionDetail_post } from "src/api/material-construction/models";
import { calcUvalue } from "src/utils/calcLogics";

interface ITagType extends ITag {
  inputValue?: string;
}

const filter = createFilterOptions<ITagType>();
function* layerIDGenerator() {
  let count = 0;
  while (true) {
    yield ++count;
  }
  return;
}
const layerIdCounter = layerIDGenerator();

export default function Construction({
  constructionDetail,
  materialDetails,
  materialTags,
}: {
  constructionDetail: IConstructionDetail;
  materialDetails: IMaterialDetail[];
  materialTags: ITagType[];
}): React.ReactElement {
  const router = useRouter();
  const { t } = useTranslation("add-construction");

  const [name, setName] = useState(constructionDetail?.name || "");
  const [category, setCategory] = useState(constructionDetail?.category || "");
  const [tags, setTags] = useState<ITagType[]>(constructionDetail?.tags || []);

  const [materialLayers, setMaterialLayers] = useState(
    constructionDetail?.layerStructure
      ? constructionDetail.layerStructure.map((l) => {
          return {
            id: layerIdCounter.next().value as number,
            type: l.material,
            thickness: l.thickness,
          };
        })
      : ([] as { id: number; type: IMaterialDetail; thickness: number }[])
  );
  const [description, setDescription] = useState(
    constructionDetail?.description || ""
  );
  const [uValue, setUValue] = useState(constructionDetail?.uValue || 0);
  const [lcco2, setLcco2] = useState(constructionDetail?.lcco2 || 0);
  const [cost, setCost] = useState(constructionDetail?.cost || 0);

  const categories = getCategories();

  useEffect(() => {
    //calculate u-value based on layers
    const uvalue = calcUvalue(materialLayers);
    setUValue(uvalue);
  }, [materialLayers]);

  const onAddLayer = () => {
    const tempMaterialLayers = materialLayers.slice();
    tempMaterialLayers.push({
      id: layerIdCounter.next().value as number,
      type: materialDetails[0],
      thickness: 10,
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
    thickness: number
  ) => {
    const tempMaterialLayers = materialLayers.slice();
    const found = tempMaterialLayers.findIndex((l) => l.id === id);
    if (found !== -1) {
      tempMaterialLayers.splice(found, 1, { id, type, thickness });
      setMaterialLayers(tempMaterialLayers);
    }
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    // construction detail to save to backend
    const constructionDetailToSave: IConstructionDetail = {
      uniqueId: constructionDetail?.uniqueId || "new",
      name,
      category,
      description,
      tags: tags.map((t) => {
        return { id: t.id, label: t.inputValue || t.label };
      }),
      layerStructure: materialLayers.map((l) => {
        return { material: l.type, thickness: l.thickness };
      }),
    };
    saveConstructionDetail(constructionDetailToSave);
    router.push("../constructions");
  };

  const [open, setOpen] = useState(false);
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
                onChange={(e) => setName(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <FormControl>
                <InputLabel id={category}>{t("category")}</InputLabel>
                <MuiSelect
                  labelId={category}
                  id={category}
                  value={category}
                  label={t("category")}
                  onChange={handleCategoryChange}
                >
                  {categories.map((item, i) => (
                    <MenuItem key={i} value={item}>
                      {t(item)}
                    </MenuItem>
                  ))}
                </MuiSelect>
              </FormControl>

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
                    label={t("tags")}
                    placeholder="Material Tags"
                  />
                )}
              />
              <TextField
                fullWidth
                id="material_description"
                label={t("description")}
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
              {t("construction")}
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
                    <Typography>{t("outdoor")}</Typography>
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
                        materialHeights={materialLayers.map((l) => l.thickness)}
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
                    <Typography>{t("indoor")}</Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={6}>
                  <Box width={"100%"}>
                    <Typography>{t("material")}</Typography>
                    <Stack spacing={2}>
                      {materialLayers.map((l) => (
                        <Grid key={l.id} container>
                          <Grid item xs={7}>
                            <Select
                              label={t("type")}
                              list={materialDetails.map((m: any) => m.name)}
                              defaultValue={l.type}
                              sx={{ display: "flex" }}
                              onChange={(e: SelectChangeEvent) =>
                                updateMaterialLayers(
                                  l.id,
                                  materialDetails.find(
                                    (m: any) => m.name === e.target.value
                                  ),
                                  l.thickness
                                )
                              }
                            ></Select>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              flexWrap: "nowrap",
                              alignItems: "baseline",
                            }}
                          >
                            <TextField
                              fullWidth
                              id="size"
                              label={t("thickness")}
                              variant="outlined"
                              value={l.thickness}
                              type="number"
                              onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                if (val >= 0) {
                                  updateMaterialLayers(l.id, l.type, val);
                                }
                              }}
                              sx={{ marginBottom: 2 }}
                            />
                            <Typography>mm</Typography>
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
                      {t("add-layer")}
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
                  <Typography>{t("performance")}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography width={"100%"}>{t("u-value")}</Typography>
                  <Box sx={{ display: "flex", alignItems: "baseline" }}>
                    <TextField
                      id="first_field"
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      value={uValue}
                    />
                    <Typography>W/m2K</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Typography width={"100%"}>LCCO2</Typography>
                  <Box sx={{ display: "flex", alignItems: "baseline" }}>
                    <TextField
                      id="first_field"
                      variant="outlined"
                      defaultValue={lcco2}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <Typography>gCO2</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Typography width={"100%"}>{t("cost")}</Typography>
                  <Box sx={{ display: "flex", alignItems: "baseline" }}>
                    <TextField
                      id="first_field"
                      variant="outlined"
                      defaultValue={cost}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <Typography>円/m2</Typography>
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
                {t("save")}
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
  const materialDetails = await getMaterials_API();
  const materialTags = await getMaterialTags_API();
  if (params.id === "new")
    return {
      props: { constructionDetail: null, materialDetails, materialTags },
    };
  // Fetch data from external API
  const constructionDetails = await getConstructionDetails_API();

  const constructionDetail = constructionDetails.filter(
    (d) => d.uniqueId === params.id
  )[0];
  // Pass data to the page via props
  return { props: { constructionDetail, materialDetails, materialTags } };
}
