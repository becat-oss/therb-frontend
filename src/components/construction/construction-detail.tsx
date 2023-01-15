import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import MaterialRepresentation from "src/components/MaterialRepresentation";
import MuiSelect from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {
  Alert,
  Button,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Popper,
  PopperPlacementType,
  SelectChangeEvent,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IConstructionDetail } from "src/models/construction";
import { calcUvalue } from "src/utils/calcLogics";
import { IMaterialDetail } from "src/models/material";
import { ITag } from "src/models/tags";
import { Translate } from "next-translate";
import { IAPIResponse } from "src/api/ApiResponse";

export interface ITagType extends ITag {
  inputValue?: string;
}

const filter = createFilterOptions<ITagType>();

type TPopperContent = Omit<
  IMaterialDetail,
  "id" | "description" | "classification" | "ownerId" | "roughness"
>;

export default function ConstructionDetailComponent({
  constructionDetail,
  materialDetails,
  materialTags,
  categories,
  t,
  onCancel,
  onSubmit,
  onAfterSubmit,
}: {
  constructionDetail: IConstructionDetail;
  materialDetails: IMaterialDetail[];
  materialTags: ITagType[];
  categories: string[];
  t: Translate;
  onCancel: () => void;
  onSubmit: (detail: IConstructionDetail) => Promise<IAPIResponse>;
  onAfterSubmit: () => void;
}): React.ReactElement {

  const [errorMap, setErrorMap] = useState(new Map<string, boolean>());
  const [name, setName] = useState(constructionDetail?.name || "");
  const [category, setCategory] = useState(constructionDetail?.category || "");
  const [tags, setTags] = useState<ITagType[]>(constructionDetail?.tags || []);

  const [materialLayers, setMaterialLayers] = useState(
    constructionDetail?.materials
      ? constructionDetail.materials
      : [materialDetails[0]]
  );
  const [description, setDescription] = useState(
    constructionDetail?.description || ""
  );
  const [uValue, setUValue] = useState(constructionDetail?.uvalue || 0);
  const [lcco2, setLcco2] = useState(constructionDetail?.lcco2 || 0);
  const [cost, setCost] = useState(constructionDetail?.cost || 0);

  useEffect(() => {
    //calculate u-value based on layers
    const uvalue = calcUvalue(materialLayers);
    setUValue(uvalue);
  }, [materialLayers]);

  const onAddLayer = () => {
    const tempMaterialLayers = materialLayers.slice();
    tempMaterialLayers.push({ ...materialDetails[0] });
    setMaterialLayers(tempMaterialLayers);
    errorMap.delete("materialLayers");
  };

  const onMaterialLayerDelete = (id: string) => {
    const tempMaterialLayers = materialLayers.slice();
    const found = tempMaterialLayers.findIndex((l) => l.id === id);
    if (found !== -1) {
      tempMaterialLayers.splice(found, 1);
      setMaterialLayers(tempMaterialLayers);
      tempMaterialLayers.length === 0 && errorMap.set("materialLayers", true);
    }
  };
  const updateMaterialLayerName = (index: number, name: string) => {
    const tempMaterialLayers = materialLayers.slice();
    const found = materialDetails.findIndex((l) => l.name === name);
    if (found !== -1) {
      tempMaterialLayers.splice(index, 1, { ...materialDetails[found] });
      setMaterialLayers(tempMaterialLayers);
    }
  };

  const updateMaterialLayerValue = (index: number, value: number) => {
    const tempMaterialLayers = materialLayers.slice();
    tempMaterialLayers[index].thickness = value;
    setMaterialLayers(tempMaterialLayers);
  };

  const handleNameChange = (name: string) => {
    setName(name);
    name === "" ? errorMap.set("name", true) : errorMap.delete("name");
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
    errorMap.delete("category");
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

  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    const newErrorMap = new Map<string, boolean>();
    //Validation
    name === "" && newErrorMap.set("name", true);
    category === "" && newErrorMap.set("category", true);
    // description === "" && newErrorMap.set("description", true);
    // tags.length === 0 && newErrorMap.set("tags", true);
    materialLayers.length === 0 && newErrorMap.set("materialLayers", true);
    // construction detail to save to backend
    if (newErrorMap.size === 0) {
      const constructionDetailToSave: IConstructionDetail = {
        id: constructionDetail?.id || "new",
        name,
        category,
        description,
        tags: tags.map((t) => {
          return { id: t.id, label: t.inputValue || t.label };
        }),
        materials: materialLayers,
        uvalue: uValue,
      };

      const response = await onSubmit(constructionDetailToSave);
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
    } else {
      setErrorMap(newErrorMap);
      setAlert({
        open: true,
        message: "Please fill all the required details",
        severity: "error",
      });
    }
  };

  const onFormCancel = () => {
    setAlert({
      open: true,
      message: t("title") + " cancelled",
      severity: "error",
    });
    setTimeout(() => {
      onCancel();
    }, 200);
  };

  const [open, setOpen] = useState(false);
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

  const [openPopper, setopenPopper] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();
  const [popperContent, setPopperContent] =
    React.useState<TPopperContent>(null);

  const handlePopperOpen =
    (newPlacement: PopperPlacementType, content: IMaterialDetail) =>
    (currentTarget: HTMLElement) => {
      setAnchorEl(currentTarget);
      setopenPopper(true);
      setPlacement(newPlacement);
      setPopperContent({
        name: content.name,
        specificHeat: content.specificHeat,
        density: content.density,
        conductivity: content.conductivity,
        moistureCapacity: content.moistureCapacity,
        moistureConductivity: content.moistureConductivity,
        thickness: content.thickness,
        thicknessOptions: content.thicknessOptions,
      });
    };

  const handlePopperClose = () => {
    setopenPopper(false);
  };
  const canBeOpen = openPopper && Boolean(anchorEl);
  const popperId = canBeOpen ? "transition-popper" : undefined;

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
        <Popper
          open={openPopper}
          anchorEl={anchorEl}
          placement={placement}
          style={{ zIndex: 2 }}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper elevation={3}>
                <List dense={true}>
                  {Object.keys(popperContent).map((key) => (
                    <ListItem key={key} sx={{ pt: 0, pb: 0 }}>
                      <ListItemText
                        sx={{ m: 0 }}
                        primary={`${key} : ${(popperContent as any)[key]}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Fade>
          )}
        </Popper>
        <Typography variant="h5" ml={2}>
          {t("title")}
        </Typography>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Stack m={4} spacing={2}>
                <TextField
                  fullWidth
                  id="material_name"
                  label={t("common:name")}
                  variant="outlined"
                  defaultValue={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  sx={{ marginBottom: 2 }}
                  error={errorMap.get("name")}
                  helperText="Name is required"
                />
                <FormControl error={errorMap.get("category")}>
                  <InputLabel id={category}>{t("common:category")}</InputLabel>
                  <MuiSelect
                    labelId={category}
                    id={category}
                    value={category}
                    label={t("common:category")}
                    onChange={handleCategoryChange}
                  >
                    {categories.map((item, i) => (
                      <MenuItem key={i} value={item}>
                        {t(item)}
                      </MenuItem>
                    ))}
                  </MuiSelect>
                  {errorMap.get("category") && (
                    <Typography variant="caption" color="#F00">
                      Category is required
                    </Typography>
                  )}
                </FormControl>

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
                      label={t("common:tags")}
                      placeholder="Material Tags"
                      // error={errorMap.get("tags")}
                      // helperText="At least one tag is required"
                    />
                  )}
                />
                <TextField
                  fullWidth
                  id="material_description"
                  label={t("common:description")}
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
              <Typography variant="h6" ml={2}>
                {t("construction")}
              </Typography>
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
                          materialHeights={materialLayers.map(
                            (l) => l.thickness
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
                      <Typography>{t("indoor")}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={6}>
                    <Box width={"100%"}>
                      <Typography>{t("material")}</Typography>
                      <Stack spacing={2}>
                        {materialLayers.map((l, i) => (
                          <Grid key={i} container>
                            <Grid item xs={7}>
                              <FormControl fullWidth>
                                <InputLabel>{t("type")}</InputLabel>
                                <MuiSelect
                                  labelId={category}
                                  id={category}
                                  value={l.name}
                                  label={t("type")}
                                  onChange={(e: SelectChangeEvent) => {
                                    updateMaterialLayerName(i, e.target.value);
                                  }}
                                >
                                  {materialDetails.map((item, j) => (
                                    <MenuItem
                                      key={j}
                                      value={item.name}
                                      onMouseEnter={(e) =>
                                        handlePopperOpen(
                                          "right",
                                          item
                                        )(e.currentTarget)
                                      }
                                      onMouseLeave={handlePopperClose}
                                      onClick={handlePopperClose}
                                    >
                                      {t(item.name)}
                                    </MenuItem>
                                  ))}
                                  <MenuItem value={l.name}>
                                    {l.name}
                                  </MenuItem>
                                </MuiSelect>
                              </FormControl>
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
                                    updateMaterialLayerValue(i, val);
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
              {errorMap.get("materialLayers") && (
                <Typography variant="caption" color="#F00">
                  At least one layer is needed for construction
                </Typography>
              )}
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
                    type="submit"
                    disabled={!!constructionDetail}
                    sx={{ ml: 1 }}
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
