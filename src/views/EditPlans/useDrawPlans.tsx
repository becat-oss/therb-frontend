import { CanvasUtils } from '../../editor/CanvasUtils';
import {useEditor} from '../../editor/useEditor';
import { AnalysisLine } from "src/AppTypes";
import { editorKeys } from 'src/EditorContext';
import { useCallback } from 'react';

interface DrawPlansCallbacks{
  createFloorLines:() => AnalysisLine[][];
}

interface Props{
  canvasUtils: CanvasUtils | null;
}
export function useDrawPlans({canvasUtils}:Props):DrawPlansCallbacks{
  const {sceneHelpers}=useEditor();

  const createFloorLines=useCallback(()=>{
    const floorLines:AnalysisLine[][]=[];
    const coplanarHelper = sceneHelpers.getObjectByName(editorKeys.copalanrHelper);

    // if (coplanarHelper){
    //   const 
    // }
  },[]);

  return {
    createFloorLines
  }
}