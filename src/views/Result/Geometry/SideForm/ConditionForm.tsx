import React from "react";
import { TransparentPanel } from 'baues-uikit';
import Stack from "@mui/material/Stack";
import WwrForm from "./WwrForm";

export default function ConditionForm():React.ReactElement{
  return(
    <TransparentPanel sx={{x:1,p:1}}>
      <form>
        <Stack direction ="column" spacing={2}>
          <WwrForm />
        </Stack>
      </form>
    </TransparentPanel>
  )
}