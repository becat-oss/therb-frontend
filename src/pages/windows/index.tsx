import React, { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
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
import ConstructionListComponent from "src/components/construction-list";

const StyledPaperGeneral = styled(Paper)({
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
  const { t } = useTranslation();

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
    <Box>
      <ConstructionListComponent
        constructionDetails={constructionDetails}
        addNew={addMaterial}
        viewDetail={viewMaterial}
      ></ConstructionListComponent>      
    </Box>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const constructionDetails = await getWindowDetails_API();
  console.log('constructionDetails',constructionDetails)

  // Pass data to the page via props
  return {
    props: { constructionDetails },
    // revalidate: 10
  };
}
