import React, { useState } from "react";
import InputSidebar from "./inputSidebar";
import EditPlansCanvas from "./EditPlansCanvas";
import { EditPlansProvider } from "./EditPlansContext";
import { P5Provider } from 'building-editor-2d';

export default function EditPlan():React.ReactElement{
  const [draw,setDraw] = useState(false);

  return(
    <P5Provider>
      <EditPlansProvider>
        <EditPlansCanvas />
        <InputSidebar />
      </EditPlansProvider>
    </P5Provider>
  )
}