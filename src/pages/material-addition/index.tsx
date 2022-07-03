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
import { Button } from "@mui/material";

export default function MaterialAddition(): React.ReactElement {
  const materialHeights = [10, 50, 20];
  const categories = getCategories();

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
        Header
      </Typography>
      <Box component="form">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box m={4}>
              <TextField
                fullWidth
                id="first_field"
                label="first field"
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
              <Box
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
              </Box>
              <InputTag tags={materialTags} />
              <TextField
                fullWidth
                id="first_field"
                label="first field"
                variant="outlined"
                multiline
                rows={4}
              />
            </Box>
          </Grid>
          <Grid container item xs={8}>
            <Typography variant="h6" ml={2}>
              Header
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
                <Grid item xs={6}>
                  <Typography>Top</Typography>
                  <Box sx={{paddingRight:4, display:"flex", justifyContent:"center", alignContent:"center"}}>
                    <MaterialRepresentation
                      materialHeights={materialHeights}
                      length={250}
                    ></MaterialRepresentation>
                  </Box>
                  <Typography>Bottom</Typography>
                </Grid>
                <Grid container item xs={6}>
                  <Box width={"100%"}>
                    <Typography>Top</Typography>
                    <Grid container>
                      <Grid item xs={8}>
                        <Stack spacing={2}>
                          <Select label="Category" list={categories}></Select>
                          <Select label="Category" list={categories}></Select>
                          <Select label="Category" list={categories}></Select>
                        </Stack>
                      </Grid>
                      <Grid item xs={4}>
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
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                id="first_field"
                label="first field"
                variant="outlined"
              />
              <TextField
                id="first_field"
                label="first field"
                variant="outlined"
              />
              <TextField
                id="first_field"
                label="first field"
                variant="outlined"
              />
            </Box>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
