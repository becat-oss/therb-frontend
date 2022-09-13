import {
  AppBar,
  Toolbar,
  makeStyles,
  createStyles,
  Typography,
  Theme,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { useAppContext } from "src/AppContext";
import Link from "next/link";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Box, SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/router";
import LanguageIcon from "@mui/icons-material/Language";

interface ILanguageLocale {
  lable: string;
  locale: string;
}
const useStayles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flex: 1,
    },
  })
);
export default function Header(): React.ReactElement {
  const classes = useStayles();
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
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: "flex", justifyContent:"space-between", width:"100%"}}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5" style={{ marginRight: 50 }}>
                THERB 2.0
              </Typography>
              <Link href={"/projects"}>
                <Typography style={{ marginRight: 16 }}>Projects</Typography>
              </Link>
              <Link href={"/constructions"}>
                <Typography style={{ marginRight: 16 }}>
                  Constructions
                </Typography>
              </Link>
              <Link href={"/envelopes"}>
                <Typography style={{ marginRight: 16 }}>
                  Envelopes
                </Typography>
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
          {/* <Typography style={{ marginRight: 16 }}>
                        Settings
                    </Typography> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
