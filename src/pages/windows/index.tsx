import React, { useEffect, useState } from "react";
import useTranslation from 'next-translate/useTranslation'
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import MaterialRepresentation from "src/components/MaterialRepresentation";
import { useRouter } from "next/router";
import { getConstructionDetails_API } from "src/api/construction/requests";
import { IConstructionDetail } from "src/models/construction";
import { getWindowDetails_API } from "src/api/window/requests";

const StyledPaperGeneral = styled(Paper)({
  height: 200,
  elevation: 2,
  overflow: "hidden",
});

const StyledPaperAdd = styled(StyledPaperGeneral)({
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
});

const StyledTypography = styled(Typography)({
  gutterBottom: true,
  color: "#707070",
});

const options = ["Delete"];
const ITEM_HEIGHT = 48;

export default function ConstructionList({
  constructionDetails,
}: {
  constructionDetails: IConstructionDetail[];
}): React.ReactElement {
  const router = useRouter();
  const { t } = useTranslation('constructions');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const addMaterial = (e: any) => {
    e.preventDefault();
    router.push("../windows/new");
  };

  const viewMaterial = (id: string) => {
    router.push(`../windows/${id}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
      <StyledPaperGeneral sx={{height:"10px"}}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledTypography>{t('query-box')}</StyledTypography>
        </Box>
        </StyledPaperGeneral>
      </Grid>
      <Grid item xs={3} sm={3} md={3}>
        <StyledPaperAdd onClick={addMaterial}>
          <StyledTypography>{t('add-new')}</StyledTypography>
          <Box
            sx={{
              width: 50,
              height: 50,
              borderStyle: "solid",
              borderRadius: "50%",
              borderWidth: "1.5px",
              borderColor: "#707070",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AddIcon sx={{ color: "#707070", fontSize: 30 }}></AddIcon>
          </Box>
        </StyledPaperAdd>
      </Grid>
      {constructionDetails.map((cd) => (
        <Grid key={cd.uniqueId} item xs={3} sm={3} md={3}>
          <StyledPaperGeneral
            onClick={(e) => {
              e.preventDefault();
              viewMaterial(cd.uniqueId);
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box></Box>
              <Box>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                  sx={{ right: 0 }}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem
                      key={option}
                      selected={option === "Pyxis"}
                      onClick={handleClose}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>

            <Box
              sx={{
                marginLeft: 1,
                justifyContent: "right",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <StyledTypography>{cd.name}</StyledTypography>
              {cd.description && (
                <StyledTypography variant="caption">
                  {cd.description}{" "}
                </StyledTypography>
              )}
              {cd.description && (
                <StyledTypography variant="caption">
                  {t("u-value")} {cd.uValue}W/m2K
                </StyledTypography>
              )}
              <Box sx={{ width: 150, marginTop: 1 }}>
                <MaterialRepresentation
                  materialHeights={cd.layerStructure.map((l) =>
                    //parseFloat(l.thickness)
                    l.thickness
                  )}
                  length={200}
                ></MaterialRepresentation>
              </Box>
            </Box>
          </StyledPaperGeneral>
        </Grid>
      ))}
    </Grid>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const constructionDetails = await getWindowDetails_API();

  // Pass data to the page via props
  return { props: { constructionDetails } };
}