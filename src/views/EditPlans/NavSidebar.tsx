import React from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from "src/components/Sidebar";

export function Content():React.ReactElement{
  
}

export default function NavSidebar():React.ReactElement{
  return(
    <Sidebar anchor="left" swipeable={false}>
      <DndProvider backend={HTML5Backend}>
        <Content />
      </DndProvider>
    </Sidebar>
  )
}