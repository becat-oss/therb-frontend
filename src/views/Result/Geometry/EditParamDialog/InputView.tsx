import React from "react";
import { useEditParamDialogContext } from "./EditParamDialogContext";
import InternalLoad from "./InternalLoad";
import Schedule from "./Schedule";


export default function InputView():React.ReactElement{
  const {inputCategoryKey} = useEditParamDialogContext();
  switch(inputCategoryKey){
    case "internal_load":
      return <InternalLoad />
    case "envelope":
      return <div>envelope</div>
    case "schedule":
      return <Schedule />
  }
}