import React from "react";
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
import { useRouter } from "next/router";
import { getSchedules_API } from "src/api/schedule/request";
import { IScheduleDetail } from "src/models/schedule";
import LineChart, { ILineData } from "src/components/chartjs/lineChart";
import { IDailySchedule } from "src/api/schedule/model";

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

export default function ScheduleList({
  scheduleDetails,
}: {
  scheduleDetails: IScheduleDetail[];
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

  const addSchedule = (e: any) => {
    e.preventDefault();
    router.push("../schedules/new");
  };

  const viewSchedule = (id: string) => {
    router.push(`../schedules/${id}`);
  };

  const getDataForChart = (data: IDailySchedule): ILineData => {
    return {
      labels: [...Array<boolean>(24).keys()].map((k) => `${k + 1}`),
      datasets: [
        {
          label: "Heating",
          data: data.heating.map((hour, i) => (data.hvac[i] ? hour : null)),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Cooling",
          data: data.cooling.map((hour, i) => (data.hvac[i] ? hour : null)),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <StyledPaperGeneral sx={{ height: "150px" }}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <StyledTypography>{t("common:query-box")}</StyledTypography>
          </Box>
        </StyledPaperGeneral>
      </Grid>
      <Grid item xs={6} sm={4} md={4} lg={3} xl={3}>
        <StyledPaperAdd onClick={addSchedule} sx={{ height: "250px" }}>
          <StyledTypography>{t("common:add-new")}</StyledTypography>
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
      {scheduleDetails.map((sd) => (
        <Grid key={sd.id} item xs={6} sm={4} md={4} lg={3} xl={3}>
          <StyledPaperGeneral
            sx={{ height: "250px", position: "relative" }}
            onClick={(e) => {
              e.preventDefault();
              viewSchedule(sd.id);
            }}
          >
            <Box sx={{ position: "absolute", right: "10px" }}>
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

            <Box
              sx={{
                marginLeft: 1,
                justifyContent: "right",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <StyledTypography>{sd.name}</StyledTypography>
              {sd.description && (
                <StyledTypography variant="caption">
                  {sd.description}{" "}
                </StyledTypography>
              )}
              <Box sx={{ width: "100%", marginTop: 1 }}>
                <LineChart data={getDataForChart(sd.daily)}></LineChart>
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
  const scheduleDetails = await getSchedules_API();
  console.log(scheduleDetails);
  // Pass data to the page via props
  return { props: { scheduleDetails } };
}
