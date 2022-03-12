import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import { StepButton, makeStyles, Theme, createStyles } from "@material-ui/core";
import { useCallback, useState } from "react";
import { useAppContext } from "src/AppContext";
import { StepIndex, steps } from "src/AppTypes";

const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root:{
            position: 'fixed',
            left: '50%',
            bottom: theme.spacing(1),
            backgroundColor: 'transparent',
            zIndex:2
        }
    })
)

const intialStep = 0;

function useActiveStep():StepIndex{
    const { stepIndex }=useAppContext();
    return stepIndex;
}

export default function SwipableDialog(): React.ReactElement {
    const classes = useStyles();
    const [step, setStep ]=useState(intialStep);
    const activeStep = useActiveStep();
    const handleClick=useCallback(
        (selectedStep: number): void =>{
            setStep(selectedStep)
        },[]
    )
    return(
        <>
            <Stepper className={classes.root} activeStep={activeStep}>
                {steps.map((label,index)=>{
                    <Step key={label}>
                        <StepButton onClick={()=>handleClick(index)}>
                            {label}
                        </StepButton>
                    </Step>
                })}
            </Stepper>
        </>
    )
}