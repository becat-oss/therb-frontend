import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputTag from "../../components/InputTags";
import {
  getCategories,
  getMaterialTags,
} from "src/services/MaterialSelectionService";
import MaterialRepresentation from "src/components/MaterialRepresentation";
import Select from "src/components/form-controls/select";

export default function MaterialAddition(): React.ReactElement {
  const materialHeights = [10, 50, 20];
  const categories = getCategories();

  const materialTags = getMaterialTags();
  return (
    <>
      <Typography>Header</Typography>
      <Box component="form">
        <Grid container spacing={2}>
          <Grid item xs={4} sm={4} md={4}>
            <TextField
              fullWidth
              id="first_field"
              label="first field"
              variant="outlined"
            />
            <Select label="Category" list={categories}></Select>
            <InputTag tags={materialTags} />
            <TextField
              fullWidth
              id="first_field"
              label="first field"
              variant="outlined"
              multiline
              rows={4}
            />
          </Grid>
          <Grid container item xs={8} sm={8} md={8}>
            <Box sx={{ borderStyle: "solid", width: "100%" }}>
              <Grid item xs={6} sm={6} md={6}>
                <Typography>Top</Typography>
                <Box sx={{ m: "20%"}}>
                  <MaterialRepresentation
                    materialHeights={materialHeights}
                    length={120}
                  ></MaterialRepresentation>
                </Box>
                <Typography>Bottom</Typography>
              </Grid>
              <Grid container xs={6} sm={6} md={6} columns={12}>
                <Grid item xs={6} sm={6} md={6}>
                  <Stack spacing={2}>
                    <Select label="Category" list={categories}></Select>
                    <Select label="Category" list={categories}></Select>
                    <Select label="Category" list={categories}></Select>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <Stack spacing={2}>
                    <Select label="Category" list={categories}></Select>
                    <Select label="Category" list={categories}></Select>
                    <Select label="Category" list={categories}></Select>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
