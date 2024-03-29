import React from "react";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
// import styled from "@emotion/styled";
// import AddIcon from "@mui/icons-material/Add";
// import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { IEnvelope } from "src/models/envelope";
import { getEnvelopeDetails_API } from "src/api/envelope/request";
// import {
//   TableContainer,
//   Table,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@mui/material";
// import useTranslation from "next-translate/useTranslation";
import EnvelopeListComponent from "src/components/envelope/envelope-list";

// const StyledPaperGeneral = styled(Paper)({
//   elevation: 2,
//   overflow: "hidden",
// });

// const StyledPaperAdd = styled(StyledPaperGeneral)({
//   justifyContent: "center",
//   alignItems: "center",
//   display: "flex",
//   flexDirection: "column",
// });

// const StyledTypography = styled(Typography)({
//   gutterBottom: true,
//   color: "#707070",
// });

// const options = ["Delete"];
// const ITEM_HEIGHT = 48;

export default function Envelopes({
  envelopeDetails,
}: {
  envelopeDetails: IEnvelope[];
}): React.ReactElement {
  const router = useRouter();
  // const { t } = useTranslation();

  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const addEnvelope = (e: any) => {
    e.preventDefault();
    router.push("../envelopes/new");
  };

  const viewEnvelope = (id: string) => {
    router.push(`../envelopes/${id}`);
  };

  return (
    <Box>
      <EnvelopeListComponent 
      envelopeDetails={envelopeDetails}
      addNew={addEnvelope}
      viewDetail={viewEnvelope}
      ></EnvelopeListComponent>
    </Box>
    // <Grid container spacing={2}>
    //   <Grid item xs={12} sm={12} md={12}>
    //     <StyledPaperGeneral sx={{ height: "150px" }}>
    //       <Box
    //         sx={{
    //           width: "100%",
    //           height: "100%",
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //       >
    //         <StyledTypography>{t("common:query-box")}</StyledTypography>
    //       </Box>
    //     </StyledPaperGeneral>
    //   </Grid>
    //   <Grid item xs={6} sm={4} md={4} lg={3} xl={3}>
    //     <StyledPaperAdd onClick={addEnvelope} sx={{ height: "200px" }}>
    //       <StyledTypography>{t("common:add-new")}</StyledTypography>
    //       <Box
    //         sx={{
    //           width: 50,
    //           height: 50,
    //           borderStyle: "solid",
    //           borderRadius: "50%",
    //           borderWidth: "1.5px",
    //           borderColor: "#707070",
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //       >
    //         <AddIcon sx={{ color: "#707070", fontSize: 30 }}></AddIcon>
    //       </Box>
    //     </StyledPaperAdd>
    //   </Grid>
    //   {envelopeDetails.map((ed) => (
    //     <Grid key={ed.id} item xs={6} sm={4} md={4} lg={3} xl={3}>
    //       <StyledPaperGeneral
    //         sx={{ height: "200px", position: "relative" }}
    //         onClick={(e) => {
    //           e.preventDefault();
    //           viewEnvelope(ed.id);
    //         }}
    //       >
    //         <Box sx={{ position: "absolute", right: "10px" }}>
    //           <IconButton
    //             aria-label="more"
    //             id="long-button"
    //             aria-controls={open ? "long-menu" : undefined}
    //             aria-expanded={open ? "true" : undefined}
    //             aria-haspopup="true"
    //             onClick={handleClick}
    //             sx={{ right: 0 }}
    //           >
    //             <MoreVertIcon />
    //           </IconButton>
    //           <Menu
    //             id="long-menu"
    //             MenuListProps={{
    //               "aria-labelledby": "long-button",
    //             }}
    //             anchorEl={anchorEl}
    //             open={open}
    //             onClose={handleClose}
    //             PaperProps={{
    //               style: {
    //                 maxHeight: ITEM_HEIGHT * 4.5,
    //                 width: "20ch",
    //               },
    //             }}
    //           >
    //             {options.map((option) => (
    //               <MenuItem
    //                 key={option}
    //                 selected={option === "Pyxis"}
    //                 onClick={handleClose}
    //               >
    //                 {option}
    //               </MenuItem>
    //             ))}
    //           </Menu>
    //         </Box>

    //         <Box
    //           sx={{
    //             marginLeft: 1,
    //             justifyContent: "right",
    //             display: "flex",
    //             flexDirection: "column",
    //           }}
    //         >
    //           <StyledTypography>{ed.name}</StyledTypography>
    //           <Box sx={{ width: 150, marginTop: 1 }}>
    //             <TableContainer>
    //               <Table size="small" aria-label="construction table">
    //                 <TableBody>
    //                   {ed.config.map((cinfo) => (
    //                     <TableRow key={cinfo.category}>
    //                       <TableCell
    //                         component="th"
    //                         scope="row"
    //                         sx={{ border: "none", padding: 0 }}
    //                       >
    //                         <Typography variant="caption">
    //                           {cinfo.label}
    //                         </Typography>
    //                       </TableCell>
    //                       <TableCell
    //                         align="right"
    //                         sx={{ border: "none", padding: 0 }}
    //                       >
    //                         <Typography variant="caption">
    //                           {cinfo.construction.uvalue}W/m2K
    //                         </Typography>
    //                       </TableCell>
    //                     </TableRow>
    //                   ))}
    //                 </TableBody>
    //               </Table>
    //             </TableContainer>
    //           </Box>
    //         </Box>
    //       </StyledPaperGeneral>
    //     </Grid>
    //   ))}
    // </Grid>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  console.log('fetch')
  // Fetch data from external API
  const envelopeDetails = await getEnvelopeDetails_API();
  // Pass data to the page via props
  return {
    props: { envelopeDetails },
    // revalidate: 10
  };
}
