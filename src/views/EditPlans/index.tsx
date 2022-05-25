import React, { useState } from "react";
import InputSidebar from "./InputSidebar";
import EditPlansCanvas from "./EditPlansCanvas";
import { EditPlansProvider } from "./EditPlansContext";
import { P5Provider } from 'building-editor-2d';
import NavSidebar from "./NavSidebar";

export default function EditPlan():React.ReactElement{
  const [draw,setDraw] = useState(false);

  return(
    <P5Provider>
      <EditPlansProvider>
        <EditPlansCanvas />
        <InputSidebar />
        <NavSidebar />
      </EditPlansProvider>
    </P5Provider>
  )
}