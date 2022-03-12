import { EditorProvider, editorKeys, useEditorContext } from "src/EditorContext";
import { Provider, useActions } from "building-editor-react";
import Editor  from 'src/components/Editor';
import SideForm from "../pages/form/SideForm";
import { useEditor } from "src/editor/useEditor";
import { useEffect } from "react";
import { AddObjectCommand } from "building-editor/dist/commands";
import { FormConditionsProvider, useFormCondtionsContext } from "../pages/form/formContext";
import DialogTable from "../pages/form/Dialog";

export default function FormView() {
    const{ addZoneGeometry,setObjectVisibilities,scene,editorState,setExteriorWalls } = useEditor();
    const{ addObject,removeObject }=useActions();
    const{editorObjects}=useEditorContext();
    const { openDialog,setOpenDialog }=useFormCondtionsContext();

    //BAES Analysisより模倣
    useEffect(()=>{
      const zoneGeometry = scene.getObjectByName(editorKeys.zoneGeometry);
      zoneGeometry && removeObject(zoneGeometry);
      addObject(editorObjects.zoneGeometry);
    })

    useEffect(()=>{
      addZoneGeometry();
      setObjectVisibilities({
        zoneGeometry: true,
        userObject: false,
      });
      if (editorState.axesHelper) editorState.axesHelper.visible = false;
      if (editorState.gridHelper) editorState.gridHelper.visible = true;
      setExteriorWalls();
    },[])
  
    return (
      <FormConditionsProvider>
        <Provider>   
          <EditorProvider>
            <Editor />
            <SideForm />
          </EditorProvider>
        </Provider>
        <DialogTable /> 
      </FormConditionsProvider>
      
    )
}