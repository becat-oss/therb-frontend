import { AppBar,Toolbar, makeStyles, createStyles, Typography, Theme, Select, MenuItem,  FormControl } from "@material-ui/core"
import { useAppContext } from 'src/AppContext';
import { useActions } from "building-editor-react";
import Link from 'next/link';
import Button from "@mui/material/Button";

const useStayles=makeStyles((theme: Theme)=>
    createStyles({
        root:{
            display: 'flex',
            flex:1
        }
    })
)
export default function Header():React.ReactElement{
    const classes = useStayles();
    
    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" style={{ marginRight: 50 }}>
                        THERB 2.0
                    </Typography>
                    <Link href={'/projects'}>
                        <Typography style={{ marginRight: 16 }}>
                            Projects
                        </Typography>
                    </Link>
                    <Link href={'/materials'}>
                        <Typography style={{ marginRight: 16 }}>
                            Materials
                        </Typography>
                    </Link>
                    {/* <Typography style={{ marginRight: 16 }}>
                        Settings
                    </Typography> */}
                </Toolbar>
            </AppBar>
        </div>
    )
}