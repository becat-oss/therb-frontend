import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from "react";
import AnalysisParams from "src/utils/AnalysisParams";
import { useAppContext } from "src/AppContext";
import Datasheet from "src/components/Datasheet";
import { useFormCondtionsContext } from "../formContext";

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
  }));

interface DialogProps {
    open: boolean
}

export default function DialogTable():React.ReactElement{
    const classes = useStyles();
    const { analysisParams, setAnalysisParams } = useAppContext();
    const params = new AnalysisParams(analysisParams);
    const gridData = params.loadToDataSheet();
    const [grid,setGrid] = useState(gridData);
    const {openDialog,setOpenDialog} = useFormCondtionsContext();
    
    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleSave = () => {
        params.loadFromDataSheet(grid);
        console.log('arams.toAnalysisParam',params.toAnalysisParam());
        const clone = Object.assign(Object.create(params.toAnalysisParam()));
        setAnalysisParams(clone);
    }

    return(
        <Dialog fullScreen open={openDialog}>
            <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton onClick={handleClose}>
                <CloseIcon />
                </IconButton>
                <Button onClick = {handleSave}>
                save
                </Button>
            </Toolbar>
            </AppBar>
            <Datasheet grid={grid}></Datasheet>
        </Dialog>
    )
    
}