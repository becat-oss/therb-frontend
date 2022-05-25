import Tabs from "@mui/material/Tabs";
import React from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from "src/components/Sidebar";
import { useEditPlansContext } from "./EditPlansContext";
import { LayerContainer } from "./LayerContainer";

export function Content(): React.ReactElement {
  const { floor, setFloor, layers, setLayers } = useEditPlansContext();

  const handleChange = (event: React.ChangeEvent<any>, newValue: number): void => {
    setFloor(newValue);
  };

  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      textColor="secondary"
      value={floor}
      onChange={handleChange}
      aria-label="Floor Navigation"
      sx={{
        height: (theme) => `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
        borderRight: (theme) => `1px solid ${theme.palette.divider}`, backgroundColor: 'transparent', overflow: 'auto',
      }}
    >
      <LayerContainer layers={layers}/>
    </Tabs>
  );
}

export default function NavSidebar(): React.ReactElement {
  return (
    <Sidebar anchor="left" swipeable={false}>
      <DndProvider backend={HTML5Backend}>
        <Content />
      </DndProvider>
    </Sidebar>
  );
}