import { useAppContext } from "src/AppContext";
import Link from "next/link";
import Button from "@mui/material/Button";
import { useState } from "react";
import {
  AppBar,
  Box,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import LanguageIcon from "@mui/icons-material/Language";

interface ILanguageLocale {
  lable: string;
  locale: string;
}
// const useStayles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: "flex",
//       flex: 1,
//     },
//   })
// );
export default function Header(): React.ReactElement {
  const router = useRouter();
  const languages: ILanguageLocale[] = [
    { lable: "English", locale: "en" },
    { lable: "Japanese", locale: "jp" },
  ];

  const [language, setLanguage] = useState<ILanguageLocale>({
    lable: "Language",
    locale: "",
  });
  const handleLanguageChange = (event: any) => {
    const localelang = languages.find((l) => event.target.value === l.lable);
    setLanguage(localelang);
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: localelang.locale });
  };

  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5" style={{ marginRight: 50 }}>
                THERB 2.0
              </Typography>
              <Link href={"/projects"}>
                <Button>
                  <Typography style={{ marginRight: 16, color: "#FFF" }}>
                    Projects
                  </Typography>
                </Button>
              </Link>
              <Link href={"/constructions"}>
                <Button>
                  <Typography style={{ marginRight: 16, color: "#FFF" }}>
                    Constructions
                  </Typography>
                </Button>
              </Link>
              <Link href={"/windows"}>
                <Button>
                  <Typography style={{ marginRight: 16, color: "#FFF" }}>
                    Windows
                  </Typography>
                </Button>
              </Link>
              <Link href={"/envelopes"}>
                <Button>
                  {" "}
                  <Typography style={{ marginRight: 16, color: "#FFF" }}>
                    Envelopes
                  </Typography>
                </Button>
              </Link>
              <Link href={"/schedules"}>
                <Button>
                  {" "}
                  <Typography style={{ marginRight: 16, color: "#FFF" }}>
                    Schedules
                  </Typography>
                </Button>
              </Link>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LanguageIcon sx={{ margin: 1 }} />
              <Select
                labelId="select-language"
                id="select-language"
                value={language.lable}
                label="Language"
                onChange={handleLanguageChange}
                renderValue={(selected) => selected}
              >
                {languages.map((item, i) => (
                  <MenuItem key={i} value={item.lable}>
                    {item.lable}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
