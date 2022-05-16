import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import { useMapContext } from "./mapContext";
import { CardContent } from "@material-ui/core";
import React from "react";
import Typography from "@mui/material/Typography";

export default function InfoBox(){
  const { siteOutline } = useMapContext();
  console.log('siteOutline',siteOutline[0].lat);
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography>
          {siteOutline[0].lat}
        </Typography>
        <Typography>
          {siteOutline[0].lng}
        </Typography>
      </CardContent>
    </React.Fragment>
  )
  return (
    <Box>
      <Card variant = "outlined">{card}</Card>
    </Box>
  )
}