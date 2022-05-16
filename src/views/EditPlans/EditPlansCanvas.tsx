import React, { useEffect } from "react"
import p5 from "p5";
import Box from '@mui/material/Box';
import { P5Canvas, useP5Context } from 'building-editor-2d';
import { CanvasDocument, CanvasInfo, GeometryObject, Layer } from "building-editor-2d/Canvas";
import { editorFunction } from 'building-editor-2d/EditorFunction';
import { AxisObject, CanvasObject, GridObject, OrientationObject, RectangleObject, ScaleObject } from "building-editor-2d/Canvas/Object";
import { CanvasScaler } from "building-editor-2d/Utils";
import { useTheme } from '@mui/material/styles';
import { Point, Rectangle } from "building-editor-2d/Geometry";
import { useEditPlansContext } from "./EditPlansContext";

let doc: CanvasDocument = new CanvasDocument(new CanvasInfo(0, 0, 0), new CanvasObject(), [], []);
let docLength = 0;

function checkCursorMode(p: p5): void {
  if (p.keyIsDown(p.SHIFT)) {
    p.cursor(p.HAND);
  } else {
    p.cursor(p.ARROW);
  }
}

function OrientationAndScaleBarVisibility(canvasDoc: CanvasDocument, isVisible: boolean) {
  canvasDoc.canvasObject.orientation.isVisible = isVisible;
  canvasDoc.canvasObject.scaleBar.isVisible = isVisible;
}

function pan(p: p5) {
  if (p.mouseIsPressed) {
    OrientationAndScaleBarVisibility(doc, false);
    editorFunction['panCanvas'].func(p, doc, []);
  } else {
    OrientationAndScaleBarVisibility(doc, true);
  }
}

const sketch = (p:p5)=>{
  p.setup =()=>{
    p.createCanvas(700,700);
    p.rectMode(p.CENTER);
    p.textAlign(p.CENTER,p.CENTER);
  };

  p.draw =()=>{
    const info = doc.canvasInfo;
    p.resizeCanvas(info.width,info.height);
    //p.clear();
    p.translate(info.canvasTranslate().x,info.canvasTranslate().y);
    p.scale(info.scale);

    checkCursorMode(p);
    
    if (p.keyIsDown(p.SHIFT)) {
      pan(p);
    }else{
      editorFunction['Snap'].func(p, doc, []);
      const funcKey = doc.editorState.function;
      //console.log('funcKey',funcKey);
      editorFunction[funcKey].func(p, doc, []);
    }

    // if (doc.geometryObjects.length !== docLength){
    //   doc.geometryObjects
    // }
    //console

    doc.draw(p);
  }
}

export default function EditPlansCanvas(): React.ReactElement{
  const theme = useTheme();
  const { canvasWidth,canvasHeight,ref } =useP5Context();
  const { northAxis,editFunction } =useEditPlansContext();

  useEffect(()=>{
    const info = new CanvasInfo(0,canvasHeight,canvasWidth);
    const pt1 = new Point(0,0);
    const pt2 = new Point(10,10);
    const bbox = new Rectangle(pt1,pt2);
    info.drawCenter = bbox.center();

    const scaler = new CanvasScaler(info.height,info.width);
    info.scale = scaler.scaleFromBoundingBox(bbox);

    info.colorMode = theme.palette.mode;

    const geometries: GeometryObject[] = [new RectangleObject(bbox)];

    const angle = 0;
    const orientation = new OrientationObject(angle,info.drawCenter);
    const scaleObject = new ScaleObject(info.drawCenter);
    const canvasObject = new CanvasObject(new GridObject(20,5,5),new AxisObject(),scaleObject,orientation);

    const layers:Layer[] = [new Layer('test',true,1)]

    
    doc = new CanvasDocument(info,canvasObject,geometries,layers);
  },[])

  useEffect(()=>{
    doc.editorState.function = editFunction;
  },[editFunction]);

  useEffect(()=>{
    doc.canvasObject.orientation.northAngle = northAxis;
  },[northAxis]);
  
  return(
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
    }}>
      <P5Canvas sketch = {sketch}/>
    </Box>
    
  )
}


